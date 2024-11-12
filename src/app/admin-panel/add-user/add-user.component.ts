import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { UserService } from '../../services/user.service';
import { UserDto } from '../../Dtos/user.dto';
import { equalPasswordsValidator } from './equalPassowordsValidator';
import { typeValidator } from './typeValidator';
import { strongPasswordValidator } from './strongPasswordValidator';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  public userForm: FormGroup; 

  constructor(private userService: UserService, private fb: FormBuilder) {
  
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],          
      surname: ['', [Validators.required, Validators.minLength(3)]],      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), strongPasswordValidator]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      type: ['', [Validators.required, typeValidator]],         
      position: ['', [Validators.required, Validators.minLength(4)]] 
    },{ validators: equalPasswordsValidator });
  }

  get name() { 
    return this.userForm.get('name');
  }
  get surname() { 
    return this.userForm.get('surname');
  }
  get email() { 
    return this.userForm.get('email');
  }
  get password() { 
    return this.userForm.get('password');
  }
  get confirmPassword() { 
    return this.userForm.get('confirmPassword');
  }
  get type() { 
    return this.userForm.get('type');
  }
  get position() { 
    return this.userForm.get('position');
  }

  
  addNewUser() {
    if (this.userForm.valid) {
      this.userService.add(
        new UserDto(
          this.userForm.value.name,
          this.userForm.value.surname,
          this.userForm.value.email,
          this.userForm.value.password,
          this.userForm.value.type,
          this.userForm.value.position
        )
      ).subscribe(
        () => {
          console.log("User added");
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
