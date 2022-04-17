/*
 * This file is part of EC-CUBE
 *
 * Copyright(c) EC-CUBE CO.,LTD. All Rights Reserved.
 *
 * http://www.ec-cube.co.jp/
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

$(function() {

    $('.pagetop').hide();

    $(window).on('scroll', function() {
        // 繝壹?繧ｸ繝医ャ繝励ヵ繧ｧ繝ｼ繝峨う繝ｳ
        if ($(this).scrollTop() > 300) {
            $('.pagetop').fadeIn();
        } else {
            $('.pagetop').fadeOut();
        }

        // PC陦ｨ遉ｺ縺ｮ譎ゅ?縺ｿ縺ｫ驕ｩ逕ｨ
        if (window.innerWidth > 767) {

            if ($('.ec-orderRole').length) {

                var side = $(".ec-orderRole__summary"),
                    wrap = $(".ec-orderRole").first(),
                    min_move = wrap.offset().top,
                    max_move = wrap.height(),
                    margin_bottom = max_move - min_move;

                var scrollTop = $(window).scrollTop();
                if (scrollTop > min_move && scrollTop < max_move) {
                    var margin_top = scrollTop - min_move;
                    side.css({"margin-top": margin_top});
                } else if (scrollTop < min_move) {
                    side.css({"margin-top": 0});
                } else if (scrollTop > max_move) {
                    side.css({"margin-top": margin_bottom});
                }

            }
        }
        return false;
    });


    $('.ec-headerNavSP').on('click', function() {
        $('.ec-layoutRole').toggleClass('is_active');
        $('.ec-drawerRole').toggleClass('is_active');
        $('.ec-drawerRoleClose').toggleClass('is_active');
        $('body').toggleClass('have_curtain');
    });

    $('.ec-overlayRole').on('click', function() {
        $('body').removeClass('have_curtain');
        $('.ec-layoutRole').removeClass('is_active');
        $('.ec-drawerRole').removeClass('is_active');
        $('.ec-drawerRoleClose').removeClass('is_active');
    });

    $('.ec-drawerRoleClose').on('click', function() {
        $('body').removeClass('have_curtain');
        $('.ec-layoutRole').removeClass('is_active');
        $('.ec-drawerRole').removeClass('is_active');
        $('.ec-drawerRoleClose').removeClass('is_active');
    });

    // TODO: 繧ｫ繝ｼ繝亥ｱ暮幕譎ゅ?繧｢繧､繧ｳ繝ｳ螟画峩蜃ｦ逅?
    $('.ec-headerRole__cart').on('click', '.ec-cartNavi', function() {
        // $('.ec-cartNavi').toggleClass('is-active');
        $('.ec-cartNaviIsset').toggleClass('is-active');
        $('.ec-cartNaviNull').toggleClass('is-active')
    });

    $('.ec-headerRole__cart').on('click', '.ec-cartNavi--cancel', function() {
        // $('.ec-cartNavi').toggleClass('is-active');
        $('.ec-cartNaviIsset').toggleClass('is-active');
        $('.ec-cartNaviNull').toggleClass('is-active')
    });

    $('.ec-orderMail__link').on('click', function() {
        $(this).siblings('.ec-orderMail__body').slideToggle();
    });

    $('.ec-orderMail__close').on('click', function() {
        $(this).parent().slideToggle();
    });

    $('.is_inDrawer').each(function() {
        var html = $(this).html();
        $(html).appendTo('.ec-drawerRole');
    });

    $('.ec-blockTopBtn').on('click', function() {
        $('html,body').animate({'scrollTop': 0}, 500);
    });

    // 繧ｹ繝槭?縺ｮ繝峨Ο繝ｯ繝ｼ繝｡繝九Η繝ｼ蜀??荳句ｱ､繧ｫ繝?ざ繝ｪ陦ｨ遉ｺ
    // TODO FIXME 繧ｹ繝槭?縺ｮ繧ｫ繝?ざ繝ｪ陦ｨ遉ｺ譁ｹ豕?
    $('.ec-itemNav ul a').click(function() {
        var child = $(this).siblings();
        if (child.length > 0) {
            if (child.is(':visible')) {
                return true;
            } else {
                child.slideToggle();
                return false;
            }
        }
    });

    // 繧､繝吶Φ繝亥ｮ溯｡梧凾縺ｮ繧ｪ繝ｼ繝舌?繝ｬ繧､蜃ｦ逅?
    // class縺ｫ縲畦oad-overlay縲阪′險倩ｿｰ縺輔ｌ縺ｦ縺?ｋ縺ｨ逕ｻ髱｢縺後が繝ｼ繝舌?繝ｬ繧､縺輔ｌ繧?
    $('.load-overlay').on({
        click: function() {
            loadingOverlay();
        },
        change: function() {
            loadingOverlay();
        }
    });

    // submit蜃ｦ逅?↓縺､縺?※縺ｯ繧ｪ繝ｼ繝舌?繝ｬ繧､蜃ｦ逅?ｒ陦後≧
    $(document).on('click', 'input[type="submit"], button[type="submit"]', function() {

        // html5 validate蟇ｾ蠢?
        var valid = true;
        var form = getAncestorOfTagType(this, 'FORM');

        if (typeof form !== 'undefined' && !form.hasAttribute('novalidate')) {
            // form validation
            if (typeof form.checkValidity === 'function') {
                valid = form.checkValidity();
            }
        }

        if (valid) {
            loadingOverlay();
        }
    });
});

$(window).on('pageshow', function() {
    loadingOverlay('hide');
});

/**
 * 繧ｪ繝ｼ繝舌?繝ｬ繧､蜃ｦ逅?ｒ陦後≧髢｢謨ｰ
 */
function loadingOverlay(action) {

    if (action == 'hide') {
        $('.bg-load-overlay').remove();
    } else {
        $overlay = $('<div class="bg-load-overlay">');
        $('body').append($overlay);
    }
}

/**
 *  隕∫ｴ?FORM繝√ぉ繝?け
 */
function getAncestorOfTagType(elem, type) {

    while (elem.parentNode && elem.tagName !== type) {
        elem = elem.parentNode;
    }

    return (type === elem.tagName) ? elem : undefined;
}

// anchor繧偵け繝ｪ繝?け縺励◆譎ゅ↓form繧定｣上〒菴懊▲縺ｦ謖?ｮ壹?繝｡繧ｽ繝?ラ縺ｧ繝ｪ繧ｯ繧ｨ繧ｹ繝医ｒ鬟帙?縺?
// Twig縺ｫ縺ｯ莉･荳九?繧医≧縺ｫ蝓九ａ霎ｼ繧
// <a href="PATH" {{ csrf_token_for_anchor() }} data-method="(put/delete/post縺ｮ縺?■縺?★繧後°)" data-confirm="xxxx" data-message="xxxx">
//
// 繧ｪ繝励す繝ｧ繝ｳ隕∫ｴ?
// data-confirm : false繧貞ｮ夂ｾｩ縺吶ｋ縺ｨ遒ｺ隱阪ム繧､繧｢繝ｭ繧ｰ繧貞?縺輔↑縺?ゅョ繝輔か繝ｫ繝医?繝繧､繧｢繝ｭ繧ｰ繧貞?縺?
// data-message : 遒ｺ隱阪ム繧､繧｢繝ｭ繧ｰ繧貞?縺咎圀縺ｮ繝｡繝?そ繝ｼ繧ｸ繧偵ョ繝輔か繝ｫ繝医°繧牙､画峩縺吶ｋ
//
$(function() {
    var createForm = function(action, data) {
        var $form = $('<form action="' + action + '" method="post"></form>');
        for (input in data) {
            if (data.hasOwnProperty(input)) {
                $form.append('<input name="' + input + '" value="' + data[input] + '">');
            }
        }
        return $form;
    };

    $('a[token-for-anchor]').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        var data = $this.data();
        if (data.confirm != false) {
            if (!confirm(data.message ? data.message : eccube_lang['common.delete_confirm'] )) {
                return false;
            }
        }

        // 蜑企勁譎ゅ?繧ｪ繝ｼ繝舌?繝ｬ繧､蜃ｦ逅?ｒ蜈･繧後ｋ
        loadingOverlay();

        var $form = createForm($this.attr('href'), {
            _token: $this.attr('token-for-anchor'),
            _method: data.method
        }).hide();

        $('body').append($form); // Firefox requires form to be on the page to allow submission
        $form.submit();
    });
});