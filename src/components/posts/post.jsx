import { useContext } from 'react';
import appContext from '../../context/index';
export default function Post(props) {
    const { user_data } = useContext(appContext)
    return (
        <div className="item-in">
            <h4>{props.blog.title}</h4>
            <div className="seperator"></div>
            <p> { props.blog.text } </p>
            <br/>
            <p>Yazar: { props.blog.email }</p>
            <p> { new Date().getFullYear() } - { new Date().getMonth() + 1 } - { new Date().getDate() } </p>
        </div>
    )
}