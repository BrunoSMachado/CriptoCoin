#!/bin/bash
docker rm -f $(docker ps -aq)
docker network prune
docker rmi dev-peer0.org1.example.com-newscoin-1.0-92186a42520270fcba02df638254c00138ab252ad51c86ca163e8d30c5535312:latest
