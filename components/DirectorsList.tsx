import nouserpicture from "../public/nouserpicture.png"
import Image from "next/image"

type paramsType = {
    directors: any;
    admin: boolean
}

export default function DirectorsList({ directors, admin}: paramsType) {
    return directors ? directors.map((director: object) => <DirectorItem director={director} admin={admin} />)
}


function DirectorItem({ director }: any) {
    return (
        <div>
            <Image src={nouserpicture} alt="Director's Picture" />
            <h1>{director.name}</h1>
        </div>
    )
}