export function Button(props){
    return  <button onClick={props.onClick} type="button" className={"w-72 m-4 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center " + (props.isGreen==true?"bg-green-500 hover:bg-green-600":"bg-gray-800 hover:bg-gray-900")}>{props.label}</button>

}