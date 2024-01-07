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
    <Flex
      as="nav"
      position="fixed" // Fixed position
      top={0} // Stick to the top
      left={0} // Align to the left
      right={0} // Align to the right
      zIndex="sticky" // Ensure it stays on top of other content
      p={4}
      justifyContent="center"
      bg="#303030"
      alignItems="center"
      h="64px"
    >
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
        <a href="https://raw.githubusercontent.com/TS-Programming/my-portfolio.github.io/main/pdf/resume-tanner-samples-winter-2024" target="_blank" rel="noopener noreferrer">
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
