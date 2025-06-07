import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        gender: '',
        age: ''
    })


    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        axios.post('/api/add_user', values)
        .then((res) => {
            navigate('/')
            console.log(values)
        })
        .catch(err => console.log(err))
    }

    function handleChange(e) {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        <div className="w-screen h-screen bg-[#F3F4F6] font-sans block justify-items-center content-center">
            <h2 className="text-3xl font-bold mb-10 lg:text-4xl">Add Student</h2>

            <form action="/api/add_user" onSubmit={handleSubmit} className="w-5/6 text-lg relative md:w-[500px] lg:w-[700px] lg:text-2xl">
                <div className="flex items-center mb-4">
                    <label htmlFor="name" className="mr-2 w-[60px] lg:w-[80px]">Name: </label>
                    <input type="text" placeholder="Enter name" id="name" name="name" required onChange={handleChange} className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] lg:p-4"/>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="email" className="mr-2 w-[60px] lg:w-[80px]">Email: </label>
                    <input type="email" placeholder="Enter email" id="email" required name="email" onChange={handleChange} className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] lg:p-4"/>
                </div>
                <div className="relative flex items-center mb-4">
                    <label htmlFor="gender" className="mr-2 w-[60px] lg:w-[80px]">Gender: </label>
                    <select onChange={handleChange} className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] appearance-none lg:p-4" name="gender" id="gender" value={values.gender} required>
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
                    <input type="number" placeholder="Enter age" id="age" name="age" onChange={handleChange} className="p-2 flex-1 bg-[#FDFDFD] shadow-md rounded-[8px] lg:p-4"/>
                </div>

                <div className="absolute right-0 flex justify-between w-[220px] lg:w-[300px]">
                    <Link to="/"><button className="rounded-md font-semibold text-lg bg-[#FDFDFD] px-4 py-2 w-[100px] border border-gray-400 shadow-md cursor-pointer active:scale-95 lg:text-2xl lg:w-[130px] lg:py-3">Cancel</button></Link>
                    <button className="text-white rounded-md font-semibold text-lg bg-green-600 w-[100px] shadow-md cursor-pointer active:scale-95 lg:text-2xl lg:w-[130px] lg:py-3" type="submit">Add + </button>
                </div>
            </form>
        </div>
    )
}

export default Create