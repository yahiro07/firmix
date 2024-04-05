FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./ .

RUN npm run build

ENV NODE_ENV=production
ENV ENV_TYPE=production
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]
