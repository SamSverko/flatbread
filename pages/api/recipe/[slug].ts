import type { NextApiResponse, NextApiRequest } from 'next';

import { client } from '../../../util/contentful';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let { slug } = req.query;

        if (Array.isArray(slug)) {
            slug = slug.join(', ');
        }

        const recipe = await client.getEntries({
            content_type: 'recipe',
            'fields.slug[match]': slug,
        });

        res.status(200).json(recipe);
    } catch(error) {
        res.status(500).json({
            error: (error as Error).message,
        });
    }
}
