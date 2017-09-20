(function () {

    function throttle (method, waitTime) {
        var working = false;

        return function () {
            if (working) return;
            working = true;
            setTimeout(function () {
                method(); working = false;
            }, waitTime);
        };
    }

    var headerManager = {

        siteHeader: $('.site__header'),
        originalBodyPaddingTop: $('body').css('padding-top'),
        shrinkOn: $('[data-header-manager="calc-height"]').height() * 2,

        hideElements: function () {
            $('[data-header-manager="hide-scrolled"]').fadeOut(100);
        },

        showElements: function () {
            $('[data-header-manager="hide-scrolled"]').fadeIn(200);
        },

        addFixedClass: function () {
            this.siteHeader.addClass('navbar-fixed-top');
        },

        removeFixedClass: function () {
            this.siteHeader.removeClass('navbar-fixed-top');
        },

        getNavigationHeight: function () {
            return $('[data-header-manager="calc-height"]').height();
        },

        revertBodyPaddingTop: function () {
            $('body').css('padding-top', this.originalBodyPaddingTop);
        },

        adjustBodyPaddingTop: function () {
            $('body').css('padding-top', window.HeaderManager.getNavigationHeight());
        },

        adjustSiteHeader: function () {
            var offsetY = window.pageYOffset || document.documentElement.scrollTop;

            if (offsetY > headerManager.shrinkOn && $(headerManager.siteHeader).hasClass('navbar-fixed-top') == false) {
                window.HeaderManager.hideElements();
                window.HeaderManager.addFixedClass();
                window.HeaderManager.adjustBodyPaddingTop();
            } else {
                if (offsetY < headerManager.shrinkOn) {
                    window.HeaderManager.removeFixedClass();
                    window.HeaderManager.revertBodyPaddingTop();
                    window.HeaderManager.showElements();
                }
            }
        }

    };

    var footerManager = {
        adjustSiteFooter: function () {
            var footerHeight = $('[data-footer-manager="main-footer"]').height();
            $('.site__main-wrapper').css('margin-bottom', - (footerHeight + 40));
            $('[data-footer-manager="content-push"]').css('height', (footerHeight + 40));
        }
    };

    function adjustHeaderAndFooter() {
        throttle(headerManager.adjustSiteHeader(), 100);
        throttle(footerManager.adjustSiteFooter(), 250);
    }

    $(document).ready(function () {
        adjustHeaderAndFooter();
        $(window).on('scroll', adjustHeaderAndFooter);
        $(window).on('resize', adjustHeaderAndFooter);
    });

    window.HeaderManager = headerManager;
    window.FooterManager = footerManager;

})();