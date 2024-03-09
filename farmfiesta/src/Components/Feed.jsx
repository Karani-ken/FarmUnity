import React from 'react'

const Feed = () => {
    return (
        <div className='d-lg-flex m-3'>
            <nav style={{backgroundColor:"#39C758", borderRadius:'10px', height:'70vh'}} className=' col-lg-2 m-3'>
                <ul style={{listStyle:'none'}} className='p-3 d-flex d-lg-block justify-content-lg-around ' >
                    <li className='form-control my-3'>All</li>
                    <li className='form-control  my-3'>Following</li>
                    <li className='form-control  my-3'>Trending</li>
                    <li className='form-control  my-3'>Latest</li>
                    <li className='form-control  my-3'>My Posts</li>
                </ul>
            </nav>
            <section  className="col-lg-6 mx-3" style={{height:'80vh', overflowY:'scroll', scrollBehavior:'smooth'}}>
                <div style={{width:'100%'}} className='shadow-lg p-3'>
                    <p>@User101</p>
                    <img src="https://media.istockphoto.com/id/1603695364/photo/dairy-cows-in-a-field-of-grass-in-the-azores.webp?b=1&s=612x612&w=0&k=20&c=pByfEugM5xb6D7a1jPjBU9-UUW0nGMitsUqTHuThBFU=" 
                    style={{height: "250px", width:"100%"}}/>                    
                    <div>
                        <h3>Post Title</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Exercitationem fuga necessitatibus delectus tempore sapiente placeat omnis
                            quae id harum fugit voluptates,
                        </p>
                        <h5>200 likes</h5>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <button className='btn btn-primary'>Comment</button>
                        <button className='btn btn-outline-primary'>View</button>
                        <button className='btn btn-danger'>Delete</button>
                        <button className='btn btn-secondary'>Like</button>
                    </div>
                </div>
                <div style={{width:'100%'}} className='shadow-lg p-3'>
                    <p>@User101</p>
                    <img src="https://media.istockphoto.com/id/1603695364/photo/dairy-cows-in-a-field-of-grass-in-the-azores.webp?b=1&s=612x612&w=0&k=20&c=pByfEugM5xb6D7a1jPjBU9-UUW0nGMitsUqTHuThBFU=" 
                    
                    alt="" />
                    <div>
                        <h3>Post Title</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Exercitationem fuga necessitatibus delectus tempore sapiente placeat omnis
                            quae id harum fugit voluptates,
                        </p>
                        <h5>200 likes</h5>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <button className='btn btn-primary'>Comment</button>
                        <button className='btn btn-outline-primary'>View</button>
                        <button className='btn btn-danger'>Delete</button>
                        <button className='btn btn-secondary'>Like</button>
                    </div>
                </div>
            </section>
         
        </div>
    )
}

export default Feed