FROM node:20-slim
WORKDIR /app


# first install the packages in the root directory
COPY server/Packages/package.json server/Packages/package-lock.json /app/Packages/
WORKDIR /app/Packages
RUN npm install


COPY server/Packages/ /app/Packages/


# then install the packages in the Hotel service
WORKDIR /app
COPY server/Services/Hotel/package.json server/Services/Hotel/package-lock.json /app/
RUN npm install


COPY server/Services/Hotel/ /app/


EXPOSE 3001
CMD ["npm", "run", "dev"]