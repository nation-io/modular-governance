import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface OnVoteV0Args {
  args: types.VoteArgsV0Fields
}

export interface OnVoteV0Accounts {
  voteController: PublicKey
  stateController: PublicKey
  proposal: PublicKey
  proposalConfig: PublicKey
  proposalProgram: PublicKey
}

export const layout = borsh.struct([types.VoteArgsV0.layout("args")])

export function onVoteV0(
  args: OnVoteV0Args,
  accounts: OnVoteV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.voteController, isSigner: true, isWritable: false },
    { pubkey: accounts.stateController, isSigner: false, isWritable: true },
    { pubkey: accounts.proposal, isSigner: false, isWritable: true },
    { pubkey: accounts.proposalConfig, isSigner: false, isWritable: false },
    { pubkey: accounts.proposalProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([140, 62, 3, 226, 87, 248, 128, 33])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.VoteArgsV0.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
