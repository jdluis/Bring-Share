import CreatorInterface from "./userInterface";

export default interface NotificationInterface {
    id: string,
    creator: CreatorInterface,
    action: string,
    date: number  
}