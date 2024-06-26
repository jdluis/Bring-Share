import CreatorInterface from "./userInterface";

export default interface EventInterface {
    $id: string,
    title: string,
    startDate: Date,
    finishDate: Date,
    description: string,
    coverImg: string,
    creator: CreatorInterface,
    categories: Array<"">,
    members: Array<"">
}