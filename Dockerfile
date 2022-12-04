FROM node:18-alpine as build

WORKDIR /usr/app

COPY --chown=node:node ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

USER node

FROM node:18-alpine as production

COPY --chown=node:node --from=build /usrapp/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist

CMD [ "node", "dist/main.js" ]