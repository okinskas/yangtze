FROM node:8-alpine as build

ARG VUE_APP_API_BASE
ARG VUE_APP_GMAP_KEY
ENV VUE_APP_API_BASE $VUE_APP_API_BASE
ENV VUE_APP_GMAP_KEY $VUE_APP_GMAP_KEY
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest as serve

ENV NGINX_HOST localhost
ENV NGINX_PORT 80
EXPOSE 80
COPY --from=build /usr/app/dist /usr/share/nginx/html
