import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import config from '../config/environment';

export default Controller.extend({
  queryParams: ['search', 'page'],
  search: '',
  page: 1,

  debounceTime: config.APP.flickr.searchDebounceTime,
  minSearchChars: config.APP.flickr.searchMinChars,

  totalPages: alias('model.totalPages'),

  hasResults: computed('model.{total,fromServer}', function () {
    return +this.get('model.total') > 0 && this.get('model.fromServer');
  }),

  hasNoResults: computed('model.{total,fromServer}', function () {
    return +this.get('model.total') === 0 && this.get('model.fromServer');
  }),

  searchTextTooShort: computed('search.length', function() {
    return this.get('search.length') < this.get('minSearchChars');
  }),

  previousPage: computed('page', function () {
    return this.get('page') > 1 ? this.get('page') - 1 : 1;
  }),

  nextPage: computed('page', 'totalPages', function () {
    const currentPage = this.get('page');
    const totalPages = this.get('totalPages');

    return currentPage + 1 <= totalPages ? currentPage + 1 : currentPage;
  }),

  actions: {
    onTypeAhead(value) {
      const search = value.trim();
      this.setProperties({
        page: 1,
        search
      });
    }
  }
});
