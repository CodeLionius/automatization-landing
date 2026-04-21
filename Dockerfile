# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies - include devDependencies for build
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build the application
# Node 20 doesn't need --experimental-global-webcrypto, but we've added it to the scripts 
# for local Node 18 compatibility, which is fine.
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine AS production

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set up directories and permissions for non-root nginx
RUN touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Copy custom nginx configuration (configured for port 8080)
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    server_name localhost;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' https://tally.so https://cal.com; script-src 'self' 'unsafe-inline' https://tally.so; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; frame-src https://tally.so https://cal.com; object-src 'none'; base-uri 'self'; form-action 'self' https://tally.so;" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Resource-Policy "same-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
    }
    
    # Cache service worker for 24 hours
    location /sw.js {
        expires 24h;
        add_header Cache-Control "public, max-age=86400";
    }
    
    # Main application
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
        
        # Cache HTML for 1 hour
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
        
        # Security headers for HTML
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy service worker to nginx html directory (if it exists)
# Note: we use || true to prevent build failure if sw.js is missing
COPY --from=builder /app/public/sw.js /usr/share/nginx/html/ || true

# Set ownership for the static files
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to non-root user
USER appuser

# Expose port 8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]