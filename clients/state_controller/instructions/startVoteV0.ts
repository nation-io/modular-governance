import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StartVoteV0Accounts {
  owner: PublicKey
  proposal: PublicKey
  proposalConfig: PublicKey
  stateController: PublicKey
  proposalProgram: PublicKey
}

export function startVoteV0(
  accounts: StartVoteV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.owner, isSigner: true, isWritable: false },
    { pubkey: accounts.proposal, isSigner: false, isWritable: true },
    { pubkey: accounts.proposalConfig, isSigner: false, isWritable: false },
    { pubkey: accounts.stateController, isSigner: false, isWritable: false },
    { pubkey: accounts.proposalProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([246, 175, 148, 190, 215, 247, 126, 69])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
