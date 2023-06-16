# Use the official Node.js 14 base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the project files to the container
COPY . .

# Build the React.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the React.js application
CMD ["npm", "start"]
