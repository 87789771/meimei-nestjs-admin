FROM alpine AS builder

WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add --no-cache --update nodejs nodejs-npm

COPY package.json /app/package.json

RUN npm config set registry https://registry.npm.taobao.org/ && npm i --production

FROM alpine

WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

COPY conf/Shanghai /etc/localtime

RUN apk add --no-cache --update nodejs nodejs-npm

COPY --from=builder /app/node_modules ./node_modules

COPY ./dist /app/dist/

EXPOSE 3000

CMD ["node", "dist/main"]
