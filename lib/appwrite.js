import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jdluis.bringandshare',
    projectId: '66719a68001431da53fb',
    databaseId: '66730e9f000fff13a2bc',
    userCollectionId: '66730ecb0028fb59efd3',
    eventsCollectionId: '66730ee8001eddac650c',
    storageId: '6673113e003940fea01a'
}


const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

const account = new Account(client);
const avatars = new Avatars();
const databases = new Databases(client)

export const createUser = async ({ email, password, username }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async ({ email, password }) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error)
    }

}
