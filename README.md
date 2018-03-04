# React get data ![GitHub license](https://img.shields.io/github/license/ychebotaev/react-get-data.svg) ![Npm version](https://img.shields.io/npm/v/react-get-data.svg)

A small react wrapper for fetching data from remote services.

Each service is a class:

```javascript
const services = {
  account: {
    async getAccount(accountId) {
      const { data } = await axios.get(`/accounts/${accountId}`)
      return data
    }
  }
}
```

## Full example:

```javascript
import { GetData, ServiceProvider } from 'react-get-data'

<ServiceProvider services={services}>
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
```

## Minimal example:

```javascript
import { GetData, ServiceProvider } from 'react-get-data'

<ServiceProvider services={services}>
  <GetData
    service="account"
    method="getAccount"
    args={['id0']}
  >{
    account => <DisplayAccount account={account} />
  }</GetData>
</ServiceProvider>
```

## GetData

Is a render-prop-enabled component which represents a call for a remote service.

It hooks on `componentWillMount` and call `service`'s member `method` with `args`, and renders `whilePending` while waiting response.

* Parameters:
* * `service` - Required, name of service to pick from context
* * `method` - Required, name of service's method to call
* * `args` - Optional, list of arguments of methods
* * `whilePending` - Optional, this component will be displayed while `GetData` waiting response from service

## ServiceProvider

Is a context provider for a dictionary of services.

* Parameters:
* * `services` - Required, dictionary of services
