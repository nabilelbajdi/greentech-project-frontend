import Link from "next/link";

const Button = ({ title, callback, link, type }) => {

    const classes = "h-9 rounded-full p-2 text-sm text-chas-primary bg-chas-gradient-primary"

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