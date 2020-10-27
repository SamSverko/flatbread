import { connectToDatabase } from '../../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  let response

  if (req.query.title) {
    response = await db
      .collection(process.env.MONGODB_COLLECTION_RECIPES)
      .find({ $text: { $search: req.query.title } })
      .toArray()
  } else {
    response = await db
      .collection(process.env.MONGODB_COLLECTION_RECIPES)
      .find({})
      .toArray()
  }

  res.json(response)
}
