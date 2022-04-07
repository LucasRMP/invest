import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProducts1649290249838 implements MigrationInterface {
  name = 'createProducts1649290249838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ticker" character varying NOT NULL, "price" float8 NOT NULL DEFAULT '0', "name" character varying NOT NULL, "currency" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
