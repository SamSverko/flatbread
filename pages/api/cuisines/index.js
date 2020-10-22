import { connectToDatabase } from '../../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  const cuisines = await db.collection('cuisines').find({}).toArray()

  res.json(cuisines)
}
