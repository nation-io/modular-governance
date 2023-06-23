const x = require("@metaplex-foundation/amman");

module.exports = {
  validator: {
    killRunningValidators: true,
    programs: [
      {
        label: "organization",
        programId: "target/deploy/organization-keypair.json",
        deployPath: "target/deploy/organization.so",
      },
      {
        label: "organization_wallet",
        programId: "target/deploy/organization_wallet-keypair.json",
        deployPath: "target/deploy/organization_wallet.so",
      },
      {
        label: "proposal",
        programId: "target/deploy/proposal-keypair.json",
        deployPath: "target/deploy/proposal.so",
      },
      {
        label: "state_controller",
        programId: "target/deploy/state_controller-keypair.json",
        deployPath: "target/deploy/state_controller.so",
      },
      {
        label: "vote_hook_interface",
        programId: "target/deploy/vote_hook_interface-keypair.json",
        deployPath: "target/deploy/vote_hook_interface.so",
      },
    ],
    accounts: [],
    jsonRpcUrl: x.LOCALHOST,
    websocketUrl: "",
    commitment: "confirmed",
    ledgerDir: x.tmpLedgerDir(),
    resetLedger: true,
    verifyFees: false,
    detached: process.env.CI != null,
  },
  relay: {
    enabled: process.env.CI == null,
    killlRunningRelay: true,
  },
  storage: {
    enabled: process.env.CI == null,
    storageId: "test-storage",
    clearOnStart: true,
  },
  streamTransactionLogs: true,
};
