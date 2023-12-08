import { TypeStore } from "@needle-tools/engine"

// Import types
import { ballSpawner } from "../scripts/ballSpawner.js";
import { PentagoBoardAnimator } from "../scripts/pentagoBoardAnimator.js";
import { PlayerController } from "../scripts/playerController.js";
import { Shovel } from "../scripts/shovel.js";

// Register types
TypeStore.add("ballSpawner", ballSpawner);
TypeStore.add("PentagoBoardAnimator", PentagoBoardAnimator);
TypeStore.add("PlayerController", PlayerController);
TypeStore.add("Shovel", Shovel);
