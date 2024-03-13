import CSVUtil from "../util/CSVUtil";
import { StaffData } from "../dto/StaffData";

class StaffService {
  public static async getStaffByStaffID(
    staff_pass_id: string
  ): Promise<StaffData> {
    const staffInfo = await CSVUtil.getRowByStaffID(staff_pass_id);
    return staffInfo;
  }
}
export default StaffService;
