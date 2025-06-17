import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

function Edit() {

    const [data, setData] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        axiosInstance.get(`/api/get_student/${id}`)
        .then(res => {
            setData(res.data[0])

        })
        .catch(err => console.log(err))
    }, [id])
    

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        axiosInstance.post(`/api/edit/${id}`, data)
        .then((res) => {
            navigate('/')
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    function handleChange(e) {
        setData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div className="w-screen h-screen bg-[#F3F4F6] font-sans block justify-items-center content-center">
            <h2 className="text-3xl font-bold mb-10 lg:text-4xl">Edit Student</h2>
            <form onSubmit={handleSubmit} key={data?.id} className="w-5/6 text-lg relative md:w-[500px] lg:w-[700px] lg:text-2xl">
                    <div className="flex items-center mb-4">
                        <label htmlFor="name" className="mr-2 w-[60px] lg:w-[80px]">Name: </label>
                        <input
                            value={data?.name}
                            type="text" 
                            placeholder="Enter name" 
                            id="name" 
                            name="name" 
                            required 
                            onChange={handleChange}
                            className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] lg:p-4"/>
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="email" className="mr-2 w-[60px] lg:w-[80px]">Email: </label>
                        <input 
                            value={data?.email}
                            type="email" 
                            placeholder="Enter email" 
                            id="email" 
                            required 
                            name="email" 
                            onChange={handleChange}
                            className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] lg:p-4"/>
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="gender" className="mr-2 w-[60px] lg:w-[80px]">Gender: </label>
                        <select
                            onChange={handleChange} 
                            className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] lg:p-4 appearance-none"
                            name="gender" 
                            id="gender" 
                            value={data?.gender} 
                            required>
                                <option value="" disabled>Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                        </select>

                        <div className="absolute right-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>   
                    </div>

                    <div className="flex items-center mb-10">
                        <label htmlFor="age" className="mr-2 w-[60px] lg:w-[80px]">Age: </label>
                        <input 
                            type="number" 
                            placeholder="Enter age" 
                            id="age" 
                            name="age" 
                            onChange={handleChange}
                            value={data?.age} 
                            className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] lg:p-4"/>
                    </div>

                    <div className="absolute right-0 flex justify-between w-[220px] lg:w-[300px]">
                        <Link to="/">
                            <button className="rounded-md font-semibold text-lg bg-[#FDFDFD] px-4 py-2 w-[100px] border border-gray-400 shadow-md cursor-pointer active:scale-95 lg:text-2xl lg:w-[130px] lg:py-3">Cancel</button>
                        </Link>
                        
                        <button className="text-white rounded-md font-semibold text-lg bg-green-600 w-[100px] shadow-md cursor-pointer active:scale-95 lg:text-2xl lg:w-[130px] lg:py-3" type="submit">Update</button>
                    </div>
                </form>
            
        </div>
    )
}

export default Edit