FROM node:12-alpine
ENV APP_ROOT=/usr/src/app
WORKDIR $APP_ROOT
COPY . ./
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]