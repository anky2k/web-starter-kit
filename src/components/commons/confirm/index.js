const Confirm = ({ title, onConfirm, onCancel }) => {
    return (
        <div className="form-control w-full items-center mt-8">            
            <span className="w-3/4 text-xl">{title}</span>
            <div className="mt-6 grid grid-cols-2 w-3/4">
                <button className="btn btn-outline mr-3 text-xs md:text-base lg:text-base" onClick={onCancel}>No</button> 
                <button className={`btn bg-gradient-to-r from-pink-500 hover:to-yellow-500 text-xs md:text-base lg:text-base`}  onClick={onConfirm}>Yes</button> 
            </div>                  
        </div>
    )
}

export default Confirm;
