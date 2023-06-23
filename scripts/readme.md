# scripts

## `./build.sh`

runs `anchor build` and generates the corresponding `anchor-client-gen` client
for each program with the program id of `$program-keypair.json` found alongside
the `$program.so` in `target/deploy`.

## `./test.sh`

stands up an `amman` validator with a rendered `.ammanrc.js` (using
`.ammanrc.template.js`) with corresponding `programId`s via their
`target/deploy/$program-keypair.json` then finally runs `anchor run test`.
