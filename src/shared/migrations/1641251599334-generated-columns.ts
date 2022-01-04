import {MigrationInterface, QueryRunner} from "typeorm";

export class generatedColumns1641251599334 implements MigrationInterface {
    name = 'generatedColumns1641251599334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_e3e5ddc90eb70002acb78e5b20f"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "brand_type_id_brand_type_seq" OWNED BY "brand_type"."id_brand_type"`);
        await queryRunner.query(`ALTER TABLE "brand_type" ALTER COLUMN "id_brand_type" SET DEFAULT nextval('"brand_type_id_brand_type_seq"')`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1176fff99583b66d8df8a53deeb"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "brand_id_brand_seq" OWNED BY "brand"."id_brand"`);
        await queryRunner.query(`ALTER TABLE "brand" ALTER COLUMN "id_brand" SET DEFAULT nextval('"brand_id_brand_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "products_id_product_seq" OWNED BY "products"."id_product"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id_product" SET DEFAULT nextval('"products_id_product_seq"')`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_e3e5ddc90eb70002acb78e5b20f" FOREIGN KEY ("id_brand_type") REFERENCES "brand_type"("id_brand_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1176fff99583b66d8df8a53deeb" FOREIGN KEY ("id_brand") REFERENCES "brand"("id_brand") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1176fff99583b66d8df8a53deeb"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_e3e5ddc90eb70002acb78e5b20f"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id_product" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "products_id_product_seq"`);
        await queryRunner.query(`ALTER TABLE "brand" ALTER COLUMN "id_brand" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "brand_id_brand_seq"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1176fff99583b66d8df8a53deeb" FOREIGN KEY ("id_brand") REFERENCES "brand"("id_brand") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand_type" ALTER COLUMN "id_brand_type" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "brand_type_id_brand_type_seq"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_e3e5ddc90eb70002acb78e5b20f" FOREIGN KEY ("id_brand_type") REFERENCES "brand_type"("id_brand_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
