const InputField = ({ type = 'text', name, placeholder, label, elementRef, options, incomplete, change }) => {

    let borderColor = 'border-transparent';

    if (incomplete) borderColor = 'border-red-400';
    const classes = `h-9 rounded-xl p-2 shadow-inner shadow-slate-950/20 text-sm border-2 ${borderColor} transition duration-300`

    if (type === 'select') {

        return (
            <>
                {label && name &&
                    <label className="text-sm" htmlFor={name}>{label}</label>}
                <select onChange={change} ref={elementRef} name={name} className={classes}>
                    <option value="">{placeholder}</option>
                    {options.map((option, index) => {

                        return <option key={`option${index}`} value={option}>{option}</option>

                    })}
                </select>
            </>
        )

    }

    return (
        <>
            {label && name &&
                <label className="text-sm" htmlFor={name}>{label}</label>}

            <input onChange={change} ref={elementRef} type={type} name={name} placeholder={placeholder} className={classes} />


        </>
    )
}

export default InputField;