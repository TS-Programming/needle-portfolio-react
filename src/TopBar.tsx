import React from 'react';
import {
  Button,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';


function TopBar({ section1Ref, section2Ref, scrollToRef }) {
  return (
    <Flex as="nav" p={4} justifyContent="center" bg="#303030" alignItems="center" h="64px">
      <Box display="flex" alignItems="center" h="full">
        <Text fontSize="2xl" mr="20px">Tanner Samples</Text>
        <Button
          color="white"
          variant="ghost"
          h="64px"
          borderRadius={0}
          onClick={() => scrollToRef(section1Ref)}
          _hover={{ backgroundColor: 'red.700', color: 'white' }}
        >
          About
        </Button>
        <Button
          color="white"
          variant="ghost"
          h="64px"
          borderRadius={0}
          onClick={() => scrollToRef(section2Ref)}
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
