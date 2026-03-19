FROM node:20-slim

WORKDIR /app


COPY package.json package-lock.json ./
COPY Packages/ /Packages


RUN npm install

COPY . .

EXPOSE 6000

CMD ["npm", "run", "dev"]