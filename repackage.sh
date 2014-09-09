#!/bin/bash

version=$(python reversion.py manifest.json)
git add -u &&
  git commit --amend && \
  git tag -a v"$version" -m "Release version: $version" && \
  zip codesearch-theme.zip *.css *.json *.html *.js *.png
echo "Release v. $version is ready"



