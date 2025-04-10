#!/usr/bin/env bash
# build.sh

corepack enable
corepack prepare yarn@4.5.1 --activate
yarn install
yarn build
