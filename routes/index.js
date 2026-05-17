import { Router } from "express";
import { prisma } from "../prisma/client.js";
var router = Router();

router.get("/", async function (req, res) {
    const rows = await prisma.row.findMany({
        select: {
            name: true,
            letter: true,
            petalsToComplete: true,
        },
        where: {
            alphabetId: {
                equals: 1,
            },
        },
    });

    res.render("index", {
        alphabet: "Hiragana",
        title: "Учи хирагану и катакану бесплатно!",
        rows: rows,
        cookies: req.cookies,
    });
});

export default router;
