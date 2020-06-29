import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils' // shallowMount,
import FilterPanel from '@/components/FilterPanel.vue'
import CheckBoxRadioGroup from '@/components/base/CheckBoxRadioGroup.vue'
import state from '@/store/state'

console.log(state.characterPageFilters)
describe('FilterPanel.vue', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(FilterPanel, {
      propsData: {
        filters: state.characterPageFilters,
        callbackfn: () => {}
      }
    })
    expect(wrapper.findAllComponents(CheckBoxRadioGroup).length).to.be.equal(Object.keys(state.characterPageFilters).length)
  })
  it('child has correct data', () => {
    const wrapper = mount(FilterPanel, {
      propsData: {
        filters: state.characterPageFilters,
        callbackfn: () => {}
      }
    })
    // expert check correct legend
    // expert check correct input type
    // expert check correct checkbox length
    // expert check correct checkbox value
    expect(wrapper.findAllComponents(CheckBoxRadioGroup).length).to.be.equal(Object.keys(state.characterPageFilters).length)
  })
})
