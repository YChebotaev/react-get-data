import React from 'react'
import { ServiceProvider } from '../ServiceProvider'
import { GetData } from '../GetData'

export const GetAccountSpinner = () =>
  <div className="spinner" />

export const GetAccountError = ({ error }) =>
  <div className="error">{error.message}</div>

export const DisplayAccount = ({ account }) =>
  <div className="account" />

export const GetAccountExample = ({ account }) =>
  <ServiceProvider services={{ account }}>
    <GetData
      service="account"
      method="getAccount"
      args={['id0']}
      whilePending={GetAccountSpinner}
    >{(account, error) =>
        error
          ? <GetAccountError error={error} />
          : <DisplayAccount account={account} />
      }
    </GetData>
  </ServiceProvider>
