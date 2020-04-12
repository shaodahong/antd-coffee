import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import sleep from '../../../tests/sleep'
import AsyncButton from '..'

describe('AsyncButton', () => {
  it('AsyncButton onClick Loading correct', async () => {
    const onClickMock = jest.fn(() => sleep())

    const wrapper = mount(<AsyncButton onClick={onClickMock} />)

    expect(wrapper.find('Button').prop('loading')).toBe(false)

    wrapper.simulate('click')
    expect(wrapper.find('Button').prop('loading')).toBe(true)

    await sleep()
    wrapper.update()
    expect(onClickMock).toBeCalledTimes(1)
    expect(wrapper.find('Button').prop('loading')).toBe(false)
  })

  it('AsyncButton onClick Loading with error', (done) => {
    let wrapper: ReactWrapper
    const onClickMock = jest.fn(async () => {
      try {
        throw new Error('some')
      } catch (error) {
        expect(error).toEqual(new Error('some'))
        expect(onClickMock).toBeCalledTimes(1)
        expect(wrapper.find('Button').prop('loading')).toBe(false)

        done()
      }
    })

    wrapper = mount(<AsyncButton onClick={onClickMock} />)

    expect(wrapper.find('Button').prop('loading')).toBe(false)

    wrapper.find('Button').simulate('click')
    expect(wrapper.find('Button').prop('loading')).toBe(true)
  })
})
