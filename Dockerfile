FROM node:21-alpine3.18 as builder

USER node

WORKDIR /home/app/dca-api

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

ENV NODE_ENV=production

RUN yarn build

FROM node:21-alpine3.18

USER node

WORKDIR /home/app/dca-api

COPY --from=builder /home/app/dca-api/dist ./dist
COPY --from=builder /home/app/dca-api/node_modules ./node_modules

CMD ["node", "./dist/main.js"]
