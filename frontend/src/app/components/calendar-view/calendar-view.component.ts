import { Component } from '@angular/core';
import { format } from 'date-fns';
import { Event } from '../../models/calendar';

@Component({
  selector: 'calendar-view',
  standalone: true,
  imports: [],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {

  events: Event[] = [];
  
  constructor() {
    this.events = [
      {
        id: 1,
        title: 'Casa Mexico  Grill & Cantina',
        description: 'SUMMER cocktails to hit the spot.',
        start: new Date(2024, 5, 30, 12),
        end: new Date(2024, 5, 30, 22),
        allDay: true
      }
    ];
  }

  public displayDay(date: Date) {
    return format(date, 'do');
  }

  public displayMonth(date: Date) {
    return format(date, 'LLLL');
  }
  
  public displayYear(date: Date) {
    return format(date, 'yyyy');
  }
    
  public displayTime(date: Date) {
    return format(date, "h:mm aaaaa'm'");
  }
}
