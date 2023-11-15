import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampEntites {
    @CreateDateColumn(
        {
            update:false
        }
    )
    createdAt: Date;

    @UpdateDateColumn()
    updatedt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}