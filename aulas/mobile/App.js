import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import Routes from './src/routes';

export default function App() {
  return (
    <Routes/>
  )
}
//view é um tag genérica, tipo uma div
//text é um tag de TEXTO genérica

//OBS: não existe herança de estilo, para alterar elementos do <Text>,
//deve se alterar diretamente o <Text>, alterar o view não funciona

