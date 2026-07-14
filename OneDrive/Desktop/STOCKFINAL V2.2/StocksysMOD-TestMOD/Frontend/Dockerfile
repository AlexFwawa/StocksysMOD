# Stage 1: Build the React application
FROM node:22-alpine AS builder
WORKDIR /app
COPY Frontend/package.json Frontend/package-lock.json ./
RUN npm install
COPY Frontend . 
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Overwrite the default Nginx configuration
COPY Frontend/nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static files from the 'dist' folder
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
