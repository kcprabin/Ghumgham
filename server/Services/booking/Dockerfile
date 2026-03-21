FROM node:20-slim
WORKDIR /app


# first install the packages in the root directory
COPY server/Packages/package.json server/Packages/package-lock.json /app/Packages/
WORKDIR /app/Packages
RUN npm install


COPY server/Packages/ /app/Packages/


# then install the packages in the Booking service
WORKDIR /app
COPY server/Services/booking/package.json server/Services/booking/package-lock.json /app/
RUN npm install


COPY server/Services/booking/ /app/


EXPOSE 5002
CMD ["npm", "run", "dev"]