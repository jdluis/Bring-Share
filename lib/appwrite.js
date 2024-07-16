import { Alert } from "react-native";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Storage,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jdluis.bringandshare",
  projectId: "66719a68001431da53fb",
  databaseId: "66730e9f000fff13a2bc",
  userCollectionId: "66730ecb0028fb59efd3",
  guestsCollectionId: "6675bca3003851681703",
  eventsCollectionId: "66730ee8001eddac650c",
  categoriesCollectionId: "6683b42a00118f733047",
  itemsCollectionId: "6683b34600029493439f",
  storageId: "6673113e003940fea01a",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  guestsCollectionId,
  eventsCollectionId,
  categoriesCollectionId,
  itemsCollectionId,
  storageId,
} = appwriteConfig;

console.log(endpoint + "/" + projectId + "/" + platform);

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// USERS SERVICES

//Check session
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

// AUTH

export const signIn = async ({ email, password }) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw Error;

    return session;
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

//EVENTS

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
      [Query.orderDesc("$createdAt", Query.limit(4))]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getEventById = async ($id) => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const event = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.equal("$id", $id)]
    );

    if (!event) throw Error;
    return event.documents;
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = async ({
  title,
  description,
  start_date,
  finish_date,
 // coverImg,
  location,
}) => {
  try {
    const currentUserId = await getCurrentUser();

    const newEvent = await databases.createDocument(
      databaseId,
      eventsCollectionId,
      ID.unique(),
      {
        title,
        description,
        start_date,
        finish_date,
        //coverImg,
        creator: currentUserId.$id,
        location,
      }
    );

    return newEvent;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchEvents = async (query) => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.search("title", query)]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserEvents = async (userId) => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.equal("creator", userId)]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// CATEGORIES

export const getAllCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      databaseId,
      categoriesCollectionId
    );

    return categories.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// ITEMS

// OTHERS

export const joinWithCode = async ({ eventCode }) => {
  try {
    //Search Guest with the eventCode and route to the event.

    //Si no existe el eventCode del guest, saltar error
    if (!session) throw Error;

    //Poner en la base de datos que el invitado a entrado

    //Ir al evento asignado al guest
    //router.replace('/')
    return eventCode; //Provisional
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

//Not working, algo de permisos,
export const uploadImage = async (uri) => {
  try {
    const response = await fetch(uri);

    if (!response.ok) {
      throw new Error("Error fetching the image.");
    }

    const blob = await response.blob();
    const file = new File([blob], "cover.jpg", { type: blob.type });

    const uploadedFile = await storage.createFile(storageId, "testing", file);

    const fileUrl = storage.getFileView(storageId, uploadedFile.$id);

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
