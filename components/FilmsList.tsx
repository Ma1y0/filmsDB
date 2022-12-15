import Image from "next/image";
import Link from "next/link";
import nouserpicture from "../public/nouserpicture.png"

type inputFilms = {
    films: any;
    admin: boolean;
}

type inputFilm = {
    film: any;
    admin: boolean;
}

export default function FIlmsList({ films, admin = false }: inputFilms) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-5">
            {films ? films.map((film: any) => <FilmItem film={film} admin={admin} key={film?.name} />) : null}
        </div>
    )
}

function FilmItem({ film, admin = false}: inputFilm) {
    return (
        <Link href={`/films/${film.name}`}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
                <Image className="rounded-t-lg w-[300px]" src={film.posterURL || nouserpicture} alt="Film's poster" width={300} height={300} />
                <h1 className="font-poppins font-semibold m-3 text-2xl">{film.name}</h1>
            </div>
        </Link>
    )
}