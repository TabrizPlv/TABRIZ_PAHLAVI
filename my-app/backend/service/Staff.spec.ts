import { StaffData } from "../dto/StaffData";
import CSVUtil from "../util/CSVUtil";
import StaffService from "./Staff";

describe("Staff Service", () => {
  const mockStaffData: StaffData = {
    staff_pass_id: "STAFF_123431",
    team_name: "GRYFFINDOR",
    created_at: "00000000",
  };

  describe("Get Staff By Staff ID", () => {
    test("service should return staff info", async () => {
      const mockGetRowByStaffId = jest.spyOn(CSVUtil, "getRowByStaffID");
      mockGetRowByStaffId.mockResolvedValueOnce(mockStaffData);
      const result = await StaffService.getStaffByStaffID(
        mockStaffData.staff_pass_id
      );
      expect(result).toEqual(mockStaffData);
    });
  });
});
