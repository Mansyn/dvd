import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { MobileMenuSheetComponent } from './components/mobile-menu-sheet/mobile-menu-sheet.component';
import { Page } from './models/navigation';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule, 
    RouterOutlet, 
    FooterComponent, 
    MatDividerModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatTabsModule,
    MatBottomSheetModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public pages: Page[];
  public isLoggedIn = false;
  public isAdmin = false

  public isMobile: boolean;

  constructor(private _breakpointObserver: BreakpointObserver, 
    public _storageService: StorageService,
    private _bottomSheet: MatBottomSheet) {
      this.isMobile = false
      this.pages = [
        {
          link: 'home',
          icon: 'home',
          text: 'home',
          description: 'View our hours, location, and calendar of events'
        },
        {
          link: 'beers',
          icon: 'sports_bar',
          text: 'beers',
          description: 'Our latest menu of beers'
        },
        {
          link: 'gallery',
          icon: 'imagesmode',
          text: 'gallery',
          description: 'Get a feel for the vibe at DVD Brew'
        }
      ]
  }

  ngOnInit(): void {
      this.isLoggedIn = this._storageService.isLoggedIn();
      this.isAdmin = this._storageService.isAdmin()
    
    if (this._storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.pages.push(
        {
          link: 'account',
          icon: 'person',
          text: 'account',
          description: 'Your Profile',
          isAdmin: true
        }
      )
      if (this._storageService.isAdmin()) {
        this.isAdmin = true;
        this.pages.push(
          {
            link: 'admin',
            icon: 'settings',
            text: 'admin',
            description: 'Manage DVD Brew website',
            isAdmin: true
          }
        )
      }
    }

    this._breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = !state.matches
      });
  }

  openMobileMenu(): void {
    this._bottomSheet.open(MobileMenuSheetComponent, {data: this.pages });
  }
}
