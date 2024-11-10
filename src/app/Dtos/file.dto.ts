export class FileDto {
    id: number;
    name?: string
    type?: string
    source?: string

    constructor(id: number, name?: string, type?: string, source?: string)
    {
        this.id = id
        this.name = name
        this.type = type
        this.source = source
    }
}