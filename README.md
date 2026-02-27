# Resume Intelligence AI

A production-ready, full-stack AI SaaS platform that allows users to upload resumes and semantically match them against job descriptions.

## Architecture

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS
*   **Backend**: FastAPI, Python, sentence-transformers
*   **Database**: PostgreSQL with pgvector (hosted on Supabase)
*   **Authentication & Storage**: Supabase Auth and Storage

## Features

1.  **Resume Upload & Parsing**: Upload PDF resumes, extract text and parse information (skills, experience).
2.  **Semantic Search (AI)**: Uses `all-MiniLM-L6-v2` via `sentence-transformers` to generate embeddings for resumes and job descriptions.
3.  **Vector Database**: Stores embeddings in Supabase `pgvector` for lightning-fast similarity search (cosine distance).

## Local Development Requirements

*   Node.js (for Frontend)
*   Python 3.11+ (for Backend)
*   A Supabase project (for DB, Auth, and Storage)

## Setup Instructions

### 1. Database Setup (Supabase)

You need to execute the SQL schema (located in `backend/supabase_schema.sql`) in your Supabase project's SQL Editor to create the necessary tables and enable the `pgvector` extension.

### 2. Backend Setup

```bash
cd backend
python -m venv .venv
# Activate virtual environment (Windows)
.venv\Scripts\activate
# Activate virtual environment (Mac/Linux)
source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory with your Supabase credentials (see `.env.example`).

Run the backend server:

```bash
uvicorn main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory with your Supabase credentials (see `.env.example`).

Run the frontend development server:

```bash
npm run dev
```
