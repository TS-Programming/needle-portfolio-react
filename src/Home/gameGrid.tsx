import React from 'react';
import { Grid, Box, Link, Text, UnorderedList, ListItem, Image } from '@chakra-ui/react';
//import { Link as RouterLink } from 'react-router-dom';

const GameGrid = () => {
    // Sample game data
    const gameData = [
        {
            imageUrl: "https://lineinlime.com/wp-content/uploads/2018/05/image_20180518_104325.jpg",
            linkUrl: "/pentago",
            gameTags: ["Action", "Multiplayer"],
            description: "Short game description.",
            features: ["Feature 1", "Feature 2"],
            bannerLabel: "New Release"
        },
      // ... Add more game objects similar to above ...
      {
        imageUrl: "https://lineinlime.com/wp-content/uploads/2018/05/image_20180518_104325.jpg",
        linkUrl: "/mini-games",
        gameTags: ["Action", "Multiplayer"],
        description: "Short game description.",
        features: ["Feature 1", "Feature 2"],
        bannerLabel: "New Release"
      },
      {
        imageUrl: "https://lineinlime.com/wp-content/uploads/2018/05/image_20180518_104325.jpg",
        linkUrl: "/game-page-1",
        gameTags: ["Action", "Multiplayer"],
        description: "Short game description.",
        features: ["Feature 1", "Feature 2"],
        bannerLabel: "New Release"
      },
      {
        imageUrl: "https://lineinlime.com/wp-content/uploads/2018/05/image_20180518_104325.jpg",
        linkUrl: "/game-page-1",
        gameTags: ["Action", "Multiplayer"],
        description: "Short game description.",
        features: ["Feature 1", "Feature 2"],
        bannerLabel: "New Release"
      }
    ];

    return (
        <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={6}
            margin="0 auto"
            width="calc(100% - 48px)"
            maxWidth="1200px"
            overflowX="hidden"
        >
            {gameData.map((game, index) => (
    <Box key={index}>
        <Box
            overflow="hidden"
            borderRadius="8px"
            border="2px solid #FFF"
            position="relative"
            height="400px"
            width="100%"
        >
            <Link href={game.linkUrl} style={{ height: '100%', display: 'block' }}>
                <Box height="100%" position="relative" overflow="hidden">
                    <Image
                        src={game.imageUrl}
                        alt={game.bannerLabel}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        transition="transform .2s"
                        _hover={{ transform: 'scale(1.1)' }}
                    />
                </Box>
            </Link>
            <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                backgroundColor="rgba(0,0,0,0.5)"
                color="white"
                textAlign="center"
                padding="5px 0"
            >
                {game.bannerLabel}
            </Box>
        </Box>
        {/* game tags */}
        <Box display="flex" justifyContent="flex-start" gap="2" mt="4" ml="4">
            {game.gameTags.map((tag, tagIndex) => (
                <Box
                    key={tagIndex}
                    bgColor="teal.500"
                    color="white"
                    borderRadius="4px"
                    padding="5px"
                    textAlign="center"
                    fontWeight="bold"
                >
                    {tag}
                </Box>
            ))}
        </Box>
        <Text textAlign="center" mt="2">
            {game.description}
        </Text>
        <Box mt="2">
            <UnorderedList>
                {game.features.map((feature, fIndex) => (
                    <ListItem key={fIndex}>{feature}</ListItem>
                ))}
            </UnorderedList>
        </Box>
    </Box>
))}

        </Grid>
    );
};

export default GameGrid;
