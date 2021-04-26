import createConnection from '../database'
import User from '../database/models/user'

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