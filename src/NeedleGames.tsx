import React, { useRef, useState, useEffect } from 'react';
import { NeedleEngine } from './NeedleEngine';
import { ContextRegistry, GameObject, Rigidbody } from '@needle-tools/engine';
import { Vector3 } from 'three';
import { ballSpawner } from './scripts/ballSpawner';
import {
  Button,
  Box,
  Stack,
  Text,
  Container,
  Flex,
  ChakraProvider,
  extendTheme,
  ColorModeScript
} from '@chakra-ui/react';





// const NeedleGames = () => {
//     const [spawner, setSpawner] = useState(null);

//     useEffect(() => {
//         const fetchSpawner = async () => {
//             const fetchedSpawner = await GameObject.findObjectsOfType(ballSpawner)[0];
//             if (!fetchedSpawner) {
//                 console.error("No spawner found");
//                 return;
//             }
//             setSpawner(fetchedSpawner);
//         };

//         fetchSpawner();
//     }, []);

//     const spawn = (balls) => {
//         spawner?.spawnBalls(balls);
//     };

//     return(
//         <Box id="container" className="needle-container">
//             <NeedleEngine style={{ position: "relative", display: "flex" }} loading-style="dark">
//             <Stack direction="row" spacing={4} p={4}>
//                 <Button onClick={() => spawn(1)} colorScheme="teal" variant="outline">
//                     Spawn 1 Ball
//                 </Button>
//                 <Button onClick={() => spawn(10)} colorScheme="teal" variant="outline">
//                     Spawn 10 Balls
//                 </Button>
//                 <Button onClick={() => spawn(100)} colorScheme="teal" variant="outline">
//                     Spawn 100 Balls
//                 </Button>
//             </Stack>
//             </NeedleEngine>
//         </Box>
//     );
// }

// export default NeedleGames;



const NeedleGames = () => {


    return(
        <Box id="container" className="needle-container">
            <NeedleEngine style={{ position: "relative", display: "flex" }} loading-style="dark">
                {/* <Box style={{ width: "100%", height: "100%" }}>
                 
                </Box> */}
            </NeedleEngine>
        </Box>
    );
}

export default NeedleGames;
