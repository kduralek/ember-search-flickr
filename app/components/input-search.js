import Component from '@ember/component';
import { debounce } from '@ember/runloop';
import { gt } from '@ember/object/computed';

export default Component.extend({
  classNames: ['input-search'],
  showClearButton: gt('query.length', 0),

  actions: {
    onValueChange(value) {
      debounce(this, this.onTypeAhead, value, this.get('debounceTime') | 0);
    },

    clear() {
      this.onTypeAhead('');
    }
  }
});
