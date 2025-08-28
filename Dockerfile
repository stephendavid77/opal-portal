# Use a Node.js base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make the webapp_docker.sh script executable
RUN chmod +x webapp_docker.sh

# Command to run the application using webapp_docker.sh
CMD ["./webapp_docker.sh"]