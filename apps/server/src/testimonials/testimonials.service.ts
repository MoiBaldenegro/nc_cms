// testimonials.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private repo: Repository<Testimonial>,
  ) {}

  create(data: any) {
    const testimonial = this.repo.create({
      ...data,
      status: 'pending',
    });

    return this.repo.save(testimonial);
  }

  async findAll(search?: string) {
    if (!search) {
      return this.repo.find();
    }

    return this.repo
      .createQueryBuilder('t')
      .where('t.content ILIKE :search', { search: `%${search}%` })
      .orWhere('t.author ILIKE :search', { search: `%${search}%` })
      .orWhere('t.category ILIKE :search', { search: `%${search}%` })
      .getMany();
  }

  approve(id: string) {
    return this.repo.update(id, { status: 'approved' });
  }

  findApproved() {
    return this.repo.find({ where: { status: 'approved' } });
  }
}
