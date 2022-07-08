#!/bin/sh

# -s = Silent 
# -L = Follow redirect
# -I = Fetch the headers only
# -o = Output to /dev/null == don't output anywhere
# -w = Format

URL=$(curl http://en.wikipedia.org/wiki/Special:Random -s -L -I -o /dev/null -w '%{url_effective}')

echo "$URL"
TEXT=$(echo $URL | rev | cut -d '/' -f 1 | rev)
echo "$TEXT"

LINKURL="<a href="$URL">Todays wikipedia article: $TEXT</a>"

echo "$LINKURL"

curl -X POST http://todo-backend-svc:2346/todos -H "Content-Type: application/json" -d '{"todo": "'"$LINKURL"'"}'

echo "\n"
