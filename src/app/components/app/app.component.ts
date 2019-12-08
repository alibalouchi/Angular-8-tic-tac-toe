import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tic-tac-toe-angular';
  dimension: number = 0

  onChange($event) {
    this.dimension = parseInt($event.target.value)
  }
}
