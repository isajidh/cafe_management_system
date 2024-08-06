# Use an official node image as a parent image
FROM node:20.11.1

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Install serve to serve the build
RUN yarn global add serve

# Expose port 80
EXPOSE 80

# Start the application
CMD ["serve", "-s", "build", "-l", "80"]
