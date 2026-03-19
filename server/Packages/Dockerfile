FROM node

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY . .


CMD ["npm", "run", "dev"]




