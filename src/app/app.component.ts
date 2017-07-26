import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  isShrink = true;
  isEnlarge = true;

  toggleShrink(){
    this.isShrink = !this.isShrink;
    this.isEnlarge = !this.isEnlarge;
  }
}
