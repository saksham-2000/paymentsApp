import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { useSearchParams } from "react-router-dom";

export function SendMoney() {
  const [searchParams] = useSearchParams();

  const friendName=searchParams.get('friend');

  return (
    <div className="flex justify-center items-center">
      <div className="my-20 border rounded-lg bg-white p-2 w-96 h-full">
        <Heading label={"Send Money"}></Heading>
        <div className="flex my-10">
          <div className="rounded-full bg-green-500 w-12 h-12 flex items-center justify-center">
            <span className="text-2xl text-white ">{friendName?friendName[0].toUpperCase():"A"}</span>
          </div>
          <div className="mx-2 my-2">
            <span className="text-3xl"> {friendName?friendName:"Friend's Name"}</span>
          </div>
        </div>
        <div className="my-4">
          <InputBox
            textField="Amount (in Rs)"
            placeholder="Enter Amount"
          ></InputBox>
          <Button label="Initiate transfer" isGreen={true}></Button>
        </div>
      </div>
    </div>
  );
}
