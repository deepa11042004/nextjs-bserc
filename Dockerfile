# -------- 1. Dependencies --------
    FROM node:20-alpine AS deps
    WORKDIR /app
    
    COPY package.json package-lock.json* ./
    RUN npm ci
    
    # -------- 2. Build --------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # ✅ ADD THIS (build-time env)
    ARG API_URL
    ENV API_URL=$API_URL
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    RUN npm run build
    
    # -------- 3. Production (SECURE) --------
    FROM node:20-alpine AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # ✅ ADD THIS (runtime env)
    ENV API_URL=$API_URL
    
    # Create non-root user (security fix)
    RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
    
    # Copy standalone output only
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    
    # Fix permissions
    RUN chown -R nextjs:nodejs /app
    
    USER nextjs
    
    EXPOSE 3000
    
    CMD ["node", "server.js"]