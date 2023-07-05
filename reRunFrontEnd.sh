#!/bin/bash

# stop and remove the frontend container
docker stop funny-react-1
docker rm funny-react-1

# navigate to the frontend directory
cd frontend

# rebuild the frontend Docker image and start a new container
docker buildx build -t funny-react -f Dockerfile.frontend .

# navigate back to the main directory
cd ..

# restart the services using docker-compose
docker-compose up -d
