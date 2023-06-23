import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SetTransactionsV0Args {
  args: types.SetTransactionsArgsV0Fields
}

export interface SetTransactionsV0Accounts {
  payer: PublicKey
  authority: PublicKey
  owner: PublicKey
  proposal: PublicKey
  walletProposal: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.SetTransactionsArgsV0.layout("args")])

export function setTransactionsV0(
  args: SetTransactionsV0Args,
  accounts: SetTransactionsV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.proposal, isSigner: false, isWritable: false },
    { pubkey: accounts.walletProposal, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([69, 151, 8, 164, 94, 146, 249, 84])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.SetTransactionsArgsV0.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
