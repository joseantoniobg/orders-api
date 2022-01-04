import {MigrationInterface, QueryRunner} from "typeorm";

export class newTableMode4l1641334751098 implements MigrationInterface {
    name = 'newTableMode4l1641334751098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "table_model" ("id_table_model" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "Header" character varying(60) NOT NULL, "accessor" character varying(60) NOT NULL, "width" smallint, CONSTRAINT "PK_1b12061a3c546e6ba3f6683b342" PRIMARY KEY ("id_table_model"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "table_model"`);
    }

}
