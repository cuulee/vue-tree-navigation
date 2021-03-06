import utils from './utils';

require('./assets/_base.scss');

const TreeNavigation = {
  name: 'vue-tree-navigation',

  data() {
    return {
      classes: ['tree-navigation'],
    };
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    defaultOpenLevel: {
      type: Number,
      default: 0,
    },
  },

  render(createElement) {
    const self = this;

    const level = 1;
    const tree = createElement('ul',
      utils.generateLevel(createElement,
                          self.items,
                          level,
                          self.defaultOpenLevel));

    const wrapper = createElement('div', {
      'class': self.classes,
    }, [
      tree,
    ]);

    return wrapper;
  },
};

export default TreeNavigation;
