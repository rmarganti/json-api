#!/usr/bin/env bash

# Only deploy if current commit has been tagged with a version. 
if git describe --exact-match HEAD &> /dev/null; then
    yarn run publish
else
    echo "Untagged commit. Skipping deploy."
fi
