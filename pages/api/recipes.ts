import type { NextApiResponse, NextApiRequest } from 'next';

import { client } from '../../util/contentful';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    try {
        const recipes = await client.getEntries({
            content_type: 'recipe',
        });

        res.status(200).json(recipes);
    } catch(error) {
        res.status(500).json({
            error: (error as Error).message,
        });
    }
}