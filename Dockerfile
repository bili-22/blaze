FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .
COPY blaze /app/blaze

RUN yarn --prod
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY dist /app/dist

EXPOSE 54321
CMD [ "node", "dist/HttpBlaze.js" ]