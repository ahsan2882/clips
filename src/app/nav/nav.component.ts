import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated = false

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private afAuth:AngularFireAuth
  ) {
    this.auth.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status
    })
  }

  ngOnInit(): void {
  }

  openModal(e: Event) {
    e.preventDefault()
    this.modal.toggleModal("auth");
  }

  async logout(e:Event) {
    e.preventDefault()
    await this.afAuth.signOut()
  }

}
