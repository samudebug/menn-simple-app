import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../controllers/user';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const data = req.body;
            await createUser(data.name);
            return res.status(200).json({message: 'OK'});
    
        }
        return res.status(404).json({message: 'Route not found'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'An error has occurred'});
    }
}