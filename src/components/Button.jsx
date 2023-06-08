import Link from "next/link";

const Button = ({ title, callback, link, type }) => {

    const classes = "h-9 rounded-full py-2 px-4 min-w-[6rem] text-sm text-chas-primary bg-chas-gradient-primary hover:text-white hover:bg-chas-gradient-primary/90"

    if (link) {

        return (
            <Link href={link} className={classes}>{title}</Link>
        )

    }

    return (
        <button onClick={callback} className={classes} type={type}>{title}</button>
    )

}

export default Button;