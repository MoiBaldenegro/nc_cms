import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TestimonialsService } from './testimonials.service';
import { SupabaseAuthGuard } from '../auth/supabase.guard';
import { CloudinaryService } from './cloudinary.service';

@Controller('testimonials')
export class TestimonialsController {
  constructor(
    private service: TestimonialsService,
    private cloudinary: CloudinaryService,
  ) {}

  @UseGuards(SupabaseAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    let imageUrl = null;

    // 👉 solo sube si hay archivo
    if (file) {
      const upload = await this.cloudinary.upload(file);
      imageUrl = upload.secure_url;
    }

    return this.service.create({
      content: body.content,
      author: body.author,
      imageUrl,
      videoUrl: body.videoUrl,
      category: body.category,
      tags: body.tags
        ? body.tags.split(',').map((tag: string) => tag.trim())
        : [], //
    });
  }

  @UseGuards(SupabaseAuthGuard)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.service.findAll(search);
  }

  @UseGuards(SupabaseAuthGuard)
  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.service.approve(id);
  }

  @Get('/public')
  getPublic(@Query('limit') limit = 5) {
    return this.service.findApproved(limit);
  }

  @UseGuards(SupabaseAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
