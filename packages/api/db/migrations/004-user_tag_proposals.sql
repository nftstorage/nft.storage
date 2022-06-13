-- Migration to setup user_tag_proposal
CREATE TYPE user_tag_proposal_decision_type AS ENUM
(
  'Approved',
  'Declined'
);

CREATE TABLE IF NOT EXISTS public.user_tag_proposal
(
  id                     BIGSERIAL      PRIMARY KEY,
  user_id                BIGINT         NOT NULL REFERENCES public.user (id),
  tag                    user_tag_type  NOT NULL,
  proposed_tag_value     TEXT           NOT NULL,
  user_proposal_form     jsonb          NOT NULL,
  admin_decision_message TEXT                   ,
  admin_decision_type    user_tag_proposal_decision_type,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  deleted_at  TIMESTAMP WITH TIME ZONE
);
-- Note: We index active user_tag_proposals with deleted_at IS NULL to enforce only 1 active
-- tag type proposal per user.  We allow there to be multiple deleted user_tag_proposals of the same type per
-- user to handle the scenario where a user has been denied multiple times by admins.
-- If deleted_at is populated, it means the user_tag_proposal has been cancelled by
-- a user or a decision has been provided by an admin.
CREATE UNIQUE INDEX IF NOT EXISTS user_tag_proposal_is_not_deleted_idx ON user_tag_proposal (user_id, tag)
WHERE deleted_at IS NULL;

