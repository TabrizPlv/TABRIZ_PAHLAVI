import { Express } from "express";
import { getStaffByStaffID } from "./controller/Staff";
import { verifyStaffID } from "./middleware/StaffIDValidation";

function routes(app: Express) {
  app.route("/staff/:staff_pass_id").get(verifyStaffID, getStaffByStaffID);
}

export default routes;
