import "dotenv/config";
import { env, PrismaConfig } from "prisma/config";

export default {
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
        seed: "npx tsx prisma/seed.js",
    },
    datasource: {
        url: env("DATABASE_URL"),
    },
} satisfies PrismaConfig;
