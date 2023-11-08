// Import types from dependencies
import "@needle-tools/samples-scripts/codegen/register_types.ts"

import { TypeStore } from "@needle-tools/engine"

// Import types
import { ballSpawner } from "../scripts/ballSpawner.js";

// Register types
TypeStore.add("ballSpawner", ballSpawner);
