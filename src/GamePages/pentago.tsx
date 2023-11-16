import React from 'react';
import {
  Box,
  Text,
  Container,
} from '@chakra-ui/react';

import TOP_BAR from '../TopBar';
import Collapsible_Component from '../Components/CollapsibleComponent';
import Download_Link from '../Components/DownloadLink';
import { DownloadIcon } from '@chakra-ui/icons';

// import { Icon } from '@chakra-ui/react'
import { IoIosPlay } from "react-icons/io";


const Pentago = () => {
    return (
      <Container maxW="100%" p={0} pt="64px">
        <TOP_BAR />
        <Box mt="25px" mb="100px" ml="150px" mr="150px">
  
          {/* Title */}
          <Text fontSize="6xl"  textAlign="center">
            PENTAGO
          </Text>
           {/* Download Link Component */}
            <Download_Link url="https://doublemeta.itch.io/pentago" text="Download Game" />

          <Collapsible_Component  showText= "Watch Trailer" buttonIcon = {IoIosPlay}>
            {/* Custom content for the Pentago game */}
            <Text>Pentago game rules or details...</Text>

            <Collapsible_Component>
              <Text>Pentago game rules or details...</Text>
            </Collapsible_Component>

          </Collapsible_Component>
         
        </Box>
      </Container>
    );
  }
  
  export default Pentago;
  
