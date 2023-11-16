import React from 'react';
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
  import TOP_BAR from '../TopBar';

const Pentago = () => {


    return (
        <Container maxW="100%" p={0}>
            <TOP_BAR/>
            <Box mt="25px" mb="100px" ml="150px" mr="150px">
                {/* Title */}
                <Text fontSize="4xl" mb="25px" textAlign="center">
                    PENTAGO
                </Text>
            
            </Box>
        </Container>

    );
}

export default Pentago;

