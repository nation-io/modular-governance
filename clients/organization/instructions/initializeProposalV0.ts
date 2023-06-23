import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitializeProposalV0Args {
  args: types.InitializeProposalArgsV0Fields
}

export interface InitializeProposalV0Accounts {
  payer: PublicKey
  authority: PublicKey
  proposal: PublicKey
  proposalConfig: PublicKey
  organization: PublicKey
  proposalProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.InitializeProposalArgsV0.layout("args"),
])

export function initializeProposalV0(
  args: InitializeProposalV0Args,
  accounts: InitializeProposalV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.proposal, isSigner: false, isWritable: true },
    { pubkey: accounts.proposalConfig, isSigner: false, isWritable: false },
    { pubkey: accounts.organization, isSigner: false, isWritable: true },
    { pubkey: accounts.proposalProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([63, 235, 9, 201, 163, 171, 206, 33])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.InitializeProposalArgsV0.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
