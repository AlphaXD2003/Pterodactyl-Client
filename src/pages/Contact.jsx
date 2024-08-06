import { Label } from "@mui/icons-material";
import { Button, Input, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import contact from "../services/contact.appwrite";
function Contact() {
  const [loading, setLoading] = React.useState(true);
  const email = useSelector((state) => state.user.userData?.email);

  const [success, setSuccess] = React.useState(false);
  const userState = useSelector((state) => state.user);
  const [issue, setIssue] = React.useState("");
  const onButtonClick = async () => {
    if (issue === "") return alert("Please enter your issue");
    if(issue.length < 200) return alert("Please enter a detailed issue. Minimum 200 characters required.")
    const [userRes , userErr] = await contact.getContactById(userState.userData.$id)
    if(userErr){
      console.log("Error getting user data", userErr)
      
    }
    if(userRes){
      console.log("User data", userRes)
      if(userRes.content.length > 0){
        return alert("You have already submitted an issue. Please wait for the response")
      }
      
    }
    console.log("User data", userState.userData.$id, localStorage.email, issue)
    const [response, error] = await contact.createContact(
      userState.userData.$id,
      localStorage.email,
      issue
    );
    if (error) {
      console.log("Error creating contact: ", error);
      return;
    }
    if (response) {
      setSuccess(true);
    } else {
      setSuccess(false);
      return;
    }
    
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <div>Loading</div>
  ) : (
    <div className=" m-4  flex-1 h-[650px] flex flex-col overflow-y-auto bg-neutral-100 rounded-sm pb-4 ">
      <div className="w-[650px]">
        <Label className="m-2">Email</Label>
        <Input
          readOnly
          value={localStorage?.email}
          label="Enter email"
          placeholder="Enter your email here"
          className="m-2"
          fullWidth
          color="success"
        />
      </div>
      <div className="w-[850px] mt-4">
        <TextField
          id="outlined-textarea"
          label="Describe your issue here"
          placeholder="I want to tell you about..."
          multiline
          fullWidth
          color="warning"
          onChange={e => setIssue(e.target.value)}
        />
      </div>
      <div className="mr-2 mt-8 w-[950px] ml-auto">
        <Button
          onClick={onButtonClick}
          className="m-2"
          variant="contained"
          color="success"
        >
          Submit
        </Button>
      </div>
      {success && (
        <div className="bg-neutral-100 ml-auto mt-auto">
          <Alert variant="filled" className="mt-auto" severity="success">
            Your issue has been submitted successfully
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Contact;
