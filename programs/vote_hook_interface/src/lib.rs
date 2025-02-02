use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[derive(Accounts)]
#[instruction(args: VoteArgsV0)]
pub struct OnVoteV0<'info> {
  pub vote_controller: Signer<'info>,
  /// CHECK: Check in your impl
  pub state_controller: AccountInfo<'info>,
  /// CHECK: Check in your impl
  pub proposal: AccountInfo<'info>,
  /// CHECK: Check in your impl
  pub proposal_program: AccountInfo<'info>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct VoteArgsV0 {
  pub choice: u16,
  pub weight: u128,
  /// This is a remove operation
  pub remove_vote: bool,
}

#[program]
pub mod vote_hook_interface {
  use super::*;

  pub fn on_vote_v0(_ctx: Context<OnVoteV0>, _args: VoteArgsV0) -> Result<()> {
    Ok(())
  }
}
