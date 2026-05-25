FROM node:26.1.0-alpine3.23 AS run
WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci
COPY prisma/ prisma/
COPY prisma.config.ts .
COPY public/ public/
COPY src/ src/
COPY views/ views/
COPY ./entrypoint.sh .
COPY app.ts .
COPY node.ts .
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npx", "tsx", "node.ts"]
