# Decisions

- **Pipeline Storage**: In offline mode, the pipeline uses an in-memory database and writes the final results to `tests/fixtures/output.json` instead of Supabase.
- **CLI Implementation**: The pipeline is implemented as a simple synchronous flow through the 6 stages when offline, processing hardcoded fixtures to generate the required output.
- **Provider Interfaces**: Implemented as simple functions that return static fixture data when `providers.paid_enabled` is false or `--offline` is passed.
- **Dashboard**: The dashboard reads directly from the pipeline's output JSON in offline mode, rather than making authenticated requests to Supabase.
- **Scheduling**: The Claude Code scheduled agent is documented in the README but simulated via CLI for the acceptance criteria.
