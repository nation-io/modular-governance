import * as ProposalState from "./ProposalState"

export { InitializeProposalArgsV0 } from "./InitializeProposalArgsV0"
export type {
  InitializeProposalArgsV0Fields,
  InitializeProposalArgsV0JSON,
} from "./InitializeProposalArgsV0"
export { UpdateStateArgsV0 } from "./UpdateStateArgsV0"
export type {
  UpdateStateArgsV0Fields,
  UpdateStateArgsV0JSON,
} from "./UpdateStateArgsV0"
export { VoteArgsV0 } from "./VoteArgsV0"
export type { VoteArgsV0Fields, VoteArgsV0JSON } from "./VoteArgsV0"
export { Choice } from "./Choice"
export type { ChoiceFields, ChoiceJSON } from "./Choice"
export { ProposalState }

export type ProposalStateKind =
  | ProposalState.Draft
  | ProposalState.Voting
  | ProposalState.Resolved
  | ProposalState.Custom
export type ProposalStateJSON =
  | ProposalState.DraftJSON
  | ProposalState.VotingJSON
  | ProposalState.ResolvedJSON
  | ProposalState.CustomJSON
