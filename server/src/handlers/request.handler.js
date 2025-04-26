import { validateRequest } from "express-validator";

const validate = (res, req, next) => {
  const errors = validateRequest(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

export default { validate };
