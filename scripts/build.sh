#!/bin/bash

set -e # exit unsuccessfully if anything fails

anchor build

for dir in programs/*; do \
  program_dir="$(echo $dir)"; \
  program=$(echo $program_dir | sed -e "s|programs/||"); \
  yarn anchor-client-gen --program-id "$(solana address -k target/deploy/$program-keypair.json)" "target/idl/$program.json" "clients/$program"; \
done
