import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-reserva',
  templateUrl: './banner-reserva.component.html',
  styleUrls: ['./banner-reserva.component.css']
})
export class BannerReservaComponent implements OnInit {

  @Input() text = true;

  constructor() { }

  ngOnInit(): void {
  }

}
