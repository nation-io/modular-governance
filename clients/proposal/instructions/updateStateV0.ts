import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateStateV0Args {
  args: types.UpdateStateArgsV0Fields
}

export interface UpdateStateV0Accounts {
  stateController: PublicKey
  proposal: PublicKey
  proposalConfig: PublicKey
}

export const layout = borsh.struct([types.UpdateStateArgsV0.layout("args")])

export function updateStateV0(
  args: UpdateStateV0Args,
  accounts: UpdateStateV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.stateController, isSigner: true, isWritable: false },
    { pubkey: accounts.proposal, isSigner: false, isWritable: false },
    { pubkey: accounts.proposalConfig, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([234, 64, 38, 223, 224, 216, 29, 82])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.UpdateStateArgsV0.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
