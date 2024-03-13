import Employee from "./Person/Employee";

class Redemption {
  private owner: Employee;
  private redeemed_at: string;

  constructor(owner: Employee, redeemed_at: string) {
    this.owner = owner;
    this.redeemed_at = redeemed_at;
  }

  public getTeam() {
    return this.owner.getTeamName();
  }
}

export default Redemption;
