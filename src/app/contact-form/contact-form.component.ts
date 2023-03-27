import { AlertController } from '@ionic/angular';
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
    dob: new FormControl(new Date(), Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    jobTitle: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    pictureUrl: new FormControl(),
  });

  selectedImage: any;
  validForm: boolean = false;

  maxDate: string = new Date().toISOString();
  minDate: string = new Date('1900-01-01').toISOString();

  constructor(private alertController: AlertController) {
    this.user.valueChanges.subscribe(data => {
      this.validateForm();
    })
  }

  ngOnInit() {}

  async operationSuccess() {
    const alert = await this.alertController.create({
      header: 'Successful operation',
      message: 'User completed successfully',
      buttons: ['OK']
    });
    await alert.present();
  }

  validateDate(): boolean {
    try {
      const dob = new Date(this.user.value.dob || '')
      return Boolean(dob >= new Date(this.minDate) && dob <= new Date(this.maxDate))
    } catch (error) {
      console.log({error})
      return false;
    }
    
  }
  validateForm() {
    
    this.validForm = Boolean(
      this.user.value.firstName && 
      this.user.value.lastName && 
      this.user.value.street && 
      this.user.value.city && 
      this.user.value.state && 
      this.user.value.jobTitle && 
      this.user.value.phoneNumber && 
      this.validateDate() &&
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
      this.operationSuccess();
    }
    
  }

  setImage(event: any) {
    const file = event.target.files.item(0);
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
      this.validateForm();
    };

    reader.readAsDataURL(file);
  }
}