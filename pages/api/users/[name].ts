import { NextApiRequest, NextApiResponse } from 'next'
import { getUserByName } from '../../../controllers/user';
import Cors from 'cors';

const cors = Cors({
    origin: "*",
    methods: ['GET']
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await runMiddleware(req, res, cors);
        if (req.method === "GET") {
            const user = await getUserByName(req.query.name as string);
            return res.status(200).json(user);
        }
        return res.status(404).json({message: 'Route not found'});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'An error has occurred'});
    }
}