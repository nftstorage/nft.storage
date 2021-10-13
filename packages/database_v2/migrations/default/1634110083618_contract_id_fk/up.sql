ALTER TABLE nft ADD
FOREIGN KEY (contract_id) REFERENCES blockchain_contract(id);
