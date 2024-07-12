export function InputBox(props){
    return <div>
        <div className="font-bold py-2 mx-2">
         {props.textField}
        </div>
        <div className="border px-1 py-1 mx-2">
        <input type="text" placeholder={props.placeholder} />
        </div>
        
    </div>
}