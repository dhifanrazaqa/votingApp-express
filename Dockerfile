FROM node:20-alpine

## Create App Directory
WORKDIR /usr/src/app

## copy package, tsconfig
COPY package*.json ./
COPY tsconfig*.json ./

## build node_modules/
RUN npm ci

## copy src files 
COPY . . 

## bind the app to port 3000 mapped by the docker daemon 
EXPOSE 3000

## define the runtime 
CMD ["npm", "run", "dev"]