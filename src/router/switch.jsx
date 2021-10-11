import { Route, Switch } from "react-router"
import Profile from "../components/profile/profile"
import Posts from "../components/posts/posts"
import Login from '../components/login/login'
import { Redirect } from "react-router"

let loggedIn = false  // component disinda hooks kullanilmaz, component icinde kullanilir
const isUserLoggedIn = () => {
  localStorage.getItem('tokenID') ? loggedIn = true : loggedIn = false
  return loggedIn
}

export default function RouterSwitch() {
    
    return (
        <Switch>
          <Route path="/login" render={() => (
              <Login />
          )}/>
          <Route exact path="/" render={() => (
            <Login />
          )}/>
          <Route path="/profile" render={() => (
            <Profile />
          )}/>
          <Route exact path="/posts" render={(props) => (
            <Posts url={props} />
          )}/>
        </Switch>
    )
}