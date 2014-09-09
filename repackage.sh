#!/bin/bash

version=$(python reversion.py manifest.json)
git add -u &&
  git commit && \
  git tag v"$version" -m "Release version: $version" && \
	git push origin master && \
  zip codesearch-theme.zip *.css *.json *.html *.js *.png
echo "Release v. $version is ready"


