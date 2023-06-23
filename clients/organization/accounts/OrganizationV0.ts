import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface OrganizationV0Fields {
  numProposals: number
  /** Authority to create proposals under this organization */
  authority: PublicKey
  defaultProposalConfig: PublicKey
  proposalProgram: PublicKey
  name: string
  bumpSeed: number
}

export interface OrganizationV0JSON {
  numProposals: number
  /** Authority to create proposals under this organization */
  authority: string
  defaultProposalConfig: string
  proposalProgram: string
  name: string
  bumpSeed: number
}

export class OrganizationV0 {
  readonly numProposals: number
  /** Authority to create proposals under this organization */
  readonly authority: PublicKey
  readonly defaultProposalConfig: PublicKey
  readonly proposalProgram: PublicKey
  readonly name: string
  readonly bumpSeed: number

  static readonly discriminator = Buffer.from([
    243, 189, 126, 191, 59, 72, 255, 68,
  ])

  static readonly layout = borsh.struct([
    borsh.u32("numProposals"),
    borsh.publicKey("authority"),
    borsh.publicKey("defaultProposalConfig"),
    borsh.publicKey("proposalProgram"),
    borsh.str("name"),
    borsh.u8("bumpSeed"),
  ])

  constructor(fields: OrganizationV0Fields) {
    this.numProposals = fields.numProposals
    this.authority = fields.authority
    this.defaultProposalConfig = fields.defaultProposalConfig
    this.proposalProgram = fields.proposalProgram
    this.name = fields.name
    this.bumpSeed = fields.bumpSeed
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<OrganizationV0 | null> {
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
  ): Promise<Array<OrganizationV0 | null>> {
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

  static decode(data: Buffer): OrganizationV0 {
    if (!data.slice(0, 8).equals(OrganizationV0.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = OrganizationV0.layout.decode(data.slice(8))

    return new OrganizationV0({
      numProposals: dec.numProposals,
      authority: dec.authority,
      defaultProposalConfig: dec.defaultProposalConfig,
      proposalProgram: dec.proposalProgram,
      name: dec.name,
      bumpSeed: dec.bumpSeed,
    })
  }

  toJSON(): OrganizationV0JSON {
    return {
      numProposals: this.numProposals,
      authority: this.authority.toString(),
      defaultProposalConfig: this.defaultProposalConfig.toString(),
      proposalProgram: this.proposalProgram.toString(),
      name: this.name,
      bumpSeed: this.bumpSeed,
    }
  }

  static fromJSON(obj: OrganizationV0JSON): OrganizationV0 {
    return new OrganizationV0({
      numProposals: obj.numProposals,
      authority: new PublicKey(obj.authority),
      defaultProposalConfig: new PublicKey(obj.defaultProposalConfig),
      proposalProgram: new PublicKey(obj.proposalProgram),
      name: obj.name,
      bumpSeed: obj.bumpSeed,
    })
  }
}
