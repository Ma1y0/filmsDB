import Image from "next/image";
import Link from "next/link";
import nouserpicture from "../public/nouserpicture.png"

type inputDirectors = {
    directors: any;
    admin: boolean;
}

type inputDirector = {
    director: any;
    admin: boolean;
}

export default function DirectorsList({ directors, admin = false }: inputDirectors) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-5">
            {directors ? directors.map((direcotr: any) => <DirectorItem director={direcotr} admin={admin} key={directors?.name} />) : null}
        </div>
    )
}

function DirectorItem({ director, admin = false}: inputDirector) {
    return (
        <Link href={`/directors/${director.name}`}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
                <Image className="rounded-t-lg w-[300px]" src={director.photoURL || nouserpicture} alt="Director's picture" width={300} height={300} />
                <h1 className="font-poppins font-semibold m-3 text-2xl">{director.name}</h1>
            </div>
        </Link>
    )
}