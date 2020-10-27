import { connectToDatabase } from '../../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  const cuisines = await db
    .collection(process.env.MONGODB_COLLECTION_CUISINES)
    .find({})
    .toArray()

  res.json(cuisines)
}
