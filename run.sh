#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Starting all containers ===${NC}"

docker compose up -d

echo -e "${GREEN}=== All services are up ===${NC}"
echo -e "${BLUE}Container status:${NC}"
docker compose ps

docker compose ps -q > .running-containers.txt
echo -e "${YELLOW}Saved running container IDs to .running-containers.txt${NC}"