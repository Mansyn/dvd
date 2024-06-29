import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { HammerModule } from '@angular/platform-browser';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';

@Component({
  selector: 'app-gallery-view',
  standalone: true,
  imports: [Angular2ImageGalleryModule, HammerModule, MatDividerModule],
  templateUrl: './gallery-view.component.html',
  styleUrl: './gallery-view.component.scss'
})
export class GalleryViewComponent {

}
