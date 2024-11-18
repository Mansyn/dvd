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

export interface GroupedEvents {
    date: Date;
    allDayEvents: Event[];
    timedEvents: Event[];
  }
