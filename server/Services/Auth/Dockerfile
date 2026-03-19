FROM node:20-slim

WORKDIR /app


COPY Packages/ /Packages
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]