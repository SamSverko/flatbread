import { ObjectId } from "mongodb";

import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const recipeToInsert = {
      title: req.body.title.toLowerCase(),
      courseTypes: req.body.courseTypes.map((courseType) =>
        ObjectId(courseType)
      ),
      dishTypes: req.body.dishTypes.map((dishType) => ObjectId(dishType)),
      cuisines: req.body.cuisines.map((cuisine) => ObjectId(cuisine)),
      dietaryRestrictions: req.body.dietaryRestrictions.map(
        (dietaryRestriction) => ObjectId(dietaryRestriction)
      ),
      source: {
        name: req.body.source.name.toLowerCase(),
        url: req.body.source.url.toLowerCase(),
      },
      yield: {
        name: req.body.yield.amount,
        url: req.body.yield.unit.toLowerCase(),
      },
      duration: {
        name: req.body.duration.prepTime,
        url: req.body.duration.cookTime,
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
