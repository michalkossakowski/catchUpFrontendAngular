export class UserDto {
    id?: string;        
    name?: string;     
    surname?: string;   
    email?: string;     
    password?: string;   
    type?: string;      
    position?: string;  

    constructor(
        id?: string,
        name?: string, 
        surname?: string, 
        email?: string, 
        password?: string, 
        type?: string, 
        position?: string
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.type = type;
        this.position = position;
    }
}