(function () {
    if (typeof MeerkatReply !== 'undefined') {
        $.tmpl = function(str, obj) {
            do {
                var beforeReplace = str;
                str = str.replace(/{{([^}]+)}}/g, function(wholeMatch, key) {
                    var substitution = obj[$.trim(key)];
                    return (substitution === undefined ? wholeMatch : substitution);
                });
                var afterReplace = str !== beforeReplace;
            } while (afterReplace);
            return str;
        };
    
        function removeErrorClasses() {
            $.each($('[data-meerkat-form="comment-reply-form"]').find('.form-group'), function () {
                $(this).removeClass('has-error');
            });
            $('[data-validation-error]').text('');
        }
        MeerkatReply.canceled = function (replyingTo) {
            removeErrorClasses();
            $('[data-meerkat-form="comment-form"]').show();            
        };
        MeerkatReply.replyOpen = function(form) {
            removeErrorClasses();
            $('[data-meerkat-form="comment-form"]').hide();
            $(form).show().fadeIn();
        };
        MeerkatReply.submit = function (evt) {
            evt.preventDefault();
            var data = {};
            var commentData = $(this).serializeArray().map(function (x) {
                data[x.name] = x.value;
            });
            var replyForm = $(this);
            $.post(MeerkatReply.Endpoints.SubmitComment, data, function (e) {
                if (e.success) {
                    $(replyForm).fadeOut(150, function () {
                        replyForm.remove();
                    });
                    var template = $.tmpl($('#meerkat-comment-template').html(), e.submission);
                    console.log('created', template);
                    console.log('parent comment id', e.submission.parent_comment_id);
                    
                    $('[data-meerkat-comment="' + e.submission.parent_comment_id + '"].media-body').append(template).fadeIn();
                    $('[data-meerkat-form="comment-form"]').show();                    
                } else {
                }
            }).fail(function (xhr, status, error) {
                var errors = xhr.responseJSON.errors;
                $.each(errors, function (key, value) {
                    var inputElement = $(replyForm).find(':input[name="' + key + '"]');
                    
                    if (typeof inputElement !== 'undefined' && inputElement !== null && inputElement.length > 0) {
                        inputElement = inputElement[0];
                        $(inputElement).closest('.form-group').addClass('has-error');
                        $(inputElement).closest('.form-group').find('[data-validation-error]').text(value[0]);
                    }
                });
            });
        };
    }
})();