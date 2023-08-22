import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('AppService initialized');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
