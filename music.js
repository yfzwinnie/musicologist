const musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}

$('#getPlaylistBtn').click(function (event) {
  $('#playlist').empty();
  $.each(musicInfo, function(index, value) {
    $.get("https://itunes.apple.com/search?term=" + value + "&limit=3",
    function(data) {
      let trackArray = JSON.parse(data).results;
      $.each(trackArray, function(index, track) {
        $("#playlist").append($('<div class="col col-xs-12 col-md-6 col-lg-4">').append(
          $('<h2>').text(track.trackCensoredName),
          $('<div>').text("Artist: " + track.artistName),
          $('<div>').html('<a href="' + track.trackViewUrl +'"><img src="'+track.artworkUrl100+'" width=250 height=250></a>'),
          $('<div>').html('<a href="'+ track.previewUrl +'"><button class="btn btn-primary">Play Preview</button></a>'),
        ));
      })
    }
    )
  });
});
