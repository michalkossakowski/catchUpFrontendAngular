import { MaterialDto } from "./material.dto";

export class SchoolingPartDto  {
    id?: number;
    name: string;
    content: string;
    materials: MaterialDto[];
    constructor(
        name: string,
        content: string,
        materials: MaterialDto[]
    ){
        this.name = name
        this.content = content
        this.materials = materials
    }
}