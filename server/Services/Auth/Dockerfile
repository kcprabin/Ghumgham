FROM node:20-slim
WORKDIR /app


COPY Packages/ ./Packages/

# Copy service-specific files
# (path is relative to the build context = project root)
COPY server/Services/Auth/package.json server/Services/Auth/package-lock.json ./

RUN npm install

COPY server/Services/Auth/ .

EXPOSE 3000

CMD ["npm", "run", "dev"]