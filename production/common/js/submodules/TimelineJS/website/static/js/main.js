$(document).ready(function() {
  // Navbar scrollTo
  $(".navbar .nav a, [data-scroll='true']").click(function (e) {
    var $target = $(this)
      , href = $target.attr("href")
      , hash = href.substring(href.lastIndexOf('/') + 1)
      , $destination = $(hash)
      , offset = $(".navbar").height() || 0
      , scrollTop = $destination.offset().top - 30;

    $("body,html").animate({scrollTop: scrollTop}, 350);

    return false;
  });

  // More Options
  $(".show-options").click(function (e) {
    $(this).hide();

    $(".more-options").slideDown();

    return false;
  });

  // Preview
  $("#iframe-preview-button").click(function () {
    var $embed = $("#preview");

    $embed.show();
    $("body,html").animate({scrollTop: $embed.offset().top - 60}, 250);
  });

  // Embed Generator
  updateEmbedCode();
  $("#embed_code").click(function() { $(this).select(); });
  $('#embed-width').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-wordpressplugin').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-font').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-height').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-maptype').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-googlemapkey').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-source-url').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-language').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-startatend').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-hashbookmark').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-startatslide').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-startzoomadjust').change(function(evt) { updateEmbedCode(evt); });
  $('#embed-debug').change(function(evt) { updateEmbedCode(evt); });
});
