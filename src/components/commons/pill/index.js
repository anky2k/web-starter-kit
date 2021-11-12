function Pill ({ text, onClick, index }) {
    return (
        <button
            onClick={onClick}
            className={`
            'text-purple-500'
            bg-transparent
            border border-solid border-purple-500
            hover:bg-purple-500 hover:text-white            
            active:bg-purple-600 active:text-white    
            focus:bg-purple-600 focus:text-white            
            font-bold
            uppercase
            text-sm
            px-4
            py-2
            rounded
            outline-none
            focus:outline-none
            mr-2
            lg:mr-4
            mb-1
            ease-linear
            transition-all
            duration-150`}
            type="button"
      >
        {text}
      </button>  
    )
}

export default Pill;
