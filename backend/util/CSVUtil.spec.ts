import { StaffData } from "../dto/StaffData";
import CSVUtil from "./CSVUtil";

const mockStaffData: StaffData = {
  staff_pass_id: "STAFF_123431",
  team_name: "GRYFFINDOR",
  created_at: "00000000",
};

const mockOn = {
  on: (event: string, onFunction: any) => {
    if (event === "data") {
      onFunction("mock parameter");
    } else if (event === "end") {
      onFunction();
    } else if (event === "error") {
      onFunction("mock error");
    }
    return mockOn;
  },
};

jest.mock("fs", () => ({
  createReadStream: jest.fn(() => ({
    pipe: jest.fn(() => mockOn),
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
    it("should give an error if no row matches", async () => {
      const errorMessage = "error message";
      const callback = jest.fn();
      callback.mockReturnValue(undefined);
      try {
        await CSVUtil.queryRow(callback, errorMessage);
      } catch (error) {
        const err = error as Error;
        expect(err.message).toBe(errorMessage);
      }
    });
  });
});


