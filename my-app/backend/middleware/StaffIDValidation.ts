import { Request, Response, NextFunction } from "express";

export const verifyStaffID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const staff_pass_id = params.staff_pass_id as string;
  const split = staff_pass_id.split("_");
  if (split.length == 2) {
    if (split[0].length !== 0 && split[1].length !== 0) {
      next();
    }
  } else {
    res.status(500).send(`${staff_pass_id} is an invalid staff id!`);
  }
};
