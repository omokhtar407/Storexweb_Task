import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movies';

   // Method for Scrolling to Top automatically when i click on routing or any item in pages
  ScrollToTop(event:any) {
    window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
    });
  }

}
