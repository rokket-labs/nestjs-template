import { GqlAuthGuard } from './gql-auth.guard'

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new GqlAuthGuard()).toBeDefined()
  })
})
