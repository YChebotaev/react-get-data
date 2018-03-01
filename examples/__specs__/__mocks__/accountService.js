export const mockAccount = {
  foo: 'bar',
  baz: 'bak'
}

export const account = {
  getAccount(accountId) {
    return new Promise(
      resolve => setTimeout(resolve, 300, Object.assign({ id: accountId }, mockAccount))
    )
  }
}

export const brokenAccount = {
  getAccount(accountId) {
    return new Promise(
      (resolve, reject) => setTimeout(reject, 300, new Error('Broken account'))
    )
  }
}
