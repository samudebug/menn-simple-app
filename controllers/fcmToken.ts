import fcmTokens from '../database/models/fcmTokens';
import createConnection from '../database'
 
export const saveFcmToken = async (token: string) => {
    await createConnection();
    const newFcmToken = new fcmTokens({token: token});
    return await newFcmToken.save();
}