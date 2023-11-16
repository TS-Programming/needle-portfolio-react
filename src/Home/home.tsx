import React, { useRef } from 'react';
import {
  Box,
  Text,
  Container,
} from '@chakra-ui/react';
import ABOUT_TEXT from './about';
import GAME_GRID from './gameGrid';
import NEEDLE_GAMES from '../NeedleGames';
import TOP_BAR from '../TopBar';

function Home() {
  // Refs for sections on the page
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  // Function to handle scrolling to a specific section
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <Container maxW="100%" p={0} pt="64px">
      <TOP_BAR/>
      <Box>
        <NEEDLE_GAMES/>

        <Box id="about-section">
          <ABOUT_TEXT />
        </Box>

        <Box
          id="games-section"
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
  );
}

export default Home;


/* <Box
     ref={section2Ref} // bug shouldnt be section2 ref twice
      mt="50px"
  //  mb="100px"
      d="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#303030"
            paddingY="10px" 
          >
            <Text fontSize="4xl" textAlign="center">Highlighted Project</Text>
            <Text fontSize="lg" textAlign="center">Web integrated video games with Unity and Needle Tools</Text>
   </Box> */