import { Link } from "react-router-dom"

export function BottomWarning(props){
  return <div className="flex justify-center py-2">
  <div className=" px-2">
        {props.label}
  </div>
 <Link className="underline pointer" to={props.to}>{props.linkText}</Link>
  </div>
}