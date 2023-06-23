export type CustomError = ArithmeticError

export class ArithmeticError extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "ArithmeticError"
  readonly msg = "Error in arithmetic"

  constructor(readonly logs?: string[]) {
    super("6000: Error in arithmetic")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new ArithmeticError(logs)
  }

  return null
}
