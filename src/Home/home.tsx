import React from 'react';
import {Box, Container} from '@chakra-ui/react';
import ABOUT_TEXT from './about';
import GAME_GRID from './gameGrid';
import NEEDLE_GAMES from '../NeedleGames';
import TOP_BAR from '../Components/TopBar';
import BANNER from '../Components/Banner';
import Stopwatch from '../Components/Stopwatch';

export default function Home() {

  return (
    <Container maxW="100%" p={0} pt="64px">
      <TOP_BAR/>
      <Stopwatch/>
      <Box>
        <BANNER 
          id="featured-section" 
          title="Featured Project" 
          subTitle="This chest contains items from each of my portfolio pieces. Click on the description of an item to go to a page providing development details!"
        />

        <NEEDLE_GAMES/>

        <Box id="about-section">
          <ABOUT_TEXT />
        </Box>

        <BANNER
          id="games-section"
          title="My Games"
          subTitle="Click on the tiles to learn more about each project."
        />  

        <GAME_GRID />
      </Box>
    </Container>
  );
}