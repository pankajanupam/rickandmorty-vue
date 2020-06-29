import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils' // shallowMount,
import Tags from '@/components/base/Tags.vue'

describe('Tags.vue', () => {
  const wrapper = shallowMount(Tags, {
    propsData: {
      data: { gender: ['Male'] }
    }
  })
  it('should render correctly', () => {
    expect(wrapper.find('.tags').exists()).to.be.equal(true)
  })
  it('has correct tags', () => {
    wrapper.setProps({ data: { gender: ['Male', 'Female'] } })
    console.log(wrapper.html(), wrapper.find('.tags').text(), 'text')
    // expect(wrapper.text()).to.be.equal(true)
  })
})
