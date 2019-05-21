FROM node:12-alpine
WORKDIR /home/node
USER node
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run test
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
