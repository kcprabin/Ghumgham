FROM node:20-slim
WORKDIR /app

# Copy shared Packages from root context
COPY server/Packages/ ./Packages/

# Copy service-specific files
# (path is relative to the build context = project root)
COPY server/Services/notifications/package.json server/Services/notifications/package-lock.json ./

RUN npm install

COPY server/Services/notifications/ .

EXPOSE 6000

CMD ["npm", "run", "dev"]