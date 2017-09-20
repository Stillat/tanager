$(function () {
    // Automatically add Zoom interaction
    $('article.content img').attr('data-action', 'zoom');
    
    // Make captions from Alt tags
    $('img.captioned').each(function() {
        var caption = $(this).attr('alt') || false;
        if (caption) {
            $(this).after('<p class="caption">' + caption + '</p>');
        }
    });

    hljs.initHighlightingOnLoad();
    

    // Auto focus on the giant search box
    var search = $('input.giant.search');
    search.focus().val(search.val());

});