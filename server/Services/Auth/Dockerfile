FROM node:20-slim

WORKDIR /app

# Copy lockfiles first — better layer caching
# (only re-runs npm ci if these files change)
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]