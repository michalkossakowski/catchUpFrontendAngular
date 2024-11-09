import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../../Dtos/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  public name!:string;
  public surname!:string;
  public email!:string;
  public password!:string;
  public type!:string;
  public position!:string;

  constructor(private userService: UserService){}

  addNewUser() {
    this.userService.add(
      new UserDto(
        this.name,
        this.surname,
        this.email,
        this.password,
        this.type,
        this.position
      )
    ).subscribe(
      () => {
        console.log("dodaned");
      },
      (error) => {
        console.error(error);
      }
    );
  }
}


