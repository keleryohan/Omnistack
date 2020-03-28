import React from 'react';

//o import procura automaticamente o arquivo index.js
//import Logon from './pages/Logon';
//^ mesma coisa que from './pages/Logon/index'

import Routes from './routes';
import './global.css'

function App() {
  return (
    <div>
      <Routes/>
    </div>
  );
}
export default App;

  /*
HTML escrito dentro de um arquivo javascript..
.. é chamado de JSX (JavaScript XML), onde XML..
.. é a sintaxe de HTML
*/

/*
para se pegar atributos em componentes importados
usa-se props.title (title = nome da variável)
e props.children, que retorna tudo dentro nesse caso
OU pode se usar {nome_da_variável} (ou children)
para pegar só alguns atributos
*/

  /*
  const [counter, setCounter] = useState(0);
  //useState retorna um array [valor, função para alterar o valor]
  //serve para alterar uma variável que está em display no site

  //função que incrementa a variável counter
  //chamada ao clicar no botão abaixo
  function increment(){
    setCounter(counter+1);
  }
  //v ficaria dentro do html(return())
  <button onClick={increment} >Incrementar</button>
  */

  
