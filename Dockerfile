FROM node:8.9

# Create app directory
WORKDIR /var/www

# Install app dependencies
COPY package.json ./

# RUN npm install
# If you are building your code for production
RUN npm install

# Bundle app source
COPY . .

EXPOSE 9423

CMD [ "npm", "start" ]