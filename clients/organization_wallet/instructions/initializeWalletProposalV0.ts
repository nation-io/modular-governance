import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitializeWalletProposalV0Accounts {
  payer: PublicKey
  organizationWallet: PublicKey
  authority: PublicKey
  owner: PublicKey
  proposal: PublicKey
  walletProposal: PublicKey
  systemProgram: PublicKey
}

export function initializeWalletProposalV0(
  accounts: InitializeWalletProposalV0Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.organizationWallet, isSigner: false, isWritable: false },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.proposal, isSigner: false, isWritable: false },
    { pubkey: accounts.walletProposal, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([144, 120, 23, 185, 159, 126, 90, 168])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
