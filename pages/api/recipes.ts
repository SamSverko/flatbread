import type { NextApiResponse, NextApiRequest } from 'next';

import { getRecipesByQuery } from '../../utils/contentful';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { courseTypes, cuisines, dietaryRestrictions, dishTypes, title } = req.query;

    const recipes = await getRecipesByQuery({
        title: (title) ? title.toString().trim() : '',
        courseTypes: (courseTypes) ? courseTypes.toString().replace(' ', '').trim() : '',
        cuisines: (cuisines) ? cuisines.toString().replace(' ', '').trim() : '',
        dietaryRestrictions: (dietaryRestrictions) ? dietaryRestrictions.toString().replace(' ', '').trim() : '',
        dishTypes: (dishTypes) ? dishTypes.toString().replace(' ', '').trim() : '',
    });

    res.status(200).json(recipes);
}
