import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CalendarDayViewBeforeRenderEvent, CalendarEvent, CalendarModule, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'dvd-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    MatCardModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  view: string = 'week';
  snapDraggedEvents = true;

  dayStartHour = 6;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Some event',
      start: new Date(),
      draggable: true,
    },
    {
      title: 'Another event',
      start: new Date(),
    },
  ];

  refresh: Subject<any> = new Subject();

  eventTimesChanged({ event, newStart, newEnd }: any): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(null);
  }

  public segmentIsValid(date: Date) {
    // valid if time is greater than 0800 andd less than 1700
    return date.getHours() >= 8 && date.getHours() <= 17;
  }
  beforeDayViewRender(day: CalendarDayViewBeforeRenderEvent): void {
    // day.body.hourGrid.forEach((hour) => {
    //   hour.segments.forEach((segment) => {
    //     if (!this.segmentIsValid(segment.date)) {
    //       delete segment.cssClass;
    //       segment.cssClass = 'cal-disabled';
    //     }
    //   });
    // });
  }
  beforeWeekViewRender(body: CalendarWeekViewBeforeRenderEvent): void {
    body.hourColumns.forEach((hourCol) => {
      hourCol.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (!this.segmentIsValid(segment.date)) {
            delete segment.cssClass;
            segment.cssClass = 'cal-disabled';
          }
        });
      });
    });
  }
}
