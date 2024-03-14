import { StaffDataDto } from "../dto/StaffData.dto";
import StaffService from "../service/Staff";
import { Request, Response } from "express";

export async function getStaffByStaffID(req: Request, res: Response) {
  try {
    const { params } = req;
    const staff_pass_id = params.staff_pass_id as string;
    const { staff_pass_id: staffID, team_name } =
      await StaffService.getStaffByStaffID(staff_pass_id);
    const staffDataDto: StaffDataDto = { staff_pass_id: staffID, team_name };
    res.status(200).json(staffDataDto);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
}
