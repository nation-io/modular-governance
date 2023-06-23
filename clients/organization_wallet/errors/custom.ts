export type CustomError = InvalidDataIncrease | InstructionSerializeFailed

export class InvalidDataIncrease extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "InvalidDataIncrease"
  readonly msg = "The realloc increase was too large"

  constructor(readonly logs?: string[]) {
    super("6000: The realloc increase was too large")
  }
}

export class InstructionSerializeFailed extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "InstructionSerializeFailed"

  constructor(readonly logs?: string[]) {
    super("6001: ")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new InvalidDataIncrease(logs)
    case 6001:
      return new InstructionSerializeFailed(logs)
  }

  return null
}
