FROM node:14.18.1-alpine

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN ["apk", "add", "--no-cache", "--virtual", ".gyp", "python", "make", "g++"]
RUN yarn

# Copy source
COPY . .

# Build and migrate db
ENV NODE_ENV=production
RUN yarn build \
 && yarn db:sync \
 && yarn db:migrate

# Start server
CMD ["yarn", "start"]
