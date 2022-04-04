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
router.get('/', async function(req, res, next) {
    let alphabet = req.query.alphabet.capitalize();
    let letter = req.query.row.toLowerCase()

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
                        equals: req.query.alphabet.capitalize()
                    },
                },
            },
        },
    })

    if(rowLetters.length == 0)
        return res.status(404) 

    res.render('learn', { 
        title: "Learning the " + req.query.alphabet + " " + (req.query.row || 'vowels') + " row",
        rowLetters: rowLetters,
        allLetters: allLetters,
        alphabet: alphabet,
        letter: letter,
    });
});

module.exports = router;