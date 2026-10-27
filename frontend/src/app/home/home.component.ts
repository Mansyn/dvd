import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CalendarViewComponent } from '../components/calendar-view/calendar-view.component';
import { AnimationType } from '../components/carousel/carousel.animations';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { Slide } from '../components/carousel/carousel.interface';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent, 
    CalendarViewComponent, 
    MatButtonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatIconModule,
    MatListModule,
    MatChipsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public todayIndex: number = (new Date().getDay() + 6) % 7; // Monday=0 ... Sunday=6

  public hours: { day: string; hours?: string; closed?: boolean }[] = [
    { day: 'Monday', hours: '4:00 PM – 10:00 PM' },
    { day: 'Tuesday', hours: '4:00 PM – 10:00 PM' },
    { day: 'Wednesday', hours: '4:00 PM – 10:00 PM' },
    { day: 'Thursday', hours: '4:00 PM – 10:00 PM' },
    { day: 'Friday', hours: '12:00 PM – 10:00 PM' },
    { day: 'Saturday', hours: '12:00 PM – 10:00 PM' },
    { day: 'Sunday', hours: '12:00 PM – 10:00 PM' }
  ];

  public animationTypes = [
    {
      name: "Scale",
      value: AnimationType.Scale
    },
    {
      name: "Fade",
      value: AnimationType.Fade
    },
    {
      name: "Flip",
      value: AnimationType.Flip
    },
    {
      name: "Jack In The Box",
      value: AnimationType.JackInTheBox
    }
  ];

  public slides_x: Slide[] = [
    {
      headline: "So Many Taps",
      src:
        "/assets/carousel/taps_02-min.jpg"
    },
    {
      headline: "Try Them All",
      src:
        "/assets/carousel/single_flight_angle-min.jpg"
    },
    {
      headline: "Welcome To Our Bar",
      src:
        "/assets/carousel/Conger_DVDBrewery-HR-05-min.jpg"
    }
  ];

  public slides_y: Slide[] = [
    {
      headline: "Come Hang Out",
      src:
        "/assets/carousel/bar_11-min.jpg"
    },
    {
      headline: "Try Them All",
      src:
        "/assets/carousel/Conger_DVDBrewery-HR-10-min.jpg"
    },
    {
      headline: "Try A Flight",
      src:
        "/assets/carousel/Horiz_-_flight_menu-min.jpg"
    }
  ];
}
