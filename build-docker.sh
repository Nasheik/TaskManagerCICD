#!/bin/bash

# Build script for DevOps Task Manager Docker image
set -e

echo "🔨 Building DevOps Task Manager Docker image..."

# Build the Docker image
docker build -t devops-task-manager:latest .

echo "✅ Docker image built successfully!"

# Show image details
echo "📋 Image details:"
docker images devops-task-manager:latest

echo "🚀 To run the container:"
echo "docker run -p 8080:80 devops-task-manager:latest"
echo ""
echo "🌐 Then visit: http://localhost:8080"

