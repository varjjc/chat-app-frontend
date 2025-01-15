import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Esquema de validación con Yup
const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    role: Yup.string().oneOf(['estudiante', 'moderador'], 'Selecciona un rol válido').required('El rol es obligatorio'),
});

const Register = () => {

    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await api.post('/auth/register', values);
            alert('Usuario registrado exitosamente');
            navigate('/login'); 
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar el usuario');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Registrarse
                </Typography>
                <Formik
                    initialValues={{ name: '', username: '', password: '', role: 'estudiante' }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Box mb={3}>
                                <Field
                                    name="name"
                                    as={TextField}
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Box>
                            <Box mb={3}>
                                <Field
                                    name="username"
                                    as={TextField}
                                    label="Nombre de usuario"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
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
                            <Box mb={3}>
                                <Field
                                    name="role"
                                    as={TextField}
                                    select
                                    label="Rol"
                                    variant="outlined"
                                    fullWidth
                                    SelectProps={{ native: true }}
                                    error={touched.role && Boolean(errors.role)}
                                    helperText={touched.role && errors.role}
                                >
                                    <option value="estudiante">Estudiante</option>
                                    <option value="moderador">Moderador</option>
                                </Field>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Registrando...' : 'Registrarse'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Register;
