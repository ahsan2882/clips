import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }

  showAlert = false
  alertMsg = 'Logging In....'
  alertColor = 'blue'
  inSubmission = false
  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true
    this.alertMsg = 'Logging In....'
    this.alertColor = 'blue'
    this.inSubmission = true
    await this.auth.signInWithEmailAndPassword(
      this.credentials.email, this.credentials.password
    )
      .then(() => {
        this.alertMsg = 'Logged in'
        this.alertColor='green'
      })
      .catch(err => {
        console.log(err)
        this.inSubmission = false
        let error: string = err?.message;
        error = error.substring((error.includes('Firebase') ? 10 : 0), error.indexOf('(auth'))
        this.alertMsg = error
        this.alertColor = 'red'
        return
      })
  }

}
