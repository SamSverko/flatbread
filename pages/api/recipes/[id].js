import { ObjectId } from 'mongodb'

import { connectToDatabase } from '../../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  const {
    query: { id },
  } = req

  const recipe = await db
    .collection(process.env.MONGODB_COLLECTION_RECIPES)
    .findOne({
      _id: ObjectId(id),
    })

  res.json(recipe)
}
