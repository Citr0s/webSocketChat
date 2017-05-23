#!/bin/sh

pkill -HUP node
git pull
yarn
gulp
node dist/server > stdout.txt 2> stderr.txt &