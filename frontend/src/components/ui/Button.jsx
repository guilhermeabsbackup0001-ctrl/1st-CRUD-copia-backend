export const Button = ({ children, buttonClick, variant }) => {
    
    const variantClasses = {
        primary: "bg-[#1d7b4b] cursor-pointer w-30 p-2 rounded-sm hover:bg-green-500 font-sans font-semibold text-white text-lg max-[599px]:mt-2 mb-2",
        secondary: "bg-[#b71a06] cursor-pointer p-2 rounded-sm hover:bg-red-500 font-sans font-semibold text-white text-lg max-[599px]:mt-2 mb-2"
    }
    
    return (
        <div className="flex flex-col p-2 mt-9.5 max-[599px]:p-2 max-[599px]:mt-0">
            <button className= {variantClasses[variant]}
            onClick={buttonClick}>{children}</button>
        </div>
    )
}