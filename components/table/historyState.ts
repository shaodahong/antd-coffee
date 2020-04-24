/* eslint-disable no-underscore-dangle */
import { mapValues, isPlainObject } from 'lodash'
import moment from 'moment'

const key = '_query'
const { history, location } = window

const handler = (values: any, isSet?: boolean): any => {
  return mapValues(values, (value) => {
    if (value && value._isAMomentObject) {
      return isSet
        ? {
            _isAMomentObject: true,
            value: value.format(),
          }
        : moment(value.value)
    }
    if (
      Array.isArray(value) &&
      value.length === 2 &&
      (value[0]._isAMomentObject || value[1]._isAMomentObject)
    ) {
      return [
        isSet
          ? {
              _isAMomentObject: true,
              value: value[0]?.format(),
            }
          : moment(value[0]?.value),
        isSet
          ? {
              _isAMomentObject: true,
              value: value[1]?.format(),
            }
          : moment(value[1]?.value),
      ]
    }

    if (isPlainObject(value)) {
      return handler(value, isSet)
    }
    return value
  })
}

export function getHistoryState() {
  const { state = {} } = history

  if (!state[key] || !isPlainObject(state[key])) {
    return {}
  }

  return handler(state[key])
}

export function setHistoryState(query: { [key: string]: any }) {
  if (!query || !isPlainObject(query)) {
    return
  }

  const { pathname, search } = location
  const { state } = history
  history.replaceState(
    {
      ...state,
      [key]: handler(query, true),
    },
    '',
    pathname + search
  )
}
