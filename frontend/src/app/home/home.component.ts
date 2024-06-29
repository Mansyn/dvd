import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CalendarViewComponent } from '../components/calendar-view/calendar-view.component';
import { AnimationType } from '../components/carousel/carousel.animations';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { Slide } from '../components/carousel/carousel.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent, 
    CalendarViewComponent, 
    MatButtonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
