import React from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TaskType} from '../api/todolists-api';
import {TodolistList} from '../features/TodolistsList/TodolistsList';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from './store';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );
}


export default App;
