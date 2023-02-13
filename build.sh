#!/bin/sh

set -e

docker build . -t fragaria-website
docker run -e JEKYLL_ENV=production -v $PWD:/srv/jekyll fragaria-website jekyll build --config '_config.yml,_config.witharchives.yml,_config.prod.yml'
mkdir -p /tmp/fragaria-website-build
cp -r _site/* /tmp/fragaria-website-build
rm -rf _site
git checkout gh-pages
cp -r /tmp/fragaria-website-build/ .
git commit -am "Automated build"


