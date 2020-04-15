#!/bin/bash
set -e
echo "Building web app..."
npm run build

echo "Cleaning target..."
(rm -r deploy/static deploy/*py*) || true

echo "Copying web app..."
cp -r dist/ deploy/static

echo "Copying backend..."
cp backend/*.py deploy/
mkdir -p deploy/sources
cp backend/sources/*.py deploy/sources

echo "Done!"
