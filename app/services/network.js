import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  httpPreloader: service(),

  fetch(path, options) {
    const httpPreloader = this.get('httpPreloader');
    httpPreloader.increaseCounter(path);

    return fetch(path, options)
      .then(response => {
        httpPreloader.decreaseCounter(path);
        return response;
      });
  }
});
