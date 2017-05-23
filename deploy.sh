#!/bin/sh

echo 'Killing node process...';
pkill -HUP node

echo 'Getting latest changes from git...';
git pull

echo 'Updating packages...';
yarn

echo 'Compiling files...';
gulp

echo 'Starting node process...';
node dist/server > stdout.txt 2> stderr.txt &