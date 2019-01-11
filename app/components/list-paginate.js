import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  totalPages: null,
  previousPage: null,
  nextPage: null,
  page: null,

  previousPageDisabled: computed('page', function () {
    return this.get('page') - 1 <= 0;
  }),

  nextPageDisabled: computed('page', 'totalPages', function () {
    return this.get('page') >= this.get('totalPages');
  }),
});
