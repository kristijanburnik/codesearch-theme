#!/usr/bin/env python
import json
import pprint
import collections
import sys

if len(sys.argv) > 1:
  manifest_file = sys.argv[1]
else:
 manifest_file = "manifest.json"

data = json.JSONDecoder(object_pairs_hook=collections.OrderedDict).decode(open(manifest_file).read());

def increment_version(version):
  (major,minor,revision) = map(int,version.split('.'))
  revision = (revision+1) % 10
  if revision == 0:
    minor = (minor+1) % 10
    if minor == 0:
      major +=1

  return '.'.join(map(str,[major,minor,revision]))

data["version"] = increment_version(data["version"]);

f = open(manifest_file,'w')
f.write(json.dumps(data, indent=2) + "\n")
f.close()

print data["version"]
