import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DraftJSON {
  kind: "Draft"
}

export class Draft {
  static readonly discriminator = 0
  static readonly kind = "Draft"
  readonly discriminator = 0
  readonly kind = "Draft"

  toJSON(): DraftJSON {
    return {
      kind: "Draft",
    }
  }

  toEncodable() {
    return {
      Draft: {},
    }
  }
}

export type VotingFields = [BN]
export type VotingValue = [BN]

export interface VotingJSON {
  kind: "Voting"
  value: [string]
}

export class Voting {
  static readonly discriminator = 1
  static readonly kind = "Voting"
  readonly discriminator = 1
  readonly kind = "Voting"
  readonly value: VotingValue

  constructor(value: VotingFields) {
    this.value = [value[0]]
  }

  toJSON(): VotingJSON {
    return {
      kind: "Voting",
      value: [this.value[0].toString()],
    }
  }

  toEncodable() {
    return {
      Voting: {
        _0: this.value[0],
      },
    }
  }
}

export type ResolvedFields = [Array<number>]
export type ResolvedValue = [Array<number>]

export interface ResolvedJSON {
  kind: "Resolved"
  value: [Array<number>]
}

export class Resolved {
  static readonly discriminator = 2
  static readonly kind = "Resolved"
  readonly discriminator = 2
  readonly kind = "Resolved"
  readonly value: ResolvedValue

  constructor(value: ResolvedFields) {
    this.value = [value[0]]
  }

  toJSON(): ResolvedJSON {
    return {
      kind: "Resolved",
      value: [this.value[0]],
    }
  }

  toEncodable() {
    return {
      Resolved: {
        _0: this.value[0],
      },
    }
  }
}

export type CustomFields = [string]
export type CustomValue = [string]

export interface CustomJSON {
  kind: "Custom"
  value: [string]
}

export class Custom {
  static readonly discriminator = 3
  static readonly kind = "Custom"
  readonly discriminator = 3
  readonly kind = "Custom"
  readonly value: CustomValue

  constructor(value: CustomFields) {
    this.value = [value[0]]
  }

  toJSON(): CustomJSON {
    return {
      kind: "Custom",
      value: [this.value[0]],
    }
  }

  toEncodable() {
    return {
      Custom: {
        _0: this.value[0],
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.ProposalStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Draft" in obj) {
    return new Draft()
  }
  if ("Voting" in obj) {
    const val = obj["Voting"]
    return new Voting([val["_0"]])
  }
  if ("Resolved" in obj) {
    const val = obj["Resolved"]
    return new Resolved([val["_0"]])
  }
  if ("Custom" in obj) {
    const val = obj["Custom"]
    return new Custom([val["_0"]])
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.ProposalStateJSON
): types.ProposalStateKind {
  switch (obj.kind) {
    case "Draft": {
      return new Draft()
    }
    case "Voting": {
      return new Voting([new BN(obj.value[0])])
    }
    case "Resolved": {
      return new Resolved([obj.value[0]])
    }
    case "Custom": {
      return new Custom([obj.value[0]])
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Draft"),
    borsh.struct([borsh.i64("_0")], "Voting"),
    borsh.struct([borsh.vec(borsh.u16(), "_0")], "Resolved"),
    borsh.struct([borsh.str("_0")], "Custom"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
