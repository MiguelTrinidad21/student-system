import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

function Read() {

    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axiosInstance.get(`/api/get_student/${id}`)
        .then(res => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <div className="w-screen min-h-screen bg-[#F3F4F6] p-3.5 block justify-items-center content-center">
            <h1 className="font-bold text-3xl mb-10 lg:text-5xl">Student Data</h1>
            <div className="bg-white rounded-[10px] shadow-md p-3 w-[100%] mb-10 md:w-[75%] md:text-[1.3rem] lg:text-3xl lg:p-7 xl:w-[50%]">
                {data.length > 0 ? (
                    <>
                        <div className="mb-2 lg:mb-5">
                            <span className="font-semibold">Name:&nbsp;&nbsp;</span>
                            <span>{data[0].name}</span>
                        </div>
                        <div className="mb-2 lg:mb-5">
                            <span className="font-semibold">ID:&nbsp;&nbsp;</span>
                            <span>{data[0].id}</span>
                        </div>
                        <div className="mb-2 lg:mb-5">
                            <span className="font-semibold">Email:&nbsp;&nbsp;</span>
                            <span>{data[0].email}</span>
                        </div>
                        <div className="mb-2 lg:mb-5">
                            <span className="font-semibold">Gender:&nbsp;&nbsp;</span>
                            <span>{data[0].gender}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Age:&nbsp;&nbsp;</span>
                            <span>{data[0].age}</span>
                        </div>
                    </>
                ) : <div>Loading...</div>}
            </div>

            <Link to="/">
                <button className="bg-green-500 text-white font-semibold text-2xl p-2 rounded-md shadow-md lg:text-3xl lg:p-4 active:scale-95 cursor-pointer">Home</button>
            </Link>
        </div>
    )
    
    
}

export default Read