import { Link } from "react-router-dom"

export function ListUser(props){
    return (
<div className="flex justify-between m-4 rounded-md border p-2">
    <div className="flex">
            <div className="rounded-full w-8 h-8 bg-gray-100 flex items-center justify-center">
             {props.firstName[0].toUpperCase()}
            </div>
            <div className="flex items-center mx-2 font-semibold">
           {props.firstName}
            </div>
    </div>
    <Link className="bg-black text-white px-4 rounded-md flex items-center" to={props.to}> Send Money</Link>
</div>
    )
}