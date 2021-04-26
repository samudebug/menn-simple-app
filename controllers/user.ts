import createConnection from '../database'
import User from '../database/models/user'
import axios from 'axios'

export const createUser = async (name: string) => {
    await createConnection();
    const newUser = new User({name: name});
    return await newUser.save()
}

export const getUserByName = async (name: string) => {
    await createConnection();
    const user = (await User.findOne({name: name}, 'name').exec()).toJSON();
    user._id = user._id.toString();
    return user;
}

export const createLinkForUser = async (name: string) => {
    const firebaseApiKey = process.env.FIREBASE_API_KEY;
    const basePath = "https://menn-simple-app-samudebug.vercel.app";
    const link = `${basePath}/${name}`;
    const response = await axios.post(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${firebaseApiKey}`, {
            dynamicLinkInfo: {
                domainUriPrefix: "https://mennlinks.page.link",
                link: link,
                androidInfo: {
                    androidPackageName: "com.mennmobileapp",
                    androidFallbackLink: link
                },
                iosInfo: {
                    iosBundleId: "org.name.mennmobileapp",
                    iosFallbackLink: link
                }
            }
    });
    return response.data;
}