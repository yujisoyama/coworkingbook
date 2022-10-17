import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665948474765 implements MigrationInterface {
    name = 'default1665948474765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmed"`);
    }

}
