import { ObjectId } from "mongodb";

import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const recipeToInsert = {
      title: req.body.title.toLowerCase(),
      courseTypes: req.body.courseTypes.map((courseType) =>
        courseType.toLowerCase()
      ),
      dishTypes: req.body.dishTypes.map((dishType) => dishType.toLowerCase()),
      cuisines: req.body.cuisines.map((cuisine) => cuisine.toLowerCase()),
      dietaryRestrictions: req.body.dietaryRestrictions.map(
        (dietaryRestriction) => dietaryRestriction.toLowerCase()
      ),
      source: {
        name: req.body.source.name.toLowerCase(),
        url: req.body.source.url,
      },
      yield: {
        amount: req.body.yield.amount,
        unit: req.body.yield.unit.toLowerCase(),
      },
      duration: {
        cookTime: req.body.duration.cookTime,
        prepTime: req.body.duration.prepTime,
      },
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      notes: req.body.notes,
    };

    const { db } = await connectToDatabase();
    const result = await db.collection("recipes").insertOne(recipeToInsert);
    res.send(result);
  }
};
