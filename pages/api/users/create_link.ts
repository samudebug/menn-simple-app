import { NextApiRequest, NextApiResponse } from 'next';
import { createLinkForUser } from '../../../controllers/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const data = req.body;
        const result = await createLinkForUser(data.name);
        return res.status(200).json({link: result});
    }
    return res.status(404).json({message: 'Route not found'});
    
} 