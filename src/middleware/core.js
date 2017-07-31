import $ from 'jquery'

export function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}

export function load(query, resHandler, errHandler) {
    $.ajax({
      url: 'https://api.nestoria.co.uk/api?' + query,
      dataType: 'jsonp',
      cache: false,
      type: 'GET',
      timeout: 5000,
      success: function (data) {
        resHandler(data);
      }.bind(this),
      error: function (err) {
        errHandler(err);
      }.bind(this)
    });
  }