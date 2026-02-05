FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
WORKDIR /app/server
RUN npm ci
RUN npm run build
COPY sqlite_extensions/libsqliteai.so /usr/local/lib/libsqliteai.so
ENV LD_PRELOAD=/usr/local/lib/libsqliteai.so
EXPOSE 3000
CMD ["node", "dist/main.js"]

