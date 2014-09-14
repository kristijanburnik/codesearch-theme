#!/bin/bash
./rebuild.sh || exit 1
version=$(python reversion.py manifest.json)
git add less/*.less js/*.js && git add -u &&
  git commit && \
  git tag v"$version" -m "Release version: $version" && \
	git push origin master && \
  zip codesearch-theme.zip css/generated.css *.json *.html js/*.js themes-icon.png
echo "Release v. $version is ready"
exit 0
