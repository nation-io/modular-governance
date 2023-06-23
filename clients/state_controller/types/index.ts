import * as ResolutionNode from "./ResolutionNode"

export { InitializeResolutionSettingsArgsV0 } from "./InitializeResolutionSettingsArgsV0"
export type {
  InitializeResolutionSettingsArgsV0Fields,
  InitializeResolutionSettingsArgsV0JSON,
} from "./InitializeResolutionSettingsArgsV0"
export { VoteArgsV0 } from "./VoteArgsV0"
export type { VoteArgsV0Fields, VoteArgsV0JSON } from "./VoteArgsV0"
export { ResolutionStrategy } from "./ResolutionStrategy"
export type {
  ResolutionStrategyFields,
  ResolutionStrategyJSON,
} from "./ResolutionStrategy"
export { ResolutionNode }

/** Allow building complex operations to decide resolution. */
export type ResolutionNodeKind =
  | ResolutionNode.Resolved
  | ResolutionNode.EndTimestamp
  | ResolutionNode.OffsetFromStartTs
  | ResolutionNode.ChoiceVoteWeight
  | ResolutionNode.ChoicePercentage
  | ResolutionNode.Max
  | ResolutionNode.And
  | ResolutionNode.Or
export type ResolutionNodeJSON =
  | ResolutionNode.ResolvedJSON
  | ResolutionNode.EndTimestampJSON
  | ResolutionNode.OffsetFromStartTsJSON
  | ResolutionNode.ChoiceVoteWeightJSON
  | ResolutionNode.ChoicePercentageJSON
  | ResolutionNode.MaxJSON
  | ResolutionNode.AndJSON
  | ResolutionNode.OrJSON
