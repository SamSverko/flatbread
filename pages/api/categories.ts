import { getAllCategories } from '../../utils/contentful';

import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const categories = await getAllCategories();

    res.status(200).json(categories);
}
