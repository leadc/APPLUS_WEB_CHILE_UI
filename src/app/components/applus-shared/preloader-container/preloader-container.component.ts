import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader-container',
  templateUrl: './preloader-container.component.html',
  styleUrls: ['./preloader-container.component.css']
})
export class PreloaderContainerComponent implements OnInit {

  public blocked = false;

  constructor() { }

  ngOnInit(): void {
  }

  public block(){
    this.blocked = true;
  }

  public unblock() {
    this.blocked = false;
  }

}
