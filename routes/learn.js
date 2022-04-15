var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    },
    enumerable: false
});

/* GET users listing. */
router.get('/:alphabet/:row', async function(req, res, next) {
    let alphabet = req.params.alphabet.capitalize();
    let letter = req.params.row.toLowerCase()

    if(letter == "vowels")
        letter = ""

    let rowLetters = await prisma.letters.findMany({
        where: {
            rows: {
                alphabets: {
                    name: {
                        equals: alphabet,
                    },
                },
                letter: {
                    equals: letter,
                },
            },
        },
    })

    let allLetters = await prisma.letters.findMany({
        where: {
            rows: {
                alphabets: {
                    name: {
                        equals: alphabet
                    },
                },
            },
        },
    })

    if(rowLetters.length == 0)
        return res.status(404) 

    res.render('learn', { 
        title: "Learning the " + alphabet + " " + letter + " row",
        rowLetters: rowLetters,
        allLetters: allLetters,
        alphabet: alphabet,
        letter: letter,
    });
});

module.exports = router;