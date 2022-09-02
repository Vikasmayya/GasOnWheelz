import { Button, Container, Typography,Modal, Input, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import logo from "./images/project_orange_logo.png";
import React, { useCallback, useContext, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { AuthContext } from './Auth';
import firebase,{ firebaseAuth, firestore} from './Firebase';
import FPass from './FPass';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({history}) => {
    const {currentUser} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const[values,setValues] = useState({email:'',password:'',showPassword: false,});

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const style = {
        position: 'absolute',
        top: '47.5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        borderRadius: '1.125rem',
        boxShadow: 24,
        p: 6,
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        
        try{
            await firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
            await firebaseAuth
            .signInWithEmailAndPassword(email.value, password.value).then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                // console.log(user.uid);
                if(user){
                    firestore.collection("USERS").doc(user.uid).get()
                    .then(snapshot =>{
                        const dbUser = snapshot.data();
                    // default empty roles
                    try{
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }
                    }catch(error){
                        return <Redirect to="/"/>;
                    }
                    
                    // merge auth and db user
                    user = {
                        uid: user.uid,
                        email: user.email,
                        ...dbUser,
                      };
                      sessionStorage.setItem('user_name', email.value);
                      sessionStorage.setItem('useraim', password.value);
                      sessionStorage.setItem('role', user["role"]);
                      sessionStorage.setItem('name', user["name"]);
                      history.push("/homepage");
                    });
                } else {
                    alert("Incorrect User Credentials");
                    return <Redirect to="/"/>;
                }
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode,errorMessage);
              });
            
        }catch(error){
            alert("Incorrect User Credentials");
        }
    }, [history]);
    

    if(currentUser) {
        return <Redirect to="/homepage"/>;
    }

    return (
        <>
        <Container maxWidth="xs">
        <Box sx={{p: "24px",boxShadow:"0px 10px 45px 0px rgba(0, 0, 0, 0.1)",borderRadius:"15px",backgroundColor: "#ffff"}} >
           <div className='w-100 text-center bg-white'>
            <img src={logo} alt=""  height="60px" width="60px"/>
           </div>
            <Typography color="textPrimary" className="fw-bold mt-3" variant="h4">Welcome back <br/> to <span style={{color:'#FF6700'}}> Gaz on Wheelz </span></Typography>
            <form onSubmit={handleLogin}>
            <div style={{width:"100%"}} className="my-4">
              <label className="fw-bold">Email </label><br/>
              <Input
                sx={{fontWeight:'bold', fontFamily:'Sen', color:'primary'}}
                id="standard-adornment-amount"
                value={values.email}
                onChange={handleChange('email')} 
                placeholder=" Enter your Email" name="email"
                startAdornment={<EmailOutlinedIcon/>}
                fullWidth required
              />
            </div>
            <div style={{width:"100%"}} >
              <label className="fw-bold">Password </label><br/>
              <Input
                sx={{fontWeight:'bold', fontFamily:'Sen', color:'primary'}}
                id="standard-adornment-amount"
                placeholder=" Enter your Password" name="password" 
                value={values.password}
                onChange={handleChange('password')} 
                type={values.showPassword ? 'text' : 'password'}
                startAdornment={<LockOutlinedIcon/>}
                endAdornment={
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }
                fullWidth required
              />
            </div>
            <Button sx={{fontSize:'0.8rem', textTransform:"capitalize"}} onClick={() => {setOpen(true) }}>Forgot Password?</Button>
            <br/>
            <br/>
            <Button sx={{borderRadius:"2.5em"}} disableElevation type="submit" variant="contained" color="primary" fullWidth>LOGIN</Button>
           </form>
           </Box>
        </Container>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={style}>
                <FPass handleClose={handleClose}/>
                </Box>
        </Modal>
        </>
    );
}

export default withRouter(Login);