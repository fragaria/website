#!/bin/bash
FILES=*.html

for f in $FILES
do
    ./html2md.sh $f
done
