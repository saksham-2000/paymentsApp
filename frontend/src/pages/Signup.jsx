
import {Heading} from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"

export function Signup(){
    return <div className="flex justify-center">
     <div className="my-10 border rounded-lg bg-white p-2">
        <Heading label="Sign up"></Heading>
        <SubHeading label="Enter your information to create an account"></SubHeading>
        <InputBox textField="First Name" placeholder="Saksham"></InputBox>
        <InputBox textField="Last Name" placeholder="Garg"></InputBox>
        <InputBox textField="Email" placeholder="abc123@gmail.com"></InputBox>
        <InputBox textField="Password" placeholder="Password"></InputBox>
        <Button label="Sign up"></Button>
        <BottomWarning label="Already have an account?" linkText="Login" to="/signin"></BottomWarning>
    </div>
    </div>
}