FROM node:latest

WORKDIR usr/src

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm ci --quiet
RUN npm run build

ENV DB=mongo
ENV PORT=3001

EXPOSE 3001
CMD npm start
