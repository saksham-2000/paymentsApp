
import {Heading} from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"

export function Signin(){
    return <div className="flex justify-center">
     <div className="my-10 border rounded-lg bg-white p-2">
        <Heading label="Sign In"></Heading>
        <SubHeading label="Enter your credentials to access your account"></SubHeading>
        <InputBox textField="Email" placeholder="abc23@gmail.com"></InputBox>
        <InputBox textField="Password" placeholder="Password"></InputBox>
        <Button label="Sign In"></Button>
        <BottomWarning label="Don't have an account?" linkText="Sign Up" to="/signup"></BottomWarning>
    </div>
    </div>
}