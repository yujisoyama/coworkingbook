import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666048544929 implements MigrationInterface {
    name = 'default1666048544929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "period_type" ("id" SERIAL NOT NULL, "type" text NOT NULL, CONSTRAINT "PK_8e33998052a02860f87b9b8e91e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullname" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "company" text, "role" text, "confirmed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "desk" integer NOT NULL, "booking_day" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "period_id" integer, CONSTRAINT "REL_4bbecf91975bb9c0b76eb19466" UNIQUE ("period_id"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_d2211ba79c9312cdcda4d7d5860" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_4bbecf91975bb9c0b76eb19466e" FOREIGN KEY ("period_id") REFERENCES "period_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_4bbecf91975bb9c0b76eb19466e"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_d2211ba79c9312cdcda4d7d5860"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "period_type"`);
    }

}
