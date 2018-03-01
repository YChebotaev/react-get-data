import get from 'lodash.get'

export const invokeService = (services, serviceName, methodName, callArgs) => {
  const service = get(services, serviceName)
  const method = get(service, methodName)
  return typeof method === 'function' ? method(...callArgs) : undefined
}
