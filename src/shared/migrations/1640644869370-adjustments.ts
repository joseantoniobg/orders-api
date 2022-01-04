import {MigrationInterface, QueryRunner} from "typeorm";

export class adjustments1640644869370 implements MigrationInterface {
    name = 'adjustments1640644869370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" ADD "show_menu" boolean`);
        await queryRunner.query(`ALTER TABLE "users_roles" ALTER COLUMN "link" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" ALTER COLUMN "link" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP COLUMN "show_menu"`);
    }

}
