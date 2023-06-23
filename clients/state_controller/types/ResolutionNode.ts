import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type ResolvedFields = [Array<number>]
export type ResolvedValue = [Array<number>]

export interface ResolvedJSON {
  kind: "Resolved"
  value: [Array<number>]
}

export class Resolved {
  static readonly discriminator = 0
  static readonly kind = "Resolved"
  readonly discriminator = 0
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

export type EndTimestampFields = [BN]
export type EndTimestampValue = [BN]

export interface EndTimestampJSON {
  kind: "EndTimestamp"
  value: [string]
}

export class EndTimestamp {
  static readonly discriminator = 1
  static readonly kind = "EndTimestamp"
  readonly discriminator = 1
  readonly kind = "EndTimestamp"
  readonly value: EndTimestampValue

  constructor(value: EndTimestampFields) {
    this.value = [value[0]]
  }

  toJSON(): EndTimestampJSON {
    return {
      kind: "EndTimestamp",
      value: [this.value[0].toString()],
    }
  }

  toEncodable() {
    return {
      EndTimestamp: {
        _0: this.value[0],
      },
    }
  }
}

export type OffsetFromStartTsFields = [BN]
export type OffsetFromStartTsValue = [BN]

export interface OffsetFromStartTsJSON {
  kind: "OffsetFromStartTs"
  value: [string]
}

export class OffsetFromStartTs {
  static readonly discriminator = 2
  static readonly kind = "OffsetFromStartTs"
  readonly discriminator = 2
  readonly kind = "OffsetFromStartTs"
  readonly value: OffsetFromStartTsValue

  constructor(value: OffsetFromStartTsFields) {
    this.value = [value[0]]
  }

  toJSON(): OffsetFromStartTsJSON {
    return {
      kind: "OffsetFromStartTs",
      value: [this.value[0].toString()],
    }
  }

  toEncodable() {
    return {
      OffsetFromStartTs: {
        _0: this.value[0],
      },
    }
  }
}

export type ChoiceVoteWeightFields = [BN]
export type ChoiceVoteWeightValue = [BN]

export interface ChoiceVoteWeightJSON {
  kind: "ChoiceVoteWeight"
  value: [string]
}

export class ChoiceVoteWeight {
  static readonly discriminator = 3
  static readonly kind = "ChoiceVoteWeight"
  readonly discriminator = 3
  readonly kind = "ChoiceVoteWeight"
  readonly value: ChoiceVoteWeightValue

  constructor(value: ChoiceVoteWeightFields) {
    this.value = [value[0]]
  }

  toJSON(): ChoiceVoteWeightJSON {
    return {
      kind: "ChoiceVoteWeight",
      value: [this.value[0].toString()],
    }
  }

  toEncodable() {
    return {
      ChoiceVoteWeight: {
        _0: this.value[0],
      },
    }
  }
}

export type ChoicePercentageFields = [number]
export type ChoicePercentageValue = [number]

export interface ChoicePercentageJSON {
  kind: "ChoicePercentage"
  value: [number]
}

export class ChoicePercentage {
  static readonly discriminator = 4
  static readonly kind = "ChoicePercentage"
  readonly discriminator = 4
  readonly kind = "ChoicePercentage"
  readonly value: ChoicePercentageValue

  constructor(value: ChoicePercentageFields) {
    this.value = [value[0]]
  }

  toJSON(): ChoicePercentageJSON {
    return {
      kind: "ChoicePercentage",
      value: [this.value[0]],
    }
  }

  toEncodable() {
    return {
      ChoicePercentage: {
        _0: this.value[0],
      },
    }
  }
}

export interface MaxJSON {
  kind: "Max"
}

export class Max {
  static readonly discriminator = 5
  static readonly kind = "Max"
  readonly discriminator = 5
  readonly kind = "Max"

  toJSON(): MaxJSON {
    return {
      kind: "Max",
    }
  }

  toEncodable() {
    return {
      Max: {},
    }
  }
}

export interface AndJSON {
  kind: "And"
}

export class And {
  static readonly discriminator = 6
  static readonly kind = "And"
  readonly discriminator = 6
  readonly kind = "And"

  toJSON(): AndJSON {
    return {
      kind: "And",
    }
  }

  toEncodable() {
    return {
      And: {},
    }
  }
}

export interface OrJSON {
  kind: "Or"
}

export class Or {
  static readonly discriminator = 7
  static readonly kind = "Or"
  readonly discriminator = 7
  readonly kind = "Or"

  toJSON(): OrJSON {
    return {
      kind: "Or",
    }
  }

  toEncodable() {
    return {
      Or: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.ResolutionNodeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Resolved" in obj) {
    const val = obj["Resolved"]
    return new Resolved([val["_0"]])
  }
  if ("EndTimestamp" in obj) {
    const val = obj["EndTimestamp"]
    return new EndTimestamp([val["_0"]])
  }
  if ("OffsetFromStartTs" in obj) {
    const val = obj["OffsetFromStartTs"]
    return new OffsetFromStartTs([val["_0"]])
  }
  if ("ChoiceVoteWeight" in obj) {
    const val = obj["ChoiceVoteWeight"]
    return new ChoiceVoteWeight([val["_0"]])
  }
  if ("ChoicePercentage" in obj) {
    const val = obj["ChoicePercentage"]
    return new ChoicePercentage([val["_0"]])
  }
  if ("Max" in obj) {
    return new Max()
  }
  if ("And" in obj) {
    return new And()
  }
  if ("Or" in obj) {
    return new Or()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.ResolutionNodeJSON
): types.ResolutionNodeKind {
  switch (obj.kind) {
    case "Resolved": {
      return new Resolved([obj.value[0]])
    }
    case "EndTimestamp": {
      return new EndTimestamp([new BN(obj.value[0])])
    }
    case "OffsetFromStartTs": {
      return new OffsetFromStartTs([new BN(obj.value[0])])
    }
    case "ChoiceVoteWeight": {
      return new ChoiceVoteWeight([new BN(obj.value[0])])
    }
    case "ChoicePercentage": {
      return new ChoicePercentage([obj.value[0]])
    }
    case "Max": {
      return new Max()
    }
    case "And": {
      return new And()
    }
    case "Or": {
      return new Or()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([borsh.vec(borsh.u16(), "_0")], "Resolved"),
    borsh.struct([borsh.i64("_0")], "EndTimestamp"),
    borsh.struct([borsh.i64("_0")], "OffsetFromStartTs"),
    borsh.struct([borsh.u128("_0")], "ChoiceVoteWeight"),
    borsh.struct([borsh.i32("_0")], "ChoicePercentage"),
    borsh.struct([], "Max"),
    borsh.struct([], "And"),
    borsh.struct([], "Or"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
