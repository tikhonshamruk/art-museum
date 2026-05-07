FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM ubuntu:latest
RUN apt-get update && apt-get install -y nginx && apt-get clean
COPY --from=build /app/dist/art-museum /var/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]