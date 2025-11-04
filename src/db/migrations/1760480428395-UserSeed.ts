import { hash } from 'argon2';
import { User } from 'src/user/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeed1760480428395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    await userRepository.insert([
      {
        username: '23836',
        email: 'jha@wuv.edu',
        course: '*',
        name: 'James Ha',
        password: await hash('Password@123'),
      }, // password: guest
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
