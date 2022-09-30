FROM node:14 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN  npm run build


FROM nginx:stable-alpine

LABEL version="1.0"

RUN apk --no-cache add supervisor

COPY ./.docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/build .

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
