FROM node:16-bullseye-slim

# pre env vars
ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# post env vars
ENV PORT=4000

# Copying source files
COPY . /usr/src/app

# expose ports
EXPOSE 4000

# run the app
CMD ["npm", "start"]