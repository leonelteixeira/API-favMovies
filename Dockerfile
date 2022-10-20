FROM node:16-alpine

# ENV NEW_RELIC_NO_CONFIG_FILE=true \
# NEW_RELIC_ENABLED=true \
# NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
# NEW_RELIC_LICENSE_KEY=${NEW_RELIC_LICENSE_KEY} \
# NEW_RELIC_APP_NAME=${NEW_RELIC_APP_NAME}

WORKDIR /usr/app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3331
EXPOSE 5432

CMD ["npm", "start"]
