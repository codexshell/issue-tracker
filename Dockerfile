# Stage 1: Build
FROM node:16-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN npm run build

# Stage 2: Run
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/* /usr/share/nginx/html
EXPOSE 80
