import React, { useContext }  from 'react';
import {Button, Box, Text, Flex,} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const TopBar: React.FC = () => {
  const navigate = useNavigate();

  const navigateAndScroll = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    }, 0); // Timeout to allow the DOM to update
  };
  
  return (
    <Flex as="nav" p={4} justifyContent="center" bg="#303030" alignItems="center" h="64px">
      <Box display="flex" alignItems="center" h="full">
        <Text fontSize="2xl" mr="20px">Tanner Samples</Text>
        <Button
          color="white"
          variant="ghost"
          h="64px"
          borderRadius={0}
          onClick={() => navigateAndScroll('about-section')}
          _hover={{ backgroundColor: 'red.700', color: 'white' }}
        >
          About
        </Button>
        <Button
          color="white"
          variant="ghost"
          h="64px"
          borderRadius={0}
          onClick={() => navigateAndScroll('games-section')}
          _hover={{ backgroundColor: 'red.700', color: 'white' }}
        >
          Games
        </Button>
        <a href="/pdf/resume-fall-2023.pdf" target="_blank" rel="noopener noreferrer">
          <Button
            color="white"
            variant="ghost"
            h="64px"
            borderRadius={0}
            _hover={{ backgroundColor: 'red.700', color: 'white' }}
          >
            Resume
          </Button>
        </a>
      </Box>
    </Flex>
  );
}

export default TopBar;
