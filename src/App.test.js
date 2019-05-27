import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App from './App'
import Letter from './App'

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
  })
})

it('has 26 letters', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('Letter')).to.have.length(26)
})

it('should match its reference snapshot', () => {
  const onClick = sinon.spy()
  const wrapper = shallow(
    <Letter letter="a" feedback="hidden" index={0} onClick={onClick} usedLetter={[]} diasbled />
  )

  expect(wrapper).to.matchSnapshot()
})

it('should match its reference snapshot', () => {
  const wrapper = shallow(<App />)

  expect(wrapper).to.matchSnapshot()
})

describe('<Letter/>', () => {
  it('should trigger its `onClick` prop when clicked', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Letter letter="a" feedback="hidden" index={0} onClick={onClick} usedLetter={[]} diasbled />
    )

    wrapper.simulate('click')
    expect(onClick).to.have.been.calledWith(0)
  })
})
