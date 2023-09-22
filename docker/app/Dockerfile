FROM node:18.16.0-alpine as builder

USER node

WORKDIR /home/node/dca-api

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

ENV NODE_ENV=production

RUN yarn build


FROM node:18.16.0-alpine

USER node

WORKDIR /home/node/dca-api

COPY --from=builder /home/node/dca-api/dist ./dist
COPY --from=builder /home/node/dca-api/node_modules ./node_modules

CMD ["yarn", "start:prod"]
