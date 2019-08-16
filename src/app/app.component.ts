import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupName, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { resolve } from 'path';
import { reject } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  forbiddenUserName= ['paty', 'fulano', 'ciclano'];


  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.AsyncForbiddenEmail),
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe((value) =>{
    //   console.log(value);
    // });
    // this.signupForm.statusChanges.subscribe((status) =>{
    //   console.log(status);
    // });

  }

  addHobbie(){
    let control= new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean} {
    if ( this.forbiddenUserName.indexOf(control.value) !== -1 ) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  AsyncForbiddenEmail(control:FormControl): Promise<any> | Observable<any>{

    const promise= new Promise<any>((resolve, reject)=>{
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve( { 'emailIsForbidden': true });
        }
        resolve(null);
      }, 1000);
    });

    return promise;
  }


}
