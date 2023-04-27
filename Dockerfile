# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
#RUN npm run build --prod
RUN npm run build

# Expose the port on which the app will run (default is 80 for Angular)
EXPOSE 80

# Define the command to run when the container starts
CMD ["npm", "start"]
