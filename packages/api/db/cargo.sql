CREATE SCHEMA IF NOT EXISTS cargo;

-- Import dag cargo schema
IMPORT FOREIGN SCHEMA cargo
  LIMIT TO (aggregate_entries, aggregates, deals)
  FROM SERVER dag_cargo_server
  INTO cargo;

-- Create materialized view from cargo "aggregate_entries" table
CREATE MATERIALIZED VIEW public.aggregate_entry 
    AS SELECT * FROM cargo.aggregate_entries;

-- Indexes for "aggregate_entries" mat view
CREATE UNIQUE INDEX aggregate_entry_unique_cidv1_aggregate_cid
    ON public.aggregate_entry (cid_v1, aggregate_cid);
CREATE INDEX aggregate_entry_cid_v1
    ON public.aggregate_entry (cid_v1);

-- Create materialized view from cargo "deals" table
CREATE MATERIALIZED VIEW public.deal
    AS SELECT * FROM cargo.deals;

-- Indexes for "deals" mat view
CREATE UNIQUE INDEX deal_unique_deal_id
    ON public.deal (deal_id);
CREATE INDEX deal_aggregate_cid
    ON public.deal (aggregate_cid);

-- Create materialized view from cargo "aggregates" table
CREATE MATERIALIZED VIEW public.aggregate
    AS SELECT * FROM cargo.aggregates;

-- Indexes for "aggregate" mat view
CREATE UNIQUE INDEX aggregate_unique_aggregate_cid
    ON public.aggregate (aggregate_cid);

