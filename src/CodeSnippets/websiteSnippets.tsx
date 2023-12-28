export const siteIntroDescription: string = `The first time I ever used HTML and CSS, years ago, I hated the workflow. It was so hard to see what was going on in the increasingly nested components. However, after learning react in college, I became fond of front-end development. Not only is there a wealth of component libraries like MUI and Chakra UI, but abstracting my own custom, sometimes robust comonents into their own files makes the code much more readable. My home page is the most complex page on my site, yet the home.tsx script is less than 40 lines.
`;

export const homeSnippet: string = `    
import React from 'react';
import {Box, Container} from '@chakra-ui/react';
import ABOUT_TEXT from './about';
import GAME_GRID from './gameGrid';
import TROPHY_CASE from '../TrophyCase';
import TOP_BAR from '../Components/TopBar';
import BANNER from '../Components/Banner';

export default function Home() {
  return (
    <Container maxW="100%" p={0} pt="64px">
      <TOP_BAR/>
      <Box>
        <BANNER 
          id="featured-section" 
          title="Featured Project" 
          subTitle="This chest contains items from each of my portfolio pieces. Click on the description of an item to go to a page providing development details!"
        />
        <TROPHY_CASE/>
        <Box id="about-section">
          <ABOUT_TEXT/>
        </Box>
        <BANNER
          id="games-section"
          title="My Games"
          subTitle="Click on the tiles to learn more about each project."
        />  
        <GAME_GRID/>
      </Box>
    </Container>
  );
}`;


export const collapsibleScriptDescription: string = `If we peak at the code for the COLLAPSIBLE_COMPONENT, we can see the redundancies avoided by using the custom component instead of repeating the same code every time we want to use a collapsible section. Also, notice useState, which is a react hook that faciliatates the distinctions between the collapsed and expanded states. Hooks are the hallmark of react and I love them!
`;

export const collapsibleScriptSnippet: string = ` 
import React, { useState, ReactNode } from 'react';
import { Box, Button, Collapse, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface CollapsibleComponentProps {
  children: ReactNode;
  showText: string;
  buttonIcon: React.ElementType; // Type for custom icon
}

const CollapsibleComponent: React.FC<CollapsibleComponentProps> = ({ children, showText, buttonIcon,  iconSize = '1em' }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  
  return (
    <Box>
    <Button onClick={handleToggle} mt="1rem" w="full" rightIcon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}>
    <Icon as={buttonIcon} mr="2" boxSize={iconSize} />
    {showText}
    </Button>
    <Collapse in={show}>
    <Box p="40px" mt="4" rounded="md" shadow="md">
    {children}
    </Box>
    </Collapse>
    </Box>
    );
  };
  
  export default CollapsibleComponent;`;
  
  
export const collapsibleUsageDescription: string = `Take the collapisible section containing the text and code snippets your reading right now for example. In the script for this page, all I have to do is pass a few props to my custom COLLAPSIBLE_COMPONENT, and nest all the content within.`;
  
export const collapsibleUsageSnippet: string = ` 
<COLLAPSIBLE_COMPONENT showText="View Website Snippets" buttonIcon={DiCode} iconSize="32px">
  <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8"> {siteIntroDescription.trim()}</Text>
  <SyntaxHighlighter language="typescript" style={dark}>{homeSnippet.trim()}</SyntaxHighlighter>
  <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {collapsibleUsageDescription.trim()}</Text>
  <SyntaxHighlighter language="typescript" style={dark}>{collapsibleUsageSnippet.trim()}</SyntaxHighlighter>
  <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {collapsibleScriptDescription.trim()}</Text>
  <SyntaxHighlighter language="typescript" style={dark}>{collapsibleScriptSnippet.trim()}</SyntaxHighlighter>
</COLLAPSIBLE_COMPONENT>`;
