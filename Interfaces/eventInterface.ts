import CreatorInterface from "./userInterface";

export interface EventInterface {
    $id: string,
    title: string,
    start_date: Date,
    finish_date: Date,
    description: string,
    coverId: string,
    creator: CreatorInterface,
    categories?: Array<"">,
    members?: Array<"">,
    location: string
}

export interface EventFormInterface {
    title: string,
    start_date: Date,
    finish_date: Date,
    description: string,
    coverImg: string,
    categories?: Array<"">,
    members?: Array<"">,
    location: string
}