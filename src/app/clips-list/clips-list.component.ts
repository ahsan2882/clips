import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css']
})
export class ClipsListComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const windowBottom = Math.round(scrollTop) + innerHeight === offsetHeight

    if (windowBottom) {
      console.log('window bottom reached')
    }
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
