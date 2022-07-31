#!/bin/bash

VERSION=$(npx -c 'echo "$npm_package_version"')
echo "$VERSION"

docker build . -t teemukoivumaa/dummysite:$VERSION && docker push teemukoivumaa/dummysite:$VERSION
