import { GqlAuthGuard } from './grapqhl-auth.guard'

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new GqlAuthGuard()).toBeDefined()
  })
})
