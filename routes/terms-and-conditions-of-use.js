import { Router } from "express";

var router = Router();

router.get("/", function (_, res) {
    res.render("terms-of-use", {
        title: "Website Terms and Conditions of Use",
    });
});

export default router;
