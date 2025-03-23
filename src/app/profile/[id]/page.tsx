export default function userProfile({params}:any){
    return(
        <div className="flex flex-col text-3xl justify-center items-center min-h-screen bg-blue-300">
            <h1 className="text-white font-bold">Profile</h1>
            <p>Profile Id: <span className="bg-orange-500 p-2 rounded-md">{params.id}</span></p>
        </div>
    )
}