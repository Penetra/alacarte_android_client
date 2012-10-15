$('[data-role=page]').live('pageshow', function (event, ui) {
    $("[data-role=footer]").load("footer-simple.html", function(){
    $(this).navbar();
  });
});