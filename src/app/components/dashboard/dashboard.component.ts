import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  toggleProperty = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    //scrollbar: { draggable: true },
  };
  slides = [
    {
      //link: 'https://www.google.com',
      image: '../../../assets/img/ejemplo1.jpg',
    },
    {
      //link: 'https://www.youtube.com',
      image: '../../../assets/img/ejemplo2.jpg',
    },
    {
      //link: 'https://www.facebook.com',
      image: '../../../assets/img/ejemplo3.jpg',
    },
    {
      //link: 'https://www.facebook.com',
      image: '../../../assets/img/ejemplo4.jpg',
    },
    {
      //link: 'https://www.facebook.com',
      image: '../../../assets/img/background-login3.jfif',
    },


  ];
}