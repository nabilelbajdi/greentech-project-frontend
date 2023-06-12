import Link from "next/link"
import { useEffect, useRef } from "react"

const UserMenuDropDown = ({ menuContent, setMenuVisible }) => {

    return (

        <ul className={`flex flex-col gap-0.5 absolute -bottom-[4rem] text-gray-300 right-0 z-50 min-w-[200px] py-0.5 bg-slate-500 shadow shadow-slate-600/80 border border-slate-600/30 rounded`}>
            {menuContent.map((item, index) => {

                const classNames = `w-full hover:text-chas-primary border-b border-slate-400/50 px-2 py-0.5 last:border-none`

                if (item.link) {

                    return (
                        <li key={`menuItem#${index}`} className={classNames}>
                            <Link className="w-full" href={item.link}>
                                <p>{item.title}</p>
                            </Link>
                        </li>
                    )

                } else {

                    return (
                        <li key={`menuItem#${index}`} className={classNames}>
                            <button onClick={() => {
                                item.callback();
                                setMenuVisible(false)
                            }}>
                                {item.title}
                            </button>
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default UserMenuDropDown;