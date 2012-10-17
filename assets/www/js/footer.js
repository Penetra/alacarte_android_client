$('[data-role=page]').live('pageshow', function (event, ui) {
    $("[data-role=footer]").load("footer-menu.html", function(){
    $(this).navbar();
  });
});