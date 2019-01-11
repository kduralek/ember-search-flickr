import Service from '@ember/service';
import { run } from '@ember/runloop';
import { gt } from '@ember/object/computed';

export default Service.extend({
  loadingCounter: 0,
  isActive: gt('loadingCounter', 0),

  increaseCounter() {
    run(() => {
      if (this.get('isDestroyed')) {
        return;
      }
      this.incrementProperty('loadingCounter');
    });
  },

  decreaseCounter() {
    if (this.get('loadingCounter') > 0) {
      run(() => {
        if (this.get('isDestroyed')) {
          return;
        }
        this.decrementProperty('loadingCounter');
      });
    }
  }
});
