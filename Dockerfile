# pull official base image
FROM node:11.10.0-alpine

RUN mkdir /app
# set working directory
WORKDIR /app
COPY /src /app/src
COPY ["package.json", "package-lock.json*", "./"]

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
RUN npm install --silent
RUN npm audit fix
RUN npm install react-scripts@3.4.0 -g

# add app
COPY . ./