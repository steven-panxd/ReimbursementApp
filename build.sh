#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Checking prerequisites ===${NC}"

if ! command -v docker &> /dev/null; then
  echo -e "${RED}Error: Docker is not installed.${NC}"
  exit 1
fi

if ! docker info &> /dev/null; then
  echo -e "${RED}Error: Docker is installed but not running.${NC}"
  echo -e "${YELLOW}Please start Docker Desktop and try again.${NC}"
  exit 1
fi

if ! command -v docker-compose &> /dev/null; then
  echo -e "${RED}Error: docker-compose is not installed.${NC}"
  exit 1
fi

echo -e "${BLUE}=== Building Docker images ===${NC}"
docker compose build --no-cache

echo -e "${GREEN}=== Build completed successfully ===${NC}"

echo -e "${BLUE}=== Cleanup ===${NC}"
docker builder prune -f

echo -e "${GREEN}=== Cleanup succeed ===${NC}"
