import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitializeResolutionSettingsV0Args {
  args: types.InitializeResolutionSettingsArgsV0Fields
}

export interface InitializeResolutionSettingsV0Accounts {
  payer: PublicKey
  resolutionSettings: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.InitializeResolutionSettingsArgsV0.layout("args"),
])

export function initializeResolutionSettingsV0(
  args: InitializeResolutionSettingsV0Args,
  accounts: InitializeResolutionSettingsV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.resolutionSettings, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([87, 126, 140, 66, 245, 25, 95, 181])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.InitializeResolutionSettingsArgsV0.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
