import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface OrganizationWalletV0Fields {
  index: number
  organization: PublicKey
  wallet: PublicKey
  proposalConfig: PublicKey
  name: string
  bumpSeed: number
  walletBumpSeed: number
}

export interface OrganizationWalletV0JSON {
  index: number
  organization: string
  wallet: string
  proposalConfig: string
  name: string
  bumpSeed: number
  walletBumpSeed: number
}

export class OrganizationWalletV0 {
  readonly index: number
  readonly organization: PublicKey
  readonly wallet: PublicKey
  readonly proposalConfig: PublicKey
  readonly name: string
  readonly bumpSeed: number
  readonly walletBumpSeed: number

  static readonly discriminator = Buffer.from([
    109, 189, 12, 230, 146, 133, 131, 92,
  ])

  static readonly layout = borsh.struct([
    borsh.u16("index"),
    borsh.publicKey("organization"),
    borsh.publicKey("wallet"),
    borsh.publicKey("proposalConfig"),
    borsh.str("name"),
    borsh.u8("bumpSeed"),
    borsh.u8("walletBumpSeed"),
  ])

  constructor(fields: OrganizationWalletV0Fields) {
    this.index = fields.index
    this.organization = fields.organization
    this.wallet = fields.wallet
    this.proposalConfig = fields.proposalConfig
    this.name = fields.name
    this.bumpSeed = fields.bumpSeed
    this.walletBumpSeed = fields.walletBumpSeed
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<OrganizationWalletV0 | null> {
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
  ): Promise<Array<OrganizationWalletV0 | null>> {
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

  static decode(data: Buffer): OrganizationWalletV0 {
    if (!data.slice(0, 8).equals(OrganizationWalletV0.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = OrganizationWalletV0.layout.decode(data.slice(8))

    return new OrganizationWalletV0({
      index: dec.index,
      organization: dec.organization,
      wallet: dec.wallet,
      proposalConfig: dec.proposalConfig,
      name: dec.name,
      bumpSeed: dec.bumpSeed,
      walletBumpSeed: dec.walletBumpSeed,
    })
  }

  toJSON(): OrganizationWalletV0JSON {
    return {
      index: this.index,
      organization: this.organization.toString(),
      wallet: this.wallet.toString(),
      proposalConfig: this.proposalConfig.toString(),
      name: this.name,
      bumpSeed: this.bumpSeed,
      walletBumpSeed: this.walletBumpSeed,
    }
  }

  static fromJSON(obj: OrganizationWalletV0JSON): OrganizationWalletV0 {
    return new OrganizationWalletV0({
      index: obj.index,
      organization: new PublicKey(obj.organization),
      wallet: new PublicKey(obj.wallet),
      proposalConfig: new PublicKey(obj.proposalConfig),
      name: obj.name,
      bumpSeed: obj.bumpSeed,
      walletBumpSeed: obj.walletBumpSeed,
    })
  }
}
