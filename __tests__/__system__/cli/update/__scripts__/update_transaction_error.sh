#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

transaction_name=$1
aocmd=$2
conv=$3
fp=$4
route=$5
segno=$6
transtat=$7

zowe ims update transaction "$1" --aocmd $2 --conv $3 --fp $4 --rte $5 --segno $6 --transtat $7

