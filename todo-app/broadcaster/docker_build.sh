#!/bin/bash

VERSION=$(npx -c 'echo "$npm_package_version"')
echo "$VERSION"

docker build . -t teemukoivumaa/todo-broadcaster:$VERSION && docker push teemukoivumaa/todo-broadcaster:$VERSION
