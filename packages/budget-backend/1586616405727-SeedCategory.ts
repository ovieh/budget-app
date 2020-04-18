import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategory1586616405727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "category"("name", "budget") VALUES("uncategorized", "0")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
