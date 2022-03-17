import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  inSubmission = false;
  constructor(private auth: AuthService) {

  }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(70)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  ])
  confirmPassword = new FormControl('', [
    Validators.required,

  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert = false
  alertMsg = 'Please wait, your account is being created...'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  },[RegisterValidators.match('password', 'confirmPassword')])

  async register() {
    this.inSubmission = true;
    this.showAlert = true
    this.alertMsg = 'Please wait, your account is being created...'
    this.alertColor = 'blue'

    await this.auth.createUser(this.registerForm.value)
      .then(() => {
        this.alertMsg = 'Your account has been created successfully'
        this.alertColor = 'green'
      })
      .catch(err => {
        let error: string = err?.message;
        error = error.substring((error.includes('Firebase')? 10:0), error.indexOf('(auth'))
        console.log(error)
        this.alertMsg = error;
        this.inSubmission = false;
        this.alertColor = 'red'
      })
  }

}
