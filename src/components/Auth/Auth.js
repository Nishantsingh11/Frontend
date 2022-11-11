import React,{useState} from 'react'
import {Button,Typography,Grid,Avatar,Container,Paper, } from "@material-ui/core"
import Icon from './icon.js'
import {GoogleLogin} from "react-google-login"
import useStyle from "./style.js"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input'
import {gapi} from "gapi-script"
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin,signup } from '../../actions/auth'

const initialState ={firstName : "",lastName : "",email:'',password:'',confirmPassword:''}
const Auth = () => {
  const dispatch = useDispatch()
  const classes = useStyle()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const history = useHistory()
  const [formData,setFormData] = useState(initialState);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData,history))
    } else {
      dispatch(signin(formData,history))
      
    }
  }
   const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})

   }
   const handleShowPassword = () => setShowPassword((prevShowPassword)=>!prevShowPassword);
   const switchMode = () =>{
    setIsSignUp((preIsSignUp) =>!preIsSignUp )
    setShowPassword(false)
    }
    const googleOnSuccess = async(res) =>{
      // console.log(res)
      const result = res?.profileObj
      const token = res?.tokenId
      try {
        dispatch({type:"AUTH",data:{result,token}})
        history.push('/')
      } catch (error) {
        console.log(error)
      }

    }
    const googleOnFailure = (error) =>{
      console.log(error)
      console.log("google sign in was unsucess Try agn ");
    }
   return (
     <Container component="main" maxWidth = "xs">
      <Paper className={classes.paper} elevation = {3}>
        <Avatar className={classes.avatar}>
         <LockOutlinedIcon />  
      </Avatar>
         <Typography varient = "h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
         <form className ={classes.form} onSubmit ={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                
                <Input name = "firstName" label = "First Name" handleChange = {handleChange} autoFocus half/>
               
               
                <Input name = "lastName" label = "Last Name" handleChange = {handleChange}  half/>
             
                </>
              )
            }
            <Input name = "email" label = "Email Address" handleChange={handleChange} type = "name"/>
            <Input name = "password" label = "Password" handleChange={handleChange} type = {showPassword ? "text" :"password" } handleShowPassword ={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label= "Repeat Password" handleChange={handleChange} type ="password" />}
            </Grid> 
            <Button type = "submit" fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignUp ? "Sign Up" :"sign In"}
            </Button>
            <GoogleLogin 
            clientId='129325483278-jmi9avgnhlr7p8fs4gei0lfc3pff005b.apps.googleusercontent.com'
            plugin_name ="Memories"
            render={(renderProps) =>(
              <Button className={classes.googleButton} color="primary"  onClick={renderProps.onClick} variant = 'contained' fullWidth disabled ={renderProps.disabled} startIcon = {<Icon />} >Google Sign in</Button>
            )}
            onSuccess ={googleOnSuccess}
            onFailure = {googleOnFailure}
            cookiePolicy ="single_host_origin"
            />
            <Grid container justifyContent='flex-end'>
              <Grid item >
                <Button onClick={switchMode}>{isSignUp ? "Already have an Account Sign In" :"don't have an account Sign up"}</Button>
              </Grid>
            </Grid>
         </form>
      </Paper>

    </Container>
  )
}

export default Auth