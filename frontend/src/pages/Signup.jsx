import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <div className="flex justify-center">
      <div className="my-10 border rounded-lg bg-white p-2">
        <Heading label="Sign up"></Heading>
        <SubHeading label="Enter your information to create an account"></SubHeading>
        <InputBox type={"text"} 
          textField="First Name"
          placeholder="Saksham"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        ></InputBox>
        <InputBox type={"text"} 
          textField="Last Name"
          placeholder="Garg"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        ></InputBox>
        <InputBox type={"text"} 
          textField="Email"
          placeholder="abc123@gmail.com"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></InputBox>
        <InputBox type={"text"} 
          textField="Password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></InputBox>
        <Button
          label="Sign up"
          onClick={async function () {
            try{
                const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      username: username,
                      password: password,
                      firstName: firstname,
                      lastName: lastname,
                    }
                  );
                  if(response.status==200){
                      localStorage.setItem("token",response.data.token);
                     alert(response.data.message);
                     navigate("/dashboard");
                  }
            }catch(e){
                
                    alert("unable to sign up :(");
                    setFirstname("");
                
            }
            
          }}
        ></Button>
        <BottomWarning
          label="Already have an account?"
          linkText="Login"
          to="/signin"
        ></BottomWarning>
      </div>
    </div>
  );
}
