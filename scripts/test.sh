#!/bin/bash

cleanup() {
  ps -ax | grep amman | awk '{print $1}' | xargs kill -9 2>/dev/null
}

trap 'cleanup' EXIT

amman_config="$(cat .ammanrc.template.js)"

for f in target/deploy/*.json; do \
  program_id=$(solana address -k $f); \
  amman_config=$(echo "$amman_config" | sed -e "s|$f|$program_id|"); \
done

echo "$amman_config" > .ammanrc.js

yarn amman start &

sleep 2 # wait for amman to fully startup

anchor run test
