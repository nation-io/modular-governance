import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InitializeResolutionSettingsArgsV0Fields {
  name: string
  settings: types.ResolutionStrategyFields
}

export interface InitializeResolutionSettingsArgsV0JSON {
  name: string
  settings: types.ResolutionStrategyJSON
}

export class InitializeResolutionSettingsArgsV0 {
  readonly name: string
  readonly settings: types.ResolutionStrategy

  constructor(fields: InitializeResolutionSettingsArgsV0Fields) {
    this.name = fields.name
    this.settings = new types.ResolutionStrategy({ ...fields.settings })
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.str("name"), types.ResolutionStrategy.layout("settings")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitializeResolutionSettingsArgsV0({
      name: obj.name,
      settings: types.ResolutionStrategy.fromDecoded(obj.settings),
    })
  }

  static toEncodable(fields: InitializeResolutionSettingsArgsV0Fields) {
    return {
      name: fields.name,
      settings: types.ResolutionStrategy.toEncodable(fields.settings),
    }
  }

  toJSON(): InitializeResolutionSettingsArgsV0JSON {
    return {
      name: this.name,
      settings: this.settings.toJSON(),
    }
  }

  static fromJSON(
    obj: InitializeResolutionSettingsArgsV0JSON
  ): InitializeResolutionSettingsArgsV0 {
    return new InitializeResolutionSettingsArgsV0({
      name: obj.name,
      settings: types.ResolutionStrategy.fromJSON(obj.settings),
    })
  }

  toEncodable() {
    return InitializeResolutionSettingsArgsV0.toEncodable(this)
  }
}
