import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['http-preloader'],
  classNameBindings: ['isShown:http-preloader_shown'],

  httpPreloader: service(),

  isShown: alias('httpPreloader.isActive')
});
