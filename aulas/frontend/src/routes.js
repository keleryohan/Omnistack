import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//BrowserRouter fica entre (pai) de todos
//Switch garante que só uma rota seja chamada por vez
//Route é a rota em si
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

//exact = a rota precisa ser exatamente igual a definida
//sem isso, basta começar daquela jeito

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch> 
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={Register}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/incidents/new' component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    )
}