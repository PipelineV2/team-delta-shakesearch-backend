
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

ENV ELASTIC_SEARCH_URI=https://my-deployment-dcda0d.es.us-central1.gcp.cloud.es.io


# Copy the rest of the application code
COPY . .

# Set the command to run your Node.js application
CMD [ "npm", "run","prod" ]
