CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE sources (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    url TEXT NOT NULL,
    enabled BOOLEAN DEFAULT true,
    cadence TEXT DEFAULT 'daily'
);

CREATE TABLE raw_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id TEXT REFERENCES sources(id),
    url TEXT NOT NULL,
    content TEXT NOT NULL,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    raw_document_id UUID REFERENCES raw_documents(id),
    title TEXT,
    address TEXT,
    rent_monthly NUMERIC,
    extracted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canonical_address TEXT NOT NULL,
    location GEOMETRY(POINT, 4326),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE parcels (
    id TEXT PRIMARY KEY,
    site_id UUID REFERENCES sites(id),
    owner TEXT,
    acreage NUMERIC,
    geom GEOMETRY(MULTIPOLYGON, 4326)
);

CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID REFERENCES sites(id),
    fact TEXT NOT NULL,
    value TEXT NOT NULL,
    source_url TEXT,
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    method TEXT
);

CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID REFERENCES sites(id),
    type TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    next_action TEXT,
    owner TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    email TEXT NOT NULL,
    role TEXT
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    direction TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID REFERENCES sites(id),
    total_score NUMERIC,
    breakdown JSONB,
    calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    finished_at TIMESTAMPTZ,
    sites_discovered INT DEFAULT 0,
    messages_sent INT DEFAULT 0,
    errors JSONB
);

-- RLS Policies
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON sites FOR SELECT USING (true);

ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public evidence viewable by everyone." ON evidence FOR SELECT USING (true);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public scores viewable by everyone." ON scores FOR SELECT USING (true);
