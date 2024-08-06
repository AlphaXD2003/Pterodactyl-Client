import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { BlogPost } from '../components';
const Blog = () => {
    const params = useParams()
    const [slug, setSlug] = useState('')
    useEffect(()=>{
        setSlug(params.slug)
        const fetchDetails = async () => {
            const [response, error] = await blogDetails.getBlogDetails(slug);
            if(error){
                throw error
            } 
            console.log('Blog details', response)
        }
        //fetchDetails();
    },[])
   
  return (
    <div>
        {slug && <BlogPost slug={slug} />}
    </div>
  )
}

export default Blog;