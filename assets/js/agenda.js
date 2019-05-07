var nodes1 = Array.from(document.getElementsByClassName("timeline-badge"));
var nodes2 = Array.from(document.getElementsByClassName("timeline-panel"));
var nodes3 = Array.from(document.getElementsByClassName("timeline-panel-img"));
const nodes = nodes1.concat(nodes2, nodes3);

const cache = {
  viewport: {},
  rects: []
};
window.addEventListener("load", init);

function init() {
  recache();
  document.addEventListener("scroll", throttle(scrollCheck, 10));
  window.addEventListener("resize", debounce(recache, 50));
};

function recache() {
  cache.viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  nodes.forEach((node, i) => {
    cache.rects[i] = rect(node);
  });
  scrollCheck();
}

function scrollCheck() {
  const offset = getScrollOffset();
  const midline = cache.viewport.height * 0.5;
  cache.rects.forEach((rect, i) => {
    nodes[i].classList.toggle("active", rect.y - offset.y < midline);
  });
};

function getScrollOffset() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

function throttle(fn, limit, context) {
  let wait;
  return function() {
    context = context || this;
    if (!wait) {
      fn.apply(context, arguments);
      wait = true;
      return setTimeout(function() {
        wait = false;
      }, limit);
    }
  };
};

function debounce(fn, limit, u) {
  let e;
  return function() {
    const i = this;
    const o = arguments;
    const a = u && !e;
    clearTimeout(e),
      (e = setTimeout(function() {
        (e = null), u || fn.apply(i, o);
      }, limit)),
      a && fn.apply(i, o);
  };
}

function rect(e) {
  const o = getScrollOffset();
  const r = e.getBoundingClientRect();
  return {
    x: r.left + o.x,
    y: r.top + o.y
  };
};

//by Saym Ash//
$(window).on("load", function() {
  $(window).scroll(function() {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".timeline-panel").each(function() {
      var objectBottom = $(this).offset().top -200 + $(this).outerHeight();
      if (objectBottom < windowBottom) {
        if ($(this).css("opacity") == 0) {
          $(this).fadeTo(500, 1);
        }
      } else {
        if ($(this).css("opacity") == 1) {
          $(this).fadeTo(500, 0);
        }
      }
    });
  }).scroll();
});
//by Saym Ash//
