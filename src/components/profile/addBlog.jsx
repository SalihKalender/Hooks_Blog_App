import { useState, useContext, useRef } from 'react'
import appContext from '../../context/index'
import axios from 'axios'
import '../../styles/addBlog_form.css'
export default function AddBlog() {
    const { dispatch, user_data } = useContext(appContext)
    const [blog_title, setBlogtitle] = useState('')
    const [blog_text,setBlogText] = useState('')
    const title = useRef(null)
    const text = useRef(null)
    const submitted_blog_form = async (e) => {
        e.preventDefault()
        if(!blog_title || !blog_text) {
            console.log('DOLDURSANA KARDESIM')
        }
        else {
            try {
                const blog = await axios.post('FIREBASE_API', { title: blog_title, text: blog_text, user_id: user_data.id, email: user_data.email })
                const blog_key = blog.data.name
                console.log(blog_key)
                dispatch({ type: 'ADDED_BLOG', title: blog_title, text: blog_text , blog_key: blog_key})
                title.current.value = ''
                text.current.value = ''
            }
            catch(err) {
                console.log('EOOR VAR')
                console.log(err)
            }
            
        }
    }
    return (
        <div className="form mt-3 mb-0">
            <form onSubmit={submitted_blog_form}>
                <div className="text-input">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" ref={title} onBlur={(e) => setBlogtitle(e.target.value)} />
                    <span className="separator"> </span>
                </div>   
                
                <div className="text-input">
                    <label htmlFor="blogtext">Text</label>
                    <textarea name="blogtext" id="blogtext" ref={text} onBlur={(e) => setBlogText(e.target.value)} />
                    <span className="separator"> </span>
                </div>  

                <div className="form-bottom">
                    <input type="submit" id="submit" value="Submit"  />
                </div>
            </form>  
        </div>
    )
}