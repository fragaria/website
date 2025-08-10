#!/usr/bin/env bash
set -euo pipefail

IMG="fragaria-website"
CFG="_config.yml,_config.witharchives.yml,_config.prod.yml"

docker build . -t "$IMG"

docker run --rm \
  --user "$(id -u):$(id -g)" \
  -e JEKYLL_ENV=production \
  -v "$PWD":/srv/jekyll -w /srv/jekyll \
  "$IMG" bundle exec jekyll build --config "$CFG"

mkdir -p /tmp/fragaria-website-build
cp -r _site/* /tmp/fragaria-website-build
rm -rf _site
git checkout gh-pages
cp -r /tmp/fragaria-website-build/. .
# git add -A
# git commit -m "Automated build"
