FROM node:20-slim
WORKDIR /app

# Copy shared Packages from root context
COPY Packages/ ./Packages/

# Copy service-specific files
# (path is relative to the build context = project root)
COPY server/Services/booking/package.json server/Services/booking/package-lock.json ./

RUN npm install

COPY server/Services/booking/ .

EXPOSE 5002

CMD ["npm", "run", "dev"]