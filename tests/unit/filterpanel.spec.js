// import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import FilterPanel from '@/components/FilterPanel.vue'

describe('FilterPanel.vue', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(FilterPanel, {
      propsData: {
        filters: {},
        callbackfn: () => {}
      }
    })
    console.log(wrapper.html())
    // expect(wrapper.text()).to.include(msg)
  })
})
