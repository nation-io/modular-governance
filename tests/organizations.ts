import * as anchor from "@coral-xyz/anchor";
import { PROGRAM_ID } from "../clients/organization/programId";
import * as initializeOrganization from "../clients/organization/instructions/initializeOrganizationV0";

describe("organization", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const payer = provider.publicKey!;

  it("create", async () => {
    const airdropSig = await provider.connection.requestAirdrop(
      payer,
      1 * anchor.web3.LAMPORTS_PER_SOL,
    );
    const latestBlockHash = await provider.connection.getLatestBlockhash();
    await provider.connection.confirmTransaction(
      {
        signature: airdropSig,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      },
      "confirmed",
    );
    const name = "orgName";

    const [orgPda] = anchor.web3.PublicKey.findProgramAddressSync([
      Buffer.from("organization"),
      Buffer.from(name),
    ], PROGRAM_ID);

    const args = {
      name,
      authority: provider.publicKey!,
      defaultProposalConfig: new anchor.web3.Keypair().publicKey,
      proposalProgram: new anchor.web3.Keypair().publicKey,
    };
    const accounts = {
      payer,
      organization: orgPda,
      systemProgram: anchor.web3.SystemProgram.programId,
    };

    const initIx = initializeOrganization.initializeOrganizationV0(
      { args },
      accounts,
    );
    const tx = new anchor.web3.Transaction().add(initIx);

    await provider.sendAndConfirm!(tx);
  });
});
