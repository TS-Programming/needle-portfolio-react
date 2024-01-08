import React from 'react';
import { Box, Text} from '@chakra-ui/react';

interface CollapsibleComponentProps {
    id: string;
    title: string;
    subTitle: string;
}

const Banner: React.FC<CollapsibleComponentProps> = ({id, title, subTitle }) => {


  return (
    <Box
    id={id}
    mt="50px"
    maxWidth="100%"
    // mb = "100px"
    d="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    backgroundColor="#303030"
    paddingY="10px" 
  >
    <Text fontSize="4xl" textAlign="center">{title}</Text>
    <Text fontSize="lg" textAlign="center">{subTitle}</Text>
  </Box>
  );
};

export default Banner;