import * as fs from "fs";
import * as path from "path";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function buildDBFiles() {
    console.log("Start generating DB files...");

    const dataDir = path.join(__dirname, "../src/data");

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputBase = {
        _note: "This file should not be edited. It was generated by the `build-db-files` script.",
    };

    console.log("Generating cuisines...");
    const cuisinesFile = path.join(dataDir, "cuisines.json");
    const cuisines = await prisma.cuisine.findMany();

    fs.writeFileSync(
        cuisinesFile,
        JSON.stringify(
            {
                ...outputBase,
                cuisines,
            },
            null,
            2
        ),
        "utf8"
    );

    console.log("Generating recipes...");
    const recipesFile = path.join(dataDir, "recipes.json");
    const recipes = await prisma.recipe.findMany({
        include: {
            cuisines: true,
        },
    });

    fs.writeFileSync(
        recipesFile,
        JSON.stringify(
            {
                ...outputBase,
                recipes,
            },
            null,
            2
        ),
        "utf8"
    );

    console.log("DB files successfully generated!");
}

buildDBFiles()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
