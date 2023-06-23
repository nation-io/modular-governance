import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InitializeOrganizationArgsV0Fields {
  name: string
  authority: PublicKey
  defaultProposalConfig: PublicKey
  proposalProgram: PublicKey
}

export interface InitializeOrganizationArgsV0JSON {
  name: string
  authority: string
  defaultProposalConfig: string
  proposalProgram: string
}

export class InitializeOrganizationArgsV0 {
  readonly name: string
  readonly authority: PublicKey
  readonly defaultProposalConfig: PublicKey
  readonly proposalProgram: PublicKey

  constructor(fields: InitializeOrganizationArgsV0Fields) {
    this.name = fields.name
    this.authority = fields.authority
    this.defaultProposalConfig = fields.defaultProposalConfig
    this.proposalProgram = fields.proposalProgram
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.str("name"),
        borsh.publicKey("authority"),
        borsh.publicKey("defaultProposalConfig"),
        borsh.publicKey("proposalProgram"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitializeOrganizationArgsV0({
      name: obj.name,
      authority: obj.authority,
      defaultProposalConfig: obj.defaultProposalConfig,
      proposalProgram: obj.proposalProgram,
    })
  }

  static toEncodable(fields: InitializeOrganizationArgsV0Fields) {
    return {
      name: fields.name,
      authority: fields.authority,
      defaultProposalConfig: fields.defaultProposalConfig,
      proposalProgram: fields.proposalProgram,
    }
  }

  toJSON(): InitializeOrganizationArgsV0JSON {
    return {
      name: this.name,
      authority: this.authority.toString(),
      defaultProposalConfig: this.defaultProposalConfig.toString(),
      proposalProgram: this.proposalProgram.toString(),
    }
  }

  static fromJSON(
    obj: InitializeOrganizationArgsV0JSON
  ): InitializeOrganizationArgsV0 {
    return new InitializeOrganizationArgsV0({
      name: obj.name,
      authority: new PublicKey(obj.authority),
      defaultProposalConfig: new PublicKey(obj.defaultProposalConfig),
      proposalProgram: new PublicKey(obj.proposalProgram),
    })
  }

  toEncodable() {
    return InitializeOrganizationArgsV0.toEncodable(this)
  }
}
