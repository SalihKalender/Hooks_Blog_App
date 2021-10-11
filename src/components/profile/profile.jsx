import axios from "axios";
import { useEffect, useContext } from "react"
import { useHistory } from "react-router";
import appContext from '../../context/index';
import Post from '../posts/post'
import AddBlog from './addBlog'
export default function Profile() {     {/* Burada posts2tan farklı olarak yazar ismi yok, cunku profile2de zaten, giris yapip yapmadigini useContext2le yapıp router2a bagla */}

    {/* SIMDI BURADA YAPMAMIZ GEREKEN, USERID'SI BU KULLANIICNIN ID'SI OLAN POSTLARI OTOMATIK GETIRMEK */}

    const { dispatch, user_data } = useContext(appContext)
    const history = useHistory()
    useEffect(async () => {   // Buraları middleware ile hallet
        if(!localStorage.getItem('tokenID')) {
            return history.push("/login");
        }
        else {
            dispatch({type: 'AUTHED_USER', id: localStorage.getItem('tokenID'), email: localStorage.getItem('email')})
            if(localStorage.getItem('user_posts')) {
                const posts = JSON.parse(localStorage.getItem('user_posts'))
                dispatch({type: 'ADD_USER_POSTS', posts: posts })
            }
            else {
                const all_posts = await axios.get('FIREBASE_API')
                const user_posts = []
                if(all_posts.data) {
                    Object.keys(all_posts.data).forEach((key) => {
                        const post_key = all_posts.data[key].user_id
                        if( post_key == user_data.id) {
                            user_posts.push(all_posts.data[key])
                        }
                    })
                    localStorage.setItem('user_posts', JSON.stringify(user_posts))
                    dispatch({type: 'ADD_USER_POSTS', posts: user_posts })
                    console.log(user_data.blogs)
                }
            }
        }
    },[])
    return (
        <>
            <AddBlog /> 
            {
                user_data.blogs
                && 
                user_data.blogs.map((blog,index) => {
                    return <Post key={index} blog={blog} />
                })
            }
        </>
    )
}