import type { NextApiResponse, NextApiRequest } from 'next';

import { client } from '../../util/contentful';

type fetchedCategories = {
    [key: string]: any
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const categories = ['courseType', 'cuisine', 'dietaryRestriction', 'dishType'];

    const fetchedCategories: fetchedCategories = {};

    await Promise.all(categories.map(async (category) => {
        try {
            const response = await client.getEntries({
                content_type: category,
            });

            fetchedCategories[category] = response.items;
        } catch(error) {
            res.status(500).json({
                error: (error as Error).message,
            });
        }
    }));

    res.status(200).json(fetchedCategories);
}
