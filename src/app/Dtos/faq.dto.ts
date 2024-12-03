export class FaqDto {
    id?: number;
    title?: string;
    answer?: string;
    materialsId?: number | null;

    constructor(
        id?:number,
        title?:string,
        answer?:string,
        materialsId?:number
    ){
        this.id = id;
        this.title = title;
        this.answer = answer;
        this.materialsId = materialsId;
    }
}