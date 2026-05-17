import { exit } from "process";
import alphabets from "./data/alphabets";
import rows from "./data/rows";
import letters from "./data/letters";
import { prisma } from "./client";


async function seed() {
    await prisma.letter.deleteMany();
    await prisma.row.deleteMany();
    await prisma.alphabet.deleteMany();

    for (let alphabet of alphabets) {
        await prisma.alphabet.create({
            data: alphabet,
        });
    }

    for (let row of rows) {
        await prisma.row.create({
            data: row,
        });
    }

    for (let letter of letters) {
        await prisma.letter.create({
            data: letter,
        });
    }
}

seed()
    .catch((error) => {
        console.error("Error occurred while seeding the database: ", error);
        exit(-1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
