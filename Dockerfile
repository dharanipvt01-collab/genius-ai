# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Configure Yarn registry for reliable dependency resolution
RUN npm config set strict-ssl false && npm config set registry https://registry.yarnpkg.com

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
