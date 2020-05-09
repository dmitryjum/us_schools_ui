# pull official base image
FROM node:11.10.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm audit fix
RUN npm install react-scripts@3.4.0 -g

# add app
COPY . ./