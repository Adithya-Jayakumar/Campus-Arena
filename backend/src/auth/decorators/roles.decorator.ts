import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // Support both HTTP and GraphQL contexts
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext()?.req;
    if (gqlReq && gqlReq.user) {
      return gqlReq.user;
    }
    const httpReq = context.switchToHttp().getRequest();
    return httpReq?.user;
  },
);
