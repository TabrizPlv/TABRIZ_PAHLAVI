import { StaffData } from "./StaffData";

export type StaffDataDto = Pick<StaffData, "staff_pass_id" | "team_name">;
