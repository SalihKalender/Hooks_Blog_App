const appReducer = (prevState, action) =>  {
    switch(action.type) {
      case 'REGISTER':
        localStorage.setItem('tokenID',action.registered_user.data.localId)
        localStorage.setItem('endTime',action.registered_user.data.expiresIn * 1000)
        localStorage.setItem('email', action.email)
        console.log(localStorage.getItem('tokenID'))
        return {
          ...prevState,
          id: localStorage.getItem('tokenID'),
          email: action.email
        }
      case 'AUTHED_USER': 
        return {
          ...prevState,
          id: action.id,
          email: action.email,
        }
      case 'LOGIN':
        return state.filter((todo) => {
          return todo.id != action.id
        })
      case 'ADDED_BLOG':
        const blogs = JSON.parse(localStorage.getItem('user_posts')) || []
        blogs.push({user_id: prevState.id, title: action.title, text: action.text, blog_key: action.key, email: prevState.email })
        localStorage.setItem('user_posts', JSON.stringify(blogs))
        return {
          ...prevState,
          blogs: [...blogs]
        }
      case 'ADD_USER_POSTS':
        return {
          ...prevState,
          blogs: [...action.posts ]
        }
      case 'CLEAR_STATE':
        window.localStorage.clear()
        return {
          
        }
    }
}

export default appReducer