# Build Client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Setup Server
FROM node:20-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./

# Copy built client to server's public directory
COPY --from=client-builder /app/client/dist ./public

# Expose port and start
EXPOSE 3000
CMD ["npm", "start"]
