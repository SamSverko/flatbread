import type { NextApiResponse, NextApiRequest } from 'next';

// this proxy is needed to allow remote images from any domain (https://nextjs.org/docs/messages/next-image-unconfigured-host)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = decodeURIComponent(req.query.url.toString());
    const result = await fetch(url);
    const body = await result.body;
    // body.pipe(res); // this line works, but TS isn't happy
    res.send(body);
}
