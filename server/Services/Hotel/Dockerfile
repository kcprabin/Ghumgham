FROM node:20-slim
WORKDIR /app

# Copy shared Packages from root context
COPY server/Packages/ ./Packages/

# Copy service-specific files
# (path is relative to the build context = project root)
COPY server/Services/Hotel/package.json server/Services/Hotel/package-lock.json ./

RUN npm install

COPY server/Services/Hotel/ .

EXPOSE 3001

CMD ["npm", "run", "dev"]