# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy application files
COPY . .

# Expose container port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
