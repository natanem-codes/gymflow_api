import { Router } from "express";
import User from "../models/user.mjs";

const router = Router();

router.get("/me", async (req, res) => {
  try {
    const { username, firstName, lastName } = req.user;
    res.send({ username, firstName, lastName });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {}
});

export default router;
