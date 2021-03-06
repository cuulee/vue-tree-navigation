import { mount } from 'vue-test-utils';

import TreeNavigation from '../TreeNavigation';
import items from '../__mocks__/items.json';

describe('TreeNavigation ', () => {
  it('renders', () => {
    const wrapper = mount(TreeNavigation, {
      propsData: {
        items,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders item label as hyperlink when `href` field is defined', () => {
    const wrapper = mount(TreeNavigation, {
      propsData: {
        items: [{
          name: 'Item',
          href: "#",
        }],
      },
    });

    expect(wrapper.contains('a')).toBe(true);
  });

  it('does not render item label as hyperlink when `href` field is undefined', () => {
    const wrapper = mount(TreeNavigation, {
      propsData: {
        items: [{
          name: 'Item',
        }],
      },
    });

    expect(wrapper.contains('a')).toBe(false);
  });

  it('assigns `closed` class to lists with level deeper than `defaultOpenLevel`', () => {
    const wrapper = mount(TreeNavigation, {
      propsData: {
        items,
        defaultOpenLevel: 2,
      },
    });

    // level 3 list
    expect(wrapper.find('div > ul > ul > ul > ul').classes()).toContain('closed');

    // level 4 list
    expect(wrapper.find('div > ul > ul > ul > ul > ul').classes()).toContain('closed');
  });

  it('does not assign `closed` class to lists with level less than or equal to `defaultOpenLevel`', () => {
    const wrapper = mount(TreeNavigation, {
      propsData: {
        items,
        defaultOpenLevel: 2,
      },
    });

    // level 0 list
    expect(wrapper.find('div > ul').classes()).not.toContain('closed');

    // level 1 list
    expect(wrapper.find('div > ul > ul').classes()).not.toContain('closed');

    // level 2 list
    expect(wrapper.find('div > ul > ul').classes()).not.toContain('closed');
  });
});
