#!/usr/bin/env bash

echo "Processing $1"
base=${1//.html/}

# split .html into an empty file, a .yaml and an .htm
python3 -c "
import sys
for i, c in enumerate(sys.stdin.read().split('---')):
    if i is 0:
        continue

    if i is 1:
        open(f'out.yaml', 'w').write('---' + c + '---\n\n')

    if i is 2:
        open(f'out.htm', 'w').write(c)
" < $base.html

mv out.yaml $base.yaml
mv out.htm $base.htm
rm $base.html

# Set metadata author=tartley
# python3 -c "
# import yaml
# with open(\"$base.yaml\", 'r') as stream:
#     data = yaml.load(stream)
# data['author'] = 'tartley'
# with open(\"$base.yaml\", 'w') as stream:
#     stream.write(yaml.dump(data, explicit_start=True, explicit_end=True))
# "

# convert html to markdown (.content)
pandoc --from html-native_divs-native_spans --to gfm $base.htm -o $base.content
rm $base.htm

# concat .yaml and .content into .md
cat $base.yaml $base.content > $base.md
rm $base.yaml $base.content
