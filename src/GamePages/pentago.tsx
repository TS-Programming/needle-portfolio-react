import React from 'react';
import { Box, Container, AspectRatio, Text, Grid } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TOP_BAR from '../TopBar';
import Collapsible_Component from '../Components/CollapsibleComponent';
import Download_Link from '../Components/DownloadLink';
import { IoIosPlay } from "react-icons/io";
import { DiCode } from "react-icons/di";
import {interfaceSnippet, humanSnippet, introDescription, gameManagerSnippet, gameManagerSnippetDescription, humanSnippetDescription, computerSnippet, computerSnippetDescription, callbackSnippetDescription, callbackSnippet, aIIntroDescription, hasWinnerSnippet, aiOutro} from '../CodeSnippets/pentagoSnippets';

const Pentago = () => {
  const youtubeEmbedUrl = "https://www.youtube.com/embed/FZ9cQwlkE9E?si=grzrClX3MkCUWOsL";


  return (
    <Container maxW="65%" p={0} pt="64px">
      <TOP_BAR />
      <Box mt="0px" mb="100px" ml="150px" mr="150px">
      <Box textAlign="center" mb="25px">
      <Text fontSize="6xl" fontWeight="bold">
        PENTAGO 3D
      </Text>
      <Download_Link url="https://doublemeta.itch.io/pentago" text="Download Game" />

      <Box display="flex" justifyContent="center" width="full" mb="8">
        <Grid templateColumns="max-content 1fr" rowGap={0} columnGap={6}  alignItems="center">
          <Text fontWeight="bold" textAlign="left">Project Status</Text>
          <Text textAlign="left">Complete</Text>

          <Text fontWeight="bold" textAlign="left">Project Duration</Text>
          <Text textAlign="left">Three months</Text>

          <Text fontWeight="bold" textAlign="left">Software Used</Text>
          <Text textAlign="left">Unity, Blender, Ableton</Text>

          <Text fontWeight="bold" textAlign="left">Languages Used</Text>
          <Text textAlign="left">C#</Text>
        </Grid>
      </Box>
    </Box>
    <Text fontSize="4xl" fontWeight="bold" textAlign="center" >About Pentago</Text>
    <Text mb="1">The famous abstract strategy game invented by Tomas Flodén. It's like Tic Tac Toe, but much deeper. Five-in-a-line wins, and a quadrant must be rotated each turn. Play versus the computer or a friend.</Text>
    <Text mb="8">My goal with this project was to make a highly polished 3D game. By limiting the scope to an existing board game, I was able to fully realize my vision complete with challenging AI, stunning visuals, charming music/SFX, camera control, customization, a tutorial, and more! </Text>


        <AspectRatio ratio={16 / 9} maxWidth="900px" width="full" margin="auto">
          <iframe
            src={youtubeEmbedUrl}
            frameBorder="0"
            allowFullScreen />
        </AspectRatio>

        <Collapsible_Component showText="View Game Loop Snippets" buttonIcon={DiCode} iconSize="32px">
          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8"> {introDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{interfaceSnippet.trim()}</SyntaxHighlighter>

          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {gameManagerSnippetDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{gameManagerSnippet.trim()}</SyntaxHighlighter>

          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {humanSnippetDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{humanSnippet.trim()}</SyntaxHighlighter>      

          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {computerSnippetDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{computerSnippet.trim()}</SyntaxHighlighter>

          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {callbackSnippetDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{callbackSnippet.trim()}</SyntaxHighlighter>       
        </Collapsible_Component>

        <Collapsible_Component showText="View AI Snippets" buttonIcon={DiCode} iconSize="32px">
          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8"> {aIIntroDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{hasWinnerSnippet.trim()}</SyntaxHighlighter>
          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {aiOutro.trim()}</Text>
        </Collapsible_Component>
      </Box>
    </Container>
  );
}

export default Pentago;

  


//   <iframe width="560" height="315" src="https://www.youtube.com/embed/FZ9cQwlkE9E?si=grzrClX3MkCUWOsL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>