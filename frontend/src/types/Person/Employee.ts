import Person from "./Person";

class Employee extends Person {
  constructor(staff_pass_id: string, team_name: string) {
    super(staff_pass_id, team_name);
  }
  public getStaffID() {
    return this.staff_pass_id;
  }
  public getTeamName() {
    return this.team_name;
  }
}

export default Employee;
