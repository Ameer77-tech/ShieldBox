FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package.json ./
RUN yarn install --frozen-lockfile

# Copy code
COPY . .

# Optional: if using TypeScript or build step
# RUN yarn build

# Expose API port
EXPOSE 3000

# Environment vars (defaults, real ones set in host)
ENV NODE_ENV=production
ENV PORT=3000

# Start app
CMD ["yarn", "start:prod"]
