#!/bin/bash

for file in dist/index.js dist/index.mjs; do
    printf "\"use client\";\n" > $file.temp
    cat $file >> $file.temp
    mv $file.temp $file
done
