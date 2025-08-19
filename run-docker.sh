#!/bin/bash

# Run script for DevOps Task Manager Docker container
set -e

CONTAINER_NAME="devops-task-manager"
IMAGE_NAME="devops-task-manager:latest"
PORT="8080"

echo "🚀 Starting DevOps Task Manager container..."

# Stop and remove existing container if it exists
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Stopping existing container..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Run the container
echo "▶️  Starting new container..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    --restart unless-stopped \
    $IMAGE_NAME

echo "✅ Container started successfully!"
echo "🌐 Application is available at: http://localhost:$PORT"
echo "📊 Container status:"
docker ps --filter "name=$CONTAINER_NAME"

echo ""
echo "📝 Useful commands:"
echo "  View logs: docker logs $CONTAINER_NAME"
echo "  Stop container: docker stop $CONTAINER_NAME"
echo "  Remove container: docker rm $CONTAINER_NAME"

