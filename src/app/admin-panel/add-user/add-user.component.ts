import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { UserService } from '../../services/user.service';
import { UserDto } from '../../Dtos/user.dto';

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
      name: ['', Validators.required],          
      surname: ['', Validators.required],      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],    
      type: ['', Validators.required],         
      position: ['', Validators.required] 
    });
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
          console.log("User added successfully");
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
