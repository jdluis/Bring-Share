import { Alert } from "react-native";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Models,
} from "react-native-appwrite";
import * as FileSystem from 'expo-file-system';

interface AppwriteConfig {
  endpoint: string;
  platform: string;
  projectId: string;
  databaseId: string;
  userCollectionId: string;
  guestsCollectionId: string;
  eventsCollectionId: string;
  storageId: string;
  categoriesCollectionId: string;
  itemsCollectionId: string;
}

export const appwriteConfig: AppwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jdluis.bringandshare",
  projectId: "66719a68001431da53fb",
  databaseId: "66730e9f000fff13a2bc",
  userCollectionId: "66730ecb0028fb59efd3",
  guestsCollectionId: "6675bca3003851681703",
  eventsCollectionId: "66730ee8001eddac650c",
  storageId: "6673113e003940fea01a",
  categoriesCollectionId: "6683b42a00118f733047",
  itemsCollectionId: "6683b34600029493439f"
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
client.setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

interface CreateUserParams {
  email: string;
  password: string;
  username: string;
}

export const createUser = async ({ email, password, username }: CreateUserParams): Promise<Models.Document> => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

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
    throw error;
  }
};

// Auth

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

export const signIn = async ({ email, password }: SignInParams): Promise<Models.Session> => {
  try {
    const session = await account.createSession(email, password);

    if (!session) throw new Error("Failed to create session");

    return session;
  } catch (error) {
    Alert.alert("Error", (error as Error).message);
    throw error;
  }
};

export const signOut = async (): Promise<object> => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw error;
  }
};

interface JoinWithCodeParams {
  eventCode: string;
}

// Users

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

// Events

interface CreateEventParams {
  title: string;
  coverImg: string;
  description: string;
  start_date: string;
  finish_date: string;
  categories: string[];
  creator: string;
}

export const createEvent = async ({
  title,
  description,
  start_date,
  finish_date,
  // coverImg,
  location,
}): CreateEventParams => {
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

export const getAllEvents = async (): Promise<Models.Document[]> => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId
    );

    return events.documents;
  } catch (error) {
    throw error;
  }
};

export const getLatestEvents = async (): Promise<Models.Document[]> => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(4)]
    );

    return events.documents;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async ($id: string): Promise<Models.Document[]> => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No current account");

    const event = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.equal("$id", $id)]
    );

    if (!event) throw new Error("Event not found");
    return event.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchEvents = async (query: string): Promise<Models.Document[]> => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.search("title", query)]
    );

    return events.documents;
  } catch (error) {
    throw error;
  }
};

export const getUserEvents = async (userId: string): Promise<Models.Document[]> => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.equal("creator", userId)]
    );

    return events.documents;
  } catch (error) {
    throw error;
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

// Storage

interface UploadImageParams {
  image: string;
  setUploading: (uploading: boolean) => void;
}

export const uploadImage = async ({ image, setUploading }: UploadImageParams): Promise<void> => {
  if (!image) return;

  setUploading(true);

  try {
    const fileInfo = await FileSystem.getInfoAsync(image);
    if (!fileInfo.exists) {
      throw new Error('File does not exist');
    }

    const fileName = image.split('/').pop() || 'image.jpg';
    const fileExtension = fileName.split('.').pop() || 'jpg';
    const mimeType = `image/${fileExtension}`;

    const formData = new FormData();
    formData.append('fileId', ID.unique());
    formData.append('file', {
      uri: image,
      name: fileName,
      type: mimeType,
    } as any);

    const response = await fetch(`${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.storageId}/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Appwrite-Project': appwriteConfig.projectId,
        // Add authentication header if necessary
        // 'X-Appwrite-Key': 'your-api-key' // Or use your preferred authentication method
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Network response was not ok: ${errorData}`);
    }

    const result = await response.json();
    console.log('File uploaded successfully:', result);
    Alert.alert('Success', 'Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading file:', error);
    Alert.alert('Error', 'Failed to upload image. Please try again.');
  } finally {
    setUploading(false);
  }
};