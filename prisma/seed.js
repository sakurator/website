const alphabets = require('./data/alphabets')
const rows = require('./data/rows')
const letters = require('./data/letters')
const PrismaClient = require('@prisma/client').PrismaClient

const prisma = new PrismaClient()


async function seed() {
    await prisma.letters.deleteMany()
    await prisma.rows.deleteMany()
    await prisma.alphabets.deleteMany()

    for(let alphabet of alphabets) {
        await prisma.alphabets.create({
            data: alphabet,
        })
    }

    for(let row of rows) {
        await prisma.rows.create({
            data: row,
        })
    }

    for(let letter of letters) {
        await prisma.letters.create({
            data: letter,
        })
    }
}

seed()
    .catch(error => {
        console.error('Error occurred while seeding the database: ', error)
        process.exit(-1)
    })
    .finally(() => {
        prisma.$disconnect()
    })