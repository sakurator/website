import { prisma } from "@db/client.js";
import { Letter, Row } from "@prisma/client";
import { AdapterMiddlewareParams } from "@server/support/express/setup.js";
import { APIRow } from "./rows.js";

export type APILetter = Pick<Letter, 'name'> & { row: Row };

export async function controlLettersApiRoute({ req, res }: AdapterMiddlewareParams) {
    const alphabet: string = req.params.alphabet as string;
    const slug: string = req.params.slug as string;

    const row: APIRow | null = await prisma.row.findFirst({
        select: {
            name: true,
            letter: true,
            petalsToComplete: true,
            slug: true,
            thumbnailKana: true,
        },
        where: {
            slug: {
                equals: slug,
            }
        }
    });

    if (row === null) {
        return res.status(404);
    }

    const letters: APILetter[] = await prisma.letter.findMany({
        select: {
            name: true,
            row: true,
        },
        where: {
            row: {
                alphabet: {
                    name: {
                        equals: alphabet,
                    },
                },
                slug: {
                    equals: slug,
                },
            },
        },
    });

    if (letters.length === 0) {
        return res.status(404);
    }

    res.send({
        letters,
        row,
    });
}
