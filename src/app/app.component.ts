import { AfterViewChecked, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'ApplusChileSPA';

  ngAfterViewChecked(){
    document.dispatchEvent(new Event('viewChanged'))
  }
}
