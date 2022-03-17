import type { NextApiResponse, NextApiRequest } from 'next';

import { getRandomRecipe } from '../../utils/contentful';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const recipe = await getRandomRecipe();

    res.status(200).json(recipe);
}
