import { invokeService } from '../invokeService'
import { makeTestService } from '../../__specs__/__mocks__/testService'

describe('invokeService', () => {
  it('should pull services from dict and call it\'s method with args', () => {
    const testResult = 'testResult'
    const testService = makeTestService({ testResult })
    expect(
      invokeService({ testService }, 'testService', 'testMethod', [1, 2])
    ).toEqual({ testResult })
  })
})
