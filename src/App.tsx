
import React from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import Pentago from './GamePages/pentago';
import MakingTheSite from './GamePages/makingTheSite';
// import TopBar from './TopBar';
// import { ScrollProvider } from './ScrollContext';

import {
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';

function App() {
 
  const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles: {
      global: {
        body: {
          bg: '#181414', // Set the background color for dark mode
          color: 'white', // Set the text color for dark mode
        },
      },
    },
  });
  
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pentago" element={<Pentago />} />
          <Route path="/making-the-site" element={<MakingTheSite />} />
        </Routes>
      </Router>
   </ChakraProvider>
  );


}

export default App;