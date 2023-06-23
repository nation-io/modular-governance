import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface OrganizationWalletPropoalV0Fields {
  organizationWallet: PublicKey
  proposal: PublicKey
  accounts: Array<PublicKey>
  transactionsByChoice: Array<Array<types.CompiledTransactionFields>>
  bumpSeed: number
}

export interface OrganizationWalletPropoalV0JSON {
  organizationWallet: string
  proposal: string
  accounts: Array<string>
  transactionsByChoice: Array<Array<types.CompiledTransactionJSON>>
  bumpSeed: number
}

export class OrganizationWalletPropoalV0 {
  readonly organizationWallet: PublicKey
  readonly proposal: PublicKey
  readonly accounts: Array<PublicKey>
  readonly transactionsByChoice: Array<Array<types.CompiledTransaction>>
  readonly bumpSeed: number

  static readonly discriminator = Buffer.from([
    157, 230, 192, 71, 8, 154, 153, 188,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("organizationWallet"),
    borsh.publicKey("proposal"),
    borsh.vec(borsh.publicKey(), "accounts"),
    borsh.vec(
      borsh.vec(types.CompiledTransaction.layout()),
      "transactionsByChoice"
    ),
    borsh.u8("bumpSeed"),
  ])

  constructor(fields: OrganizationWalletPropoalV0Fields) {
    this.organizationWallet = fields.organizationWallet
    this.proposal = fields.proposal
    this.accounts = fields.accounts
    this.transactionsByChoice = fields.transactionsByChoice.map((item) =>
      item.map((item) => new types.CompiledTransaction({ ...item }))
    )
    this.bumpSeed = fields.bumpSeed
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<OrganizationWalletPropoalV0 | null> {
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
  ): Promise<Array<OrganizationWalletPropoalV0 | null>> {
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

  static decode(data: Buffer): OrganizationWalletPropoalV0 {
    if (!data.slice(0, 8).equals(OrganizationWalletPropoalV0.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = OrganizationWalletPropoalV0.layout.decode(data.slice(8))

    return new OrganizationWalletPropoalV0({
      organizationWallet: dec.organizationWallet,
      proposal: dec.proposal,
      accounts: dec.accounts,
      transactionsByChoice: dec.transactionsByChoice.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) =>
          item.map(
            (
              item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
            ) => types.CompiledTransaction.fromDecoded(item)
          )
      ),
      bumpSeed: dec.bumpSeed,
    })
  }

  toJSON(): OrganizationWalletPropoalV0JSON {
    return {
      organizationWallet: this.organizationWallet.toString(),
      proposal: this.proposal.toString(),
      accounts: this.accounts.map((item) => item.toString()),
      transactionsByChoice: this.transactionsByChoice.map((item) =>
        item.map((item) => item.toJSON())
      ),
      bumpSeed: this.bumpSeed,
    }
  }

  static fromJSON(
    obj: OrganizationWalletPropoalV0JSON
  ): OrganizationWalletPropoalV0 {
    return new OrganizationWalletPropoalV0({
      organizationWallet: new PublicKey(obj.organizationWallet),
      proposal: new PublicKey(obj.proposal),
      accounts: obj.accounts.map((item) => new PublicKey(item)),
      transactionsByChoice: obj.transactionsByChoice.map((item) =>
        item.map((item) => types.CompiledTransaction.fromJSON(item))
      ),
      bumpSeed: obj.bumpSeed,
    })
  }
}
