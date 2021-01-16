/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

  // multilingual redirection
  $('#nav > ul > li:first-child li a').on('click', (e) => {
    let langPref = e.target.getAttribute('href').split('/')[3]; // https://domain/lang/...
    if (!['zt', 'en'].includes(langPref)) langPref = 'zh';
    localStorage.setItem('langPref', langPref);
  })

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner'),
		$video = $('#banner > video').get(0);

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0
    &&  !$video) {

			$window.on('load', function() {

        $banner.scrollex({
          bottom:		$header.outerHeight(),
          terminate:	function() { $header.removeClass('alt'); },
          enter:		function() { $header.addClass('alt reveal'); },
          leave:		function() { $header.removeClass('alt'); }
        });

			});

		}

    // video scroll
    if ($video) {
      $video.onloadeddata = function() {
        $video.classList.remove('video-loading');
        let videoLength = $video.duration;
        let $doc = $(document);
        let stt = 3;
        if (/Version\/[0-9.]+ Safari/.test(navigator.userAgent)) stt = 1; // continuous scroll for Safari
        $window.scroll(function(e) {
          if ($doc.scrollTop() % stt != 0) return;
          let scrollpercent = $doc.scrollTop() / ($doc.height() - $window.height()) * 2;
          if (scrollpercent > 1) return;
          $video.currentTime = scrollpercent * videoLength;
        });
      };
    }

})(jQuery);
