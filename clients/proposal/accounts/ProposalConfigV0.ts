import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ProposalConfigV0Fields {
  /** Signer that controls voting and vote weights */
  voteController: PublicKey
  /**
   * Signer that controls the transitions of `ProposalState`
   * You can either use the default `state-controller` smart contract
   * Or you can implement a program that calls the `resolve_v0` method.
   * The vote can only be resolved when this `resolution_settings` PDA signs `resolve_v0`. This allows
   * you to trigger resolution on either (a) a vote, (b) a timestamp, or (c) some custom trigger with clockwork
   */
  stateController: PublicKey
  /**
   * Optional program that will be called with `on_vote_v0` after every vote
   * Defaults to the owner of `resolution_settings`, which allows it to reactively call resolve_v0
   */
  onVoteHook: PublicKey
  name: string
  bumpSeed: number
}

export interface ProposalConfigV0JSON {
  /** Signer that controls voting and vote weights */
  voteController: string
  /**
   * Signer that controls the transitions of `ProposalState`
   * You can either use the default `state-controller` smart contract
   * Or you can implement a program that calls the `resolve_v0` method.
   * The vote can only be resolved when this `resolution_settings` PDA signs `resolve_v0`. This allows
   * you to trigger resolution on either (a) a vote, (b) a timestamp, or (c) some custom trigger with clockwork
   */
  stateController: string
  /**
   * Optional program that will be called with `on_vote_v0` after every vote
   * Defaults to the owner of `resolution_settings`, which allows it to reactively call resolve_v0
   */
  onVoteHook: string
  name: string
  bumpSeed: number
}

export class ProposalConfigV0 {
  /** Signer that controls voting and vote weights */
  readonly voteController: PublicKey
  /**
   * Signer that controls the transitions of `ProposalState`
   * You can either use the default `state-controller` smart contract
   * Or you can implement a program that calls the `resolve_v0` method.
   * The vote can only be resolved when this `resolution_settings` PDA signs `resolve_v0`. This allows
   * you to trigger resolution on either (a) a vote, (b) a timestamp, or (c) some custom trigger with clockwork
   */
  readonly stateController: PublicKey
  /**
   * Optional program that will be called with `on_vote_v0` after every vote
   * Defaults to the owner of `resolution_settings`, which allows it to reactively call resolve_v0
   */
  readonly onVoteHook: PublicKey
  readonly name: string
  readonly bumpSeed: number

  static readonly discriminator = Buffer.from([
    162, 41, 210, 200, 205, 177, 228, 11,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("voteController"),
    borsh.publicKey("stateController"),
    borsh.publicKey("onVoteHook"),
    borsh.str("name"),
    borsh.u8("bumpSeed"),
  ])

  constructor(fields: ProposalConfigV0Fields) {
    this.voteController = fields.voteController
    this.stateController = fields.stateController
    this.onVoteHook = fields.onVoteHook
    this.name = fields.name
    this.bumpSeed = fields.bumpSeed
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ProposalConfigV0 | null> {
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
  ): Promise<Array<ProposalConfigV0 | null>> {
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

  static decode(data: Buffer): ProposalConfigV0 {
    if (!data.slice(0, 8).equals(ProposalConfigV0.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ProposalConfigV0.layout.decode(data.slice(8))

    return new ProposalConfigV0({
      voteController: dec.voteController,
      stateController: dec.stateController,
      onVoteHook: dec.onVoteHook,
      name: dec.name,
      bumpSeed: dec.bumpSeed,
    })
  }

  toJSON(): ProposalConfigV0JSON {
    return {
      voteController: this.voteController.toString(),
      stateController: this.stateController.toString(),
      onVoteHook: this.onVoteHook.toString(),
      name: this.name,
      bumpSeed: this.bumpSeed,
    }
  }

  static fromJSON(obj: ProposalConfigV0JSON): ProposalConfigV0 {
    return new ProposalConfigV0({
      voteController: new PublicKey(obj.voteController),
      stateController: new PublicKey(obj.stateController),
      onVoteHook: new PublicKey(obj.onVoteHook),
      name: obj.name,
      bumpSeed: obj.bumpSeed,
    })
  }
}
