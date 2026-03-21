FROM node:20-slim
WORKDIR /app


# first install the packages in the root directory
COPY server/Packages/package.json server/Packages/package-lock.json /app/Packages/
WORKDIR /app/Packages
RUN npm install


COPY server/Packages/ /app/Packages/


# then install the packages in the Admin service
WORKDIR /app
COPY server/Services/admin/package.json server/Services/admin/package-lock.json /app/
RUN npm install


COPY server/Services/admin/ /app/


EXPOSE 4001

CMD ["npm", "run", "dev"]