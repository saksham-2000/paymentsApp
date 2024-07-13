
import {Heading} from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";

export function Signin(){

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

    return <div className="flex justify-center">
     <div className="my-10 border rounded-lg bg-white p-2">
        <Heading label="Sign In"></Heading>
        <SubHeading label="Enter your credentials to access your account"></SubHeading>
        <InputBox type={"text"} textField="Email" placeholder="abc23@gmail.com" onChange={
            function(e){
                setUsername(e.target.value)
            }
        }></InputBox>
        <InputBox type={"text"}  textField="Password" placeholder="Password" onChange={
            function(e){
                setPassword(e.target.value)
            }
        }></InputBox>
        <Button label="Sign In" onClick={
            async function(){
                try{
                    const response = await axios.post(
                        "http://localhost:3000/api/v1/user/signin",
                        {
                          username: username,
                          password: password,
                        }
                      );
                      if(response.status==200){
                          localStorage.setItem("token",response.data.token);
                         alert(response.data.message);
                      }
                }catch(e){
                    console.log(e);
                        alert("unable to sign in :(");
                    
                }
            }
        }></Button>
        <BottomWarning label="Don't have an account?" linkText="Sign Up" to="/signup"></BottomWarning>
    </div>
    </div>
}