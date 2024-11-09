export class UserDto {
    id?: string;        
    name?: string;     
    surname?: string;   
    email?: string;     
    password?: string;   
    type?: string;      
    position?: string;  

    constructor(
        name?: string, 
        surname?: string, 
        email?: string, 
        password?: string, 
        type?: string, 
        position?: string
    ) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.type = type;
        this.position = position;
    }
}