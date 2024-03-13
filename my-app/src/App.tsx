import React, { ChangeEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import "./App.css";
import { Box, Button, TextField } from "@mui/material";
import { AxiosError } from "axios";
import Redemption from "./types/Redemption";
import Employee from "./types/Person/Employee";
import { getStaffData } from "./axios/staff/staffRequests";
import BasicModal from "./components/modal/BasicModal";

const App: React.FC = () => {
  const [staffID, setStaffID] = useState<string>("");
  const [teamsRedeemed, setTeamsRedeemed] = useState<Set<Redemption>>(
    new Set<Redemption>()
  );
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>(
    "Here are your gifts!!!"
  );
  const [errorMessage, setErrorMessage] = useState<string>(
    "Something went wrong :("
  );
  const staffIDHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setStaffID(event.target.value);
  };
  const onSubmitHandler = async () => {
    try {
      const { staff_pass_id, team_name } = await getStaffData(staffID);
      teamsRedeemed.forEach((redemption) => {
        if (team_name === redemption.getTeam()) {
          throw new Error(
            `Your team ${team_name} has already collected your gifts!`
          );
        }
      });
      const newRedemption = new Redemption(
        new Employee(staff_pass_id, team_name),
        Date.now().toString()
      );
      const newSet = new Set<Redemption>(teamsRedeemed);
      newSet.add(newRedemption);
      setTeamsRedeemed(newSet);
      setSuccessMessage(`Merry Christmas to you and ${team_name}!!`);
      setSuccessModal(true);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        setErrorMessage(err.response.data as string);
        setErrorModal(true);
      } else {
        setErrorMessage(err.message);
        setErrorModal(true);
      }
    }
  };

  return (
    <>
      <BasicModal
        isOpen={successModal}
        OpenCloseHandler={() => setSuccessModal(!successModal)}
        title={"Redemption Successful!"}
        description={successMessage}
      />
      <BasicModal
        isOpen={errorModal}
        OpenCloseHandler={() => setErrorModal(!errorModal)}
        title={"Redemption Failed!"}
        description={errorMessage}
      />
      <Box className="main-container">
        <Box className="form-container">
          <Typography variant="h3" flex={1} mt={"5%"}>
            Ho Ho Ho!
          </Typography>
          <Typography variant="h4" flex={1}>
            Please Key In Your Staff ID To Collect Your Presents!
          </Typography>
          <TextField
            id="outlined-basic-uncontrolled"
            label="Staff ID"
            variant="outlined"
            sx={{ flex: 2, input: { color: "white" } }}
            onChange={staffIDHandler}
            value={staffID}
            color="success"
          />
          <Button
            variant="contained"
            sx={{ flex: 0.5, marginBottom: "5%", backgroundColor: "#891515" }}
            size="large"
            onClick={onSubmitHandler}
            color="error"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default App;
