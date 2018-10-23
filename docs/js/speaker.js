'use strict';

/** BUDDY BUILT **/

if ('undefined' === typeof self) var self = this;
if ('undefined' === typeof global) var global = self;
var $m = self.$m = self.$m || {};
if ('browser' != 'browser') {
  var $req = require;
  require = function buddyRequire (id) {
    if (!$m[id]) return $req(id);
    if ('function' == typeof $m[id]) $m[id]();
    return $m[id].exports;
  };
} else {
  if ('undefined' === typeof process) var process = {browser:true, env:{NODE_ENV:'development'}};
  self.require = self.require || function buddyRequire (id) {
    if ($m[id]) {
      if ('function' == typeof $m[id]) $m[id]();
      return $m[id].exports;
    }

    if ('development' == 'development') {
      console.warn('module ' + id + ' not found');
    }
  };
}
(function (global) {
  var babelHelpers = global.babelHelpers;
  if (!babelHelpers) babelHelpers = global.babelHelpers = {};

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  };
})(typeof global === "undefined" ? self : global);

(function () {
/*== node_modules/uuid/lib/bytesToUuid.js ==*/
$m['uuid/lib/bytesToUuid'] = { exports: {} };
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var uuidlibbytesToUuid__byteToHex = [];
for (var uuidlibbytesToUuid__i = 0; uuidlibbytesToUuid__i < 256; ++uuidlibbytesToUuid__i) {
  uuidlibbytesToUuid__byteToHex[uuidlibbytesToUuid__i] = (uuidlibbytesToUuid__i + 0x100).toString(16).substr(1);
}

function uuidlibbytesToUuid__bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = uuidlibbytesToUuid__byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

$m['uuid/lib/bytesToUuid'].exports = uuidlibbytesToUuid__bytesToUuid;
/*≠≠ node_modules/uuid/lib/bytesToUuid.js ≠≠*/


/*== node_modules/uuid/lib/rng-browser.js ==*/
$m['uuid/lib/rng-browser'] = { exports: {} };
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var uuidlibrngbrowser__getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);

if (uuidlibrngbrowser__getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var uuidlibrngbrowser__rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  $m['uuid/lib/rng-browser'].exports = function whatwgRNG() {
    uuidlibrngbrowser__getRandomValues(uuidlibrngbrowser__rnds8);
    return uuidlibrngbrowser__rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var uuidlibrngbrowser__rnds = new Array(16);

  $m['uuid/lib/rng-browser'].exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      uuidlibrngbrowser__rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return uuidlibrngbrowser__rnds;
  };
}
/*≠≠ node_modules/uuid/lib/rng-browser.js ≠≠*/


/*== src/js/menu_button.js ==*/
$m['src/js/menu_button'] = { exports: {} };
$m['src/js/menu_button'].exports.__esModule = true;
$m['src/js/menu_button'].exports.default = srcjsmenubutton__registerMenuToggler;
function srcjsmenubutton__registerMenuToggler() {
    var menuToggler = document.getElementById('menuToggler');
    var nav = document.getElementsByClassName('c-navigation')[0];
    var toggle = function toggle(e) {
        menuToggler.classList.toggle('show--menu');
        nav.classList.toggle('show--menu');
    };
    menuToggler.onclick = toggle;
    var anchors = nav.getElementsByTagName('a');
    for (var _iterator = anchors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var a = _ref;

        a.onclick = toggle;
    }
}
/*≠≠ src/js/menu_button.js ≠≠*/


/*== src/js/logo.js ==*/
$m['src/js/logo'] = { exports: {} };
$m['src/js/logo'].exports.__esModule = true;
$m['src/js/logo'].exports.default = srcjslogo__registerLogoScrollListener;

var srcjslogo__logo = document.getElementById('tdclogo');
var srcjslogo__name = document.getElementById('name');

function srcjslogo__toggleLogoInMenu() {
    var nameVisible = srcjslogo__isElementInViewport(srcjslogo__name);

    if (nameVisible) {
        srcjslogo__logo.classList.remove('c-header__logo--in-menu');
    } else {
        srcjslogo__logo.classList.add('c-header__logo--in-menu');
    }
}

function srcjslogo__isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function srcjslogo__registerLogoScrollListener() {
    var ticking = false;
    window.addEventListener('scroll', function (e) {
        if (!ticking) {

            window.requestAnimationFrame(function () {
                srcjslogo__toggleLogoInMenu();
                ticking = false;
            });

            ticking = true;
        }
    });
}
/*≠≠ src/js/logo.js ≠≠*/


/*== node_modules/uuid/v4.js ==*/
$m['uuid/v4'] = { exports: {} };
var uuidv4__rng = $m['uuid/lib/rng-browser'].exports;
var uuidv4__bytesToUuid = $m['uuid/lib/bytesToUuid'].exports;

function uuidv4__v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || uuidv4__rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || uuidv4__bytesToUuid(rnds);
}

$m['uuid/v4'].exports = uuidv4__v4;
/*≠≠ node_modules/uuid/v4.js ≠≠*/


/*== node_modules/uuid/v1.js ==*/
$m['uuid/v1'] = { exports: {} };
var uuidv1__rng = $m['uuid/lib/rng-browser'].exports;
var uuidv1__bytesToUuid = $m['uuid/lib/bytesToUuid'].exports;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var uuidv1___nodeId;
var uuidv1___clockseq;

// Previous uuid creation time
var uuidv1___lastMSecs = 0;
var uuidv1___lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function uuidv1__v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || uuidv1___nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : uuidv1___clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = uuidv1__rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = uuidv1___nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = uuidv1___clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : uuidv1___lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = msecs - uuidv1___lastMSecs + (nsecs - uuidv1___lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > uuidv1___lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  uuidv1___lastMSecs = msecs;
  uuidv1___lastNSecs = nsecs;
  uuidv1___clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : uuidv1__bytesToUuid(b);
}

$m['uuid/v1'].exports = uuidv1__v1;
/*≠≠ node_modules/uuid/v1.js ≠≠*/


/*== node_modules/uuid/index.js ==*/
$m['uuid'] = { exports: {} };
var uuid__v1 = $m['uuid/v1'].exports;
var uuid__v4 = $m['uuid/v4'].exports;

var uuid__uuid = uuid__v4;
uuid__uuid.v1 = uuid__v1;
uuid__uuid.v4 = uuid__v4;

$m['uuid'].exports = uuid__uuid;
/*≠≠ node_modules/uuid/index.js ≠≠*/


/*== src/js/ga.js ==*/
$m['src/js/ga'] = { exports: {} };
$m['src/js/ga'].exports.__esModule = true;
$m['src/js/ga'].exports.default = srcjsga__installAnalytics;

var srcjsga___uuid = $m['uuid'].exports;

var srcjsga___uuid2 = babelHelpers.interopRequireDefault(srcjsga___uuid);
function srcjsga__installAnalytics() {
    try {
        var hash = location.hash;
        if (hash.length > 2 && hash.indexOf('clientid=') !== -1) {
            var clientId = hash.substring(hash.indexOf('clientid=') + 'clientid='.length, hash.indexOf('&favs'));
            console.log('Got clientid ' + clientId + ' from hash');
            localStorage.setItem('tdc-client-uuid', clientId);
        }
        (function (b, o, i, l, e, r) {
            b.GoogleAnalyticsObject = l;b[l] || (b[l] = function () {
                (b[l].q = b[l].q || []).push(arguments);
            });b[l].l = +new Date();
            e = o.createElement(i);r = o.getElementsByTagName(i)[0];
            e.src = '//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e, r);
        })(window, document, 'script', 'ga');
        ga(function (tracker) {
            var clientId = tracker.get('clientId');
            console.log('Got GA id ' + clientId);
            localStorage.setItem('tdc-client-uuid', clientId);
        });
        ga('set', 'anonymizeIp', true);
        if (localStorage) {
            var clientuuid = localStorage.getItem('tdc-client-uuid');
            if (!clientuuid) {
                clientuuid = srcjsga___uuid2.default.v4();
                console.log('Creating client id ' + clientuuid);
                localStorage.setItem('tdc-client-uuid', clientuuid);
            }

            ga('create', 'UA-98174789-3', {
                'storage': 'none',
                'storeGac': false,
                'clientId': clientuuid
            });
        } else {
            ga('create', 'UA-98174789-1', 'auto');
        }
        ga('send', 'pageview');
    } catch (e) {
        console.error(e);
    }
};
/*≠≠ src/js/ga.js ≠≠*/


/*== src/js/speaker.js ==*/
$m['src/js/speaker'] = { exports: {} };
var srcjsspeaker___logo = $m['src/js/logo'].exports;

var srcjsspeaker___logo2 = babelHelpers.interopRequireDefault(srcjsspeaker___logo);

var srcjsspeaker___menu_button = $m['src/js/menu_button'].exports;

var srcjsspeaker___menu_button2 = babelHelpers.interopRequireDefault(srcjsspeaker___menu_button);

var srcjsspeaker___ga = $m['src/js/ga'].exports;

var srcjsspeaker___ga2 = babelHelpers.interopRequireDefault(srcjsspeaker___ga);


//installAnalytics();

(0, srcjsspeaker___logo2.default)();
(0, srcjsspeaker___menu_button2.default)();
/*≠≠ src/js/speaker.js ≠≠*/
})()


//# sourceMappingURL=speaker.js.map