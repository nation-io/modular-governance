import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitializeOrganizationWalletV0Args {
  args: types.InitializeOrganizationWalletArgsV0Fields
}

export interface InitializeOrganizationWalletV0Accounts {
  payer: PublicKey
  organizationWallet: PublicKey
  organization: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.InitializeOrganizationWalletArgsV0.layout("args"),
])

export function initializeOrganizationWalletV0(
  args: InitializeOrganizationWalletV0Args,
  accounts: InitializeOrganizationWalletV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.organizationWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.organization, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([15, 130, 143, 72, 9, 224, 231, 213])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.InitializeOrganizationWalletArgsV0.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
