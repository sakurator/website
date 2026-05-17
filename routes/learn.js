import { Router } from "express";
import { prisma } from "../prisma/client.js";

var router = Router();

Object.defineProperty(String.prototype, "capitalize", {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    },
    enumerable: false,
});

/* GET users listing. */
router.get("/:alphabet/:row", async function (req, res) {
    let alphabet = req.params.alphabet.capitalize();
    let letter = req.params.row.toLowerCase();

    if (letter === "vowels") letter = "";

    let row = await prisma.row.findFirst({
        where: {
            alphabet: {
                name: {
                    equals: alphabet,
                },
            },
            letter: {
                equals: letter,
            },
        },
    });

    let rowLetters = await prisma.letter.findMany({
        where: {
            row: {
                alphabet: {
                    name: {
                        equals: alphabet,
                    },
                },
                letter: {
                    equals: letter,
                },
            },
        },
    });

    let allLetters = await prisma.letter.findMany({
        where: {
            row: {
                alphabet: {
                    name: {
                        equals: alphabet,
                    },
                },
            },
        },
    });

    if (rowLetters.length == 0) return res.status(404);

    res.render("learn", {
        title: "Учить набор '" + alphabet + " " + letter + "'",
        rowLetters: rowLetters,
        allLetters: allLetters,
        alphabet: alphabet,
        letter: letter,
        row: row,
    });
});

export default router;
