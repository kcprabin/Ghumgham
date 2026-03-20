FROM node:20-slim

WORKDIR /app


COPY server/Packages/ ./app/Packages/


COPY server/Services/admin/package.json server/Services/admin/package-lock.json ./

RUN npm install

COPY server/Services/admin/ .

EXPOSE 4001

CMD ["npm", "run", "dev"]