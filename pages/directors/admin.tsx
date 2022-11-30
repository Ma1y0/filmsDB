export default function admin() {
    return (
        <main>
            <div className="flex items-center flex-col">
                <h3>Add add director:</h3>
                <div>
                <input className="mt-5 h-[30px]" placeholder="Director's Name"/>
                <button className="bg-submit btn">Add</button>
                </div>
            </div>
        </main>
    )
}