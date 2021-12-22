import {MigrationInterface, QueryRunner} from "typeorm";

export class addedDescription1640217126325 implements MigrationInterface {
    name = 'addedDescription1640217126325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" ADD "description" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP COLUMN "description"`);
    }

}
