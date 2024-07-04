import { Prisma, PrismaClient } from "@prisma/client";

const SEED_CUISINES: Prisma.CuisineCreateInput[] = [
    {
        name: "American",
    },
    {
        name: "Italian",
    },
    {
        name: "Mexican",
    },
    {
        name: "Chinese",
    },
    {
        name: "Japanese",
    },
    {
        name: "Korean",
    },
    {
        name: "Vietnamese",
    },
    {
        name: "Indian",
    },
    {
        name: "French",
    },
    {
        name: "Spanish",
    },
    {
        name: "Middle Eastern",
    },
    {
        name: "British",
    },
    {
        name: "African",
    },
    {
        name: "Caribbean",
    },
    {
        name: "South American",
    },
    {
        name: "Mediterranean",
    },
    {
        name: "Australian",
    },
    {
        name: "Canadian",
    },
];

const SEED_RECIPE: Prisma.RecipeCreateInput[] = [
    {
        title: "Spaghetti Carbonara",
        slug: "spaghetti-carbonara",
        cuisines: {
            connect: {
                name: "Italian",
            },
        },
    },
    {
        title: "Chicken Tikka Masala",
        slug: "chicken-tikka-masala",
        cuisines: {
            connect: {
                name: "Indian",
            },
        },
    },
    {
        title: "Tacos",
        slug: "tacos",
        cuisines: {
            connect: {
                name: "Mexican",
            },
        },
    },
    {
        title: "Kimchi Fried Rice",
        slug: "kimchi-fried-rice",
        cuisines: {
            connect: {
                name: "Korean",
            },
        },
    },
];

const prisma = new PrismaClient();

async function seed() {
    console.log("Start seeding...");

    for (const cuisine of SEED_CUISINES) {
        await prisma.cuisine.create({
            data: cuisine,
        });
    }

    for (const recipe of SEED_RECIPE) {
        await prisma.recipe.create({
            data: recipe,
        });
    }

    console.log("Seeding complete!");
}

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
