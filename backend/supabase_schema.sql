-- 1. Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the resumes table
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    content TEXT NOT NULL,
    email TEXT,
    skills JSONB,
    embedding VECTOR(384),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create a vector index (HNSW) for faster cosine similarity queries
-- Optional but recommended for production scale.
CREATE INDEX ON resumes USING hnsw (embedding vector_cosine_ops);
