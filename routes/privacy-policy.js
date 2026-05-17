import { Router } from "express";
var router = Router();

router.get("/", function (_, res) {
    res.render("privacy-policy", {
        title: "Website Privacy Policy",
    });
});

export default router;
