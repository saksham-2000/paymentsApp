import { useEffect } from "react";
import { useState } from "react"

import { InputBox } from "../components/InputBox";
import { ListUser } from "../components/ListUser";

import axios from "axios";

export function Dashboard(props){

    const [balance, setBalance]=useState(5000);
    const [filter,setFilter]=useState("");
    const token=localStorage.getItem('token');

    const [users,setUsers]=useState([
        {
            "id": "6690d554dfa620b4b65ab07b",        
            "firstName": "Saksham"
          },
          {
            "id": "6690d554dfa620b4b65ab07b",        
            "firstName": "Sagnik"
          },
          {
            "id": "6690d554dfa620b4b65ab07b",        
            "firstName": "Aryan"
          }

    ]);

    useEffect(function(){
        
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+ filter,{
            headers: {
                'Authorization': 'Bearer '+token
              }
        })
        .then(function(response){
            let arr=response.data.user;
            let arr2=[]
            arr2=arr.map(function(u){
                return {
                    firstName: u.firstName,
                    id: u._id
                }
            })
            console.log("saksham res: ", arr2);
            setUsers(arr2);
        })
        .catch(function(e){

        });

      
    },[filter]);


    return <>
    <div className="flex justify-between shadow-md my-4 px-2 py-2">
<div className="text-2xl font-semibold ">
    Payments App
</div>
<div className="flex">
    <div className="mr-2 flex items-center">
Hello, User
    </div>
    <div className="rounded-full w-8 h-8 flex justify-center items-center bg-gray-300">
        U
    </div>
</div>
    </div>
    <div className="text-xl pl-2 my-4">
      <span className="font-bold">Your Balance</span> <span className="font-semibold">${balance}</span> 
    </div>
    
    <InputBox textField={"Users"} placeholder={"Search users..."} onChange={function(e){
        setFilter(e.target.value);
        
    }}></InputBox>
    {

        users.map(function(user){
    
            return <ListUser key={Math.random()} firstName={user.firstName} to={"/sendmoney?friend="+ user.firstName}></ListUser>
           
        })
       
    }
    </>
} 