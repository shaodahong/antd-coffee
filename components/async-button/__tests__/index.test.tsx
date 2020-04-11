import React from 'react'
import { mount } from 'enzyme'

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
})
