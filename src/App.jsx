import { useReducer } from 'react'
import './App.css'
import AppRouter from './router'
import UserReducer from './reducer/userReducer'
import AppContext from './context/index'

const initialState = {
  id: null,
  blogs: []
}

function App() {
  const [ user_data, dispatch ] = useReducer(UserReducer, initialState)
  return (
    <AppContext.Provider value={{ user_data, dispatch }}>
      <AppRouter />
    </AppContext.Provider>
  )
}

export default App
