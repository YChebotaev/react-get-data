import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import { account, brokenAccount } from './__mocks__/accountService'
import { GetAccountExample } from '../GetAccountExample'

describe('<GetAccountExample>', () => {
  it('should render spinner', () => {
    const getAccountExample = ReactTestRenderer.create(
      <GetAccountExample account={account} />
    )
    expect(getAccountExample.toJSON()).toMatchSnapshot()
  })

  it('should display account', done => {
    const getAccountExample = ReactTestRenderer.create(
      <GetAccountExample account={account} />
    )
    setTimeout(() => {
      expect(getAccountExample.toJSON()).toMatchSnapshot()
      done()
    }, 600)
  })

  it('should display error', done => {
    const getAccountExample = ReactTestRenderer.create(
      <GetAccountExample account={brokenAccount} />
    )
    setTimeout(() => {
      expect(getAccountExample.toJSON()).toMatchSnapshot()
      done()
    }, 600)
  })
})
