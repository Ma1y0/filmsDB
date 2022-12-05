import Link from "next/link"
import Image from "next/image"
import popcorn from "../public/popcorn.png"
import menu from "../public/menu.svg"
import close from "../public/close.svg"
import { useContext, useState } from "react"
import { UserContext } from "../lib/context"

function NavBar() {

    const { user, username } = useContext(UserContext)

    const [open, setOpen] = useState(false)

    const routes = [
        {
            path: "/actors",
            name: "Actors"
        },
        {
            path: "/directors",
            name: "Directors"
        },
        {
            path: "/films",
            name: "Films"
        }
    ]

    return (
        <div className="w-full bg-black overflow-hidden mb-5">
            <div className="m:px-16 px-6 flex justify-center items-center">
                <nav className="py-6 w-full flex">
                    <Link href="/"><Image src={popcorn} alt="logo" width={80} /></Link>

                    <ul className="list-none flex justify-end items-center flex-1">
                        {routes.map(route => (
                            <li key={route.name}>
                                <Link href={route.path}><span className={`sm:flex hidden text-white cursor-pointer font-poppins font-normal text-[20px] ml-5`}>{route.name}</span></Link>
                            </li>
                        ))}
                        {user && username ? 
                            // eslint-disable-next-line @next/next/no-img-element
                            <Image src={user?.photoURL} alt="user picture" width={50} height={50} className="rounded-full ml-5" />
                        : 
                            <li key="login">
                                <Link href="/login"><button className="sm:flex hidden text-white cursor-pointer font-poppins font-normal text-[20px] ml-10"><span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-800 hover:bg-gray-700 rounded-md group-hover:bg-opacity-0">Log In</span></button></Link>
                            </li>
                        }
                    </ul>

                    <div className="sm:hidden flex items-center">
                        <Link href="/login"><button className="sm:hidden flex text-white cursor-pointer font-poppins font-normal text-[20px] ml-20"><span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-800 hover:bg-gray-700 rounded-md group-hover:bg-opacity-0">Log In</span></button></Link>
                        <div className="ml-5" onClick={() => setOpen(!open)}> 
                            <Image src={open ? close : menu} alt="mobile menu" className="w-[32px]" />
                        </div>
                        <div className={`${open ? "flex" : "hidden"} absolute top-24 bg-black right-0`}> 
                            <ul>
                                {routes.map(route => (
                                <li key={route.name} className="list-none flex flex-col justify-end items-end flex-1 m-5">
                                    <Link href={route.path} className="sm:hidden text-white cursor-pointer font-poppins font-normal ml-5 text-[20px]">
                                        {route.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar