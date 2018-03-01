export const makeTestService = ({ testResult, testError }) => ({
  testMethod: jest.fn(() => ({ testResult })),
  asyncMethod: jest.fn(() => Promise.resolve({ testResult })),
  asyncError: jest.fn(() => Promise.reject(testError))
})
