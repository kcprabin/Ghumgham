FROM node:20-slim

WORKDIR /app


COPY Packages/ /Packages
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]