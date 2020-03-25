jQuery($ => {
  (function () {
    /// on Init method

    contentTabs();
    ibg();

    $('.jsToggle').click(visibilityToggle);
    $('.jsScrollTop').click(scrollTop);
  }());

  function contentTabs() {
    ///* custom Tabs functionality */
    /* Function add tab functionality to HTML
     * add class "jsTab" to element which you want to see as a tab block
     * add attribute "data-tab-btn" to each button which change tab content
     * add attribute "data-tab-content" to each tab body element which you want to change when trigger a spesific tab
     * to match button and tab body, values of attributes "data-tab-btn" and "data-tab-content" must be the same
     */

    const btnActive = '_tab-btn-active',
      contentActive = '_tab-content-active';

    let tabs = $('.jsTab');
    let btns = tabs.find('button[data-tab-btn]');
    let contents = tabs.find('[data-tab-content]');

    btns.click(function () {
      if ($(this).hasClass(btnActive)) {
        return;
      }

      let dataCurrent = $(this).attr('data-tab-btn');

      btns.removeClass(btnActive);
      $(this).addClass(btnActive);

      contents.each((i, item) => {
        let it = $(item);
        it.removeClass(contentActive);
        it.addClass(it.attr('data-tab-content') === dataCurrent ? contentActive : '');
      });
    });

    // init basic active classes
    $(btns[0]).addClass(btnActive);
    $(contents[0]).addClass(contentActive);
  }


  function scrollTop(e) {
    ///* Animate scrollTo button */
    /* func works using basic HTML anchor trick, with tag "a" */
    e.preventDefault();

    const body = $('html, body');
    const target = $(this).attr('href');
    body.stop().animate({
      scrollTop: $(target)[0].offsetTop
    }, 400, 'swing');
  }


  function ibg() {
    ///* func makes background for the element by grabbing an image from tag img */
    /// by Yevhen Andrikanych

    $.each($('.ibg'), function (index, val) {
      if ($(this).find('img').length > 0) {
        $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
      }
    });
  }


  function visibilityToggle() {
    ///* visibility toggle in HTML */

    $(this).toggle().css({
      'display': 'none',
      'visibility': 'hidden'
    });
  }
}); // end $