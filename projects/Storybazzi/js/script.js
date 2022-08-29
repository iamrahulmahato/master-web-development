/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
  "use strict";

  // Preloader js
  $(window).on("load", function () {
    $(".preloader").fadeOut(100);
  });

  //  Search Form Open
  $("#searchOpen").on("click", function () {
    $(".search-wrapper").addClass("open");
    setTimeout(function () {
      $(".search-box").focus();
    }, 400);
  });
  $("#searchClose").on("click", function () {
    $(".search-wrapper").removeClass("open");
  });

  // navbar
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
  if ($(window).width() < 1024) {
    $(".navigation .has-dropdown").on("click", function (e) {
      $(this).children(".navbar-dropdown").toggle();
    });
  }

  // tab
  $(".tab-content")
    .find(".tab-pane")
    .each(function (idx, item) {
      var navTabs = $(this).closest(".code-tabs").find(".nav-tabs"),
        title = $(this).attr("title");
      navTabs.append(
        '<li class="control"><a class="button" href="#">' + title + "</a></li>"
      );
    });

  $(".code-tabs ul.nav-tabs").each(function () {
    $(this).find("li:first").addClass("active");
  });

  $(".code-tabs .tab-content").each(function () {
    $(this).find("div:first").addClass("active").show();
  });

  $(".nav-tabs a").click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest(".code-tabs"),
      tabPane = tabPanel.find(".tab-pane").eq(tabIndex);
    tabPanel.find(".active").removeClass("active");
    tab.addClass("active");
    tabPane.addClass("active");
  });

  // Accordions
  $(".collapse")
    .on("shown.bs.collapse", function () {
      $(this)
        .parent()
        .find(".ti-plus")
        .removeClass("ti-plus")
        .addClass("ti-minus");
    })
    .on("hidden.bs.collapse", function () {
      $(this)
        .parent()
        .find(".ti-minus")
        .removeClass("ti-minus")
        .addClass("ti-plus");
    });

  //easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      }
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  });

  // back to top button
  $("#scrollTop").click(function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
  });

  //post slider
  $(".post-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: true,
    prevArrow:
      "<button type='button' class='prevArrow'><i class='ti-angle-left'></i></button>",
    nextArrow:
      "<button type='button' class='nextArrow'><i class='ti-angle-right'></i></button>",
  });

  // JSAccordion/Collapse
  $.fn.collapsible = function () {
    var ns = {
      open: function (me, bypass) {
        // Open the target
        var conf = me[0].__collapsible;
        if (!conf) {
          return;
        }
        if (bypass !== true) {
          if (typeof conf.group === "string") {
            if (String(conf.allowMultiple).toLowerCase() !== "true") {
              window["collapsibleAnimations_" + conf.group] = 0;
              window["collapsibleGroup_" + conf.group] = $(
                '[data-group="' + conf.group + '"]'
              ).not(me);
              var group = window["collapsibleGroup_" + conf.group];
              group.each(function () {
                ns.close($(this));
              });
              ns.open(me, true);
              return;
            }
          }
        }
        me.trigger("before:open");
        me.attr("aria-expanded", true);
        conf.target.attr("aria-expanded", true);
        conf.expanded = true;
        me.trigger("open");
        if (conf.init !== true) {
          setTimeout(function () {
            conf.init = true;
            me.__collapsible = conf;
          }, conf.speed + 100);
        }
      },
      close: function (me) {
        // Close the target
        var conf = me[0].__collapsible;
        if (!conf) {
          return;
        }
        me.trigger("before:close");
        me.attr("aria-expanded", false);
        conf.target.attr("aria-expanded", false);
        conf.expanded = false;
        me.trigger("close");
        if (conf.init !== true) {
          setTimeout(function () {
            conf.init = true;
            me.__collapsible = conf;
          }, conf.speed + 100);
        }
      },
      toggle: function (me) {
        // Toggle the target open/close
        var conf = me[0].__collapsible;
        if (!conf) {
          return;
        }
        me.trigger("before:toggle");
        var active = String(me.attr("aria-expanded")).toLowerCase();
        active = active === "true" ? true : false;
        if (active === true) {
          ns.close(me);
        } else {
          ns.open(me);
        }
        me.trigger("toggle");
      },
      onClick: function (e) {
        // On click handler
        if (!e.target.__collapsible) {
          return;
        }
        if ($(e.target).is("a")) {
          e.preventDefault();
        }
        ns.toggle($(e.target));
      },
      onClose: function (e) {
        // On close handler
        if (!e.target.__collapsible) {
          return;
        }
        var me = e.target;
        var targ = me.__collapsible.target;
        targ.stop().slideUp(me.__collapsible.speed, function () {
          $(me).trigger("after:close");
          $(me).trigger("animation:complete", ["close"]);
          window["collapsibleAnimations_" + me.__collapsible.group] += 1;
          var count = window["collapsibleAnimations_" + me.__collapsible.group];
          var group = window["collapsibleGroup_" + me.__collapsible.group];
          if (!group) {
            return;
          }
          if (count >= group.length) {
            $('[data-group="' + me.__collapsible.group + '"]:focus').trigger(
              "animations:complete",
              ["close"]
            );
          }
        });
      },
      onOpen: function (e) {
        // On open handler
        if (!e.target.__collapsible) {
          return;
        }
        var me = e.target;
        var targ = me.__collapsible.target;
        targ.stop().slideDown(me.__collapsible.speed, function () {
          $(me).trigger("after:open");
          $(me).trigger("animation:complete", ["open"]);

          if (me.__collapsible.init === true) {
            if (
              String(me.__collapsible.allowMultiple).toLowerCase() === "true"
            ) {
              $(me).trigger("animations:complete", ["open"]);
            }
          }
        });
      },
    };

    if (typeof arguments[0] === "string") {
      // Public Methods
      switch (String(arguments[0]).toLowerCase()) {
        case "open":
        case "show":
          this.each(function () {
            ns.open($(this));
          });
          break;
        case "close":
        case "hide":
          this.each(function () {
            ns.close($(this));
          });
          break;
        case "toggle":
          this.each(function () {
            ns.toggle($(this));
          });
          break;
      }
      return this;
    } else {
      // Initialization
      // Event listeners
      this.on("click", ns.onClick);
      this.on("open", ns.onOpen);
      this.on("close", ns.onClose);
      var defaultConfig = $.extend(
        {
          allowMultiple: false,
          expanded: false,
          group: null,
          init: false,
          speed: 250,
          target: null,
          temp: {},
        },
        arguments[0]
      );

      // Constructor
      this.each(function (i) {
        // Default config
        var config = $.extend({}, defaultConfig);
        // update the config with data attributes
        var data = $(this).data();
        for (var prop in defaultConfig) {
          if (data[prop]) {
            config[prop] = data[prop];
          }
        }
        // If the element is an <a> tag -> use the href attribute
        if ($(this).is("a")) {
          config.target = $(this).attr("href") || config.target;
        }
        // Exit if no target specified
        if (!config.target || config.target === null) {
          return;
        }
        // Convert the target into a jQuery object
        config.target = $(config.target);
        // Set the expanded value
        config.expanded = $(this).attr("aria-expanded") || config.expanded;
        config.expanded =
          typeof config.expanded === "string"
            ? config.expanded.toLowerCase()
            : config.expanded;
        config.expanded = config.expanded === "true" ? true : config.expanded;
        // temp storage object
        config.temp = { animations: 0, group: null };
        // Initialize
        this.__collapsible = config;
        // Open/close any elements
        if (config.expanded === true) {
          ns.open($(this));
        } else {
          ns.close($(this));
        }
      });
      // Return the query
      return this;
    }
  };
  // Default initializer
  $('[data-toggle="collapse"]').collapsible();

  // Accordions
  $('[data-toggle="collapse"]').on("click", function () {
    if ($(this).attr("aria-expanded") === "true") {
      $(this).children(".ti-plus").removeClass("ti-plus").addClass("ti-minus");
    } else {
      $(this).children(".ti-minus").removeClass("ti-minus").addClass("ti-plus");
    }
  });
})(jQuery);
