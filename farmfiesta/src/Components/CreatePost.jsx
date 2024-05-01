import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { title, content } = formData;
            const user_id = decoded.userId; // Replace 'user_id' with the actual user ID
            const postData = { title, content, user_id };
            await axios.post('http://localhost:4000/posts/create-post', postData);
            // Handle success (e.g., show a success message)
            console.log('Post created successfully');
            toast.success('Article Posted Successfully')
        } catch (error) {
            console.error('Error creating post:', error.response.data);
           toast.error("Could not post article")
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className='shadow-lg p-3'>
                <h2 className=' text-center fw-bold m-1'>Create New Post</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content:</label>
                    <textarea name="content" id="content" value={formData.content} onChange={handleChange} className="form-control" rows="5"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
