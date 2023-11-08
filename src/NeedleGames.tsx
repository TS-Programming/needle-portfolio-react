import React, { useRef, useState, useEffect } from 'react';
import { NeedleEngine } from './NeedleEngine';
import {
  Box,
} from '@chakra-ui/react';


const NeedleGames = () => {


    return(
        <Box id="container" className="needle-container">
            <NeedleEngine style={{ position: "relative", display: "flex" }} loading-style="dark"></NeedleEngine>
        </Box>
    );
}

export default NeedleGames;
