/**
 * Created by danguyen on 3/20/15.
 */

(function($){
    $(document).ready(function() {
        if ($('#header-navbar').length) {
            initHeader();
        }

        if ($('#feedback').length) {
            initFooter();
        }

        if ($('#sticky-top-bar').length) {
            initStickyTopBar();
        }

        if ($('#category-carousel').length) {
            initCategoryCarousel();
        }
    });

    function initCategoryCarousel() {
        $('#category-carousel .owl-carousel').owlCarousel({
            autoWidth: true,
            center: true,
            //dots: true,
            nav: true,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            loop: true
        });
        $('#category-carousel .container').toggleClass('hide');
    }

    function initStickyTopBar() {
        var stickyTopBarShown = false;
        var stickyTopBarAdjusted = false;
        var stickyTopBarHeight = 78;
        var topAdHeight = 90;
        var headerHeight = $('#header-navbar').height();
        var topBarHeight = $('#top-bar').height();
        var mastheadHeight = $('#masthead').height();
        var headlineHeight = $('#headline').height();
        var totalHeight = stickyTopBarHeight + topAdHeight + headerHeight + topBarHeight + mastheadHeight + headlineHeight;
        var scrollTop = $(this).scrollTop();

        if (!stickyTopBarShown && scrollTop > totalHeight) {
            stickyTopBarShown = true;
            toggleStickyBar(stickyTopBarShown);
        }

        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            if (!stickyTopBarShown && scrollTop > totalHeight) {
                stickyTopBarShown = true;
                toggleStickyBar(stickyTopBarShown);

            } else if (stickyTopBarShown && scrollTop <= (totalHeight - headlineHeight)) {
                stickyTopBarShown = false;
                toggleStickyBar(stickyTopBarShown);
            }
        });

        function toggleStickyBar(shown) {
            $('#sticky-top-bar').toggleClass('shown');
            $('#primary.single .sharedaddy').toggleClass('hide');

            if (shown && !stickyTopBarAdjusted) {
                setTimeout(function() {
                    // adjust the share email form
                    $('#sticky-top-bar .share-email').click(function() {
                        var curLeft = $('#sharing_email').css('left');

                        $('#sharing_email').css({
                            'left': (parseInt(curLeft) - $('#sharing_email').width()) + 'px',
                            'z-index': '999999999'
                        });

                        stickyTopBarAdjusted = true;
                    });
                })
            }
        }
    }

    function initHeader() {
        var isMenuOpen = false;

        var init = function () {
            $('#header-menu-btn').click( menuBtnClicked );
            $("#header-nav-overlay").click( navOverlayClicked );

            // popover for move network links
            $('#header-navbar .move-network-links').popover( {
                html : true,
                trigger: 'click',
                clickAutoClose: true,
                content: function() {
                    return $('#move-network-popover').html();
                }
            });

            detectWindowSize();


            $('body').on('click', function (e) {
                $('[data-toggle="popover"],[rel="popover"]').each(function () {
                    //the 'is' for buttons that trigger popups
                    //the 'has' for icons within a button that triggers a popup
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                        $(this).popover('hide');
                    }
                });
            });

            $('#header-navbar .dropdown').mouseover( function(){
                $('#header-navbar .move-network-links').popover('hide');
            });
        };

        //custom bootstrap drawer menu (accounted for fixed top menus too)
        //flag if menu is open
        //clicking on button will open menu
        var menuBtnClicked = function () {
            if (!isMenuOpen) {
                $("#header-navbar .nav-menu-mobile").clearQueue().animate({left: "0px"});
                $("#header-nav-overlay").fadeIn(300);
                $("#header-navbar .navbar-fixed-top").css("z-index", "auto");
                isMenuOpen = true;
            }
        };

        //clicking on overlay will close menu
        var navOverlayClicked = function () {
            if (isMenuOpen) {
                $("#header-navbar .nav-menu-mobile").clearQueue().animate({left: "-300px"});
                $("#header-nav-overlay").fadeOut(300);
                $("#header-navbar .navbar-fixed-top").css("z-index", "1030");
                isMenuOpen = false;
            }
        };

        var detectWindowSize = function () {
            var navMenu = $("#header-nav-menu");
            //detect window width on page load
            var current_width = $(window).width();
            if(current_width < 996){
                // flag if its mobile or desktop nav menu
                navMenu.addClass("nav-menu-mobile").removeClass("nav-menu-desktop");
                // remove dropdown on hover for mobile
                $("#header-navbar .dropdown-menu").removeClass("dropdown-hover");
                // switch data-toggle for dropdown - from link to arrow box
                $("#header-navbar .dropdown-toggle-desktop").removeAttr("data-toggle");
                $("#header-navbar .dropdown-toggle-mobile").attr("data-toggle", "dropdown");
            } else {
                navOverlayClicked();

                $('#header-navbar .dropdown').removeClass("open");
                // flag if its mobile or desktop nav menu
                navMenu.removeClass("nav-menu-mobile").addClass("nav-menu-desktop");
                // add dropdown on hover for desktop
                $("#header-navbar .dropdown-menu").addClass("dropdown-hover");
                // switch data-toggle for dropdown - from arrow box to link
                $("#header-navbar .dropdown-toggle-mobile").removeAttr("data-toggle");
                $("#header-navbar .dropdown-toggle-desktop").attr("data-toggle", "dropdown");
            }
        };

        //update window width value when the browser is resized
        $(window).resize(function(){
            detectWindowSize();
        });

        init();
    }

    function initFooter() {
        var $this,
            objFeedback,
            isQualtricsloaded = false;

        var init = function () {
            $this = $("#footer");
            initPopover();
            $('#feedback').hover(feedbackHover);
        };


        // General popover javascript for HTML content popovers
        // Created for footer product/partner links
        var initPopover = function() {
            $this.find('[rel="popover"]').popover({
                container: 'body',
                html: true,
                trigger: 'click',
                clickAutoClose: true,
                content: function () {
                    var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
                    return clone;
                }
            }).click(function(e) {
                e.preventDefault();
            });
        };


        // Qualtrics js behavoir binding.
        // Feedback button's on click event, which will be customized to always load a customer feedback (around 1 second after click). The example below is provided by Qualtrics
        var feedbackHover = function () {
            if (!isQualtricsloaded) {
                objFeedback = (function() {
                    return {
                        showQualFeedBack :(function () {
                            var id = 'ZN_b3kL3gqdYMsP84Q', c = 'ZN_b3kL3gqdYMsP84Q_container';
                            var o = document.getElementById(c);
                            var div;
                            if (o) {
                                o.innerHTML = '';
                                div = o;
                            } else {
                                div = document.createElement('div');
                                div.id = c;
                            }
                            var qualtric = document.createElement('script'); qualtric.type = 'text/javascript';
                            qualtric.src = 'http://siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_ZID=ZN_b3kL3gqdYMsP84Q&Q_LOC=' + encodeURIComponent(window.location.href) + '&Q_SIPREVIEW=TRUE';
                            if (document.body) {
                                document.body.appendChild(qualtric);
                                document.body.appendChild(div);
                            }
                        })
                    };
                })();
                isQualtricsloaded = true;
            }
        };

        $('body').delegate('#feedback:not(.unclickable)', 'click', function () {
            var feedBackLink = $(this);
            feedBackLink.addClass("unclickable");
            objFeedback.showQualFeedBack();
            setTimeout(function () {
                feedBackLink.removeClass("unclickable");
            }, 3000);
            return false;
        });

        init();
    }
})(jQuery);
