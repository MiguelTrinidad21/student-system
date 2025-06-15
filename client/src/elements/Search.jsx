import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // fallback to '' for local dev proxy
})

function Search() {
    const { nameToFind } = useParams()

    const [data, setData] = useState([])
    const [name, setName] = useState(nameToFind)
    const [deleted, setDeleted] = useState(true)
    const [studentToDelete, setStudentToDelete] = useState(null)


    useEffect(() => {
        if(deleted) {
            setDeleted(false)
        }

        axiosInstance.get(`/api/search/${nameToFind}`)
        .then(res => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [nameToFind, deleted])

    function handleChange(e) {
        setName(e.target.value)
    }

    function handleDelete(id) {
        axiosInstance.delete(`/api/delete/${id}`)
        .then(res => {
            setDeleted(true)
            setStudentToDelete(null)
        })
        .catch(err => console.log(err))
    }

    console.log(data)

    

    return (
        <div className="w-screen min-h-screen bg-[#F3F4F6] p-3.5" >

            {studentToDelete && 
                <div className="w-screen h-screen bg-white/30 backdrop-blur-xs fixed"></div>}

            <h3 className="text-2xl lg:text-5xl font-bold mb-7 text-center">Students</h3>
            <div className="block justify-items-center mb-7">
                <div className="mb-7">
                <input 
                    className="w-[250px] h-[40px] bg-white rounded-tl-[30px] rounded-bl-[30px] px-3.5 shadow-md md:w-[350px] lg:w-[500px] lg:h-[60px] lg:text-2xl lg:px-5" 
                    type="text" 
                    placeholder="Search by Name" 
                    value={name} 
                    onChange={handleChange}/>

                    <Link to={`/search/${name}`}>
                        <button className="bg-blue-600 text-white w-[50px] h-[40px] rounded-tr-[30px] rounded-br-[30px] shadow-md cursor-pointer md:w-[60px] lg:w-[80px] lg:text-2xl lg:h-[60px]">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Link>
                </div>
    
                <Link to='/'>
                    <button className="bg-green-500 rounded-[5px] font-semibold text-white p-2 md:px-5 cursor-pointer lg:text-2xl lg:p-4 lg:px-6">Home</button>
                </Link>
            </div>

            {data.length > 0 ?
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {data.map(student => {
                            return (
                                <div className="bg-white rounded-[10px] shadow-md p-3 mx-3 md:mx-0 lg:text-[1.3rem] lg:p-5" key={student.id}>
                                    <div className="mb-2">
                                        <span className="font-semibold">Name:&nbsp;&nbsp;</span>
                                        <span>{student.name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-semibold">ID:&nbsp;&nbsp;</span>
                                        <span>{student.id}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-semibold">Email:&nbsp;&nbsp;</span>
                                        <span>{student.email}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-semibold">Gender:&nbsp;&nbsp;</span>
                                        <span>{student.gender}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-semibold">Age:&nbsp;&nbsp;</span>
                                        <span>{student.age}</span>
                                    </div>
                                    <div className="flex w-[150px] justify-between font-semibold lg:w-[200px]">
                                        <Link className="text-blue-600" to={`/get_student/${student.id}`}>View</Link>
                                        <Link className="text-green-600" to={`/edit/${student.id}`}>Edit</Link>
                                        <button className="text-red-600 cursor-pointer" onClick={() => setStudentToDelete(student)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                
                    {studentToDelete && 
                        <div className="fixed top-[50%] left-[50%] translate-[-50%] bg-[#FCFCF7] p-3 w-[300px] rounded-sm shadow-lg md:w-[400px] lg:w-[500px]  lg:p-5 lg:text-2xl">
                            <div className="relative ">
                                <button className="text-3xl cursor-pointer absolute right-1" onClick={() => setStudentToDelete(null)}><FontAwesomeIcon icon={faXmark} /></button>
                            </div>

                            <div className="mt-13 lg:mt-23 text-center z-20">Would you like to delete the records of {studentToDelete.name}</div>

                            <div className="mt-8 lg:mt-13 flex justify-end">
                                <button onClick={() => handleDelete(studentToDelete.id)} className=" font-semibold text-red-600 cursor-pointer">Delete</button>
                                <button className="font-semibold ml-5 lg:ml-10 p-2 lg:px-4 rounded-md bg-green-400 text-white cursor-pointer" onClick={() => setStudentToDelete(null)}>Cancel</button>
                                
                            </div>
                        </div>
                    }
                </>
                
                : 

                <div className="absolute top-[50%] left-[50%] translate-[-50%] text-center text-2xl lg:text-3xl">Student Not Found</div>
            }

            
            
            
        </div>
    )
}

export default Search