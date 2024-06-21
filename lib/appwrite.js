import { router } from "expo-router";
import { Alert } from "react-native";
import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jdluis.bringandshare",
  projectId: "66719a68001431da53fb",
  databaseId: "66730e9f000fff13a2bc",
  userCollectionId: "66730ecb0028fb59efd3",
  eventsCollectionId: "66730ee8001eddac650c",
  storageId: "6673113e003940fea01a",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  eventsCollectionId,
  storageId,
} = appwriteConfig;

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars();
const databases = new Databases(client);

export const createUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);


    if (!session) throw Error;
    
    await account.get().then((res)=>console.log(res))
    router.replace('/home')
    return session;
  } catch (error) {
    Alert.alert("Error", error.message)
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    /* const result = await account.deleteSession(
      session.$id // sessionId
  ); */

    router.push("/sign-in");
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async () => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestEvents = async () => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
       [Query.orderDesc('$createdAt', Query.limit(4))]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
};
