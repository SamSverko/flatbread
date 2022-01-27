import type { NextApiResponse, NextApiRequest } from 'next';

import { client } from '../../../util/contentful';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let { id } = req.query;

        const response = await client.getEntries({
            content_type: id,
        });

        res.status(200).json(response);
    } catch(error) {
        res.status(500).json({
            error: (error as Error).message,
        });
    }
}
