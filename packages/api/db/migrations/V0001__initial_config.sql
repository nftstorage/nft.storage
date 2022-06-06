-- PG doesn't support ALTER DATABASE CURRENT, and the db name is different between local/staging/production
-- So we have to execute using variable subsitution
DO $$
BEGIN
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET default_statistics_target = 1000';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET enable_partitionwise_aggregate = on';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET enable_partitionwise_join = on';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET max_parallel_workers_per_gather = 8';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET max_parallel_workers = 16';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET max_parallel_maintenance_workers = 8';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET jit = on';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET idle_in_transaction_session_timeout = ''1min''';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET lock_timeout = ''1min''';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET statement_timeout = ''3min''';
END
$$;