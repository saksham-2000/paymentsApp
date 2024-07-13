import { useEffect } from "react";
import { useState } from "react"
import { InputBox } from "../components/InputBox";
import { ListUser } from "../components/ListUser";
import axios from "axios";

export function Dashboard(props){

 

    const [balance, setBalance]=useState(5000);
    const [filter,setFilter]=useState("");
    const [name,setName]=useState("User");
    const [id,setId]=useState("");
    const token=localStorage.getItem('token');

    const [users,setUsers]=useState([]);

    useEffect(function(){
        
        axios.get("http://localhost:3000/api/v1/account/",{
            headers: {
                'Authorization': 'Bearer '+token
              }
        })
        .then(function(response){
           // console.log(response.data);
              setName(response.data.firstName)
              setId(response.data.userId);
           
            })
        .catch(function(e){

        });

      
    },[]);


    useEffect(function(){
        
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+ filter,{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        })
        .then(function(response){
            let arr=response.data.user;
            // remove the signed-in user from the list
            let arr1=arr.filter(function(u){
                
                return u._id!=id;
            })
            let arr2=[]
            
            arr2=arr1.map(function(u){
                console.log(id, u._id);
                    return {
                        firstName: u.firstName,
                        id: u._id
                    }
                
            })
            
            setUsers(arr2);
        })
        .catch(function(e){

        });

      
    },[filter,id]);

    useEffect(function(){
        
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                'Authorization': 'Bearer '+token
              }
        })
        .then(function(response){
              setBalance(response.data.balance.toFixed(2))
            })
        .catch(function(e){

        });

      
    },[]);

    
    return <>
    <div className="flex justify-between shadow-md my-4 px-2 py-2">
<div className="text-2xl font-semibold ">
    Payments App
</div>
<div className="flex">
    <div className="mr-2 flex items-center">
Hello, {name}
    </div>
    <div className="rounded-full w-8 h-8 flex justify-center items-center bg-gray-300">
        {name[0].toUpperCase()}
    </div>
</div>
    </div>
    <div className="text-xl pl-2 my-4">
      <span className="font-bold">Your Balance</span> <span className="font-semibold">${balance}</span> 
    </div>
    
    <InputBox type={"text"} textField={"Users"} placeholder={"Search users..."} onChange={function(e){
        setFilter(e.target.value);
        
    }}></InputBox>
    {

        users.map(function(user){
    
            return <ListUser key={Math.random()} firstName={user.firstName} to={"/sendmoney?friend="+ user.firstName+ "&id="+ user.id}></ListUser>
           
        })
       
    }
    </>
} 