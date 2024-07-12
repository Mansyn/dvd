import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const SIPPO_PATH = 'https://cdn.jsdelivr.net/npm/@kegshoe/sippo';
const MENU = 'JoMjd'
const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

@Component({
  selector: 'app-beers',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatProgressSpinnerModule],
  templateUrl: './beers.component.html',
  styleUrl: './beers.component.scss'
})
export class BeersComponent implements OnInit {

  public loaded: boolean 

    
  constructor() {
    this.loaded = false
  }
 
  ngOnInit() {
    
    this.loadScript()
  }

  loadScript(): Promise<any> {
    return new Promise(async () => {
      await delay(500);
      this.loaded = true
      const script = document.createElement('script');
      script.src = SIPPO_PATH
      script.setAttribute('menu', MENU)
      script.async = true;
      script.defer = true;
      document.getElementById("menu")!.appendChild(script);
    });
}
}
