import express from "express";

const router = express.Router();

router.get("/register", async(req, res) => {
  res.send("register route here !");
});

router.get("/login", async(req, res) => {
    res.send("Login route");
  });
  

export default router;
