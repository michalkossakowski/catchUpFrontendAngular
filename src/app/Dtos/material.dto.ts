import { FileDto } from "./file.dto";

export class MaterialDto {
    id: number
    name?: string
    files?: FileDto[]

    constructor(id: number, name?: string ,files?: FileDto[]){
        this.id = id
        this.name = name
        this.files = files
    }
}