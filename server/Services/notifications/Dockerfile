FROM node:20-slim
WORKDIR /app


# first install the packages in the root directory
COPY server/Packages/package.json server/Packages/package-lock.json /app/Packages/
WORKDIR /app/Packages
RUN npm install


COPY server/Packages/ /app/Packages/


# then install the packages in the notifications service
WORKDIR /app
COPY server/Services/notifications/package.json server/Services/notifications/package-lock.json /app/
RUN npm install


COPY server/Services/notifications/ /app/


EXPOSE 6000

CMD ["npm", "run", "dev"]