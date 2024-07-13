export function InputBox(props){
    return <div>
        <div className="font-bold py-2 mx-2">
         {props.textField}
        </div>
        <div className="border px-1 py-1 mx-2">
        <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
        </div>
        
    </div>
}