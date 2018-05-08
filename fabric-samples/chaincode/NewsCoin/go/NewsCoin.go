/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * The sample smart contract for documentation topic:
 * Writing Your First Blockchain Application
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the car structure, with 4 properties.  Structure tags are used by encoding/json library
type Peer struct {
	Value  			float64 	 `json:"value"`
}

/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryPeer" {
		return s.queryPeer(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "createPeer" {
		return s.createPeer(APIstub, args)
	} else if function == "queryAllPeers" {
		return s.queryAllPeers(APIstub)
	} else if function == "transaction" {
		return s.transaction(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryPeer(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	peerAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(peerAsBytes)
}

func (s *SmartContract) queryAllPeers(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "Peer0"
	endKey := "Peer999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllPeers:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func (s *SmartContract) transaction(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

		if len(args) != 3 {
			return shim.Error("Incorrect number of arguments. Expecting 3")
		}

		peerAsBytes1, _ := APIstub.GetState(args[0])
		peer1 := Peer{}

		peerAsBytes2, _ := APIstub.GetState(args[1])
		peer2 := Peer{}

		valor , _ := strconv.ParseFloat(args[2],64)

		json.Unmarshal(peerAsBytes1, &peer1)
		if valor < 0.0000000001{
			return shim.Error("Quantia não suportada Min:0.0000000001")
		} else if peer1.Value > valor{
			peer1.Value -= valor
		} else {
		  return shim.Error("Saldo insuficiente")
		}

		json.Unmarshal(peerAsBytes2, &peer2)
		peer2.Value += valor

		peerAsBytes1, _ = json.Marshal(peer1)
		APIstub.PutState(args[0], peerAsBytes1)

		peerAsBytes2, _ = json.Marshal(peer2)
		APIstub.PutState(args[1], peerAsBytes2)

		return shim.Success(nil)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	peers := []Peer{
		Peer{Value: 500000000},
		Peer{Value: 500000000},
	}

	peerAsBytes1, _ := json.Marshal(peers[0])
	APIstub.PutState("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcmtaOSBALW50YeLBL4JdQUDyIyFnXoHnM2SaOrREVJVvSERthaCdZKRkpGNDB5yBdENf+NI9KCSkBdVK5Zj0QR8GDMxGwwPZcnLDeT+tNxpSnPRneJ8vvpiXO3FlWsPOeVhg6Mtz+qernMs/MNC5eV8TImnu9i4Yg0TMFqBGWQQIDAQAB", peerAsBytes1)
	fmt.Println("Added", peers[0])
	peerAsBytes2, _ := json.Marshal(peers[1])
	APIstub.PutState("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCAIWNeitXAYWPeGHH7nxF0Ag5RBy7qdibpD2vjDMik1sZPFiRHdvpcl+Bm5OWSA1QxZufQ1cPgefhy9JUeujfmNXsKDEFJJVBJ0+L2Q8nSnv0fmXvtPnYfoMkjIWITNiMLHCqNyIdcFA7VR9DAjE87DbCDw+IPtFU4nhqabPxd5wIDAQAB", peerAsBytes2)
	fmt.Println("Added", peers[1])


	return shim.Success(nil)
}

func (s *SmartContract) createPeer(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	var peer = Peer{Value: 0}

	peerAsBytes, _ := json.Marshal(peer)
	APIstub.PutState(args[0], peerAsBytes)

	return shim.Success(nil)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
