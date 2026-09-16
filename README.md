# DealerSource

A production-grade system that continuously finds, verifies and ranks leaseable sites for a licensed used-car dealership in Eastern North Carolina.

## Offline First Run (Development)

You can run the entire pipeline and dashboard locally with no network and no credentials using local test fixtures.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests (Acceptance Criteria):**
   ```bash
   npm test
   ```

3. **Run Pipeline (Offline):**
   ```bash
   npm run pipeline -- --offline
   ```
   This will process fixtures and output `tests/fixtures/output.json`.

4. **Run Dashboard (Offline):**
   ```bash
   npm run dashboard:dev
   ```
   Visit `http://localhost:4321` to see the ranked shortlist.

## Deploy

### Environment Variables
Copy `.env.example` to `.env` and fill in the required values:

- `SUPABASE_URL`: Supabase project URL.
- `SUPABASE_ANON_KEY`: Supabase anon key.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (for pipeline admin access).
- `GOOGLE_MAPS_API_KEY`: For paid routing/geocoding (if enabled).
- `MAPBOX_TOKEN`: For dashboard map tiles (if using paid).
- `OPENROUTESERVICE_KEY`: For free isochrone service.
- `REGRID_TOKEN`: For paid parcel data.
- `MAPILLARY_TOKEN`: For free imagery.
- `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET`: For Reddit API.
- `GMAIL_OAUTH_CLIENT_ID` / `GMAIL_OAUTH_CLIENT_SECRET` / `GMAIL_OAUTH_REFRESH_TOKEN`: For email outreach.
- `CLAUDE_API_KEY`: For the scheduled agent LLM operations.

### Configuration (`config/`)

- **Flip a Provider:** Edit `config/providers.yaml`. Change the value for the layer (e.g., `geocoder: census` to `geocoder: nominatim`). To enable paid providers, set `paid_enabled: true` and select a paid option.
- **Enable a Grey Source:** Edit `config/sources.yaml`. Change `enabled: false` to `enabled: true` for the specific source `id`. Note: The system will refuse if `terms_status` is `prohibited`.
- **Pause Outreach:** Edit `config/business.yaml`. Set `mail.bounce_pause_pct` to `0` or adjust `mail.sender` config to a sink hole. Alternatively, use Supabase dashboard to pause the pipeline run.

### Dashboard
Deploy to Vercel via:
```bash
npx vercel apps/dashboard
```

### Scheduled Agent Setup
The system uses Claude Code to run the pipeline automatically.

1. Install Claude Code CLI in the deployment environment.
2. Authenticate Claude Code using the `CLAUDE_API_KEY`.
3. Set up a cron job (e.g., via `crontab` or `systemd` timers) according to the `schedule.cron` value in `business.yaml` (default `0 6 * * *`):
   ```bash
   0 6 * * * cd /path/to/repo && npm run pipeline
   ```
4. The agent handles pipeline execution, LLM extraction, and email ingestion inside the run.
