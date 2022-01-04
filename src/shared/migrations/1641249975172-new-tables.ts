import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1641249975172 implements MigrationInterface {
    name = 'newTables1641249975172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand_type" ("id_brand_type" integer NOT NULL, "name" character varying(60) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9264450b7413d56fb21a153150f" PRIMARY KEY ("id_brand_type"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id_brand" integer NOT NULL, "name" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id_brand_type" integer, CONSTRAINT "PK_e911a535cc4ed2aea9d1fc2e55a" PRIMARY KEY ("id_brand"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id_product" integer NOT NULL, "bar_code" character varying(30) NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(300) NOT NULL, "current_price" numeric(10,2) NOT NULL, "sale_price" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id_brand" integer, CONSTRAINT "PK_61a11191b5789c8a8035edf88f7" PRIMARY KEY ("id_product"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ix_bar_code" ON "products" ("bar_code") `);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_e3e5ddc90eb70002acb78e5b20f" FOREIGN KEY ("id_brand_type") REFERENCES "brand_type"("id_brand_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1176fff99583b66d8df8a53deeb" FOREIGN KEY ("id_brand") REFERENCES "brand"("id_brand") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1176fff99583b66d8df8a53deeb"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_e3e5ddc90eb70002acb78e5b20f"`);
        await queryRunner.query(`DROP INDEX "public"."ix_bar_code"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "brand_type"`);
    }

}
