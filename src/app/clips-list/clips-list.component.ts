import { DatePipe } from '@angular/common';
import { ClipService } from '../services/clip.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers:[DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true

  constructor(public clipService: ClipService) {
    this.clipService.getClips()
   }

  ngOnInit(): void {
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll)
    }
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
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll)
    }
    this.clipService.pageClips = []
  }
}
