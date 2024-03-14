import fs from "fs";
import csvParser from "csv-parser";
import { StaffData } from "../dto/StaffData";

class CSVUtil {
  private static csvFilePath = "./asset/staff-id-to-team-mapping-long.csv";

  public static queryRow(
    callback: (row: StaffData) => StaffData | undefined,
    errorMessage: string
  ): Promise<StaffData> {
    return new Promise((resolve, reject) => {
      const readableStream = fs.createReadStream(this.csvFilePath);
      readableStream
        .pipe(csvParser())
        .on("data", (row) => {
          const rowData: StaffData = {
            staff_pass_id: row.staff_pass_id,
            team_name: row.team_name,
            created_at: row.created_at,
          };
          const result = callback(rowData);
          if (result) {
            resolve(result);
            readableStream.destroy();
          }
        })
        .on("end", () => {
          reject(new Error(errorMessage));
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
  public static getRowByStaffID(staff_pass_id: string) {
    const callback = (row: StaffData) => {
      if (row.staff_pass_id === staff_pass_id) {
        const rowData: StaffData = {
          staff_pass_id: row.staff_pass_id,
          team_name: row.team_name,
          created_at: row.created_at,
        };
        return rowData;
      }
    };
    const errorMessage = `${staff_pass_id} is an invalid staff ID!`;
    return this.queryRow(callback, errorMessage);
  }
}

export default CSVUtil;
