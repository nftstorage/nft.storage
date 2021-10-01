CREATE TABLE nft_ownership (
    nft_id TEXT NOT NULL,
    owner_id TEXT NOT NULL,
    block_number TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
