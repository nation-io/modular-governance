import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ResolutionSettingsV0Fields {
  name: string
  settings: types.ResolutionStrategyFields
  bumpSeed: number
}

export interface ResolutionSettingsV0JSON {
  name: string
  settings: types.ResolutionStrategyJSON
  bumpSeed: number
}

export class ResolutionSettingsV0 {
  readonly name: string
  readonly settings: types.ResolutionStrategy
  readonly bumpSeed: number

  static readonly discriminator = Buffer.from([
    169, 38, 51, 69, 190, 118, 10, 130,
  ])

  static readonly layout = borsh.struct([
    borsh.str("name"),
    types.ResolutionStrategy.layout("settings"),
    borsh.u8("bumpSeed"),
  ])

  constructor(fields: ResolutionSettingsV0Fields) {
    this.name = fields.name
    this.settings = new types.ResolutionStrategy({ ...fields.settings })
    this.bumpSeed = fields.bumpSeed
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ResolutionSettingsV0 | null> {
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
  ): Promise<Array<ResolutionSettingsV0 | null>> {
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

  static decode(data: Buffer): ResolutionSettingsV0 {
    if (!data.slice(0, 8).equals(ResolutionSettingsV0.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ResolutionSettingsV0.layout.decode(data.slice(8))

    return new ResolutionSettingsV0({
      name: dec.name,
      settings: types.ResolutionStrategy.fromDecoded(dec.settings),
      bumpSeed: dec.bumpSeed,
    })
  }

  toJSON(): ResolutionSettingsV0JSON {
    return {
      name: this.name,
      settings: this.settings.toJSON(),
      bumpSeed: this.bumpSeed,
    }
  }

  static fromJSON(obj: ResolutionSettingsV0JSON): ResolutionSettingsV0 {
    return new ResolutionSettingsV0({
      name: obj.name,
      settings: types.ResolutionStrategy.fromJSON(obj.settings),
      bumpSeed: obj.bumpSeed,
    })
  }
}
