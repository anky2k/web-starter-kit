const Confirm = ({ title, onConfirm, onCancel }) => {
    return (
        <div className="form-control w-full items-center mt-8">            
            <span className="w-3/4">{title}</span>
            <div className="mt-6 grid grid-cols-2 w-3/4">
                <button className="btn btn-outline btn-primary mr-3" onClick={onCancel}>No</button> 
                <button className="btn btn-primary" onClick={onConfirm}>Yes</button> 
            </div>                  
        </div>
    )
}

export default Confirm;
