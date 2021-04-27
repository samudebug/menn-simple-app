import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTokens } from '../../../controllers/fcmToken';
import firebase from '../../../firebase'
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
        if (req.method === "POST") {
            const data = req.body;
            const tokensToNotify = await getAllTokens(data.except);
            
            if (tokensToNotify.length > 0) {
                const message = {
                    notification: {
                        title: `Notification from ${data.name}`,
                        body: `Notification from ${data.name}`
                    },
                    tokens: tokensToNotify,
                    priority: "high",
                    content_available: true,
                    android:{
                        priority:"high"
                      },
                    apns: {
                        payload: {
                            aps: {
                                "contentAvailable": true                            }
                        }
                    }
                    
                }
                firebase.messaging().sendMulticast(message)
            }
            
            return res.status(200).json({message: "OK"})
        }
        return res.status(404).json({message: 'Route not found'});

    }catch(error) {
        console.error(error);
        return res.status(500).json({message: 'An error has occurred'});
    }
}
