import axios from "axios";
import { StaffData } from "../../types/StaffData";

export const getStaffData = async (staff_pass_id: string) => {
  const { data } = await axios.get<StaffData>(
    `http://localhost:3001/staff/${staff_pass_id}`
  );
  return data;
};
