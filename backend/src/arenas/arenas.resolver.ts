import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ArenasService } from './arenas.service';
import { ArenaModel } from './models/arena.model';
import { CreateArenaDto } from './dto/arena.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

/**
 */
@Resolver(() => ArenaModel)
export class ArenasResolver {
  constructor(private arenasService: ArenasService) {}

  @Query(() => [ArenaModel], { name: 'arenas', description: 'Fetch all campus arenas and facilities' })
  async getArenas(
    @Args('category', { type: () => String, nullable: true }) category?: string,
  ): Promise<ArenaModel[]> {
    const list = await this.arenasService.findAll(category);
    return list as unknown as ArenaModel[];
  }

  @Query(() => ArenaModel, { name: 'arena', description: 'Retrieve arena details by ID' })
  async getArena(@Args('id', { type: () => ID }) id: string): Promise<ArenaModel> {
    const arena = await this.arenasService.findById(id);
    return arena as unknown as ArenaModel;
  }

  @Mutation(() => ArenaModel, { description: 'Admin: Add a new arena or sports court' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createArena(
    @Args('input', { type: () => CreateArenaDto }) input: CreateArenaDto,
  ): Promise<ArenaModel> {
    const created = await this.arenasService.create(input);
    return created as unknown as ArenaModel;
  }
}
