import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface VoteV0Args {
  args: types.VoteArgsV0Fields
}

export interface VoteV0Accounts {
  voteController: PublicKey
  voter: PublicKey
  stateController: PublicKey
  proposalConfig: PublicKey
  proposal: PublicKey
  onVoteHook: PublicKey
  proposalProgram: PublicKey
}

export const layout = borsh.struct([types.VoteArgsV0.layout("args")])

export function voteV0(
  args: VoteV0Args,
  accounts: VoteV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.voteController, isSigner: true, isWritable: false },
    { pubkey: accounts.voter, isSigner: false, isWritable: false },
    { pubkey: accounts.stateController, isSigner: false, isWritable: true },
    { pubkey: accounts.proposalConfig, isSigner: false, isWritable: false },
    { pubkey: accounts.proposal, isSigner: false, isWritable: false },
    { pubkey: accounts.onVoteHook, isSigner: false, isWritable: false },
    { pubkey: accounts.proposalProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([82, 47, 20, 22, 108, 59, 245, 115])
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
