import { StaffData } from "../dto/StaffData";
import CSVUtil from "./CSVUtil";

const mockStaffData: StaffData = {
  staff_pass_id: "STAFF_123431",
  team_name: "GRYFFINDOR",
  created_at: "00000000",
};

const errorMessage = "aa";

jest.mock("fs", () => ({
  createReadStream: jest.fn(() => ({
    pipe: jest.fn(() => ({
      on: jest.fn((event, onFunction) => {
        if (event === "data") {
          onFunction(mockStaffData);
        } else if (event === "end") {
          throw new Error(errorMessage);
        } else if (event === "error") {
          throw new Error(errorMessage);
        }
      }),
    })),
  })),
}));

jest.mock("csv-parser", () => jest.fn(() => jest.fn()));

describe("CSVUtil", () => {
  describe("queryRow", () => {
    it("should return a row if callback returns the row", async () => {
      const callback = jest.fn();
      callback.mockReturnValue(mockStaffData);
      const result = await CSVUtil.queryRow(callback, "Error message");
      expect(result).toEqual(mockStaffData);
      expect(callback).toHaveBeenCalled();
    });
  });
});
