import React from 'react';
import { Box, Container, AspectRatio, Text, Grid, Image } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TOP_BAR from '../Components/TopBar';
import Collapsible_Component from '../Components/CollapsibleComponent';
import Download_Link from '../Components/DownloadLink';
import { IoIosPlay } from "react-icons/io";
import { DiCode } from "react-icons/di";
import {setCameraSnippet, updateCameraSnippet, introDescription, setCameraDescription} from '../CodeSnippets/trophyCaseSnippets';
import {siteIntroDescription, homeSnippet, collapsibleScriptDescription, collapsibleScriptSnippet, collapsibleUsageDescription, collapsibleUsageSnippet} from '../CodeSnippets/websiteSnippets';

const MakingTheSite = () => {
  const youtubeEmbedUrl = "https://www.youtube.com/embed/FZ9cQwlkE9E?si=grzrClX3MkCUWOsL";


  return (
    <Container maxW="65%" p={0} pt="64px">
      <TOP_BAR />
      <Box mt="0px" mb="100px" ml="150px" mr="150px">
      <Box textAlign="center" mb="25px">
      <Text fontSize="6xl" fontWeight="bold"  mb="8">
        Making My Portfolio Site
      </Text>
      {/* <Download_Link url="https://doublemeta.itch.io/pentago" text="Download Game" /> */}

      <Box display="flex" justifyContent="center" width="full" mb="8">
        <Grid templateColumns="max-content 1fr" rowGap={0} columnGap={6}  alignItems="center">
          <Text fontWeight="bold" textAlign="left">Project Status</Text>
          <Text textAlign="left">Ongoing</Text>

          <Text fontWeight="bold" textAlign="left">Tools Used</Text>
          <Text textAlign="left">ReactJS, Unity, Needle Tools</Text>

          <Text fontWeight="bold" textAlign="left">Languages Used</Text>
          <Text textAlign="left">JavaScript, TypeScript</Text>
        </Grid>
      </Box>
    </Box>
    <Text fontSize="4xl" fontWeight="bold" textAlign="center" >The Why</Text>
    {/* <Text mb="1">The famous abstract strategy game invented by Tomas Flodén. It's like Tic Tac Toe, but much deeper. Five-in-a-line wins, and a quadrant must be rotated each turn. Play versus the computer or a friend.</Text> */}
    <Text mb="8">I made this website to display my portfolio pieces and give some explanation to how I made them. Funny enough, the website itself is a portfolio piece, so please enjoy learning how I made it, including the "Trophy Case" display on the home page. </Text>

    <Image src="https://i.imgur.com/iBtiJj9.jpg" alt="Pentago" mb="8" />

        <Collapsible_Component showText="View 'Trophy Case' Snippets" buttonIcon={DiCode} iconSize="32px">
          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8"> {introDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{setCameraSnippet.trim()}</SyntaxHighlighter>

          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {setCameraDescription.trim()}</Text>
          <SyntaxHighlighter language="csharp" style={dark}>{updateCameraSnippet.trim()}</SyntaxHighlighter>
        </Collapsible_Component>

        <Collapsible_Component showText="View Website Snippets" buttonIcon={DiCode} iconSize="32px">
          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8"> {siteIntroDescription.trim()}</Text>
          <SyntaxHighlighter language="typescript" style={dark}>{homeSnippet.trim()}</SyntaxHighlighter>
          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {collapsibleUsageDescription.trim()}</Text>
          <SyntaxHighlighter language="typescript" style={dark}>{collapsibleUsageSnippet.trim()}</SyntaxHighlighter>
          <Text whiteSpace="pre-wrap" fontSize="lg" textAlign="left" mb="8" mt="8"> {collapsibleScriptDescription.trim()}</Text>
          <SyntaxHighlighter language="typescript" style={dark}>{collapsibleScriptSnippet.trim()}</SyntaxHighlighter>
        </Collapsible_Component>
      </Box>
    </Container>
  );
}

export default MakingTheSite;