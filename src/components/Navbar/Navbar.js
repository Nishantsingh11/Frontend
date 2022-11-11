import React,{useState,useEffect} from 'react'
import { Link,useLocation } from "react-router-dom"
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import useStyles from './styles'
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import decode from "jwt-decode"

const Navbar = () => {
    const classes = useStyles();
    const diaptch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    console.log(user)

    const logout = () =>{
        diaptch({type:'LOGOUT'})
        history.push("/")
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000<new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
  

    return (
        <AppBar className={classes.appBar}  style={{display:"flex",flexDirection :"row"}} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} alt ="logo" height = '45px'/>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="60" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant='contained' color="secondary" onClick={logout}> Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>

    )
}

export default Navbar