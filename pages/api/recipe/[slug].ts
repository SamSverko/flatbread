import type { NextApiResponse, NextApiRequest } from 'next';

import { getRecipeBySlug } from '../../../utils/contentful';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    const recipe = await getRecipeBySlug(slug.toString());

    res.status(200).json(recipe);
}
