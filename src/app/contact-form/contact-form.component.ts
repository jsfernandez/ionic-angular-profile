import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  user = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    jobTitle: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    pictureUrl: new FormControl(),
  });

  selectedImage: any;
  validForm: boolean = false;

  constructor() {
    this.user.valueChanges.subscribe(data => {
      console.log('Form changes', data)
      this.validateForm();
    })
  }

  ngOnInit() {}

  validateForm() {
    this.validForm = Boolean(
      this.user.value.firstName && 
      this.user.value.lastName && 
      this.user.value.street && 
      this.user.value.city && 
      this.user.value.state && 
      this.user.value.jobTitle && 
      this.user.value.phoneNumber && 
      this.selectedImage
    );
  }

  submitForm() {
    const firstName = this.user.value.firstName || '';
    const lastName = this.user.value.lastName || '';
    const dob = this.user.value.dob ? new Date(this.user.value.dob) : new Date() || new Date();
    const street = this.user.value.street || '';
    const city = this.user.value.city || '';
    const state = this.user.value.state || '';
    const jobTitle = this.user.value.jobTitle || '';
    const phoneNumber = this.user.value.phoneNumber || '';

    if (this.selectedImage) {
      const user = User.getUserState()
      user.setUser(firstName, lastName, dob, street, city, state, jobTitle, phoneNumber, this.selectedImage);
      console.log(User.getUserState())
    }
    
  }

  setImage(event: any) {
    const file = event.target.files.item(0);
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}