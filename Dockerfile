FROM nginx:alpine3.21

COPY . /usr/share/nginx/html
EXPOSE 80
