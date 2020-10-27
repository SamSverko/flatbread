import { ObjectId } from 'mongodb'

import { connectToDatabase } from '../../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  // const {
  //   query: { id },
  // } = req

  // FIND ALL RECIPES WITH A CERTAIN CUISINE
  // 5ee796516735b6218d717552 = italian
  // 5edf9ac1d02ffeab85e17371 = african
  const cuisines = [ObjectId('5ee796516735b6218d717552')]
  const recipes = await db
    .collection(process.env.MONGODB_COLLECTION_RECIPES)
    .find({
      cuisines: {
        $in: cuisines,
      },
    })
    .toArray()
  res.json(recipes)

  // GET A RANDOM RECIPE
  // const recipes = await db
  //   .collection("recipes")
  //   .find({})
  //   .toArray();

  // const randomNumber = Math.floor(Math.random() * recipes.length);

  // res.json(recipes[randomNumber]);
}
