import express from "express";
import mediaRoute from "./route.media.js";
import personRoute from "./route.person.js";
import reviewRouter from "./route.review.js";
import userRouter from "./route.user.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/reviews", reviewRouter);
router.use("/:mediaType", mediaRoute);
router.use("/person", personRoute);

export default router;
