import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import { ServiceProvider } from '../ServiceProvider'
import { GetData, PendingState as DefaultPendingState } from '../GetData'
import { makeTestService } from './__mocks__/testService'

const expectPendingState = (getData, PendingState = DefaultPendingState) => {
  const pendingState = ReactTestRenderer.create(<PendingState />)
  expect(getData.toJSON()).toEqual(pendingState.toJSON())
}

describe('<GetData>', () => {
  let testResult, testError, renderStub, testService, testPending

  beforeEach(() => {
    testResult = 'testResult'
    testError = new Error()
    renderStub = jest.fn(() => testResult)
    testPending = jest.fn(() => 'testPending')
    testService = makeTestService({ testResult, testError })
  })

  describe('when pass function as a children', () => {
    it('should render it\'s result', () => {
      const renderStub = jest.fn(() => 'renderedData')
      const getData = ReactTestRenderer.create(
        <ServiceProvider services={{ testService }}>
          <GetData>{renderStub}</GetData>
        </ServiceProvider>
      )

      expectPendingState(getData)

      setTimeout(() => {
        expect(getData.toJSON()).toEqual('renderedData')
      }, 100)
    })
  })

  describe('when services provided in context', () => {
    it('should invoke service method with args', done => {
      const getData = ReactTestRenderer.create(
        <ServiceProvider services={{ testService }}>
          <GetData
            service="testService"
            method="testMethod"
            args={[1,2]}
          >{renderStub}</GetData>
        </ServiceProvider>
      )

      expectPendingState(getData)

      setTimeout(() => {
        expect(renderStub.mock.calls[0][0]).toEqual({ testResult })
        expect(testService.testMethod.mock.calls[0]).toEqual([1, 2])
        done()
      }, 100)
    })
  })

  describe('when service method returns promise', () => {
    it('should rerender when this promise resolved', done => {
      const getData = ReactTestRenderer.create(
        <ServiceProvider services={{ testService }}>
          <GetData
            service="testService"
            method="asyncMethod"
            args={[1, 2]}
          >{renderStub}</GetData>
        </ServiceProvider>
      )

      expectPendingState(getData)

      setTimeout(() => {
        expect(renderStub.mock.calls[0][0]).toEqual({ testResult })
        expect(testService.asyncMethod.mock.calls[0]).toEqual([1, 2])
        done()
      }, 100)
    })
  })

  describe('when service method fulfilled with error', () => {
    it('should pass 2nd error arg to render children', done => {
      const getData = ReactTestRenderer.create(
        <ServiceProvider services={{ testService }}>
          <GetData
            service="testService"
            method="asyncError"
            args={[1, 2]}
          >{renderStub}</GetData>
        </ServiceProvider>
      )

      expectPendingState(getData)

      setTimeout(() => {
        expect(renderStub.mock.calls[0][0]).toEqual(undefined)
        expect(renderStub.mock.calls[0][1]).toEqual(testError)
        expect(testService.asyncError.mock.calls[0]).toEqual([1, 2])
        done()
      }, 100)
    })
  })

  describe('when `whilePending` prop is provided', () => {
    it('should render it as component while in pending state', () => {
      const getData = ReactTestRenderer.create(
        <ServiceProvider services={{ testService }}>
          <GetData
            whilePending={testPending}
          >{renderStub}</GetData>
        </ServiceProvider>
      )

      expectPendingState(getData, testPending)
    })
  })
})
