import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// router.get(
//   "/profile",
//   authenticate,
//   (req, res) => {
//     res.status(200).json({
//       message: "Protected route accessed",
//       user: req.user,
//     });
//   }
// );

import { authorize } from "../middleware/authorize.js";

router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
  res.json({
    message: "Admin route accessed",
  });
});

export default router;
