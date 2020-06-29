import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils' // shallowMount,
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper.find('h1').text()).to.be.equal('Vuejs training assignment')
  })
})
