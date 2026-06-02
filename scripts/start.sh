#!/bin/bash
cd "$(dirname "$0")/.."
npx pm2 start ecosystem.config.js
