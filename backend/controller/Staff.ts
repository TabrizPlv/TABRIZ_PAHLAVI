import StaffService from "../service/Staff";
import { Request, Response } from "express";

export async function getStaffByStaffID(req: Request, res: Response) {
  try {
    const { params } = req;
    const staff_pass_id = params.staff_pass_id as string;
    const staffData = await StaffService.getStaffByStaffID(staff_pass_id);
    res.status(200).json(staffData);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
}
