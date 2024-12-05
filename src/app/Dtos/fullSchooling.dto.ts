import { CategoryDto } from "./category.dto";
import { SchoolingDto } from "./schooling.dto";
import { SchoolingPartDto } from "./schoolingPart.dto";

export class FullSchoolingDto {
    schooling: SchoolingDto;
    category?: CategoryDto;
    parts?: SchoolingPartDto[];

    constructor(
        schooling: SchoolingDto,
        category: CategoryDto,
        parts: SchoolingPartDto[]
    ){
        this.schooling = schooling
        this.category = category
        this.parts = parts
    }
}