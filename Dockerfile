FROM node:carbon

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . /app

CMD npm run prod

EXPOSE 8003