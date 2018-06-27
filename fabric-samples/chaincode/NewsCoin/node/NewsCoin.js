/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');
const crypto = require('crypto');

let Chaincode = class {

  // The Init method is called when the Smart Contract 'fabcar' is instantiated by the blockchain network
  // Best practice is to have any Ledger initialization in separate function -- see initLedger()
  async Init(stub) {
    console.info('=========== Instantiated fabcar chaincode ===========');
    return shim.success();
  }

  // The Invoke method is called as a result of an application request to run the Smart Contract
  // 'fabcar'. The calling application program has also specified the particular smart contract
  // function to be called, with arguments
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.error('no function of name:' + ret.fcn + ' found');
      throw new Error('Received unknown function ' + ret.fcn + ' invocation');
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  async queryPeer(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments');
    }
    let peer = args[0];

    let peerAsBytes = await stub.getState(peer);
    if (!peerAsBytes || peerAsBytes.toString().length <= 0) {
      throw new Error(peer + ' does not exist: ');
    }
    console.log(peerAsBytes.toString());
    let p = JSON.parse(peerAsBytes)
    return p.value.toString();
  }

  async initLedger(stub, args) {
    console.info('============= START : Initialize Ledger ===========');
    let peers = [];
    peers.push({
      value: '500000000',
      public_key: '-----BEGIN RSA PUBLIC KEY-----\n'+
      'MIIBCgKCAQEAhF6963IwAP8g2E7MC5Fr9yMQVkiuTFf5VT16pW4fhYcJtLEWw7N8BuS7GKVR\n'+
      '84vtJUsbNlgtbCpVnk8adS4DavtQvUdzBcBzIhpduUlP4iFQyIgpQN8yNAcXCiYbd0alTVxL\n'+
      '4n8TU7LixWkzPyfPdhuCcMCvSEU7v1caDdYyYmZwz8Nk19fptPyn90t6FH6aHx2MYH0ARTM5\n'+
      'cTs3kc0huUEDukPRjho97lHf2n5F2SChW7GdC21fH2Ix/Fj2UlAe8HgzD2iYnwkDfKVPUhGb\n'+
      'wK4uj9K+IA/6Ftnom8oAexuJAWwyktqUyaoSqTrZFSM4+26mTLbcTveVB8UVCvOrkwIDAQAB\n'+
      '-----END RSA PUBLIC KEY-----'
    });
    peers.push({
      value: '500000000',
      public_key: '-----BEGIN RSA PUBLIC KEY-----\n'+
      'MIIBCgKCAQEApq/4WP31aFm3kgl2CgIJwDugpi3XgLHstPdVnAzPKIZuSJWinUdaXRo4i8K7\n'+
      'hHW4VJf/wrhRqv57gg0E6nbnD/RFuw/8cdjrjj2+NOuA7Iz8k3Dwq1bR7/IqDIM/Hxp8RzT9\n'+
      '2X57XMxxCpIU8K5EEczc+nDxY2zuVGbCXlqtH+6/VIGDHovlHveVKmyT9wAn4E/Uv2HVOxcK\n'+
      'TnKGHtpcN3kjkzX0vs6NAGJqNixpp5fcQ8vxDUtlMLr2Kco+g6hzq72sRQIdgxOkpNt8B51Z\n'+
      '1/JbtKkaMyxuZRdwzHk/0flFAk/RmdJFloiyEnhCj0wp5pSGe3G36syCxCPfmD5FGQIDAQAB\n'+
      '-----END RSA PUBLIC KEY-----'
    });

      await stub.putState('MIIBCgKCAQEAhF6963IwAP8g2E7MC5Fr9yMQVkiuTFf5VT16pW4fhYcJtLEWw7N8BuS7GKVR'+
      '84vtJUsbNlgtbCpVnk8adS4DavtQvUdzBcBzIhpduUlP4iFQyIgpQN8yNAcXCiYbd0alTVxL'
      , Buffer.from(JSON.stringify(peers[0])));

      await stub.putState('MIIBCgKCAQEApq/4WP31aFm3kgl2CgIJwDugpi3XgLHstPdVnAzPKIZuSJWinUdaXRo4i8K7'+
      'hHW4VJf/wrhRqv57gg0E6nbnD/RFuw/8cdjrjj2+NOuA7Iz8k3Dwq1bR7/IqDIM/Hxp8RzT9'
      , Buffer.from(JSON.stringify(peers[0])));

    console.info('============= END : Initialize Ledger ===========');
  }

  async createPeer(stub, args) {
    console.info('============= START : Create Peer ===========');
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 1');
    }

    var peer = {
      docType: 'peer',
      value: 0,
      public_key: args[0],
    };

    var temp = args[0].slice(31)
    await stub.putState(temp.substring(0,144), Buffer.from(JSON.stringify(peer)));
    console.info('============= END : Create Peer ===========');
  }


  async transaction(stub, args) {
    console.info('============= START : Transaction ===========');
    if (args.length != 4) {
      throw new Error('Incorrect number of arguments. Expecting 4');
    }

    let signature = args[3]

    const verify = crypto.createVerify('SHA256');
    verify.write(peer1.public_key);
    verify.end();

    if(verify.verify(peer1.public_key,signature)){
      throw new Error('Assinatura não verificada')
    }

    let peerAsBytes1 = await stub.getState(args[0]);
    let peer1 = JSON.parse(peerAsBytes1);
    if(peer1.value < args[2]){
      throw new Error('Balanço insuficiente');
    }
    if(args[2] < 0.0000000001){
      throw new Error('Transferência não suportada: valor demasiado pequeno');
    }
    peer1.value -= args[2];

    let peerAsBytes2 = await stub.getState(args[1]);
    let peer2 = JSON.parse(peerAsBytes2);
    peer2.value += args[2];

    await stub.putState(args[0], Buffer.from(JSON.stringify(peer1)));
    await stub.putState(args[1], Buffer.from(JSON.stringify(peer2)));
    console.info('============= END : Transaction ===========');
  }
};

shim.start(new Chaincode());
