// import React, { useRef, useState, useEffect } from 'react';
// import { NeedleEngine } from './NeedleEngine';
// import {
//   Box,
// } from '@chakra-ui/react';


// const NeedleGames = () => {


//     return(
//         <Box id="container" className="needle-container" /*style={{ pointerEvents: 'none' }}*/>
//             <NeedleEngine style={{ position: 'relative', display: 'flex' }} loading-style="dark"></NeedleEngine>
//         </Box>
//     );
// }

// export default NeedleGames;
import React, { useState } from 'react';
import { NeedleEngine } from './NeedleEngine';
import { Box, AspectRatio } from '@chakra-ui/react';

const NeedleGames = () => {

  // return (
  //   <Box id="container" className="needle-container">
  //     <NeedleEngine style={{ position: 'relative', display: 'flex' }} loading-style="dark"></NeedleEngine>
  //   </Box>
  // );

  return (
    // <Box id="container" className="needle-container" width="100%">
    //   <AspectRatio ratio={21 / 9} maxWidth="1600px" width="100%">
    //     <NeedleEngine loading-style="dark" />
    //   </AspectRatio>
    // </Box>

    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt='64px'>
        <AspectRatio ratio={21 / 9} maxWidth="1600px" width="100%">
          <NeedleEngine loading-style="dark" />
        </AspectRatio>
      </Box>

  );
  
};

export default NeedleGames;