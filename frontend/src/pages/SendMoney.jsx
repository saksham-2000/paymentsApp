import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

export function SendMoney() {
  const [searchParams] = useSearchParams();

  const friendName=searchParams.get('friend');
  const toId=searchParams.get('id');

  const [amount,setAmount]=useState(0);

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
          <InputBox type={"number"}
            textField="Amount (in Rs)"
            placeholder="Enter Amount"
            onChange={function(e){
              setAmount(e.target.value);
            }}
          ></InputBox>
          <Button label="Initiate transfer" isGreen={true} onClick={async function(){
            try{
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
              amount: amount,
              to: toId
          },{
             headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
              }
          });
          console.log(response.data);
          if(response.status==200){        
            alert(response.data.message);
          }
        }catch(e){
          alert(e);
        }
          }}></Button>
        </div>
      </div>
    </div>
  );
}
