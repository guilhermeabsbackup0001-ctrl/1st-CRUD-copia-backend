export const Input = ({ inputName, inputValue, inputType, inputChange, inputClick, required }) => {
    return (

        <div className="flex flex-col p-6 max-[599px]:p-1 w-70">
            <label htmlFor={inputName}>{inputName}</label>
            <input name={inputName} type={inputType} value={inputValue} onClick={inputClick}
                onChange={inputChange}
                className="bg-gray-200 p-2 text-base text-gray-800 font-semibold border-b border-[#1d7b4b]"
            />
            {required && inputValue.trim() === '' && (
                <p className="text-red-500 text-sm mt-3">Campo obrigatório</p>
            )}
        </div>
    )
}