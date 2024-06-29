# Use an official Node.js runtime as the base image
FROM node

RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb

RUN dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb

RUN mkdir -p ~/data/db

# Install MongoDB
RUN apt-get update && \
    apt-get install -y gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org

# Set the working directory for the backend
WORKDIR /usr/src/app/backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the backend code
COPY backend/ .

# Set the working directory for the frontend
WORKDIR /usr/src/app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the Angular project files
COPY frontend/ .

# Build the Angular application
RUN npm run build

# Move the built Angular app to the backend's public folder
RUN cp -r dist/dvd-app/browser/* /usr/src/app/backend/public/

# Set the working directory back to the backend
WORKDIR /usr/src/app/backend

# Expose the port the app runs on
EXPOSE 8080 27017

# Copy the startup script
COPY start.sh .

# Make the startup script executable
RUN chmod +x start.sh

# Command to run the startup script
CMD ["./start.sh"]
