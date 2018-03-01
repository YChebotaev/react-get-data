import PropTypes from 'prop-types'
import {
  getContext,
  withState,
  lifecycle,
  compose,
  branch,
  renderComponent,
  componentFromProp,
  defaultProps
} from 'recompose'
import { invokeService } from './lib/invokeService'
import property from 'lodash.property'
import { contextPropTypes } from './lib/contextPropTypes'

export const PendingState = () => 'pending'

export const enhance = compose(
  getContext(contextPropTypes),
  withState('data', 'setData'),
  withState('error', 'setError'),
  withState('pending', 'setPending', true),
  lifecycle({
    async componentWillMount() {
      try {
        const data = await invokeService(
          this.props.services,
          this.props.service,
          this.props.method,
          this.props.args
        )
        this.props.setData(data)
      } catch (error) {
        this.props.setError(error)
      } finally {
        this.props.setPending(false)
      }
    }
  }),
  defaultProps({
    whilePending: PendingState
  }),
  branch(
    property('pending'),
    renderComponent(
      componentFromProp('whilePending')
    )
  )
)

export const GetData = enhance(
  ({ children, data, error, pending }) => children(data, error)
)
