import {MigrationInterface, QueryRunner} from "typeorm";

export class newFields1640644322013 implements MigrationInterface {
    name = 'newFields1640644322013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" ADD "link" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD "id_role_child" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ix_link" ON "users_roles" ("link") `);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_fe30e39b4e2ee18013dcc803cb4" FOREIGN KEY ("id_role_child") REFERENCES "users_roles"("id_role") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_fe30e39b4e2ee18013dcc803cb4"`);
        await queryRunner.query(`DROP INDEX "public"."ix_link"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP COLUMN "id_role_child"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP COLUMN "link"`);
    }

}
