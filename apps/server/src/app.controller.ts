import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
// app.controller.ts
import { UseGuards, Get } from '@nestjs/common';
import { SupabaseAuthGuard } from './auth/supabase.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected')
  @UseGuards(SupabaseAuthGuard)
  getProtected() {
    return { message: 'Access granted' };
  }
}
