import type { NextApiResponse, NextApiRequest } from 'next';

import { client } from '../../util/contentful';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await client.getEntries({
            content_type: 'recipe',
        });

        const randomRecipe = response.items[Math.floor(Math.random() * response.items.length)];

        return res.status(200).json(randomRecipe);
    } catch(error) {
        return res.status(500).json({
            error: (error as Error).message,
        });
    }
}
