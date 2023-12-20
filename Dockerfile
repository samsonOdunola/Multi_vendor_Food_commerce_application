FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

ENV PORT=${PORT} \    
    DB_HOST=${DB_HOST} \
    DB_USER=${DB_USER} \
    DB_PASSWORD=${DB_PASSWORD} \
    DB=${DB} \
    EMAIL_USER=${EMAIL_USER} \
    EMAIL_PASSWORD=${EMAIL_PASSWORD} \
    CLIENT_ID=${CLIENT_ID} \
    CLIENT_SECRET=${CLIENT_SECRET} \
    REFRESH_TOKEN=${REFRESH_TOKEN} \
    HOST=${HOST} \
    JWT_KEY=${JWT_KEY} \
    PAYSTACK_SECRET=${PAYSTACK_SECRET} \
    PAYSTACK_CALLBACK_URL=${PAYSTACK_CALLBACK_URL}

EXPOSE 3000

CMD ["node", "index.js"]

