var express = require("express");
var router = express.Router();
var cookie = express.cookie;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async function (req, res, next) {
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

module.exports = router;
