export class FaqDto {
    id?: number;
    title: string;
    answer: string;
    materialsId?: number | null;

    constructor(title:string,answer:string,materialsId?:number){
        this.title = title;
        this.answer = answer;
        this.materialsId = materialsId;
    }
}