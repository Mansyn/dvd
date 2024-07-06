export interface Event {
    _id: number;
    start: Date;
    end?: Date;
    title: string;
    description?: string;
    allDay?: boolean;
    text?: string;
    link?: string;
    cssClass?: string;
}