import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
Redirect
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar.js'
import Home from './components/Home/Home';
import {Container} from "@material-ui/core"
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/postDetails/PostDetails.js';
const App = () => {
 const user = JSON.parse(localStorage.getItem('profile'))
 
  return (
    <Router>

    <Container maxWidth ="xl">
      <Navbar />
      <Switch>
        <Route path='/' exact component={()=><Redirect to= "/posts"/>}/>
        <Route path = '/posts' exact component={Home} />
        <Route path = '/posts/search' exact component={Home} />
        <Route  path='/posts/:id' component={PostDetails}/>
      <Route path='/auth' exact component={() =>(!user?<Auth />:<Redirect to = '/posts' />)}/>
      </Switch>
    </Container>  
    </Router>
  )
}

export default App