import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     
  }
  displaytable: boolean = false;
  
// @FormatDate()

  loadData(element: HTMLElement) {
    this.displaytable = true;

    this.change(element);
  }
  // learned from stackoverflow
  change(element: HTMLElement) {
    element.textContent = "Refresh Data";
    element.style.display='none';
  }

}
