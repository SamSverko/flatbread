import type { NextApiResponse, NextApiRequest } from 'next';

import { getAllCategories } from '../../util/contentful';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const categories = await getAllCategories();

    res.status(200).json(categories);
}
