import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface WalletProposalV0Fields {
  proposal: PublicKey
  organizationWallet: PublicKey
  bumpSeed: number
  choiceTransactions: Array<Array<types.CompiledTransactionFields>>
}

export interface WalletProposalV0JSON {
  proposal: string
  organizationWallet: string
  bumpSeed: number
  choiceTransactions: Array<Array<types.CompiledTransactionJSON>>
}

export class WalletProposalV0 {
  readonly proposal: PublicKey
  readonly organizationWallet: PublicKey
  readonly bumpSeed: number
  readonly choiceTransactions: Array<Array<types.CompiledTransaction>>

  static readonly discriminator = Buffer.from([
    2, 200, 97, 215, 249, 199, 25, 63,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("proposal"),
    borsh.publicKey("organizationWallet"),
    borsh.u8("bumpSeed"),
    borsh.vec(
      borsh.vec(types.CompiledTransaction.layout()),
      "choiceTransactions"
    ),
  ])

  constructor(fields: WalletProposalV0Fields) {
    this.proposal = fields.proposal
    this.organizationWallet = fields.organizationWallet
    this.bumpSeed = fields.bumpSeed
    this.choiceTransactions = fields.choiceTransactions.map((item) =>
      item.map((item) => new types.CompiledTransaction({ ...item }))
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<WalletProposalV0 | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<WalletProposalV0 | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): WalletProposalV0 {
    if (!data.slice(0, 8).equals(WalletProposalV0.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = WalletProposalV0.layout.decode(data.slice(8))

    return new WalletProposalV0({
      proposal: dec.proposal,
      organizationWallet: dec.organizationWallet,
      bumpSeed: dec.bumpSeed,
      choiceTransactions: dec.choiceTransactions.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) =>
          item.map(
            (
              item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
            ) => types.CompiledTransaction.fromDecoded(item)
          )
      ),
    })
  }

  toJSON(): WalletProposalV0JSON {
    return {
      proposal: this.proposal.toString(),
      organizationWallet: this.organizationWallet.toString(),
      bumpSeed: this.bumpSeed,
      choiceTransactions: this.choiceTransactions.map((item) =>
        item.map((item) => item.toJSON())
      ),
    }
  }

  static fromJSON(obj: WalletProposalV0JSON): WalletProposalV0 {
    return new WalletProposalV0({
      proposal: new PublicKey(obj.proposal),
      organizationWallet: new PublicKey(obj.organizationWallet),
      bumpSeed: obj.bumpSeed,
      choiceTransactions: obj.choiceTransactions.map((item) =>
        item.map((item) => types.CompiledTransaction.fromJSON(item))
      ),
    })
  }
}
