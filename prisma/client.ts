import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { env } from "process";

const adapter = new PrismaMariaDb({
    host: env.MYSQL_HOSTNAME,
    user: 'root',
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    port: 3306,
    connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter }).$extends({
    result: {
        row: {
            thumbnailKana: {
                needs: {
                    letter: true,
                },
                compute: ({ letter }) => `${letter}a`,
            }
        }
    }
});
