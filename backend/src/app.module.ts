import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ArenasModule } from './arenas/arenas.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { MetricsModule } from './metrics/metrics.module';

/**
 * Root NestJS Application Module
 * Ties together Modules I to IV:
 * - Modular Dependency Injection
 * - Apollo GraphQL Driver
 * - Prisma ORM database connection
 * - Authentication & Observability
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    PrismaModule,
    AuthModule,
    ArenasModule,
    BookingsModule,
    EventsModule,
    MetricsModule,
  ],
})
export class AppModule {}
