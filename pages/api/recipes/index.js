import { connectToDatabase } from '../../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  let response

  if (req.query.title) {
    response = await db
      .collection('recipes')
      .find({ $text: { $search: req.query.title } })
      .toArray()
  } else {
    response = await db.collection('recipes').find({}).toArray()
  }

  res.json(response)
}
