
CREATE TABLE niftysave_migration (
  id text NOT NULL,
  collection TEXT NOT NULL,
  cursor TEXT,
  metadata JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY ("id")
);
COMMENT ON TABLE "public"."niftysave_migration" IS E'Utility table to keep track of migrations';
