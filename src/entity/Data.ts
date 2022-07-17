import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ orderBy: { date: "DESC" }, synchronize: true })
export class Data
{
    @Index({ fulltext: true, unique: true })
    @Column({ type: "varchar", nullable: false, default: "", length: 255 })
    path: string;

    @Column({ type: "boolean", nullable: false, default: false })
    public: string;

    @Column({ type: "varchar", nullable: false, default: "" })
    value: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    constructor (path?: string, value?: string)
    {
        if (path)
        {
            this.path = path;
        }

        if (value)
        {
            this.value = value;
        }
    }
}