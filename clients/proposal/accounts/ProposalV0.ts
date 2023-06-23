import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ProposalV0Fields {
  owner: PublicKey
  state: types.ProposalStateKind
  createdAt: BN
  proposalConfig: PublicKey
  seed: Uint8Array
  name: string
  /** URI to json containing name, description, etc */
  uri: string
  tags: Array<string>
  choices: Array<types.ChoiceFields>
  bumpSeed: number
}

export interface ProposalV0JSON {
  owner: string
  state: types.ProposalStateJSON
  createdAt: string
  proposalConfig: string
  seed: Array<number>
  name: string
  /** URI to json containing name, description, etc */
  uri: string
  tags: Array<string>
  choices: Array<types.ChoiceJSON>
  bumpSeed: number
}

export class ProposalV0 {
  readonly owner: PublicKey
  readonly state: types.ProposalStateKind
  readonly createdAt: BN
  readonly proposalConfig: PublicKey
  readonly seed: Uint8Array
  readonly name: string
  /** URI to json containing name, description, etc */
  readonly uri: string
  readonly tags: Array<string>
  readonly choices: Array<types.Choice>
  readonly bumpSeed: number

  static readonly discriminator = Buffer.from([
    254, 194, 16, 171, 214, 20, 192, 81,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("owner"),
    types.ProposalState.layout("state"),
    borsh.i64("createdAt"),
    borsh.publicKey("proposalConfig"),
    borsh.vecU8("seed"),
    borsh.str("name"),
    borsh.str("uri"),
    borsh.vec(borsh.str(), "tags"),
    borsh.vec(types.Choice.layout(), "choices"),
    borsh.u8("bumpSeed"),
  ])

  constructor(fields: ProposalV0Fields) {
    this.owner = fields.owner
    this.state = fields.state
    this.createdAt = fields.createdAt
    this.proposalConfig = fields.proposalConfig
    this.seed = fields.seed
    this.name = fields.name
    this.uri = fields.uri
    this.tags = fields.tags
    this.choices = fields.choices.map((item) => new types.Choice({ ...item }))
    this.bumpSeed = fields.bumpSeed
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ProposalV0 | null> {
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
  ): Promise<Array<ProposalV0 | null>> {
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

  static decode(data: Buffer): ProposalV0 {
    if (!data.slice(0, 8).equals(ProposalV0.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ProposalV0.layout.decode(data.slice(8))

    return new ProposalV0({
      owner: dec.owner,
      state: types.ProposalState.fromDecoded(dec.state),
      createdAt: dec.createdAt,
      proposalConfig: dec.proposalConfig,
      seed: new Uint8Array(
        dec.seed.buffer,
        dec.seed.byteOffset,
        dec.seed.length
      ),
      name: dec.name,
      uri: dec.uri,
      tags: dec.tags,
      choices: dec.choices.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Choice.fromDecoded(item)
      ),
      bumpSeed: dec.bumpSeed,
    })
  }

  toJSON(): ProposalV0JSON {
    return {
      owner: this.owner.toString(),
      state: this.state.toJSON(),
      createdAt: this.createdAt.toString(),
      proposalConfig: this.proposalConfig.toString(),
      seed: Array.from(this.seed.values()),
      name: this.name,
      uri: this.uri,
      tags: this.tags,
      choices: this.choices.map((item) => item.toJSON()),
      bumpSeed: this.bumpSeed,
    }
  }

  static fromJSON(obj: ProposalV0JSON): ProposalV0 {
    return new ProposalV0({
      owner: new PublicKey(obj.owner),
      state: types.ProposalState.fromJSON(obj.state),
      createdAt: new BN(obj.createdAt),
      proposalConfig: new PublicKey(obj.proposalConfig),
      seed: Uint8Array.from(obj.seed),
      name: obj.name,
      uri: obj.uri,
      tags: obj.tags,
      choices: obj.choices.map((item) => types.Choice.fromJSON(item)),
      bumpSeed: obj.bumpSeed,
    })
  }
}
