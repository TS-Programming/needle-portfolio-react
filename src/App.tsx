
import React, { useRef } from 'react';
import { NeedleEngine } from './NeedleEngine';
import { ContextRegistry, GameObject, Rigidbody } from '@needle-tools/engine';
import { Vector3 } from 'three';
import {
  Button,
  Box,
  Text,
  Container,
  Flex,
  ChakraProvider,
  extendTheme,
  ColorModeScript
} from '@chakra-ui/react';
import ABOUT_TEXT from './Home/about';
import GAME_GRID from './Home/gameGrid';
import NEEDLE_GAMES from './NeedleGames';

function App() {
  // Refs for sections on the page
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  // Function to handle scrolling to a specific section
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Dark theme configuration
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
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <Container maxW="100%" p={0}>
        <Flex as="nav" p={4} justifyContent="center" bg="#303030" alignItems="center" h="64px">
          <Box display="flex" alignItems="center" h="full">
            <Text fontSize="2xl" mr="20px">Tanner Samples</Text>
            <Button
              color="white"
              variant="ghost"
              h="64px" // Set to the calculated height
              borderRadius={0}
              onClick={() => scrollToRef(section1Ref)}
              _hover={{ backgroundColor: 'red.700', color: 'white' }}
            >
              About
            </Button>
            <Button
              color="white"
              variant="ghost"
              h="64px" // Set to the calculated height
              borderRadius={0}
              onClick={() => scrollToRef(section2Ref)}
              _hover={{ backgroundColor: 'red.700', color: 'white' }}
            >
              Games
            </Button>
            <Button
              color="white"
              variant="ghost"
              h="64px" // Set to the calculated height
              borderRadius={0}
              href="./GamePages/pentago"
              _hover={{ backgroundColor: 'red.700', color: 'white' }}
            >
              Resume
            </Button>

          </Box>
        </Flex>
        <Box>
          <Box ref={section1Ref}>
            <ABOUT_TEXT />
          </Box>
          <Box
            ref={section2Ref}
            mt="50px"
            // mb="100px"
            d="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#303030"
            paddingY="10px" 
          >
            <Text fontSize="4xl" textAlign="center">Highlighted Project</Text>
            <Text fontSize="lg" textAlign="center">Web integrated video games with Unity and Needle Tools</Text>
          </Box>

          <NEEDLE_GAMES/>
          
          <Box
            ref={section2Ref}
            mt="50px"
            mb="100px"
            d="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#303030"
            paddingY="10px" 
          >
            <Text fontSize="4xl" textAlign="center">My Games</Text>
            <Text fontSize="lg" textAlign="center">Click on the tiles to learn more about each project.</Text>
          </Box>

          <GAME_GRID />
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;