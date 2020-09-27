import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const recipes = await db.collection("recipes").find({}).toArray();

  res.json(recipes);
};
