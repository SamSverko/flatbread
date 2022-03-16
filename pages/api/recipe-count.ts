import type { NextApiResponse, NextApiRequest } from 'next';

import { getRecipeCount } from '../../utils/contentful';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const count = await getRecipeCount();

    console.log(typeof count);

    res.status(200).json(count);
}
