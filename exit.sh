#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

docker compose down --volumes
echo -e "${GREEN}Containers stopped and volumns are removed.${NC}"

echo -e "${BLUE}Removing exited containers...${NC}"
docker container prune -f

echo -e "${BLUE}Removing dangling volumes...${NC}"
docker volume prune -f

echo -e "${BLUE}Removing unused networks...${NC}"
docker network prune -f

echo -e "${GREEN}Docker cleanup completed.${NC}"