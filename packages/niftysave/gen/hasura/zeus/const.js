/* eslint-disable */
export const AllTypesProps = {
    Boolean_comparison_exp: {
        _eq: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "Boolean",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "Boolean",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    String_comparison_exp: {
        _eq: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _ilike: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "String",
            array: true,
            arrayRequired: false,
            required: true
        },
        _iregex: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _like: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nilike: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "String",
            array: true,
            arrayRequired: false,
            required: true
        },
        _niregex: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nlike: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nregex: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nsimilar: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _regex: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _similar: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    bigint: "String",
    bigint_comparison_exp: {
        _eq: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "bigint",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "bigint",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    blockchain_block: {
        nfts: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nfts_aggregate: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    blockchain_block_aggregate_fields: {
        count: {
            columns: {
                type: "blockchain_block_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    blockchain_block_bool_exp: {
        _and: {
            type: "blockchain_block_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "blockchain_block_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "blockchain_block_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        hash: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        nfts: {
            type: "nfts_by_blockchain_blocks_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        number: {
            type: "bigint_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_block_constraint: "enum",
    blockchain_block_inc_input: {
        number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_block_insert_input: {
        hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nfts: {
            type: "nfts_by_blockchain_blocks_arr_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_block_on_conflict: {
        constraint: {
            type: "blockchain_block_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "blockchain_block_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "blockchain_block_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_block_order_by: {
        hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nfts_aggregate: {
            type: "nfts_by_blockchain_blocks_aggregate_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        number: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_block_pk_columns_input: {
        hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    blockchain_block_select_column: "enum",
    blockchain_block_set_input: {
        hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_block_update_column: "enum",
    blockchain_contract_aggregate_fields: {
        count: {
            columns: {
                type: "blockchain_contract_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    blockchain_contract_bool_exp: {
        _and: {
            type: "blockchain_contract_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "blockchain_contract_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "blockchain_contract_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        supports_eip721_metadata: {
            type: "Boolean_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        symbol: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_contract_constraint: "enum",
    blockchain_contract_insert_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        supports_eip721_metadata: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        symbol: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_contract_obj_rel_insert_input: {
        data: {
            type: "blockchain_contract_insert_input",
            array: false,
            arrayRequired: false,
            required: true
        },
        on_conflict: {
            type: "blockchain_contract_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_contract_on_conflict: {
        constraint: {
            type: "blockchain_contract_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "blockchain_contract_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "blockchain_contract_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_contract_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        supports_eip721_metadata: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        symbol: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_contract_pk_columns_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    blockchain_contract_select_column: "enum",
    blockchain_contract_set_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        supports_eip721_metadata: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        symbol: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    blockchain_contract_update_column: "enum",
    bytea: "String",
    bytea_comparison_exp: {
        _eq: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "bytea",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "bytea",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    content: {
        pins: {
            distinct_on: {
                type: "pin_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "pin_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        pins_aggregate: {
            distinct_on: {
                type: "pin_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "pin_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    content_aggregate_fields: {
        count: {
            columns: {
                type: "content_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    content_bool_exp: {
        _and: {
            type: "content_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "content_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "content_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        cid: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        dag_size: {
            type: "bigint_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        pins: {
            type: "pin_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    content_constraint: "enum",
    content_inc_input: {
        dag_size: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    content_insert_input: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        dag_size: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        pins: {
            type: "pin_arr_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    content_obj_rel_insert_input: {
        data: {
            type: "content_insert_input",
            array: false,
            arrayRequired: false,
            required: true
        },
        on_conflict: {
            type: "content_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    content_on_conflict: {
        constraint: {
            type: "content_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "content_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "content_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    content_order_by: {
        cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        dag_size: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        pins_aggregate: {
            type: "pin_aggregate_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    content_pk_columns_input: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    content_select_column: "enum",
    content_set_input: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        dag_size: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    content_update_column: "enum",
    erc721_import_aggregate_fields: {
        count: {
            columns: {
                type: "erc721_import_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    erc721_import_bool_exp: {
        _and: {
            type: "erc721_import_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "erc721_import_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "erc721_import_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        next_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_by_nft_aggregate_fields: {
        count: {
            columns: {
                type: "erc721_import_by_nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    erc721_import_by_nft_bool_exp: {
        _and: {
            type: "erc721_import_by_nft_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "erc721_import_by_nft_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "erc721_import_by_nft_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        erc721_import_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_by_nft_constraint: "enum",
    erc721_import_by_nft_insert_input: {
        erc721_import_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_by_nft_on_conflict: {
        constraint: {
            type: "erc721_import_by_nft_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "erc721_import_by_nft_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "erc721_import_by_nft_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_by_nft_order_by: {
        erc721_import_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_by_nft_pk_columns_input: {
        erc721_import_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    erc721_import_by_nft_select_column: "enum",
    erc721_import_by_nft_set_input: {
        erc721_import_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_by_nft_update_column: "enum",
    erc721_import_constraint: "enum",
    erc721_import_insert_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        next_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_on_conflict: {
        constraint: {
            type: "erc721_import_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "erc721_import_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "erc721_import_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        next_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_pk_columns_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    erc721_import_select_column: "enum",
    erc721_import_set_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        next_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    erc721_import_update_column: "enum",
    fail_nft_asset_args: {
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    fail_resource_args: {
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    ingest_erc721_token_args: {
        block_hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        block_number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        contract_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        contract_name: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        contract_supports_eip721_metadata: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        contract_symbol: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        mint_time: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        owner_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    jsonb: "String",
    jsonb_comparison_exp: {
        _contained_in: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _contains: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _eq: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _has_key: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        _has_keys_all: {
            type: "String",
            array: true,
            arrayRequired: false,
            required: true
        },
        _has_keys_any: {
            type: "String",
            array: true,
            arrayRequired: false,
            required: true
        },
        _in: {
            type: "jsonb",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "jsonb",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    link_nft_resource_args: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    link_resource_content_args: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        dag_size: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        pin_service: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    mutation_root: {
        delete_blockchain_block: {
            where: {
                type: "blockchain_block_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_blockchain_block_by_pk: {
            hash: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_blockchain_contract: {
            where: {
                type: "blockchain_contract_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_blockchain_contract_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_content: {
            where: {
                type: "content_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_content_by_pk: {
            cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_erc721_import: {
            where: {
                type: "erc721_import_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_erc721_import_by_nft: {
            where: {
                type: "erc721_import_by_nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_erc721_import_by_nft_by_pk: {
            erc721_import_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_erc721_import_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft: {
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft_asset: {
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft_asset_by_pk: {
            token_uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft_metadata: {
            where: {
                type: "nft_metadata_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft_metadata_by_pk: {
            cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft_ownership: {
            where: {
                type: "nft_ownership_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nft_ownership_by_pk: {
            block_number: {
                type: "bigint",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            owner_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nfts_by_blockchain_blocks: {
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_nfts_by_blockchain_blocks_by_pk: {
            blockchain_block_hash: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_niftysave_migration: {
            where: {
                type: "niftysave_migration_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_niftysave_migration_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_other_nft_resources: {
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_other_nft_resources_by_pk: {
            metadata_cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            resource_uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_pin: {
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_pin_by_pk: {
            id: {
                type: "bigint",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_resource: {
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        delete_resource_by_pk: {
            uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        fail_nft_asset: {
            args: {
                type: "fail_nft_asset_args",
                array: false,
                arrayRequired: false,
                required: true
            },
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        fail_resource: {
            args: {
                type: "fail_resource_args",
                array: false,
                arrayRequired: false,
                required: true
            },
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        ingest_erc721_token: {
            args: {
                type: "ingest_erc721_token_args",
                array: false,
                arrayRequired: false,
                required: true
            },
            distinct_on: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_blockchain_block: {
            objects: {
                type: "blockchain_block_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "blockchain_block_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_blockchain_block_one: {
            object: {
                type: "blockchain_block_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "blockchain_block_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_blockchain_contract: {
            objects: {
                type: "blockchain_contract_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "blockchain_contract_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_blockchain_contract_one: {
            object: {
                type: "blockchain_contract_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "blockchain_contract_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_content: {
            objects: {
                type: "content_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "content_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_content_one: {
            object: {
                type: "content_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "content_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_erc721_import: {
            objects: {
                type: "erc721_import_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "erc721_import_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_erc721_import_by_nft: {
            objects: {
                type: "erc721_import_by_nft_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "erc721_import_by_nft_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_erc721_import_by_nft_one: {
            object: {
                type: "erc721_import_by_nft_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "erc721_import_by_nft_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_erc721_import_one: {
            object: {
                type: "erc721_import_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "erc721_import_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft: {
            objects: {
                type: "nft_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "nft_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft_asset: {
            objects: {
                type: "nft_asset_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "nft_asset_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft_asset_one: {
            object: {
                type: "nft_asset_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "nft_asset_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft_metadata: {
            objects: {
                type: "nft_metadata_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "nft_metadata_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft_metadata_one: {
            object: {
                type: "nft_metadata_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "nft_metadata_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft_one: {
            object: {
                type: "nft_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "nft_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft_ownership: {
            objects: {
                type: "nft_ownership_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "nft_ownership_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nft_ownership_one: {
            object: {
                type: "nft_ownership_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "nft_ownership_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nfts_by_blockchain_blocks: {
            objects: {
                type: "nfts_by_blockchain_blocks_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "nfts_by_blockchain_blocks_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_nfts_by_blockchain_blocks_one: {
            object: {
                type: "nfts_by_blockchain_blocks_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "nfts_by_blockchain_blocks_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_niftysave_migration: {
            objects: {
                type: "niftysave_migration_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "niftysave_migration_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_niftysave_migration_one: {
            object: {
                type: "niftysave_migration_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "niftysave_migration_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_other_nft_resources: {
            objects: {
                type: "other_nft_resources_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "other_nft_resources_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_other_nft_resources_one: {
            object: {
                type: "other_nft_resources_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "other_nft_resources_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_pin: {
            objects: {
                type: "pin_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "pin_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_pin_one: {
            object: {
                type: "pin_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "pin_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_resource: {
            objects: {
                type: "resource_insert_input",
                array: true,
                arrayRequired: true,
                required: true
            },
            on_conflict: {
                type: "resource_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        insert_resource_one: {
            object: {
                type: "resource_insert_input",
                array: false,
                arrayRequired: false,
                required: true
            },
            on_conflict: {
                type: "resource_on_conflict",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        link_nft_resource: {
            args: {
                type: "link_nft_resource_args",
                array: false,
                arrayRequired: false,
                required: true
            },
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        link_resource_content: {
            args: {
                type: "link_resource_content_args",
                array: false,
                arrayRequired: false,
                required: true
            },
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        parse_nft_asset: {
            args: {
                type: "parse_nft_asset_args",
                array: false,
                arrayRequired: false,
                required: true
            },
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        queue_resource: {
            args: {
                type: "queue_resource_args",
                array: false,
                arrayRequired: false,
                required: true
            },
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        update_blockchain_block: {
            _inc: {
                type: "blockchain_block_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "blockchain_block_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "blockchain_block_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_blockchain_block_by_pk: {
            _inc: {
                type: "blockchain_block_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "blockchain_block_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "blockchain_block_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_blockchain_contract: {
            _set: {
                type: "blockchain_contract_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "blockchain_contract_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_blockchain_contract_by_pk: {
            _set: {
                type: "blockchain_contract_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "blockchain_contract_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_content: {
            _inc: {
                type: "content_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "content_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "content_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_content_by_pk: {
            _inc: {
                type: "content_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "content_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "content_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_erc721_import: {
            _set: {
                type: "erc721_import_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "erc721_import_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_erc721_import_by_nft: {
            _set: {
                type: "erc721_import_by_nft_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "erc721_import_by_nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_erc721_import_by_nft_by_pk: {
            _set: {
                type: "erc721_import_by_nft_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "erc721_import_by_nft_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_erc721_import_by_pk: {
            _set: {
                type: "erc721_import_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "erc721_import_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft: {
            _set: {
                type: "nft_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft_asset: {
            _set: {
                type: "nft_asset_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft_asset_by_pk: {
            _set: {
                type: "nft_asset_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "nft_asset_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft_by_pk: {
            _set: {
                type: "nft_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "nft_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft_metadata: {
            _append: {
                type: "nft_metadata_append_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_at_path: {
                type: "nft_metadata_delete_at_path_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_elem: {
                type: "nft_metadata_delete_elem_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_key: {
                type: "nft_metadata_delete_key_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _prepend: {
                type: "nft_metadata_prepend_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "nft_metadata_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "nft_metadata_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft_metadata_by_pk: {
            _append: {
                type: "nft_metadata_append_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_at_path: {
                type: "nft_metadata_delete_at_path_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_elem: {
                type: "nft_metadata_delete_elem_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_key: {
                type: "nft_metadata_delete_key_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _prepend: {
                type: "nft_metadata_prepend_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "nft_metadata_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "nft_metadata_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft_ownership: {
            _inc: {
                type: "nft_ownership_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "nft_ownership_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "nft_ownership_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nft_ownership_by_pk: {
            _inc: {
                type: "nft_ownership_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "nft_ownership_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "nft_ownership_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nfts_by_blockchain_blocks: {
            _set: {
                type: "nfts_by_blockchain_blocks_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_nfts_by_blockchain_blocks_by_pk: {
            _set: {
                type: "nfts_by_blockchain_blocks_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "nfts_by_blockchain_blocks_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_niftysave_migration: {
            _append: {
                type: "niftysave_migration_append_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_at_path: {
                type: "niftysave_migration_delete_at_path_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_elem: {
                type: "niftysave_migration_delete_elem_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_key: {
                type: "niftysave_migration_delete_key_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _prepend: {
                type: "niftysave_migration_prepend_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "niftysave_migration_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "niftysave_migration_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_niftysave_migration_by_pk: {
            _append: {
                type: "niftysave_migration_append_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_at_path: {
                type: "niftysave_migration_delete_at_path_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_elem: {
                type: "niftysave_migration_delete_elem_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _delete_key: {
                type: "niftysave_migration_delete_key_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _prepend: {
                type: "niftysave_migration_prepend_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "niftysave_migration_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "niftysave_migration_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_other_nft_resources: {
            _set: {
                type: "other_nft_resources_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_other_nft_resources_by_pk: {
            _set: {
                type: "other_nft_resources_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "other_nft_resources_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_pin: {
            _inc: {
                type: "pin_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "pin_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_pin_by_pk: {
            _inc: {
                type: "pin_inc_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            _set: {
                type: "pin_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "pin_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_resource: {
            _set: {
                type: "resource_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        update_resource_by_pk: {
            _set: {
                type: "resource_set_input",
                array: false,
                arrayRequired: false,
                required: false
            },
            pk_columns: {
                type: "resource_pk_columns_input",
                array: false,
                arrayRequired: false,
                required: true
            }
        }
    },
    nft: {
        referrer_blocks: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        referrer_blocks_aggregate: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nft_aggregate_fields: {
        count: {
            columns: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nft_aggregate_order_by: {
        count: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        max: {
            type: "nft_max_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        min: {
            type: "nft_min_order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_arr_rel_insert_input: {
        data: {
            type: "nft_insert_input",
            array: true,
            arrayRequired: true,
            required: true
        },
        on_conflict: {
            type: "nft_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset: {
        nfts: {
            distinct_on: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nfts_aggregate: {
            distinct_on: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nft_asset_aggregate_fields: {
        count: {
            columns: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nft_asset_aggregate_order_by: {
        count: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        max: {
            type: "nft_asset_max_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        min: {
            type: "nft_asset_min_order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_arr_rel_insert_input: {
        data: {
            type: "nft_asset_insert_input",
            array: true,
            arrayRequired: true,
            required: true
        },
        on_conflict: {
            type: "nft_asset_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_bool_exp: {
        _and: {
            type: "nft_asset_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "nft_asset_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "nft_asset_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "nft_metadata_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        nfts: {
            type: "nft_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "nft_asset_status_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "bytea_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_constraint: "enum",
    nft_asset_insert_input: {
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "nft_metadata_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        nfts: {
            type: "nft_arr_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_max_order_by: {
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_min_order_by: {
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_obj_rel_insert_input: {
        data: {
            type: "nft_asset_insert_input",
            array: false,
            arrayRequired: false,
            required: true
        },
        on_conflict: {
            type: "nft_asset_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_on_conflict: {
        constraint: {
            type: "nft_asset_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "nft_asset_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "nft_asset_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_order_by: {
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "nft_metadata_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nfts_aggregate: {
            type: "nft_aggregate_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_pk_columns_input: {
        token_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    nft_asset_select_column: "enum",
    nft_asset_set_input: {
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_asset_status: "String",
    nft_asset_status_comparison_exp: {
        _eq: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "nft_asset_status",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "nft_asset_status",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    nft_asset_update_column: "enum",
    nft_bool_exp: {
        _and: {
            type: "nft_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "nft_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "nft_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        contract: {
            type: "blockchain_contract_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        contract_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        mint_time: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_asset: {
            type: "nft_asset_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        referrer_blocks: {
            type: "nfts_by_blockchain_blocks_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "bytea_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_constraint: "enum",
    nft_insert_input: {
        contract: {
            type: "blockchain_contract_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        contract_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        mint_time: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_asset: {
            type: "nft_asset_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        referrer_blocks: {
            type: "nfts_by_blockchain_blocks_arr_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_max_order_by: {
        contract_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        mint_time: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata: {
        json: {
            path: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_assets: {
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_assets_aggregate: {
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        other_nft_resources: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        other_nft_resources_aggregate: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nft_metadata_aggregate_fields: {
        count: {
            columns: {
                type: "nft_metadata_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nft_metadata_append_input: {
        json: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_bool_exp: {
        _and: {
            type: "nft_metadata_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "nft_metadata_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "nft_metadata_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        cid: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        content: {
            type: "content_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        description: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        image: {
            type: "resource_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        image_uri_hash: {
            type: "bytea_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        json: {
            type: "jsonb_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_assets: {
            type: "nft_asset_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        other_nft_resources: {
            type: "other_nft_resources_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_constraint: "enum",
    nft_metadata_delete_at_path_input: {
        json: {
            type: "String",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    nft_metadata_delete_elem_input: {
        json: {
            type: "Int",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_delete_key_input: {
        json: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_insert_input: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        content: {
            type: "content_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        description: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        image: {
            type: "resource_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        image_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        json: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_assets: {
            type: "nft_asset_arr_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        other_nft_resources: {
            type: "other_nft_resources_arr_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_obj_rel_insert_input: {
        data: {
            type: "nft_metadata_insert_input",
            array: false,
            arrayRequired: false,
            required: true
        },
        on_conflict: {
            type: "nft_metadata_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_on_conflict: {
        constraint: {
            type: "nft_metadata_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "nft_metadata_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "nft_metadata_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_order_by: {
        cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        content: {
            type: "content_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        description: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        image: {
            type: "resource_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        image_uri_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        json: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_assets_aggregate: {
            type: "nft_asset_aggregate_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        other_nft_resources_aggregate: {
            type: "other_nft_resources_aggregate_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_pk_columns_input: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    nft_metadata_prepend_input: {
        json: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_select_column: "enum",
    nft_metadata_set_input: {
        cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        description: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        image_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        json: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        name: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_metadata_update_column: "enum",
    nft_min_order_by: {
        contract_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        mint_time: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_on_conflict: {
        constraint: {
            type: "nft_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "nft_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "nft_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_order_by: {
        contract: {
            type: "blockchain_contract_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        contract_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        mint_time: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_asset: {
            type: "nft_asset_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        referrer_blocks_aggregate: {
            type: "nfts_by_blockchain_blocks_aggregate_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_ownership_aggregate_fields: {
        count: {
            columns: {
                type: "nft_ownership_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nft_ownership_bool_exp: {
        _and: {
            type: "nft_ownership_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "nft_ownership_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "nft_ownership_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        block_number: {
            type: "bigint_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        owner_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_ownership_constraint: "enum",
    nft_ownership_inc_input: {
        block_number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_ownership_insert_input: {
        block_number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        owner_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_ownership_on_conflict: {
        constraint: {
            type: "nft_ownership_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "nft_ownership_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "nft_ownership_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_ownership_order_by: {
        block_number: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        owner_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_ownership_pk_columns_input: {
        block_number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: true
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        },
        owner_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    nft_ownership_select_column: "enum",
    nft_ownership_set_input: {
        block_number: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        owner_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_ownership_update_column: "enum",
    nft_pk_columns_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    nft_select_column: "enum",
    nft_set_input: {
        contract_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        mint_time: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nft_update_column: "enum",
    nfts_by_blockchain_blocks_aggregate_fields: {
        count: {
            columns: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    nfts_by_blockchain_blocks_aggregate_order_by: {
        count: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        max: {
            type: "nfts_by_blockchain_blocks_max_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        min: {
            type: "nfts_by_blockchain_blocks_min_order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_arr_rel_insert_input: {
        data: {
            type: "nfts_by_blockchain_blocks_insert_input",
            array: true,
            arrayRequired: true,
            required: true
        },
        on_conflict: {
            type: "nfts_by_blockchain_blocks_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_bool_exp: {
        _and: {
            type: "nfts_by_blockchain_blocks_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "nfts_by_blockchain_blocks_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "nfts_by_blockchain_blocks_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        blockchain_block_hash: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_constraint: "enum",
    nfts_by_blockchain_blocks_insert_input: {
        blockchain_block_hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_max_order_by: {
        blockchain_block_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_min_order_by: {
        blockchain_block_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_on_conflict: {
        constraint: {
            type: "nfts_by_blockchain_blocks_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "nfts_by_blockchain_blocks_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "nfts_by_blockchain_blocks_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_order_by: {
        blockchain_block_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_pk_columns_input: {
        blockchain_block_hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    nfts_by_blockchain_blocks_select_column: "enum",
    nfts_by_blockchain_blocks_set_input: {
        blockchain_block_hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        nft_id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    nfts_by_blockchain_blocks_update_column: "enum",
    niftysave_migration: {
        metadata: {
            path: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    niftysave_migration_aggregate_fields: {
        count: {
            columns: {
                type: "niftysave_migration_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    niftysave_migration_append_input: {
        metadata: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_bool_exp: {
        _and: {
            type: "niftysave_migration_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "niftysave_migration_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "niftysave_migration_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        collection: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        cursor: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "jsonb_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_constraint: "enum",
    niftysave_migration_delete_at_path_input: {
        metadata: {
            type: "String",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    niftysave_migration_delete_elem_input: {
        metadata: {
            type: "Int",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_delete_key_input: {
        metadata: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_insert_input: {
        collection: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        cursor: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_on_conflict: {
        constraint: {
            type: "niftysave_migration_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "niftysave_migration_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "niftysave_migration_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_order_by: {
        collection: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        cursor: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_pk_columns_input: {
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    niftysave_migration_prepend_input: {
        metadata: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_select_column: "enum",
    niftysave_migration_set_input: {
        collection: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        cursor: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    niftysave_migration_update_column: "enum",
    order_by: "enum",
    other_nft_resources_aggregate_fields: {
        count: {
            columns: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    other_nft_resources_aggregate_order_by: {
        count: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        max: {
            type: "other_nft_resources_max_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        min: {
            type: "other_nft_resources_min_order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_arr_rel_insert_input: {
        data: {
            type: "other_nft_resources_insert_input",
            array: true,
            arrayRequired: true,
            required: true
        },
        on_conflict: {
            type: "other_nft_resources_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_bool_exp: {
        _and: {
            type: "other_nft_resources_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "other_nft_resources_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "other_nft_resources_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "nft_metadata_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        resource: {
            type: "resource_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        resource_uri_hash: {
            type: "bytea_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_constraint: "enum",
    other_nft_resources_insert_input: {
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "nft_metadata_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        resource: {
            type: "resource_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        resource_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_max_order_by: {
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_min_order_by: {
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_on_conflict: {
        constraint: {
            type: "other_nft_resources_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "other_nft_resources_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "other_nft_resources_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_order_by: {
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "nft_metadata_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        resource: {
            type: "resource_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        resource_uri_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_pk_columns_input: {
        metadata_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: true
        },
        resource_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    other_nft_resources_select_column: "enum",
    other_nft_resources_set_input: {
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        resource_uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    other_nft_resources_update_column: "enum",
    parse_nft_asset_args: {
        dag_size: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata: {
            type: "jsonb",
            array: false,
            arrayRequired: false,
            required: false
        },
        metadata_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "nft_asset_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        token_uri_hash: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_aggregate_fields: {
        count: {
            columns: {
                type: "pin_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    pin_aggregate_order_by: {
        avg: {
            type: "pin_avg_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        count: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        max: {
            type: "pin_max_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        min: {
            type: "pin_min_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        stddev: {
            type: "pin_stddev_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        stddev_pop: {
            type: "pin_stddev_pop_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        stddev_samp: {
            type: "pin_stddev_samp_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        sum: {
            type: "pin_sum_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        var_pop: {
            type: "pin_var_pop_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        var_samp: {
            type: "pin_var_samp_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        variance: {
            type: "pin_variance_order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_arr_rel_insert_input: {
        data: {
            type: "pin_insert_input",
            array: true,
            arrayRequired: true,
            required: true
        },
        on_conflict: {
            type: "pin_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_avg_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_bool_exp: {
        _and: {
            type: "pin_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "pin_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "pin_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        content: {
            type: "content_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        content_cid: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "bigint_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        service: {
            type: "pin_service_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "pin_status_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_constraint: "enum",
    pin_inc_input: {
        id: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_insert_input: {
        content: {
            type: "content_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        content_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        service: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_max_order_by: {
        content_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_min_order_by: {
        content_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_on_conflict: {
        constraint: {
            type: "pin_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "pin_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "pin_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_order_by: {
        content: {
            type: "content_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        content_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        service: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_pk_columns_input: {
        id: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    pin_select_column: "enum",
    pin_service: "String",
    pin_service_comparison_exp: {
        _eq: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "pin_service",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "pin_service",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    pin_set_input: {
        content_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        id: {
            type: "bigint",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        service: {
            type: "pin_service",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_status: "String",
    pin_status_comparison_exp: {
        _eq: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "pin_status",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "pin_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "pin_status",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    pin_stddev_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_stddev_pop_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_stddev_samp_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_sum_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_update_column: "enum",
    pin_var_pop_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_var_samp_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    pin_variance_order_by: {
        id: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    query_root: {
        blockchain_block: {
            distinct_on: {
                type: "blockchain_block_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_block_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_block_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_block_aggregate: {
            distinct_on: {
                type: "blockchain_block_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_block_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_block_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_block_by_pk: {
            hash: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        blockchain_contract: {
            distinct_on: {
                type: "blockchain_contract_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_contract_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_contract_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_contract_aggregate: {
            distinct_on: {
                type: "blockchain_contract_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_contract_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_contract_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_contract_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        content: {
            distinct_on: {
                type: "content_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "content_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "content_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        content_aggregate: {
            distinct_on: {
                type: "content_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "content_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "content_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        content_by_pk: {
            cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        erc721_import: {
            distinct_on: {
                type: "erc721_import_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_aggregate: {
            distinct_on: {
                type: "erc721_import_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_by_nft: {
            distinct_on: {
                type: "erc721_import_by_nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_by_nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_by_nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_by_nft_aggregate: {
            distinct_on: {
                type: "erc721_import_by_nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_by_nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_by_nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_by_nft_by_pk: {
            erc721_import_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        erc721_import_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft: {
            distinct_on: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_aggregate: {
            distinct_on: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_asset: {
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_asset_aggregate: {
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_asset_by_pk: {
            token_uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft_metadata: {
            distinct_on: {
                type: "nft_metadata_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_metadata_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_metadata_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_metadata_aggregate: {
            distinct_on: {
                type: "nft_metadata_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_metadata_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_metadata_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_metadata_by_pk: {
            cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft_ownership: {
            distinct_on: {
                type: "nft_ownership_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_ownership_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_ownership_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_ownership_aggregate: {
            distinct_on: {
                type: "nft_ownership_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_ownership_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_ownership_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_ownership_by_pk: {
            block_number: {
                type: "bigint",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            owner_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nfts_by_blockchain_blocks: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nfts_by_blockchain_blocks_aggregate: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nfts_by_blockchain_blocks_by_pk: {
            blockchain_block_hash: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        niftysave_migration: {
            distinct_on: {
                type: "niftysave_migration_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "niftysave_migration_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "niftysave_migration_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        niftysave_migration_aggregate: {
            distinct_on: {
                type: "niftysave_migration_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "niftysave_migration_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "niftysave_migration_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        niftysave_migration_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        other_nft_resources: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        other_nft_resources_aggregate: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        other_nft_resources_by_pk: {
            metadata_cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            resource_uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        pin: {
            distinct_on: {
                type: "pin_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "pin_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        pin_aggregate: {
            distinct_on: {
                type: "pin_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "pin_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        pin_by_pk: {
            id: {
                type: "bigint",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        resource: {
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        resource_aggregate: {
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        resource_by_pk: {
            uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        }
    },
    queue_resource_args: {
        content_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    resource: {
        referrer_metadata: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        referrer_metadata_aggregate: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    resource_aggregate_fields: {
        count: {
            columns: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            distinct: {
                type: "Boolean",
                array: false,
                arrayRequired: false,
                required: false
            }
        }
    },
    resource_bool_exp: {
        _and: {
            type: "resource_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        _not: {
            type: "resource_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        _or: {
            type: "resource_bool_exp",
            array: true,
            arrayRequired: false,
            required: true
        },
        content: {
            type: "content_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        content_cid: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        referrer_metadata: {
            type: "other_nft_resources_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "resource_status_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri: {
            type: "String_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri_hash: {
            type: "bytea_comparison_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    resource_constraint: "enum",
    resource_insert_input: {
        content: {
            type: "content_obj_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        content_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        referrer_metadata: {
            type: "other_nft_resources_arr_rel_insert_input",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    resource_obj_rel_insert_input: {
        data: {
            type: "resource_insert_input",
            array: false,
            arrayRequired: false,
            required: true
        },
        on_conflict: {
            type: "resource_on_conflict",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    resource_on_conflict: {
        constraint: {
            type: "resource_constraint",
            array: false,
            arrayRequired: false,
            required: true
        },
        update_columns: {
            type: "resource_update_column",
            array: true,
            arrayRequired: true,
            required: true
        },
        where: {
            type: "resource_bool_exp",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    resource_order_by: {
        content: {
            type: "content_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        content_cid: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        referrer_metadata_aggregate: {
            type: "other_nft_resources_aggregate_order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri_hash: {
            type: "order_by",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    resource_pk_columns_input: {
        uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: true
        }
    },
    resource_select_column: "enum",
    resource_set_input: {
        content_cid: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        inserted_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        ipfs_url: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        status: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        status_text: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        updated_at: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri: {
            type: "String",
            array: false,
            arrayRequired: false,
            required: false
        },
        uri_hash: {
            type: "bytea",
            array: false,
            arrayRequired: false,
            required: false
        }
    },
    resource_status: "String",
    resource_status_comparison_exp: {
        _eq: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "resource_status",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "resource_status",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "resource_status",
            array: true,
            arrayRequired: false,
            required: true
        }
    },
    resource_update_column: "enum",
    subscription_root: {
        blockchain_block: {
            distinct_on: {
                type: "blockchain_block_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_block_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_block_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_block_aggregate: {
            distinct_on: {
                type: "blockchain_block_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_block_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_block_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_block_by_pk: {
            hash: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        blockchain_contract: {
            distinct_on: {
                type: "blockchain_contract_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_contract_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_contract_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_contract_aggregate: {
            distinct_on: {
                type: "blockchain_contract_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "blockchain_contract_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "blockchain_contract_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        blockchain_contract_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        content: {
            distinct_on: {
                type: "content_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "content_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "content_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        content_aggregate: {
            distinct_on: {
                type: "content_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "content_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "content_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        content_by_pk: {
            cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        erc721_import: {
            distinct_on: {
                type: "erc721_import_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_aggregate: {
            distinct_on: {
                type: "erc721_import_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_by_nft: {
            distinct_on: {
                type: "erc721_import_by_nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_by_nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_by_nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_by_nft_aggregate: {
            distinct_on: {
                type: "erc721_import_by_nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "erc721_import_by_nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "erc721_import_by_nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        erc721_import_by_nft_by_pk: {
            erc721_import_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        erc721_import_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft: {
            distinct_on: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_aggregate: {
            distinct_on: {
                type: "nft_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_asset: {
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_asset_aggregate: {
            distinct_on: {
                type: "nft_asset_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_asset_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_asset_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_asset_by_pk: {
            token_uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft_metadata: {
            distinct_on: {
                type: "nft_metadata_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_metadata_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_metadata_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_metadata_aggregate: {
            distinct_on: {
                type: "nft_metadata_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_metadata_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_metadata_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_metadata_by_pk: {
            cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nft_ownership: {
            distinct_on: {
                type: "nft_ownership_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_ownership_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_ownership_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_ownership_aggregate: {
            distinct_on: {
                type: "nft_ownership_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nft_ownership_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nft_ownership_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nft_ownership_by_pk: {
            block_number: {
                type: "bigint",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            owner_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        nfts_by_blockchain_blocks: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nfts_by_blockchain_blocks_aggregate: {
            distinct_on: {
                type: "nfts_by_blockchain_blocks_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "nfts_by_blockchain_blocks_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "nfts_by_blockchain_blocks_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        nfts_by_blockchain_blocks_by_pk: {
            blockchain_block_hash: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            nft_id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        niftysave_migration: {
            distinct_on: {
                type: "niftysave_migration_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "niftysave_migration_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "niftysave_migration_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        niftysave_migration_aggregate: {
            distinct_on: {
                type: "niftysave_migration_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "niftysave_migration_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "niftysave_migration_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        niftysave_migration_by_pk: {
            id: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        other_nft_resources: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        other_nft_resources_aggregate: {
            distinct_on: {
                type: "other_nft_resources_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "other_nft_resources_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "other_nft_resources_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        other_nft_resources_by_pk: {
            metadata_cid: {
                type: "String",
                array: false,
                arrayRequired: false,
                required: true
            },
            resource_uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        pin: {
            distinct_on: {
                type: "pin_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "pin_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        pin_aggregate: {
            distinct_on: {
                type: "pin_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "pin_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "pin_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        pin_by_pk: {
            id: {
                type: "bigint",
                array: false,
                arrayRequired: false,
                required: true
            }
        },
        resource: {
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        resource_aggregate: {
            distinct_on: {
                type: "resource_select_column",
                array: true,
                arrayRequired: false,
                required: true
            },
            limit: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            offset: {
                type: "Int",
                array: false,
                arrayRequired: false,
                required: false
            },
            order_by: {
                type: "resource_order_by",
                array: true,
                arrayRequired: false,
                required: true
            },
            where: {
                type: "resource_bool_exp",
                array: false,
                arrayRequired: false,
                required: false
            }
        },
        resource_by_pk: {
            uri_hash: {
                type: "bytea",
                array: false,
                arrayRequired: false,
                required: true
            }
        }
    },
    timestamptz: "String",
    timestamptz_comparison_exp: {
        _eq: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gt: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        _gte: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        _in: {
            type: "timestamptz",
            array: true,
            arrayRequired: false,
            required: true
        },
        _is_null: {
            type: "Boolean",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lt: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        _lte: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        _neq: {
            type: "timestamptz",
            array: false,
            arrayRequired: false,
            required: false
        },
        _nin: {
            type: "timestamptz",
            array: true,
            arrayRequired: false,
            required: true
        }
    }
};
export const ReturnTypes = {
    cached: {
        ttl: "Int",
        refresh: "Boolean"
    },
    blockchain_block: {
        hash: "String",
        inserted_at: "timestamptz",
        nfts: "nfts_by_blockchain_blocks",
        nfts_aggregate: "nfts_by_blockchain_blocks_aggregate",
        number: "bigint",
        updated_at: "timestamptz"
    },
    blockchain_block_aggregate: {
        aggregate: "blockchain_block_aggregate_fields",
        nodes: "blockchain_block"
    },
    blockchain_block_aggregate_fields: {
        avg: "blockchain_block_avg_fields",
        count: "Int",
        max: "blockchain_block_max_fields",
        min: "blockchain_block_min_fields",
        stddev: "blockchain_block_stddev_fields",
        stddev_pop: "blockchain_block_stddev_pop_fields",
        stddev_samp: "blockchain_block_stddev_samp_fields",
        sum: "blockchain_block_sum_fields",
        var_pop: "blockchain_block_var_pop_fields",
        var_samp: "blockchain_block_var_samp_fields",
        variance: "blockchain_block_variance_fields"
    },
    blockchain_block_avg_fields: {
        number: "Float"
    },
    blockchain_block_max_fields: {
        hash: "String",
        inserted_at: "timestamptz",
        number: "bigint",
        updated_at: "timestamptz"
    },
    blockchain_block_min_fields: {
        hash: "String",
        inserted_at: "timestamptz",
        number: "bigint",
        updated_at: "timestamptz"
    },
    blockchain_block_mutation_response: {
        affected_rows: "Int",
        returning: "blockchain_block"
    },
    blockchain_block_stddev_fields: {
        number: "Float"
    },
    blockchain_block_stddev_pop_fields: {
        number: "Float"
    },
    blockchain_block_stddev_samp_fields: {
        number: "Float"
    },
    blockchain_block_sum_fields: {
        number: "bigint"
    },
    blockchain_block_var_pop_fields: {
        number: "Float"
    },
    blockchain_block_var_samp_fields: {
        number: "Float"
    },
    blockchain_block_variance_fields: {
        number: "Float"
    },
    blockchain_contract: {
        id: "String",
        inserted_at: "timestamptz",
        name: "String",
        supports_eip721_metadata: "Boolean",
        symbol: "String",
        updated_at: "timestamptz"
    },
    blockchain_contract_aggregate: {
        aggregate: "blockchain_contract_aggregate_fields",
        nodes: "blockchain_contract"
    },
    blockchain_contract_aggregate_fields: {
        count: "Int",
        max: "blockchain_contract_max_fields",
        min: "blockchain_contract_min_fields"
    },
    blockchain_contract_max_fields: {
        id: "String",
        inserted_at: "timestamptz",
        name: "String",
        symbol: "String",
        updated_at: "timestamptz"
    },
    blockchain_contract_min_fields: {
        id: "String",
        inserted_at: "timestamptz",
        name: "String",
        symbol: "String",
        updated_at: "timestamptz"
    },
    blockchain_contract_mutation_response: {
        affected_rows: "Int",
        returning: "blockchain_contract"
    },
    content: {
        cid: "String",
        dag_size: "bigint",
        inserted_at: "timestamptz",
        pins: "pin",
        pins_aggregate: "pin_aggregate",
        updated_at: "timestamptz"
    },
    content_aggregate: {
        aggregate: "content_aggregate_fields",
        nodes: "content"
    },
    content_aggregate_fields: {
        avg: "content_avg_fields",
        count: "Int",
        max: "content_max_fields",
        min: "content_min_fields",
        stddev: "content_stddev_fields",
        stddev_pop: "content_stddev_pop_fields",
        stddev_samp: "content_stddev_samp_fields",
        sum: "content_sum_fields",
        var_pop: "content_var_pop_fields",
        var_samp: "content_var_samp_fields",
        variance: "content_variance_fields"
    },
    content_avg_fields: {
        dag_size: "Float"
    },
    content_max_fields: {
        cid: "String",
        dag_size: "bigint",
        inserted_at: "timestamptz",
        updated_at: "timestamptz"
    },
    content_min_fields: {
        cid: "String",
        dag_size: "bigint",
        inserted_at: "timestamptz",
        updated_at: "timestamptz"
    },
    content_mutation_response: {
        affected_rows: "Int",
        returning: "content"
    },
    content_stddev_fields: {
        dag_size: "Float"
    },
    content_stddev_pop_fields: {
        dag_size: "Float"
    },
    content_stddev_samp_fields: {
        dag_size: "Float"
    },
    content_sum_fields: {
        dag_size: "bigint"
    },
    content_var_pop_fields: {
        dag_size: "Float"
    },
    content_var_samp_fields: {
        dag_size: "Float"
    },
    content_variance_fields: {
        dag_size: "Float"
    },
    erc721_import: {
        id: "String",
        inserted_at: "timestamptz",
        next_id: "String",
        updated_at: "timestamptz"
    },
    erc721_import_aggregate: {
        aggregate: "erc721_import_aggregate_fields",
        nodes: "erc721_import"
    },
    erc721_import_aggregate_fields: {
        count: "Int",
        max: "erc721_import_max_fields",
        min: "erc721_import_min_fields"
    },
    erc721_import_by_nft: {
        erc721_import_id: "String",
        inserted_at: "timestamptz",
        nft_id: "String",
        updated_at: "timestamptz"
    },
    erc721_import_by_nft_aggregate: {
        aggregate: "erc721_import_by_nft_aggregate_fields",
        nodes: "erc721_import_by_nft"
    },
    erc721_import_by_nft_aggregate_fields: {
        count: "Int",
        max: "erc721_import_by_nft_max_fields",
        min: "erc721_import_by_nft_min_fields"
    },
    erc721_import_by_nft_max_fields: {
        erc721_import_id: "String",
        inserted_at: "timestamptz",
        nft_id: "String",
        updated_at: "timestamptz"
    },
    erc721_import_by_nft_min_fields: {
        erc721_import_id: "String",
        inserted_at: "timestamptz",
        nft_id: "String",
        updated_at: "timestamptz"
    },
    erc721_import_by_nft_mutation_response: {
        affected_rows: "Int",
        returning: "erc721_import_by_nft"
    },
    erc721_import_max_fields: {
        id: "String",
        inserted_at: "timestamptz",
        next_id: "String",
        updated_at: "timestamptz"
    },
    erc721_import_min_fields: {
        id: "String",
        inserted_at: "timestamptz",
        next_id: "String",
        updated_at: "timestamptz"
    },
    erc721_import_mutation_response: {
        affected_rows: "Int",
        returning: "erc721_import"
    },
    mutation_root: {
        delete_blockchain_block: "blockchain_block_mutation_response",
        delete_blockchain_block_by_pk: "blockchain_block",
        delete_blockchain_contract: "blockchain_contract_mutation_response",
        delete_blockchain_contract_by_pk: "blockchain_contract",
        delete_content: "content_mutation_response",
        delete_content_by_pk: "content",
        delete_erc721_import: "erc721_import_mutation_response",
        delete_erc721_import_by_nft: "erc721_import_by_nft_mutation_response",
        delete_erc721_import_by_nft_by_pk: "erc721_import_by_nft",
        delete_erc721_import_by_pk: "erc721_import",
        delete_nft: "nft_mutation_response",
        delete_nft_asset: "nft_asset_mutation_response",
        delete_nft_asset_by_pk: "nft_asset",
        delete_nft_by_pk: "nft",
        delete_nft_metadata: "nft_metadata_mutation_response",
        delete_nft_metadata_by_pk: "nft_metadata",
        delete_nft_ownership: "nft_ownership_mutation_response",
        delete_nft_ownership_by_pk: "nft_ownership",
        delete_nfts_by_blockchain_blocks: "nfts_by_blockchain_blocks_mutation_response",
        delete_nfts_by_blockchain_blocks_by_pk: "nfts_by_blockchain_blocks",
        delete_niftysave_migration: "niftysave_migration_mutation_response",
        delete_niftysave_migration_by_pk: "niftysave_migration",
        delete_other_nft_resources: "other_nft_resources_mutation_response",
        delete_other_nft_resources_by_pk: "other_nft_resources",
        delete_pin: "pin_mutation_response",
        delete_pin_by_pk: "pin",
        delete_resource: "resource_mutation_response",
        delete_resource_by_pk: "resource",
        fail_nft_asset: "nft_asset",
        fail_resource: "resource",
        ingest_erc721_token: "nft",
        insert_blockchain_block: "blockchain_block_mutation_response",
        insert_blockchain_block_one: "blockchain_block",
        insert_blockchain_contract: "blockchain_contract_mutation_response",
        insert_blockchain_contract_one: "blockchain_contract",
        insert_content: "content_mutation_response",
        insert_content_one: "content",
        insert_erc721_import: "erc721_import_mutation_response",
        insert_erc721_import_by_nft: "erc721_import_by_nft_mutation_response",
        insert_erc721_import_by_nft_one: "erc721_import_by_nft",
        insert_erc721_import_one: "erc721_import",
        insert_nft: "nft_mutation_response",
        insert_nft_asset: "nft_asset_mutation_response",
        insert_nft_asset_one: "nft_asset",
        insert_nft_metadata: "nft_metadata_mutation_response",
        insert_nft_metadata_one: "nft_metadata",
        insert_nft_one: "nft",
        insert_nft_ownership: "nft_ownership_mutation_response",
        insert_nft_ownership_one: "nft_ownership",
        insert_nfts_by_blockchain_blocks: "nfts_by_blockchain_blocks_mutation_response",
        insert_nfts_by_blockchain_blocks_one: "nfts_by_blockchain_blocks",
        insert_niftysave_migration: "niftysave_migration_mutation_response",
        insert_niftysave_migration_one: "niftysave_migration",
        insert_other_nft_resources: "other_nft_resources_mutation_response",
        insert_other_nft_resources_one: "other_nft_resources",
        insert_pin: "pin_mutation_response",
        insert_pin_one: "pin",
        insert_resource: "resource_mutation_response",
        insert_resource_one: "resource",
        link_nft_resource: "resource",
        link_resource_content: "resource",
        parse_nft_asset: "nft_asset",
        queue_resource: "resource",
        update_blockchain_block: "blockchain_block_mutation_response",
        update_blockchain_block_by_pk: "blockchain_block",
        update_blockchain_contract: "blockchain_contract_mutation_response",
        update_blockchain_contract_by_pk: "blockchain_contract",
        update_content: "content_mutation_response",
        update_content_by_pk: "content",
        update_erc721_import: "erc721_import_mutation_response",
        update_erc721_import_by_nft: "erc721_import_by_nft_mutation_response",
        update_erc721_import_by_nft_by_pk: "erc721_import_by_nft",
        update_erc721_import_by_pk: "erc721_import",
        update_nft: "nft_mutation_response",
        update_nft_asset: "nft_asset_mutation_response",
        update_nft_asset_by_pk: "nft_asset",
        update_nft_by_pk: "nft",
        update_nft_metadata: "nft_metadata_mutation_response",
        update_nft_metadata_by_pk: "nft_metadata",
        update_nft_ownership: "nft_ownership_mutation_response",
        update_nft_ownership_by_pk: "nft_ownership",
        update_nfts_by_blockchain_blocks: "nfts_by_blockchain_blocks_mutation_response",
        update_nfts_by_blockchain_blocks_by_pk: "nfts_by_blockchain_blocks",
        update_niftysave_migration: "niftysave_migration_mutation_response",
        update_niftysave_migration_by_pk: "niftysave_migration",
        update_other_nft_resources: "other_nft_resources_mutation_response",
        update_other_nft_resources_by_pk: "other_nft_resources",
        update_pin: "pin_mutation_response",
        update_pin_by_pk: "pin",
        update_resource: "resource_mutation_response",
        update_resource_by_pk: "resource"
    },
    nft: {
        contract: "blockchain_contract",
        contract_id: "String",
        id: "String",
        inserted_at: "timestamptz",
        mint_time: "timestamptz",
        nft_asset: "nft_asset",
        referrer_blocks: "nfts_by_blockchain_blocks",
        referrer_blocks_aggregate: "nfts_by_blockchain_blocks_aggregate",
        token_id: "String",
        token_uri_hash: "bytea",
        updated_at: "timestamptz"
    },
    nft_aggregate: {
        aggregate: "nft_aggregate_fields",
        nodes: "nft"
    },
    nft_aggregate_fields: {
        count: "Int",
        max: "nft_max_fields",
        min: "nft_min_fields"
    },
    nft_asset: {
        inserted_at: "timestamptz",
        ipfs_url: "String",
        metadata: "nft_metadata",
        metadata_cid: "String",
        nfts: "nft",
        nfts_aggregate: "nft_aggregate",
        status: "nft_asset_status",
        status_text: "String",
        token_uri: "String",
        token_uri_hash: "bytea",
        updated_at: "timestamptz"
    },
    nft_asset_aggregate: {
        aggregate: "nft_asset_aggregate_fields",
        nodes: "nft_asset"
    },
    nft_asset_aggregate_fields: {
        count: "Int",
        max: "nft_asset_max_fields",
        min: "nft_asset_min_fields"
    },
    nft_asset_max_fields: {
        inserted_at: "timestamptz",
        ipfs_url: "String",
        metadata_cid: "String",
        status_text: "String",
        token_uri: "String",
        updated_at: "timestamptz"
    },
    nft_asset_min_fields: {
        inserted_at: "timestamptz",
        ipfs_url: "String",
        metadata_cid: "String",
        status_text: "String",
        token_uri: "String",
        updated_at: "timestamptz"
    },
    nft_asset_mutation_response: {
        affected_rows: "Int",
        returning: "nft_asset"
    },
    nft_max_fields: {
        contract_id: "String",
        id: "String",
        inserted_at: "timestamptz",
        mint_time: "timestamptz",
        token_id: "String",
        updated_at: "timestamptz"
    },
    nft_metadata: {
        cid: "String",
        content: "content",
        description: "String",
        image: "resource",
        image_uri_hash: "bytea",
        inserted_at: "timestamptz",
        json: "jsonb",
        name: "String",
        nft_assets: "nft_asset",
        nft_assets_aggregate: "nft_asset_aggregate",
        other_nft_resources: "other_nft_resources",
        other_nft_resources_aggregate: "other_nft_resources_aggregate",
        updated_at: "timestamptz"
    },
    nft_metadata_aggregate: {
        aggregate: "nft_metadata_aggregate_fields",
        nodes: "nft_metadata"
    },
    nft_metadata_aggregate_fields: {
        count: "Int",
        max: "nft_metadata_max_fields",
        min: "nft_metadata_min_fields"
    },
    nft_metadata_max_fields: {
        cid: "String",
        description: "String",
        inserted_at: "timestamptz",
        name: "String",
        updated_at: "timestamptz"
    },
    nft_metadata_min_fields: {
        cid: "String",
        description: "String",
        inserted_at: "timestamptz",
        name: "String",
        updated_at: "timestamptz"
    },
    nft_metadata_mutation_response: {
        affected_rows: "Int",
        returning: "nft_metadata"
    },
    nft_min_fields: {
        contract_id: "String",
        id: "String",
        inserted_at: "timestamptz",
        mint_time: "timestamptz",
        token_id: "String",
        updated_at: "timestamptz"
    },
    nft_mutation_response: {
        affected_rows: "Int",
        returning: "nft"
    },
    nft_ownership: {
        block_number: "bigint",
        inserted_at: "timestamptz",
        nft_id: "String",
        owner_id: "String",
        updated_at: "timestamptz"
    },
    nft_ownership_aggregate: {
        aggregate: "nft_ownership_aggregate_fields",
        nodes: "nft_ownership"
    },
    nft_ownership_aggregate_fields: {
        avg: "nft_ownership_avg_fields",
        count: "Int",
        max: "nft_ownership_max_fields",
        min: "nft_ownership_min_fields",
        stddev: "nft_ownership_stddev_fields",
        stddev_pop: "nft_ownership_stddev_pop_fields",
        stddev_samp: "nft_ownership_stddev_samp_fields",
        sum: "nft_ownership_sum_fields",
        var_pop: "nft_ownership_var_pop_fields",
        var_samp: "nft_ownership_var_samp_fields",
        variance: "nft_ownership_variance_fields"
    },
    nft_ownership_avg_fields: {
        block_number: "Float"
    },
    nft_ownership_max_fields: {
        block_number: "bigint",
        inserted_at: "timestamptz",
        nft_id: "String",
        owner_id: "String",
        updated_at: "timestamptz"
    },
    nft_ownership_min_fields: {
        block_number: "bigint",
        inserted_at: "timestamptz",
        nft_id: "String",
        owner_id: "String",
        updated_at: "timestamptz"
    },
    nft_ownership_mutation_response: {
        affected_rows: "Int",
        returning: "nft_ownership"
    },
    nft_ownership_stddev_fields: {
        block_number: "Float"
    },
    nft_ownership_stddev_pop_fields: {
        block_number: "Float"
    },
    nft_ownership_stddev_samp_fields: {
        block_number: "Float"
    },
    nft_ownership_sum_fields: {
        block_number: "bigint"
    },
    nft_ownership_var_pop_fields: {
        block_number: "Float"
    },
    nft_ownership_var_samp_fields: {
        block_number: "Float"
    },
    nft_ownership_variance_fields: {
        block_number: "Float"
    },
    nfts_by_blockchain_blocks: {
        blockchain_block_hash: "String",
        inserted_at: "timestamptz",
        nft_id: "String",
        updated_at: "timestamptz"
    },
    nfts_by_blockchain_blocks_aggregate: {
        aggregate: "nfts_by_blockchain_blocks_aggregate_fields",
        nodes: "nfts_by_blockchain_blocks"
    },
    nfts_by_blockchain_blocks_aggregate_fields: {
        count: "Int",
        max: "nfts_by_blockchain_blocks_max_fields",
        min: "nfts_by_blockchain_blocks_min_fields"
    },
    nfts_by_blockchain_blocks_max_fields: {
        blockchain_block_hash: "String",
        inserted_at: "timestamptz",
        nft_id: "String",
        updated_at: "timestamptz"
    },
    nfts_by_blockchain_blocks_min_fields: {
        blockchain_block_hash: "String",
        inserted_at: "timestamptz",
        nft_id: "String",
        updated_at: "timestamptz"
    },
    nfts_by_blockchain_blocks_mutation_response: {
        affected_rows: "Int",
        returning: "nfts_by_blockchain_blocks"
    },
    niftysave_migration: {
        collection: "String",
        cursor: "String",
        id: "String",
        inserted_at: "timestamptz",
        metadata: "jsonb",
        updated_at: "timestamptz"
    },
    niftysave_migration_aggregate: {
        aggregate: "niftysave_migration_aggregate_fields",
        nodes: "niftysave_migration"
    },
    niftysave_migration_aggregate_fields: {
        count: "Int",
        max: "niftysave_migration_max_fields",
        min: "niftysave_migration_min_fields"
    },
    niftysave_migration_max_fields: {
        collection: "String",
        cursor: "String",
        id: "String",
        inserted_at: "timestamptz",
        updated_at: "timestamptz"
    },
    niftysave_migration_min_fields: {
        collection: "String",
        cursor: "String",
        id: "String",
        inserted_at: "timestamptz",
        updated_at: "timestamptz"
    },
    niftysave_migration_mutation_response: {
        affected_rows: "Int",
        returning: "niftysave_migration"
    },
    other_nft_resources: {
        inserted_at: "timestamptz",
        metadata: "nft_metadata",
        metadata_cid: "String",
        resource: "resource",
        resource_uri_hash: "bytea",
        updated_at: "timestamptz"
    },
    other_nft_resources_aggregate: {
        aggregate: "other_nft_resources_aggregate_fields",
        nodes: "other_nft_resources"
    },
    other_nft_resources_aggregate_fields: {
        count: "Int",
        max: "other_nft_resources_max_fields",
        min: "other_nft_resources_min_fields"
    },
    other_nft_resources_max_fields: {
        inserted_at: "timestamptz",
        metadata_cid: "String",
        updated_at: "timestamptz"
    },
    other_nft_resources_min_fields: {
        inserted_at: "timestamptz",
        metadata_cid: "String",
        updated_at: "timestamptz"
    },
    other_nft_resources_mutation_response: {
        affected_rows: "Int",
        returning: "other_nft_resources"
    },
    pin: {
        content: "content",
        content_cid: "String",
        id: "bigint",
        inserted_at: "timestamptz",
        service: "pin_service",
        status: "pin_status",
        updated_at: "timestamptz"
    },
    pin_aggregate: {
        aggregate: "pin_aggregate_fields",
        nodes: "pin"
    },
    pin_aggregate_fields: {
        avg: "pin_avg_fields",
        count: "Int",
        max: "pin_max_fields",
        min: "pin_min_fields",
        stddev: "pin_stddev_fields",
        stddev_pop: "pin_stddev_pop_fields",
        stddev_samp: "pin_stddev_samp_fields",
        sum: "pin_sum_fields",
        var_pop: "pin_var_pop_fields",
        var_samp: "pin_var_samp_fields",
        variance: "pin_variance_fields"
    },
    pin_avg_fields: {
        id: "Float"
    },
    pin_max_fields: {
        content_cid: "String",
        id: "bigint",
        inserted_at: "timestamptz",
        updated_at: "timestamptz"
    },
    pin_min_fields: {
        content_cid: "String",
        id: "bigint",
        inserted_at: "timestamptz",
        updated_at: "timestamptz"
    },
    pin_mutation_response: {
        affected_rows: "Int",
        returning: "pin"
    },
    pin_stddev_fields: {
        id: "Float"
    },
    pin_stddev_pop_fields: {
        id: "Float"
    },
    pin_stddev_samp_fields: {
        id: "Float"
    },
    pin_sum_fields: {
        id: "bigint"
    },
    pin_var_pop_fields: {
        id: "Float"
    },
    pin_var_samp_fields: {
        id: "Float"
    },
    pin_variance_fields: {
        id: "Float"
    },
    query_root: {
        blockchain_block: "blockchain_block",
        blockchain_block_aggregate: "blockchain_block_aggregate",
        blockchain_block_by_pk: "blockchain_block",
        blockchain_contract: "blockchain_contract",
        blockchain_contract_aggregate: "blockchain_contract_aggregate",
        blockchain_contract_by_pk: "blockchain_contract",
        content: "content",
        content_aggregate: "content_aggregate",
        content_by_pk: "content",
        erc721_import: "erc721_import",
        erc721_import_aggregate: "erc721_import_aggregate",
        erc721_import_by_nft: "erc721_import_by_nft",
        erc721_import_by_nft_aggregate: "erc721_import_by_nft_aggregate",
        erc721_import_by_nft_by_pk: "erc721_import_by_nft",
        erc721_import_by_pk: "erc721_import",
        nft: "nft",
        nft_aggregate: "nft_aggregate",
        nft_asset: "nft_asset",
        nft_asset_aggregate: "nft_asset_aggregate",
        nft_asset_by_pk: "nft_asset",
        nft_by_pk: "nft",
        nft_metadata: "nft_metadata",
        nft_metadata_aggregate: "nft_metadata_aggregate",
        nft_metadata_by_pk: "nft_metadata",
        nft_ownership: "nft_ownership",
        nft_ownership_aggregate: "nft_ownership_aggregate",
        nft_ownership_by_pk: "nft_ownership",
        nfts_by_blockchain_blocks: "nfts_by_blockchain_blocks",
        nfts_by_blockchain_blocks_aggregate: "nfts_by_blockchain_blocks_aggregate",
        nfts_by_blockchain_blocks_by_pk: "nfts_by_blockchain_blocks",
        niftysave_migration: "niftysave_migration",
        niftysave_migration_aggregate: "niftysave_migration_aggregate",
        niftysave_migration_by_pk: "niftysave_migration",
        other_nft_resources: "other_nft_resources",
        other_nft_resources_aggregate: "other_nft_resources_aggregate",
        other_nft_resources_by_pk: "other_nft_resources",
        pin: "pin",
        pin_aggregate: "pin_aggregate",
        pin_by_pk: "pin",
        resource: "resource",
        resource_aggregate: "resource_aggregate",
        resource_by_pk: "resource"
    },
    resource: {
        content: "content",
        content_cid: "String",
        inserted_at: "timestamptz",
        ipfs_url: "String",
        referrer_metadata: "other_nft_resources",
        referrer_metadata_aggregate: "other_nft_resources_aggregate",
        status: "resource_status",
        status_text: "String",
        updated_at: "timestamptz",
        uri: "String",
        uri_hash: "bytea"
    },
    resource_aggregate: {
        aggregate: "resource_aggregate_fields",
        nodes: "resource"
    },
    resource_aggregate_fields: {
        count: "Int",
        max: "resource_max_fields",
        min: "resource_min_fields"
    },
    resource_max_fields: {
        content_cid: "String",
        inserted_at: "timestamptz",
        ipfs_url: "String",
        status_text: "String",
        updated_at: "timestamptz",
        uri: "String"
    },
    resource_min_fields: {
        content_cid: "String",
        inserted_at: "timestamptz",
        ipfs_url: "String",
        status_text: "String",
        updated_at: "timestamptz",
        uri: "String"
    },
    resource_mutation_response: {
        affected_rows: "Int",
        returning: "resource"
    },
    subscription_root: {
        blockchain_block: "blockchain_block",
        blockchain_block_aggregate: "blockchain_block_aggregate",
        blockchain_block_by_pk: "blockchain_block",
        blockchain_contract: "blockchain_contract",
        blockchain_contract_aggregate: "blockchain_contract_aggregate",
        blockchain_contract_by_pk: "blockchain_contract",
        content: "content",
        content_aggregate: "content_aggregate",
        content_by_pk: "content",
        erc721_import: "erc721_import",
        erc721_import_aggregate: "erc721_import_aggregate",
        erc721_import_by_nft: "erc721_import_by_nft",
        erc721_import_by_nft_aggregate: "erc721_import_by_nft_aggregate",
        erc721_import_by_nft_by_pk: "erc721_import_by_nft",
        erc721_import_by_pk: "erc721_import",
        nft: "nft",
        nft_aggregate: "nft_aggregate",
        nft_asset: "nft_asset",
        nft_asset_aggregate: "nft_asset_aggregate",
        nft_asset_by_pk: "nft_asset",
        nft_by_pk: "nft",
        nft_metadata: "nft_metadata",
        nft_metadata_aggregate: "nft_metadata_aggregate",
        nft_metadata_by_pk: "nft_metadata",
        nft_ownership: "nft_ownership",
        nft_ownership_aggregate: "nft_ownership_aggregate",
        nft_ownership_by_pk: "nft_ownership",
        nfts_by_blockchain_blocks: "nfts_by_blockchain_blocks",
        nfts_by_blockchain_blocks_aggregate: "nfts_by_blockchain_blocks_aggregate",
        nfts_by_blockchain_blocks_by_pk: "nfts_by_blockchain_blocks",
        niftysave_migration: "niftysave_migration",
        niftysave_migration_aggregate: "niftysave_migration_aggregate",
        niftysave_migration_by_pk: "niftysave_migration",
        other_nft_resources: "other_nft_resources",
        other_nft_resources_aggregate: "other_nft_resources_aggregate",
        other_nft_resources_by_pk: "other_nft_resources",
        pin: "pin",
        pin_aggregate: "pin_aggregate",
        pin_by_pk: "pin",
        resource: "resource",
        resource_aggregate: "resource_aggregate",
        resource_by_pk: "resource"
    }
};
