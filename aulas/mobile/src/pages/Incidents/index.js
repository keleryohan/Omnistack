import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
//FlatList é utilizado para construir listas de tal forma
//que vc consiga transitar com o touch por ela (scroll) 
import styles from './styles';

import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';

export default function Incidents(){
    const navigation = useNavigation();
    const[incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    function navigateToDetail(incident){
        //toma como parâmetro o NOME da rota em routes.js
        navigation.navigate('Detail', {incident});
    };

    async function loadIncident(){
        //se já estiver carregando, n tente carregar
        if(loading){
            return;
        }
        //se já tiver carregado a primeira (total > 0) e
        //já tiver carregado todas, n tente carregar
        if(total > 0 && incidents.length === total){
             return;
        }
        
        setLoading(true);

        //api.get('endereço_do_back')
        const response = await api.get(`incidents?page=${page}`)
        /*versão alternativa do de cima
            const response = await api.get('incidents', {
                params: {page}
            });
        */

        //anexando os dois vetores, os incidentes que já carregaram,
        //e os incidentes que estão vindo pela nova pág
        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    };

    useEffect( () => {
        loadIncident();
    }, [] );
    
    

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold} >{total} casos</Text> .
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}> 
                Escolha um dos casos abaixo e salve o dia.
            </Text>
            
            
            <FlatList
                style={styles.incidentList}
                data = {incidents}
                showsVerticalScrollIndicator = {false}
                onEndReached={loadIncident}
                onEndReachedThreshold={0.2}
                //keyExtractor é o identificador de cada caso (id)
                //e precisa ser em forma de string
                keyExtractor={incident => String(incident.id)}
                //a palavra chave para se referir é item, abaixo nos 'renomeamos'
                //para incident
                renderItem = {({ item: incident }) => (
                <View style={styles.incident}> 
                    <Text style={styles.incidentProperty}>ONG: </Text>
                    <Text style={styles.incidentValue}>{incident.name} </Text>
                    
                    <Text style={styles.incidentProperty}>Caso: </Text>
                    <Text style={styles.incidentValue}>{incident.title} </Text>

                    <Text style={styles.incidentProperty}>VALOR: </Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency', currency:'BRL'
                            }).format(incident.value) } 
                    </Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => navigateToDetail(incident)}> 
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}