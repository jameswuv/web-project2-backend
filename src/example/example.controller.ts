import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('example')
export class ExampleController {
  exampleObject = {
    name: 'Example',
    description: 'This is an example controller in NestJS',
  };

  exampleObjectArray = [
    { id: 1, value: 'First' },
    { id: 2, value: 'Second' },
    { id: 3, value: 'Third' },
  ];

  @Public()
  @Get()
  getExample(): any {
    return this.exampleObject;
  }

  @Public()
  @Get('array')
  getExampleArray(): any[] {
    return this.exampleObjectArray;
  }
}
