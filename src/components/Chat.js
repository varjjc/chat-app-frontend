import React, {useState, useEffect} from "react";
import { socket, api } from '../services/api';
import {Container, Box, Typography, TextField, Button, List, ListItem, ListItemText,  AppBar, Toolbar, IconButton} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Chat = ({token}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userName, setUserName] = useState('');


    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
        }
    };

    useEffect(() => {

        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.name) {
            setUserName(decodedToken.name);
        } else {
            setUserName('Desconocido');
        }

        socket.auth = {token};
        socket.connect();

        socket.emit('authenticate', token);

        socket.on('authenticated', ({ success }) => {
            if (success) {
                console.log('Autenticación exitosa');
            }
        });

        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        const fetchMessages = async () => {
            try{
                const response = await api.get('/chat', {
                    headers: {Authorization:`Bearer ${token}`},
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error al cargar los mensajes:', error);
            }
        };

        fetchMessages();

        return () => {
            socket.off('receiveMessage')
            socket.disconnect();
        };
    }, [token]);

    const handleSendMessage = () => {
        if(newMessage.trim()) {
            const messageData = {content: newMessage};
            socket.emit('sendMessage', messageData);
            setNewMessage('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return(
        <Container maxWidth={false} sx={{ padding: 0, height: '100vh' }}>
            <AppBar position="fixed" sx={{borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Bienvenido a tu clase, {userName}
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box mt={10} display="flex" flexDirection="row" height="calc(100vh - 64px)">

                <Box flex="1" sx={{ padding: 2 }}>
                    <Box
                        component="iframe"
                        src="https://www.youtube.com/embed/ikihi0-gSxw?si=0IJfn2Au4tufzbvY"// Aquí va la URL del video que deseas mostrar
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                    />
                </Box>  
                    
                <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                        borderLeft: '1px solid #ddd',
                        height: '100%',
                        overflow:'hidden'
                     }}>
                    <Typography variant="h4" aling="center" gutterBottom>
                        Chat en tiempo real
                    </Typography>


                    <Box flex="1" sx={{overflowY: 'auto', padding: 2, boxShadow: 20, borderRadius:10, maxHeight: 'calc(100vh - 180px)',}}>

                        <List>
                            {messages.map((msg, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={                    <>
                                            <span>{msg.sender?.name || 'Desconocido'}</span>
                                            {msg.sender?.role === 'moderador' && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: 'inline',
                                                        fontWeight: 'bold',
                                                        textDecoration: 'underline',
                                                        backgroundColor: 'orange'
                                                    }}
                                                >
                                                    (Moderador)
                                                </Typography>
                                            )}
                                            : {msg.content}
                                        </>}
                                        secondary={new Date(msg.timestamp).toLocaleTimeString()}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            width: '98%',
                            display: 'flex',
                            gap: 2,
                            padding: 2,
                            backgroundColor: 'white',
                            boxShadow: 10,
                        }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Escribe un mensaje..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleSendMessage}>
                            Enviar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Chat;