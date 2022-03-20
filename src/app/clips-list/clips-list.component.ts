import { ClipService } from '../services/clip.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css']
})
export class ClipsListComponent implements OnInit, OnDestroy {

  constructor(public clipService: ClipService) {
    this.clipService.getClips()
   }

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const windowBottom = Math.round(scrollTop) + innerHeight === offsetHeight

    if (windowBottom) {
      this.clipService.getClips()
    }
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
