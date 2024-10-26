$.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function(location) {
    $('.state').html(location.state);
    $('.city').html(location.city);
  }
});


