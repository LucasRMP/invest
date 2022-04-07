#!/bin/bash

#! Before starting you must run `chmod +x ./.docker/entrypoint.sh`

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

yarn install
yarn typeorm migration:run
yarn start:dev