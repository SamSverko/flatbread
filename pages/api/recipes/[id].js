import { ObjectId } from 'mongodb'

import { verifyObjectId } from '../../../util/helpers'
import { connectToDatabase } from '../../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  const {
    query: { id },
  } = req

  if (verifyObjectId(id)) {
    const recipe = await db
      .collection(process.env.MONGODB_COLLECTION_RECIPES)
      .findOne({
        _id: ObjectId(id),
      })

    res.json(recipe)
  } else {
    res.send(404)
  }
}
