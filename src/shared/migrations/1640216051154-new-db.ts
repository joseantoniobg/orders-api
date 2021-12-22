import {MigrationInterface, QueryRunner} from "typeorm";

export class newDb1640216051154 implements MigrationInterface {
    name = 'newDb1640216051154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_roles" ("id_role" SERIAL NOT NULL, "unique_key" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_815859bd8638fbdb84e543bf1b4" PRIMARY KEY ("id_role"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ix_key" ON "users_roles" ("unique_key") `);
        await queryRunner.query(`CREATE TABLE "vendors" ("id_vendor" uuid NOT NULL DEFAULT uuid_generate_v4(), "CNPJ" character varying(14) NOT NULL, "description" character varying(60) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cd245db18a01a6fdbded4920dff" PRIMARY KEY ("id_vendor"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ix_cnpj" ON "vendors" ("CNPJ") `);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(50) NOT NULL, "email" character varying(70) NOT NULL, "status" smallint NOT NULL DEFAULT '1', "password" character varying(256) NOT NULL, "cancelled_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id_vendor" uuid, CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ix_login" ON "users" ("login") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "ix_email" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_e49bda11881cbed27948dfffbc" ON "users" ("login", "password") `);
        await queryRunner.query(`CREATE TABLE "users_have_roles" ("usersIdUser" uuid NOT NULL, "usersRolesIdRole" integer NOT NULL, CONSTRAINT "PK_891008d8535738a64beec9f96b1" PRIMARY KEY ("usersIdUser", "usersRolesIdRole"))`);
        await queryRunner.query(`CREATE INDEX "IDX_963d7c5b3738c182ebf6522cc7" ON "users_have_roles" ("usersIdUser") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2879c6cfd3ff6e9817d68a4c8" ON "users_have_roles" ("usersRolesIdRole") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f5fd80e3660bd2ccdf9dc3bb5d5" FOREIGN KEY ("id_vendor") REFERENCES "vendors"("id_vendor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_have_roles" ADD CONSTRAINT "FK_963d7c5b3738c182ebf6522cc70" FOREIGN KEY ("usersIdUser") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_have_roles" ADD CONSTRAINT "FK_c2879c6cfd3ff6e9817d68a4c83" FOREIGN KEY ("usersRolesIdRole") REFERENCES "users_roles"("id_role") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_have_roles" DROP CONSTRAINT "FK_c2879c6cfd3ff6e9817d68a4c83"`);
        await queryRunner.query(`ALTER TABLE "users_have_roles" DROP CONSTRAINT "FK_963d7c5b3738c182ebf6522cc70"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f5fd80e3660bd2ccdf9dc3bb5d5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2879c6cfd3ff6e9817d68a4c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_963d7c5b3738c182ebf6522cc7"`);
        await queryRunner.query(`DROP TABLE "users_have_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e49bda11881cbed27948dfffbc"`);
        await queryRunner.query(`DROP INDEX "public"."ix_email"`);
        await queryRunner.query(`DROP INDEX "public"."ix_login"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."ix_cnpj"`);
        await queryRunner.query(`DROP TABLE "vendors"`);
        await queryRunner.query(`DROP INDEX "public"."ix_key"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
    }

}
