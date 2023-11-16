import React from 'react';
import {
  Box,
  Text,
  Container,
  AspectRatio, 
} from '@chakra-ui/react';

import TOP_BAR from '../TopBar';
import Collapsible_Component from '../Components/CollapsibleComponent';
import Download_Link from '../Components/DownloadLink';
import { DownloadIcon } from '@chakra-ui/icons';

// import { Icon } from '@chakra-ui/react'
import { IoIosPlay } from "react-icons/io";


const Pentago = () => {
    const youtubeEmbedUrl = "https://www.youtube.com/embed/FZ9cQwlkE9E?si=grzrClX3MkCUWOsL"; 

    return (
      <Container maxW="100%" p={0} pt="64px">
        <TOP_BAR />
        <Box mt="0px" mb="100px" ml="150px" mr="150px">
         
        <Box textAlign="center" mb="25px">
          {/* Title */}
          <Text fontSize="6xl"  textAlign="center">
            PENTAGO
          </Text>
          {/* Download Link Component */}
          <Download_Link url="https://doublemeta.itch.io/pentago" text="Download Game" />
          </Box>

            <AspectRatio ratio={16 / 9} maxWidth="900px" width="full" margin="auto">
                <iframe
                src={youtubeEmbedUrl}
                frameBorder="0"
                allowFullScreen />
            </AspectRatio>
          <Collapsible_Component  showText= "Watch Trailer" buttonIcon = {IoIosPlay} >
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
  


//   <iframe width="560" height="315" src="https://www.youtube.com/embed/FZ9cQwlkE9E?si=grzrClX3MkCUWOsL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>