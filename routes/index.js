var express = require('express');
var router = express.Router();
var cookie = express.cookie;
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


router.get('/', async function(req, res, next) {
  const rows = await prisma.rows.findMany({
    select: {
      name: true,
      letter: true,
      petals_to_complete: true,
    },
    where: {
      alphabet_id: {
        equals: 1,
      }
    }
  })

  res.render('index', { 
    alphabet: "Hiragana",
    title: 'Learn Japanese alphabets for free!',
    rows: rows,
    cookies: req.cookies,
  });
});

module.exports = router;
