#!/bin/bash

mkdir -p temp
node index

cd temp
triangle -pq box.poly
cd ..

node parseResult

rm -r temp
