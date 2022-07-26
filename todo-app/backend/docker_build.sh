#!/bin/bash

VERSION=$(npx -c 'echo "$npm_package_version"')
echo "$VERSION"

docker build . -t teemukoivumaa/todo-backend:$VERSION && docker push teemukoivumaa/todo-backend:$VERSION
