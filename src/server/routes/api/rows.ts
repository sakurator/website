import { prisma } from "@db/client.js";
import { Row } from "@prisma/client";
import { AdapterMiddlewareParams } from "@server/support/express/setup.js";

export type APIRow = Pick<Row, 'name' | 'letter' | 'petalsToComplete' | 'slug'> & { thumbnailKana: string };

export async function controlRowsApiRoute({ res }: AdapterMiddlewareParams) {
    const rows: APIRow[] = await prisma.row.findMany({
        select: {
            name: true,
            letter: true,
            petalsToComplete: true,
            slug: true,
            thumbnailKana: true,
        },
        where: {
            alphabetId: {
                equals: 1,
            },
        },
    });

    res.send(rows);
}
