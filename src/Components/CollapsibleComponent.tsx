import React, { useState, ReactNode } from 'react';
import { Box, Button, Collapse, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface CollapsibleComponentProps {
  children: ReactNode;
  showText: string;
  buttonIcon: React.ElementType; // Type for custom icon
}

const CollapsibleComponent: React.FC<CollapsibleComponentProps> = ({ children, showText, buttonIcon }) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <Box>
      <Button onClick={handleToggle} mt="1rem" w="full" rightIcon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}>
        <Icon as={buttonIcon} mr="2" />
        {showText}
      </Button>
      <Collapse in={show}>
        <Box p="40px" mt="4" /*bg="lightblue"*/ rounded="md" shadow="md">
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CollapsibleComponent;

