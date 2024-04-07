#!/bin/bash
set -e

cd client
npm install
npm start&

cd ../
cd api
npm install
npm start
