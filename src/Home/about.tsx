import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const AboutTanner = () => {
    return (
        <Box mt="25px" mb="100px" ml="150px" mr="150px">
             {/* Title */}
             <Text fontSize="4xl" mb="25px" textAlign="center">
                 About Me
            </Text>
            
            <Text fontSize="md" mb="20px">
                From a young age, video games shaped my personal journey, 
                especially when I began competing in esports with Super Smash Bros Melee. 
                I became highly skilled at Melee and even became an affiliate streamer on Twitch.

                As I delved deeper into the game mechanics, 
                my interest shifted from playing to understanding game development.

                After earning a digital audio certificate from Santa Rosa Junior College, 
                I pursued a computer science degree, 
                leading to game creation at both SRJC and Sonoma State University.

                Concurrently, I worked as an audio engineer 
                and undertook an 8-month robotics programming internship at VIAVI solutions.

                Since graduating from SSU in 2023, 
                I've dedicated myself to application development.

                I'm eager to share my work with you.


            </Text>
        </Box>
    );
}

export default AboutTanner;

