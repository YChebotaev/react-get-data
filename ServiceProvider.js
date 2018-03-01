import React from 'react'
import PropTypes from 'prop-types'
import { withContext } from 'recompose'
import { contextPropTypes } from './lib/contextPropTypes'

export const ServiceProvider =
  withContext(
    contextPropTypes,
    ({ services }) => ({ services })
  )
  (
    ({ children }) => children  
  )
