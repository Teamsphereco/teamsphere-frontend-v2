# STAGE 1: Base image for dependencies
FROM node:24-alpine3.21 as base

WORKDIR /app

# Copy package.json and lock file to install dependencies
COPY package.json package-lock.json ./

# Install all dependencies (both production and dev dependencies)
RUN npm install 

# Copy the rest of the application source code
COPY . .

# STAGE 2: Build the application
FROM base as build

# Set the environment to production for the build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application (with ContentLayer MDX processing)
RUN npm run build

# Prune dev dependencies after build
RUN npm prune --production

# STAGE 3: Final production image
FROM node:24-alpine3.21 as production

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/node_modules ./node_modules

# Expose the port Next.js will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]