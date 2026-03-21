FROM node:20-slim
WORKDIR /app


# first install the packages in the root directory
COPY server/Packages/package.json server/Packages/package-lock.json /app/Packages/
WORKDIR /app/Packages
RUN npm install


COPY server/Packages/ /app/Packages/


# then install the packages in the Auth service
WORKDIR /app
COPY server/Services/Auth/package.json server/Services/Auth/package-lock.json /app/
RUN npm install


COPY server/Services/Auth/ /app/


EXPOSE 3000
CMD ["npm", "run", "dev"]