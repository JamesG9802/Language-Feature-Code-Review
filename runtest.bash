#!/usr/bin/env bash

gcc -Wno-incompatible-pointer-types "./Test Cases/Test.c" -o compiled.o

echo "Test 1 - same values"
./compiled.o "./Test Cases/input1.txt" "./Test Cases/output1.txt" "generic_correct"
./compiled.o "./Test Cases/input1.txt" "./Test Cases/output1.txt" "generic_wrong_1"
./compiled.o "./Test Cases/input1.txt" "./Test Cases/output1.txt" "generic_wrong_2"
./compiled.o "./Test Cases/input1.txt" "./Test Cases/output1.txt" "generic_wrong_3"

echo "Test 2 - empty array"
./compiled.o "./Test Cases/input2.txt" "./Test Cases/output2.txt" "generic_correct"
./compiled.o "./Test Cases/input2.txt" "./Test Cases/output2.txt" "generic_wrong_1"
./compiled.o "./Test Cases/input2.txt" "./Test Cases/output2.txt" "generic_wrong_2"
./compiled.o "./Test Cases/input2.txt" "./Test Cases/output2.txt" "generic_wrong_3"

echo "Test 3 - single value"
./compiled.o "./Test Cases/input3.txt" "./Test Cases/output3.txt" "generic_correct"
./compiled.o "./Test Cases/input3.txt" "./Test Cases/output3.txt" "generic_wrong_1"
./compiled.o "./Test Cases/input3.txt" "./Test Cases/output3.txt" "generic_wrong_2"
./compiled.o "./Test Cases/input3.txt" "./Test Cases/output3.txt" "generic_wrong_3"

echo "Test 4 - negative values"
./compiled.o "./Test Cases/input4.txt" "./Test Cases/output4.txt" "generic_wrong_2"

rm compiled.o
