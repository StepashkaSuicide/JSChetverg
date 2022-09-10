import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from './authReducer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {AppRootStateType} from '../../app/store';
import {Navigate} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 3) {
                errors.password = 'enter more than 3 symbols'
            }
            return errors
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });
//редирект с логина
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>

            <form onSubmit={formik.handleSubmit}>


                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>


                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            type="text"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red',}}>{formik.errors.email}</div>}

                        <TextField
                            label="Password"
                            margin="normal"
                            type={passwordShown ? 'text' : 'password'}

                            {...formik.getFieldProps('password')}
                        />


                        <VisibilityIcon fontSize={'large'} style={{
                            cursor: 'pointer',
                            position: 'relative',
                            top: '-52px', left: '250',
                            color: '#1565c0'
                        }}
                                        onClick={togglePassword}>

                        </VisibilityIcon>

                        {formik.touched.password && formik.errors.password &&
                            <div style={{
                                color: 'red',
                                marginTop: '-20px',
                                paddingBottom: '10px'
                            }}>{formik.errors.password}</div>}

                        <FormControlLabel style={{marginTop: '-10px'}}
                                          label={'Remember me'}
                                          control={<Checkbox checked={formik.values.rememberMe}/>}
                                          {...formik.getFieldProps('rememberMe')}
                        />

                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                            Login
                        </Button>

                    </FormGroup>
                </FormControl>


            </form>

        </Grid>
    </Grid>
}