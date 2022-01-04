import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table_model')
export class TableModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_table_model: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  Header: string;

  @Column({ type: 'varchar', length: 60 })
  accessor: string;

  @Column({ type: 'smallint', nullable: true })
  width?: number;
}
