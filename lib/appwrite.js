import { Client, Account, ID } from 'react-native-appwrite';

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

export const createUser = ({email, password, username}) => {
    account.create(ID.unique(), email, password, username)
        .then((response) => { console.log(response) },
            (error) => {
                console.log(error);
            }
        )
}