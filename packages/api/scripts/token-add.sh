#!/usr/bin/env bash
# This script can be used to detect if the database persists after a docker-compose restart.
# using token-count.sh along with this script helps to check if data survives a restart.
API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY1MDA3QTczOWFiN0FDNWM1MzcxNjEyNDliODEyNTBFNDllMjg1M0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTc1NDczNjYzOCwibmFtZSI6Im1haW4ifQ.wKwJIRXXHsgwVp8mOQp6r3_F4Lz5lnoAkgVP8wqwA_Y
curl -v 'localhost:8787/internal/tokens' -H "Authorization: Bearer $API_KEY" -H 'content-type: application/json' --data-raw '{"name":"abc"}' | jq
