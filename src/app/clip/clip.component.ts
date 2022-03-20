import { ActivatedRoute, Params } from '@angular/router';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[DatePipe]
})
export class ClipComponent implements OnInit, AfterViewInit, OnChanges {
  clip?: IClip

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.route.data.subscribe(data => {
      this.clip = data.clip as IClip
      const player: HTMLVideoElement = (document.getElementById('videoPlayerView') as HTMLVideoElement)
      player.src = (this.clip?.url as string)
      player.load()
      player.play()
      window.scrollTo(0,0)
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

}
