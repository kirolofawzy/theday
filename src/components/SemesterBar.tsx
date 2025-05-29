import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);
  const [askAgain, setAskAgain] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [currentSemester, setCurrentSemester] = React.useState(0);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const currentSemester = parseInt(localStorage.getItem("currentSemester")!);
    setCurrentSemester(currentSemester);
    // only setTimeout if currentSemester is not -1 or null

    // check if there is a semester in local storage
    const semester =
      parseInt(localStorage.getItem("semester")!) == -1 ||
      !localStorage.hasOwnProperty("semester");

    console.log(
      "semester : " + semester + "\ncurrentSemester : " + currentSemester
    );

    // if the semester that is in the main page is not set (-1) or there is no error so the currentSemester was set correctly
    if (semester && currentSemester)
      // wait for any mouse click or keyboard press
      document.addEventListener(
        "mousedown",
        () => {
          console.log("called");

          setTimeout(() => {
            handleClick();
          }, 4000);
        },
        { once: true }
      );
  }, []);
  const handleClick = () => {
    setOpen(true);
  };

  const handelYes = (event: React.SyntheticEvent | Event, reason?: string) => {
    // set current semester to currentSemester
    localStorage.setItem("semester", currentSemester.toString());
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleNo = () => {
    // Handle No response to the first prompt
    setOpen(false);
    
    // Set a timer to show the second prompt after 5 seconds
    const timeoutId = setTimeout(() => {
      setAskAgain(true);
    }, 5000); // 5 seconds delay
    
    setTimer(timeoutId);
  };

  const handleSecondYes = () => {
    // Create a custom semester with just a placeholder
    // Since this is the general semester bar without a specific subject
    const customSemesterSubjects = JSON.stringify([]);
    localStorage.setItem("customSemesterSubjects", customSemesterSubjects);
    localStorage.setItem("customSemesterName", "Special for you 🌹");
    
    // Set a custom semester flag
    localStorage.setItem("semester", "-2"); // Use -2 to indicate custom special semester
    setAskAgain(false);
    
    // Show confirmation message
    setShowConfirmation(true);
    
    // Auto-hide the confirmation after 4 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 4000);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // set current semester to -1
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setAskAgain(false);
    if (timer) {
      clearTimeout(timer);
    }
  };
  // First prompt actions
  const firstPromptActions = (
    <React.Fragment>
      <Button
        color="success"
        size="small"
        onClick={handelYes}
        sx={{
          fontWeight: "bolder",
        }}
      >
        Yes
      </Button>
      <Button
        color="primary"
        size="small"
        onClick={handleNo}
        sx={{
          fontWeight: "bolder",
        }}
      >
        No
      </Button>
    </React.Fragment>
  );

  // Second prompt actions
  const secondPromptActions = (
    <React.Fragment>
      <Button
        color="success"
        size="small"
        onClick={handleSecondYes}
        sx={{
          fontWeight: "bolder",
        }}
      >
        Yes
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  //   after 4 seconds, show the snackbar
  return (
    <>
      {/* <Snackbar
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#1e293b",
            color: "#fff",
          },
        }}
        open={open}
        onClose={handleClose}
        message={"Are you in semester " + currentSemester + " ?"}
        action={
          <React.Fragment>
            <Button
              color="success"
              size="small"
              onClick={handelYes}
              sx={{
                fontWeight: "bolder",
              }}
            >
              Yes
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleNo}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        transitionDuration={600}
        autoHideDuration={20000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
       */}

    </>
  );
}
