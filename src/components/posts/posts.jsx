import { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import '../../styles/posts.css'
import { useHistory } from 'react-router';
import appContext from '../../context/index';
import Post from './post'
export default function Deneme_2 (props) {
    const { dispatch } = useContext(appContext)
    const [users_post, set_users_posts] = useState([])
    const registered = props.url.location.search.includes('registered=true')
    const signed = props.url.location.search.includes('signed=true')
    const history = useHistory();
    useEffect(async () => {
        if(!localStorage.getItem('tokenID')) {
            history.push("/login");
        }
        else {
            console.log(localStorage.getItem('tokenID'))
            dispatch({type: 'AUTHED_USER', id: localStorage.getItem('tokenID')})
            const all_posts = await axios.get('FIREBASE_API')
            const users_post = []
            if(all_posts.data) {
                Object.keys(all_posts.data).forEach((key) => {
                    users_post.push(all_posts.data[key])
                })
                set_users_posts(users_post)
            }
            console.log(users_post)
        }
    },[])
    return (
        <>
            {
                registered && 
                <>
                    <p>Blog App'e Hosgeldiniz</p>
                </>
            }
            {
                signed && 
                <>
                    <p>Blog App'e Tekrardan Hosgeldiniz</p>
                </>
            }
            {
                users_post &&
                users_post.map((post, index) => {
                    return <Post blog={post} key={index}/>
                })
            }
        </>
    )
}
