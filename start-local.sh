#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="$ROOT_DIR/server"
CLIENT_DIR="$ROOT_DIR/client"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but was not found in PATH."
  exit 1
fi

if [[ ! -d "$SERVER_DIR" || ! -d "$CLIENT_DIR" ]]; then
  echo "Expected server/ and client/ directories next to this script."
  exit 1
fi

LOAD_LOCAL_ENV="${LOAD_LOCAL_ENV:-1}"
START_MODE="${START_MODE:-auto}"

if [[ "$START_MODE" == "remote" && "$LOAD_LOCAL_ENV" != "1" ]]; then
  echo "Remote mode requires LOAD_LOCAL_ENV=1."
  exit 1
fi

if [[ "$LOAD_LOCAL_ENV" == "1" && -f "$ROOT_DIR/.env.local" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT_DIR/.env.local"
  set +a
fi

if [[ "$START_MODE" == "remote" ]]; then
  if [[ ! -f "$ROOT_DIR/.env.local" ]]; then
    echo "Remote mode requires .env.local in the repo root."
    echo "Create it from .env.local.example and set MONGO_URI."
    exit 1
  fi
  if [[ -z "${MONGO_URI:-}" ]]; then
    echo "Remote mode requires MONGO_URI to be set in .env.local."
    exit 1
  fi
fi

MONGO_URI="${MONGO_URI:-mongodb://127.0.0.1:27017}"
DB_NAME="${DB_NAME:-comp307}"

echo "Checking MongoDB connection at $MONGO_URI (db: $DB_NAME) ..."
if ! (
  cd "$SERVER_DIR"
  MONGO_URI="$MONGO_URI" DB_NAME="$DB_NAME" node -e "const {MongoClient}=require('mongodb');(async()=>{const c=new MongoClient(process.env.MONGO_URI,{serverSelectionTimeoutMS:2500});await c.connect();await c.db(process.env.DB_NAME).command({ping:1});await c.close();console.log('MongoDB is reachable.');})().catch((e)=>{console.error('MongoDB is not reachable: '+e.message);process.exit(1);});"
); then
  echo ""
  echo "MongoDB is required before starting the app."
  echo "Start MongoDB locally, then rerun: npm run start:local"
  echo "Default expected URI: mongodb://127.0.0.1:27017"
  echo ""
  echo "If your MongoDB is elsewhere, run with:"
  echo "MONGO_URI='mongodb://<host>:<port>' npm run start:local"
  exit 1
fi

cleanup() {
  echo
  echo "Stopping local services..."
  if [[ -n "${CLIENT_PID:-}" ]] && kill -0 "$CLIENT_PID" 2>/dev/null; then
    kill "$CLIENT_PID" 2>/dev/null || true
  fi
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

echo "Starting backend on http://127.0.0.1:5000 ..."
(
  cd "$SERVER_DIR"
  MONGO_URI="$MONGO_URI" DB_NAME="$DB_NAME" npm run dev
) &
SERVER_PID=$!

echo "Starting frontend on http://127.0.0.1:3000 ..."
(
  cd "$CLIENT_DIR"
  npm run dev
) &
CLIENT_PID=$!

open_url() {
  local url="$1"
  if command -v cmd.exe >/dev/null 2>&1; then
    cmd.exe /c start "" "$url" >/dev/null 2>&1 || true
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$url" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then
    open "$url" >/dev/null 2>&1 || true
  fi
}

echo "Opening UI in your default browser..."
open_url "http://127.0.0.1:3000/signin.html"

echo ""
echo "Local stack is launching."
echo "- Frontend: http://127.0.0.1:3000/signin.html"
echo "- Backend:  http://127.0.0.1:5000/api-docs"
echo ""
echo "Press Ctrl+C here to stop both services."

wait -n "$SERVER_PID" "$CLIENT_PID"
echo "One of the services exited. Check logs above."
exit 1
