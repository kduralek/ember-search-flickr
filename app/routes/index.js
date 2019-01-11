import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Route.extend({
  network: service(),

  queryParams: {
    search: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  },

  async model(params) {
    if (params.search.length < config.APP.flickr.searchMinChars) {
      return {
        fromServer: false,
        totalPages: 0,
        total: 0,
        list: []
      };
    }

    const query = new URLSearchParams({
      method: 'flickr.photos.search',
      api_key: config.APP.flickr.apiKey,
      per_page: config.APP.flickr.perPage,
      format: 'json',
      nojsoncallback: 1,
      text: params.search,
      page: params.page,
      privacy_filter: 1,
      content_type: 1
    });

    const response = await this.get('network').fetch(`${config.APP.flickr.url}?${query.toString()}`);
    const jsonResponse = await response.json();

    const list = jsonResponse.photos.photo.map(item => {
      return {
        id: item.id,
        url: this.createThumbnailUrl(item),
        title: item.title
      };
    });

    return {
      fromServer: true,
      totalPages: jsonResponse.photos.pages,
      total: jsonResponse.photos.total,
      list
    };
  },

  createThumbnailUrl(flickrPhotoItem) {
    return `https://farm${flickrPhotoItem.farm}.staticflickr.com/${flickrPhotoItem.server}/${flickrPhotoItem.id}_${flickrPhotoItem.secret}_n.jpg`;
  }
});
