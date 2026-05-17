FROM node:26.1.0-alpine3.23 AS run
WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci
COPY prisma/ prisma/
COPY prisma.config.ts .
COPY public/ public/
COPY routes/ routes/
COPY src/ src/
COPY views/ views/
COPY ./entrypoint.sh .
COPY ./bin/ ./bin/
COPY app.js .
ENTRYPOINT ["./entrypoint.sh"]
CMD ["./bin/www"]
