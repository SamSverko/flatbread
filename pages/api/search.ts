import type { NextApiResponse, NextApiRequest } from 'next';

import { client } from '../../utils/contentful';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    try {
        const response = await client.getEntries({
            content_type: 'recipe',
            'fields.title[match]': query,
        });

        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({
            error: (error as Error).message,
        });
    }
}
