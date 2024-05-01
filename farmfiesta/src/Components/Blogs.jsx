import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Blogs = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [users, setUsers]= useState([])
   
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get('https://api.fusionafricatech.co.ke/posts/all-posts')
            //console.log(response.data)
            setBlogs(response.data)           
        }
        const getUsers = async ()=>{
            const response = await axios.get(`https://api.fusionafricatech.co.ke/auth/get-users`)
            setUsers(response.data)
        } 
        getUsers()
        fetchBlogs()
    }, [])
    const handleCreatePost = () => {
        navigate('/create-post')
    }

    return (
        <div className='p-3 m-2'>
            <h1 className="font-bold text-3xl text-center m-2 p-2">Blogs</h1>
            <button className="btn btn-primary" onClick={handleCreatePost}>Create a Post</button>
            <div className="d-lg-flex justify-around gap-5">
                {users && blogs.map(blog => {
                     const user = users.find(user => user.ID === blog.user_id);
                    return (
                        <div className="max-w-sm rounded  shadow-lg" style={{height:'250px'}} key={blog.post_id}>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{blog.title}</div>
                                <p className="text-gray-700 text-base overflow-y-scroll" style={{height:'100px'}}>{blog.content}</p>
                            </div>
                            <div className="px-6 py-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {user ? user.name : 'Unknown User'}
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {new Date(blog.created_at).toLocaleDateString()}
                                </span>
                            </div>                            
                        </div>
                    )
                })}


            </div>

        </div>
    )
}

export default Blogs