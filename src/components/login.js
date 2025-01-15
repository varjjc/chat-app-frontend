import React from "react";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {TextField, Button, Container, Typography, Box} from '@mui/material';
import {api} from '../services/api';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
});

const Login = ({onLogin}) => {
    const handleSubmit = async (values, {setSubmitting}) => {

        try{
            const response = await api.post('auth/login', values);
            localStorage.setItem('token', response.data.token);
            onLogin(response.data.token);
        }catch (error) {
            console.error('Error al iniciar sesión', error);
            alert('Credenciales Inválidas');
        }finally{
            setSubmitting(false);
        }
    };
    

    return(

        <Container maxWidth="sm" sx={{ padding: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box>
                <Typography variant="h4" align="center" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <Formik     
                    initialValues = {{username: '', password: ''}}
                    validationSchema = {LoginSchema}
                    onSubmit = {handleSubmit}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            <Box mb={3}>
                                <Field
                                name = "username"
                                as = {TextField}
                                label = "Nombre de usuario"
                                variant = "outlined"
                                fullWidth
                                error = {touched.username && Boolean(errors.username)}
                                helperText = {touched.username && errors.username}
                                sx={{ borderRadius: 2 }}
                                />
                            </Box>
                            <Box mb={3}>
                                <Field
                                    name="password"
                                    type="password"
                                    as={TextField}
                                    label="Contraseña"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                            </Button>
                            <Typography align="center" mt={2}>
                                ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
                            </Typography>
                        </Form>
                    )}

                </Formik>
            </Box>
        </Container>
    );
};

export default Login;