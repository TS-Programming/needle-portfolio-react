import { TypeStore } from "@needle-tools/engine"

// Import types
import { ballSpawner } from "../scripts/ballSpawner.js";
import { Cactus } from "../scripts/cactus.js";
import { Chest } from "../scripts/chest.js";
import { PentagoBoardAnimator } from "../scripts/pentagoBoardAnimator.js";
import { PlayerController } from "../scripts/playerController.js";
import { Shovel } from "../scripts/shovel.js";

// Register types
TypeStore.add("ballSpawner", ballSpawner);
TypeStore.add("Cactus", Cactus);
TypeStore.add("Chest", Chest);
TypeStore.add("PentagoBoardAnimator", PentagoBoardAnimator);
TypeStore.add("PlayerController", PlayerController);
TypeStore.add("Shovel", Shovel);
