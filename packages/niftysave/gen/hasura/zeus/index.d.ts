declare type ZEUS_INTERFACES = never;
declare type ZEUS_UNIONS = never;
export declare type ValueTypes = {
    /** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
    ["Boolean_comparison_exp"]: {
        _eq?: boolean | null;
        _gt?: boolean | null;
        _gte?: boolean | null;
        _in?: boolean[];
        _is_null?: boolean | null;
        _lt?: boolean | null;
        _lte?: boolean | null;
        _neq?: boolean | null;
        _nin?: boolean[];
    };
    /** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
    ["String_comparison_exp"]: {
        _eq?: string | null;
        _gt?: string | null;
        _gte?: string | null;
        /** does the column match the given case-insensitive pattern */
        _ilike?: string | null;
        _in?: string[];
        /** does the column match the given POSIX regular expression, case insensitive */
        _iregex?: string | null;
        _is_null?: boolean | null;
        /** does the column match the given pattern */
        _like?: string | null;
        _lt?: string | null;
        _lte?: string | null;
        _neq?: string | null;
        /** does the column NOT match the given case-insensitive pattern */
        _nilike?: string | null;
        _nin?: string[];
        /** does the column NOT match the given POSIX regular expression, case insensitive */
        _niregex?: string | null;
        /** does the column NOT match the given pattern */
        _nlike?: string | null;
        /** does the column NOT match the given POSIX regular expression, case sensitive */
        _nregex?: string | null;
        /** does the column NOT match the given SQL regular expression */
        _nsimilar?: string | null;
        /** does the column match the given POSIX regular expression, case sensitive */
        _regex?: string | null;
        /** does the column match the given SQL regular expression */
        _similar?: string | null;
    };
    ["bigint"]: unknown;
    /** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
    ["bigint_comparison_exp"]: {
        _eq?: ValueTypes["bigint"] | null;
        _gt?: ValueTypes["bigint"] | null;
        _gte?: ValueTypes["bigint"] | null;
        _in?: ValueTypes["bigint"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["bigint"] | null;
        _lte?: ValueTypes["bigint"] | null;
        _neq?: ValueTypes["bigint"] | null;
        _nin?: ValueTypes["bigint"][];
    };
    /** columns and relationships of "blockchain_block" */
    ["blockchain_block"]: AliasType<{
        hash?: true;
        inserted_at?: true;
        nfts?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        number?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "blockchain_block" */
    ["blockchain_block_aggregate"]: AliasType<{
        aggregate?: ValueTypes["blockchain_block_aggregate_fields"];
        nodes?: ValueTypes["blockchain_block"];
        __typename?: true;
    }>;
    /** aggregate fields of "blockchain_block" */
    ["blockchain_block_aggregate_fields"]: AliasType<{
        avg?: ValueTypes["blockchain_block_avg_fields"];
        count?: [{
            columns?: ValueTypes["blockchain_block_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["blockchain_block_max_fields"];
        min?: ValueTypes["blockchain_block_min_fields"];
        stddev?: ValueTypes["blockchain_block_stddev_fields"];
        stddev_pop?: ValueTypes["blockchain_block_stddev_pop_fields"];
        stddev_samp?: ValueTypes["blockchain_block_stddev_samp_fields"];
        sum?: ValueTypes["blockchain_block_sum_fields"];
        var_pop?: ValueTypes["blockchain_block_var_pop_fields"];
        var_samp?: ValueTypes["blockchain_block_var_samp_fields"];
        variance?: ValueTypes["blockchain_block_variance_fields"];
        __typename?: true;
    }>;
    /** aggregate avg on columns */
    ["blockchain_block_avg_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** Boolean expression to filter rows from the table "blockchain_block". All fields are combined with a logical 'AND'. */
    ["blockchain_block_bool_exp"]: {
        _and?: ValueTypes["blockchain_block_bool_exp"][];
        _not?: ValueTypes["blockchain_block_bool_exp"] | null;
        _or?: ValueTypes["blockchain_block_bool_exp"][];
        hash?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        nfts?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
        number?: ValueTypes["bigint_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "blockchain_block" */
    ["blockchain_block_constraint"]: blockchain_block_constraint;
    /** input type for incrementing numeric columns in table "blockchain_block" */
    ["blockchain_block_inc_input"]: {
        number?: ValueTypes["bigint"] | null;
    };
    /** input type for inserting data into table "blockchain_block" */
    ["blockchain_block_insert_input"]: {
        hash?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        nfts?: ValueTypes["nfts_by_blockchain_blocks_arr_rel_insert_input"] | null;
        number?: ValueTypes["bigint"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["blockchain_block_max_fields"]: AliasType<{
        hash?: true;
        inserted_at?: true;
        number?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["blockchain_block_min_fields"]: AliasType<{
        hash?: true;
        inserted_at?: true;
        number?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "blockchain_block" */
    ["blockchain_block_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["blockchain_block"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "blockchain_block" */
    ["blockchain_block_on_conflict"]: {
        constraint: ValueTypes["blockchain_block_constraint"];
        update_columns: ValueTypes["blockchain_block_update_column"][];
        where?: ValueTypes["blockchain_block_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "blockchain_block". */
    ["blockchain_block_order_by"]: {
        hash?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        nfts_aggregate?: ValueTypes["nfts_by_blockchain_blocks_aggregate_order_by"] | null;
        number?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: blockchain_block */
    ["blockchain_block_pk_columns_input"]: {
        hash: string;
    };
    /** select columns of table "blockchain_block" */
    ["blockchain_block_select_column"]: blockchain_block_select_column;
    /** input type for updating data in table "blockchain_block" */
    ["blockchain_block_set_input"]: {
        hash?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        number?: ValueTypes["bigint"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate stddev on columns */
    ["blockchain_block_stddev_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** aggregate stddev_pop on columns */
    ["blockchain_block_stddev_pop_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** aggregate stddev_samp on columns */
    ["blockchain_block_stddev_samp_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** aggregate sum on columns */
    ["blockchain_block_sum_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** update columns of table "blockchain_block" */
    ["blockchain_block_update_column"]: blockchain_block_update_column;
    /** aggregate var_pop on columns */
    ["blockchain_block_var_pop_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** aggregate var_samp on columns */
    ["blockchain_block_var_samp_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** aggregate variance on columns */
    ["blockchain_block_variance_fields"]: AliasType<{
        number?: true;
        __typename?: true;
    }>;
    /** columns and relationships of "blockchain_contract" */
    ["blockchain_contract"]: AliasType<{
        id?: true;
        inserted_at?: true;
        name?: true;
        supports_eip721_metadata?: true;
        symbol?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "blockchain_contract" */
    ["blockchain_contract_aggregate"]: AliasType<{
        aggregate?: ValueTypes["blockchain_contract_aggregate_fields"];
        nodes?: ValueTypes["blockchain_contract"];
        __typename?: true;
    }>;
    /** aggregate fields of "blockchain_contract" */
    ["blockchain_contract_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["blockchain_contract_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["blockchain_contract_max_fields"];
        min?: ValueTypes["blockchain_contract_min_fields"];
        __typename?: true;
    }>;
    /** Boolean expression to filter rows from the table "blockchain_contract". All fields are combined with a logical 'AND'. */
    ["blockchain_contract_bool_exp"]: {
        _and?: ValueTypes["blockchain_contract_bool_exp"][];
        _not?: ValueTypes["blockchain_contract_bool_exp"] | null;
        _or?: ValueTypes["blockchain_contract_bool_exp"][];
        id?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        name?: ValueTypes["String_comparison_exp"] | null;
        supports_eip721_metadata?: ValueTypes["Boolean_comparison_exp"] | null;
        symbol?: ValueTypes["String_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "blockchain_contract" */
    ["blockchain_contract_constraint"]: blockchain_contract_constraint;
    /** input type for inserting data into table "blockchain_contract" */
    ["blockchain_contract_insert_input"]: {
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        name?: string | null;
        supports_eip721_metadata?: boolean | null;
        symbol?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["blockchain_contract_max_fields"]: AliasType<{
        id?: true;
        inserted_at?: true;
        name?: true;
        symbol?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["blockchain_contract_min_fields"]: AliasType<{
        id?: true;
        inserted_at?: true;
        name?: true;
        symbol?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "blockchain_contract" */
    ["blockchain_contract_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["blockchain_contract"];
        __typename?: true;
    }>;
    /** input type for inserting object relation for remote table "blockchain_contract" */
    ["blockchain_contract_obj_rel_insert_input"]: {
        data: ValueTypes["blockchain_contract_insert_input"];
        /** on conflict condition */
        on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
    };
    /** on conflict condition type for table "blockchain_contract" */
    ["blockchain_contract_on_conflict"]: {
        constraint: ValueTypes["blockchain_contract_constraint"];
        update_columns: ValueTypes["blockchain_contract_update_column"][];
        where?: ValueTypes["blockchain_contract_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "blockchain_contract". */
    ["blockchain_contract_order_by"]: {
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        name?: ValueTypes["order_by"] | null;
        supports_eip721_metadata?: ValueTypes["order_by"] | null;
        symbol?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: blockchain_contract */
    ["blockchain_contract_pk_columns_input"]: {
        id: string;
    };
    /** select columns of table "blockchain_contract" */
    ["blockchain_contract_select_column"]: blockchain_contract_select_column;
    /** input type for updating data in table "blockchain_contract" */
    ["blockchain_contract_set_input"]: {
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        name?: string | null;
        supports_eip721_metadata?: boolean | null;
        symbol?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "blockchain_contract" */
    ["blockchain_contract_update_column"]: blockchain_contract_update_column;
    ["bytea"]: unknown;
    /** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
    ["bytea_comparison_exp"]: {
        _eq?: ValueTypes["bytea"] | null;
        _gt?: ValueTypes["bytea"] | null;
        _gte?: ValueTypes["bytea"] | null;
        _in?: ValueTypes["bytea"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["bytea"] | null;
        _lte?: ValueTypes["bytea"] | null;
        _neq?: ValueTypes["bytea"] | null;
        _nin?: ValueTypes["bytea"][];
    };
    /** columns and relationships of "content" */
    ["content"]: AliasType<{
        cid?: true;
        dag_size?: true;
        inserted_at?: true;
        pins?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pins_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "content" */
    ["content_aggregate"]: AliasType<{
        aggregate?: ValueTypes["content_aggregate_fields"];
        nodes?: ValueTypes["content"];
        __typename?: true;
    }>;
    /** aggregate fields of "content" */
    ["content_aggregate_fields"]: AliasType<{
        avg?: ValueTypes["content_avg_fields"];
        count?: [{
            columns?: ValueTypes["content_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["content_max_fields"];
        min?: ValueTypes["content_min_fields"];
        stddev?: ValueTypes["content_stddev_fields"];
        stddev_pop?: ValueTypes["content_stddev_pop_fields"];
        stddev_samp?: ValueTypes["content_stddev_samp_fields"];
        sum?: ValueTypes["content_sum_fields"];
        var_pop?: ValueTypes["content_var_pop_fields"];
        var_samp?: ValueTypes["content_var_samp_fields"];
        variance?: ValueTypes["content_variance_fields"];
        __typename?: true;
    }>;
    /** aggregate avg on columns */
    ["content_avg_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** Boolean expression to filter rows from the table "content". All fields are combined with a logical 'AND'. */
    ["content_bool_exp"]: {
        _and?: ValueTypes["content_bool_exp"][];
        _not?: ValueTypes["content_bool_exp"] | null;
        _or?: ValueTypes["content_bool_exp"][];
        cid?: ValueTypes["String_comparison_exp"] | null;
        dag_size?: ValueTypes["bigint_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        pins?: ValueTypes["pin_bool_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "content" */
    ["content_constraint"]: content_constraint;
    /** input type for incrementing numeric columns in table "content" */
    ["content_inc_input"]: {
        dag_size?: ValueTypes["bigint"] | null;
    };
    /** input type for inserting data into table "content" */
    ["content_insert_input"]: {
        cid?: string | null;
        dag_size?: ValueTypes["bigint"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        pins?: ValueTypes["pin_arr_rel_insert_input"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["content_max_fields"]: AliasType<{
        cid?: true;
        dag_size?: true;
        inserted_at?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["content_min_fields"]: AliasType<{
        cid?: true;
        dag_size?: true;
        inserted_at?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "content" */
    ["content_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["content"];
        __typename?: true;
    }>;
    /** input type for inserting object relation for remote table "content" */
    ["content_obj_rel_insert_input"]: {
        data: ValueTypes["content_insert_input"];
        /** on conflict condition */
        on_conflict?: ValueTypes["content_on_conflict"] | null;
    };
    /** on conflict condition type for table "content" */
    ["content_on_conflict"]: {
        constraint: ValueTypes["content_constraint"];
        update_columns: ValueTypes["content_update_column"][];
        where?: ValueTypes["content_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "content". */
    ["content_order_by"]: {
        cid?: ValueTypes["order_by"] | null;
        dag_size?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        pins_aggregate?: ValueTypes["pin_aggregate_order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: content */
    ["content_pk_columns_input"]: {
        cid: string;
    };
    /** select columns of table "content" */
    ["content_select_column"]: content_select_column;
    /** input type for updating data in table "content" */
    ["content_set_input"]: {
        cid?: string | null;
        dag_size?: ValueTypes["bigint"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate stddev on columns */
    ["content_stddev_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** aggregate stddev_pop on columns */
    ["content_stddev_pop_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** aggregate stddev_samp on columns */
    ["content_stddev_samp_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** aggregate sum on columns */
    ["content_sum_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** update columns of table "content" */
    ["content_update_column"]: content_update_column;
    /** aggregate var_pop on columns */
    ["content_var_pop_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** aggregate var_samp on columns */
    ["content_var_samp_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** aggregate variance on columns */
    ["content_variance_fields"]: AliasType<{
        dag_size?: true;
        __typename?: true;
    }>;
    /** columns and relationships of "erc721_import" */
    ["erc721_import"]: AliasType<{
        id?: true;
        inserted_at?: true;
        next_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "erc721_import" */
    ["erc721_import_aggregate"]: AliasType<{
        aggregate?: ValueTypes["erc721_import_aggregate_fields"];
        nodes?: ValueTypes["erc721_import"];
        __typename?: true;
    }>;
    /** aggregate fields of "erc721_import" */
    ["erc721_import_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["erc721_import_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["erc721_import_max_fields"];
        min?: ValueTypes["erc721_import_min_fields"];
        __typename?: true;
    }>;
    /** Boolean expression to filter rows from the table "erc721_import". All fields are combined with a logical 'AND'. */
    ["erc721_import_bool_exp"]: {
        _and?: ValueTypes["erc721_import_bool_exp"][];
        _not?: ValueTypes["erc721_import_bool_exp"] | null;
        _or?: ValueTypes["erc721_import_bool_exp"][];
        id?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        next_id?: ValueTypes["String_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** columns and relationships of "erc721_import_by_nft" */
    ["erc721_import_by_nft"]: AliasType<{
        erc721_import_id?: true;
        inserted_at?: true;
        nft_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "erc721_import_by_nft" */
    ["erc721_import_by_nft_aggregate"]: AliasType<{
        aggregate?: ValueTypes["erc721_import_by_nft_aggregate_fields"];
        nodes?: ValueTypes["erc721_import_by_nft"];
        __typename?: true;
    }>;
    /** aggregate fields of "erc721_import_by_nft" */
    ["erc721_import_by_nft_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["erc721_import_by_nft_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["erc721_import_by_nft_max_fields"];
        min?: ValueTypes["erc721_import_by_nft_min_fields"];
        __typename?: true;
    }>;
    /** Boolean expression to filter rows from the table "erc721_import_by_nft". All fields are combined with a logical 'AND'. */
    ["erc721_import_by_nft_bool_exp"]: {
        _and?: ValueTypes["erc721_import_by_nft_bool_exp"][];
        _not?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
        _or?: ValueTypes["erc721_import_by_nft_bool_exp"][];
        erc721_import_id?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        nft_id?: ValueTypes["String_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "erc721_import_by_nft" */
    ["erc721_import_by_nft_constraint"]: erc721_import_by_nft_constraint;
    /** input type for inserting data into table "erc721_import_by_nft" */
    ["erc721_import_by_nft_insert_input"]: {
        erc721_import_id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        nft_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["erc721_import_by_nft_max_fields"]: AliasType<{
        erc721_import_id?: true;
        inserted_at?: true;
        nft_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["erc721_import_by_nft_min_fields"]: AliasType<{
        erc721_import_id?: true;
        inserted_at?: true;
        nft_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "erc721_import_by_nft" */
    ["erc721_import_by_nft_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["erc721_import_by_nft"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "erc721_import_by_nft" */
    ["erc721_import_by_nft_on_conflict"]: {
        constraint: ValueTypes["erc721_import_by_nft_constraint"];
        update_columns: ValueTypes["erc721_import_by_nft_update_column"][];
        where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "erc721_import_by_nft". */
    ["erc721_import_by_nft_order_by"]: {
        erc721_import_id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        nft_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: erc721_import_by_nft */
    ["erc721_import_by_nft_pk_columns_input"]: {
        erc721_import_id: string;
        nft_id: string;
    };
    /** select columns of table "erc721_import_by_nft" */
    ["erc721_import_by_nft_select_column"]: erc721_import_by_nft_select_column;
    /** input type for updating data in table "erc721_import_by_nft" */
    ["erc721_import_by_nft_set_input"]: {
        erc721_import_id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        nft_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "erc721_import_by_nft" */
    ["erc721_import_by_nft_update_column"]: erc721_import_by_nft_update_column;
    /** unique or primary key constraints on table "erc721_import" */
    ["erc721_import_constraint"]: erc721_import_constraint;
    /** input type for inserting data into table "erc721_import" */
    ["erc721_import_insert_input"]: {
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        next_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["erc721_import_max_fields"]: AliasType<{
        id?: true;
        inserted_at?: true;
        next_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["erc721_import_min_fields"]: AliasType<{
        id?: true;
        inserted_at?: true;
        next_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "erc721_import" */
    ["erc721_import_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["erc721_import"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "erc721_import" */
    ["erc721_import_on_conflict"]: {
        constraint: ValueTypes["erc721_import_constraint"];
        update_columns: ValueTypes["erc721_import_update_column"][];
        where?: ValueTypes["erc721_import_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "erc721_import". */
    ["erc721_import_order_by"]: {
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        next_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: erc721_import */
    ["erc721_import_pk_columns_input"]: {
        id: string;
    };
    /** select columns of table "erc721_import" */
    ["erc721_import_select_column"]: erc721_import_select_column;
    /** input type for updating data in table "erc721_import" */
    ["erc721_import_set_input"]: {
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        next_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "erc721_import" */
    ["erc721_import_update_column"]: erc721_import_update_column;
    ["fail_nft_asset_args"]: {
        ipfs_url?: string | null;
        status?: ValueTypes["nft_asset_status"] | null;
        status_text?: string | null;
        token_uri_hash?: string | null;
    };
    ["fail_resource_args"]: {
        ipfs_url?: string | null;
        status?: ValueTypes["resource_status"] | null;
        status_text?: string | null;
        uri_hash?: ValueTypes["bytea"] | null;
    };
    ["ingest_erc721_token_args"]: {
        block_hash?: string | null;
        block_number?: ValueTypes["bigint"] | null;
        contract_id?: string | null;
        contract_name?: string | null;
        contract_supports_eip721_metadata?: boolean | null;
        contract_symbol?: string | null;
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        mint_time?: ValueTypes["timestamptz"] | null;
        owner_id?: string | null;
        token_id?: string | null;
        token_uri?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    ["jsonb"]: unknown;
    /** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
    ["jsonb_comparison_exp"]: {
        /** is the column contained in the given json value */
        _contained_in?: ValueTypes["jsonb"] | null;
        /** does the column contain the given json value at the top level */
        _contains?: ValueTypes["jsonb"] | null;
        _eq?: ValueTypes["jsonb"] | null;
        _gt?: ValueTypes["jsonb"] | null;
        _gte?: ValueTypes["jsonb"] | null;
        /** does the string exist as a top-level key in the column */
        _has_key?: string | null;
        /** do all of these strings exist as top-level keys in the column */
        _has_keys_all?: string[];
        /** do any of these strings exist as top-level keys in the column */
        _has_keys_any?: string[];
        _in?: ValueTypes["jsonb"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["jsonb"] | null;
        _lte?: ValueTypes["jsonb"] | null;
        _neq?: ValueTypes["jsonb"] | null;
        _nin?: ValueTypes["jsonb"][];
    };
    ["link_nft_resource_args"]: {
        cid?: string | null;
        uri?: string | null;
    };
    ["link_resource_content_args"]: {
        cid?: string | null;
        dag_size?: ValueTypes["bigint"] | null;
        ipfs_url?: string | null;
        pin_service?: ValueTypes["pin_service"] | null;
        status_text?: string | null;
        uri_hash?: ValueTypes["bytea"] | null;
    };
    /** mutation root */
    ["mutation_root"]: AliasType<{
        delete_blockchain_block?: [
            {
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        delete_blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        delete_blockchain_contract?: [
            {
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        delete_blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        delete_content?: [
            {
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        delete_content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        delete_erc721_import?: [
            {
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        delete_erc721_import_by_nft?: [
            {
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        delete_erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        delete_erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        delete_nft?: [
            {
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        delete_nft_asset?: [
            {
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        delete_nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        delete_nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        delete_nft_metadata?: [
            {
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        delete_nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        delete_nft_ownership?: [
            {
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        delete_nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        delete_nfts_by_blockchain_blocks?: [
            {
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        delete_nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        delete_niftysave_migration?: [
            {
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        delete_niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        delete_other_nft_resources?: [
            {
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        delete_other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        delete_pin?: [
            {
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        delete_pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        delete_resource?: [
            {
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        delete_resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        fail_nft_asset?: [
            {
                args: ValueTypes["fail_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        fail_resource?: [
            {
                args: ValueTypes["fail_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        ingest_erc721_token?: [
            {
                args: ValueTypes["ingest_erc721_token_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_blockchain_block?: [
            {
                objects: ValueTypes["blockchain_block_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        insert_blockchain_block_one?: [
            {
                object: ValueTypes["blockchain_block_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        insert_blockchain_contract?: [
            {
                objects: ValueTypes["blockchain_contract_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        insert_blockchain_contract_one?: [
            {
                object: ValueTypes["blockchain_contract_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        insert_content?: [
            {
                objects: ValueTypes["content_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content_mutation_response"]
        ];
        insert_content_one?: [
            {
                object: ValueTypes["content_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content"]
        ];
        insert_erc721_import?: [
            {
                objects: ValueTypes["erc721_import_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        insert_erc721_import_by_nft?: [
            {
                objects: ValueTypes["erc721_import_by_nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        insert_erc721_import_by_nft_one?: [
            {
                object: ValueTypes["erc721_import_by_nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        insert_erc721_import_one?: [
            {
                object: ValueTypes["erc721_import_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        insert_nft?: [
            {
                objects: ValueTypes["nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft_mutation_response"]
        ];
        insert_nft_asset?: [
            {
                objects: ValueTypes["nft_asset_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        insert_nft_asset_one?: [
            {
                object: ValueTypes["nft_asset_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        insert_nft_metadata?: [
            {
                objects: ValueTypes["nft_metadata_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        insert_nft_metadata_one?: [
            {
                object: ValueTypes["nft_metadata_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        insert_nft_one?: [
            {
                object: ValueTypes["nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_nft_ownership?: [
            {
                objects: ValueTypes["nft_ownership_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        insert_nft_ownership_one?: [
            {
                object: ValueTypes["nft_ownership_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        insert_nfts_by_blockchain_blocks?: [
            {
                objects: ValueTypes["nfts_by_blockchain_blocks_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        insert_nfts_by_blockchain_blocks_one?: [
            {
                object: ValueTypes["nfts_by_blockchain_blocks_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        insert_niftysave_migration?: [
            {
                objects: ValueTypes["niftysave_migration_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        insert_niftysave_migration_one?: [
            {
                object: ValueTypes["niftysave_migration_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        insert_other_nft_resources?: [
            {
                objects: ValueTypes["other_nft_resources_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        insert_other_nft_resources_one?: [
            {
                object: ValueTypes["other_nft_resources_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        insert_pin?: [
            {
                objects: ValueTypes["pin_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin_mutation_response"]
        ];
        insert_pin_one?: [
            {
                object: ValueTypes["pin_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin"]
        ];
        insert_resource?: [
            {
                objects: ValueTypes["resource_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource_mutation_response"]
        ];
        insert_resource_one?: [
            {
                object: ValueTypes["resource_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource"]
        ];
        link_nft_resource?: [
            {
                args: ValueTypes["link_nft_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        link_resource_content?: [
            {
                args: ValueTypes["link_resource_content_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        parse_nft_asset?: [
            {
                args: ValueTypes["parse_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        queue_resource?: [
            {
                args: ValueTypes["queue_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        update_blockchain_block?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        update_blockchain_block_by_pk?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null;
                pk_columns: ValueTypes["blockchain_block_pk_columns_input"];
            },
            ValueTypes["blockchain_block"]
        ];
        update_blockchain_contract?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        update_blockchain_contract_by_pk?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null;
                pk_columns: ValueTypes["blockchain_contract_pk_columns_input"];
            },
            ValueTypes["blockchain_contract"]
        ];
        update_content?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        update_content_by_pk?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null;
                pk_columns: ValueTypes["content_pk_columns_input"];
            },
            ValueTypes["content"]
        ];
        update_erc721_import?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        update_erc721_import_by_nft?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        update_erc721_import_by_nft_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_by_nft_pk_columns_input"];
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        update_erc721_import_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_pk_columns_input"];
            },
            ValueTypes["erc721_import"]
        ];
        update_nft?: [
            {
                _set?: ValueTypes["nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        update_nft_asset?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        update_nft_asset_by_pk?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null;
                pk_columns: ValueTypes["nft_asset_pk_columns_input"];
            },
            ValueTypes["nft_asset"]
        ];
        update_nft_by_pk?: [
            {
                _set?: ValueTypes["nft_set_input"] | null;
                pk_columns: ValueTypes["nft_pk_columns_input"];
            },
            ValueTypes["nft"]
        ];
        update_nft_metadata?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        update_nft_metadata_by_pk?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null;
                pk_columns: ValueTypes["nft_metadata_pk_columns_input"];
            },
            ValueTypes["nft_metadata"]
        ];
        update_nft_ownership?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        update_nft_ownership_by_pk?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null;
                pk_columns: ValueTypes["nft_ownership_pk_columns_input"];
            },
            ValueTypes["nft_ownership"]
        ];
        update_nfts_by_blockchain_blocks?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        update_nfts_by_blockchain_blocks_by_pk?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null;
                pk_columns: ValueTypes["nfts_by_blockchain_blocks_pk_columns_input"];
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        update_niftysave_migration?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        update_niftysave_migration_by_pk?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null;
                pk_columns: ValueTypes["niftysave_migration_pk_columns_input"];
            },
            ValueTypes["niftysave_migration"]
        ];
        update_other_nft_resources?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        update_other_nft_resources_by_pk?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null;
                pk_columns: ValueTypes["other_nft_resources_pk_columns_input"];
            },
            ValueTypes["other_nft_resources"]
        ];
        update_pin?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        update_pin_by_pk?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null;
                pk_columns: ValueTypes["pin_pk_columns_input"];
            },
            ValueTypes["pin"]
        ];
        update_resource?: [
            {
                _set?: ValueTypes["resource_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        update_resource_by_pk?: [
            {
                _set?: ValueTypes["resource_set_input"] | null;
                pk_columns: ValueTypes["resource_pk_columns_input"];
            },
            ValueTypes["resource"]
        ];
        __typename?: true;
    }>;
    /** columns and relationships of "nft" */
    ["nft"]: AliasType<{
        /** An object relationship */
        contract?: ValueTypes["blockchain_contract"];
        contract_id?: true;
        id?: true;
        inserted_at?: true;
        mint_time?: true;
        /** An object relationship */
        nft_asset?: ValueTypes["nft_asset"];
        referrer_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        referrer_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        token_id?: true;
        token_uri_hash?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "nft" */
    ["nft_aggregate"]: AliasType<{
        aggregate?: ValueTypes["nft_aggregate_fields"];
        nodes?: ValueTypes["nft"];
        __typename?: true;
    }>;
    /** aggregate fields of "nft" */
    ["nft_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["nft_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["nft_max_fields"];
        min?: ValueTypes["nft_min_fields"];
        __typename?: true;
    }>;
    /** order by aggregate values of table "nft" */
    ["nft_aggregate_order_by"]: {
        count?: ValueTypes["order_by"] | null;
        max?: ValueTypes["nft_max_order_by"] | null;
        min?: ValueTypes["nft_min_order_by"] | null;
    };
    /** input type for inserting array relation for remote table "nft" */
    ["nft_arr_rel_insert_input"]: {
        data: ValueTypes["nft_insert_input"][];
        /** on conflict condition */
        on_conflict?: ValueTypes["nft_on_conflict"] | null;
    };
    /** columns and relationships of "nft_asset" */
    ["nft_asset"]: AliasType<{
        inserted_at?: true;
        ipfs_url?: true;
        /** An object relationship */
        metadata?: ValueTypes["nft_metadata"];
        metadata_cid?: true;
        nfts?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nfts_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        status?: true;
        status_text?: true;
        token_uri?: true;
        token_uri_hash?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "nft_asset" */
    ["nft_asset_aggregate"]: AliasType<{
        aggregate?: ValueTypes["nft_asset_aggregate_fields"];
        nodes?: ValueTypes["nft_asset"];
        __typename?: true;
    }>;
    /** aggregate fields of "nft_asset" */
    ["nft_asset_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["nft_asset_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["nft_asset_max_fields"];
        min?: ValueTypes["nft_asset_min_fields"];
        __typename?: true;
    }>;
    /** order by aggregate values of table "nft_asset" */
    ["nft_asset_aggregate_order_by"]: {
        count?: ValueTypes["order_by"] | null;
        max?: ValueTypes["nft_asset_max_order_by"] | null;
        min?: ValueTypes["nft_asset_min_order_by"] | null;
    };
    /** input type for inserting array relation for remote table "nft_asset" */
    ["nft_asset_arr_rel_insert_input"]: {
        data: ValueTypes["nft_asset_insert_input"][];
        /** on conflict condition */
        on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
    };
    /** Boolean expression to filter rows from the table "nft_asset". All fields are combined with a logical 'AND'. */
    ["nft_asset_bool_exp"]: {
        _and?: ValueTypes["nft_asset_bool_exp"][];
        _not?: ValueTypes["nft_asset_bool_exp"] | null;
        _or?: ValueTypes["nft_asset_bool_exp"][];
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        ipfs_url?: ValueTypes["String_comparison_exp"] | null;
        metadata?: ValueTypes["nft_metadata_bool_exp"] | null;
        metadata_cid?: ValueTypes["String_comparison_exp"] | null;
        nfts?: ValueTypes["nft_bool_exp"] | null;
        status?: ValueTypes["nft_asset_status_comparison_exp"] | null;
        status_text?: ValueTypes["String_comparison_exp"] | null;
        token_uri?: ValueTypes["String_comparison_exp"] | null;
        token_uri_hash?: ValueTypes["bytea_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "nft_asset" */
    ["nft_asset_constraint"]: nft_asset_constraint;
    /** input type for inserting data into table "nft_asset" */
    ["nft_asset_insert_input"]: {
        inserted_at?: ValueTypes["timestamptz"] | null;
        ipfs_url?: string | null;
        metadata?: ValueTypes["nft_metadata_obj_rel_insert_input"] | null;
        metadata_cid?: string | null;
        nfts?: ValueTypes["nft_arr_rel_insert_input"] | null;
        status?: ValueTypes["nft_asset_status"] | null;
        status_text?: string | null;
        token_uri?: string | null;
        token_uri_hash?: ValueTypes["bytea"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["nft_asset_max_fields"]: AliasType<{
        inserted_at?: true;
        ipfs_url?: true;
        metadata_cid?: true;
        status_text?: true;
        token_uri?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by max() on columns of table "nft_asset" */
    ["nft_asset_max_order_by"]: {
        inserted_at?: ValueTypes["order_by"] | null;
        ipfs_url?: ValueTypes["order_by"] | null;
        metadata_cid?: ValueTypes["order_by"] | null;
        status_text?: ValueTypes["order_by"] | null;
        token_uri?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** aggregate min on columns */
    ["nft_asset_min_fields"]: AliasType<{
        inserted_at?: true;
        ipfs_url?: true;
        metadata_cid?: true;
        status_text?: true;
        token_uri?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by min() on columns of table "nft_asset" */
    ["nft_asset_min_order_by"]: {
        inserted_at?: ValueTypes["order_by"] | null;
        ipfs_url?: ValueTypes["order_by"] | null;
        metadata_cid?: ValueTypes["order_by"] | null;
        status_text?: ValueTypes["order_by"] | null;
        token_uri?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** response of any mutation on the table "nft_asset" */
    ["nft_asset_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["nft_asset"];
        __typename?: true;
    }>;
    /** input type for inserting object relation for remote table "nft_asset" */
    ["nft_asset_obj_rel_insert_input"]: {
        data: ValueTypes["nft_asset_insert_input"];
        /** on conflict condition */
        on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
    };
    /** on conflict condition type for table "nft_asset" */
    ["nft_asset_on_conflict"]: {
        constraint: ValueTypes["nft_asset_constraint"];
        update_columns: ValueTypes["nft_asset_update_column"][];
        where?: ValueTypes["nft_asset_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "nft_asset". */
    ["nft_asset_order_by"]: {
        inserted_at?: ValueTypes["order_by"] | null;
        ipfs_url?: ValueTypes["order_by"] | null;
        metadata?: ValueTypes["nft_metadata_order_by"] | null;
        metadata_cid?: ValueTypes["order_by"] | null;
        nfts_aggregate?: ValueTypes["nft_aggregate_order_by"] | null;
        status?: ValueTypes["order_by"] | null;
        status_text?: ValueTypes["order_by"] | null;
        token_uri?: ValueTypes["order_by"] | null;
        token_uri_hash?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: nft_asset */
    ["nft_asset_pk_columns_input"]: {
        token_uri_hash: ValueTypes["bytea"];
    };
    /** select columns of table "nft_asset" */
    ["nft_asset_select_column"]: nft_asset_select_column;
    /** input type for updating data in table "nft_asset" */
    ["nft_asset_set_input"]: {
        inserted_at?: ValueTypes["timestamptz"] | null;
        ipfs_url?: string | null;
        metadata_cid?: string | null;
        status?: ValueTypes["nft_asset_status"] | null;
        status_text?: string | null;
        token_uri?: string | null;
        token_uri_hash?: ValueTypes["bytea"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    ["nft_asset_status"]: unknown;
    /** Boolean expression to compare columns of type "nft_asset_status". All fields are combined with logical 'AND'. */
    ["nft_asset_status_comparison_exp"]: {
        _eq?: ValueTypes["nft_asset_status"] | null;
        _gt?: ValueTypes["nft_asset_status"] | null;
        _gte?: ValueTypes["nft_asset_status"] | null;
        _in?: ValueTypes["nft_asset_status"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["nft_asset_status"] | null;
        _lte?: ValueTypes["nft_asset_status"] | null;
        _neq?: ValueTypes["nft_asset_status"] | null;
        _nin?: ValueTypes["nft_asset_status"][];
    };
    /** update columns of table "nft_asset" */
    ["nft_asset_update_column"]: nft_asset_update_column;
    /** Boolean expression to filter rows from the table "nft". All fields are combined with a logical 'AND'. */
    ["nft_bool_exp"]: {
        _and?: ValueTypes["nft_bool_exp"][];
        _not?: ValueTypes["nft_bool_exp"] | null;
        _or?: ValueTypes["nft_bool_exp"][];
        contract?: ValueTypes["blockchain_contract_bool_exp"] | null;
        contract_id?: ValueTypes["String_comparison_exp"] | null;
        id?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        mint_time?: ValueTypes["timestamptz_comparison_exp"] | null;
        nft_asset?: ValueTypes["nft_asset_bool_exp"] | null;
        referrer_blocks?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
        token_id?: ValueTypes["String_comparison_exp"] | null;
        token_uri_hash?: ValueTypes["bytea_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "nft" */
    ["nft_constraint"]: nft_constraint;
    /** input type for inserting data into table "nft" */
    ["nft_insert_input"]: {
        contract?: ValueTypes["blockchain_contract_obj_rel_insert_input"] | null;
        contract_id?: string | null;
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        mint_time?: ValueTypes["timestamptz"] | null;
        nft_asset?: ValueTypes["nft_asset_obj_rel_insert_input"] | null;
        referrer_blocks?: ValueTypes["nfts_by_blockchain_blocks_arr_rel_insert_input"] | null;
        token_id?: string | null;
        token_uri_hash?: ValueTypes["bytea"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["nft_max_fields"]: AliasType<{
        contract_id?: true;
        id?: true;
        inserted_at?: true;
        mint_time?: true;
        token_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by max() on columns of table "nft" */
    ["nft_max_order_by"]: {
        contract_id?: ValueTypes["order_by"] | null;
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        mint_time?: ValueTypes["order_by"] | null;
        token_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** columns and relationships of "nft_metadata" */
    ["nft_metadata"]: AliasType<{
        cid?: true;
        /** An object relationship */
        content?: ValueTypes["content"];
        description?: true;
        /** An object relationship */
        image?: ValueTypes["resource"];
        image_uri_hash?: true;
        inserted_at?: true;
        json?: [
            {
                path?: string | null;
            },
            true
        ];
        name?: true;
        nft_assets?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_assets_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "nft_metadata" */
    ["nft_metadata_aggregate"]: AliasType<{
        aggregate?: ValueTypes["nft_metadata_aggregate_fields"];
        nodes?: ValueTypes["nft_metadata"];
        __typename?: true;
    }>;
    /** aggregate fields of "nft_metadata" */
    ["nft_metadata_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["nft_metadata_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["nft_metadata_max_fields"];
        min?: ValueTypes["nft_metadata_min_fields"];
        __typename?: true;
    }>;
    /** append existing jsonb value of filtered columns with new jsonb value */
    ["nft_metadata_append_input"]: {
        json?: ValueTypes["jsonb"] | null;
    };
    /** Boolean expression to filter rows from the table "nft_metadata". All fields are combined with a logical 'AND'. */
    ["nft_metadata_bool_exp"]: {
        _and?: ValueTypes["nft_metadata_bool_exp"][];
        _not?: ValueTypes["nft_metadata_bool_exp"] | null;
        _or?: ValueTypes["nft_metadata_bool_exp"][];
        cid?: ValueTypes["String_comparison_exp"] | null;
        content?: ValueTypes["content_bool_exp"] | null;
        description?: ValueTypes["String_comparison_exp"] | null;
        image?: ValueTypes["resource_bool_exp"] | null;
        image_uri_hash?: ValueTypes["bytea_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        json?: ValueTypes["jsonb_comparison_exp"] | null;
        name?: ValueTypes["String_comparison_exp"] | null;
        nft_assets?: ValueTypes["nft_asset_bool_exp"] | null;
        other_nft_resources?: ValueTypes["other_nft_resources_bool_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "nft_metadata" */
    ["nft_metadata_constraint"]: nft_metadata_constraint;
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    ["nft_metadata_delete_at_path_input"]: {
        json?: string[];
    };
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    ["nft_metadata_delete_elem_input"]: {
        json?: number | null;
    };
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    ["nft_metadata_delete_key_input"]: {
        json?: string | null;
    };
    /** input type for inserting data into table "nft_metadata" */
    ["nft_metadata_insert_input"]: {
        cid?: string | null;
        content?: ValueTypes["content_obj_rel_insert_input"] | null;
        description?: string | null;
        image?: ValueTypes["resource_obj_rel_insert_input"] | null;
        image_uri_hash?: ValueTypes["bytea"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        json?: ValueTypes["jsonb"] | null;
        name?: string | null;
        nft_assets?: ValueTypes["nft_asset_arr_rel_insert_input"] | null;
        other_nft_resources?: ValueTypes["other_nft_resources_arr_rel_insert_input"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["nft_metadata_max_fields"]: AliasType<{
        cid?: true;
        description?: true;
        inserted_at?: true;
        name?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["nft_metadata_min_fields"]: AliasType<{
        cid?: true;
        description?: true;
        inserted_at?: true;
        name?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "nft_metadata" */
    ["nft_metadata_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["nft_metadata"];
        __typename?: true;
    }>;
    /** input type for inserting object relation for remote table "nft_metadata" */
    ["nft_metadata_obj_rel_insert_input"]: {
        data: ValueTypes["nft_metadata_insert_input"];
        /** on conflict condition */
        on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
    };
    /** on conflict condition type for table "nft_metadata" */
    ["nft_metadata_on_conflict"]: {
        constraint: ValueTypes["nft_metadata_constraint"];
        update_columns: ValueTypes["nft_metadata_update_column"][];
        where?: ValueTypes["nft_metadata_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "nft_metadata". */
    ["nft_metadata_order_by"]: {
        cid?: ValueTypes["order_by"] | null;
        content?: ValueTypes["content_order_by"] | null;
        description?: ValueTypes["order_by"] | null;
        image?: ValueTypes["resource_order_by"] | null;
        image_uri_hash?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        json?: ValueTypes["order_by"] | null;
        name?: ValueTypes["order_by"] | null;
        nft_assets_aggregate?: ValueTypes["nft_asset_aggregate_order_by"] | null;
        other_nft_resources_aggregate?: ValueTypes["other_nft_resources_aggregate_order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: nft_metadata */
    ["nft_metadata_pk_columns_input"]: {
        cid: string;
    };
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    ["nft_metadata_prepend_input"]: {
        json?: ValueTypes["jsonb"] | null;
    };
    /** select columns of table "nft_metadata" */
    ["nft_metadata_select_column"]: nft_metadata_select_column;
    /** input type for updating data in table "nft_metadata" */
    ["nft_metadata_set_input"]: {
        cid?: string | null;
        description?: string | null;
        image_uri_hash?: ValueTypes["bytea"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        json?: ValueTypes["jsonb"] | null;
        name?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "nft_metadata" */
    ["nft_metadata_update_column"]: nft_metadata_update_column;
    /** aggregate min on columns */
    ["nft_min_fields"]: AliasType<{
        contract_id?: true;
        id?: true;
        inserted_at?: true;
        mint_time?: true;
        token_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by min() on columns of table "nft" */
    ["nft_min_order_by"]: {
        contract_id?: ValueTypes["order_by"] | null;
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        mint_time?: ValueTypes["order_by"] | null;
        token_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** response of any mutation on the table "nft" */
    ["nft_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["nft"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "nft" */
    ["nft_on_conflict"]: {
        constraint: ValueTypes["nft_constraint"];
        update_columns: ValueTypes["nft_update_column"][];
        where?: ValueTypes["nft_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "nft". */
    ["nft_order_by"]: {
        contract?: ValueTypes["blockchain_contract_order_by"] | null;
        contract_id?: ValueTypes["order_by"] | null;
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        mint_time?: ValueTypes["order_by"] | null;
        nft_asset?: ValueTypes["nft_asset_order_by"] | null;
        referrer_blocks_aggregate?: ValueTypes["nfts_by_blockchain_blocks_aggregate_order_by"] | null;
        token_id?: ValueTypes["order_by"] | null;
        token_uri_hash?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** columns and relationships of "nft_ownership" */
    ["nft_ownership"]: AliasType<{
        block_number?: true;
        inserted_at?: true;
        nft_id?: true;
        owner_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "nft_ownership" */
    ["nft_ownership_aggregate"]: AliasType<{
        aggregate?: ValueTypes["nft_ownership_aggregate_fields"];
        nodes?: ValueTypes["nft_ownership"];
        __typename?: true;
    }>;
    /** aggregate fields of "nft_ownership" */
    ["nft_ownership_aggregate_fields"]: AliasType<{
        avg?: ValueTypes["nft_ownership_avg_fields"];
        count?: [{
            columns?: ValueTypes["nft_ownership_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["nft_ownership_max_fields"];
        min?: ValueTypes["nft_ownership_min_fields"];
        stddev?: ValueTypes["nft_ownership_stddev_fields"];
        stddev_pop?: ValueTypes["nft_ownership_stddev_pop_fields"];
        stddev_samp?: ValueTypes["nft_ownership_stddev_samp_fields"];
        sum?: ValueTypes["nft_ownership_sum_fields"];
        var_pop?: ValueTypes["nft_ownership_var_pop_fields"];
        var_samp?: ValueTypes["nft_ownership_var_samp_fields"];
        variance?: ValueTypes["nft_ownership_variance_fields"];
        __typename?: true;
    }>;
    /** aggregate avg on columns */
    ["nft_ownership_avg_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** Boolean expression to filter rows from the table "nft_ownership". All fields are combined with a logical 'AND'. */
    ["nft_ownership_bool_exp"]: {
        _and?: ValueTypes["nft_ownership_bool_exp"][];
        _not?: ValueTypes["nft_ownership_bool_exp"] | null;
        _or?: ValueTypes["nft_ownership_bool_exp"][];
        block_number?: ValueTypes["bigint_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        nft_id?: ValueTypes["String_comparison_exp"] | null;
        owner_id?: ValueTypes["String_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "nft_ownership" */
    ["nft_ownership_constraint"]: nft_ownership_constraint;
    /** input type for incrementing numeric columns in table "nft_ownership" */
    ["nft_ownership_inc_input"]: {
        block_number?: ValueTypes["bigint"] | null;
    };
    /** input type for inserting data into table "nft_ownership" */
    ["nft_ownership_insert_input"]: {
        block_number?: ValueTypes["bigint"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        nft_id?: string | null;
        owner_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["nft_ownership_max_fields"]: AliasType<{
        block_number?: true;
        inserted_at?: true;
        nft_id?: true;
        owner_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["nft_ownership_min_fields"]: AliasType<{
        block_number?: true;
        inserted_at?: true;
        nft_id?: true;
        owner_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "nft_ownership" */
    ["nft_ownership_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["nft_ownership"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "nft_ownership" */
    ["nft_ownership_on_conflict"]: {
        constraint: ValueTypes["nft_ownership_constraint"];
        update_columns: ValueTypes["nft_ownership_update_column"][];
        where?: ValueTypes["nft_ownership_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "nft_ownership". */
    ["nft_ownership_order_by"]: {
        block_number?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        nft_id?: ValueTypes["order_by"] | null;
        owner_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: nft_ownership */
    ["nft_ownership_pk_columns_input"]: {
        block_number: ValueTypes["bigint"];
        nft_id: string;
        owner_id: string;
    };
    /** select columns of table "nft_ownership" */
    ["nft_ownership_select_column"]: nft_ownership_select_column;
    /** input type for updating data in table "nft_ownership" */
    ["nft_ownership_set_input"]: {
        block_number?: ValueTypes["bigint"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        nft_id?: string | null;
        owner_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate stddev on columns */
    ["nft_ownership_stddev_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** aggregate stddev_pop on columns */
    ["nft_ownership_stddev_pop_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** aggregate stddev_samp on columns */
    ["nft_ownership_stddev_samp_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** aggregate sum on columns */
    ["nft_ownership_sum_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** update columns of table "nft_ownership" */
    ["nft_ownership_update_column"]: nft_ownership_update_column;
    /** aggregate var_pop on columns */
    ["nft_ownership_var_pop_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** aggregate var_samp on columns */
    ["nft_ownership_var_samp_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** aggregate variance on columns */
    ["nft_ownership_variance_fields"]: AliasType<{
        block_number?: true;
        __typename?: true;
    }>;
    /** primary key columns input for table: nft */
    ["nft_pk_columns_input"]: {
        id: string;
    };
    /** select columns of table "nft" */
    ["nft_select_column"]: nft_select_column;
    /** input type for updating data in table "nft" */
    ["nft_set_input"]: {
        contract_id?: string | null;
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        mint_time?: ValueTypes["timestamptz"] | null;
        token_id?: string | null;
        token_uri_hash?: ValueTypes["bytea"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "nft" */
    ["nft_update_column"]: nft_update_column;
    /** columns and relationships of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks"]: AliasType<{
        blockchain_block_hash?: true;
        inserted_at?: true;
        nft_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate"]: AliasType<{
        aggregate?: ValueTypes["nfts_by_blockchain_blocks_aggregate_fields"];
        nodes?: ValueTypes["nfts_by_blockchain_blocks"];
        __typename?: true;
    }>;
    /** aggregate fields of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["nfts_by_blockchain_blocks_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["nfts_by_blockchain_blocks_max_fields"];
        min?: ValueTypes["nfts_by_blockchain_blocks_min_fields"];
        __typename?: true;
    }>;
    /** order by aggregate values of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate_order_by"]: {
        count?: ValueTypes["order_by"] | null;
        max?: ValueTypes["nfts_by_blockchain_blocks_max_order_by"] | null;
        min?: ValueTypes["nfts_by_blockchain_blocks_min_order_by"] | null;
    };
    /** input type for inserting array relation for remote table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_arr_rel_insert_input"]: {
        data: ValueTypes["nfts_by_blockchain_blocks_insert_input"][];
        /** on conflict condition */
        on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
    };
    /** Boolean expression to filter rows from the table "nfts_by_blockchain_blocks". All fields are combined with a logical 'AND'. */
    ["nfts_by_blockchain_blocks_bool_exp"]: {
        _and?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"][];
        _not?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
        _or?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"][];
        blockchain_block_hash?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        nft_id?: ValueTypes["String_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_constraint"]: nfts_by_blockchain_blocks_constraint;
    /** input type for inserting data into table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_insert_input"]: {
        blockchain_block_hash?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        nft_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["nfts_by_blockchain_blocks_max_fields"]: AliasType<{
        blockchain_block_hash?: true;
        inserted_at?: true;
        nft_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by max() on columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_max_order_by"]: {
        blockchain_block_hash?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        nft_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** aggregate min on columns */
    ["nfts_by_blockchain_blocks_min_fields"]: AliasType<{
        blockchain_block_hash?: true;
        inserted_at?: true;
        nft_id?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by min() on columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_min_order_by"]: {
        blockchain_block_hash?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        nft_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** response of any mutation on the table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["nfts_by_blockchain_blocks"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_on_conflict"]: {
        constraint: ValueTypes["nfts_by_blockchain_blocks_constraint"];
        update_columns: ValueTypes["nfts_by_blockchain_blocks_update_column"][];
        where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "nfts_by_blockchain_blocks". */
    ["nfts_by_blockchain_blocks_order_by"]: {
        blockchain_block_hash?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        nft_id?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: nfts_by_blockchain_blocks */
    ["nfts_by_blockchain_blocks_pk_columns_input"]: {
        blockchain_block_hash: string;
        nft_id: string;
    };
    /** select columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_select_column"]: nfts_by_blockchain_blocks_select_column;
    /** input type for updating data in table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_set_input"]: {
        blockchain_block_hash?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        nft_id?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_update_column"]: nfts_by_blockchain_blocks_update_column;
    /** Utility table to keep track of migrations


columns and relationships of "niftysave_migration" */
    ["niftysave_migration"]: AliasType<{
        collection?: true;
        cursor?: true;
        id?: true;
        inserted_at?: true;
        metadata?: [
            {
                path?: string | null;
            },
            true
        ];
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "niftysave_migration" */
    ["niftysave_migration_aggregate"]: AliasType<{
        aggregate?: ValueTypes["niftysave_migration_aggregate_fields"];
        nodes?: ValueTypes["niftysave_migration"];
        __typename?: true;
    }>;
    /** aggregate fields of "niftysave_migration" */
    ["niftysave_migration_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["niftysave_migration_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["niftysave_migration_max_fields"];
        min?: ValueTypes["niftysave_migration_min_fields"];
        __typename?: true;
    }>;
    /** append existing jsonb value of filtered columns with new jsonb value */
    ["niftysave_migration_append_input"]: {
        metadata?: ValueTypes["jsonb"] | null;
    };
    /** Boolean expression to filter rows from the table "niftysave_migration". All fields are combined with a logical 'AND'. */
    ["niftysave_migration_bool_exp"]: {
        _and?: ValueTypes["niftysave_migration_bool_exp"][];
        _not?: ValueTypes["niftysave_migration_bool_exp"] | null;
        _or?: ValueTypes["niftysave_migration_bool_exp"][];
        collection?: ValueTypes["String_comparison_exp"] | null;
        cursor?: ValueTypes["String_comparison_exp"] | null;
        id?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        metadata?: ValueTypes["jsonb_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "niftysave_migration" */
    ["niftysave_migration_constraint"]: niftysave_migration_constraint;
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    ["niftysave_migration_delete_at_path_input"]: {
        metadata?: string[];
    };
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    ["niftysave_migration_delete_elem_input"]: {
        metadata?: number | null;
    };
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    ["niftysave_migration_delete_key_input"]: {
        metadata?: string | null;
    };
    /** input type for inserting data into table "niftysave_migration" */
    ["niftysave_migration_insert_input"]: {
        collection?: string | null;
        cursor?: string | null;
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        metadata?: ValueTypes["jsonb"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["niftysave_migration_max_fields"]: AliasType<{
        collection?: true;
        cursor?: true;
        id?: true;
        inserted_at?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["niftysave_migration_min_fields"]: AliasType<{
        collection?: true;
        cursor?: true;
        id?: true;
        inserted_at?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "niftysave_migration" */
    ["niftysave_migration_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["niftysave_migration"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "niftysave_migration" */
    ["niftysave_migration_on_conflict"]: {
        constraint: ValueTypes["niftysave_migration_constraint"];
        update_columns: ValueTypes["niftysave_migration_update_column"][];
        where?: ValueTypes["niftysave_migration_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "niftysave_migration". */
    ["niftysave_migration_order_by"]: {
        collection?: ValueTypes["order_by"] | null;
        cursor?: ValueTypes["order_by"] | null;
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        metadata?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: niftysave_migration */
    ["niftysave_migration_pk_columns_input"]: {
        id: string;
    };
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    ["niftysave_migration_prepend_input"]: {
        metadata?: ValueTypes["jsonb"] | null;
    };
    /** select columns of table "niftysave_migration" */
    ["niftysave_migration_select_column"]: niftysave_migration_select_column;
    /** input type for updating data in table "niftysave_migration" */
    ["niftysave_migration_set_input"]: {
        collection?: string | null;
        cursor?: string | null;
        id?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        metadata?: ValueTypes["jsonb"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "niftysave_migration" */
    ["niftysave_migration_update_column"]: niftysave_migration_update_column;
    /** column ordering options */
    ["order_by"]: order_by;
    /** columns and relationships of "other_nft_resources" */
    ["other_nft_resources"]: AliasType<{
        inserted_at?: true;
        /** An object relationship */
        metadata?: ValueTypes["nft_metadata"];
        metadata_cid?: true;
        /** An object relationship */
        resource?: ValueTypes["resource"];
        resource_uri_hash?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "other_nft_resources" */
    ["other_nft_resources_aggregate"]: AliasType<{
        aggregate?: ValueTypes["other_nft_resources_aggregate_fields"];
        nodes?: ValueTypes["other_nft_resources"];
        __typename?: true;
    }>;
    /** aggregate fields of "other_nft_resources" */
    ["other_nft_resources_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["other_nft_resources_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["other_nft_resources_max_fields"];
        min?: ValueTypes["other_nft_resources_min_fields"];
        __typename?: true;
    }>;
    /** order by aggregate values of table "other_nft_resources" */
    ["other_nft_resources_aggregate_order_by"]: {
        count?: ValueTypes["order_by"] | null;
        max?: ValueTypes["other_nft_resources_max_order_by"] | null;
        min?: ValueTypes["other_nft_resources_min_order_by"] | null;
    };
    /** input type for inserting array relation for remote table "other_nft_resources" */
    ["other_nft_resources_arr_rel_insert_input"]: {
        data: ValueTypes["other_nft_resources_insert_input"][];
        /** on conflict condition */
        on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
    };
    /** Boolean expression to filter rows from the table "other_nft_resources". All fields are combined with a logical 'AND'. */
    ["other_nft_resources_bool_exp"]: {
        _and?: ValueTypes["other_nft_resources_bool_exp"][];
        _not?: ValueTypes["other_nft_resources_bool_exp"] | null;
        _or?: ValueTypes["other_nft_resources_bool_exp"][];
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        metadata?: ValueTypes["nft_metadata_bool_exp"] | null;
        metadata_cid?: ValueTypes["String_comparison_exp"] | null;
        resource?: ValueTypes["resource_bool_exp"] | null;
        resource_uri_hash?: ValueTypes["bytea_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "other_nft_resources" */
    ["other_nft_resources_constraint"]: other_nft_resources_constraint;
    /** input type for inserting data into table "other_nft_resources" */
    ["other_nft_resources_insert_input"]: {
        inserted_at?: ValueTypes["timestamptz"] | null;
        metadata?: ValueTypes["nft_metadata_obj_rel_insert_input"] | null;
        metadata_cid?: string | null;
        resource?: ValueTypes["resource_obj_rel_insert_input"] | null;
        resource_uri_hash?: ValueTypes["bytea"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["other_nft_resources_max_fields"]: AliasType<{
        inserted_at?: true;
        metadata_cid?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by max() on columns of table "other_nft_resources" */
    ["other_nft_resources_max_order_by"]: {
        inserted_at?: ValueTypes["order_by"] | null;
        metadata_cid?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** aggregate min on columns */
    ["other_nft_resources_min_fields"]: AliasType<{
        inserted_at?: true;
        metadata_cid?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by min() on columns of table "other_nft_resources" */
    ["other_nft_resources_min_order_by"]: {
        inserted_at?: ValueTypes["order_by"] | null;
        metadata_cid?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** response of any mutation on the table "other_nft_resources" */
    ["other_nft_resources_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["other_nft_resources"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "other_nft_resources" */
    ["other_nft_resources_on_conflict"]: {
        constraint: ValueTypes["other_nft_resources_constraint"];
        update_columns: ValueTypes["other_nft_resources_update_column"][];
        where?: ValueTypes["other_nft_resources_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "other_nft_resources". */
    ["other_nft_resources_order_by"]: {
        inserted_at?: ValueTypes["order_by"] | null;
        metadata?: ValueTypes["nft_metadata_order_by"] | null;
        metadata_cid?: ValueTypes["order_by"] | null;
        resource?: ValueTypes["resource_order_by"] | null;
        resource_uri_hash?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: other_nft_resources */
    ["other_nft_resources_pk_columns_input"]: {
        metadata_cid: string;
        resource_uri_hash: ValueTypes["bytea"];
    };
    /** select columns of table "other_nft_resources" */
    ["other_nft_resources_select_column"]: other_nft_resources_select_column;
    /** input type for updating data in table "other_nft_resources" */
    ["other_nft_resources_set_input"]: {
        inserted_at?: ValueTypes["timestamptz"] | null;
        metadata_cid?: string | null;
        resource_uri_hash?: ValueTypes["bytea"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** update columns of table "other_nft_resources" */
    ["other_nft_resources_update_column"]: other_nft_resources_update_column;
    ["parse_nft_asset_args"]: {
        dag_size?: ValueTypes["bigint"] | null;
        ipfs_url?: string | null;
        metadata?: ValueTypes["jsonb"] | null;
        metadata_cid?: string | null;
        status?: ValueTypes["nft_asset_status"] | null;
        status_text?: string | null;
        token_uri_hash?: string | null;
    };
    /** columns and relationships of "pin" */
    ["pin"]: AliasType<{
        /** An object relationship */
        content?: ValueTypes["content"];
        content_cid?: true;
        id?: true;
        inserted_at?: true;
        service?: true;
        status?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "pin" */
    ["pin_aggregate"]: AliasType<{
        aggregate?: ValueTypes["pin_aggregate_fields"];
        nodes?: ValueTypes["pin"];
        __typename?: true;
    }>;
    /** aggregate fields of "pin" */
    ["pin_aggregate_fields"]: AliasType<{
        avg?: ValueTypes["pin_avg_fields"];
        count?: [{
            columns?: ValueTypes["pin_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["pin_max_fields"];
        min?: ValueTypes["pin_min_fields"];
        stddev?: ValueTypes["pin_stddev_fields"];
        stddev_pop?: ValueTypes["pin_stddev_pop_fields"];
        stddev_samp?: ValueTypes["pin_stddev_samp_fields"];
        sum?: ValueTypes["pin_sum_fields"];
        var_pop?: ValueTypes["pin_var_pop_fields"];
        var_samp?: ValueTypes["pin_var_samp_fields"];
        variance?: ValueTypes["pin_variance_fields"];
        __typename?: true;
    }>;
    /** order by aggregate values of table "pin" */
    ["pin_aggregate_order_by"]: {
        avg?: ValueTypes["pin_avg_order_by"] | null;
        count?: ValueTypes["order_by"] | null;
        max?: ValueTypes["pin_max_order_by"] | null;
        min?: ValueTypes["pin_min_order_by"] | null;
        stddev?: ValueTypes["pin_stddev_order_by"] | null;
        stddev_pop?: ValueTypes["pin_stddev_pop_order_by"] | null;
        stddev_samp?: ValueTypes["pin_stddev_samp_order_by"] | null;
        sum?: ValueTypes["pin_sum_order_by"] | null;
        var_pop?: ValueTypes["pin_var_pop_order_by"] | null;
        var_samp?: ValueTypes["pin_var_samp_order_by"] | null;
        variance?: ValueTypes["pin_variance_order_by"] | null;
    };
    /** input type for inserting array relation for remote table "pin" */
    ["pin_arr_rel_insert_input"]: {
        data: ValueTypes["pin_insert_input"][];
        /** on conflict condition */
        on_conflict?: ValueTypes["pin_on_conflict"] | null;
    };
    /** aggregate avg on columns */
    ["pin_avg_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by avg() on columns of table "pin" */
    ["pin_avg_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    /** Boolean expression to filter rows from the table "pin". All fields are combined with a logical 'AND'. */
    ["pin_bool_exp"]: {
        _and?: ValueTypes["pin_bool_exp"][];
        _not?: ValueTypes["pin_bool_exp"] | null;
        _or?: ValueTypes["pin_bool_exp"][];
        content?: ValueTypes["content_bool_exp"] | null;
        content_cid?: ValueTypes["String_comparison_exp"] | null;
        id?: ValueTypes["bigint_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        service?: ValueTypes["pin_service_comparison_exp"] | null;
        status?: ValueTypes["pin_status_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "pin" */
    ["pin_constraint"]: pin_constraint;
    /** input type for incrementing numeric columns in table "pin" */
    ["pin_inc_input"]: {
        id?: ValueTypes["bigint"] | null;
    };
    /** input type for inserting data into table "pin" */
    ["pin_insert_input"]: {
        content?: ValueTypes["content_obj_rel_insert_input"] | null;
        content_cid?: string | null;
        id?: ValueTypes["bigint"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        service?: ValueTypes["pin_service"] | null;
        status?: ValueTypes["pin_status"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    /** aggregate max on columns */
    ["pin_max_fields"]: AliasType<{
        content_cid?: true;
        id?: true;
        inserted_at?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by max() on columns of table "pin" */
    ["pin_max_order_by"]: {
        content_cid?: ValueTypes["order_by"] | null;
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** aggregate min on columns */
    ["pin_min_fields"]: AliasType<{
        content_cid?: true;
        id?: true;
        inserted_at?: true;
        updated_at?: true;
        __typename?: true;
    }>;
    /** order by min() on columns of table "pin" */
    ["pin_min_order_by"]: {
        content_cid?: ValueTypes["order_by"] | null;
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** response of any mutation on the table "pin" */
    ["pin_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["pin"];
        __typename?: true;
    }>;
    /** on conflict condition type for table "pin" */
    ["pin_on_conflict"]: {
        constraint: ValueTypes["pin_constraint"];
        update_columns: ValueTypes["pin_update_column"][];
        where?: ValueTypes["pin_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "pin". */
    ["pin_order_by"]: {
        content?: ValueTypes["content_order_by"] | null;
        content_cid?: ValueTypes["order_by"] | null;
        id?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        service?: ValueTypes["order_by"] | null;
        status?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: pin */
    ["pin_pk_columns_input"]: {
        id: ValueTypes["bigint"];
    };
    /** select columns of table "pin" */
    ["pin_select_column"]: pin_select_column;
    ["pin_service"]: unknown;
    /** Boolean expression to compare columns of type "pin_service". All fields are combined with logical 'AND'. */
    ["pin_service_comparison_exp"]: {
        _eq?: ValueTypes["pin_service"] | null;
        _gt?: ValueTypes["pin_service"] | null;
        _gte?: ValueTypes["pin_service"] | null;
        _in?: ValueTypes["pin_service"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["pin_service"] | null;
        _lte?: ValueTypes["pin_service"] | null;
        _neq?: ValueTypes["pin_service"] | null;
        _nin?: ValueTypes["pin_service"][];
    };
    /** input type for updating data in table "pin" */
    ["pin_set_input"]: {
        content_cid?: string | null;
        id?: ValueTypes["bigint"] | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        service?: ValueTypes["pin_service"] | null;
        status?: ValueTypes["pin_status"] | null;
        updated_at?: ValueTypes["timestamptz"] | null;
    };
    ["pin_status"]: unknown;
    /** Boolean expression to compare columns of type "pin_status". All fields are combined with logical 'AND'. */
    ["pin_status_comparison_exp"]: {
        _eq?: ValueTypes["pin_status"] | null;
        _gt?: ValueTypes["pin_status"] | null;
        _gte?: ValueTypes["pin_status"] | null;
        _in?: ValueTypes["pin_status"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["pin_status"] | null;
        _lte?: ValueTypes["pin_status"] | null;
        _neq?: ValueTypes["pin_status"] | null;
        _nin?: ValueTypes["pin_status"][];
    };
    /** aggregate stddev on columns */
    ["pin_stddev_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by stddev() on columns of table "pin" */
    ["pin_stddev_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    /** aggregate stddev_pop on columns */
    ["pin_stddev_pop_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by stddev_pop() on columns of table "pin" */
    ["pin_stddev_pop_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    /** aggregate stddev_samp on columns */
    ["pin_stddev_samp_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by stddev_samp() on columns of table "pin" */
    ["pin_stddev_samp_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    /** aggregate sum on columns */
    ["pin_sum_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by sum() on columns of table "pin" */
    ["pin_sum_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    /** update columns of table "pin" */
    ["pin_update_column"]: pin_update_column;
    /** aggregate var_pop on columns */
    ["pin_var_pop_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by var_pop() on columns of table "pin" */
    ["pin_var_pop_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    /** aggregate var_samp on columns */
    ["pin_var_samp_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by var_samp() on columns of table "pin" */
    ["pin_var_samp_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    /** aggregate variance on columns */
    ["pin_variance_fields"]: AliasType<{
        id?: true;
        __typename?: true;
    }>;
    /** order by variance() on columns of table "pin" */
    ["pin_variance_order_by"]: {
        id?: ValueTypes["order_by"] | null;
    };
    ["query_root"]: AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>;
    ["queue_resource_args"]: {
        content_cid?: string | null;
        ipfs_url?: string | null;
        uri?: string | null;
    };
    /** columns and relationships of "resource" */
    ["resource"]: AliasType<{
        /** An object relationship */
        content?: ValueTypes["content"];
        content_cid?: true;
        inserted_at?: true;
        ipfs_url?: true;
        referrer_metadata?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        referrer_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        status?: true;
        status_text?: true;
        updated_at?: true;
        uri?: true;
        uri_hash?: true;
        __typename?: true;
    }>;
    /** aggregated selection of "resource" */
    ["resource_aggregate"]: AliasType<{
        aggregate?: ValueTypes["resource_aggregate_fields"];
        nodes?: ValueTypes["resource"];
        __typename?: true;
    }>;
    /** aggregate fields of "resource" */
    ["resource_aggregate_fields"]: AliasType<{
        count?: [{
            columns?: ValueTypes["resource_select_column"][];
            distinct?: boolean | null;
        }, true];
        max?: ValueTypes["resource_max_fields"];
        min?: ValueTypes["resource_min_fields"];
        __typename?: true;
    }>;
    /** Boolean expression to filter rows from the table "resource". All fields are combined with a logical 'AND'. */
    ["resource_bool_exp"]: {
        _and?: ValueTypes["resource_bool_exp"][];
        _not?: ValueTypes["resource_bool_exp"] | null;
        _or?: ValueTypes["resource_bool_exp"][];
        content?: ValueTypes["content_bool_exp"] | null;
        content_cid?: ValueTypes["String_comparison_exp"] | null;
        inserted_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        ipfs_url?: ValueTypes["String_comparison_exp"] | null;
        referrer_metadata?: ValueTypes["other_nft_resources_bool_exp"] | null;
        status?: ValueTypes["resource_status_comparison_exp"] | null;
        status_text?: ValueTypes["String_comparison_exp"] | null;
        updated_at?: ValueTypes["timestamptz_comparison_exp"] | null;
        uri?: ValueTypes["String_comparison_exp"] | null;
        uri_hash?: ValueTypes["bytea_comparison_exp"] | null;
    };
    /** unique or primary key constraints on table "resource" */
    ["resource_constraint"]: resource_constraint;
    /** input type for inserting data into table "resource" */
    ["resource_insert_input"]: {
        content?: ValueTypes["content_obj_rel_insert_input"] | null;
        content_cid?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        ipfs_url?: string | null;
        referrer_metadata?: ValueTypes["other_nft_resources_arr_rel_insert_input"] | null;
        status?: ValueTypes["resource_status"] | null;
        status_text?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
        uri?: string | null;
        uri_hash?: ValueTypes["bytea"] | null;
    };
    /** aggregate max on columns */
    ["resource_max_fields"]: AliasType<{
        content_cid?: true;
        inserted_at?: true;
        ipfs_url?: true;
        status_text?: true;
        updated_at?: true;
        uri?: true;
        __typename?: true;
    }>;
    /** aggregate min on columns */
    ["resource_min_fields"]: AliasType<{
        content_cid?: true;
        inserted_at?: true;
        ipfs_url?: true;
        status_text?: true;
        updated_at?: true;
        uri?: true;
        __typename?: true;
    }>;
    /** response of any mutation on the table "resource" */
    ["resource_mutation_response"]: AliasType<{
        /** number of rows affected by the mutation */
        affected_rows?: true;
        /** data from the rows affected by the mutation */
        returning?: ValueTypes["resource"];
        __typename?: true;
    }>;
    /** input type for inserting object relation for remote table "resource" */
    ["resource_obj_rel_insert_input"]: {
        data: ValueTypes["resource_insert_input"];
        /** on conflict condition */
        on_conflict?: ValueTypes["resource_on_conflict"] | null;
    };
    /** on conflict condition type for table "resource" */
    ["resource_on_conflict"]: {
        constraint: ValueTypes["resource_constraint"];
        update_columns: ValueTypes["resource_update_column"][];
        where?: ValueTypes["resource_bool_exp"] | null;
    };
    /** Ordering options when selecting data from "resource". */
    ["resource_order_by"]: {
        content?: ValueTypes["content_order_by"] | null;
        content_cid?: ValueTypes["order_by"] | null;
        inserted_at?: ValueTypes["order_by"] | null;
        ipfs_url?: ValueTypes["order_by"] | null;
        referrer_metadata_aggregate?: ValueTypes["other_nft_resources_aggregate_order_by"] | null;
        status?: ValueTypes["order_by"] | null;
        status_text?: ValueTypes["order_by"] | null;
        updated_at?: ValueTypes["order_by"] | null;
        uri?: ValueTypes["order_by"] | null;
        uri_hash?: ValueTypes["order_by"] | null;
    };
    /** primary key columns input for table: resource */
    ["resource_pk_columns_input"]: {
        uri_hash: ValueTypes["bytea"];
    };
    /** select columns of table "resource" */
    ["resource_select_column"]: resource_select_column;
    /** input type for updating data in table "resource" */
    ["resource_set_input"]: {
        content_cid?: string | null;
        inserted_at?: ValueTypes["timestamptz"] | null;
        ipfs_url?: string | null;
        status?: ValueTypes["resource_status"] | null;
        status_text?: string | null;
        updated_at?: ValueTypes["timestamptz"] | null;
        uri?: string | null;
        uri_hash?: ValueTypes["bytea"] | null;
    };
    ["resource_status"]: unknown;
    /** Boolean expression to compare columns of type "resource_status". All fields are combined with logical 'AND'. */
    ["resource_status_comparison_exp"]: {
        _eq?: ValueTypes["resource_status"] | null;
        _gt?: ValueTypes["resource_status"] | null;
        _gte?: ValueTypes["resource_status"] | null;
        _in?: ValueTypes["resource_status"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["resource_status"] | null;
        _lte?: ValueTypes["resource_status"] | null;
        _neq?: ValueTypes["resource_status"] | null;
        _nin?: ValueTypes["resource_status"][];
    };
    /** update columns of table "resource" */
    ["resource_update_column"]: resource_update_column;
    ["subscription_root"]: AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>;
    ["timestamptz"]: unknown;
    /** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
    ["timestamptz_comparison_exp"]: {
        _eq?: ValueTypes["timestamptz"] | null;
        _gt?: ValueTypes["timestamptz"] | null;
        _gte?: ValueTypes["timestamptz"] | null;
        _in?: ValueTypes["timestamptz"][];
        _is_null?: boolean | null;
        _lt?: ValueTypes["timestamptz"] | null;
        _lte?: ValueTypes["timestamptz"] | null;
        _neq?: ValueTypes["timestamptz"] | null;
        _nin?: ValueTypes["timestamptz"][];
    };
};
export declare type ModelTypes = {
    /** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
    ["Boolean_comparison_exp"]: GraphQLTypes["Boolean_comparison_exp"];
    /** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
    ["String_comparison_exp"]: GraphQLTypes["String_comparison_exp"];
    ["bigint"]: any;
    /** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
    ["bigint_comparison_exp"]: GraphQLTypes["bigint_comparison_exp"];
    /** columns and relationships of "blockchain_block" */
    ["blockchain_block"]: {
        hash: string;
        inserted_at: ModelTypes["timestamptz"];
        /** An array relationship */
        nfts: ModelTypes["nfts_by_blockchain_blocks"][];
        /** An aggregate relationship */
        nfts_aggregate: ModelTypes["nfts_by_blockchain_blocks_aggregate"];
        number: ModelTypes["bigint"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "blockchain_block" */
    ["blockchain_block_aggregate"]: {
        aggregate?: ModelTypes["blockchain_block_aggregate_fields"];
        nodes: ModelTypes["blockchain_block"][];
    };
    /** aggregate fields of "blockchain_block" */
    ["blockchain_block_aggregate_fields"]: {
        avg?: ModelTypes["blockchain_block_avg_fields"];
        count: number;
        max?: ModelTypes["blockchain_block_max_fields"];
        min?: ModelTypes["blockchain_block_min_fields"];
        stddev?: ModelTypes["blockchain_block_stddev_fields"];
        stddev_pop?: ModelTypes["blockchain_block_stddev_pop_fields"];
        stddev_samp?: ModelTypes["blockchain_block_stddev_samp_fields"];
        sum?: ModelTypes["blockchain_block_sum_fields"];
        var_pop?: ModelTypes["blockchain_block_var_pop_fields"];
        var_samp?: ModelTypes["blockchain_block_var_samp_fields"];
        variance?: ModelTypes["blockchain_block_variance_fields"];
    };
    /** aggregate avg on columns */
    ["blockchain_block_avg_fields"]: {
        number?: number;
    };
    /** Boolean expression to filter rows from the table "blockchain_block". All fields are combined with a logical 'AND'. */
    ["blockchain_block_bool_exp"]: GraphQLTypes["blockchain_block_bool_exp"];
    /** unique or primary key constraints on table "blockchain_block" */
    ["blockchain_block_constraint"]: GraphQLTypes["blockchain_block_constraint"];
    /** input type for incrementing numeric columns in table "blockchain_block" */
    ["blockchain_block_inc_input"]: GraphQLTypes["blockchain_block_inc_input"];
    /** input type for inserting data into table "blockchain_block" */
    ["blockchain_block_insert_input"]: GraphQLTypes["blockchain_block_insert_input"];
    /** aggregate max on columns */
    ["blockchain_block_max_fields"]: {
        hash?: string;
        inserted_at?: ModelTypes["timestamptz"];
        number?: ModelTypes["bigint"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["blockchain_block_min_fields"]: {
        hash?: string;
        inserted_at?: ModelTypes["timestamptz"];
        number?: ModelTypes["bigint"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "blockchain_block" */
    ["blockchain_block_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["blockchain_block"][];
    };
    /** on conflict condition type for table "blockchain_block" */
    ["blockchain_block_on_conflict"]: GraphQLTypes["blockchain_block_on_conflict"];
    /** Ordering options when selecting data from "blockchain_block". */
    ["blockchain_block_order_by"]: GraphQLTypes["blockchain_block_order_by"];
    /** primary key columns input for table: blockchain_block */
    ["blockchain_block_pk_columns_input"]: GraphQLTypes["blockchain_block_pk_columns_input"];
    /** select columns of table "blockchain_block" */
    ["blockchain_block_select_column"]: GraphQLTypes["blockchain_block_select_column"];
    /** input type for updating data in table "blockchain_block" */
    ["blockchain_block_set_input"]: GraphQLTypes["blockchain_block_set_input"];
    /** aggregate stddev on columns */
    ["blockchain_block_stddev_fields"]: {
        number?: number;
    };
    /** aggregate stddev_pop on columns */
    ["blockchain_block_stddev_pop_fields"]: {
        number?: number;
    };
    /** aggregate stddev_samp on columns */
    ["blockchain_block_stddev_samp_fields"]: {
        number?: number;
    };
    /** aggregate sum on columns */
    ["blockchain_block_sum_fields"]: {
        number?: ModelTypes["bigint"];
    };
    /** update columns of table "blockchain_block" */
    ["blockchain_block_update_column"]: GraphQLTypes["blockchain_block_update_column"];
    /** aggregate var_pop on columns */
    ["blockchain_block_var_pop_fields"]: {
        number?: number;
    };
    /** aggregate var_samp on columns */
    ["blockchain_block_var_samp_fields"]: {
        number?: number;
    };
    /** aggregate variance on columns */
    ["blockchain_block_variance_fields"]: {
        number?: number;
    };
    /** columns and relationships of "blockchain_contract" */
    ["blockchain_contract"]: {
        id: string;
        inserted_at: ModelTypes["timestamptz"];
        name?: string;
        supports_eip721_metadata: boolean;
        symbol?: string;
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "blockchain_contract" */
    ["blockchain_contract_aggregate"]: {
        aggregate?: ModelTypes["blockchain_contract_aggregate_fields"];
        nodes: ModelTypes["blockchain_contract"][];
    };
    /** aggregate fields of "blockchain_contract" */
    ["blockchain_contract_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["blockchain_contract_max_fields"];
        min?: ModelTypes["blockchain_contract_min_fields"];
    };
    /** Boolean expression to filter rows from the table "blockchain_contract". All fields are combined with a logical 'AND'. */
    ["blockchain_contract_bool_exp"]: GraphQLTypes["blockchain_contract_bool_exp"];
    /** unique or primary key constraints on table "blockchain_contract" */
    ["blockchain_contract_constraint"]: GraphQLTypes["blockchain_contract_constraint"];
    /** input type for inserting data into table "blockchain_contract" */
    ["blockchain_contract_insert_input"]: GraphQLTypes["blockchain_contract_insert_input"];
    /** aggregate max on columns */
    ["blockchain_contract_max_fields"]: {
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        name?: string;
        symbol?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["blockchain_contract_min_fields"]: {
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        name?: string;
        symbol?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "blockchain_contract" */
    ["blockchain_contract_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["blockchain_contract"][];
    };
    /** input type for inserting object relation for remote table "blockchain_contract" */
    ["blockchain_contract_obj_rel_insert_input"]: GraphQLTypes["blockchain_contract_obj_rel_insert_input"];
    /** on conflict condition type for table "blockchain_contract" */
    ["blockchain_contract_on_conflict"]: GraphQLTypes["blockchain_contract_on_conflict"];
    /** Ordering options when selecting data from "blockchain_contract". */
    ["blockchain_contract_order_by"]: GraphQLTypes["blockchain_contract_order_by"];
    /** primary key columns input for table: blockchain_contract */
    ["blockchain_contract_pk_columns_input"]: GraphQLTypes["blockchain_contract_pk_columns_input"];
    /** select columns of table "blockchain_contract" */
    ["blockchain_contract_select_column"]: GraphQLTypes["blockchain_contract_select_column"];
    /** input type for updating data in table "blockchain_contract" */
    ["blockchain_contract_set_input"]: GraphQLTypes["blockchain_contract_set_input"];
    /** update columns of table "blockchain_contract" */
    ["blockchain_contract_update_column"]: GraphQLTypes["blockchain_contract_update_column"];
    ["bytea"]: any;
    /** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
    ["bytea_comparison_exp"]: GraphQLTypes["bytea_comparison_exp"];
    /** columns and relationships of "content" */
    ["content"]: {
        cid: string;
        dag_size?: ModelTypes["bigint"];
        inserted_at: ModelTypes["timestamptz"];
        /** An array relationship */
        pins: ModelTypes["pin"][];
        /** An aggregate relationship */
        pins_aggregate: ModelTypes["pin_aggregate"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "content" */
    ["content_aggregate"]: {
        aggregate?: ModelTypes["content_aggregate_fields"];
        nodes: ModelTypes["content"][];
    };
    /** aggregate fields of "content" */
    ["content_aggregate_fields"]: {
        avg?: ModelTypes["content_avg_fields"];
        count: number;
        max?: ModelTypes["content_max_fields"];
        min?: ModelTypes["content_min_fields"];
        stddev?: ModelTypes["content_stddev_fields"];
        stddev_pop?: ModelTypes["content_stddev_pop_fields"];
        stddev_samp?: ModelTypes["content_stddev_samp_fields"];
        sum?: ModelTypes["content_sum_fields"];
        var_pop?: ModelTypes["content_var_pop_fields"];
        var_samp?: ModelTypes["content_var_samp_fields"];
        variance?: ModelTypes["content_variance_fields"];
    };
    /** aggregate avg on columns */
    ["content_avg_fields"]: {
        dag_size?: number;
    };
    /** Boolean expression to filter rows from the table "content". All fields are combined with a logical 'AND'. */
    ["content_bool_exp"]: GraphQLTypes["content_bool_exp"];
    /** unique or primary key constraints on table "content" */
    ["content_constraint"]: GraphQLTypes["content_constraint"];
    /** input type for incrementing numeric columns in table "content" */
    ["content_inc_input"]: GraphQLTypes["content_inc_input"];
    /** input type for inserting data into table "content" */
    ["content_insert_input"]: GraphQLTypes["content_insert_input"];
    /** aggregate max on columns */
    ["content_max_fields"]: {
        cid?: string;
        dag_size?: ModelTypes["bigint"];
        inserted_at?: ModelTypes["timestamptz"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["content_min_fields"]: {
        cid?: string;
        dag_size?: ModelTypes["bigint"];
        inserted_at?: ModelTypes["timestamptz"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "content" */
    ["content_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["content"][];
    };
    /** input type for inserting object relation for remote table "content" */
    ["content_obj_rel_insert_input"]: GraphQLTypes["content_obj_rel_insert_input"];
    /** on conflict condition type for table "content" */
    ["content_on_conflict"]: GraphQLTypes["content_on_conflict"];
    /** Ordering options when selecting data from "content". */
    ["content_order_by"]: GraphQLTypes["content_order_by"];
    /** primary key columns input for table: content */
    ["content_pk_columns_input"]: GraphQLTypes["content_pk_columns_input"];
    /** select columns of table "content" */
    ["content_select_column"]: GraphQLTypes["content_select_column"];
    /** input type for updating data in table "content" */
    ["content_set_input"]: GraphQLTypes["content_set_input"];
    /** aggregate stddev on columns */
    ["content_stddev_fields"]: {
        dag_size?: number;
    };
    /** aggregate stddev_pop on columns */
    ["content_stddev_pop_fields"]: {
        dag_size?: number;
    };
    /** aggregate stddev_samp on columns */
    ["content_stddev_samp_fields"]: {
        dag_size?: number;
    };
    /** aggregate sum on columns */
    ["content_sum_fields"]: {
        dag_size?: ModelTypes["bigint"];
    };
    /** update columns of table "content" */
    ["content_update_column"]: GraphQLTypes["content_update_column"];
    /** aggregate var_pop on columns */
    ["content_var_pop_fields"]: {
        dag_size?: number;
    };
    /** aggregate var_samp on columns */
    ["content_var_samp_fields"]: {
        dag_size?: number;
    };
    /** aggregate variance on columns */
    ["content_variance_fields"]: {
        dag_size?: number;
    };
    /** columns and relationships of "erc721_import" */
    ["erc721_import"]: {
        id: string;
        inserted_at: ModelTypes["timestamptz"];
        next_id: string;
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "erc721_import" */
    ["erc721_import_aggregate"]: {
        aggregate?: ModelTypes["erc721_import_aggregate_fields"];
        nodes: ModelTypes["erc721_import"][];
    };
    /** aggregate fields of "erc721_import" */
    ["erc721_import_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["erc721_import_max_fields"];
        min?: ModelTypes["erc721_import_min_fields"];
    };
    /** Boolean expression to filter rows from the table "erc721_import". All fields are combined with a logical 'AND'. */
    ["erc721_import_bool_exp"]: GraphQLTypes["erc721_import_bool_exp"];
    /** columns and relationships of "erc721_import_by_nft" */
    ["erc721_import_by_nft"]: {
        erc721_import_id: string;
        inserted_at: ModelTypes["timestamptz"];
        nft_id: string;
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "erc721_import_by_nft" */
    ["erc721_import_by_nft_aggregate"]: {
        aggregate?: ModelTypes["erc721_import_by_nft_aggregate_fields"];
        nodes: ModelTypes["erc721_import_by_nft"][];
    };
    /** aggregate fields of "erc721_import_by_nft" */
    ["erc721_import_by_nft_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["erc721_import_by_nft_max_fields"];
        min?: ModelTypes["erc721_import_by_nft_min_fields"];
    };
    /** Boolean expression to filter rows from the table "erc721_import_by_nft". All fields are combined with a logical 'AND'. */
    ["erc721_import_by_nft_bool_exp"]: GraphQLTypes["erc721_import_by_nft_bool_exp"];
    /** unique or primary key constraints on table "erc721_import_by_nft" */
    ["erc721_import_by_nft_constraint"]: GraphQLTypes["erc721_import_by_nft_constraint"];
    /** input type for inserting data into table "erc721_import_by_nft" */
    ["erc721_import_by_nft_insert_input"]: GraphQLTypes["erc721_import_by_nft_insert_input"];
    /** aggregate max on columns */
    ["erc721_import_by_nft_max_fields"]: {
        erc721_import_id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        nft_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["erc721_import_by_nft_min_fields"]: {
        erc721_import_id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        nft_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "erc721_import_by_nft" */
    ["erc721_import_by_nft_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["erc721_import_by_nft"][];
    };
    /** on conflict condition type for table "erc721_import_by_nft" */
    ["erc721_import_by_nft_on_conflict"]: GraphQLTypes["erc721_import_by_nft_on_conflict"];
    /** Ordering options when selecting data from "erc721_import_by_nft". */
    ["erc721_import_by_nft_order_by"]: GraphQLTypes["erc721_import_by_nft_order_by"];
    /** primary key columns input for table: erc721_import_by_nft */
    ["erc721_import_by_nft_pk_columns_input"]: GraphQLTypes["erc721_import_by_nft_pk_columns_input"];
    /** select columns of table "erc721_import_by_nft" */
    ["erc721_import_by_nft_select_column"]: GraphQLTypes["erc721_import_by_nft_select_column"];
    /** input type for updating data in table "erc721_import_by_nft" */
    ["erc721_import_by_nft_set_input"]: GraphQLTypes["erc721_import_by_nft_set_input"];
    /** update columns of table "erc721_import_by_nft" */
    ["erc721_import_by_nft_update_column"]: GraphQLTypes["erc721_import_by_nft_update_column"];
    /** unique or primary key constraints on table "erc721_import" */
    ["erc721_import_constraint"]: GraphQLTypes["erc721_import_constraint"];
    /** input type for inserting data into table "erc721_import" */
    ["erc721_import_insert_input"]: GraphQLTypes["erc721_import_insert_input"];
    /** aggregate max on columns */
    ["erc721_import_max_fields"]: {
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        next_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["erc721_import_min_fields"]: {
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        next_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "erc721_import" */
    ["erc721_import_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["erc721_import"][];
    };
    /** on conflict condition type for table "erc721_import" */
    ["erc721_import_on_conflict"]: GraphQLTypes["erc721_import_on_conflict"];
    /** Ordering options when selecting data from "erc721_import". */
    ["erc721_import_order_by"]: GraphQLTypes["erc721_import_order_by"];
    /** primary key columns input for table: erc721_import */
    ["erc721_import_pk_columns_input"]: GraphQLTypes["erc721_import_pk_columns_input"];
    /** select columns of table "erc721_import" */
    ["erc721_import_select_column"]: GraphQLTypes["erc721_import_select_column"];
    /** input type for updating data in table "erc721_import" */
    ["erc721_import_set_input"]: GraphQLTypes["erc721_import_set_input"];
    /** update columns of table "erc721_import" */
    ["erc721_import_update_column"]: GraphQLTypes["erc721_import_update_column"];
    ["fail_nft_asset_args"]: GraphQLTypes["fail_nft_asset_args"];
    ["fail_resource_args"]: GraphQLTypes["fail_resource_args"];
    ["ingest_erc721_token_args"]: GraphQLTypes["ingest_erc721_token_args"];
    ["jsonb"]: any;
    /** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
    ["jsonb_comparison_exp"]: GraphQLTypes["jsonb_comparison_exp"];
    ["link_nft_resource_args"]: GraphQLTypes["link_nft_resource_args"];
    ["link_resource_content_args"]: GraphQLTypes["link_resource_content_args"];
    /** mutation root */
    ["mutation_root"]: {
        /** delete data from the table: "blockchain_block" */
        delete_blockchain_block?: ModelTypes["blockchain_block_mutation_response"];
        /** delete single row from the table: "blockchain_block" */
        delete_blockchain_block_by_pk?: ModelTypes["blockchain_block"];
        /** delete data from the table: "blockchain_contract" */
        delete_blockchain_contract?: ModelTypes["blockchain_contract_mutation_response"];
        /** delete single row from the table: "blockchain_contract" */
        delete_blockchain_contract_by_pk?: ModelTypes["blockchain_contract"];
        /** delete data from the table: "content" */
        delete_content?: ModelTypes["content_mutation_response"];
        /** delete single row from the table: "content" */
        delete_content_by_pk?: ModelTypes["content"];
        /** delete data from the table: "erc721_import" */
        delete_erc721_import?: ModelTypes["erc721_import_mutation_response"];
        /** delete data from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft?: ModelTypes["erc721_import_by_nft_mutation_response"];
        /** delete single row from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft_by_pk?: ModelTypes["erc721_import_by_nft"];
        /** delete single row from the table: "erc721_import" */
        delete_erc721_import_by_pk?: ModelTypes["erc721_import"];
        /** delete data from the table: "nft" */
        delete_nft?: ModelTypes["nft_mutation_response"];
        /** delete data from the table: "nft_asset" */
        delete_nft_asset?: ModelTypes["nft_asset_mutation_response"];
        /** delete single row from the table: "nft_asset" */
        delete_nft_asset_by_pk?: ModelTypes["nft_asset"];
        /** delete single row from the table: "nft" */
        delete_nft_by_pk?: ModelTypes["nft"];
        /** delete data from the table: "nft_metadata" */
        delete_nft_metadata?: ModelTypes["nft_metadata_mutation_response"];
        /** delete single row from the table: "nft_metadata" */
        delete_nft_metadata_by_pk?: ModelTypes["nft_metadata"];
        /** delete data from the table: "nft_ownership" */
        delete_nft_ownership?: ModelTypes["nft_ownership_mutation_response"];
        /** delete single row from the table: "nft_ownership" */
        delete_nft_ownership_by_pk?: ModelTypes["nft_ownership"];
        /** delete data from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks?: ModelTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** delete single row from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks_by_pk?: ModelTypes["nfts_by_blockchain_blocks"];
        /** delete data from the table: "niftysave_migration" */
        delete_niftysave_migration?: ModelTypes["niftysave_migration_mutation_response"];
        /** delete single row from the table: "niftysave_migration" */
        delete_niftysave_migration_by_pk?: ModelTypes["niftysave_migration"];
        /** delete data from the table: "other_nft_resources" */
        delete_other_nft_resources?: ModelTypes["other_nft_resources_mutation_response"];
        /** delete single row from the table: "other_nft_resources" */
        delete_other_nft_resources_by_pk?: ModelTypes["other_nft_resources"];
        /** delete data from the table: "pin" */
        delete_pin?: ModelTypes["pin_mutation_response"];
        /** delete single row from the table: "pin" */
        delete_pin_by_pk?: ModelTypes["pin"];
        /** delete data from the table: "resource" */
        delete_resource?: ModelTypes["resource_mutation_response"];
        /** delete single row from the table: "resource" */
        delete_resource_by_pk?: ModelTypes["resource"];
        /** execute VOLATILE function "fail_nft_asset" which returns "nft_asset" */
        fail_nft_asset: ModelTypes["nft_asset"][];
        /** execute VOLATILE function "fail_resource" which returns "resource" */
        fail_resource: ModelTypes["resource"][];
        /** execute VOLATILE function "ingest_erc721_token" which returns "nft" */
        ingest_erc721_token: ModelTypes["nft"][];
        /** insert data into the table: "blockchain_block" */
        insert_blockchain_block?: ModelTypes["blockchain_block_mutation_response"];
        /** insert a single row into the table: "blockchain_block" */
        insert_blockchain_block_one?: ModelTypes["blockchain_block"];
        /** insert data into the table: "blockchain_contract" */
        insert_blockchain_contract?: ModelTypes["blockchain_contract_mutation_response"];
        /** insert a single row into the table: "blockchain_contract" */
        insert_blockchain_contract_one?: ModelTypes["blockchain_contract"];
        /** insert data into the table: "content" */
        insert_content?: ModelTypes["content_mutation_response"];
        /** insert a single row into the table: "content" */
        insert_content_one?: ModelTypes["content"];
        /** insert data into the table: "erc721_import" */
        insert_erc721_import?: ModelTypes["erc721_import_mutation_response"];
        /** insert data into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft?: ModelTypes["erc721_import_by_nft_mutation_response"];
        /** insert a single row into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft_one?: ModelTypes["erc721_import_by_nft"];
        /** insert a single row into the table: "erc721_import" */
        insert_erc721_import_one?: ModelTypes["erc721_import"];
        /** insert data into the table: "nft" */
        insert_nft?: ModelTypes["nft_mutation_response"];
        /** insert data into the table: "nft_asset" */
        insert_nft_asset?: ModelTypes["nft_asset_mutation_response"];
        /** insert a single row into the table: "nft_asset" */
        insert_nft_asset_one?: ModelTypes["nft_asset"];
        /** insert data into the table: "nft_metadata" */
        insert_nft_metadata?: ModelTypes["nft_metadata_mutation_response"];
        /** insert a single row into the table: "nft_metadata" */
        insert_nft_metadata_one?: ModelTypes["nft_metadata"];
        /** insert a single row into the table: "nft" */
        insert_nft_one?: ModelTypes["nft"];
        /** insert data into the table: "nft_ownership" */
        insert_nft_ownership?: ModelTypes["nft_ownership_mutation_response"];
        /** insert a single row into the table: "nft_ownership" */
        insert_nft_ownership_one?: ModelTypes["nft_ownership"];
        /** insert data into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks?: ModelTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** insert a single row into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks_one?: ModelTypes["nfts_by_blockchain_blocks"];
        /** insert data into the table: "niftysave_migration" */
        insert_niftysave_migration?: ModelTypes["niftysave_migration_mutation_response"];
        /** insert a single row into the table: "niftysave_migration" */
        insert_niftysave_migration_one?: ModelTypes["niftysave_migration"];
        /** insert data into the table: "other_nft_resources" */
        insert_other_nft_resources?: ModelTypes["other_nft_resources_mutation_response"];
        /** insert a single row into the table: "other_nft_resources" */
        insert_other_nft_resources_one?: ModelTypes["other_nft_resources"];
        /** insert data into the table: "pin" */
        insert_pin?: ModelTypes["pin_mutation_response"];
        /** insert a single row into the table: "pin" */
        insert_pin_one?: ModelTypes["pin"];
        /** insert data into the table: "resource" */
        insert_resource?: ModelTypes["resource_mutation_response"];
        /** insert a single row into the table: "resource" */
        insert_resource_one?: ModelTypes["resource"];
        /** execute VOLATILE function "link_nft_resource" which returns "resource" */
        link_nft_resource: ModelTypes["resource"][];
        /** execute VOLATILE function "link_resource_content" which returns "resource" */
        link_resource_content: ModelTypes["resource"][];
        /** execute VOLATILE function "parse_nft_asset" which returns "nft_asset" */
        parse_nft_asset: ModelTypes["nft_asset"][];
        /** execute VOLATILE function "queue_resource" which returns "resource" */
        queue_resource: ModelTypes["resource"][];
        /** update data of the table: "blockchain_block" */
        update_blockchain_block?: ModelTypes["blockchain_block_mutation_response"];
        /** update single row of the table: "blockchain_block" */
        update_blockchain_block_by_pk?: ModelTypes["blockchain_block"];
        /** update data of the table: "blockchain_contract" */
        update_blockchain_contract?: ModelTypes["blockchain_contract_mutation_response"];
        /** update single row of the table: "blockchain_contract" */
        update_blockchain_contract_by_pk?: ModelTypes["blockchain_contract"];
        /** update data of the table: "content" */
        update_content?: ModelTypes["content_mutation_response"];
        /** update single row of the table: "content" */
        update_content_by_pk?: ModelTypes["content"];
        /** update data of the table: "erc721_import" */
        update_erc721_import?: ModelTypes["erc721_import_mutation_response"];
        /** update data of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft?: ModelTypes["erc721_import_by_nft_mutation_response"];
        /** update single row of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft_by_pk?: ModelTypes["erc721_import_by_nft"];
        /** update single row of the table: "erc721_import" */
        update_erc721_import_by_pk?: ModelTypes["erc721_import"];
        /** update data of the table: "nft" */
        update_nft?: ModelTypes["nft_mutation_response"];
        /** update data of the table: "nft_asset" */
        update_nft_asset?: ModelTypes["nft_asset_mutation_response"];
        /** update single row of the table: "nft_asset" */
        update_nft_asset_by_pk?: ModelTypes["nft_asset"];
        /** update single row of the table: "nft" */
        update_nft_by_pk?: ModelTypes["nft"];
        /** update data of the table: "nft_metadata" */
        update_nft_metadata?: ModelTypes["nft_metadata_mutation_response"];
        /** update single row of the table: "nft_metadata" */
        update_nft_metadata_by_pk?: ModelTypes["nft_metadata"];
        /** update data of the table: "nft_ownership" */
        update_nft_ownership?: ModelTypes["nft_ownership_mutation_response"];
        /** update single row of the table: "nft_ownership" */
        update_nft_ownership_by_pk?: ModelTypes["nft_ownership"];
        /** update data of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks?: ModelTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** update single row of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks_by_pk?: ModelTypes["nfts_by_blockchain_blocks"];
        /** update data of the table: "niftysave_migration" */
        update_niftysave_migration?: ModelTypes["niftysave_migration_mutation_response"];
        /** update single row of the table: "niftysave_migration" */
        update_niftysave_migration_by_pk?: ModelTypes["niftysave_migration"];
        /** update data of the table: "other_nft_resources" */
        update_other_nft_resources?: ModelTypes["other_nft_resources_mutation_response"];
        /** update single row of the table: "other_nft_resources" */
        update_other_nft_resources_by_pk?: ModelTypes["other_nft_resources"];
        /** update data of the table: "pin" */
        update_pin?: ModelTypes["pin_mutation_response"];
        /** update single row of the table: "pin" */
        update_pin_by_pk?: ModelTypes["pin"];
        /** update data of the table: "resource" */
        update_resource?: ModelTypes["resource_mutation_response"];
        /** update single row of the table: "resource" */
        update_resource_by_pk?: ModelTypes["resource"];
    };
    /** columns and relationships of "nft" */
    ["nft"]: {
        /** An object relationship */
        contract: ModelTypes["blockchain_contract"];
        contract_id: string;
        id: string;
        inserted_at: ModelTypes["timestamptz"];
        mint_time: ModelTypes["timestamptz"];
        /** An object relationship */
        nft_asset: ModelTypes["nft_asset"];
        /** An array relationship */
        referrer_blocks: ModelTypes["nfts_by_blockchain_blocks"][];
        /** An aggregate relationship */
        referrer_blocks_aggregate: ModelTypes["nfts_by_blockchain_blocks_aggregate"];
        token_id: string;
        token_uri_hash: ModelTypes["bytea"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "nft" */
    ["nft_aggregate"]: {
        aggregate?: ModelTypes["nft_aggregate_fields"];
        nodes: ModelTypes["nft"][];
    };
    /** aggregate fields of "nft" */
    ["nft_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["nft_max_fields"];
        min?: ModelTypes["nft_min_fields"];
    };
    /** order by aggregate values of table "nft" */
    ["nft_aggregate_order_by"]: GraphQLTypes["nft_aggregate_order_by"];
    /** input type for inserting array relation for remote table "nft" */
    ["nft_arr_rel_insert_input"]: GraphQLTypes["nft_arr_rel_insert_input"];
    /** columns and relationships of "nft_asset" */
    ["nft_asset"]: {
        inserted_at: ModelTypes["timestamptz"];
        ipfs_url?: string;
        /** An object relationship */
        metadata?: ModelTypes["nft_metadata"];
        metadata_cid?: string;
        /** An array relationship */
        nfts: ModelTypes["nft"][];
        /** An aggregate relationship */
        nfts_aggregate: ModelTypes["nft_aggregate"];
        status: ModelTypes["nft_asset_status"];
        status_text: string;
        token_uri: string;
        token_uri_hash: ModelTypes["bytea"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "nft_asset" */
    ["nft_asset_aggregate"]: {
        aggregate?: ModelTypes["nft_asset_aggregate_fields"];
        nodes: ModelTypes["nft_asset"][];
    };
    /** aggregate fields of "nft_asset" */
    ["nft_asset_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["nft_asset_max_fields"];
        min?: ModelTypes["nft_asset_min_fields"];
    };
    /** order by aggregate values of table "nft_asset" */
    ["nft_asset_aggregate_order_by"]: GraphQLTypes["nft_asset_aggregate_order_by"];
    /** input type for inserting array relation for remote table "nft_asset" */
    ["nft_asset_arr_rel_insert_input"]: GraphQLTypes["nft_asset_arr_rel_insert_input"];
    /** Boolean expression to filter rows from the table "nft_asset". All fields are combined with a logical 'AND'. */
    ["nft_asset_bool_exp"]: GraphQLTypes["nft_asset_bool_exp"];
    /** unique or primary key constraints on table "nft_asset" */
    ["nft_asset_constraint"]: GraphQLTypes["nft_asset_constraint"];
    /** input type for inserting data into table "nft_asset" */
    ["nft_asset_insert_input"]: GraphQLTypes["nft_asset_insert_input"];
    /** aggregate max on columns */
    ["nft_asset_max_fields"]: {
        inserted_at?: ModelTypes["timestamptz"];
        ipfs_url?: string;
        metadata_cid?: string;
        status_text?: string;
        token_uri?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by max() on columns of table "nft_asset" */
    ["nft_asset_max_order_by"]: GraphQLTypes["nft_asset_max_order_by"];
    /** aggregate min on columns */
    ["nft_asset_min_fields"]: {
        inserted_at?: ModelTypes["timestamptz"];
        ipfs_url?: string;
        metadata_cid?: string;
        status_text?: string;
        token_uri?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by min() on columns of table "nft_asset" */
    ["nft_asset_min_order_by"]: GraphQLTypes["nft_asset_min_order_by"];
    /** response of any mutation on the table "nft_asset" */
    ["nft_asset_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["nft_asset"][];
    };
    /** input type for inserting object relation for remote table "nft_asset" */
    ["nft_asset_obj_rel_insert_input"]: GraphQLTypes["nft_asset_obj_rel_insert_input"];
    /** on conflict condition type for table "nft_asset" */
    ["nft_asset_on_conflict"]: GraphQLTypes["nft_asset_on_conflict"];
    /** Ordering options when selecting data from "nft_asset". */
    ["nft_asset_order_by"]: GraphQLTypes["nft_asset_order_by"];
    /** primary key columns input for table: nft_asset */
    ["nft_asset_pk_columns_input"]: GraphQLTypes["nft_asset_pk_columns_input"];
    /** select columns of table "nft_asset" */
    ["nft_asset_select_column"]: GraphQLTypes["nft_asset_select_column"];
    /** input type for updating data in table "nft_asset" */
    ["nft_asset_set_input"]: GraphQLTypes["nft_asset_set_input"];
    ["nft_asset_status"]: any;
    /** Boolean expression to compare columns of type "nft_asset_status". All fields are combined with logical 'AND'. */
    ["nft_asset_status_comparison_exp"]: GraphQLTypes["nft_asset_status_comparison_exp"];
    /** update columns of table "nft_asset" */
    ["nft_asset_update_column"]: GraphQLTypes["nft_asset_update_column"];
    /** Boolean expression to filter rows from the table "nft". All fields are combined with a logical 'AND'. */
    ["nft_bool_exp"]: GraphQLTypes["nft_bool_exp"];
    /** unique or primary key constraints on table "nft" */
    ["nft_constraint"]: GraphQLTypes["nft_constraint"];
    /** input type for inserting data into table "nft" */
    ["nft_insert_input"]: GraphQLTypes["nft_insert_input"];
    /** aggregate max on columns */
    ["nft_max_fields"]: {
        contract_id?: string;
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        mint_time?: ModelTypes["timestamptz"];
        token_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by max() on columns of table "nft" */
    ["nft_max_order_by"]: GraphQLTypes["nft_max_order_by"];
    /** columns and relationships of "nft_metadata" */
    ["nft_metadata"]: {
        cid: string;
        /** An object relationship */
        content: ModelTypes["content"];
        description?: string;
        /** An object relationship */
        image?: ModelTypes["resource"];
        image_uri_hash?: ModelTypes["bytea"];
        inserted_at: ModelTypes["timestamptz"];
        json?: ModelTypes["jsonb"];
        name?: string;
        /** An array relationship */
        nft_assets: ModelTypes["nft_asset"][];
        /** An aggregate relationship */
        nft_assets_aggregate: ModelTypes["nft_asset_aggregate"];
        /** An array relationship */
        other_nft_resources: ModelTypes["other_nft_resources"][];
        /** An aggregate relationship */
        other_nft_resources_aggregate: ModelTypes["other_nft_resources_aggregate"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "nft_metadata" */
    ["nft_metadata_aggregate"]: {
        aggregate?: ModelTypes["nft_metadata_aggregate_fields"];
        nodes: ModelTypes["nft_metadata"][];
    };
    /** aggregate fields of "nft_metadata" */
    ["nft_metadata_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["nft_metadata_max_fields"];
        min?: ModelTypes["nft_metadata_min_fields"];
    };
    /** append existing jsonb value of filtered columns with new jsonb value */
    ["nft_metadata_append_input"]: GraphQLTypes["nft_metadata_append_input"];
    /** Boolean expression to filter rows from the table "nft_metadata". All fields are combined with a logical 'AND'. */
    ["nft_metadata_bool_exp"]: GraphQLTypes["nft_metadata_bool_exp"];
    /** unique or primary key constraints on table "nft_metadata" */
    ["nft_metadata_constraint"]: GraphQLTypes["nft_metadata_constraint"];
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    ["nft_metadata_delete_at_path_input"]: GraphQLTypes["nft_metadata_delete_at_path_input"];
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    ["nft_metadata_delete_elem_input"]: GraphQLTypes["nft_metadata_delete_elem_input"];
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    ["nft_metadata_delete_key_input"]: GraphQLTypes["nft_metadata_delete_key_input"];
    /** input type for inserting data into table "nft_metadata" */
    ["nft_metadata_insert_input"]: GraphQLTypes["nft_metadata_insert_input"];
    /** aggregate max on columns */
    ["nft_metadata_max_fields"]: {
        cid?: string;
        description?: string;
        inserted_at?: ModelTypes["timestamptz"];
        name?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["nft_metadata_min_fields"]: {
        cid?: string;
        description?: string;
        inserted_at?: ModelTypes["timestamptz"];
        name?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "nft_metadata" */
    ["nft_metadata_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["nft_metadata"][];
    };
    /** input type for inserting object relation for remote table "nft_metadata" */
    ["nft_metadata_obj_rel_insert_input"]: GraphQLTypes["nft_metadata_obj_rel_insert_input"];
    /** on conflict condition type for table "nft_metadata" */
    ["nft_metadata_on_conflict"]: GraphQLTypes["nft_metadata_on_conflict"];
    /** Ordering options when selecting data from "nft_metadata". */
    ["nft_metadata_order_by"]: GraphQLTypes["nft_metadata_order_by"];
    /** primary key columns input for table: nft_metadata */
    ["nft_metadata_pk_columns_input"]: GraphQLTypes["nft_metadata_pk_columns_input"];
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    ["nft_metadata_prepend_input"]: GraphQLTypes["nft_metadata_prepend_input"];
    /** select columns of table "nft_metadata" */
    ["nft_metadata_select_column"]: GraphQLTypes["nft_metadata_select_column"];
    /** input type for updating data in table "nft_metadata" */
    ["nft_metadata_set_input"]: GraphQLTypes["nft_metadata_set_input"];
    /** update columns of table "nft_metadata" */
    ["nft_metadata_update_column"]: GraphQLTypes["nft_metadata_update_column"];
    /** aggregate min on columns */
    ["nft_min_fields"]: {
        contract_id?: string;
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        mint_time?: ModelTypes["timestamptz"];
        token_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by min() on columns of table "nft" */
    ["nft_min_order_by"]: GraphQLTypes["nft_min_order_by"];
    /** response of any mutation on the table "nft" */
    ["nft_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["nft"][];
    };
    /** on conflict condition type for table "nft" */
    ["nft_on_conflict"]: GraphQLTypes["nft_on_conflict"];
    /** Ordering options when selecting data from "nft". */
    ["nft_order_by"]: GraphQLTypes["nft_order_by"];
    /** columns and relationships of "nft_ownership" */
    ["nft_ownership"]: {
        block_number: ModelTypes["bigint"];
        inserted_at: ModelTypes["timestamptz"];
        nft_id: string;
        owner_id: string;
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "nft_ownership" */
    ["nft_ownership_aggregate"]: {
        aggregate?: ModelTypes["nft_ownership_aggregate_fields"];
        nodes: ModelTypes["nft_ownership"][];
    };
    /** aggregate fields of "nft_ownership" */
    ["nft_ownership_aggregate_fields"]: {
        avg?: ModelTypes["nft_ownership_avg_fields"];
        count: number;
        max?: ModelTypes["nft_ownership_max_fields"];
        min?: ModelTypes["nft_ownership_min_fields"];
        stddev?: ModelTypes["nft_ownership_stddev_fields"];
        stddev_pop?: ModelTypes["nft_ownership_stddev_pop_fields"];
        stddev_samp?: ModelTypes["nft_ownership_stddev_samp_fields"];
        sum?: ModelTypes["nft_ownership_sum_fields"];
        var_pop?: ModelTypes["nft_ownership_var_pop_fields"];
        var_samp?: ModelTypes["nft_ownership_var_samp_fields"];
        variance?: ModelTypes["nft_ownership_variance_fields"];
    };
    /** aggregate avg on columns */
    ["nft_ownership_avg_fields"]: {
        block_number?: number;
    };
    /** Boolean expression to filter rows from the table "nft_ownership". All fields are combined with a logical 'AND'. */
    ["nft_ownership_bool_exp"]: GraphQLTypes["nft_ownership_bool_exp"];
    /** unique or primary key constraints on table "nft_ownership" */
    ["nft_ownership_constraint"]: GraphQLTypes["nft_ownership_constraint"];
    /** input type for incrementing numeric columns in table "nft_ownership" */
    ["nft_ownership_inc_input"]: GraphQLTypes["nft_ownership_inc_input"];
    /** input type for inserting data into table "nft_ownership" */
    ["nft_ownership_insert_input"]: GraphQLTypes["nft_ownership_insert_input"];
    /** aggregate max on columns */
    ["nft_ownership_max_fields"]: {
        block_number?: ModelTypes["bigint"];
        inserted_at?: ModelTypes["timestamptz"];
        nft_id?: string;
        owner_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["nft_ownership_min_fields"]: {
        block_number?: ModelTypes["bigint"];
        inserted_at?: ModelTypes["timestamptz"];
        nft_id?: string;
        owner_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "nft_ownership" */
    ["nft_ownership_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["nft_ownership"][];
    };
    /** on conflict condition type for table "nft_ownership" */
    ["nft_ownership_on_conflict"]: GraphQLTypes["nft_ownership_on_conflict"];
    /** Ordering options when selecting data from "nft_ownership". */
    ["nft_ownership_order_by"]: GraphQLTypes["nft_ownership_order_by"];
    /** primary key columns input for table: nft_ownership */
    ["nft_ownership_pk_columns_input"]: GraphQLTypes["nft_ownership_pk_columns_input"];
    /** select columns of table "nft_ownership" */
    ["nft_ownership_select_column"]: GraphQLTypes["nft_ownership_select_column"];
    /** input type for updating data in table "nft_ownership" */
    ["nft_ownership_set_input"]: GraphQLTypes["nft_ownership_set_input"];
    /** aggregate stddev on columns */
    ["nft_ownership_stddev_fields"]: {
        block_number?: number;
    };
    /** aggregate stddev_pop on columns */
    ["nft_ownership_stddev_pop_fields"]: {
        block_number?: number;
    };
    /** aggregate stddev_samp on columns */
    ["nft_ownership_stddev_samp_fields"]: {
        block_number?: number;
    };
    /** aggregate sum on columns */
    ["nft_ownership_sum_fields"]: {
        block_number?: ModelTypes["bigint"];
    };
    /** update columns of table "nft_ownership" */
    ["nft_ownership_update_column"]: GraphQLTypes["nft_ownership_update_column"];
    /** aggregate var_pop on columns */
    ["nft_ownership_var_pop_fields"]: {
        block_number?: number;
    };
    /** aggregate var_samp on columns */
    ["nft_ownership_var_samp_fields"]: {
        block_number?: number;
    };
    /** aggregate variance on columns */
    ["nft_ownership_variance_fields"]: {
        block_number?: number;
    };
    /** primary key columns input for table: nft */
    ["nft_pk_columns_input"]: GraphQLTypes["nft_pk_columns_input"];
    /** select columns of table "nft" */
    ["nft_select_column"]: GraphQLTypes["nft_select_column"];
    /** input type for updating data in table "nft" */
    ["nft_set_input"]: GraphQLTypes["nft_set_input"];
    /** update columns of table "nft" */
    ["nft_update_column"]: GraphQLTypes["nft_update_column"];
    /** columns and relationships of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks"]: {
        blockchain_block_hash: string;
        inserted_at: ModelTypes["timestamptz"];
        nft_id: string;
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate"]: {
        aggregate?: ModelTypes["nfts_by_blockchain_blocks_aggregate_fields"];
        nodes: ModelTypes["nfts_by_blockchain_blocks"][];
    };
    /** aggregate fields of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["nfts_by_blockchain_blocks_max_fields"];
        min?: ModelTypes["nfts_by_blockchain_blocks_min_fields"];
    };
    /** order by aggregate values of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate_order_by"]: GraphQLTypes["nfts_by_blockchain_blocks_aggregate_order_by"];
    /** input type for inserting array relation for remote table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_arr_rel_insert_input"]: GraphQLTypes["nfts_by_blockchain_blocks_arr_rel_insert_input"];
    /** Boolean expression to filter rows from the table "nfts_by_blockchain_blocks". All fields are combined with a logical 'AND'. */
    ["nfts_by_blockchain_blocks_bool_exp"]: GraphQLTypes["nfts_by_blockchain_blocks_bool_exp"];
    /** unique or primary key constraints on table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_constraint"]: GraphQLTypes["nfts_by_blockchain_blocks_constraint"];
    /** input type for inserting data into table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_insert_input"]: GraphQLTypes["nfts_by_blockchain_blocks_insert_input"];
    /** aggregate max on columns */
    ["nfts_by_blockchain_blocks_max_fields"]: {
        blockchain_block_hash?: string;
        inserted_at?: ModelTypes["timestamptz"];
        nft_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by max() on columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_max_order_by"]: GraphQLTypes["nfts_by_blockchain_blocks_max_order_by"];
    /** aggregate min on columns */
    ["nfts_by_blockchain_blocks_min_fields"]: {
        blockchain_block_hash?: string;
        inserted_at?: ModelTypes["timestamptz"];
        nft_id?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by min() on columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_min_order_by"]: GraphQLTypes["nfts_by_blockchain_blocks_min_order_by"];
    /** response of any mutation on the table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["nfts_by_blockchain_blocks"][];
    };
    /** on conflict condition type for table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_on_conflict"]: GraphQLTypes["nfts_by_blockchain_blocks_on_conflict"];
    /** Ordering options when selecting data from "nfts_by_blockchain_blocks". */
    ["nfts_by_blockchain_blocks_order_by"]: GraphQLTypes["nfts_by_blockchain_blocks_order_by"];
    /** primary key columns input for table: nfts_by_blockchain_blocks */
    ["nfts_by_blockchain_blocks_pk_columns_input"]: GraphQLTypes["nfts_by_blockchain_blocks_pk_columns_input"];
    /** select columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_select_column"]: GraphQLTypes["nfts_by_blockchain_blocks_select_column"];
    /** input type for updating data in table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_set_input"]: GraphQLTypes["nfts_by_blockchain_blocks_set_input"];
    /** update columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_update_column"]: GraphQLTypes["nfts_by_blockchain_blocks_update_column"];
    /** Utility table to keep track of migrations


columns and relationships of "niftysave_migration" */
    ["niftysave_migration"]: {
        collection: string;
        cursor?: string;
        id: string;
        inserted_at: ModelTypes["timestamptz"];
        metadata: ModelTypes["jsonb"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "niftysave_migration" */
    ["niftysave_migration_aggregate"]: {
        aggregate?: ModelTypes["niftysave_migration_aggregate_fields"];
        nodes: ModelTypes["niftysave_migration"][];
    };
    /** aggregate fields of "niftysave_migration" */
    ["niftysave_migration_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["niftysave_migration_max_fields"];
        min?: ModelTypes["niftysave_migration_min_fields"];
    };
    /** append existing jsonb value of filtered columns with new jsonb value */
    ["niftysave_migration_append_input"]: GraphQLTypes["niftysave_migration_append_input"];
    /** Boolean expression to filter rows from the table "niftysave_migration". All fields are combined with a logical 'AND'. */
    ["niftysave_migration_bool_exp"]: GraphQLTypes["niftysave_migration_bool_exp"];
    /** unique or primary key constraints on table "niftysave_migration" */
    ["niftysave_migration_constraint"]: GraphQLTypes["niftysave_migration_constraint"];
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    ["niftysave_migration_delete_at_path_input"]: GraphQLTypes["niftysave_migration_delete_at_path_input"];
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    ["niftysave_migration_delete_elem_input"]: GraphQLTypes["niftysave_migration_delete_elem_input"];
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    ["niftysave_migration_delete_key_input"]: GraphQLTypes["niftysave_migration_delete_key_input"];
    /** input type for inserting data into table "niftysave_migration" */
    ["niftysave_migration_insert_input"]: GraphQLTypes["niftysave_migration_insert_input"];
    /** aggregate max on columns */
    ["niftysave_migration_max_fields"]: {
        collection?: string;
        cursor?: string;
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["niftysave_migration_min_fields"]: {
        collection?: string;
        cursor?: string;
        id?: string;
        inserted_at?: ModelTypes["timestamptz"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** response of any mutation on the table "niftysave_migration" */
    ["niftysave_migration_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["niftysave_migration"][];
    };
    /** on conflict condition type for table "niftysave_migration" */
    ["niftysave_migration_on_conflict"]: GraphQLTypes["niftysave_migration_on_conflict"];
    /** Ordering options when selecting data from "niftysave_migration". */
    ["niftysave_migration_order_by"]: GraphQLTypes["niftysave_migration_order_by"];
    /** primary key columns input for table: niftysave_migration */
    ["niftysave_migration_pk_columns_input"]: GraphQLTypes["niftysave_migration_pk_columns_input"];
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    ["niftysave_migration_prepend_input"]: GraphQLTypes["niftysave_migration_prepend_input"];
    /** select columns of table "niftysave_migration" */
    ["niftysave_migration_select_column"]: GraphQLTypes["niftysave_migration_select_column"];
    /** input type for updating data in table "niftysave_migration" */
    ["niftysave_migration_set_input"]: GraphQLTypes["niftysave_migration_set_input"];
    /** update columns of table "niftysave_migration" */
    ["niftysave_migration_update_column"]: GraphQLTypes["niftysave_migration_update_column"];
    /** column ordering options */
    ["order_by"]: GraphQLTypes["order_by"];
    /** columns and relationships of "other_nft_resources" */
    ["other_nft_resources"]: {
        inserted_at: ModelTypes["timestamptz"];
        /** An object relationship */
        metadata: ModelTypes["nft_metadata"];
        metadata_cid: string;
        /** An object relationship */
        resource?: ModelTypes["resource"];
        resource_uri_hash: ModelTypes["bytea"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "other_nft_resources" */
    ["other_nft_resources_aggregate"]: {
        aggregate?: ModelTypes["other_nft_resources_aggregate_fields"];
        nodes: ModelTypes["other_nft_resources"][];
    };
    /** aggregate fields of "other_nft_resources" */
    ["other_nft_resources_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["other_nft_resources_max_fields"];
        min?: ModelTypes["other_nft_resources_min_fields"];
    };
    /** order by aggregate values of table "other_nft_resources" */
    ["other_nft_resources_aggregate_order_by"]: GraphQLTypes["other_nft_resources_aggregate_order_by"];
    /** input type for inserting array relation for remote table "other_nft_resources" */
    ["other_nft_resources_arr_rel_insert_input"]: GraphQLTypes["other_nft_resources_arr_rel_insert_input"];
    /** Boolean expression to filter rows from the table "other_nft_resources". All fields are combined with a logical 'AND'. */
    ["other_nft_resources_bool_exp"]: GraphQLTypes["other_nft_resources_bool_exp"];
    /** unique or primary key constraints on table "other_nft_resources" */
    ["other_nft_resources_constraint"]: GraphQLTypes["other_nft_resources_constraint"];
    /** input type for inserting data into table "other_nft_resources" */
    ["other_nft_resources_insert_input"]: GraphQLTypes["other_nft_resources_insert_input"];
    /** aggregate max on columns */
    ["other_nft_resources_max_fields"]: {
        inserted_at?: ModelTypes["timestamptz"];
        metadata_cid?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by max() on columns of table "other_nft_resources" */
    ["other_nft_resources_max_order_by"]: GraphQLTypes["other_nft_resources_max_order_by"];
    /** aggregate min on columns */
    ["other_nft_resources_min_fields"]: {
        inserted_at?: ModelTypes["timestamptz"];
        metadata_cid?: string;
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by min() on columns of table "other_nft_resources" */
    ["other_nft_resources_min_order_by"]: GraphQLTypes["other_nft_resources_min_order_by"];
    /** response of any mutation on the table "other_nft_resources" */
    ["other_nft_resources_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["other_nft_resources"][];
    };
    /** on conflict condition type for table "other_nft_resources" */
    ["other_nft_resources_on_conflict"]: GraphQLTypes["other_nft_resources_on_conflict"];
    /** Ordering options when selecting data from "other_nft_resources". */
    ["other_nft_resources_order_by"]: GraphQLTypes["other_nft_resources_order_by"];
    /** primary key columns input for table: other_nft_resources */
    ["other_nft_resources_pk_columns_input"]: GraphQLTypes["other_nft_resources_pk_columns_input"];
    /** select columns of table "other_nft_resources" */
    ["other_nft_resources_select_column"]: GraphQLTypes["other_nft_resources_select_column"];
    /** input type for updating data in table "other_nft_resources" */
    ["other_nft_resources_set_input"]: GraphQLTypes["other_nft_resources_set_input"];
    /** update columns of table "other_nft_resources" */
    ["other_nft_resources_update_column"]: GraphQLTypes["other_nft_resources_update_column"];
    ["parse_nft_asset_args"]: GraphQLTypes["parse_nft_asset_args"];
    /** columns and relationships of "pin" */
    ["pin"]: {
        /** An object relationship */
        content: ModelTypes["content"];
        content_cid: string;
        id: ModelTypes["bigint"];
        inserted_at: ModelTypes["timestamptz"];
        service: ModelTypes["pin_service"];
        status: ModelTypes["pin_status"];
        updated_at: ModelTypes["timestamptz"];
    };
    /** aggregated selection of "pin" */
    ["pin_aggregate"]: {
        aggregate?: ModelTypes["pin_aggregate_fields"];
        nodes: ModelTypes["pin"][];
    };
    /** aggregate fields of "pin" */
    ["pin_aggregate_fields"]: {
        avg?: ModelTypes["pin_avg_fields"];
        count: number;
        max?: ModelTypes["pin_max_fields"];
        min?: ModelTypes["pin_min_fields"];
        stddev?: ModelTypes["pin_stddev_fields"];
        stddev_pop?: ModelTypes["pin_stddev_pop_fields"];
        stddev_samp?: ModelTypes["pin_stddev_samp_fields"];
        sum?: ModelTypes["pin_sum_fields"];
        var_pop?: ModelTypes["pin_var_pop_fields"];
        var_samp?: ModelTypes["pin_var_samp_fields"];
        variance?: ModelTypes["pin_variance_fields"];
    };
    /** order by aggregate values of table "pin" */
    ["pin_aggregate_order_by"]: GraphQLTypes["pin_aggregate_order_by"];
    /** input type for inserting array relation for remote table "pin" */
    ["pin_arr_rel_insert_input"]: GraphQLTypes["pin_arr_rel_insert_input"];
    /** aggregate avg on columns */
    ["pin_avg_fields"]: {
        id?: number;
    };
    /** order by avg() on columns of table "pin" */
    ["pin_avg_order_by"]: GraphQLTypes["pin_avg_order_by"];
    /** Boolean expression to filter rows from the table "pin". All fields are combined with a logical 'AND'. */
    ["pin_bool_exp"]: GraphQLTypes["pin_bool_exp"];
    /** unique or primary key constraints on table "pin" */
    ["pin_constraint"]: GraphQLTypes["pin_constraint"];
    /** input type for incrementing numeric columns in table "pin" */
    ["pin_inc_input"]: GraphQLTypes["pin_inc_input"];
    /** input type for inserting data into table "pin" */
    ["pin_insert_input"]: GraphQLTypes["pin_insert_input"];
    /** aggregate max on columns */
    ["pin_max_fields"]: {
        content_cid?: string;
        id?: ModelTypes["bigint"];
        inserted_at?: ModelTypes["timestamptz"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by max() on columns of table "pin" */
    ["pin_max_order_by"]: GraphQLTypes["pin_max_order_by"];
    /** aggregate min on columns */
    ["pin_min_fields"]: {
        content_cid?: string;
        id?: ModelTypes["bigint"];
        inserted_at?: ModelTypes["timestamptz"];
        updated_at?: ModelTypes["timestamptz"];
    };
    /** order by min() on columns of table "pin" */
    ["pin_min_order_by"]: GraphQLTypes["pin_min_order_by"];
    /** response of any mutation on the table "pin" */
    ["pin_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["pin"][];
    };
    /** on conflict condition type for table "pin" */
    ["pin_on_conflict"]: GraphQLTypes["pin_on_conflict"];
    /** Ordering options when selecting data from "pin". */
    ["pin_order_by"]: GraphQLTypes["pin_order_by"];
    /** primary key columns input for table: pin */
    ["pin_pk_columns_input"]: GraphQLTypes["pin_pk_columns_input"];
    /** select columns of table "pin" */
    ["pin_select_column"]: GraphQLTypes["pin_select_column"];
    ["pin_service"]: any;
    /** Boolean expression to compare columns of type "pin_service". All fields are combined with logical 'AND'. */
    ["pin_service_comparison_exp"]: GraphQLTypes["pin_service_comparison_exp"];
    /** input type for updating data in table "pin" */
    ["pin_set_input"]: GraphQLTypes["pin_set_input"];
    ["pin_status"]: any;
    /** Boolean expression to compare columns of type "pin_status". All fields are combined with logical 'AND'. */
    ["pin_status_comparison_exp"]: GraphQLTypes["pin_status_comparison_exp"];
    /** aggregate stddev on columns */
    ["pin_stddev_fields"]: {
        id?: number;
    };
    /** order by stddev() on columns of table "pin" */
    ["pin_stddev_order_by"]: GraphQLTypes["pin_stddev_order_by"];
    /** aggregate stddev_pop on columns */
    ["pin_stddev_pop_fields"]: {
        id?: number;
    };
    /** order by stddev_pop() on columns of table "pin" */
    ["pin_stddev_pop_order_by"]: GraphQLTypes["pin_stddev_pop_order_by"];
    /** aggregate stddev_samp on columns */
    ["pin_stddev_samp_fields"]: {
        id?: number;
    };
    /** order by stddev_samp() on columns of table "pin" */
    ["pin_stddev_samp_order_by"]: GraphQLTypes["pin_stddev_samp_order_by"];
    /** aggregate sum on columns */
    ["pin_sum_fields"]: {
        id?: ModelTypes["bigint"];
    };
    /** order by sum() on columns of table "pin" */
    ["pin_sum_order_by"]: GraphQLTypes["pin_sum_order_by"];
    /** update columns of table "pin" */
    ["pin_update_column"]: GraphQLTypes["pin_update_column"];
    /** aggregate var_pop on columns */
    ["pin_var_pop_fields"]: {
        id?: number;
    };
    /** order by var_pop() on columns of table "pin" */
    ["pin_var_pop_order_by"]: GraphQLTypes["pin_var_pop_order_by"];
    /** aggregate var_samp on columns */
    ["pin_var_samp_fields"]: {
        id?: number;
    };
    /** order by var_samp() on columns of table "pin" */
    ["pin_var_samp_order_by"]: GraphQLTypes["pin_var_samp_order_by"];
    /** aggregate variance on columns */
    ["pin_variance_fields"]: {
        id?: number;
    };
    /** order by variance() on columns of table "pin" */
    ["pin_variance_order_by"]: GraphQLTypes["pin_variance_order_by"];
    ["query_root"]: {
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: ModelTypes["blockchain_block"][];
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: ModelTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: ModelTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: ModelTypes["blockchain_contract"][];
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: ModelTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: ModelTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: ModelTypes["content"][];
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: ModelTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: ModelTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: ModelTypes["erc721_import"][];
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: ModelTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: ModelTypes["erc721_import_by_nft"][];
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: ModelTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: ModelTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: ModelTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: ModelTypes["nft"][];
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: ModelTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: ModelTypes["nft_asset"][];
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: ModelTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: ModelTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: ModelTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: ModelTypes["nft_metadata"][];
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: ModelTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: ModelTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: ModelTypes["nft_ownership"][];
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: ModelTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: ModelTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: ModelTypes["nfts_by_blockchain_blocks"][];
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: ModelTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: ModelTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: ModelTypes["niftysave_migration"][];
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: ModelTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: ModelTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: ModelTypes["other_nft_resources"][];
        /** An aggregate relationship */
        other_nft_resources_aggregate: ModelTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: ModelTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: ModelTypes["pin"][];
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: ModelTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: ModelTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: ModelTypes["resource"][];
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: ModelTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: ModelTypes["resource"];
    };
    ["queue_resource_args"]: GraphQLTypes["queue_resource_args"];
    /** columns and relationships of "resource" */
    ["resource"]: {
        /** An object relationship */
        content?: ModelTypes["content"];
        content_cid?: string;
        inserted_at: ModelTypes["timestamptz"];
        ipfs_url?: string;
        /** An array relationship */
        referrer_metadata: ModelTypes["other_nft_resources"][];
        /** An aggregate relationship */
        referrer_metadata_aggregate: ModelTypes["other_nft_resources_aggregate"];
        status: ModelTypes["resource_status"];
        status_text?: string;
        updated_at: ModelTypes["timestamptz"];
        uri: string;
        uri_hash: ModelTypes["bytea"];
    };
    /** aggregated selection of "resource" */
    ["resource_aggregate"]: {
        aggregate?: ModelTypes["resource_aggregate_fields"];
        nodes: ModelTypes["resource"][];
    };
    /** aggregate fields of "resource" */
    ["resource_aggregate_fields"]: {
        count: number;
        max?: ModelTypes["resource_max_fields"];
        min?: ModelTypes["resource_min_fields"];
    };
    /** Boolean expression to filter rows from the table "resource". All fields are combined with a logical 'AND'. */
    ["resource_bool_exp"]: GraphQLTypes["resource_bool_exp"];
    /** unique or primary key constraints on table "resource" */
    ["resource_constraint"]: GraphQLTypes["resource_constraint"];
    /** input type for inserting data into table "resource" */
    ["resource_insert_input"]: GraphQLTypes["resource_insert_input"];
    /** aggregate max on columns */
    ["resource_max_fields"]: {
        content_cid?: string;
        inserted_at?: ModelTypes["timestamptz"];
        ipfs_url?: string;
        status_text?: string;
        updated_at?: ModelTypes["timestamptz"];
        uri?: string;
    };
    /** aggregate min on columns */
    ["resource_min_fields"]: {
        content_cid?: string;
        inserted_at?: ModelTypes["timestamptz"];
        ipfs_url?: string;
        status_text?: string;
        updated_at?: ModelTypes["timestamptz"];
        uri?: string;
    };
    /** response of any mutation on the table "resource" */
    ["resource_mutation_response"]: {
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: ModelTypes["resource"][];
    };
    /** input type for inserting object relation for remote table "resource" */
    ["resource_obj_rel_insert_input"]: GraphQLTypes["resource_obj_rel_insert_input"];
    /** on conflict condition type for table "resource" */
    ["resource_on_conflict"]: GraphQLTypes["resource_on_conflict"];
    /** Ordering options when selecting data from "resource". */
    ["resource_order_by"]: GraphQLTypes["resource_order_by"];
    /** primary key columns input for table: resource */
    ["resource_pk_columns_input"]: GraphQLTypes["resource_pk_columns_input"];
    /** select columns of table "resource" */
    ["resource_select_column"]: GraphQLTypes["resource_select_column"];
    /** input type for updating data in table "resource" */
    ["resource_set_input"]: GraphQLTypes["resource_set_input"];
    ["resource_status"]: any;
    /** Boolean expression to compare columns of type "resource_status". All fields are combined with logical 'AND'. */
    ["resource_status_comparison_exp"]: GraphQLTypes["resource_status_comparison_exp"];
    /** update columns of table "resource" */
    ["resource_update_column"]: GraphQLTypes["resource_update_column"];
    ["subscription_root"]: {
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: ModelTypes["blockchain_block"][];
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: ModelTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: ModelTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: ModelTypes["blockchain_contract"][];
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: ModelTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: ModelTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: ModelTypes["content"][];
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: ModelTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: ModelTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: ModelTypes["erc721_import"][];
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: ModelTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: ModelTypes["erc721_import_by_nft"][];
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: ModelTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: ModelTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: ModelTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: ModelTypes["nft"][];
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: ModelTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: ModelTypes["nft_asset"][];
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: ModelTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: ModelTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: ModelTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: ModelTypes["nft_metadata"][];
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: ModelTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: ModelTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: ModelTypes["nft_ownership"][];
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: ModelTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: ModelTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: ModelTypes["nfts_by_blockchain_blocks"][];
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: ModelTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: ModelTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: ModelTypes["niftysave_migration"][];
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: ModelTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: ModelTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: ModelTypes["other_nft_resources"][];
        /** An aggregate relationship */
        other_nft_resources_aggregate: ModelTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: ModelTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: ModelTypes["pin"][];
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: ModelTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: ModelTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: ModelTypes["resource"][];
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: ModelTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: ModelTypes["resource"];
    };
    ["timestamptz"]: any;
    /** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
    ["timestamptz_comparison_exp"]: GraphQLTypes["timestamptz_comparison_exp"];
};
export declare type GraphQLTypes = {
    /** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
    ["Boolean_comparison_exp"]: {
        _eq?: boolean;
        _gt?: boolean;
        _gte?: boolean;
        _in?: Array<boolean>;
        _is_null?: boolean;
        _lt?: boolean;
        _lte?: boolean;
        _neq?: boolean;
        _nin?: Array<boolean>;
    };
    /** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
    ["String_comparison_exp"]: {
        _eq?: string;
        _gt?: string;
        _gte?: string;
        /** does the column match the given case-insensitive pattern */
        _ilike?: string;
        _in?: Array<string>;
        /** does the column match the given POSIX regular expression, case insensitive */
        _iregex?: string;
        _is_null?: boolean;
        /** does the column match the given pattern */
        _like?: string;
        _lt?: string;
        _lte?: string;
        _neq?: string;
        /** does the column NOT match the given case-insensitive pattern */
        _nilike?: string;
        _nin?: Array<string>;
        /** does the column NOT match the given POSIX regular expression, case insensitive */
        _niregex?: string;
        /** does the column NOT match the given pattern */
        _nlike?: string;
        /** does the column NOT match the given POSIX regular expression, case sensitive */
        _nregex?: string;
        /** does the column NOT match the given SQL regular expression */
        _nsimilar?: string;
        /** does the column match the given POSIX regular expression, case sensitive */
        _regex?: string;
        /** does the column match the given SQL regular expression */
        _similar?: string;
    };
    ["bigint"]: any;
    /** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
    ["bigint_comparison_exp"]: {
        _eq?: GraphQLTypes["bigint"];
        _gt?: GraphQLTypes["bigint"];
        _gte?: GraphQLTypes["bigint"];
        _in?: Array<GraphQLTypes["bigint"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["bigint"];
        _lte?: GraphQLTypes["bigint"];
        _neq?: GraphQLTypes["bigint"];
        _nin?: Array<GraphQLTypes["bigint"]>;
    };
    /** columns and relationships of "blockchain_block" */
    ["blockchain_block"]: {
        __typename: "blockchain_block";
        hash: string;
        inserted_at: GraphQLTypes["timestamptz"];
        /** An array relationship */
        nfts: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** An aggregate relationship */
        nfts_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        number: GraphQLTypes["bigint"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "blockchain_block" */
    ["blockchain_block_aggregate"]: {
        __typename: "blockchain_block_aggregate";
        aggregate?: GraphQLTypes["blockchain_block_aggregate_fields"];
        nodes: Array<GraphQLTypes["blockchain_block"]>;
    };
    /** aggregate fields of "blockchain_block" */
    ["blockchain_block_aggregate_fields"]: {
        __typename: "blockchain_block_aggregate_fields";
        avg?: GraphQLTypes["blockchain_block_avg_fields"];
        count: number;
        max?: GraphQLTypes["blockchain_block_max_fields"];
        min?: GraphQLTypes["blockchain_block_min_fields"];
        stddev?: GraphQLTypes["blockchain_block_stddev_fields"];
        stddev_pop?: GraphQLTypes["blockchain_block_stddev_pop_fields"];
        stddev_samp?: GraphQLTypes["blockchain_block_stddev_samp_fields"];
        sum?: GraphQLTypes["blockchain_block_sum_fields"];
        var_pop?: GraphQLTypes["blockchain_block_var_pop_fields"];
        var_samp?: GraphQLTypes["blockchain_block_var_samp_fields"];
        variance?: GraphQLTypes["blockchain_block_variance_fields"];
    };
    /** aggregate avg on columns */
    ["blockchain_block_avg_fields"]: {
        __typename: "blockchain_block_avg_fields";
        number?: number;
    };
    /** Boolean expression to filter rows from the table "blockchain_block". All fields are combined with a logical 'AND'. */
    ["blockchain_block_bool_exp"]: {
        _and?: Array<GraphQLTypes["blockchain_block_bool_exp"]>;
        _not?: GraphQLTypes["blockchain_block_bool_exp"];
        _or?: Array<GraphQLTypes["blockchain_block_bool_exp"]>;
        hash?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        nfts?: GraphQLTypes["nfts_by_blockchain_blocks_bool_exp"];
        number?: GraphQLTypes["bigint_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "blockchain_block" */
    ["blockchain_block_constraint"]: blockchain_block_constraint;
    /** input type for incrementing numeric columns in table "blockchain_block" */
    ["blockchain_block_inc_input"]: {
        number?: GraphQLTypes["bigint"];
    };
    /** input type for inserting data into table "blockchain_block" */
    ["blockchain_block_insert_input"]: {
        hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nfts?: GraphQLTypes["nfts_by_blockchain_blocks_arr_rel_insert_input"];
        number?: GraphQLTypes["bigint"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["blockchain_block_max_fields"]: {
        __typename: "blockchain_block_max_fields";
        hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        number?: GraphQLTypes["bigint"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["blockchain_block_min_fields"]: {
        __typename: "blockchain_block_min_fields";
        hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        number?: GraphQLTypes["bigint"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "blockchain_block" */
    ["blockchain_block_mutation_response"]: {
        __typename: "blockchain_block_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["blockchain_block"]>;
    };
    /** on conflict condition type for table "blockchain_block" */
    ["blockchain_block_on_conflict"]: {
        constraint: GraphQLTypes["blockchain_block_constraint"];
        update_columns: Array<GraphQLTypes["blockchain_block_update_column"]>;
        where?: GraphQLTypes["blockchain_block_bool_exp"];
    };
    /** Ordering options when selecting data from "blockchain_block". */
    ["blockchain_block_order_by"]: {
        hash?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        nfts_aggregate?: GraphQLTypes["nfts_by_blockchain_blocks_aggregate_order_by"];
        number?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: blockchain_block */
    ["blockchain_block_pk_columns_input"]: {
        hash: string;
    };
    /** select columns of table "blockchain_block" */
    ["blockchain_block_select_column"]: blockchain_block_select_column;
    /** input type for updating data in table "blockchain_block" */
    ["blockchain_block_set_input"]: {
        hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        number?: GraphQLTypes["bigint"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate stddev on columns */
    ["blockchain_block_stddev_fields"]: {
        __typename: "blockchain_block_stddev_fields";
        number?: number;
    };
    /** aggregate stddev_pop on columns */
    ["blockchain_block_stddev_pop_fields"]: {
        __typename: "blockchain_block_stddev_pop_fields";
        number?: number;
    };
    /** aggregate stddev_samp on columns */
    ["blockchain_block_stddev_samp_fields"]: {
        __typename: "blockchain_block_stddev_samp_fields";
        number?: number;
    };
    /** aggregate sum on columns */
    ["blockchain_block_sum_fields"]: {
        __typename: "blockchain_block_sum_fields";
        number?: GraphQLTypes["bigint"];
    };
    /** update columns of table "blockchain_block" */
    ["blockchain_block_update_column"]: blockchain_block_update_column;
    /** aggregate var_pop on columns */
    ["blockchain_block_var_pop_fields"]: {
        __typename: "blockchain_block_var_pop_fields";
        number?: number;
    };
    /** aggregate var_samp on columns */
    ["blockchain_block_var_samp_fields"]: {
        __typename: "blockchain_block_var_samp_fields";
        number?: number;
    };
    /** aggregate variance on columns */
    ["blockchain_block_variance_fields"]: {
        __typename: "blockchain_block_variance_fields";
        number?: number;
    };
    /** columns and relationships of "blockchain_contract" */
    ["blockchain_contract"]: {
        __typename: "blockchain_contract";
        id: string;
        inserted_at: GraphQLTypes["timestamptz"];
        name?: string;
        supports_eip721_metadata: boolean;
        symbol?: string;
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "blockchain_contract" */
    ["blockchain_contract_aggregate"]: {
        __typename: "blockchain_contract_aggregate";
        aggregate?: GraphQLTypes["blockchain_contract_aggregate_fields"];
        nodes: Array<GraphQLTypes["blockchain_contract"]>;
    };
    /** aggregate fields of "blockchain_contract" */
    ["blockchain_contract_aggregate_fields"]: {
        __typename: "blockchain_contract_aggregate_fields";
        count: number;
        max?: GraphQLTypes["blockchain_contract_max_fields"];
        min?: GraphQLTypes["blockchain_contract_min_fields"];
    };
    /** Boolean expression to filter rows from the table "blockchain_contract". All fields are combined with a logical 'AND'. */
    ["blockchain_contract_bool_exp"]: {
        _and?: Array<GraphQLTypes["blockchain_contract_bool_exp"]>;
        _not?: GraphQLTypes["blockchain_contract_bool_exp"];
        _or?: Array<GraphQLTypes["blockchain_contract_bool_exp"]>;
        id?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        name?: GraphQLTypes["String_comparison_exp"];
        supports_eip721_metadata?: GraphQLTypes["Boolean_comparison_exp"];
        symbol?: GraphQLTypes["String_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "blockchain_contract" */
    ["blockchain_contract_constraint"]: blockchain_contract_constraint;
    /** input type for inserting data into table "blockchain_contract" */
    ["blockchain_contract_insert_input"]: {
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        name?: string;
        supports_eip721_metadata?: boolean;
        symbol?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["blockchain_contract_max_fields"]: {
        __typename: "blockchain_contract_max_fields";
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        name?: string;
        symbol?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["blockchain_contract_min_fields"]: {
        __typename: "blockchain_contract_min_fields";
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        name?: string;
        symbol?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "blockchain_contract" */
    ["blockchain_contract_mutation_response"]: {
        __typename: "blockchain_contract_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["blockchain_contract"]>;
    };
    /** input type for inserting object relation for remote table "blockchain_contract" */
    ["blockchain_contract_obj_rel_insert_input"]: {
        data: GraphQLTypes["blockchain_contract_insert_input"];
        /** on conflict condition */
        on_conflict?: GraphQLTypes["blockchain_contract_on_conflict"];
    };
    /** on conflict condition type for table "blockchain_contract" */
    ["blockchain_contract_on_conflict"]: {
        constraint: GraphQLTypes["blockchain_contract_constraint"];
        update_columns: Array<GraphQLTypes["blockchain_contract_update_column"]>;
        where?: GraphQLTypes["blockchain_contract_bool_exp"];
    };
    /** Ordering options when selecting data from "blockchain_contract". */
    ["blockchain_contract_order_by"]: {
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        name?: GraphQLTypes["order_by"];
        supports_eip721_metadata?: GraphQLTypes["order_by"];
        symbol?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: blockchain_contract */
    ["blockchain_contract_pk_columns_input"]: {
        id: string;
    };
    /** select columns of table "blockchain_contract" */
    ["blockchain_contract_select_column"]: blockchain_contract_select_column;
    /** input type for updating data in table "blockchain_contract" */
    ["blockchain_contract_set_input"]: {
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        name?: string;
        supports_eip721_metadata?: boolean;
        symbol?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "blockchain_contract" */
    ["blockchain_contract_update_column"]: blockchain_contract_update_column;
    ["bytea"]: any;
    /** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
    ["bytea_comparison_exp"]: {
        _eq?: GraphQLTypes["bytea"];
        _gt?: GraphQLTypes["bytea"];
        _gte?: GraphQLTypes["bytea"];
        _in?: Array<GraphQLTypes["bytea"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["bytea"];
        _lte?: GraphQLTypes["bytea"];
        _neq?: GraphQLTypes["bytea"];
        _nin?: Array<GraphQLTypes["bytea"]>;
    };
    /** columns and relationships of "content" */
    ["content"]: {
        __typename: "content";
        cid: string;
        dag_size?: GraphQLTypes["bigint"];
        inserted_at: GraphQLTypes["timestamptz"];
        /** An array relationship */
        pins: Array<GraphQLTypes["pin"]>;
        /** An aggregate relationship */
        pins_aggregate: GraphQLTypes["pin_aggregate"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "content" */
    ["content_aggregate"]: {
        __typename: "content_aggregate";
        aggregate?: GraphQLTypes["content_aggregate_fields"];
        nodes: Array<GraphQLTypes["content"]>;
    };
    /** aggregate fields of "content" */
    ["content_aggregate_fields"]: {
        __typename: "content_aggregate_fields";
        avg?: GraphQLTypes["content_avg_fields"];
        count: number;
        max?: GraphQLTypes["content_max_fields"];
        min?: GraphQLTypes["content_min_fields"];
        stddev?: GraphQLTypes["content_stddev_fields"];
        stddev_pop?: GraphQLTypes["content_stddev_pop_fields"];
        stddev_samp?: GraphQLTypes["content_stddev_samp_fields"];
        sum?: GraphQLTypes["content_sum_fields"];
        var_pop?: GraphQLTypes["content_var_pop_fields"];
        var_samp?: GraphQLTypes["content_var_samp_fields"];
        variance?: GraphQLTypes["content_variance_fields"];
    };
    /** aggregate avg on columns */
    ["content_avg_fields"]: {
        __typename: "content_avg_fields";
        dag_size?: number;
    };
    /** Boolean expression to filter rows from the table "content". All fields are combined with a logical 'AND'. */
    ["content_bool_exp"]: {
        _and?: Array<GraphQLTypes["content_bool_exp"]>;
        _not?: GraphQLTypes["content_bool_exp"];
        _or?: Array<GraphQLTypes["content_bool_exp"]>;
        cid?: GraphQLTypes["String_comparison_exp"];
        dag_size?: GraphQLTypes["bigint_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        pins?: GraphQLTypes["pin_bool_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "content" */
    ["content_constraint"]: content_constraint;
    /** input type for incrementing numeric columns in table "content" */
    ["content_inc_input"]: {
        dag_size?: GraphQLTypes["bigint"];
    };
    /** input type for inserting data into table "content" */
    ["content_insert_input"]: {
        cid?: string;
        dag_size?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        pins?: GraphQLTypes["pin_arr_rel_insert_input"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["content_max_fields"]: {
        __typename: "content_max_fields";
        cid?: string;
        dag_size?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["content_min_fields"]: {
        __typename: "content_min_fields";
        cid?: string;
        dag_size?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "content" */
    ["content_mutation_response"]: {
        __typename: "content_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["content"]>;
    };
    /** input type for inserting object relation for remote table "content" */
    ["content_obj_rel_insert_input"]: {
        data: GraphQLTypes["content_insert_input"];
        /** on conflict condition */
        on_conflict?: GraphQLTypes["content_on_conflict"];
    };
    /** on conflict condition type for table "content" */
    ["content_on_conflict"]: {
        constraint: GraphQLTypes["content_constraint"];
        update_columns: Array<GraphQLTypes["content_update_column"]>;
        where?: GraphQLTypes["content_bool_exp"];
    };
    /** Ordering options when selecting data from "content". */
    ["content_order_by"]: {
        cid?: GraphQLTypes["order_by"];
        dag_size?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        pins_aggregate?: GraphQLTypes["pin_aggregate_order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: content */
    ["content_pk_columns_input"]: {
        cid: string;
    };
    /** select columns of table "content" */
    ["content_select_column"]: content_select_column;
    /** input type for updating data in table "content" */
    ["content_set_input"]: {
        cid?: string;
        dag_size?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate stddev on columns */
    ["content_stddev_fields"]: {
        __typename: "content_stddev_fields";
        dag_size?: number;
    };
    /** aggregate stddev_pop on columns */
    ["content_stddev_pop_fields"]: {
        __typename: "content_stddev_pop_fields";
        dag_size?: number;
    };
    /** aggregate stddev_samp on columns */
    ["content_stddev_samp_fields"]: {
        __typename: "content_stddev_samp_fields";
        dag_size?: number;
    };
    /** aggregate sum on columns */
    ["content_sum_fields"]: {
        __typename: "content_sum_fields";
        dag_size?: GraphQLTypes["bigint"];
    };
    /** update columns of table "content" */
    ["content_update_column"]: content_update_column;
    /** aggregate var_pop on columns */
    ["content_var_pop_fields"]: {
        __typename: "content_var_pop_fields";
        dag_size?: number;
    };
    /** aggregate var_samp on columns */
    ["content_var_samp_fields"]: {
        __typename: "content_var_samp_fields";
        dag_size?: number;
    };
    /** aggregate variance on columns */
    ["content_variance_fields"]: {
        __typename: "content_variance_fields";
        dag_size?: number;
    };
    /** columns and relationships of "erc721_import" */
    ["erc721_import"]: {
        __typename: "erc721_import";
        id: string;
        inserted_at: GraphQLTypes["timestamptz"];
        next_id: string;
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "erc721_import" */
    ["erc721_import_aggregate"]: {
        __typename: "erc721_import_aggregate";
        aggregate?: GraphQLTypes["erc721_import_aggregate_fields"];
        nodes: Array<GraphQLTypes["erc721_import"]>;
    };
    /** aggregate fields of "erc721_import" */
    ["erc721_import_aggregate_fields"]: {
        __typename: "erc721_import_aggregate_fields";
        count: number;
        max?: GraphQLTypes["erc721_import_max_fields"];
        min?: GraphQLTypes["erc721_import_min_fields"];
    };
    /** Boolean expression to filter rows from the table "erc721_import". All fields are combined with a logical 'AND'. */
    ["erc721_import_bool_exp"]: {
        _and?: Array<GraphQLTypes["erc721_import_bool_exp"]>;
        _not?: GraphQLTypes["erc721_import_bool_exp"];
        _or?: Array<GraphQLTypes["erc721_import_bool_exp"]>;
        id?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        next_id?: GraphQLTypes["String_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** columns and relationships of "erc721_import_by_nft" */
    ["erc721_import_by_nft"]: {
        __typename: "erc721_import_by_nft";
        erc721_import_id: string;
        inserted_at: GraphQLTypes["timestamptz"];
        nft_id: string;
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "erc721_import_by_nft" */
    ["erc721_import_by_nft_aggregate"]: {
        __typename: "erc721_import_by_nft_aggregate";
        aggregate?: GraphQLTypes["erc721_import_by_nft_aggregate_fields"];
        nodes: Array<GraphQLTypes["erc721_import_by_nft"]>;
    };
    /** aggregate fields of "erc721_import_by_nft" */
    ["erc721_import_by_nft_aggregate_fields"]: {
        __typename: "erc721_import_by_nft_aggregate_fields";
        count: number;
        max?: GraphQLTypes["erc721_import_by_nft_max_fields"];
        min?: GraphQLTypes["erc721_import_by_nft_min_fields"];
    };
    /** Boolean expression to filter rows from the table "erc721_import_by_nft". All fields are combined with a logical 'AND'. */
    ["erc721_import_by_nft_bool_exp"]: {
        _and?: Array<GraphQLTypes["erc721_import_by_nft_bool_exp"]>;
        _not?: GraphQLTypes["erc721_import_by_nft_bool_exp"];
        _or?: Array<GraphQLTypes["erc721_import_by_nft_bool_exp"]>;
        erc721_import_id?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        nft_id?: GraphQLTypes["String_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "erc721_import_by_nft" */
    ["erc721_import_by_nft_constraint"]: erc721_import_by_nft_constraint;
    /** input type for inserting data into table "erc721_import_by_nft" */
    ["erc721_import_by_nft_insert_input"]: {
        erc721_import_id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["erc721_import_by_nft_max_fields"]: {
        __typename: "erc721_import_by_nft_max_fields";
        erc721_import_id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["erc721_import_by_nft_min_fields"]: {
        __typename: "erc721_import_by_nft_min_fields";
        erc721_import_id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "erc721_import_by_nft" */
    ["erc721_import_by_nft_mutation_response"]: {
        __typename: "erc721_import_by_nft_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["erc721_import_by_nft"]>;
    };
    /** on conflict condition type for table "erc721_import_by_nft" */
    ["erc721_import_by_nft_on_conflict"]: {
        constraint: GraphQLTypes["erc721_import_by_nft_constraint"];
        update_columns: Array<GraphQLTypes["erc721_import_by_nft_update_column"]>;
        where?: GraphQLTypes["erc721_import_by_nft_bool_exp"];
    };
    /** Ordering options when selecting data from "erc721_import_by_nft". */
    ["erc721_import_by_nft_order_by"]: {
        erc721_import_id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        nft_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: erc721_import_by_nft */
    ["erc721_import_by_nft_pk_columns_input"]: {
        erc721_import_id: string;
        nft_id: string;
    };
    /** select columns of table "erc721_import_by_nft" */
    ["erc721_import_by_nft_select_column"]: erc721_import_by_nft_select_column;
    /** input type for updating data in table "erc721_import_by_nft" */
    ["erc721_import_by_nft_set_input"]: {
        erc721_import_id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "erc721_import_by_nft" */
    ["erc721_import_by_nft_update_column"]: erc721_import_by_nft_update_column;
    /** unique or primary key constraints on table "erc721_import" */
    ["erc721_import_constraint"]: erc721_import_constraint;
    /** input type for inserting data into table "erc721_import" */
    ["erc721_import_insert_input"]: {
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        next_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["erc721_import_max_fields"]: {
        __typename: "erc721_import_max_fields";
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        next_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["erc721_import_min_fields"]: {
        __typename: "erc721_import_min_fields";
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        next_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "erc721_import" */
    ["erc721_import_mutation_response"]: {
        __typename: "erc721_import_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["erc721_import"]>;
    };
    /** on conflict condition type for table "erc721_import" */
    ["erc721_import_on_conflict"]: {
        constraint: GraphQLTypes["erc721_import_constraint"];
        update_columns: Array<GraphQLTypes["erc721_import_update_column"]>;
        where?: GraphQLTypes["erc721_import_bool_exp"];
    };
    /** Ordering options when selecting data from "erc721_import". */
    ["erc721_import_order_by"]: {
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        next_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: erc721_import */
    ["erc721_import_pk_columns_input"]: {
        id: string;
    };
    /** select columns of table "erc721_import" */
    ["erc721_import_select_column"]: erc721_import_select_column;
    /** input type for updating data in table "erc721_import" */
    ["erc721_import_set_input"]: {
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        next_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "erc721_import" */
    ["erc721_import_update_column"]: erc721_import_update_column;
    ["fail_nft_asset_args"]: {
        ipfs_url?: string;
        status?: GraphQLTypes["nft_asset_status"];
        status_text?: string;
        token_uri_hash?: string;
    };
    ["fail_resource_args"]: {
        ipfs_url?: string;
        status?: GraphQLTypes["resource_status"];
        status_text?: string;
        uri_hash?: GraphQLTypes["bytea"];
    };
    ["ingest_erc721_token_args"]: {
        block_hash?: string;
        block_number?: GraphQLTypes["bigint"];
        contract_id?: string;
        contract_name?: string;
        contract_supports_eip721_metadata?: boolean;
        contract_symbol?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        mint_time?: GraphQLTypes["timestamptz"];
        owner_id?: string;
        token_id?: string;
        token_uri?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    ["jsonb"]: any;
    /** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
    ["jsonb_comparison_exp"]: {
        /** is the column contained in the given json value */
        _contained_in?: GraphQLTypes["jsonb"];
        /** does the column contain the given json value at the top level */
        _contains?: GraphQLTypes["jsonb"];
        _eq?: GraphQLTypes["jsonb"];
        _gt?: GraphQLTypes["jsonb"];
        _gte?: GraphQLTypes["jsonb"];
        /** does the string exist as a top-level key in the column */
        _has_key?: string;
        /** do all of these strings exist as top-level keys in the column */
        _has_keys_all?: Array<string>;
        /** do any of these strings exist as top-level keys in the column */
        _has_keys_any?: Array<string>;
        _in?: Array<GraphQLTypes["jsonb"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["jsonb"];
        _lte?: GraphQLTypes["jsonb"];
        _neq?: GraphQLTypes["jsonb"];
        _nin?: Array<GraphQLTypes["jsonb"]>;
    };
    ["link_nft_resource_args"]: {
        cid?: string;
        uri?: string;
    };
    ["link_resource_content_args"]: {
        cid?: string;
        dag_size?: GraphQLTypes["bigint"];
        ipfs_url?: string;
        pin_service?: GraphQLTypes["pin_service"];
        status_text?: string;
        uri_hash?: GraphQLTypes["bytea"];
    };
    /** mutation root */
    ["mutation_root"]: {
        __typename: "mutation_root";
        /** delete data from the table: "blockchain_block" */
        delete_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** delete single row from the table: "blockchain_block" */
        delete_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** delete data from the table: "blockchain_contract" */
        delete_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** delete single row from the table: "blockchain_contract" */
        delete_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** delete data from the table: "content" */
        delete_content?: GraphQLTypes["content_mutation_response"];
        /** delete single row from the table: "content" */
        delete_content_by_pk?: GraphQLTypes["content"];
        /** delete data from the table: "erc721_import" */
        delete_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** delete data from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** delete single row from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** delete single row from the table: "erc721_import" */
        delete_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** delete data from the table: "nft" */
        delete_nft?: GraphQLTypes["nft_mutation_response"];
        /** delete data from the table: "nft_asset" */
        delete_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** delete single row from the table: "nft_asset" */
        delete_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** delete single row from the table: "nft" */
        delete_nft_by_pk?: GraphQLTypes["nft"];
        /** delete data from the table: "nft_metadata" */
        delete_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** delete single row from the table: "nft_metadata" */
        delete_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** delete data from the table: "nft_ownership" */
        delete_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** delete single row from the table: "nft_ownership" */
        delete_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** delete data from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** delete single row from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** delete data from the table: "niftysave_migration" */
        delete_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** delete single row from the table: "niftysave_migration" */
        delete_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** delete data from the table: "other_nft_resources" */
        delete_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** delete single row from the table: "other_nft_resources" */
        delete_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** delete data from the table: "pin" */
        delete_pin?: GraphQLTypes["pin_mutation_response"];
        /** delete single row from the table: "pin" */
        delete_pin_by_pk?: GraphQLTypes["pin"];
        /** delete data from the table: "resource" */
        delete_resource?: GraphQLTypes["resource_mutation_response"];
        /** delete single row from the table: "resource" */
        delete_resource_by_pk?: GraphQLTypes["resource"];
        /** execute VOLATILE function "fail_nft_asset" which returns "nft_asset" */
        fail_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "fail_resource" which returns "resource" */
        fail_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "ingest_erc721_token" which returns "nft" */
        ingest_erc721_token: Array<GraphQLTypes["nft"]>;
        /** insert data into the table: "blockchain_block" */
        insert_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** insert a single row into the table: "blockchain_block" */
        insert_blockchain_block_one?: GraphQLTypes["blockchain_block"];
        /** insert data into the table: "blockchain_contract" */
        insert_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** insert a single row into the table: "blockchain_contract" */
        insert_blockchain_contract_one?: GraphQLTypes["blockchain_contract"];
        /** insert data into the table: "content" */
        insert_content?: GraphQLTypes["content_mutation_response"];
        /** insert a single row into the table: "content" */
        insert_content_one?: GraphQLTypes["content"];
        /** insert data into the table: "erc721_import" */
        insert_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** insert data into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** insert a single row into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft_one?: GraphQLTypes["erc721_import_by_nft"];
        /** insert a single row into the table: "erc721_import" */
        insert_erc721_import_one?: GraphQLTypes["erc721_import"];
        /** insert data into the table: "nft" */
        insert_nft?: GraphQLTypes["nft_mutation_response"];
        /** insert data into the table: "nft_asset" */
        insert_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** insert a single row into the table: "nft_asset" */
        insert_nft_asset_one?: GraphQLTypes["nft_asset"];
        /** insert data into the table: "nft_metadata" */
        insert_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** insert a single row into the table: "nft_metadata" */
        insert_nft_metadata_one?: GraphQLTypes["nft_metadata"];
        /** insert a single row into the table: "nft" */
        insert_nft_one?: GraphQLTypes["nft"];
        /** insert data into the table: "nft_ownership" */
        insert_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** insert a single row into the table: "nft_ownership" */
        insert_nft_ownership_one?: GraphQLTypes["nft_ownership"];
        /** insert data into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** insert a single row into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks_one?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** insert data into the table: "niftysave_migration" */
        insert_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** insert a single row into the table: "niftysave_migration" */
        insert_niftysave_migration_one?: GraphQLTypes["niftysave_migration"];
        /** insert data into the table: "other_nft_resources" */
        insert_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** insert a single row into the table: "other_nft_resources" */
        insert_other_nft_resources_one?: GraphQLTypes["other_nft_resources"];
        /** insert data into the table: "pin" */
        insert_pin?: GraphQLTypes["pin_mutation_response"];
        /** insert a single row into the table: "pin" */
        insert_pin_one?: GraphQLTypes["pin"];
        /** insert data into the table: "resource" */
        insert_resource?: GraphQLTypes["resource_mutation_response"];
        /** insert a single row into the table: "resource" */
        insert_resource_one?: GraphQLTypes["resource"];
        /** execute VOLATILE function "link_nft_resource" which returns "resource" */
        link_nft_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "link_resource_content" which returns "resource" */
        link_resource_content: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "parse_nft_asset" which returns "nft_asset" */
        parse_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "queue_resource" which returns "resource" */
        queue_resource: Array<GraphQLTypes["resource"]>;
        /** update data of the table: "blockchain_block" */
        update_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** update single row of the table: "blockchain_block" */
        update_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** update data of the table: "blockchain_contract" */
        update_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** update single row of the table: "blockchain_contract" */
        update_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** update data of the table: "content" */
        update_content?: GraphQLTypes["content_mutation_response"];
        /** update single row of the table: "content" */
        update_content_by_pk?: GraphQLTypes["content"];
        /** update data of the table: "erc721_import" */
        update_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** update data of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** update single row of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** update single row of the table: "erc721_import" */
        update_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** update data of the table: "nft" */
        update_nft?: GraphQLTypes["nft_mutation_response"];
        /** update data of the table: "nft_asset" */
        update_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** update single row of the table: "nft_asset" */
        update_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** update single row of the table: "nft" */
        update_nft_by_pk?: GraphQLTypes["nft"];
        /** update data of the table: "nft_metadata" */
        update_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** update single row of the table: "nft_metadata" */
        update_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** update data of the table: "nft_ownership" */
        update_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** update single row of the table: "nft_ownership" */
        update_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** update data of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** update single row of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** update data of the table: "niftysave_migration" */
        update_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** update single row of the table: "niftysave_migration" */
        update_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** update data of the table: "other_nft_resources" */
        update_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** update single row of the table: "other_nft_resources" */
        update_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** update data of the table: "pin" */
        update_pin?: GraphQLTypes["pin_mutation_response"];
        /** update single row of the table: "pin" */
        update_pin_by_pk?: GraphQLTypes["pin"];
        /** update data of the table: "resource" */
        update_resource?: GraphQLTypes["resource_mutation_response"];
        /** update single row of the table: "resource" */
        update_resource_by_pk?: GraphQLTypes["resource"];
    };
    /** columns and relationships of "nft" */
    ["nft"]: {
        __typename: "nft";
        /** An object relationship */
        contract: GraphQLTypes["blockchain_contract"];
        contract_id: string;
        id: string;
        inserted_at: GraphQLTypes["timestamptz"];
        mint_time: GraphQLTypes["timestamptz"];
        /** An object relationship */
        nft_asset: GraphQLTypes["nft_asset"];
        /** An array relationship */
        referrer_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** An aggregate relationship */
        referrer_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        token_id: string;
        token_uri_hash: GraphQLTypes["bytea"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "nft" */
    ["nft_aggregate"]: {
        __typename: "nft_aggregate";
        aggregate?: GraphQLTypes["nft_aggregate_fields"];
        nodes: Array<GraphQLTypes["nft"]>;
    };
    /** aggregate fields of "nft" */
    ["nft_aggregate_fields"]: {
        __typename: "nft_aggregate_fields";
        count: number;
        max?: GraphQLTypes["nft_max_fields"];
        min?: GraphQLTypes["nft_min_fields"];
    };
    /** order by aggregate values of table "nft" */
    ["nft_aggregate_order_by"]: {
        count?: GraphQLTypes["order_by"];
        max?: GraphQLTypes["nft_max_order_by"];
        min?: GraphQLTypes["nft_min_order_by"];
    };
    /** input type for inserting array relation for remote table "nft" */
    ["nft_arr_rel_insert_input"]: {
        data: Array<GraphQLTypes["nft_insert_input"]>;
        /** on conflict condition */
        on_conflict?: GraphQLTypes["nft_on_conflict"];
    };
    /** columns and relationships of "nft_asset" */
    ["nft_asset"]: {
        __typename: "nft_asset";
        inserted_at: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        /** An object relationship */
        metadata?: GraphQLTypes["nft_metadata"];
        metadata_cid?: string;
        /** An array relationship */
        nfts: Array<GraphQLTypes["nft"]>;
        /** An aggregate relationship */
        nfts_aggregate: GraphQLTypes["nft_aggregate"];
        status: GraphQLTypes["nft_asset_status"];
        status_text: string;
        token_uri: string;
        token_uri_hash: GraphQLTypes["bytea"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "nft_asset" */
    ["nft_asset_aggregate"]: {
        __typename: "nft_asset_aggregate";
        aggregate?: GraphQLTypes["nft_asset_aggregate_fields"];
        nodes: Array<GraphQLTypes["nft_asset"]>;
    };
    /** aggregate fields of "nft_asset" */
    ["nft_asset_aggregate_fields"]: {
        __typename: "nft_asset_aggregate_fields";
        count: number;
        max?: GraphQLTypes["nft_asset_max_fields"];
        min?: GraphQLTypes["nft_asset_min_fields"];
    };
    /** order by aggregate values of table "nft_asset" */
    ["nft_asset_aggregate_order_by"]: {
        count?: GraphQLTypes["order_by"];
        max?: GraphQLTypes["nft_asset_max_order_by"];
        min?: GraphQLTypes["nft_asset_min_order_by"];
    };
    /** input type for inserting array relation for remote table "nft_asset" */
    ["nft_asset_arr_rel_insert_input"]: {
        data: Array<GraphQLTypes["nft_asset_insert_input"]>;
        /** on conflict condition */
        on_conflict?: GraphQLTypes["nft_asset_on_conflict"];
    };
    /** Boolean expression to filter rows from the table "nft_asset". All fields are combined with a logical 'AND'. */
    ["nft_asset_bool_exp"]: {
        _and?: Array<GraphQLTypes["nft_asset_bool_exp"]>;
        _not?: GraphQLTypes["nft_asset_bool_exp"];
        _or?: Array<GraphQLTypes["nft_asset_bool_exp"]>;
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        ipfs_url?: GraphQLTypes["String_comparison_exp"];
        metadata?: GraphQLTypes["nft_metadata_bool_exp"];
        metadata_cid?: GraphQLTypes["String_comparison_exp"];
        nfts?: GraphQLTypes["nft_bool_exp"];
        status?: GraphQLTypes["nft_asset_status_comparison_exp"];
        status_text?: GraphQLTypes["String_comparison_exp"];
        token_uri?: GraphQLTypes["String_comparison_exp"];
        token_uri_hash?: GraphQLTypes["bytea_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "nft_asset" */
    ["nft_asset_constraint"]: nft_asset_constraint;
    /** input type for inserting data into table "nft_asset" */
    ["nft_asset_insert_input"]: {
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        metadata?: GraphQLTypes["nft_metadata_obj_rel_insert_input"];
        metadata_cid?: string;
        nfts?: GraphQLTypes["nft_arr_rel_insert_input"];
        status?: GraphQLTypes["nft_asset_status"];
        status_text?: string;
        token_uri?: string;
        token_uri_hash?: GraphQLTypes["bytea"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["nft_asset_max_fields"]: {
        __typename: "nft_asset_max_fields";
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        metadata_cid?: string;
        status_text?: string;
        token_uri?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by max() on columns of table "nft_asset" */
    ["nft_asset_max_order_by"]: {
        inserted_at?: GraphQLTypes["order_by"];
        ipfs_url?: GraphQLTypes["order_by"];
        metadata_cid?: GraphQLTypes["order_by"];
        status_text?: GraphQLTypes["order_by"];
        token_uri?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** aggregate min on columns */
    ["nft_asset_min_fields"]: {
        __typename: "nft_asset_min_fields";
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        metadata_cid?: string;
        status_text?: string;
        token_uri?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by min() on columns of table "nft_asset" */
    ["nft_asset_min_order_by"]: {
        inserted_at?: GraphQLTypes["order_by"];
        ipfs_url?: GraphQLTypes["order_by"];
        metadata_cid?: GraphQLTypes["order_by"];
        status_text?: GraphQLTypes["order_by"];
        token_uri?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** response of any mutation on the table "nft_asset" */
    ["nft_asset_mutation_response"]: {
        __typename: "nft_asset_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["nft_asset"]>;
    };
    /** input type for inserting object relation for remote table "nft_asset" */
    ["nft_asset_obj_rel_insert_input"]: {
        data: GraphQLTypes["nft_asset_insert_input"];
        /** on conflict condition */
        on_conflict?: GraphQLTypes["nft_asset_on_conflict"];
    };
    /** on conflict condition type for table "nft_asset" */
    ["nft_asset_on_conflict"]: {
        constraint: GraphQLTypes["nft_asset_constraint"];
        update_columns: Array<GraphQLTypes["nft_asset_update_column"]>;
        where?: GraphQLTypes["nft_asset_bool_exp"];
    };
    /** Ordering options when selecting data from "nft_asset". */
    ["nft_asset_order_by"]: {
        inserted_at?: GraphQLTypes["order_by"];
        ipfs_url?: GraphQLTypes["order_by"];
        metadata?: GraphQLTypes["nft_metadata_order_by"];
        metadata_cid?: GraphQLTypes["order_by"];
        nfts_aggregate?: GraphQLTypes["nft_aggregate_order_by"];
        status?: GraphQLTypes["order_by"];
        status_text?: GraphQLTypes["order_by"];
        token_uri?: GraphQLTypes["order_by"];
        token_uri_hash?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: nft_asset */
    ["nft_asset_pk_columns_input"]: {
        token_uri_hash: GraphQLTypes["bytea"];
    };
    /** select columns of table "nft_asset" */
    ["nft_asset_select_column"]: nft_asset_select_column;
    /** input type for updating data in table "nft_asset" */
    ["nft_asset_set_input"]: {
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        metadata_cid?: string;
        status?: GraphQLTypes["nft_asset_status"];
        status_text?: string;
        token_uri?: string;
        token_uri_hash?: GraphQLTypes["bytea"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    ["nft_asset_status"]: any;
    /** Boolean expression to compare columns of type "nft_asset_status". All fields are combined with logical 'AND'. */
    ["nft_asset_status_comparison_exp"]: {
        _eq?: GraphQLTypes["nft_asset_status"];
        _gt?: GraphQLTypes["nft_asset_status"];
        _gte?: GraphQLTypes["nft_asset_status"];
        _in?: Array<GraphQLTypes["nft_asset_status"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["nft_asset_status"];
        _lte?: GraphQLTypes["nft_asset_status"];
        _neq?: GraphQLTypes["nft_asset_status"];
        _nin?: Array<GraphQLTypes["nft_asset_status"]>;
    };
    /** update columns of table "nft_asset" */
    ["nft_asset_update_column"]: nft_asset_update_column;
    /** Boolean expression to filter rows from the table "nft". All fields are combined with a logical 'AND'. */
    ["nft_bool_exp"]: {
        _and?: Array<GraphQLTypes["nft_bool_exp"]>;
        _not?: GraphQLTypes["nft_bool_exp"];
        _or?: Array<GraphQLTypes["nft_bool_exp"]>;
        contract?: GraphQLTypes["blockchain_contract_bool_exp"];
        contract_id?: GraphQLTypes["String_comparison_exp"];
        id?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        mint_time?: GraphQLTypes["timestamptz_comparison_exp"];
        nft_asset?: GraphQLTypes["nft_asset_bool_exp"];
        referrer_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_bool_exp"];
        token_id?: GraphQLTypes["String_comparison_exp"];
        token_uri_hash?: GraphQLTypes["bytea_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "nft" */
    ["nft_constraint"]: nft_constraint;
    /** input type for inserting data into table "nft" */
    ["nft_insert_input"]: {
        contract?: GraphQLTypes["blockchain_contract_obj_rel_insert_input"];
        contract_id?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        mint_time?: GraphQLTypes["timestamptz"];
        nft_asset?: GraphQLTypes["nft_asset_obj_rel_insert_input"];
        referrer_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_arr_rel_insert_input"];
        token_id?: string;
        token_uri_hash?: GraphQLTypes["bytea"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["nft_max_fields"]: {
        __typename: "nft_max_fields";
        contract_id?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        mint_time?: GraphQLTypes["timestamptz"];
        token_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by max() on columns of table "nft" */
    ["nft_max_order_by"]: {
        contract_id?: GraphQLTypes["order_by"];
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        mint_time?: GraphQLTypes["order_by"];
        token_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** columns and relationships of "nft_metadata" */
    ["nft_metadata"]: {
        __typename: "nft_metadata";
        cid: string;
        /** An object relationship */
        content: GraphQLTypes["content"];
        description?: string;
        /** An object relationship */
        image?: GraphQLTypes["resource"];
        image_uri_hash?: GraphQLTypes["bytea"];
        inserted_at: GraphQLTypes["timestamptz"];
        json?: GraphQLTypes["jsonb"];
        name?: string;
        /** An array relationship */
        nft_assets: Array<GraphQLTypes["nft_asset"]>;
        /** An aggregate relationship */
        nft_assets_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "nft_metadata" */
    ["nft_metadata_aggregate"]: {
        __typename: "nft_metadata_aggregate";
        aggregate?: GraphQLTypes["nft_metadata_aggregate_fields"];
        nodes: Array<GraphQLTypes["nft_metadata"]>;
    };
    /** aggregate fields of "nft_metadata" */
    ["nft_metadata_aggregate_fields"]: {
        __typename: "nft_metadata_aggregate_fields";
        count: number;
        max?: GraphQLTypes["nft_metadata_max_fields"];
        min?: GraphQLTypes["nft_metadata_min_fields"];
    };
    /** append existing jsonb value of filtered columns with new jsonb value */
    ["nft_metadata_append_input"]: {
        json?: GraphQLTypes["jsonb"];
    };
    /** Boolean expression to filter rows from the table "nft_metadata". All fields are combined with a logical 'AND'. */
    ["nft_metadata_bool_exp"]: {
        _and?: Array<GraphQLTypes["nft_metadata_bool_exp"]>;
        _not?: GraphQLTypes["nft_metadata_bool_exp"];
        _or?: Array<GraphQLTypes["nft_metadata_bool_exp"]>;
        cid?: GraphQLTypes["String_comparison_exp"];
        content?: GraphQLTypes["content_bool_exp"];
        description?: GraphQLTypes["String_comparison_exp"];
        image?: GraphQLTypes["resource_bool_exp"];
        image_uri_hash?: GraphQLTypes["bytea_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        json?: GraphQLTypes["jsonb_comparison_exp"];
        name?: GraphQLTypes["String_comparison_exp"];
        nft_assets?: GraphQLTypes["nft_asset_bool_exp"];
        other_nft_resources?: GraphQLTypes["other_nft_resources_bool_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "nft_metadata" */
    ["nft_metadata_constraint"]: nft_metadata_constraint;
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    ["nft_metadata_delete_at_path_input"]: {
        json?: Array<string>;
    };
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    ["nft_metadata_delete_elem_input"]: {
        json?: number;
    };
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    ["nft_metadata_delete_key_input"]: {
        json?: string;
    };
    /** input type for inserting data into table "nft_metadata" */
    ["nft_metadata_insert_input"]: {
        cid?: string;
        content?: GraphQLTypes["content_obj_rel_insert_input"];
        description?: string;
        image?: GraphQLTypes["resource_obj_rel_insert_input"];
        image_uri_hash?: GraphQLTypes["bytea"];
        inserted_at?: GraphQLTypes["timestamptz"];
        json?: GraphQLTypes["jsonb"];
        name?: string;
        nft_assets?: GraphQLTypes["nft_asset_arr_rel_insert_input"];
        other_nft_resources?: GraphQLTypes["other_nft_resources_arr_rel_insert_input"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["nft_metadata_max_fields"]: {
        __typename: "nft_metadata_max_fields";
        cid?: string;
        description?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        name?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["nft_metadata_min_fields"]: {
        __typename: "nft_metadata_min_fields";
        cid?: string;
        description?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        name?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "nft_metadata" */
    ["nft_metadata_mutation_response"]: {
        __typename: "nft_metadata_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["nft_metadata"]>;
    };
    /** input type for inserting object relation for remote table "nft_metadata" */
    ["nft_metadata_obj_rel_insert_input"]: {
        data: GraphQLTypes["nft_metadata_insert_input"];
        /** on conflict condition */
        on_conflict?: GraphQLTypes["nft_metadata_on_conflict"];
    };
    /** on conflict condition type for table "nft_metadata" */
    ["nft_metadata_on_conflict"]: {
        constraint: GraphQLTypes["nft_metadata_constraint"];
        update_columns: Array<GraphQLTypes["nft_metadata_update_column"]>;
        where?: GraphQLTypes["nft_metadata_bool_exp"];
    };
    /** Ordering options when selecting data from "nft_metadata". */
    ["nft_metadata_order_by"]: {
        cid?: GraphQLTypes["order_by"];
        content?: GraphQLTypes["content_order_by"];
        description?: GraphQLTypes["order_by"];
        image?: GraphQLTypes["resource_order_by"];
        image_uri_hash?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        json?: GraphQLTypes["order_by"];
        name?: GraphQLTypes["order_by"];
        nft_assets_aggregate?: GraphQLTypes["nft_asset_aggregate_order_by"];
        other_nft_resources_aggregate?: GraphQLTypes["other_nft_resources_aggregate_order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: nft_metadata */
    ["nft_metadata_pk_columns_input"]: {
        cid: string;
    };
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    ["nft_metadata_prepend_input"]: {
        json?: GraphQLTypes["jsonb"];
    };
    /** select columns of table "nft_metadata" */
    ["nft_metadata_select_column"]: nft_metadata_select_column;
    /** input type for updating data in table "nft_metadata" */
    ["nft_metadata_set_input"]: {
        cid?: string;
        description?: string;
        image_uri_hash?: GraphQLTypes["bytea"];
        inserted_at?: GraphQLTypes["timestamptz"];
        json?: GraphQLTypes["jsonb"];
        name?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "nft_metadata" */
    ["nft_metadata_update_column"]: nft_metadata_update_column;
    /** aggregate min on columns */
    ["nft_min_fields"]: {
        __typename: "nft_min_fields";
        contract_id?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        mint_time?: GraphQLTypes["timestamptz"];
        token_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by min() on columns of table "nft" */
    ["nft_min_order_by"]: {
        contract_id?: GraphQLTypes["order_by"];
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        mint_time?: GraphQLTypes["order_by"];
        token_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** response of any mutation on the table "nft" */
    ["nft_mutation_response"]: {
        __typename: "nft_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["nft"]>;
    };
    /** on conflict condition type for table "nft" */
    ["nft_on_conflict"]: {
        constraint: GraphQLTypes["nft_constraint"];
        update_columns: Array<GraphQLTypes["nft_update_column"]>;
        where?: GraphQLTypes["nft_bool_exp"];
    };
    /** Ordering options when selecting data from "nft". */
    ["nft_order_by"]: {
        contract?: GraphQLTypes["blockchain_contract_order_by"];
        contract_id?: GraphQLTypes["order_by"];
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        mint_time?: GraphQLTypes["order_by"];
        nft_asset?: GraphQLTypes["nft_asset_order_by"];
        referrer_blocks_aggregate?: GraphQLTypes["nfts_by_blockchain_blocks_aggregate_order_by"];
        token_id?: GraphQLTypes["order_by"];
        token_uri_hash?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** columns and relationships of "nft_ownership" */
    ["nft_ownership"]: {
        __typename: "nft_ownership";
        block_number: GraphQLTypes["bigint"];
        inserted_at: GraphQLTypes["timestamptz"];
        nft_id: string;
        owner_id: string;
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "nft_ownership" */
    ["nft_ownership_aggregate"]: {
        __typename: "nft_ownership_aggregate";
        aggregate?: GraphQLTypes["nft_ownership_aggregate_fields"];
        nodes: Array<GraphQLTypes["nft_ownership"]>;
    };
    /** aggregate fields of "nft_ownership" */
    ["nft_ownership_aggregate_fields"]: {
        __typename: "nft_ownership_aggregate_fields";
        avg?: GraphQLTypes["nft_ownership_avg_fields"];
        count: number;
        max?: GraphQLTypes["nft_ownership_max_fields"];
        min?: GraphQLTypes["nft_ownership_min_fields"];
        stddev?: GraphQLTypes["nft_ownership_stddev_fields"];
        stddev_pop?: GraphQLTypes["nft_ownership_stddev_pop_fields"];
        stddev_samp?: GraphQLTypes["nft_ownership_stddev_samp_fields"];
        sum?: GraphQLTypes["nft_ownership_sum_fields"];
        var_pop?: GraphQLTypes["nft_ownership_var_pop_fields"];
        var_samp?: GraphQLTypes["nft_ownership_var_samp_fields"];
        variance?: GraphQLTypes["nft_ownership_variance_fields"];
    };
    /** aggregate avg on columns */
    ["nft_ownership_avg_fields"]: {
        __typename: "nft_ownership_avg_fields";
        block_number?: number;
    };
    /** Boolean expression to filter rows from the table "nft_ownership". All fields are combined with a logical 'AND'. */
    ["nft_ownership_bool_exp"]: {
        _and?: Array<GraphQLTypes["nft_ownership_bool_exp"]>;
        _not?: GraphQLTypes["nft_ownership_bool_exp"];
        _or?: Array<GraphQLTypes["nft_ownership_bool_exp"]>;
        block_number?: GraphQLTypes["bigint_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        nft_id?: GraphQLTypes["String_comparison_exp"];
        owner_id?: GraphQLTypes["String_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "nft_ownership" */
    ["nft_ownership_constraint"]: nft_ownership_constraint;
    /** input type for incrementing numeric columns in table "nft_ownership" */
    ["nft_ownership_inc_input"]: {
        block_number?: GraphQLTypes["bigint"];
    };
    /** input type for inserting data into table "nft_ownership" */
    ["nft_ownership_insert_input"]: {
        block_number?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        owner_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["nft_ownership_max_fields"]: {
        __typename: "nft_ownership_max_fields";
        block_number?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        owner_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["nft_ownership_min_fields"]: {
        __typename: "nft_ownership_min_fields";
        block_number?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        owner_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "nft_ownership" */
    ["nft_ownership_mutation_response"]: {
        __typename: "nft_ownership_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["nft_ownership"]>;
    };
    /** on conflict condition type for table "nft_ownership" */
    ["nft_ownership_on_conflict"]: {
        constraint: GraphQLTypes["nft_ownership_constraint"];
        update_columns: Array<GraphQLTypes["nft_ownership_update_column"]>;
        where?: GraphQLTypes["nft_ownership_bool_exp"];
    };
    /** Ordering options when selecting data from "nft_ownership". */
    ["nft_ownership_order_by"]: {
        block_number?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        nft_id?: GraphQLTypes["order_by"];
        owner_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: nft_ownership */
    ["nft_ownership_pk_columns_input"]: {
        block_number: GraphQLTypes["bigint"];
        nft_id: string;
        owner_id: string;
    };
    /** select columns of table "nft_ownership" */
    ["nft_ownership_select_column"]: nft_ownership_select_column;
    /** input type for updating data in table "nft_ownership" */
    ["nft_ownership_set_input"]: {
        block_number?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        owner_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate stddev on columns */
    ["nft_ownership_stddev_fields"]: {
        __typename: "nft_ownership_stddev_fields";
        block_number?: number;
    };
    /** aggregate stddev_pop on columns */
    ["nft_ownership_stddev_pop_fields"]: {
        __typename: "nft_ownership_stddev_pop_fields";
        block_number?: number;
    };
    /** aggregate stddev_samp on columns */
    ["nft_ownership_stddev_samp_fields"]: {
        __typename: "nft_ownership_stddev_samp_fields";
        block_number?: number;
    };
    /** aggregate sum on columns */
    ["nft_ownership_sum_fields"]: {
        __typename: "nft_ownership_sum_fields";
        block_number?: GraphQLTypes["bigint"];
    };
    /** update columns of table "nft_ownership" */
    ["nft_ownership_update_column"]: nft_ownership_update_column;
    /** aggregate var_pop on columns */
    ["nft_ownership_var_pop_fields"]: {
        __typename: "nft_ownership_var_pop_fields";
        block_number?: number;
    };
    /** aggregate var_samp on columns */
    ["nft_ownership_var_samp_fields"]: {
        __typename: "nft_ownership_var_samp_fields";
        block_number?: number;
    };
    /** aggregate variance on columns */
    ["nft_ownership_variance_fields"]: {
        __typename: "nft_ownership_variance_fields";
        block_number?: number;
    };
    /** primary key columns input for table: nft */
    ["nft_pk_columns_input"]: {
        id: string;
    };
    /** select columns of table "nft" */
    ["nft_select_column"]: nft_select_column;
    /** input type for updating data in table "nft" */
    ["nft_set_input"]: {
        contract_id?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        mint_time?: GraphQLTypes["timestamptz"];
        token_id?: string;
        token_uri_hash?: GraphQLTypes["bytea"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "nft" */
    ["nft_update_column"]: nft_update_column;
    /** columns and relationships of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks"]: {
        __typename: "nfts_by_blockchain_blocks";
        blockchain_block_hash: string;
        inserted_at: GraphQLTypes["timestamptz"];
        nft_id: string;
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate"]: {
        __typename: "nfts_by_blockchain_blocks_aggregate";
        aggregate?: GraphQLTypes["nfts_by_blockchain_blocks_aggregate_fields"];
        nodes: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
    };
    /** aggregate fields of "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate_fields"]: {
        __typename: "nfts_by_blockchain_blocks_aggregate_fields";
        count: number;
        max?: GraphQLTypes["nfts_by_blockchain_blocks_max_fields"];
        min?: GraphQLTypes["nfts_by_blockchain_blocks_min_fields"];
    };
    /** order by aggregate values of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_aggregate_order_by"]: {
        count?: GraphQLTypes["order_by"];
        max?: GraphQLTypes["nfts_by_blockchain_blocks_max_order_by"];
        min?: GraphQLTypes["nfts_by_blockchain_blocks_min_order_by"];
    };
    /** input type for inserting array relation for remote table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_arr_rel_insert_input"]: {
        data: Array<GraphQLTypes["nfts_by_blockchain_blocks_insert_input"]>;
        /** on conflict condition */
        on_conflict?: GraphQLTypes["nfts_by_blockchain_blocks_on_conflict"];
    };
    /** Boolean expression to filter rows from the table "nfts_by_blockchain_blocks". All fields are combined with a logical 'AND'. */
    ["nfts_by_blockchain_blocks_bool_exp"]: {
        _and?: Array<GraphQLTypes["nfts_by_blockchain_blocks_bool_exp"]>;
        _not?: GraphQLTypes["nfts_by_blockchain_blocks_bool_exp"];
        _or?: Array<GraphQLTypes["nfts_by_blockchain_blocks_bool_exp"]>;
        blockchain_block_hash?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        nft_id?: GraphQLTypes["String_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_constraint"]: nfts_by_blockchain_blocks_constraint;
    /** input type for inserting data into table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_insert_input"]: {
        blockchain_block_hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["nfts_by_blockchain_blocks_max_fields"]: {
        __typename: "nfts_by_blockchain_blocks_max_fields";
        blockchain_block_hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by max() on columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_max_order_by"]: {
        blockchain_block_hash?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        nft_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** aggregate min on columns */
    ["nfts_by_blockchain_blocks_min_fields"]: {
        __typename: "nfts_by_blockchain_blocks_min_fields";
        blockchain_block_hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by min() on columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_min_order_by"]: {
        blockchain_block_hash?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        nft_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** response of any mutation on the table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_mutation_response"]: {
        __typename: "nfts_by_blockchain_blocks_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
    };
    /** on conflict condition type for table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_on_conflict"]: {
        constraint: GraphQLTypes["nfts_by_blockchain_blocks_constraint"];
        update_columns: Array<GraphQLTypes["nfts_by_blockchain_blocks_update_column"]>;
        where?: GraphQLTypes["nfts_by_blockchain_blocks_bool_exp"];
    };
    /** Ordering options when selecting data from "nfts_by_blockchain_blocks". */
    ["nfts_by_blockchain_blocks_order_by"]: {
        blockchain_block_hash?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        nft_id?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: nfts_by_blockchain_blocks */
    ["nfts_by_blockchain_blocks_pk_columns_input"]: {
        blockchain_block_hash: string;
        nft_id: string;
    };
    /** select columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_select_column"]: nfts_by_blockchain_blocks_select_column;
    /** input type for updating data in table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_set_input"]: {
        blockchain_block_hash?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        nft_id?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "nfts_by_blockchain_blocks" */
    ["nfts_by_blockchain_blocks_update_column"]: nfts_by_blockchain_blocks_update_column;
    /** Utility table to keep track of migrations


columns and relationships of "niftysave_migration" */
    ["niftysave_migration"]: {
        __typename: "niftysave_migration";
        collection: string;
        cursor?: string;
        id: string;
        inserted_at: GraphQLTypes["timestamptz"];
        metadata: GraphQLTypes["jsonb"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "niftysave_migration" */
    ["niftysave_migration_aggregate"]: {
        __typename: "niftysave_migration_aggregate";
        aggregate?: GraphQLTypes["niftysave_migration_aggregate_fields"];
        nodes: Array<GraphQLTypes["niftysave_migration"]>;
    };
    /** aggregate fields of "niftysave_migration" */
    ["niftysave_migration_aggregate_fields"]: {
        __typename: "niftysave_migration_aggregate_fields";
        count: number;
        max?: GraphQLTypes["niftysave_migration_max_fields"];
        min?: GraphQLTypes["niftysave_migration_min_fields"];
    };
    /** append existing jsonb value of filtered columns with new jsonb value */
    ["niftysave_migration_append_input"]: {
        metadata?: GraphQLTypes["jsonb"];
    };
    /** Boolean expression to filter rows from the table "niftysave_migration". All fields are combined with a logical 'AND'. */
    ["niftysave_migration_bool_exp"]: {
        _and?: Array<GraphQLTypes["niftysave_migration_bool_exp"]>;
        _not?: GraphQLTypes["niftysave_migration_bool_exp"];
        _or?: Array<GraphQLTypes["niftysave_migration_bool_exp"]>;
        collection?: GraphQLTypes["String_comparison_exp"];
        cursor?: GraphQLTypes["String_comparison_exp"];
        id?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        metadata?: GraphQLTypes["jsonb_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "niftysave_migration" */
    ["niftysave_migration_constraint"]: niftysave_migration_constraint;
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    ["niftysave_migration_delete_at_path_input"]: {
        metadata?: Array<string>;
    };
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    ["niftysave_migration_delete_elem_input"]: {
        metadata?: number;
    };
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    ["niftysave_migration_delete_key_input"]: {
        metadata?: string;
    };
    /** input type for inserting data into table "niftysave_migration" */
    ["niftysave_migration_insert_input"]: {
        collection?: string;
        cursor?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        metadata?: GraphQLTypes["jsonb"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["niftysave_migration_max_fields"]: {
        __typename: "niftysave_migration_max_fields";
        collection?: string;
        cursor?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate min on columns */
    ["niftysave_migration_min_fields"]: {
        __typename: "niftysave_migration_min_fields";
        collection?: string;
        cursor?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** response of any mutation on the table "niftysave_migration" */
    ["niftysave_migration_mutation_response"]: {
        __typename: "niftysave_migration_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["niftysave_migration"]>;
    };
    /** on conflict condition type for table "niftysave_migration" */
    ["niftysave_migration_on_conflict"]: {
        constraint: GraphQLTypes["niftysave_migration_constraint"];
        update_columns: Array<GraphQLTypes["niftysave_migration_update_column"]>;
        where?: GraphQLTypes["niftysave_migration_bool_exp"];
    };
    /** Ordering options when selecting data from "niftysave_migration". */
    ["niftysave_migration_order_by"]: {
        collection?: GraphQLTypes["order_by"];
        cursor?: GraphQLTypes["order_by"];
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        metadata?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: niftysave_migration */
    ["niftysave_migration_pk_columns_input"]: {
        id: string;
    };
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    ["niftysave_migration_prepend_input"]: {
        metadata?: GraphQLTypes["jsonb"];
    };
    /** select columns of table "niftysave_migration" */
    ["niftysave_migration_select_column"]: niftysave_migration_select_column;
    /** input type for updating data in table "niftysave_migration" */
    ["niftysave_migration_set_input"]: {
        collection?: string;
        cursor?: string;
        id?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        metadata?: GraphQLTypes["jsonb"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "niftysave_migration" */
    ["niftysave_migration_update_column"]: niftysave_migration_update_column;
    /** column ordering options */
    ["order_by"]: order_by;
    /** columns and relationships of "other_nft_resources" */
    ["other_nft_resources"]: {
        __typename: "other_nft_resources";
        inserted_at: GraphQLTypes["timestamptz"];
        /** An object relationship */
        metadata: GraphQLTypes["nft_metadata"];
        metadata_cid: string;
        /** An object relationship */
        resource?: GraphQLTypes["resource"];
        resource_uri_hash: GraphQLTypes["bytea"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "other_nft_resources" */
    ["other_nft_resources_aggregate"]: {
        __typename: "other_nft_resources_aggregate";
        aggregate?: GraphQLTypes["other_nft_resources_aggregate_fields"];
        nodes: Array<GraphQLTypes["other_nft_resources"]>;
    };
    /** aggregate fields of "other_nft_resources" */
    ["other_nft_resources_aggregate_fields"]: {
        __typename: "other_nft_resources_aggregate_fields";
        count: number;
        max?: GraphQLTypes["other_nft_resources_max_fields"];
        min?: GraphQLTypes["other_nft_resources_min_fields"];
    };
    /** order by aggregate values of table "other_nft_resources" */
    ["other_nft_resources_aggregate_order_by"]: {
        count?: GraphQLTypes["order_by"];
        max?: GraphQLTypes["other_nft_resources_max_order_by"];
        min?: GraphQLTypes["other_nft_resources_min_order_by"];
    };
    /** input type for inserting array relation for remote table "other_nft_resources" */
    ["other_nft_resources_arr_rel_insert_input"]: {
        data: Array<GraphQLTypes["other_nft_resources_insert_input"]>;
        /** on conflict condition */
        on_conflict?: GraphQLTypes["other_nft_resources_on_conflict"];
    };
    /** Boolean expression to filter rows from the table "other_nft_resources". All fields are combined with a logical 'AND'. */
    ["other_nft_resources_bool_exp"]: {
        _and?: Array<GraphQLTypes["other_nft_resources_bool_exp"]>;
        _not?: GraphQLTypes["other_nft_resources_bool_exp"];
        _or?: Array<GraphQLTypes["other_nft_resources_bool_exp"]>;
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        metadata?: GraphQLTypes["nft_metadata_bool_exp"];
        metadata_cid?: GraphQLTypes["String_comparison_exp"];
        resource?: GraphQLTypes["resource_bool_exp"];
        resource_uri_hash?: GraphQLTypes["bytea_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "other_nft_resources" */
    ["other_nft_resources_constraint"]: other_nft_resources_constraint;
    /** input type for inserting data into table "other_nft_resources" */
    ["other_nft_resources_insert_input"]: {
        inserted_at?: GraphQLTypes["timestamptz"];
        metadata?: GraphQLTypes["nft_metadata_obj_rel_insert_input"];
        metadata_cid?: string;
        resource?: GraphQLTypes["resource_obj_rel_insert_input"];
        resource_uri_hash?: GraphQLTypes["bytea"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["other_nft_resources_max_fields"]: {
        __typename: "other_nft_resources_max_fields";
        inserted_at?: GraphQLTypes["timestamptz"];
        metadata_cid?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by max() on columns of table "other_nft_resources" */
    ["other_nft_resources_max_order_by"]: {
        inserted_at?: GraphQLTypes["order_by"];
        metadata_cid?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** aggregate min on columns */
    ["other_nft_resources_min_fields"]: {
        __typename: "other_nft_resources_min_fields";
        inserted_at?: GraphQLTypes["timestamptz"];
        metadata_cid?: string;
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by min() on columns of table "other_nft_resources" */
    ["other_nft_resources_min_order_by"]: {
        inserted_at?: GraphQLTypes["order_by"];
        metadata_cid?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** response of any mutation on the table "other_nft_resources" */
    ["other_nft_resources_mutation_response"]: {
        __typename: "other_nft_resources_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["other_nft_resources"]>;
    };
    /** on conflict condition type for table "other_nft_resources" */
    ["other_nft_resources_on_conflict"]: {
        constraint: GraphQLTypes["other_nft_resources_constraint"];
        update_columns: Array<GraphQLTypes["other_nft_resources_update_column"]>;
        where?: GraphQLTypes["other_nft_resources_bool_exp"];
    };
    /** Ordering options when selecting data from "other_nft_resources". */
    ["other_nft_resources_order_by"]: {
        inserted_at?: GraphQLTypes["order_by"];
        metadata?: GraphQLTypes["nft_metadata_order_by"];
        metadata_cid?: GraphQLTypes["order_by"];
        resource?: GraphQLTypes["resource_order_by"];
        resource_uri_hash?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: other_nft_resources */
    ["other_nft_resources_pk_columns_input"]: {
        metadata_cid: string;
        resource_uri_hash: GraphQLTypes["bytea"];
    };
    /** select columns of table "other_nft_resources" */
    ["other_nft_resources_select_column"]: other_nft_resources_select_column;
    /** input type for updating data in table "other_nft_resources" */
    ["other_nft_resources_set_input"]: {
        inserted_at?: GraphQLTypes["timestamptz"];
        metadata_cid?: string;
        resource_uri_hash?: GraphQLTypes["bytea"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** update columns of table "other_nft_resources" */
    ["other_nft_resources_update_column"]: other_nft_resources_update_column;
    ["parse_nft_asset_args"]: {
        dag_size?: GraphQLTypes["bigint"];
        ipfs_url?: string;
        metadata?: GraphQLTypes["jsonb"];
        metadata_cid?: string;
        status?: GraphQLTypes["nft_asset_status"];
        status_text?: string;
        token_uri_hash?: string;
    };
    /** columns and relationships of "pin" */
    ["pin"]: {
        __typename: "pin";
        /** An object relationship */
        content: GraphQLTypes["content"];
        content_cid: string;
        id: GraphQLTypes["bigint"];
        inserted_at: GraphQLTypes["timestamptz"];
        service: GraphQLTypes["pin_service"];
        status: GraphQLTypes["pin_status"];
        updated_at: GraphQLTypes["timestamptz"];
    };
    /** aggregated selection of "pin" */
    ["pin_aggregate"]: {
        __typename: "pin_aggregate";
        aggregate?: GraphQLTypes["pin_aggregate_fields"];
        nodes: Array<GraphQLTypes["pin"]>;
    };
    /** aggregate fields of "pin" */
    ["pin_aggregate_fields"]: {
        __typename: "pin_aggregate_fields";
        avg?: GraphQLTypes["pin_avg_fields"];
        count: number;
        max?: GraphQLTypes["pin_max_fields"];
        min?: GraphQLTypes["pin_min_fields"];
        stddev?: GraphQLTypes["pin_stddev_fields"];
        stddev_pop?: GraphQLTypes["pin_stddev_pop_fields"];
        stddev_samp?: GraphQLTypes["pin_stddev_samp_fields"];
        sum?: GraphQLTypes["pin_sum_fields"];
        var_pop?: GraphQLTypes["pin_var_pop_fields"];
        var_samp?: GraphQLTypes["pin_var_samp_fields"];
        variance?: GraphQLTypes["pin_variance_fields"];
    };
    /** order by aggregate values of table "pin" */
    ["pin_aggregate_order_by"]: {
        avg?: GraphQLTypes["pin_avg_order_by"];
        count?: GraphQLTypes["order_by"];
        max?: GraphQLTypes["pin_max_order_by"];
        min?: GraphQLTypes["pin_min_order_by"];
        stddev?: GraphQLTypes["pin_stddev_order_by"];
        stddev_pop?: GraphQLTypes["pin_stddev_pop_order_by"];
        stddev_samp?: GraphQLTypes["pin_stddev_samp_order_by"];
        sum?: GraphQLTypes["pin_sum_order_by"];
        var_pop?: GraphQLTypes["pin_var_pop_order_by"];
        var_samp?: GraphQLTypes["pin_var_samp_order_by"];
        variance?: GraphQLTypes["pin_variance_order_by"];
    };
    /** input type for inserting array relation for remote table "pin" */
    ["pin_arr_rel_insert_input"]: {
        data: Array<GraphQLTypes["pin_insert_input"]>;
        /** on conflict condition */
        on_conflict?: GraphQLTypes["pin_on_conflict"];
    };
    /** aggregate avg on columns */
    ["pin_avg_fields"]: {
        __typename: "pin_avg_fields";
        id?: number;
    };
    /** order by avg() on columns of table "pin" */
    ["pin_avg_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    /** Boolean expression to filter rows from the table "pin". All fields are combined with a logical 'AND'. */
    ["pin_bool_exp"]: {
        _and?: Array<GraphQLTypes["pin_bool_exp"]>;
        _not?: GraphQLTypes["pin_bool_exp"];
        _or?: Array<GraphQLTypes["pin_bool_exp"]>;
        content?: GraphQLTypes["content_bool_exp"];
        content_cid?: GraphQLTypes["String_comparison_exp"];
        id?: GraphQLTypes["bigint_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        service?: GraphQLTypes["pin_service_comparison_exp"];
        status?: GraphQLTypes["pin_status_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
    };
    /** unique or primary key constraints on table "pin" */
    ["pin_constraint"]: pin_constraint;
    /** input type for incrementing numeric columns in table "pin" */
    ["pin_inc_input"]: {
        id?: GraphQLTypes["bigint"];
    };
    /** input type for inserting data into table "pin" */
    ["pin_insert_input"]: {
        content?: GraphQLTypes["content_obj_rel_insert_input"];
        content_cid?: string;
        id?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        service?: GraphQLTypes["pin_service"];
        status?: GraphQLTypes["pin_status"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** aggregate max on columns */
    ["pin_max_fields"]: {
        __typename: "pin_max_fields";
        content_cid?: string;
        id?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by max() on columns of table "pin" */
    ["pin_max_order_by"]: {
        content_cid?: GraphQLTypes["order_by"];
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** aggregate min on columns */
    ["pin_min_fields"]: {
        __typename: "pin_min_fields";
        content_cid?: string;
        id?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    /** order by min() on columns of table "pin" */
    ["pin_min_order_by"]: {
        content_cid?: GraphQLTypes["order_by"];
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** response of any mutation on the table "pin" */
    ["pin_mutation_response"]: {
        __typename: "pin_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["pin"]>;
    };
    /** on conflict condition type for table "pin" */
    ["pin_on_conflict"]: {
        constraint: GraphQLTypes["pin_constraint"];
        update_columns: Array<GraphQLTypes["pin_update_column"]>;
        where?: GraphQLTypes["pin_bool_exp"];
    };
    /** Ordering options when selecting data from "pin". */
    ["pin_order_by"]: {
        content?: GraphQLTypes["content_order_by"];
        content_cid?: GraphQLTypes["order_by"];
        id?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        service?: GraphQLTypes["order_by"];
        status?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: pin */
    ["pin_pk_columns_input"]: {
        id: GraphQLTypes["bigint"];
    };
    /** select columns of table "pin" */
    ["pin_select_column"]: pin_select_column;
    ["pin_service"]: any;
    /** Boolean expression to compare columns of type "pin_service". All fields are combined with logical 'AND'. */
    ["pin_service_comparison_exp"]: {
        _eq?: GraphQLTypes["pin_service"];
        _gt?: GraphQLTypes["pin_service"];
        _gte?: GraphQLTypes["pin_service"];
        _in?: Array<GraphQLTypes["pin_service"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["pin_service"];
        _lte?: GraphQLTypes["pin_service"];
        _neq?: GraphQLTypes["pin_service"];
        _nin?: Array<GraphQLTypes["pin_service"]>;
    };
    /** input type for updating data in table "pin" */
    ["pin_set_input"]: {
        content_cid?: string;
        id?: GraphQLTypes["bigint"];
        inserted_at?: GraphQLTypes["timestamptz"];
        service?: GraphQLTypes["pin_service"];
        status?: GraphQLTypes["pin_status"];
        updated_at?: GraphQLTypes["timestamptz"];
    };
    ["pin_status"]: any;
    /** Boolean expression to compare columns of type "pin_status". All fields are combined with logical 'AND'. */
    ["pin_status_comparison_exp"]: {
        _eq?: GraphQLTypes["pin_status"];
        _gt?: GraphQLTypes["pin_status"];
        _gte?: GraphQLTypes["pin_status"];
        _in?: Array<GraphQLTypes["pin_status"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["pin_status"];
        _lte?: GraphQLTypes["pin_status"];
        _neq?: GraphQLTypes["pin_status"];
        _nin?: Array<GraphQLTypes["pin_status"]>;
    };
    /** aggregate stddev on columns */
    ["pin_stddev_fields"]: {
        __typename: "pin_stddev_fields";
        id?: number;
    };
    /** order by stddev() on columns of table "pin" */
    ["pin_stddev_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    /** aggregate stddev_pop on columns */
    ["pin_stddev_pop_fields"]: {
        __typename: "pin_stddev_pop_fields";
        id?: number;
    };
    /** order by stddev_pop() on columns of table "pin" */
    ["pin_stddev_pop_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    /** aggregate stddev_samp on columns */
    ["pin_stddev_samp_fields"]: {
        __typename: "pin_stddev_samp_fields";
        id?: number;
    };
    /** order by stddev_samp() on columns of table "pin" */
    ["pin_stddev_samp_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    /** aggregate sum on columns */
    ["pin_sum_fields"]: {
        __typename: "pin_sum_fields";
        id?: GraphQLTypes["bigint"];
    };
    /** order by sum() on columns of table "pin" */
    ["pin_sum_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    /** update columns of table "pin" */
    ["pin_update_column"]: pin_update_column;
    /** aggregate var_pop on columns */
    ["pin_var_pop_fields"]: {
        __typename: "pin_var_pop_fields";
        id?: number;
    };
    /** order by var_pop() on columns of table "pin" */
    ["pin_var_pop_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    /** aggregate var_samp on columns */
    ["pin_var_samp_fields"]: {
        __typename: "pin_var_samp_fields";
        id?: number;
    };
    /** order by var_samp() on columns of table "pin" */
    ["pin_var_samp_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    /** aggregate variance on columns */
    ["pin_variance_fields"]: {
        __typename: "pin_variance_fields";
        id?: number;
    };
    /** order by variance() on columns of table "pin" */
    ["pin_variance_order_by"]: {
        id?: GraphQLTypes["order_by"];
    };
    ["query_root"]: {
        __typename: "query_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    };
    ["queue_resource_args"]: {
        content_cid?: string;
        ipfs_url?: string;
        uri?: string;
    };
    /** columns and relationships of "resource" */
    ["resource"]: {
        __typename: "resource";
        /** An object relationship */
        content?: GraphQLTypes["content"];
        content_cid?: string;
        inserted_at: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        /** An array relationship */
        referrer_metadata: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        referrer_metadata_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        status: GraphQLTypes["resource_status"];
        status_text?: string;
        updated_at: GraphQLTypes["timestamptz"];
        uri: string;
        uri_hash: GraphQLTypes["bytea"];
    };
    /** aggregated selection of "resource" */
    ["resource_aggregate"]: {
        __typename: "resource_aggregate";
        aggregate?: GraphQLTypes["resource_aggregate_fields"];
        nodes: Array<GraphQLTypes["resource"]>;
    };
    /** aggregate fields of "resource" */
    ["resource_aggregate_fields"]: {
        __typename: "resource_aggregate_fields";
        count: number;
        max?: GraphQLTypes["resource_max_fields"];
        min?: GraphQLTypes["resource_min_fields"];
    };
    /** Boolean expression to filter rows from the table "resource". All fields are combined with a logical 'AND'. */
    ["resource_bool_exp"]: {
        _and?: Array<GraphQLTypes["resource_bool_exp"]>;
        _not?: GraphQLTypes["resource_bool_exp"];
        _or?: Array<GraphQLTypes["resource_bool_exp"]>;
        content?: GraphQLTypes["content_bool_exp"];
        content_cid?: GraphQLTypes["String_comparison_exp"];
        inserted_at?: GraphQLTypes["timestamptz_comparison_exp"];
        ipfs_url?: GraphQLTypes["String_comparison_exp"];
        referrer_metadata?: GraphQLTypes["other_nft_resources_bool_exp"];
        status?: GraphQLTypes["resource_status_comparison_exp"];
        status_text?: GraphQLTypes["String_comparison_exp"];
        updated_at?: GraphQLTypes["timestamptz_comparison_exp"];
        uri?: GraphQLTypes["String_comparison_exp"];
        uri_hash?: GraphQLTypes["bytea_comparison_exp"];
    };
    /** unique or primary key constraints on table "resource" */
    ["resource_constraint"]: resource_constraint;
    /** input type for inserting data into table "resource" */
    ["resource_insert_input"]: {
        content?: GraphQLTypes["content_obj_rel_insert_input"];
        content_cid?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        referrer_metadata?: GraphQLTypes["other_nft_resources_arr_rel_insert_input"];
        status?: GraphQLTypes["resource_status"];
        status_text?: string;
        updated_at?: GraphQLTypes["timestamptz"];
        uri?: string;
        uri_hash?: GraphQLTypes["bytea"];
    };
    /** aggregate max on columns */
    ["resource_max_fields"]: {
        __typename: "resource_max_fields";
        content_cid?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        status_text?: string;
        updated_at?: GraphQLTypes["timestamptz"];
        uri?: string;
    };
    /** aggregate min on columns */
    ["resource_min_fields"]: {
        __typename: "resource_min_fields";
        content_cid?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        status_text?: string;
        updated_at?: GraphQLTypes["timestamptz"];
        uri?: string;
    };
    /** response of any mutation on the table "resource" */
    ["resource_mutation_response"]: {
        __typename: "resource_mutation_response";
        /** number of rows affected by the mutation */
        affected_rows: number;
        /** data from the rows affected by the mutation */
        returning: Array<GraphQLTypes["resource"]>;
    };
    /** input type for inserting object relation for remote table "resource" */
    ["resource_obj_rel_insert_input"]: {
        data: GraphQLTypes["resource_insert_input"];
        /** on conflict condition */
        on_conflict?: GraphQLTypes["resource_on_conflict"];
    };
    /** on conflict condition type for table "resource" */
    ["resource_on_conflict"]: {
        constraint: GraphQLTypes["resource_constraint"];
        update_columns: Array<GraphQLTypes["resource_update_column"]>;
        where?: GraphQLTypes["resource_bool_exp"];
    };
    /** Ordering options when selecting data from "resource". */
    ["resource_order_by"]: {
        content?: GraphQLTypes["content_order_by"];
        content_cid?: GraphQLTypes["order_by"];
        inserted_at?: GraphQLTypes["order_by"];
        ipfs_url?: GraphQLTypes["order_by"];
        referrer_metadata_aggregate?: GraphQLTypes["other_nft_resources_aggregate_order_by"];
        status?: GraphQLTypes["order_by"];
        status_text?: GraphQLTypes["order_by"];
        updated_at?: GraphQLTypes["order_by"];
        uri?: GraphQLTypes["order_by"];
        uri_hash?: GraphQLTypes["order_by"];
    };
    /** primary key columns input for table: resource */
    ["resource_pk_columns_input"]: {
        uri_hash: GraphQLTypes["bytea"];
    };
    /** select columns of table "resource" */
    ["resource_select_column"]: resource_select_column;
    /** input type for updating data in table "resource" */
    ["resource_set_input"]: {
        content_cid?: string;
        inserted_at?: GraphQLTypes["timestamptz"];
        ipfs_url?: string;
        status?: GraphQLTypes["resource_status"];
        status_text?: string;
        updated_at?: GraphQLTypes["timestamptz"];
        uri?: string;
        uri_hash?: GraphQLTypes["bytea"];
    };
    ["resource_status"]: any;
    /** Boolean expression to compare columns of type "resource_status". All fields are combined with logical 'AND'. */
    ["resource_status_comparison_exp"]: {
        _eq?: GraphQLTypes["resource_status"];
        _gt?: GraphQLTypes["resource_status"];
        _gte?: GraphQLTypes["resource_status"];
        _in?: Array<GraphQLTypes["resource_status"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["resource_status"];
        _lte?: GraphQLTypes["resource_status"];
        _neq?: GraphQLTypes["resource_status"];
        _nin?: Array<GraphQLTypes["resource_status"]>;
    };
    /** update columns of table "resource" */
    ["resource_update_column"]: resource_update_column;
    ["subscription_root"]: {
        __typename: "subscription_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    };
    ["timestamptz"]: any;
    /** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
    ["timestamptz_comparison_exp"]: {
        _eq?: GraphQLTypes["timestamptz"];
        _gt?: GraphQLTypes["timestamptz"];
        _gte?: GraphQLTypes["timestamptz"];
        _in?: Array<GraphQLTypes["timestamptz"]>;
        _is_null?: boolean;
        _lt?: GraphQLTypes["timestamptz"];
        _lte?: GraphQLTypes["timestamptz"];
        _neq?: GraphQLTypes["timestamptz"];
        _nin?: Array<GraphQLTypes["timestamptz"]>;
    };
};
/** unique or primary key constraints on table "blockchain_block" */
export declare enum blockchain_block_constraint {
    blockchain_block_pkey = "blockchain_block_pkey",
    unique_blockchain_block_hash = "unique_blockchain_block_hash"
}
/** select columns of table "blockchain_block" */
export declare enum blockchain_block_select_column {
    hash = "hash",
    inserted_at = "inserted_at",
    number = "number",
    updated_at = "updated_at"
}
/** update columns of table "blockchain_block" */
export declare enum blockchain_block_update_column {
    hash = "hash",
    inserted_at = "inserted_at",
    number = "number",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "blockchain_contract" */
export declare enum blockchain_contract_constraint {
    blockchain_contract_pkey = "blockchain_contract_pkey"
}
/** select columns of table "blockchain_contract" */
export declare enum blockchain_contract_select_column {
    id = "id",
    inserted_at = "inserted_at",
    name = "name",
    supports_eip721_metadata = "supports_eip721_metadata",
    symbol = "symbol",
    updated_at = "updated_at"
}
/** update columns of table "blockchain_contract" */
export declare enum blockchain_contract_update_column {
    id = "id",
    inserted_at = "inserted_at",
    name = "name",
    supports_eip721_metadata = "supports_eip721_metadata",
    symbol = "symbol",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "content" */
export declare enum content_constraint {
    content_pkey = "content_pkey"
}
/** select columns of table "content" */
export declare enum content_select_column {
    cid = "cid",
    dag_size = "dag_size",
    inserted_at = "inserted_at",
    updated_at = "updated_at"
}
/** update columns of table "content" */
export declare enum content_update_column {
    cid = "cid",
    dag_size = "dag_size",
    inserted_at = "inserted_at",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "erc721_import_by_nft" */
export declare enum erc721_import_by_nft_constraint {
    erc721_import_by_nft_pkey = "erc721_import_by_nft_pkey"
}
/** select columns of table "erc721_import_by_nft" */
export declare enum erc721_import_by_nft_select_column {
    erc721_import_id = "erc721_import_id",
    inserted_at = "inserted_at",
    nft_id = "nft_id",
    updated_at = "updated_at"
}
/** update columns of table "erc721_import_by_nft" */
export declare enum erc721_import_by_nft_update_column {
    erc721_import_id = "erc721_import_id",
    inserted_at = "inserted_at",
    nft_id = "nft_id",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "erc721_import" */
export declare enum erc721_import_constraint {
    erc721_import_pkey = "erc721_import_pkey"
}
/** select columns of table "erc721_import" */
export declare enum erc721_import_select_column {
    id = "id",
    inserted_at = "inserted_at",
    next_id = "next_id",
    updated_at = "updated_at"
}
/** update columns of table "erc721_import" */
export declare enum erc721_import_update_column {
    id = "id",
    inserted_at = "inserted_at",
    next_id = "next_id",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "nft_asset" */
export declare enum nft_asset_constraint {
    nft_asset_pkey = "nft_asset_pkey"
}
/** select columns of table "nft_asset" */
export declare enum nft_asset_select_column {
    inserted_at = "inserted_at",
    ipfs_url = "ipfs_url",
    metadata_cid = "metadata_cid",
    status = "status",
    status_text = "status_text",
    token_uri = "token_uri",
    token_uri_hash = "token_uri_hash",
    updated_at = "updated_at"
}
/** update columns of table "nft_asset" */
export declare enum nft_asset_update_column {
    inserted_at = "inserted_at",
    ipfs_url = "ipfs_url",
    metadata_cid = "metadata_cid",
    status = "status",
    status_text = "status_text",
    token_uri = "token_uri",
    token_uri_hash = "token_uri_hash",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "nft" */
export declare enum nft_constraint {
    nft_pkey = "nft_pkey"
}
/** unique or primary key constraints on table "nft_metadata" */
export declare enum nft_metadata_constraint {
    nft_metadata_pkey = "nft_metadata_pkey"
}
/** select columns of table "nft_metadata" */
export declare enum nft_metadata_select_column {
    cid = "cid",
    description = "description",
    image_uri_hash = "image_uri_hash",
    inserted_at = "inserted_at",
    json = "json",
    name = "name",
    updated_at = "updated_at"
}
/** update columns of table "nft_metadata" */
export declare enum nft_metadata_update_column {
    cid = "cid",
    description = "description",
    image_uri_hash = "image_uri_hash",
    inserted_at = "inserted_at",
    json = "json",
    name = "name",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "nft_ownership" */
export declare enum nft_ownership_constraint {
    nft_ownership_pkey = "nft_ownership_pkey"
}
/** select columns of table "nft_ownership" */
export declare enum nft_ownership_select_column {
    block_number = "block_number",
    inserted_at = "inserted_at",
    nft_id = "nft_id",
    owner_id = "owner_id",
    updated_at = "updated_at"
}
/** update columns of table "nft_ownership" */
export declare enum nft_ownership_update_column {
    block_number = "block_number",
    inserted_at = "inserted_at",
    nft_id = "nft_id",
    owner_id = "owner_id",
    updated_at = "updated_at"
}
/** select columns of table "nft" */
export declare enum nft_select_column {
    contract_id = "contract_id",
    id = "id",
    inserted_at = "inserted_at",
    mint_time = "mint_time",
    token_id = "token_id",
    token_uri_hash = "token_uri_hash",
    updated_at = "updated_at"
}
/** update columns of table "nft" */
export declare enum nft_update_column {
    contract_id = "contract_id",
    id = "id",
    inserted_at = "inserted_at",
    mint_time = "mint_time",
    token_id = "token_id",
    token_uri_hash = "token_uri_hash",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "nfts_by_blockchain_blocks" */
export declare enum nfts_by_blockchain_blocks_constraint {
    nfts_by_blockchain_blocks_pkey = "nfts_by_blockchain_blocks_pkey"
}
/** select columns of table "nfts_by_blockchain_blocks" */
export declare enum nfts_by_blockchain_blocks_select_column {
    blockchain_block_hash = "blockchain_block_hash",
    inserted_at = "inserted_at",
    nft_id = "nft_id",
    updated_at = "updated_at"
}
/** update columns of table "nfts_by_blockchain_blocks" */
export declare enum nfts_by_blockchain_blocks_update_column {
    blockchain_block_hash = "blockchain_block_hash",
    inserted_at = "inserted_at",
    nft_id = "nft_id",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "niftysave_migration" */
export declare enum niftysave_migration_constraint {
    niftysave_migration_pkey = "niftysave_migration_pkey"
}
/** select columns of table "niftysave_migration" */
export declare enum niftysave_migration_select_column {
    collection = "collection",
    cursor = "cursor",
    id = "id",
    inserted_at = "inserted_at",
    metadata = "metadata",
    updated_at = "updated_at"
}
/** update columns of table "niftysave_migration" */
export declare enum niftysave_migration_update_column {
    collection = "collection",
    cursor = "cursor",
    id = "id",
    inserted_at = "inserted_at",
    metadata = "metadata",
    updated_at = "updated_at"
}
/** column ordering options */
export declare enum order_by {
    asc = "asc",
    asc_nulls_first = "asc_nulls_first",
    asc_nulls_last = "asc_nulls_last",
    desc = "desc",
    desc_nulls_first = "desc_nulls_first",
    desc_nulls_last = "desc_nulls_last"
}
/** unique or primary key constraints on table "other_nft_resources" */
export declare enum other_nft_resources_constraint {
    other_nft_resources_pkey = "other_nft_resources_pkey"
}
/** select columns of table "other_nft_resources" */
export declare enum other_nft_resources_select_column {
    inserted_at = "inserted_at",
    metadata_cid = "metadata_cid",
    resource_uri_hash = "resource_uri_hash",
    updated_at = "updated_at"
}
/** update columns of table "other_nft_resources" */
export declare enum other_nft_resources_update_column {
    inserted_at = "inserted_at",
    metadata_cid = "metadata_cid",
    resource_uri_hash = "resource_uri_hash",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "pin" */
export declare enum pin_constraint {
    pin_content_cid_service_key = "pin_content_cid_service_key",
    pin_pkey = "pin_pkey"
}
/** select columns of table "pin" */
export declare enum pin_select_column {
    content_cid = "content_cid",
    id = "id",
    inserted_at = "inserted_at",
    service = "service",
    status = "status",
    updated_at = "updated_at"
}
/** update columns of table "pin" */
export declare enum pin_update_column {
    content_cid = "content_cid",
    id = "id",
    inserted_at = "inserted_at",
    service = "service",
    status = "status",
    updated_at = "updated_at"
}
/** unique or primary key constraints on table "resource" */
export declare enum resource_constraint {
    resource_pkey = "resource_pkey"
}
/** select columns of table "resource" */
export declare enum resource_select_column {
    content_cid = "content_cid",
    inserted_at = "inserted_at",
    ipfs_url = "ipfs_url",
    status = "status",
    status_text = "status_text",
    updated_at = "updated_at",
    uri = "uri",
    uri_hash = "uri_hash"
}
/** update columns of table "resource" */
export declare enum resource_update_column {
    content_cid = "content_cid",
    inserted_at = "inserted_at",
    ipfs_url = "ipfs_url",
    status = "status",
    status_text = "status_text",
    updated_at = "updated_at",
    uri = "uri",
    uri_hash = "uri_hash"
}
export declare class GraphQLError extends Error {
    response: GraphQLResponse;
    constructor(response: GraphQLResponse);
    toString(): string;
}
export declare type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export declare type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<UnwrapPromise<ReturnType<T>>>;
export declare type ZeusHook<T extends (...args: any[]) => Record<string, (...args: any[]) => Promise<any>>, N extends keyof ReturnType<T>> = ZeusState<ReturnType<T>[N]>;
declare type WithTypeNameValue<T> = T & {
    __typename?: true;
};
declare type AliasType<T> = WithTypeNameValue<T> & {
    __alias?: Record<string, WithTypeNameValue<T>>;
};
export interface GraphQLResponse {
    data?: Record<string, any>;
    errors?: Array<{
        message: string;
    }>;
}
declare type DeepAnify<T> = {
    [P in keyof T]?: any;
};
declare type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
declare type IsArray<T, U> = T extends Array<infer R> ? InputType<R, U>[] : InputType<T, U>;
declare type FlattenArray<T> = T extends Array<infer R> ? R : T;
declare type IsInterfaced<SRC extends DeepAnify<DST>, DST> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS ? {
    [P in keyof SRC]: SRC[P] extends '__union' & infer R ? P extends keyof DST ? IsArray<R, '__typename' extends keyof DST ? DST[P] & {
        __typename: true;
    } : DST[P]> : {} : never;
}[keyof DST] & {
    [P in keyof Omit<Pick<SRC, {
        [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
    }[keyof DST]>, '__typename'>]: IsPayLoad<DST[P]> extends true ? SRC[P] : IsArray<SRC[P], DST[P]>;
} : {
    [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends true ? SRC[P] : IsArray<SRC[P], DST[P]>;
};
export declare type MapType<SRC, DST> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST> : never;
export declare type InputType<SRC, DST> = IsPayLoad<DST> extends {
    __alias: infer R;
} ? {
    [P in keyof R]: MapType<SRC, R[P]>;
} & MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>> : MapType<SRC, IsPayLoad<DST>>;
declare type Func<P extends any[], R> = (...args: P) => R;
declare type AnyFunc = Func<any, any>;
export declare type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;
export declare type OperationOptions = {
    variables?: Record<string, any>;
    operationName?: string;
};
export declare type OperationToGraphQL<V, T> = <Z extends V>(o: Z | V, options?: OperationOptions) => Promise<InputType<T, Z>>;
export declare type SubscriptionToGraphQL<V, T> = <Z extends V>(o: Z | V, options?: OperationOptions) => {
    ws: WebSocket;
    on: (fn: (args: InputType<T, Z>) => void) => void;
    off: (fn: (e: {
        data?: InputType<T, Z>;
        code?: number;
        reason?: string;
        message?: string;
    }) => void) => void;
    error: (fn: (e: {
        data?: InputType<T, Z>;
        errors?: string[];
    }) => void) => void;
    open: () => void;
};
export declare type SelectionFunction<V> = <T>(t: T | V) => T;
export declare type fetchOptions = ArgsType<typeof fetch>;
declare type websocketOptions = typeof WebSocket extends new (...args: infer R) => WebSocket ? R : never;
export declare type chainOptions = [fetchOptions[0], fetchOptions[1] & {
    websocket?: websocketOptions;
}] | [fetchOptions[0]];
export declare type FetchFunction = (query: string, variables?: Record<string, any>) => Promise<any>;
export declare type SubscriptionFunction = (query: string) => void;
declare type NotUndefined<T> = T extends undefined ? never : T;
export declare type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;
export declare const ZeusSelect: <T>() => SelectionFunction<T>;
export declare const ScalarResolver: (scalar: string, value: any) => string | false;
export declare const TypesPropsResolver: ({ value, type, name, key, blockArrays }: {
    value: any;
    type: string;
    name: string;
    key?: string;
    blockArrays?: boolean;
}) => string;
export declare const queryConstruct: (t: 'query' | 'mutation' | 'subscription', tName: string, operationName?: string) => (o: Record<any, any>) => string;
export declare const fullChainConstructor: <F extends FetchFunction, R extends keyof ValueTypes>(fn: F, operation: 'query' | 'mutation' | 'subscription', key: R) => OperationToGraphQL<ValueTypes[R], GraphQLTypes[R]>;
export declare const fullSubscriptionConstructor: <F extends SubscriptionFunction, R extends keyof ValueTypes>(fn: F, operation: 'query' | 'mutation' | 'subscription', key: R) => SubscriptionToGraphQL<ValueTypes[R], GraphQLTypes[R]>;
export declare const $: (t: TemplateStringsArray) => any;
export declare const resolverFor: <T extends keyof ValueTypes, Z extends keyof ValueTypes[T], Y extends (args: Required<ValueTypes[T]>[Z] extends [infer Input, any] ? Input : any, source: any) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> : any>(type: T, field: Z, fn: Y) => (args?: any, source?: any) => any;
export declare const apiFetch: (options: [input: RequestInfo, init?: RequestInit]) => (query: string, variables?: Record<string, any>) => Promise<Record<string, any>>;
export declare const apiSubscription: (options: chainOptions) => (query: string) => {
    ws: WebSocket;
    on: (e: (args: any) => void) => void;
    off: (e: (args: any) => void) => void;
    error: (e: (args: any) => void) => void;
    open: (e: () => void) => void;
};
export declare const Thunder: (fn: FetchFunction, subscriptionFn: SubscriptionFunction) => {
    query: OperationToGraphQL<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>, {
        __typename: "query_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    }>;
    mutation: OperationToGraphQL<AliasType<{
        delete_blockchain_block?: [
            {
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        delete_blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        delete_blockchain_contract?: [
            {
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        delete_blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        delete_content?: [
            {
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        delete_content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        delete_erc721_import?: [
            {
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        delete_erc721_import_by_nft?: [
            {
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        delete_erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        delete_erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        delete_nft?: [
            {
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        delete_nft_asset?: [
            {
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        delete_nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        delete_nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        delete_nft_metadata?: [
            {
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        delete_nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        delete_nft_ownership?: [
            {
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        delete_nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        delete_nfts_by_blockchain_blocks?: [
            {
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        delete_nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        delete_niftysave_migration?: [
            {
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        delete_niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        delete_other_nft_resources?: [
            {
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        delete_other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        delete_pin?: [
            {
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        delete_pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        delete_resource?: [
            {
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        delete_resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        fail_nft_asset?: [
            {
                args: ValueTypes["fail_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        fail_resource?: [
            {
                args: ValueTypes["fail_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        ingest_erc721_token?: [
            {
                args: ValueTypes["ingest_erc721_token_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_blockchain_block?: [
            {
                objects: ValueTypes["blockchain_block_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        insert_blockchain_block_one?: [
            {
                object: ValueTypes["blockchain_block_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        insert_blockchain_contract?: [
            {
                objects: ValueTypes["blockchain_contract_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        insert_blockchain_contract_one?: [
            {
                object: ValueTypes["blockchain_contract_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        insert_content?: [
            {
                objects: ValueTypes["content_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content_mutation_response"]
        ];
        insert_content_one?: [
            {
                object: ValueTypes["content_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content"]
        ];
        insert_erc721_import?: [
            {
                objects: ValueTypes["erc721_import_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        insert_erc721_import_by_nft?: [
            {
                objects: ValueTypes["erc721_import_by_nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        insert_erc721_import_by_nft_one?: [
            {
                object: ValueTypes["erc721_import_by_nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        insert_erc721_import_one?: [
            {
                object: ValueTypes["erc721_import_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        insert_nft?: [
            {
                objects: ValueTypes["nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft_mutation_response"]
        ];
        insert_nft_asset?: [
            {
                objects: ValueTypes["nft_asset_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        insert_nft_asset_one?: [
            {
                object: ValueTypes["nft_asset_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        insert_nft_metadata?: [
            {
                objects: ValueTypes["nft_metadata_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        insert_nft_metadata_one?: [
            {
                object: ValueTypes["nft_metadata_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        insert_nft_one?: [
            {
                object: ValueTypes["nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_nft_ownership?: [
            {
                objects: ValueTypes["nft_ownership_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        insert_nft_ownership_one?: [
            {
                object: ValueTypes["nft_ownership_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        insert_nfts_by_blockchain_blocks?: [
            {
                objects: ValueTypes["nfts_by_blockchain_blocks_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        insert_nfts_by_blockchain_blocks_one?: [
            {
                object: ValueTypes["nfts_by_blockchain_blocks_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        insert_niftysave_migration?: [
            {
                objects: ValueTypes["niftysave_migration_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        insert_niftysave_migration_one?: [
            {
                object: ValueTypes["niftysave_migration_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        insert_other_nft_resources?: [
            {
                objects: ValueTypes["other_nft_resources_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        insert_other_nft_resources_one?: [
            {
                object: ValueTypes["other_nft_resources_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        insert_pin?: [
            {
                objects: ValueTypes["pin_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin_mutation_response"]
        ];
        insert_pin_one?: [
            {
                object: ValueTypes["pin_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin"]
        ];
        insert_resource?: [
            {
                objects: ValueTypes["resource_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource_mutation_response"]
        ];
        insert_resource_one?: [
            {
                object: ValueTypes["resource_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource"]
        ];
        link_nft_resource?: [
            {
                args: ValueTypes["link_nft_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        link_resource_content?: [
            {
                args: ValueTypes["link_resource_content_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        parse_nft_asset?: [
            {
                args: ValueTypes["parse_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        queue_resource?: [
            {
                args: ValueTypes["queue_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        update_blockchain_block?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        update_blockchain_block_by_pk?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null;
                pk_columns: ValueTypes["blockchain_block_pk_columns_input"];
            },
            ValueTypes["blockchain_block"]
        ];
        update_blockchain_contract?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        update_blockchain_contract_by_pk?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null;
                pk_columns: ValueTypes["blockchain_contract_pk_columns_input"];
            },
            ValueTypes["blockchain_contract"]
        ];
        update_content?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        update_content_by_pk?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null;
                pk_columns: ValueTypes["content_pk_columns_input"];
            },
            ValueTypes["content"]
        ];
        update_erc721_import?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        update_erc721_import_by_nft?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        update_erc721_import_by_nft_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_by_nft_pk_columns_input"];
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        update_erc721_import_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_pk_columns_input"];
            },
            ValueTypes["erc721_import"]
        ];
        update_nft?: [
            {
                _set?: ValueTypes["nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        update_nft_asset?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        update_nft_asset_by_pk?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null;
                pk_columns: ValueTypes["nft_asset_pk_columns_input"];
            },
            ValueTypes["nft_asset"]
        ];
        update_nft_by_pk?: [
            {
                _set?: ValueTypes["nft_set_input"] | null;
                pk_columns: ValueTypes["nft_pk_columns_input"];
            },
            ValueTypes["nft"]
        ];
        update_nft_metadata?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        update_nft_metadata_by_pk?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null;
                pk_columns: ValueTypes["nft_metadata_pk_columns_input"];
            },
            ValueTypes["nft_metadata"]
        ];
        update_nft_ownership?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        update_nft_ownership_by_pk?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null;
                pk_columns: ValueTypes["nft_ownership_pk_columns_input"];
            },
            ValueTypes["nft_ownership"]
        ];
        update_nfts_by_blockchain_blocks?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        update_nfts_by_blockchain_blocks_by_pk?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null;
                pk_columns: ValueTypes["nfts_by_blockchain_blocks_pk_columns_input"];
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        update_niftysave_migration?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        update_niftysave_migration_by_pk?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null;
                pk_columns: ValueTypes["niftysave_migration_pk_columns_input"];
            },
            ValueTypes["niftysave_migration"]
        ];
        update_other_nft_resources?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        update_other_nft_resources_by_pk?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null;
                pk_columns: ValueTypes["other_nft_resources_pk_columns_input"];
            },
            ValueTypes["other_nft_resources"]
        ];
        update_pin?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        update_pin_by_pk?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null;
                pk_columns: ValueTypes["pin_pk_columns_input"];
            },
            ValueTypes["pin"]
        ];
        update_resource?: [
            {
                _set?: ValueTypes["resource_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        update_resource_by_pk?: [
            {
                _set?: ValueTypes["resource_set_input"] | null;
                pk_columns: ValueTypes["resource_pk_columns_input"];
            },
            ValueTypes["resource"]
        ];
        __typename?: true;
    }>, {
        __typename: "mutation_root";
        /** delete data from the table: "blockchain_block" */
        delete_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** delete single row from the table: "blockchain_block" */
        delete_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** delete data from the table: "blockchain_contract" */
        delete_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** delete single row from the table: "blockchain_contract" */
        delete_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** delete data from the table: "content" */
        delete_content?: GraphQLTypes["content_mutation_response"];
        /** delete single row from the table: "content" */
        delete_content_by_pk?: GraphQLTypes["content"];
        /** delete data from the table: "erc721_import" */
        delete_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** delete data from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** delete single row from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** delete single row from the table: "erc721_import" */
        delete_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** delete data from the table: "nft" */
        delete_nft?: GraphQLTypes["nft_mutation_response"];
        /** delete data from the table: "nft_asset" */
        delete_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** delete single row from the table: "nft_asset" */
        delete_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** delete single row from the table: "nft" */
        delete_nft_by_pk?: GraphQLTypes["nft"];
        /** delete data from the table: "nft_metadata" */
        delete_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** delete single row from the table: "nft_metadata" */
        delete_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** delete data from the table: "nft_ownership" */
        delete_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** delete single row from the table: "nft_ownership" */
        delete_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** delete data from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** delete single row from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** delete data from the table: "niftysave_migration" */
        delete_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** delete single row from the table: "niftysave_migration" */
        delete_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** delete data from the table: "other_nft_resources" */
        delete_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** delete single row from the table: "other_nft_resources" */
        delete_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** delete data from the table: "pin" */
        delete_pin?: GraphQLTypes["pin_mutation_response"];
        /** delete single row from the table: "pin" */
        delete_pin_by_pk?: GraphQLTypes["pin"];
        /** delete data from the table: "resource" */
        delete_resource?: GraphQLTypes["resource_mutation_response"];
        /** delete single row from the table: "resource" */
        delete_resource_by_pk?: GraphQLTypes["resource"];
        /** execute VOLATILE function "fail_nft_asset" which returns "nft_asset" */
        fail_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "fail_resource" which returns "resource" */
        fail_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "ingest_erc721_token" which returns "nft" */
        ingest_erc721_token: Array<GraphQLTypes["nft"]>;
        /** insert data into the table: "blockchain_block" */
        insert_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** insert a single row into the table: "blockchain_block" */
        insert_blockchain_block_one?: GraphQLTypes["blockchain_block"];
        /** insert data into the table: "blockchain_contract" */
        insert_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** insert a single row into the table: "blockchain_contract" */
        insert_blockchain_contract_one?: GraphQLTypes["blockchain_contract"];
        /** insert data into the table: "content" */
        insert_content?: GraphQLTypes["content_mutation_response"];
        /** insert a single row into the table: "content" */
        insert_content_one?: GraphQLTypes["content"];
        /** insert data into the table: "erc721_import" */
        insert_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** insert data into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** insert a single row into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft_one?: GraphQLTypes["erc721_import_by_nft"];
        /** insert a single row into the table: "erc721_import" */
        insert_erc721_import_one?: GraphQLTypes["erc721_import"];
        /** insert data into the table: "nft" */
        insert_nft?: GraphQLTypes["nft_mutation_response"];
        /** insert data into the table: "nft_asset" */
        insert_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** insert a single row into the table: "nft_asset" */
        insert_nft_asset_one?: GraphQLTypes["nft_asset"];
        /** insert data into the table: "nft_metadata" */
        insert_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** insert a single row into the table: "nft_metadata" */
        insert_nft_metadata_one?: GraphQLTypes["nft_metadata"];
        /** insert a single row into the table: "nft" */
        insert_nft_one?: GraphQLTypes["nft"];
        /** insert data into the table: "nft_ownership" */
        insert_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** insert a single row into the table: "nft_ownership" */
        insert_nft_ownership_one?: GraphQLTypes["nft_ownership"];
        /** insert data into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** insert a single row into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks_one?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** insert data into the table: "niftysave_migration" */
        insert_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** insert a single row into the table: "niftysave_migration" */
        insert_niftysave_migration_one?: GraphQLTypes["niftysave_migration"];
        /** insert data into the table: "other_nft_resources" */
        insert_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** insert a single row into the table: "other_nft_resources" */
        insert_other_nft_resources_one?: GraphQLTypes["other_nft_resources"];
        /** insert data into the table: "pin" */
        insert_pin?: GraphQLTypes["pin_mutation_response"];
        /** insert a single row into the table: "pin" */
        insert_pin_one?: GraphQLTypes["pin"];
        /** insert data into the table: "resource" */
        insert_resource?: GraphQLTypes["resource_mutation_response"];
        /** insert a single row into the table: "resource" */
        insert_resource_one?: GraphQLTypes["resource"];
        /** execute VOLATILE function "link_nft_resource" which returns "resource" */
        link_nft_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "link_resource_content" which returns "resource" */
        link_resource_content: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "parse_nft_asset" which returns "nft_asset" */
        parse_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "queue_resource" which returns "resource" */
        queue_resource: Array<GraphQLTypes["resource"]>;
        /** update data of the table: "blockchain_block" */
        update_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** update single row of the table: "blockchain_block" */
        update_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** update data of the table: "blockchain_contract" */
        update_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** update single row of the table: "blockchain_contract" */
        update_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** update data of the table: "content" */
        update_content?: GraphQLTypes["content_mutation_response"];
        /** update single row of the table: "content" */
        update_content_by_pk?: GraphQLTypes["content"];
        /** update data of the table: "erc721_import" */
        update_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** update data of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** update single row of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** update single row of the table: "erc721_import" */
        update_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** update data of the table: "nft" */
        update_nft?: GraphQLTypes["nft_mutation_response"];
        /** update data of the table: "nft_asset" */
        update_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** update single row of the table: "nft_asset" */
        update_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** update single row of the table: "nft" */
        update_nft_by_pk?: GraphQLTypes["nft"];
        /** update data of the table: "nft_metadata" */
        update_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** update single row of the table: "nft_metadata" */
        update_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** update data of the table: "nft_ownership" */
        update_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** update single row of the table: "nft_ownership" */
        update_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** update data of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** update single row of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** update data of the table: "niftysave_migration" */
        update_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** update single row of the table: "niftysave_migration" */
        update_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** update data of the table: "other_nft_resources" */
        update_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** update single row of the table: "other_nft_resources" */
        update_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** update data of the table: "pin" */
        update_pin?: GraphQLTypes["pin_mutation_response"];
        /** update single row of the table: "pin" */
        update_pin_by_pk?: GraphQLTypes["pin"];
        /** update data of the table: "resource" */
        update_resource?: GraphQLTypes["resource_mutation_response"];
        /** update single row of the table: "resource" */
        update_resource_by_pk?: GraphQLTypes["resource"];
    }>;
    subscription: SubscriptionToGraphQL<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>, {
        __typename: "subscription_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    }>;
};
export declare const Chain: (...options: chainOptions) => {
    query: OperationToGraphQL<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>, {
        __typename: "query_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    }>;
    mutation: OperationToGraphQL<AliasType<{
        delete_blockchain_block?: [
            {
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        delete_blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        delete_blockchain_contract?: [
            {
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        delete_blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        delete_content?: [
            {
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        delete_content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        delete_erc721_import?: [
            {
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        delete_erc721_import_by_nft?: [
            {
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        delete_erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        delete_erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        delete_nft?: [
            {
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        delete_nft_asset?: [
            {
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        delete_nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        delete_nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        delete_nft_metadata?: [
            {
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        delete_nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        delete_nft_ownership?: [
            {
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        delete_nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        delete_nfts_by_blockchain_blocks?: [
            {
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        delete_nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        delete_niftysave_migration?: [
            {
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        delete_niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        delete_other_nft_resources?: [
            {
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        delete_other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        delete_pin?: [
            {
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        delete_pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        delete_resource?: [
            {
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        delete_resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        fail_nft_asset?: [
            {
                args: ValueTypes["fail_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        fail_resource?: [
            {
                args: ValueTypes["fail_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        ingest_erc721_token?: [
            {
                args: ValueTypes["ingest_erc721_token_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_blockchain_block?: [
            {
                objects: ValueTypes["blockchain_block_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        insert_blockchain_block_one?: [
            {
                object: ValueTypes["blockchain_block_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        insert_blockchain_contract?: [
            {
                objects: ValueTypes["blockchain_contract_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        insert_blockchain_contract_one?: [
            {
                object: ValueTypes["blockchain_contract_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        insert_content?: [
            {
                objects: ValueTypes["content_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content_mutation_response"]
        ];
        insert_content_one?: [
            {
                object: ValueTypes["content_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content"]
        ];
        insert_erc721_import?: [
            {
                objects: ValueTypes["erc721_import_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        insert_erc721_import_by_nft?: [
            {
                objects: ValueTypes["erc721_import_by_nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        insert_erc721_import_by_nft_one?: [
            {
                object: ValueTypes["erc721_import_by_nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        insert_erc721_import_one?: [
            {
                object: ValueTypes["erc721_import_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        insert_nft?: [
            {
                objects: ValueTypes["nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft_mutation_response"]
        ];
        insert_nft_asset?: [
            {
                objects: ValueTypes["nft_asset_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        insert_nft_asset_one?: [
            {
                object: ValueTypes["nft_asset_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        insert_nft_metadata?: [
            {
                objects: ValueTypes["nft_metadata_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        insert_nft_metadata_one?: [
            {
                object: ValueTypes["nft_metadata_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        insert_nft_one?: [
            {
                object: ValueTypes["nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_nft_ownership?: [
            {
                objects: ValueTypes["nft_ownership_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        insert_nft_ownership_one?: [
            {
                object: ValueTypes["nft_ownership_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        insert_nfts_by_blockchain_blocks?: [
            {
                objects: ValueTypes["nfts_by_blockchain_blocks_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        insert_nfts_by_blockchain_blocks_one?: [
            {
                object: ValueTypes["nfts_by_blockchain_blocks_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        insert_niftysave_migration?: [
            {
                objects: ValueTypes["niftysave_migration_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        insert_niftysave_migration_one?: [
            {
                object: ValueTypes["niftysave_migration_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        insert_other_nft_resources?: [
            {
                objects: ValueTypes["other_nft_resources_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        insert_other_nft_resources_one?: [
            {
                object: ValueTypes["other_nft_resources_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        insert_pin?: [
            {
                objects: ValueTypes["pin_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin_mutation_response"]
        ];
        insert_pin_one?: [
            {
                object: ValueTypes["pin_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin"]
        ];
        insert_resource?: [
            {
                objects: ValueTypes["resource_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource_mutation_response"]
        ];
        insert_resource_one?: [
            {
                object: ValueTypes["resource_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource"]
        ];
        link_nft_resource?: [
            {
                args: ValueTypes["link_nft_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        link_resource_content?: [
            {
                args: ValueTypes["link_resource_content_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        parse_nft_asset?: [
            {
                args: ValueTypes["parse_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        queue_resource?: [
            {
                args: ValueTypes["queue_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        update_blockchain_block?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        update_blockchain_block_by_pk?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null;
                pk_columns: ValueTypes["blockchain_block_pk_columns_input"];
            },
            ValueTypes["blockchain_block"]
        ];
        update_blockchain_contract?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        update_blockchain_contract_by_pk?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null;
                pk_columns: ValueTypes["blockchain_contract_pk_columns_input"];
            },
            ValueTypes["blockchain_contract"]
        ];
        update_content?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        update_content_by_pk?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null;
                pk_columns: ValueTypes["content_pk_columns_input"];
            },
            ValueTypes["content"]
        ];
        update_erc721_import?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        update_erc721_import_by_nft?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        update_erc721_import_by_nft_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_by_nft_pk_columns_input"];
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        update_erc721_import_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_pk_columns_input"];
            },
            ValueTypes["erc721_import"]
        ];
        update_nft?: [
            {
                _set?: ValueTypes["nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        update_nft_asset?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        update_nft_asset_by_pk?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null;
                pk_columns: ValueTypes["nft_asset_pk_columns_input"];
            },
            ValueTypes["nft_asset"]
        ];
        update_nft_by_pk?: [
            {
                _set?: ValueTypes["nft_set_input"] | null;
                pk_columns: ValueTypes["nft_pk_columns_input"];
            },
            ValueTypes["nft"]
        ];
        update_nft_metadata?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        update_nft_metadata_by_pk?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null;
                pk_columns: ValueTypes["nft_metadata_pk_columns_input"];
            },
            ValueTypes["nft_metadata"]
        ];
        update_nft_ownership?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        update_nft_ownership_by_pk?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null;
                pk_columns: ValueTypes["nft_ownership_pk_columns_input"];
            },
            ValueTypes["nft_ownership"]
        ];
        update_nfts_by_blockchain_blocks?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        update_nfts_by_blockchain_blocks_by_pk?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null;
                pk_columns: ValueTypes["nfts_by_blockchain_blocks_pk_columns_input"];
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        update_niftysave_migration?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        update_niftysave_migration_by_pk?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null;
                pk_columns: ValueTypes["niftysave_migration_pk_columns_input"];
            },
            ValueTypes["niftysave_migration"]
        ];
        update_other_nft_resources?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        update_other_nft_resources_by_pk?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null;
                pk_columns: ValueTypes["other_nft_resources_pk_columns_input"];
            },
            ValueTypes["other_nft_resources"]
        ];
        update_pin?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        update_pin_by_pk?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null;
                pk_columns: ValueTypes["pin_pk_columns_input"];
            },
            ValueTypes["pin"]
        ];
        update_resource?: [
            {
                _set?: ValueTypes["resource_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        update_resource_by_pk?: [
            {
                _set?: ValueTypes["resource_set_input"] | null;
                pk_columns: ValueTypes["resource_pk_columns_input"];
            },
            ValueTypes["resource"]
        ];
        __typename?: true;
    }>, {
        __typename: "mutation_root";
        /** delete data from the table: "blockchain_block" */
        delete_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** delete single row from the table: "blockchain_block" */
        delete_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** delete data from the table: "blockchain_contract" */
        delete_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** delete single row from the table: "blockchain_contract" */
        delete_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** delete data from the table: "content" */
        delete_content?: GraphQLTypes["content_mutation_response"];
        /** delete single row from the table: "content" */
        delete_content_by_pk?: GraphQLTypes["content"];
        /** delete data from the table: "erc721_import" */
        delete_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** delete data from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** delete single row from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** delete single row from the table: "erc721_import" */
        delete_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** delete data from the table: "nft" */
        delete_nft?: GraphQLTypes["nft_mutation_response"];
        /** delete data from the table: "nft_asset" */
        delete_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** delete single row from the table: "nft_asset" */
        delete_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** delete single row from the table: "nft" */
        delete_nft_by_pk?: GraphQLTypes["nft"];
        /** delete data from the table: "nft_metadata" */
        delete_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** delete single row from the table: "nft_metadata" */
        delete_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** delete data from the table: "nft_ownership" */
        delete_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** delete single row from the table: "nft_ownership" */
        delete_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** delete data from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** delete single row from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** delete data from the table: "niftysave_migration" */
        delete_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** delete single row from the table: "niftysave_migration" */
        delete_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** delete data from the table: "other_nft_resources" */
        delete_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** delete single row from the table: "other_nft_resources" */
        delete_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** delete data from the table: "pin" */
        delete_pin?: GraphQLTypes["pin_mutation_response"];
        /** delete single row from the table: "pin" */
        delete_pin_by_pk?: GraphQLTypes["pin"];
        /** delete data from the table: "resource" */
        delete_resource?: GraphQLTypes["resource_mutation_response"];
        /** delete single row from the table: "resource" */
        delete_resource_by_pk?: GraphQLTypes["resource"];
        /** execute VOLATILE function "fail_nft_asset" which returns "nft_asset" */
        fail_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "fail_resource" which returns "resource" */
        fail_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "ingest_erc721_token" which returns "nft" */
        ingest_erc721_token: Array<GraphQLTypes["nft"]>;
        /** insert data into the table: "blockchain_block" */
        insert_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** insert a single row into the table: "blockchain_block" */
        insert_blockchain_block_one?: GraphQLTypes["blockchain_block"];
        /** insert data into the table: "blockchain_contract" */
        insert_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** insert a single row into the table: "blockchain_contract" */
        insert_blockchain_contract_one?: GraphQLTypes["blockchain_contract"];
        /** insert data into the table: "content" */
        insert_content?: GraphQLTypes["content_mutation_response"];
        /** insert a single row into the table: "content" */
        insert_content_one?: GraphQLTypes["content"];
        /** insert data into the table: "erc721_import" */
        insert_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** insert data into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** insert a single row into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft_one?: GraphQLTypes["erc721_import_by_nft"];
        /** insert a single row into the table: "erc721_import" */
        insert_erc721_import_one?: GraphQLTypes["erc721_import"];
        /** insert data into the table: "nft" */
        insert_nft?: GraphQLTypes["nft_mutation_response"];
        /** insert data into the table: "nft_asset" */
        insert_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** insert a single row into the table: "nft_asset" */
        insert_nft_asset_one?: GraphQLTypes["nft_asset"];
        /** insert data into the table: "nft_metadata" */
        insert_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** insert a single row into the table: "nft_metadata" */
        insert_nft_metadata_one?: GraphQLTypes["nft_metadata"];
        /** insert a single row into the table: "nft" */
        insert_nft_one?: GraphQLTypes["nft"];
        /** insert data into the table: "nft_ownership" */
        insert_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** insert a single row into the table: "nft_ownership" */
        insert_nft_ownership_one?: GraphQLTypes["nft_ownership"];
        /** insert data into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** insert a single row into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks_one?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** insert data into the table: "niftysave_migration" */
        insert_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** insert a single row into the table: "niftysave_migration" */
        insert_niftysave_migration_one?: GraphQLTypes["niftysave_migration"];
        /** insert data into the table: "other_nft_resources" */
        insert_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** insert a single row into the table: "other_nft_resources" */
        insert_other_nft_resources_one?: GraphQLTypes["other_nft_resources"];
        /** insert data into the table: "pin" */
        insert_pin?: GraphQLTypes["pin_mutation_response"];
        /** insert a single row into the table: "pin" */
        insert_pin_one?: GraphQLTypes["pin"];
        /** insert data into the table: "resource" */
        insert_resource?: GraphQLTypes["resource_mutation_response"];
        /** insert a single row into the table: "resource" */
        insert_resource_one?: GraphQLTypes["resource"];
        /** execute VOLATILE function "link_nft_resource" which returns "resource" */
        link_nft_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "link_resource_content" which returns "resource" */
        link_resource_content: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "parse_nft_asset" which returns "nft_asset" */
        parse_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "queue_resource" which returns "resource" */
        queue_resource: Array<GraphQLTypes["resource"]>;
        /** update data of the table: "blockchain_block" */
        update_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** update single row of the table: "blockchain_block" */
        update_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** update data of the table: "blockchain_contract" */
        update_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** update single row of the table: "blockchain_contract" */
        update_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** update data of the table: "content" */
        update_content?: GraphQLTypes["content_mutation_response"];
        /** update single row of the table: "content" */
        update_content_by_pk?: GraphQLTypes["content"];
        /** update data of the table: "erc721_import" */
        update_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** update data of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** update single row of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** update single row of the table: "erc721_import" */
        update_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** update data of the table: "nft" */
        update_nft?: GraphQLTypes["nft_mutation_response"];
        /** update data of the table: "nft_asset" */
        update_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** update single row of the table: "nft_asset" */
        update_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** update single row of the table: "nft" */
        update_nft_by_pk?: GraphQLTypes["nft"];
        /** update data of the table: "nft_metadata" */
        update_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** update single row of the table: "nft_metadata" */
        update_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** update data of the table: "nft_ownership" */
        update_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** update single row of the table: "nft_ownership" */
        update_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** update data of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** update single row of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** update data of the table: "niftysave_migration" */
        update_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** update single row of the table: "niftysave_migration" */
        update_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** update data of the table: "other_nft_resources" */
        update_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** update single row of the table: "other_nft_resources" */
        update_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** update data of the table: "pin" */
        update_pin?: GraphQLTypes["pin_mutation_response"];
        /** update single row of the table: "pin" */
        update_pin_by_pk?: GraphQLTypes["pin"];
        /** update data of the table: "resource" */
        update_resource?: GraphQLTypes["resource_mutation_response"];
        /** update single row of the table: "resource" */
        update_resource_by_pk?: GraphQLTypes["resource"];
    }>;
    subscription: SubscriptionToGraphQL<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>, {
        __typename: "subscription_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    }>;
};
export declare const Zeus: {
    query: (o: ValueTypes["query_root"], operationName?: string) => string;
    mutation: (o: ValueTypes["mutation_root"], operationName?: string) => string;
    subscription: (o: ValueTypes["subscription_root"], operationName?: string) => string;
};
export declare const Selectors: {
    query: SelectionFunction<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>>;
    mutation: SelectionFunction<AliasType<{
        delete_blockchain_block?: [
            {
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        delete_blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        delete_blockchain_contract?: [
            {
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        delete_blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        delete_content?: [
            {
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        delete_content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        delete_erc721_import?: [
            {
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        delete_erc721_import_by_nft?: [
            {
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        delete_erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        delete_erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        delete_nft?: [
            {
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        delete_nft_asset?: [
            {
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        delete_nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        delete_nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        delete_nft_metadata?: [
            {
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        delete_nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        delete_nft_ownership?: [
            {
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        delete_nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        delete_nfts_by_blockchain_blocks?: [
            {
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        delete_nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        delete_niftysave_migration?: [
            {
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        delete_niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        delete_other_nft_resources?: [
            {
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        delete_other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        delete_pin?: [
            {
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        delete_pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        delete_resource?: [
            {
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        delete_resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        fail_nft_asset?: [
            {
                args: ValueTypes["fail_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        fail_resource?: [
            {
                args: ValueTypes["fail_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        ingest_erc721_token?: [
            {
                args: ValueTypes["ingest_erc721_token_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_blockchain_block?: [
            {
                objects: ValueTypes["blockchain_block_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        insert_blockchain_block_one?: [
            {
                object: ValueTypes["blockchain_block_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        insert_blockchain_contract?: [
            {
                objects: ValueTypes["blockchain_contract_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        insert_blockchain_contract_one?: [
            {
                object: ValueTypes["blockchain_contract_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        insert_content?: [
            {
                objects: ValueTypes["content_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content_mutation_response"]
        ];
        insert_content_one?: [
            {
                object: ValueTypes["content_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content"]
        ];
        insert_erc721_import?: [
            {
                objects: ValueTypes["erc721_import_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        insert_erc721_import_by_nft?: [
            {
                objects: ValueTypes["erc721_import_by_nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        insert_erc721_import_by_nft_one?: [
            {
                object: ValueTypes["erc721_import_by_nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        insert_erc721_import_one?: [
            {
                object: ValueTypes["erc721_import_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        insert_nft?: [
            {
                objects: ValueTypes["nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft_mutation_response"]
        ];
        insert_nft_asset?: [
            {
                objects: ValueTypes["nft_asset_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        insert_nft_asset_one?: [
            {
                object: ValueTypes["nft_asset_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        insert_nft_metadata?: [
            {
                objects: ValueTypes["nft_metadata_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        insert_nft_metadata_one?: [
            {
                object: ValueTypes["nft_metadata_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        insert_nft_one?: [
            {
                object: ValueTypes["nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_nft_ownership?: [
            {
                objects: ValueTypes["nft_ownership_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        insert_nft_ownership_one?: [
            {
                object: ValueTypes["nft_ownership_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        insert_nfts_by_blockchain_blocks?: [
            {
                objects: ValueTypes["nfts_by_blockchain_blocks_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        insert_nfts_by_blockchain_blocks_one?: [
            {
                object: ValueTypes["nfts_by_blockchain_blocks_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        insert_niftysave_migration?: [
            {
                objects: ValueTypes["niftysave_migration_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        insert_niftysave_migration_one?: [
            {
                object: ValueTypes["niftysave_migration_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        insert_other_nft_resources?: [
            {
                objects: ValueTypes["other_nft_resources_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        insert_other_nft_resources_one?: [
            {
                object: ValueTypes["other_nft_resources_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        insert_pin?: [
            {
                objects: ValueTypes["pin_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin_mutation_response"]
        ];
        insert_pin_one?: [
            {
                object: ValueTypes["pin_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin"]
        ];
        insert_resource?: [
            {
                objects: ValueTypes["resource_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource_mutation_response"]
        ];
        insert_resource_one?: [
            {
                object: ValueTypes["resource_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource"]
        ];
        link_nft_resource?: [
            {
                args: ValueTypes["link_nft_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        link_resource_content?: [
            {
                args: ValueTypes["link_resource_content_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        parse_nft_asset?: [
            {
                args: ValueTypes["parse_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        queue_resource?: [
            {
                args: ValueTypes["queue_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        update_blockchain_block?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        update_blockchain_block_by_pk?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null;
                pk_columns: ValueTypes["blockchain_block_pk_columns_input"];
            },
            ValueTypes["blockchain_block"]
        ];
        update_blockchain_contract?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        update_blockchain_contract_by_pk?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null;
                pk_columns: ValueTypes["blockchain_contract_pk_columns_input"];
            },
            ValueTypes["blockchain_contract"]
        ];
        update_content?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        update_content_by_pk?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null;
                pk_columns: ValueTypes["content_pk_columns_input"];
            },
            ValueTypes["content"]
        ];
        update_erc721_import?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        update_erc721_import_by_nft?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        update_erc721_import_by_nft_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_by_nft_pk_columns_input"];
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        update_erc721_import_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_pk_columns_input"];
            },
            ValueTypes["erc721_import"]
        ];
        update_nft?: [
            {
                _set?: ValueTypes["nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        update_nft_asset?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        update_nft_asset_by_pk?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null;
                pk_columns: ValueTypes["nft_asset_pk_columns_input"];
            },
            ValueTypes["nft_asset"]
        ];
        update_nft_by_pk?: [
            {
                _set?: ValueTypes["nft_set_input"] | null;
                pk_columns: ValueTypes["nft_pk_columns_input"];
            },
            ValueTypes["nft"]
        ];
        update_nft_metadata?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        update_nft_metadata_by_pk?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null;
                pk_columns: ValueTypes["nft_metadata_pk_columns_input"];
            },
            ValueTypes["nft_metadata"]
        ];
        update_nft_ownership?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        update_nft_ownership_by_pk?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null;
                pk_columns: ValueTypes["nft_ownership_pk_columns_input"];
            },
            ValueTypes["nft_ownership"]
        ];
        update_nfts_by_blockchain_blocks?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        update_nfts_by_blockchain_blocks_by_pk?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null;
                pk_columns: ValueTypes["nfts_by_blockchain_blocks_pk_columns_input"];
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        update_niftysave_migration?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        update_niftysave_migration_by_pk?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null;
                pk_columns: ValueTypes["niftysave_migration_pk_columns_input"];
            },
            ValueTypes["niftysave_migration"]
        ];
        update_other_nft_resources?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        update_other_nft_resources_by_pk?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null;
                pk_columns: ValueTypes["other_nft_resources_pk_columns_input"];
            },
            ValueTypes["other_nft_resources"]
        ];
        update_pin?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        update_pin_by_pk?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null;
                pk_columns: ValueTypes["pin_pk_columns_input"];
            },
            ValueTypes["pin"]
        ];
        update_resource?: [
            {
                _set?: ValueTypes["resource_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        update_resource_by_pk?: [
            {
                _set?: ValueTypes["resource_set_input"] | null;
                pk_columns: ValueTypes["resource_pk_columns_input"];
            },
            ValueTypes["resource"]
        ];
        __typename?: true;
    }>>;
    subscription: SelectionFunction<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>>;
};
export declare const Gql: {
    query: OperationToGraphQL<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>, {
        __typename: "query_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    }>;
    mutation: OperationToGraphQL<AliasType<{
        delete_blockchain_block?: [
            {
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        delete_blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        delete_blockchain_contract?: [
            {
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        delete_blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        delete_content?: [
            {
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        delete_content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        delete_erc721_import?: [
            {
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        delete_erc721_import_by_nft?: [
            {
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        delete_erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        delete_erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        delete_nft?: [
            {
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        delete_nft_asset?: [
            {
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        delete_nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        delete_nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        delete_nft_metadata?: [
            {
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        delete_nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        delete_nft_ownership?: [
            {
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        delete_nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        delete_nfts_by_blockchain_blocks?: [
            {
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        delete_nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        delete_niftysave_migration?: [
            {
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        delete_niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        delete_other_nft_resources?: [
            {
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        delete_other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        delete_pin?: [
            {
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        delete_pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        delete_resource?: [
            {
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        delete_resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        fail_nft_asset?: [
            {
                args: ValueTypes["fail_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        fail_resource?: [
            {
                args: ValueTypes["fail_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        ingest_erc721_token?: [
            {
                args: ValueTypes["ingest_erc721_token_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_blockchain_block?: [
            {
                objects: ValueTypes["blockchain_block_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        insert_blockchain_block_one?: [
            {
                object: ValueTypes["blockchain_block_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_block_on_conflict"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        insert_blockchain_contract?: [
            {
                objects: ValueTypes["blockchain_contract_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        insert_blockchain_contract_one?: [
            {
                object: ValueTypes["blockchain_contract_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["blockchain_contract_on_conflict"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        insert_content?: [
            {
                objects: ValueTypes["content_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content_mutation_response"]
        ];
        insert_content_one?: [
            {
                object: ValueTypes["content_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["content_on_conflict"] | null;
            },
            ValueTypes["content"]
        ];
        insert_erc721_import?: [
            {
                objects: ValueTypes["erc721_import_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        insert_erc721_import_by_nft?: [
            {
                objects: ValueTypes["erc721_import_by_nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        insert_erc721_import_by_nft_one?: [
            {
                object: ValueTypes["erc721_import_by_nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_by_nft_on_conflict"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        insert_erc721_import_one?: [
            {
                object: ValueTypes["erc721_import_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["erc721_import_on_conflict"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        insert_nft?: [
            {
                objects: ValueTypes["nft_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft_mutation_response"]
        ];
        insert_nft_asset?: [
            {
                objects: ValueTypes["nft_asset_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        insert_nft_asset_one?: [
            {
                object: ValueTypes["nft_asset_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_asset_on_conflict"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        insert_nft_metadata?: [
            {
                objects: ValueTypes["nft_metadata_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        insert_nft_metadata_one?: [
            {
                object: ValueTypes["nft_metadata_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_metadata_on_conflict"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        insert_nft_one?: [
            {
                object: ValueTypes["nft_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_on_conflict"] | null;
            },
            ValueTypes["nft"]
        ];
        insert_nft_ownership?: [
            {
                objects: ValueTypes["nft_ownership_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        insert_nft_ownership_one?: [
            {
                object: ValueTypes["nft_ownership_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nft_ownership_on_conflict"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        insert_nfts_by_blockchain_blocks?: [
            {
                objects: ValueTypes["nfts_by_blockchain_blocks_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        insert_nfts_by_blockchain_blocks_one?: [
            {
                object: ValueTypes["nfts_by_blockchain_blocks_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["nfts_by_blockchain_blocks_on_conflict"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        insert_niftysave_migration?: [
            {
                objects: ValueTypes["niftysave_migration_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        insert_niftysave_migration_one?: [
            {
                object: ValueTypes["niftysave_migration_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["niftysave_migration_on_conflict"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        insert_other_nft_resources?: [
            {
                objects: ValueTypes["other_nft_resources_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        insert_other_nft_resources_one?: [
            {
                object: ValueTypes["other_nft_resources_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["other_nft_resources_on_conflict"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        insert_pin?: [
            {
                objects: ValueTypes["pin_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin_mutation_response"]
        ];
        insert_pin_one?: [
            {
                object: ValueTypes["pin_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["pin_on_conflict"] | null;
            },
            ValueTypes["pin"]
        ];
        insert_resource?: [
            {
                objects: ValueTypes["resource_insert_input"][]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource_mutation_response"]
        ];
        insert_resource_one?: [
            {
                object: ValueTypes["resource_insert_input"]; /** on conflict condition */
                on_conflict?: ValueTypes["resource_on_conflict"] | null;
            },
            ValueTypes["resource"]
        ];
        link_nft_resource?: [
            {
                args: ValueTypes["link_nft_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        link_resource_content?: [
            {
                args: ValueTypes["link_resource_content_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        parse_nft_asset?: [
            {
                args: ValueTypes["parse_nft_asset_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        queue_resource?: [
            {
                args: ValueTypes["queue_resource_args"]; /** distinct select on columns */
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        update_blockchain_block?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_block_bool_exp"];
            },
            ValueTypes["blockchain_block_mutation_response"]
        ];
        update_blockchain_block_by_pk?: [
            {
                _inc?: ValueTypes["blockchain_block_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["blockchain_block_set_input"] | null;
                pk_columns: ValueTypes["blockchain_block_pk_columns_input"];
            },
            ValueTypes["blockchain_block"]
        ];
        update_blockchain_contract?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["blockchain_contract_bool_exp"];
            },
            ValueTypes["blockchain_contract_mutation_response"]
        ];
        update_blockchain_contract_by_pk?: [
            {
                _set?: ValueTypes["blockchain_contract_set_input"] | null;
                pk_columns: ValueTypes["blockchain_contract_pk_columns_input"];
            },
            ValueTypes["blockchain_contract"]
        ];
        update_content?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["content_bool_exp"];
            },
            ValueTypes["content_mutation_response"]
        ];
        update_content_by_pk?: [
            {
                _inc?: ValueTypes["content_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["content_set_input"] | null;
                pk_columns: ValueTypes["content_pk_columns_input"];
            },
            ValueTypes["content"]
        ];
        update_erc721_import?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_bool_exp"];
            },
            ValueTypes["erc721_import_mutation_response"]
        ];
        update_erc721_import_by_nft?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["erc721_import_by_nft_bool_exp"];
            },
            ValueTypes["erc721_import_by_nft_mutation_response"]
        ];
        update_erc721_import_by_nft_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_by_nft_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_by_nft_pk_columns_input"];
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        update_erc721_import_by_pk?: [
            {
                _set?: ValueTypes["erc721_import_set_input"] | null;
                pk_columns: ValueTypes["erc721_import_pk_columns_input"];
            },
            ValueTypes["erc721_import"]
        ];
        update_nft?: [
            {
                _set?: ValueTypes["nft_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_bool_exp"];
            },
            ValueTypes["nft_mutation_response"]
        ];
        update_nft_asset?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_asset_bool_exp"];
            },
            ValueTypes["nft_asset_mutation_response"]
        ];
        update_nft_asset_by_pk?: [
            {
                _set?: ValueTypes["nft_asset_set_input"] | null;
                pk_columns: ValueTypes["nft_asset_pk_columns_input"];
            },
            ValueTypes["nft_asset"]
        ];
        update_nft_by_pk?: [
            {
                _set?: ValueTypes["nft_set_input"] | null;
                pk_columns: ValueTypes["nft_pk_columns_input"];
            },
            ValueTypes["nft"]
        ];
        update_nft_metadata?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_metadata_bool_exp"];
            },
            ValueTypes["nft_metadata_mutation_response"]
        ];
        update_nft_metadata_by_pk?: [
            {
                _append?: ValueTypes["nft_metadata_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["nft_metadata_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["nft_metadata_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["nft_metadata_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["nft_metadata_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_metadata_set_input"] | null;
                pk_columns: ValueTypes["nft_metadata_pk_columns_input"];
            },
            ValueTypes["nft_metadata"]
        ];
        update_nft_ownership?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nft_ownership_bool_exp"];
            },
            ValueTypes["nft_ownership_mutation_response"]
        ];
        update_nft_ownership_by_pk?: [
            {
                _inc?: ValueTypes["nft_ownership_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["nft_ownership_set_input"] | null;
                pk_columns: ValueTypes["nft_ownership_pk_columns_input"];
            },
            ValueTypes["nft_ownership"]
        ];
        update_nfts_by_blockchain_blocks?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["nfts_by_blockchain_blocks_bool_exp"];
            },
            ValueTypes["nfts_by_blockchain_blocks_mutation_response"]
        ];
        update_nfts_by_blockchain_blocks_by_pk?: [
            {
                _set?: ValueTypes["nfts_by_blockchain_blocks_set_input"] | null;
                pk_columns: ValueTypes["nfts_by_blockchain_blocks_pk_columns_input"];
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        update_niftysave_migration?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["niftysave_migration_bool_exp"];
            },
            ValueTypes["niftysave_migration_mutation_response"]
        ];
        update_niftysave_migration_by_pk?: [
            {
                _append?: ValueTypes["niftysave_migration_append_input"] | null; /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
                _delete_at_path?: ValueTypes["niftysave_migration_delete_at_path_input"] | null; /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
                _delete_elem?: ValueTypes["niftysave_migration_delete_elem_input"] | null; /** delete key/value pair or string element. key/value pairs are matched based on their key value */
                _delete_key?: ValueTypes["niftysave_migration_delete_key_input"] | null; /** prepend existing jsonb value of filtered columns with new jsonb value */
                _prepend?: ValueTypes["niftysave_migration_prepend_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["niftysave_migration_set_input"] | null;
                pk_columns: ValueTypes["niftysave_migration_pk_columns_input"];
            },
            ValueTypes["niftysave_migration"]
        ];
        update_other_nft_resources?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["other_nft_resources_bool_exp"];
            },
            ValueTypes["other_nft_resources_mutation_response"]
        ];
        update_other_nft_resources_by_pk?: [
            {
                _set?: ValueTypes["other_nft_resources_set_input"] | null;
                pk_columns: ValueTypes["other_nft_resources_pk_columns_input"];
            },
            ValueTypes["other_nft_resources"]
        ];
        update_pin?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["pin_bool_exp"];
            },
            ValueTypes["pin_mutation_response"]
        ];
        update_pin_by_pk?: [
            {
                _inc?: ValueTypes["pin_inc_input"] | null; /** sets the columns of the filtered rows to the given values */
                _set?: ValueTypes["pin_set_input"] | null;
                pk_columns: ValueTypes["pin_pk_columns_input"];
            },
            ValueTypes["pin"]
        ];
        update_resource?: [
            {
                _set?: ValueTypes["resource_set_input"] | null; /** filter the rows which have to be updated */
                where: ValueTypes["resource_bool_exp"];
            },
            ValueTypes["resource_mutation_response"]
        ];
        update_resource_by_pk?: [
            {
                _set?: ValueTypes["resource_set_input"] | null;
                pk_columns: ValueTypes["resource_pk_columns_input"];
            },
            ValueTypes["resource"]
        ];
        __typename?: true;
    }>, {
        __typename: "mutation_root";
        /** delete data from the table: "blockchain_block" */
        delete_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** delete single row from the table: "blockchain_block" */
        delete_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** delete data from the table: "blockchain_contract" */
        delete_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** delete single row from the table: "blockchain_contract" */
        delete_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** delete data from the table: "content" */
        delete_content?: GraphQLTypes["content_mutation_response"];
        /** delete single row from the table: "content" */
        delete_content_by_pk?: GraphQLTypes["content"];
        /** delete data from the table: "erc721_import" */
        delete_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** delete data from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** delete single row from the table: "erc721_import_by_nft" */
        delete_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** delete single row from the table: "erc721_import" */
        delete_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** delete data from the table: "nft" */
        delete_nft?: GraphQLTypes["nft_mutation_response"];
        /** delete data from the table: "nft_asset" */
        delete_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** delete single row from the table: "nft_asset" */
        delete_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** delete single row from the table: "nft" */
        delete_nft_by_pk?: GraphQLTypes["nft"];
        /** delete data from the table: "nft_metadata" */
        delete_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** delete single row from the table: "nft_metadata" */
        delete_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** delete data from the table: "nft_ownership" */
        delete_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** delete single row from the table: "nft_ownership" */
        delete_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** delete data from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** delete single row from the table: "nfts_by_blockchain_blocks" */
        delete_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** delete data from the table: "niftysave_migration" */
        delete_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** delete single row from the table: "niftysave_migration" */
        delete_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** delete data from the table: "other_nft_resources" */
        delete_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** delete single row from the table: "other_nft_resources" */
        delete_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** delete data from the table: "pin" */
        delete_pin?: GraphQLTypes["pin_mutation_response"];
        /** delete single row from the table: "pin" */
        delete_pin_by_pk?: GraphQLTypes["pin"];
        /** delete data from the table: "resource" */
        delete_resource?: GraphQLTypes["resource_mutation_response"];
        /** delete single row from the table: "resource" */
        delete_resource_by_pk?: GraphQLTypes["resource"];
        /** execute VOLATILE function "fail_nft_asset" which returns "nft_asset" */
        fail_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "fail_resource" which returns "resource" */
        fail_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "ingest_erc721_token" which returns "nft" */
        ingest_erc721_token: Array<GraphQLTypes["nft"]>;
        /** insert data into the table: "blockchain_block" */
        insert_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** insert a single row into the table: "blockchain_block" */
        insert_blockchain_block_one?: GraphQLTypes["blockchain_block"];
        /** insert data into the table: "blockchain_contract" */
        insert_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** insert a single row into the table: "blockchain_contract" */
        insert_blockchain_contract_one?: GraphQLTypes["blockchain_contract"];
        /** insert data into the table: "content" */
        insert_content?: GraphQLTypes["content_mutation_response"];
        /** insert a single row into the table: "content" */
        insert_content_one?: GraphQLTypes["content"];
        /** insert data into the table: "erc721_import" */
        insert_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** insert data into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** insert a single row into the table: "erc721_import_by_nft" */
        insert_erc721_import_by_nft_one?: GraphQLTypes["erc721_import_by_nft"];
        /** insert a single row into the table: "erc721_import" */
        insert_erc721_import_one?: GraphQLTypes["erc721_import"];
        /** insert data into the table: "nft" */
        insert_nft?: GraphQLTypes["nft_mutation_response"];
        /** insert data into the table: "nft_asset" */
        insert_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** insert a single row into the table: "nft_asset" */
        insert_nft_asset_one?: GraphQLTypes["nft_asset"];
        /** insert data into the table: "nft_metadata" */
        insert_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** insert a single row into the table: "nft_metadata" */
        insert_nft_metadata_one?: GraphQLTypes["nft_metadata"];
        /** insert a single row into the table: "nft" */
        insert_nft_one?: GraphQLTypes["nft"];
        /** insert data into the table: "nft_ownership" */
        insert_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** insert a single row into the table: "nft_ownership" */
        insert_nft_ownership_one?: GraphQLTypes["nft_ownership"];
        /** insert data into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** insert a single row into the table: "nfts_by_blockchain_blocks" */
        insert_nfts_by_blockchain_blocks_one?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** insert data into the table: "niftysave_migration" */
        insert_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** insert a single row into the table: "niftysave_migration" */
        insert_niftysave_migration_one?: GraphQLTypes["niftysave_migration"];
        /** insert data into the table: "other_nft_resources" */
        insert_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** insert a single row into the table: "other_nft_resources" */
        insert_other_nft_resources_one?: GraphQLTypes["other_nft_resources"];
        /** insert data into the table: "pin" */
        insert_pin?: GraphQLTypes["pin_mutation_response"];
        /** insert a single row into the table: "pin" */
        insert_pin_one?: GraphQLTypes["pin"];
        /** insert data into the table: "resource" */
        insert_resource?: GraphQLTypes["resource_mutation_response"];
        /** insert a single row into the table: "resource" */
        insert_resource_one?: GraphQLTypes["resource"];
        /** execute VOLATILE function "link_nft_resource" which returns "resource" */
        link_nft_resource: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "link_resource_content" which returns "resource" */
        link_resource_content: Array<GraphQLTypes["resource"]>;
        /** execute VOLATILE function "parse_nft_asset" which returns "nft_asset" */
        parse_nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** execute VOLATILE function "queue_resource" which returns "resource" */
        queue_resource: Array<GraphQLTypes["resource"]>;
        /** update data of the table: "blockchain_block" */
        update_blockchain_block?: GraphQLTypes["blockchain_block_mutation_response"];
        /** update single row of the table: "blockchain_block" */
        update_blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** update data of the table: "blockchain_contract" */
        update_blockchain_contract?: GraphQLTypes["blockchain_contract_mutation_response"];
        /** update single row of the table: "blockchain_contract" */
        update_blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** update data of the table: "content" */
        update_content?: GraphQLTypes["content_mutation_response"];
        /** update single row of the table: "content" */
        update_content_by_pk?: GraphQLTypes["content"];
        /** update data of the table: "erc721_import" */
        update_erc721_import?: GraphQLTypes["erc721_import_mutation_response"];
        /** update data of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft?: GraphQLTypes["erc721_import_by_nft_mutation_response"];
        /** update single row of the table: "erc721_import_by_nft" */
        update_erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** update single row of the table: "erc721_import" */
        update_erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** update data of the table: "nft" */
        update_nft?: GraphQLTypes["nft_mutation_response"];
        /** update data of the table: "nft_asset" */
        update_nft_asset?: GraphQLTypes["nft_asset_mutation_response"];
        /** update single row of the table: "nft_asset" */
        update_nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** update single row of the table: "nft" */
        update_nft_by_pk?: GraphQLTypes["nft"];
        /** update data of the table: "nft_metadata" */
        update_nft_metadata?: GraphQLTypes["nft_metadata_mutation_response"];
        /** update single row of the table: "nft_metadata" */
        update_nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** update data of the table: "nft_ownership" */
        update_nft_ownership?: GraphQLTypes["nft_ownership_mutation_response"];
        /** update single row of the table: "nft_ownership" */
        update_nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** update data of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks?: GraphQLTypes["nfts_by_blockchain_blocks_mutation_response"];
        /** update single row of the table: "nfts_by_blockchain_blocks" */
        update_nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** update data of the table: "niftysave_migration" */
        update_niftysave_migration?: GraphQLTypes["niftysave_migration_mutation_response"];
        /** update single row of the table: "niftysave_migration" */
        update_niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** update data of the table: "other_nft_resources" */
        update_other_nft_resources?: GraphQLTypes["other_nft_resources_mutation_response"];
        /** update single row of the table: "other_nft_resources" */
        update_other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** update data of the table: "pin" */
        update_pin?: GraphQLTypes["pin_mutation_response"];
        /** update single row of the table: "pin" */
        update_pin_by_pk?: GraphQLTypes["pin"];
        /** update data of the table: "resource" */
        update_resource?: GraphQLTypes["resource_mutation_response"];
        /** update single row of the table: "resource" */
        update_resource_by_pk?: GraphQLTypes["resource"];
    }>;
    subscription: SubscriptionToGraphQL<AliasType<{
        blockchain_block?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block"]
        ];
        blockchain_block_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_block_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_block_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_block_bool_exp"] | null;
            },
            ValueTypes["blockchain_block_aggregate"]
        ];
        blockchain_block_by_pk?: [{
            hash: string;
        }, ValueTypes["blockchain_block"]];
        blockchain_contract?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract"]
        ];
        blockchain_contract_aggregate?: [
            {
                distinct_on?: ValueTypes["blockchain_contract_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["blockchain_contract_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["blockchain_contract_bool_exp"] | null;
            },
            ValueTypes["blockchain_contract_aggregate"]
        ];
        blockchain_contract_by_pk?: [{
            id: string;
        }, ValueTypes["blockchain_contract"]];
        content?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content"]
        ];
        content_aggregate?: [
            {
                distinct_on?: ValueTypes["content_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["content_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["content_bool_exp"] | null;
            },
            ValueTypes["content_aggregate"]
        ];
        content_by_pk?: [{
            cid: string;
        }, ValueTypes["content"]];
        erc721_import?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import"]
        ];
        erc721_import_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_bool_exp"] | null;
            },
            ValueTypes["erc721_import_aggregate"]
        ];
        erc721_import_by_nft?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft"]
        ];
        erc721_import_by_nft_aggregate?: [
            {
                distinct_on?: ValueTypes["erc721_import_by_nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["erc721_import_by_nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["erc721_import_by_nft_bool_exp"] | null;
            },
            ValueTypes["erc721_import_by_nft_aggregate"]
        ];
        erc721_import_by_nft_by_pk?: [{
            erc721_import_id: string;
            nft_id: string;
        }, ValueTypes["erc721_import_by_nft"]];
        erc721_import_by_pk?: [{
            id: string;
        }, ValueTypes["erc721_import"]];
        nft?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft"]
        ];
        nft_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_bool_exp"] | null;
            },
            ValueTypes["nft_aggregate"]
        ];
        nft_asset?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset"]
        ];
        nft_asset_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_asset_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_asset_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_asset_bool_exp"] | null;
            },
            ValueTypes["nft_asset_aggregate"]
        ];
        nft_asset_by_pk?: [{
            token_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["nft_asset"]];
        nft_by_pk?: [{
            id: string;
        }, ValueTypes["nft"]];
        nft_metadata?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata"]
        ];
        nft_metadata_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_metadata_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_metadata_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_metadata_bool_exp"] | null;
            },
            ValueTypes["nft_metadata_aggregate"]
        ];
        nft_metadata_by_pk?: [{
            cid: string;
        }, ValueTypes["nft_metadata"]];
        nft_ownership?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership"]
        ];
        nft_ownership_aggregate?: [
            {
                distinct_on?: ValueTypes["nft_ownership_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nft_ownership_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nft_ownership_bool_exp"] | null;
            },
            ValueTypes["nft_ownership_aggregate"]
        ];
        nft_ownership_by_pk?: [{
            block_number: ValueTypes["bigint"];
            nft_id: string;
            owner_id: string;
        }, ValueTypes["nft_ownership"]];
        nfts_by_blockchain_blocks?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks"]
        ];
        nfts_by_blockchain_blocks_aggregate?: [
            {
                distinct_on?: ValueTypes["nfts_by_blockchain_blocks_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["nfts_by_blockchain_blocks_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["nfts_by_blockchain_blocks_bool_exp"] | null;
            },
            ValueTypes["nfts_by_blockchain_blocks_aggregate"]
        ];
        nfts_by_blockchain_blocks_by_pk?: [{
            blockchain_block_hash: string;
            nft_id: string;
        }, ValueTypes["nfts_by_blockchain_blocks"]];
        niftysave_migration?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration"]
        ];
        niftysave_migration_aggregate?: [
            {
                distinct_on?: ValueTypes["niftysave_migration_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["niftysave_migration_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["niftysave_migration_bool_exp"] | null;
            },
            ValueTypes["niftysave_migration_aggregate"]
        ];
        niftysave_migration_by_pk?: [{
            id: string;
        }, ValueTypes["niftysave_migration"]];
        other_nft_resources?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources"]
        ];
        other_nft_resources_aggregate?: [
            {
                distinct_on?: ValueTypes["other_nft_resources_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["other_nft_resources_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["other_nft_resources_bool_exp"] | null;
            },
            ValueTypes["other_nft_resources_aggregate"]
        ];
        other_nft_resources_by_pk?: [{
            metadata_cid: string;
            resource_uri_hash: ValueTypes["bytea"];
        }, ValueTypes["other_nft_resources"]];
        pin?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin"]
        ];
        pin_aggregate?: [
            {
                distinct_on?: ValueTypes["pin_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["pin_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["pin_bool_exp"] | null;
            },
            ValueTypes["pin_aggregate"]
        ];
        pin_by_pk?: [{
            id: ValueTypes["bigint"];
        }, ValueTypes["pin"]];
        resource?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource"]
        ];
        resource_aggregate?: [
            {
                distinct_on?: ValueTypes["resource_select_column"][]; /** limit the number of rows returned */
                limit?: number | null; /** skip the first n rows. Use only with order_by */
                offset?: number | null; /** sort the rows by one or more columns */
                order_by?: ValueTypes["resource_order_by"][]; /** filter the rows returned */
                where?: ValueTypes["resource_bool_exp"] | null;
            },
            ValueTypes["resource_aggregate"]
        ];
        resource_by_pk?: [{
            uri_hash: ValueTypes["bytea"];
        }, ValueTypes["resource"]];
        __typename?: true;
    }>, {
        __typename: "subscription_root";
        /** fetch data from the table: "blockchain_block" */
        blockchain_block: Array<GraphQLTypes["blockchain_block"]>;
        /** fetch aggregated fields from the table: "blockchain_block" */
        blockchain_block_aggregate: GraphQLTypes["blockchain_block_aggregate"];
        /** fetch data from the table: "blockchain_block" using primary key columns */
        blockchain_block_by_pk?: GraphQLTypes["blockchain_block"];
        /** fetch data from the table: "blockchain_contract" */
        blockchain_contract: Array<GraphQLTypes["blockchain_contract"]>;
        /** fetch aggregated fields from the table: "blockchain_contract" */
        blockchain_contract_aggregate: GraphQLTypes["blockchain_contract_aggregate"];
        /** fetch data from the table: "blockchain_contract" using primary key columns */
        blockchain_contract_by_pk?: GraphQLTypes["blockchain_contract"];
        /** fetch data from the table: "content" */
        content: Array<GraphQLTypes["content"]>;
        /** fetch aggregated fields from the table: "content" */
        content_aggregate: GraphQLTypes["content_aggregate"];
        /** fetch data from the table: "content" using primary key columns */
        content_by_pk?: GraphQLTypes["content"];
        /** fetch data from the table: "erc721_import" */
        erc721_import: Array<GraphQLTypes["erc721_import"]>;
        /** fetch aggregated fields from the table: "erc721_import" */
        erc721_import_aggregate: GraphQLTypes["erc721_import_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" */
        erc721_import_by_nft: Array<GraphQLTypes["erc721_import_by_nft"]>;
        /** fetch aggregated fields from the table: "erc721_import_by_nft" */
        erc721_import_by_nft_aggregate: GraphQLTypes["erc721_import_by_nft_aggregate"];
        /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
        erc721_import_by_nft_by_pk?: GraphQLTypes["erc721_import_by_nft"];
        /** fetch data from the table: "erc721_import" using primary key columns */
        erc721_import_by_pk?: GraphQLTypes["erc721_import"];
        /** fetch data from the table: "nft" */
        nft: Array<GraphQLTypes["nft"]>;
        /** fetch aggregated fields from the table: "nft" */
        nft_aggregate: GraphQLTypes["nft_aggregate"];
        /** fetch data from the table: "nft_asset" */
        nft_asset: Array<GraphQLTypes["nft_asset"]>;
        /** fetch aggregated fields from the table: "nft_asset" */
        nft_asset_aggregate: GraphQLTypes["nft_asset_aggregate"];
        /** fetch data from the table: "nft_asset" using primary key columns */
        nft_asset_by_pk?: GraphQLTypes["nft_asset"];
        /** fetch data from the table: "nft" using primary key columns */
        nft_by_pk?: GraphQLTypes["nft"];
        /** fetch data from the table: "nft_metadata" */
        nft_metadata: Array<GraphQLTypes["nft_metadata"]>;
        /** fetch aggregated fields from the table: "nft_metadata" */
        nft_metadata_aggregate: GraphQLTypes["nft_metadata_aggregate"];
        /** fetch data from the table: "nft_metadata" using primary key columns */
        nft_metadata_by_pk?: GraphQLTypes["nft_metadata"];
        /** fetch data from the table: "nft_ownership" */
        nft_ownership: Array<GraphQLTypes["nft_ownership"]>;
        /** fetch aggregated fields from the table: "nft_ownership" */
        nft_ownership_aggregate: GraphQLTypes["nft_ownership_aggregate"];
        /** fetch data from the table: "nft_ownership" using primary key columns */
        nft_ownership_by_pk?: GraphQLTypes["nft_ownership"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks: Array<GraphQLTypes["nfts_by_blockchain_blocks"]>;
        /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
        nfts_by_blockchain_blocks_aggregate: GraphQLTypes["nfts_by_blockchain_blocks_aggregate"];
        /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
        nfts_by_blockchain_blocks_by_pk?: GraphQLTypes["nfts_by_blockchain_blocks"];
        /** fetch data from the table: "niftysave_migration" */
        niftysave_migration: Array<GraphQLTypes["niftysave_migration"]>;
        /** fetch aggregated fields from the table: "niftysave_migration" */
        niftysave_migration_aggregate: GraphQLTypes["niftysave_migration_aggregate"];
        /** fetch data from the table: "niftysave_migration" using primary key columns */
        niftysave_migration_by_pk?: GraphQLTypes["niftysave_migration"];
        /** An array relationship */
        other_nft_resources: Array<GraphQLTypes["other_nft_resources"]>;
        /** An aggregate relationship */
        other_nft_resources_aggregate: GraphQLTypes["other_nft_resources_aggregate"];
        /** fetch data from the table: "other_nft_resources" using primary key columns */
        other_nft_resources_by_pk?: GraphQLTypes["other_nft_resources"];
        /** fetch data from the table: "pin" */
        pin: Array<GraphQLTypes["pin"]>;
        /** fetch aggregated fields from the table: "pin" */
        pin_aggregate: GraphQLTypes["pin_aggregate"];
        /** fetch data from the table: "pin" using primary key columns */
        pin_by_pk?: GraphQLTypes["pin"];
        /** fetch data from the table: "resource" */
        resource: Array<GraphQLTypes["resource"]>;
        /** fetch aggregated fields from the table: "resource" */
        resource_aggregate: GraphQLTypes["resource_aggregate"];
        /** fetch data from the table: "resource" using primary key columns */
        resource_by_pk?: GraphQLTypes["resource"];
    }>;
};
export {};
