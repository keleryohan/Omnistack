import React,{useEffect, useState} from 'react'
//useEffect chama uma função em determinado momento do componente
import {FiPower,FiTrash2} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api'


import logoImg from '../../assets/logo.svg'
import './styles.css'

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([])

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    //parâmetros: função e um 'array de dependência, ou seja:
    //quando um dos itens do array for modificado, chama a função
    useEffect( () =>{
        api.get('profile',{
            headers: {
                Authorization: ongId }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId] )
    //esse ongId é bem opcional, só CASO o Id da empresa acessando
    //mude, fazendo assim a função ser chamada dnv

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{headers: {Authorization:ongId }});
            
            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }

    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    //no primeiro elemento(html) de uma interação,
                    //coloca-se o valor chave único do elemento (id)
                    <li key={incident.id} >
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p    >

                        <strong>VALOR: </strong>
                        <p>
                            {Intl.NumberFormat(
                            'pt-br',{style:'currency',currency:'BRL'}
                            ).format(incident.value)}   </p>
                        
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                    )
                ) }
            </ul>
        </div>
    )
} 