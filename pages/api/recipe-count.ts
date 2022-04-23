import { getRecipeCount } from '../../utils/contentful';

import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const count = await getRecipeCount();

    res.status(200).json(count);
}
