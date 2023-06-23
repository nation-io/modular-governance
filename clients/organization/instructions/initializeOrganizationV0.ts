import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitializeOrganizationV0Args {
  args: types.InitializeOrganizationArgsV0Fields
}

export interface InitializeOrganizationV0Accounts {
  payer: PublicKey
  organization: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.InitializeOrganizationArgsV0.layout("args"),
])

export function initializeOrganizationV0(
  args: InitializeOrganizationV0Args,
  accounts: InitializeOrganizationV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.organization, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([44, 42, 174, 217, 128, 72, 101, 49])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.InitializeOrganizationArgsV0.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
