import {
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
    Column,
    AllowNull,
    NotEmpty,
    DataType,
} from 'sequelize-typescript';

import CandidateI from './candidate.interface';

@Table({
    tableName: 'candidates',
    timestamps: false,
})
export default class CandidateRepository extends Model implements CandidateI {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.TEXT)
    first_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.TEXT)
    last_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.TEXT)
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.TEXT)
    avatar!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.TEXT)
    job_title!: string;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.TEXT)
    phone!: string;
}
