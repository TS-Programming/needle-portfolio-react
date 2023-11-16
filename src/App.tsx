
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/home';
import Pentago from './GamePages/pentago';
import MiniGames from './GamePages/miniGames';
import TopBar from './TopBar';
import { ScrollProvider } from './ScrollContext';

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
      {/* <ScrollProvider > */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pentago" element={<Pentago />} />
            <Route path="/mini-games" element={<MiniGames />} />
          </Routes>
        </Router>
      {/* </ScrollProvider> */}
   </ChakraProvider>
  );
}

export default App;