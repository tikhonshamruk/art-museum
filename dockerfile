# ART-MUSEUM/Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/art-museum /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]