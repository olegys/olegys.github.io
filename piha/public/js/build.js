/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _feedback = __webpack_require__(2);

	var _feedback2 = _interopRequireDefault(_feedback);

	__webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(5);

	new _vue2.default({
	  el: '#main',

	  components: {
	    Feedback: _feedback2.default
	  }
		});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue.js v2.0.8
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, (function () { 'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10);
	  return (n || n === 0) ? n : val
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  }
	}

	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100,

	  /**
	   * Server rendering?
	   */
	  _isServer: "client" === 'server'
	};

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]';

	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    timerFunc = function () {
	      p.then(nextTickHandler);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx); }
	      : cb;
	    callbacks.push(func);
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] !== undefined
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = 1;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	/* not type checking this file because flow doesn't play well with Proxy */

	var hasProxy;
	var proxyHandlers;
	var initProxy;

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  proxyHandlers = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warn(
	          "Property or method \"" + key + "\" is not defined on the instance but " +
	          "referenced during render. Make sure to declare reactive data " +
	          "properties in the data option.",
	          target
	        );
	      }
	      return has || !isAllowed
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      vm._renderProxy = new Proxy(vm, proxyHandlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */


	var uid$2 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$2++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*  */


	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index];
	    var id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }

	  resetSchedulerState();
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$1 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};

	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  this.deep = !!options.deep;
	  this.user = !!options.user;
	  this.lazy = !!options.lazy;
	  this.sync = !!options.sync;
	  this.expression = expOrFn.toString();
	  this.cb = cb;
	  this.id = ++uid$1; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          "development" !== 'production' && warn(
	            ("Error in watcher \"" + (this.expression) + "\""),
	            this.vm
	          );
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * istanbul ignore next
	 */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !config._isServer &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.length = Math.max(obj.length, key);
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	function initState (vm) {
	  vm._watchers = [];
	  initProps(vm);
	  initData(vm);
	  initComputed(vm);
	  initMethods(vm);
	  initWatch(vm);
	}

	var isReservedProp = makeMap('key,ref,slot');

	function initProps (vm) {
	  var props = vm.$options.props;
	  if (props) {
	    var propsData = vm.$options.propsData || {};
	    var keys = vm.$options._propKeys = Object.keys(props);
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot;
	    var loop = function ( i ) {
	      var key = keys[i];
	      /* istanbul ignore else */
	      {
	        if (isReservedProp(key)) {
	          warn(
	            ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	            vm
	          );
	        }
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            );
	          }
	        });
	      }
	    };

	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true;
	  }
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object.',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data);
	  data.__ob__ && data.__ob__.vmCount++;
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function initComputed (vm) {
	  var computed = vm.$options.computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	        computedSharedDefinition.set = noop;
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop;
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop;
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition);
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm) {
	  var methods = vm.$options.methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	      if ("development" !== 'production' && methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	    }
	  }
	}

	function initWatch (vm) {
	  var watch = vm.$options.watch;
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  ns,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = ns;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.child = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var emptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.ns,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}

	/*  */

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, fn, event, capture;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + name + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      capture = name.charAt(0) === '!';
	      event = capture ? name.slice(1) : name;
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), capture);
	      } else {
	        if (!cur.invoker) {
	          fn = cur;
	          cur = on[name] = {};
	          cur.fn = fn;
	          cur.invoker = fnInvoker(cur);
	        }
	        add(event, cur.invoker, capture);
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length;
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
	        on[name] = old;
	      } else {
	        old.fn = cur;
	        on[name] = old;
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = name.charAt(0) === '!' ? name.slice(1) : name;
	      remove$$1(event, oldOn[name].invoker);
	    }
	  }
	}

	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;

	    var single = arguments.length === 1;
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
	    }
	  }
	}

	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1;
	    single ? o.fn(ev) : o.fn.apply(null, arguments);
	  }
	}

	/*  */

	function normalizeChildren (
	  children,
	  ns,
	  nestedIndex
	) {
	  if (isPrimitive(children)) {
	    return [createTextVNode(children)]
	  }
	  if (Array.isArray(children)) {
	    var res = [];
	    for (var i = 0, l = children.length; i < l; i++) {
	      var c = children[i];
	      var last = res[res.length - 1];
	      //  nested
	      if (Array.isArray(c)) {
	        res.push.apply(res, normalizeChildren(c, ns, ((nestedIndex || '') + "_" + i)));
	      } else if (isPrimitive(c)) {
	        if (last && last.text) {
	          last.text += String(c);
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c));
	        }
	      } else if (c instanceof VNode) {
	        if (c.text && last && last.text) {
	          if (!last.isCloned) {
	            last.text += c.text;
	          }
	        } else {
	          // inherit parent namespace
	          if (ns) {
	            applyNS(c, ns);
	          }
	          // default key for nested array children (likely generated by v-for)
	          if (c.tag && c.key == null && nestedIndex != null) {
	            c.key = "__vlist" + nestedIndex + "_" + i + "__";
	          }
	          res.push(c);
	        }
	      }
	    }
	    return res
	  }
	}

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	function applyNS (vnode, ns) {
	  if (vnode.tag && !vnode.ns) {
	    vnode.ns = ns;
	    if (vnode.children) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        applyNS(vnode.children[i], ns);
	      }
	    }
	  }
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = emptyVNode;
	      {
	        /* istanbul ignore if */
	        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    var prevVnode = vm._vnode;
	    vm._vnode = vnode;
	    if (!prevVnode) {
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      vm.$el = vm.__patch__(vm.$el, vnode, hydrating);
	    } else {
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  };

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      {
	        observerState.isSettingProps = false;
	      }
	      vm.$options.propsData = propsData;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      vm._updateListeners(listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, vm._renderContext);
	      vm.$forceUpdate();
	    }
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  vm.$emit('hook:' + hook);
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // extract props
	  var propsData = extractProps(data, Ctor);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  var vnode = Ctor.options.render.call(
	    null,
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    bind$1(createElement, { _self: Object.create(context) }),
	    {
	      props: props,
	      data: data,
	      parent: context,
	      children: normalizeChildren(children),
	      slots: function () { return resolveSlots(children, context); }
	    }
	  );
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent // activeInstance in lifecycle state
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (vnode, hydrating) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(vnode, activeInstance);
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  } else if (vnode.data.keepAlive) {
	    // kept-alive components, treat as a patch
	    var mountedNode = vnode; // work around flow
	    prepatch(mountedNode, mountedNode);
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.child = oldVnode.child;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}

	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true;
	    callHook(vnode.child, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false;
	    callHook(vnode.child, 'activated');
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy();
	    } else {
	      vnode.child._inactive = true;
	      callHook(vnode.child, 'deactivated');
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (a, b) {
	  // since all hooks have at most two args, use fixed args
	  // to avoid having to use fn.apply().
	  return function (_, __) {
	    a(_, __);
	    b(_, __);
	  }
	}

	/*  */

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  tag,
	  data,
	  children
	) {
	  if (data && (Array.isArray(data) || typeof data !== 'object')) {
	    children = data;
	    data = undefined;
	  }
	  // make sure to use real instance instead of proxy as context
	  return _createElement(this._self, tag, data, children)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return emptyVNode()
	  }
	  if (typeof tag === 'string') {
	    var Ctor;
	    var ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      return createComponent(Ctor, data, context, children, tag)
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      var childNs = tag === 'foreignObject' ? 'xhtml' : ns;
	      return new VNode(
	        tag, data, normalizeChildren(children, childNs),
	        undefined, undefined, ns, context
	      )
	    }
	  } else {
	    // direct component options / constructor
	    return createComponent(tag, data, context, children)
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  vm._renderContext = vm.$options._parentVnode && vm.$options._parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, vm._renderContext);
	  // bind the public createElement fn to this instance
	  // so that we get proper render context inside it.
	  vm.$createElement = bind$1(createElement, vm);
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el);
	  }
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      {
	        warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	      }
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        if (config._isServer) {
	          throw e
	        } else {
	          console.error(e);
	        }
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = emptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // shorthands used in render functions
	  Vue.prototype._h = createElement;
	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = emptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  };

	  // mark node as static (v-once)
	  Vue.prototype._o = function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  };

	  function markStatic (tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }

	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }

	  // filter resolution helper
	  var identity = function (_) { return _; };
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val)) {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback
	  ) {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  };

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    tag,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        "development" !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var hash = asProp || config.mustUseProp(tag, key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };

	  // expose v-on keyCodes
	  Vue.prototype._k = function getKeyCodes (key) {
	    return config.keyCodes[key]
	  };
	}

	function resolveSlots (
	  renderChildren,
	  context
	) {
	  var slots = {};
	  if (!renderChildren) {
	    return slots
	  }
	  var children = normalizeChildren(renderChildren) || [];
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  var on = bind$1(vm.$on, vm);
	  var off = bind$1(vm.$off, vm);
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, on, off, vm);
	  };
	  if (listeners) {
	    vm._updateListeners(listeners);
	  }
	}

	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    initRender(vm);
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = Ctor.super.options;
	    var cachedSuperOptions = Ctor.superOptions;
	    var extendOptions = Ctor.extendOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed
	      Ctor.superOptions = superOptions;
	      extendOptions.render = options.render;
	      extendOptions.staticRenderFns = options.staticRenderFns;
	      options = Ctor.options = mergeOptions(superOptions, extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	var warn = noop;
	var formatComponentName;

	{
	  var hasConsole = typeof console !== 'undefined';

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  var res = assets[id] ||
	    // camelCase ID
	    assets[camelize(id)] ||
	    // Pascal Case ID
	    assets[capitalize(camelize(id))];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isBooleanType(prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    "development" !== 'production' && warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm[key] !== undefined) {
	    return vm[key]
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isBooleanType (fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === 'Boolean'
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === 'Boolean') {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characaters and the hyphen.'
	        );
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions;
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + '::' + opts.tag
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      var vnode = this$1.cache[key];
	      callHook(vnode.child, 'deactivated');
	      vnode.child.$destroy();
	    }
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: function () { return config._isServer; }
	});

	Vue$3.version = '2.0.8';

	/*  */

	// attributes that should be using props for binding
	var mustUseProp = function (tag, attr) {
	  return (
	    (attr === 'value' && (tag === 'input' || tag === 'textarea' || tag === 'option')) ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var isAttr = makeMap(
	  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
	  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
	  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
	  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
	  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
	  'form,formaction,headers,<th>,height,hidden,high,href,hreflang,http-equiv,' +
	  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
	  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
	  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
	  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
	  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
	  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
	  'target,title,type,usemap,value,width,wrap'
	);



	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.child) {
	    childNode = childNode.child._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML',
	  xhtml: 'http://www.w3.org/1999/xhtml'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function childNodes (node) {
	  return node.childNodes
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		childNodes: childNodes,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.child || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks$1 = ['create', 'update', 'remove', 'destroy'];

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  function createElm (vnode, insertedVnodeQueue, nested) {
	    var i;
	    var data = vnode.data;
	    vnode.isRootInsert = !nested;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode); }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(i = vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue);
	        return vnode.elm
	      }
	    }
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);
	      createChildren(vnode, children, insertedVnodeQueue);
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	    }
	    return vnode.elm
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        nodeOps.appendChild(vnode.elm, createElm(children[i], insertedVnodeQueue, true));
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.child.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeElement(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (elmToMove.tag !== newStartVnode.tag) {
	            // same key but different element. treat as new element
	            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        var childNodes = nodeOps.childNodes(elm);
	        // empty element, allow client to pick up and populate children
	        if (!childNodes.length) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          if (childNodes.length !== children.length) {
	            childrenMatch = false;
	          } else {
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
	                childrenMatch = false;
	                break
	              }
	            }
	          }
	          if (!childrenMatch) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === nodeOps.tagName(node).toLowerCase()
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var elm, parent;
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (!oldVnode) {
	      // empty mount, create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        elm = oldVnode.elm;
	        parent = nodeOps.parentNode(elm);

	        createElm(vnode, insertedVnodeQueue);

	        // component root element replaced.
	        // update parent placeholder node element.
	        if (vnode.parent) {
	          vnode.parent.elm = vnode.elm;
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (parent !== null) {
	          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm));
	          removeVnodes(parent, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (
	  oldVnode,
	  vnode
	) {
	  if (!oldVnode.data.directives && !vnode.data.directives) {
	    return
	  }
	  var isCreate = oldVnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      dirsWithInsert.forEach(function (dir) {
	        callHook$1(dir, 'inserted', vnode, oldVnode);
	      });
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      dirsWithPostpatch.forEach(function (dir) {
	        callHook$1(dir, 'componentUpdated', vnode, oldVnode);
	      });
	    }, 'dir-postpatch');
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	// skip type checking this file because we need to attach private properties
	// to elements

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  var add = vnode.elm._v_add || (vnode.elm._v_add = function (event, handler, capture) {
	    vnode.elm.addEventListener(event, handler, capture);
	  });
	  var remove = vnode.elm._v_remove || (vnode.elm._v_remove = function (event, handler) {
	    vnode.elm.removeEventListener(event, handler);
	  });
	  updateListeners(on, oldOn, add, remove, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (elm.value !== strCur && !elm.composing) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var hasBackground = cssText.indexOf('background') >= 0;
	  // maybe with background-image: url(http://xxx) or base64 img
	  var listDelimiter = hasBackground ? /;(?![^(]*\))/g : ';';
	  var propertyDelimiter = hasBackground ? /:(.+)/ : ':';
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.child) {
	      childNode = childNode.child._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var transitionNode = activeInstance.$vnode;
	  var context = transitionNode && transitionNode.parent
	    ? transitionNode.parent.context
	    : activeInstance;

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }

	  if (vnode.data.show) {
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});

	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	var transition = inBrowser ? {
	  create: function create (_, vnode) {
	    if (!vnode.data.show) {
	      enter(vnode);
	    }
	  },
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (
	      (vnode.tag === 'textarea' || el.type === 'text') &&
	      !binding.modifiers.lazy
	    ) {
	      if (!isAndroid) {
	        el.addEventListener('compositionstart', onCompositionStart);
	        el.addEventListener('compositionend', onCompositionEnd);
	      }
	      /* istanbul ignore if */
	      if (isIE9) {
	        el.vmodel = true;
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (value && transition && !isIE9) {
	      enter(vnode);
	    }
	    var originalDisplay = el.style.display === 'none' ? '' : el.style.display;
	    el.style.display = value ? originalDisplay : 'none';
	    el.__vOriginalDisplay = originalDisplay;
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      if (value) {
	        enter(vnode);
	        el.style.display = el.__vOriginalDisplay;
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  }
	};

	var platformDirectives = {
	  model: model,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    var key = child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && oldChild.key !== key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data);

	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.mustUseProp = mustUseProp;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = config._isServer ? noop : patch$1;

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && !config._isServer ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (
	      "development" !== 'production' &&
	      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var decoder;

	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var hasLang = function (attr) { return attr.name === 'lang' && attr.value !== 'html'; };
	var isSpecialTag = function (tag, isSFC, stack) {
	  if (isScriptOrStyle(tag)) {
	    return true
	  }
	  // top-level template that has a pre-processor
	  if (
	    isSFC &&
	    tag === 'template' &&
	    stack.length === 1 &&
	    stack[0].attrs.some(hasLang)
	  ) {
	    return true
	  }
	  return false
	};

	var reCache = {};

	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isSpecialTag(lastTag, options.sfc, stack)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd > 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index);
	    }

	    if (html === last && options.chars) {
	      options.chars(html);
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag('', lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag('', tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tag, tagName, start, end) {
	    var pos;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase();
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (tagName.toLowerCase() === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) { inSingle = !inSingle; }
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) { inDouble = !inDouble; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return dynamicValue
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\(([^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;
	var specialNewlineRE = /\u2028|\u2029/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (options.isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs, options.isIE),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if ("client" !== 'server' && isForbiddenTag(element)) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">."
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        if ("development" !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow 2 root elements with v-if and v-else
	        if (root.if && element.else) {
	          checkRootConstraints(element);
	          root.elseBlock = element;
	        } else if ("development" !== 'production' && !warned) {
	          warned = true;
	          warn$1(
	            ("Component template should contain exactly one root element:\n\n" + template)
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.else) {
	          processElse(element, currentParent);
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if ("development" !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (options.isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && currentParent.children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          currentParent.children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else {
	          // #3895 special character
	          text = text.replace(specialNewlineRE, '');
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	  }
	  if (getAndRemoveAttr(el, 'v-else') != null) {
	    el.else = true;
	  }
	}

	function processElse (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    prev.elseBlock = el;
	  } else {
	    warn$1(
	      ("v-else used on element <" + (el.tag) + "> without corresponding v-if.")
	    );
	  }
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget;
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        if (modifiers && modifiers.prop) {
	          isProp = true;
	          name = camelize(name);
	          if (name === 'innerHtml') { name = 'innerHTML'; }
	        }
	        if (isProp || platformMustUseProp(el.tag, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs, isIE) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].tag) { return children[i] }
	  }
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || (function () { return false; });
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        var child = node.children[i];
	        isInFor = isInFor || !!node.for;
	        markStaticRoots(child, isInFor);
	        if (child.type === 1 && child.elseBlock) {
	          markStaticRoots(child.elseBlock, isInFor);
	        }
	      }
	    }
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;'
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(genHandler).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  var code = keys.length === 1
	    ? normalizeKeyCode(keys[0])
	    : Array.prototype.concat.apply([], keys.map(normalizeKeyCode));
	  if (Array.isArray(code)) {
	    return ("if(" + (code.map(function (c) { return ("$event.keyCode!==" + c); }).join('&&')) + ")return;")
	  } else {
	    return ("if($event.keyCode!==" + code + ")return;")
	  }
	}

	function normalizeKeyCode (key) {
	  return (
	    parseInt(key, 10) || // number keyCode
	    keyCodes[key] || // built-in alias
	    ("_k(" + (JSON.stringify(key)) + ")") // custom alias
	  )
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  var code = ast ? genElement(ast) : '_h("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);

	      var children = el.inlineTemplate ? null : genChildren(el);
	      code = "_h('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$2(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}

	// v-if with v-once shuold generate code like (a)?_m(0):_m(1)
	function genIf (el) {
	  var exp = el.if;
	  el.ifProcessed = true; // avoid recursion
	  return ("(" + exp + ")?" + (el.once ? genOnce(el) : genElement(el)) + ":" + (genElse(el)))
	}

	function genElse (el) {
	  return el.elseBlock
	    ? genElement(el.elseBlock)
	    : '_e()'
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var ast = el.children[0];
	    if ("development" !== 'production' && (
	      el.children.length > 1 || ast.type !== 1
	    )) {
	      warn$2('Inline-template components must have exactly one child element.');
	    }
	    if (ast.type === 1) {
	      var inlineRenderFns = generate(ast, currentOptions);
	      data += "inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genChildren (el) {
	  if (el.children.length) {
	    return '[' + el.children.map(genNode).join(',') + ']'
	  }
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : JSON.stringify(text.text)
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  return ("_t(" + slotName + (children ? ("," + children) : '') + ")")
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el);
	  return ("_h(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (prop.value) + ",";
	  }
	  return res.slice(0, -1)
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	var warn$3;

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" +
	      ":_q(" + value + "," + trueValueBinding + ")"
	  );
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }

	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
	  valueExpression = number || type === 'number'
	    ? ("_n(" + valueExpression + ")")
	    : valueExpression;
	  var code = genAssignmentCode(value, valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }
	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if ("development" !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }
	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	}

	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  {
	    el.children.some(checkOptionWarning);
	  }

	  var number = modifiers && modifiers.number;
	  var assignment = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');

	  var code = genAssignmentCode(value, assignment);
	  addHandler(el, 'change', code, null, true);
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}

	function genAssignmentCode (value, assignment) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};

	/*  */

	var cache = Object.create(null);

	var baseOptions = {
	  isIE: isIE,
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	return Vue$3;

	})));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Feedback = _vue2.default.component('feedback', {
			template: '\n<div class="contacts">\n\t<form class="contacts__form" @submit.prevent="onSubmit">\n\t\t<h1>Contact Us</h1>\n\t\t<input class="contacts__name" type="text" v-model="obj.name" placeholder="Enter your Name">\n\n\t\t<input class="contacts__email" type="email" v-model="obj.email" placeholder="Enter your Email">\n\n\t\t<textarea class="contacts__comment" rows="5" v-model="obj.comment" placeholder="Enter your Comment..." ></textarea>\n\n\t\t<button type="submit" class="contacts__submit">Send</button>\n\t</form>\n</div>',

			data: function data() {
					return {
							obj: { name: "", email: "", comment: "" }
					};
			},

			methods: {
					onSubmit: function onSubmit() {
							this.$http.post('../../scripts/feedback.php', this.obj).then(function (res) {
									alert(res.body);
							}, function (err) {
									alert('feedback', err);
							});
					}
			}

	});

		exports.default = Feedback;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueResource = __webpack_require__(4);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueResource2.default);

	_vue2.default.http.options.root = '/root';
	_vue2.default.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
	_vue2.default.http.options.emulateJSON = true;
	_vue2.default.http.options.emulateHTTP = true;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v1.0.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */

	'use strict';

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;

	function Promise$1(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p$1 = Promise$1.prototype;

	p$1.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p$1.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p$1.notify = function notify() {
	    var promise = this;

	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	/**
	 * Promise adapter.
	 */

	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}

	function PromiseObj(executor, context) {

	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }

	    this.context = context;
	}

	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};

	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};

	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};

	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};

	var p = PromiseObj.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return Promise.reject(reason);
	    });
	};

	/**
	 * Utility functions.
	 */

	var debug = false;var util = {};var slice = [].slice;


	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}

	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}

	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}

	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}

	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}

	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}

	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}

	var isArray = Array.isArray;

	function isString(val) {
	    return typeof val === 'string';
	}

	function isBoolean(val) {
	    return val === true || val === false;
	}

	function isFunction(val) {
	    return typeof val === 'function';
	}

	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}

	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}

	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}

	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}

	function when(value, fulfilled, rejected) {

	    var promise = PromiseObj.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}

	function options(fn, obj, opts) {

	    opts = opts || {};

	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }

	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}

	function each(obj, iterator) {

	    var i, key;

	    if (obj && typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	}

	var assign = Object.assign || _assign;

	function merge(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });

	    return target;
	}

	function defaults(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {

	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	    });

	    return target;
	}

	function _assign(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source);
	    });

	    return target;
	}

	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	/**
	 * Root Prefix Transform.
	 */

	function root (options, next) {

	    var url = next(options);

	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }

	    return url;
	}

	/**
	 * Query Parameter Transform.
	 */

	function query (options, next) {

	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);

	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = Url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	}

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	function expand(url, params, variables) {

	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	}

	function parse(template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];

	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null,
	                        values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}

	function getValues(context, operator, key, modifier) {

	    var value = context[key],
	        result = [];

	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }

	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	}

	function isDefined(value) {
	    return value !== undefined && value !== null;
	}

	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}

	function encodeValue(operator, value, key) {

	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}

	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}

	/**
	 * URL Template (RFC 6570) Transform.
	 */

	function template (options) {

	    var variables = [],
	        url = expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	}

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	function Url(url, params) {

	    var self = this || {},
	        options = url,
	        transform;

	    if (isString(url)) {
	        options = { url: url, params: params };
	    }

	    options = merge({}, Url.options, self.$options, options);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });

	    return transform(options);
	}

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [template, query, root];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [],
	        escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;

	    each(obj, function (value, key) {

	        hash = isObject(value) || isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	/**
	 * XDomain client (Internet Explorer).
	 */

	function xdrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xdr = new XDomainRequest(),
	            handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(xdr.responseText, { status: status }));
	        };

	        request.abort = function () {
	            return xdr.abort();
	        };

	        xdr.open(request.method, request.getUrl());
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	}

	/**
	 * CORS Interceptor.
	 */

	var ORIGIN_URL = Url.parse(location.href);
	var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

	function cors (request, next) {

	    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
	        request.crossOrigin = true;
	    }

	    if (request.crossOrigin) {

	        if (!SUPPORTS_CORS) {
	            request.client = xdrClient;
	        }

	        delete request.emulateHTTP;
	    }

	    next();
	}

	function crossOrigin(request) {

	    var requestUrl = Url.parse(Url(request));

	    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
	}

	/**
	 * Body Interceptor.
	 */

	function body (request, next) {

	    if (isFormData(request.body)) {

	        request.headers.delete('Content-Type');
	    } else if (isObject(request.body) || isArray(request.body)) {

	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }

	    next(function (response) {

	        Object.defineProperty(response, 'data', {
	            get: function () {
	                return this.body;
	            },
	            set: function (body) {
	                this.body = body;
	            }
	        });

	        return response.bodyText ? when(response.text(), function (text) {

	            var type = response.headers.get('Content-Type');

	            if (isString(type) && type.indexOf('application/json') === 0) {

	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	            } else {
	                response.body = text;
	            }

	            return response;
	        }) : response;
	    });
	}

	/**
	 * JSONP client.
	 */

	function jsonpClient (request) {
	    return new PromiseObj(function (resolve) {

	        var name = request.jsonp || 'callback',
	            callback = '_jsonp' + Math.random().toString(36).substr(2),
	            body = null,
	            handler,
	            script;

	        handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(body, { status: status }));

	            delete window[callback];
	            document.body.removeChild(script);
	        };

	        request.params[name] = callback;

	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };

	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	}

	/**
	 * JSONP Interceptor.
	 */

	function jsonp (request, next) {

	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }

	    next(function (response) {

	        if (request.method == 'JSONP') {

	            return when(response.json(), function (json) {

	                response.body = json;

	                return response;
	            });
	        }
	    });
	}

	/**
	 * Before Interceptor.
	 */

	function before (request, next) {

	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }

	    next();
	}

	/**
	 * HTTP method override Interceptor.
	 */

	function method (request, next) {

	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }

	    next();
	}

	/**
	 * Header Interceptor.
	 */

	function header (request, next) {

	    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });

	    next();
	}

	/**
	 * Timeout Interceptor.
	 */

	function timeout (request, next) {

	    var timeout;

	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.abort();
	        }, request.timeout);
	    }

	    next(function (response) {

	        clearTimeout(timeout);
	    });
	}

	/**
	 * XMLHttp client.
	 */

	function xhrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xhr = new XMLHttpRequest(),
	            handler = function (event) {

	            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
	                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	            });

	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });

	            resolve(response);
	        };

	        request.abort = function () {
	            return xhr.abort();
	        };

	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }

	        xhr.open(request.method, request.getUrl(), true);

	        if ('responseType' in xhr) {
	            xhr.responseType = 'blob';
	        }

	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }

	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });

	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onerror = handler;
	        xhr.send(request.getBody());
	    });
	}

	/**
	 * Base client.
	 */

	function Client (context) {

	    var reqHandlers = [sendRequest],
	        resHandlers = [],
	        handler;

	    if (!isObject(context)) {
	        context = null;
	    }

	    function Client(request) {
	        return new PromiseObj(function (resolve) {

	            function exec() {

	                handler = reqHandlers.pop();

	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
	                    next();
	                }
	            }

	            function next(response) {

	                if (isFunction(response)) {

	                    resHandlers.unshift(response);
	                } else if (isObject(response)) {

	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });

	                    when(response, resolve);

	                    return;
	                }

	                exec();
	            }

	            exec();
	        }, context);
	    }

	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };

	    return Client;
	}

	function sendRequest(request, resolve) {

	    var client = request.client || xhrClient;

	    resolve(client(request));
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	/**
	 * HTTP Headers.
	 */

	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;

	        classCallCheck(this, Headers);


	        this.map = {};

	        each(headers, function (value, name) {
	            return _this.append(name, value);
	        });
	    }

	    Headers.prototype.has = function has(name) {
	        return getName(this.map, name) !== null;
	    };

	    Headers.prototype.get = function get(name) {

	        var list = this.map[getName(this.map, name)];

	        return list ? list[0] : null;
	    };

	    Headers.prototype.getAll = function getAll(name) {
	        return this.map[getName(this.map, name)] || [];
	    };

	    Headers.prototype.set = function set(name, value) {
	        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	    };

	    Headers.prototype.append = function append(name, value) {

	        var list = this.getAll(name);

	        if (list.length) {
	            list.push(trim(value));
	        } else {
	            this.set(name, value);
	        }
	    };

	    Headers.prototype.delete = function _delete(name) {
	        delete this.map[getName(this.map, name)];
	    };

	    Headers.prototype.forEach = function forEach(callback, thisArg) {
	        var _this2 = this;

	        each(this.map, function (list, name) {
	            each(list, function (value) {
	                return callback.call(thisArg, value, name, _this2);
	            });
	        });
	    };

	    return Headers;
	}();

	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}

	function normalizeName(name) {

	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }

	    return trim(name);
	}

	/**
	 * HTTP Response.
	 */

	var Response = function () {
	    function Response(body, _ref) {
	        var url = _ref.url;
	        var headers = _ref.headers;
	        var status = _ref.status;
	        var statusText = _ref.statusText;
	        classCallCheck(this, Response);


	        this.url = url;
	        this.ok = status >= 200 && status < 300;
	        this.status = status || 0;
	        this.statusText = statusText || '';
	        this.headers = new Headers(headers);
	        this.body = body;

	        if (isString(body)) {

	            this.bodyText = body;
	        } else if (isBlob(body)) {

	            this.bodyBlob = body;

	            if (isBlobText(body)) {
	                this.bodyText = blobText(body);
	            }
	        }
	    }

	    Response.prototype.blob = function blob() {
	        return when(this.bodyBlob);
	    };

	    Response.prototype.text = function text() {
	        return when(this.bodyText);
	    };

	    Response.prototype.json = function json() {
	        return when(this.text(), function (text) {
	            return JSON.parse(text);
	        });
	    };

	    return Response;
	}();

	function blobText(body) {
	    return new PromiseObj(function (resolve) {

	        var reader = new FileReader();

	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	    });
	}

	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}

	/**
	 * HTTP Request.
	 */

	var Request = function () {
	    function Request(options) {
	        classCallCheck(this, Request);


	        this.body = null;
	        this.params = {};

	        assign(this, options, {
	            method: toUpper(options.method || 'GET')
	        });

	        if (!(this.headers instanceof Headers)) {
	            this.headers = new Headers(this.headers);
	        }
	    }

	    Request.prototype.getUrl = function getUrl() {
	        return Url(this);
	    };

	    Request.prototype.getBody = function getBody() {
	        return this.body;
	    };

	    Request.prototype.respondWith = function respondWith(body, options) {
	        return new Response(body, assign(options || {}, { url: this.getUrl() }));
	    };

	    return Request;
	}();

	/**
	 * Service for sending network requests.
	 */

	var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
	var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
	var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

	function Http(options) {

	    var self = this || {},
	        client = Client(self.$vm);

	    defaults(options || {}, self.$options, Http.options);

	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });

	    return client(new Request(options)).then(function (response) {

	        return response.ok ? response : PromiseObj.reject(response);
	    }, function (response) {

	        if (response instanceof Error) {
	            error(response);
	        }

	        return PromiseObj.reject(response);
	    });
	}

	Http.options = {};

	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    custom: CUSTOM_HEADERS,
	    common: COMMON_HEADERS
	};

	Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

	['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

	    Http[method] = function (url, options) {
	        return this(assign(options || {}, { url: url, method: method }));
	    };
	});

	['post', 'put', 'patch'].forEach(function (method) {

	    Http[method] = function (url, body, options) {
	        return this(assign(options || {}, { url: url, method: method, body: body }));
	    };
	});

	/**
	 * Service for interacting with RESTful services.
	 */

	function Resource(url, params, actions, options) {

	    var self = this || {},
	        resource = {};

	    actions = assign({}, Resource.actions, actions);

	    each(actions, function (action, name) {

	        action = merge({ url: url, params: assign({}, params) }, options, action);

	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options = assign({}, action),
	        params = {},
	        body;

	    switch (args.length) {

	        case 2:

	            params = args[0];
	            body = args[1];

	            break;

	        case 1:

	            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
	    }

	    options.body = body;
	    options.params = assign({}, options.params, params);

	    return options;
	}

	Resource.actions = {

	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }

	};

	/**
	 * Install plugin.
	 */

	function plugin(Vue) {

	    if (plugin.installed) {
	        return;
	    }

	    Util(Vue);

	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function () {
	                var _this = this;

	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }

	    });
	}

	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}

	module.exports = plugin;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmEzNmViNTFhMmM1MmE0MTJjMjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy8uL34vdnVlL2Rpc3QvdnVlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ZlZWRiYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1yZXNvdXJjZS9kaXN0L3Z1ZS1yZXNvdXJjZS5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmEzNmViNTFhMmM1MmE0MTJjMjciLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcclxuaW1wb3J0IEZlZWRiYWNrIGZyb20gJy4uL2NvbXBvbmVudHMvZmVlZGJhY2snO1xyXG5pbXBvcnQgJy4uL2NvbXBvbmVudHMvY29uZmlnJztcclxuXHJcbnJlcXVpcmUoJy4uL3Njc3Mvc3R5bGVzLnNjc3MnKTtcclxuIFxyXG5uZXcgVnVlKHtcclxuICBcdGVsOiAnI21haW4nLFxyXG5cclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgRmVlZGJhY2tcclxuICAgIH1cclxufSk7ICBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwidW5kZWZpbmVkXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICIsIi8qIVxyXG4gKiBWdWUuanMgdjIuMC44XHJcbiAqIChjKSAyMDE0LTIwMTYgRXZhbiBZb3VcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4gKi9cclxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcclxuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XHJcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcclxuICAoZ2xvYmFsLlZ1ZSA9IGZhY3RvcnkoKSk7XHJcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyogICovXHJcblxyXG4vKipcclxuICogQ29udmVydCBhIHZhbHVlIHRvIGEgc3RyaW5nIHRoYXQgaXMgYWN0dWFsbHkgcmVuZGVyZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBfdG9TdHJpbmcgKHZhbCkge1xyXG4gIHJldHVybiB2YWwgPT0gbnVsbFxyXG4gICAgPyAnJ1xyXG4gICAgOiB0eXBlb2YgdmFsID09PSAnb2JqZWN0J1xyXG4gICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMilcclxuICAgICAgOiBTdHJpbmcodmFsKVxyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBhIGlucHV0IHZhbHVlIHRvIGEgbnVtYmVyIGZvciBwZXJzaXN0ZW5jZS5cclxuICogSWYgdGhlIGNvbnZlcnNpb24gZmFpbHMsIHJldHVybiBvcmlnaW5hbCBzdHJpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiB0b051bWJlciAodmFsKSB7XHJcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbCwgMTApO1xyXG4gIHJldHVybiAobiB8fCBuID09PSAwKSA/IG4gOiB2YWxcclxufVxyXG5cclxuLyoqXHJcbiAqIE1ha2UgYSBtYXAgYW5kIHJldHVybiBhIGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhIGtleVxyXG4gKiBpcyBpbiB0aGF0IG1hcC5cclxuICovXHJcbmZ1bmN0aW9uIG1ha2VNYXAgKFxyXG4gIHN0cixcclxuICBleHBlY3RzTG93ZXJDYXNlXHJcbikge1xyXG4gIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIHZhciBsaXN0ID0gc3RyLnNwbGl0KCcsJyk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBtYXBbbGlzdFtpXV0gPSB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZVxyXG4gICAgPyBmdW5jdGlvbiAodmFsKSB7IHJldHVybiBtYXBbdmFsLnRvTG93ZXJDYXNlKCldOyB9XHJcbiAgICA6IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWxdOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIHRhZyBpcyBhIGJ1aWx0LWluIHRhZy5cclxuICovXHJcbnZhciBpc0J1aWx0SW5UYWcgPSBtYWtlTWFwKCdzbG90LGNvbXBvbmVudCcsIHRydWUpO1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbiBpdGVtIGZyb20gYW4gYXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZSQxIChhcnIsIGl0ZW0pIHtcclxuICBpZiAoYXJyLmxlbmd0aCkge1xyXG4gICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XHJcbiAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cclxuICovXHJcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbmZ1bmN0aW9uIGhhc093biAob2JqLCBrZXkpIHtcclxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSlcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHZhbHVlIGlzIHByaW1pdGl2ZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNQcmltaXRpdmUgKHZhbHVlKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgY2FjaGVkIHZlcnNpb24gb2YgYSBwdXJlIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gY2FjaGVkIChmbikge1xyXG4gIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGNhY2hlZEZuIChzdHIpIHtcclxuICAgIHZhciBoaXQgPSBjYWNoZVtzdHJdO1xyXG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsbWl0ZWQgc3RyaW5nLlxyXG4gKi9cclxudmFyIGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XHJcbnZhciBjYW1lbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIGZ1bmN0aW9uIChfLCBjKSB7IHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJyc7IH0pXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENhcGl0YWxpemUgYSBzdHJpbmcuXHJcbiAqL1xyXG52YXIgY2FwaXRhbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxyXG4gKi9cclxudmFyIGh5cGhlbmF0ZVJFID0gLyhbXi1dKShbQS1aXSkvZztcclxudmFyIGh5cGhlbmF0ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgcmV0dXJuIHN0clxyXG4gICAgLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpXHJcbiAgICAucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJylcclxuICAgIC50b0xvd2VyQ2FzZSgpXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFNpbXBsZSBiaW5kLCBmYXN0ZXIgdGhhbiBuYXRpdmVcclxuICovXHJcbmZ1bmN0aW9uIGJpbmQkMSAoZm4sIGN0eCkge1xyXG4gIGZ1bmN0aW9uIGJvdW5kRm4gKGEpIHtcclxuICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgIHJldHVybiBsXHJcbiAgICAgID8gbCA+IDFcclxuICAgICAgICA/IGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKVxyXG4gICAgICAgIDogZm4uY2FsbChjdHgsIGEpXHJcbiAgICAgIDogZm4uY2FsbChjdHgpXHJcbiAgfVxyXG4gIC8vIHJlY29yZCBvcmlnaW5hbCBmbiBsZW5ndGhcclxuICBib3VuZEZuLl9sZW5ndGggPSBmbi5sZW5ndGg7XHJcbiAgcmV0dXJuIGJvdW5kRm5cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxyXG4gKi9cclxuZnVuY3Rpb24gdG9BcnJheSAobGlzdCwgc3RhcnQpIHtcclxuICBzdGFydCA9IHN0YXJ0IHx8IDA7XHJcbiAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xyXG4gIHZhciByZXQgPSBuZXcgQXJyYXkoaSk7XHJcbiAgd2hpbGUgKGktLSkge1xyXG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdO1xyXG4gIH1cclxuICByZXR1cm4gcmV0XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBleHRlbmQgKHRvLCBfZnJvbSkge1xyXG4gIGZvciAodmFyIGtleSBpbiBfZnJvbSkge1xyXG4gICAgdG9ba2V5XSA9IF9mcm9tW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiB0b1xyXG59XHJcblxyXG4vKipcclxuICogUXVpY2sgb2JqZWN0IGNoZWNrIC0gdGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byB0ZWxsXHJcbiAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcclxuICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxyXG4gKi9cclxuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xyXG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcclxuICogZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cy5cclxuICovXHJcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbnZhciBPQkpFQ1RfU1RSSU5HID0gJ1tvYmplY3QgT2JqZWN0XSc7XHJcbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkdcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlIGFuIEFycmF5IG9mIE9iamVjdHMgaW50byBhIHNpbmdsZSBPYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiB0b09iamVjdCAoYXJyKSB7XHJcbiAgdmFyIHJlcyA9IHt9O1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoYXJyW2ldKSB7XHJcbiAgICAgIGV4dGVuZChyZXMsIGFycltpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXNcclxufVxyXG5cclxuLyoqXHJcbiAqIFBlcmZvcm0gbm8gb3BlcmF0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gbm9vcCAoKSB7fVxyXG5cclxuLyoqXHJcbiAqIEFsd2F5cyByZXR1cm4gZmFsc2UuXHJcbiAqL1xyXG52YXIgbm8gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIHN0YXRpYyBrZXlzIHN0cmluZyBmcm9tIGNvbXBpbGVyIG1vZHVsZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZW5TdGF0aWNLZXlzIChtb2R1bGVzKSB7XHJcbiAgcmV0dXJuIG1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChrZXlzLCBtKSB7XHJcbiAgICByZXR1cm4ga2V5cy5jb25jYXQobS5zdGF0aWNLZXlzIHx8IFtdKVxyXG4gIH0sIFtdKS5qb2luKCcsJylcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHR3byB2YWx1ZXMgYXJlIGxvb3NlbHkgZXF1YWwgLSB0aGF0IGlzLFxyXG4gKiBpZiB0aGV5IGFyZSBwbGFpbiBvYmplY3RzLCBkbyB0aGV5IGhhdmUgdGhlIHNhbWUgc2hhcGU/XHJcbiAqL1xyXG5mdW5jdGlvbiBsb29zZUVxdWFsIChhLCBiKSB7XHJcbiAgLyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXHJcbiAgcmV0dXJuIGEgPT0gYiB8fCAoXHJcbiAgICBpc09iamVjdChhKSAmJiBpc09iamVjdChiKVxyXG4gICAgICA/IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKVxyXG4gICAgICA6IGZhbHNlXHJcbiAgKVxyXG4gIC8qIGVzbGludC1lbmFibGUgZXFlcWVxICovXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvb3NlSW5kZXhPZiAoYXJyLCB2YWwpIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGxvb3NlRXF1YWwoYXJyW2ldLCB2YWwpKSB7IHJldHVybiBpIH1cclxuICB9XHJcbiAgcmV0dXJuIC0xXHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAvKipcclxuICAgKiBPcHRpb24gbWVyZ2Ugc3RyYXRlZ2llcyAodXNlZCBpbiBjb3JlL3V0aWwvb3B0aW9ucylcclxuICAgKi9cclxuICBvcHRpb25NZXJnZVN0cmF0ZWdpZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gc3VwcHJlc3Mgd2FybmluZ3MuXHJcbiAgICovXHJcbiAgc2lsZW50OiBmYWxzZSxcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBlbmFibGUgZGV2dG9vbHNcclxuICAgKi9cclxuICBkZXZ0b29sczogXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicsXHJcblxyXG4gIC8qKlxyXG4gICAqIEVycm9yIGhhbmRsZXIgZm9yIHdhdGNoZXIgZXJyb3JzXHJcbiAgICovXHJcbiAgZXJyb3JIYW5kbGVyOiBudWxsLFxyXG5cclxuICAvKipcclxuICAgKiBJZ25vcmUgY2VydGFpbiBjdXN0b20gZWxlbWVudHNcclxuICAgKi9cclxuICBpZ25vcmVkRWxlbWVudHM6IG51bGwsXHJcblxyXG4gIC8qKlxyXG4gICAqIEN1c3RvbSB1c2VyIGtleSBhbGlhc2VzIGZvciB2LW9uXHJcbiAgICovXHJcbiAga2V5Q29kZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgdGFnIGlzIHJlc2VydmVkIHNvIHRoYXQgaXQgY2Fubm90IGJlIHJlZ2lzdGVyZWQgYXMgYVxyXG4gICAqIGNvbXBvbmVudC4gVGhpcyBpcyBwbGF0Zm9ybS1kZXBlbmRlbnQgYW5kIG1heSBiZSBvdmVyd3JpdHRlbi5cclxuICAgKi9cclxuICBpc1Jlc2VydmVkVGFnOiBubyxcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSB0YWcgaXMgYW4gdW5rbm93biBlbGVtZW50LlxyXG4gICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cclxuICAgKi9cclxuICBpc1Vua25vd25FbGVtZW50OiBubyxcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBuYW1lc3BhY2Ugb2YgYW4gZWxlbWVudFxyXG4gICAqL1xyXG4gIGdldFRhZ05hbWVzcGFjZTogbm9vcCxcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIG11c3QgYmUgYm91bmQgdXNpbmcgcHJvcGVydHksIGUuZy4gdmFsdWVcclxuICAgKiBQbGF0Zm9ybS1kZXBlbmRlbnQuXHJcbiAgICovXHJcbiAgbXVzdFVzZVByb3A6IG5vLFxyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIGFzc2V0IHR5cGVzIHRoYXQgYSBjb21wb25lbnQgY2FuIG93bi5cclxuICAgKi9cclxuICBfYXNzZXRUeXBlczogW1xyXG4gICAgJ2NvbXBvbmVudCcsXHJcbiAgICAnZGlyZWN0aXZlJyxcclxuICAgICdmaWx0ZXInXHJcbiAgXSxcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiBsaWZlY3ljbGUgaG9va3MuXHJcbiAgICovXHJcbiAgX2xpZmVjeWNsZUhvb2tzOiBbXHJcbiAgICAnYmVmb3JlQ3JlYXRlJyxcclxuICAgICdjcmVhdGVkJyxcclxuICAgICdiZWZvcmVNb3VudCcsXHJcbiAgICAnbW91bnRlZCcsXHJcbiAgICAnYmVmb3JlVXBkYXRlJyxcclxuICAgICd1cGRhdGVkJyxcclxuICAgICdiZWZvcmVEZXN0cm95JyxcclxuICAgICdkZXN0cm95ZWQnLFxyXG4gICAgJ2FjdGl2YXRlZCcsXHJcbiAgICAnZGVhY3RpdmF0ZWQnXHJcbiAgXSxcclxuXHJcbiAgLyoqXHJcbiAgICogTWF4IGNpcmN1bGFyIHVwZGF0ZXMgYWxsb3dlZCBpbiBhIHNjaGVkdWxlciBmbHVzaCBjeWNsZS5cclxuICAgKi9cclxuICBfbWF4VXBkYXRlQ291bnQ6IDEwMCxcclxuXHJcbiAgLyoqXHJcbiAgICogU2VydmVyIHJlbmRlcmluZz9cclxuICAgKi9cclxuICBfaXNTZXJ2ZXI6IFwiY2xpZW50XCIgPT09ICdzZXJ2ZXInXHJcbn07XHJcblxyXG4vKiAgKi9cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cclxuICovXHJcbmZ1bmN0aW9uIGlzUmVzZXJ2ZWQgKHN0cikge1xyXG4gIHZhciBjID0gKHN0ciArICcnKS5jaGFyQ29kZUF0KDApO1xyXG4gIHJldHVybiBjID09PSAweDI0IHx8IGMgPT09IDB4NUZcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZSBhIHByb3BlcnR5LlxyXG4gKi9cclxuZnVuY3Rpb24gZGVmIChvYmosIGtleSwgdmFsLCBlbnVtZXJhYmxlKSB7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XHJcbiAgICB2YWx1ZTogdmFsLFxyXG4gICAgZW51bWVyYWJsZTogISFlbnVtZXJhYmxlLFxyXG4gICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICBjb25maWd1cmFibGU6IHRydWVcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlIHNpbXBsZSBwYXRoLlxyXG4gKi9cclxudmFyIGJhaWxSRSA9IC9bXlxcdy4kXS87XHJcbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xyXG4gIGlmIChiYWlsUkUudGVzdChwYXRoKSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzZWdtZW50cyA9IHBhdGguc3BsaXQoJy4nKTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIW9iaikgeyByZXR1cm4gfVxyXG4gICAgICAgIG9iaiA9IG9ialtzZWdtZW50c1tpXV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9ialxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyogICovXHJcbi8qIGdsb2JhbHMgTXV0YXRpb25PYnNlcnZlciAqL1xyXG5cclxuLy8gY2FuIHdlIHVzZSBfX3Byb3RvX18/XHJcbnZhciBoYXNQcm90byA9ICdfX3Byb3RvX18nIGluIHt9O1xyXG5cclxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xyXG52YXIgaW5Ccm93c2VyID1cclxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cpICE9PSAnW29iamVjdCBPYmplY3RdJztcclxuXHJcbnZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG52YXIgaXNJRSA9IFVBICYmIC9tc2llfHRyaWRlbnQvLnRlc3QoVUEpO1xyXG52YXIgaXNJRTkgPSBVQSAmJiBVQS5pbmRleE9mKCdtc2llIDkuMCcpID4gMDtcclxudmFyIGlzRWRnZSA9IFVBICYmIFVBLmluZGV4T2YoJ2VkZ2UvJykgPiAwO1xyXG52YXIgaXNBbmRyb2lkID0gVUEgJiYgVUEuaW5kZXhPZignYW5kcm9pZCcpID4gMDtcclxudmFyIGlzSU9TID0gVUEgJiYgL2lwaG9uZXxpcGFkfGlwb2R8aW9zLy50ZXN0KFVBKTtcclxuXHJcbi8vIGRldGVjdCBkZXZ0b29sc1xyXG52YXIgZGV2dG9vbHMgPSBpbkJyb3dzZXIgJiYgd2luZG93Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX187XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG5mdW5jdGlvbiBpc05hdGl2ZSAoQ3Rvcikge1xyXG4gIHJldHVybiAvbmF0aXZlIGNvZGUvLnRlc3QoQ3Rvci50b1N0cmluZygpKVxyXG59XHJcblxyXG4vKipcclxuICogRGVmZXIgYSB0YXNrIHRvIGV4ZWN1dGUgaXQgYXN5bmNocm9ub3VzbHkuXHJcbiAqL1xyXG52YXIgbmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBjYWxsYmFja3MgPSBbXTtcclxuICB2YXIgcGVuZGluZyA9IGZhbHNlO1xyXG4gIHZhciB0aW1lckZ1bmM7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHRUaWNrSGFuZGxlciAoKSB7XHJcbiAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICB2YXIgY29waWVzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgY2FsbGJhY2tzLmxlbmd0aCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb3BpZXNbaV0oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHRoZSBuZXh0VGljayBiZWhhdmlvciBsZXZlcmFnZXMgdGhlIG1pY3JvdGFzayBxdWV1ZSwgd2hpY2ggY2FuIGJlIGFjY2Vzc2VkXHJcbiAgLy8gdmlhIGVpdGhlciBuYXRpdmUgUHJvbWlzZS50aGVuIG9yIE11dGF0aW9uT2JzZXJ2ZXIuXHJcbiAgLy8gTXV0YXRpb25PYnNlcnZlciBoYXMgd2lkZXIgc3VwcG9ydCwgaG93ZXZlciBpdCBpcyBzZXJpb3VzbHkgYnVnZ2VkIGluXHJcbiAgLy8gVUlXZWJWaWV3IGluIGlPUyA+PSA5LjMuMyB3aGVuIHRyaWdnZXJlZCBpbiB0b3VjaCBldmVudCBoYW5kbGVycy4gSXRcclxuICAvLyBjb21wbGV0ZWx5IHN0b3BzIHdvcmtpbmcgYWZ0ZXIgdHJpZ2dlcmluZyBhIGZldyB0aW1lcy4uLiBzbywgaWYgbmF0aXZlXHJcbiAgLy8gUHJvbWlzZSBpcyBhdmFpbGFibGUsIHdlIHdpbGwgdXNlIGl0OlxyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUHJvbWlzZSkpIHtcclxuICAgIHZhciBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHAudGhlbihuZXh0VGlja0hhbmRsZXIpO1xyXG4gICAgICAvLyBpbiBwcm9ibGVtYXRpYyBVSVdlYlZpZXdzLCBQcm9taXNlLnRoZW4gZG9lc24ndCBjb21wbGV0ZWx5IGJyZWFrLCBidXRcclxuICAgICAgLy8gaXQgY2FuIGdldCBzdHVjayBpbiBhIHdlaXJkIHN0YXRlIHdoZXJlIGNhbGxiYWNrcyBhcmUgcHVzaGVkIGludG8gdGhlXHJcbiAgICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBidXQgdGhlIHF1ZXVlIGlzbid0IGJlaW5nIGZsdXNoZWQsIHVudGlsIHRoZSBicm93c2VyXHJcbiAgICAgIC8vIG5lZWRzIHRvIGRvIHNvbWUgb3RoZXIgd29yaywgZS5nLiBoYW5kbGUgYSB0aW1lci4gVGhlcmVmb3JlIHdlIGNhblxyXG4gICAgICAvLyBcImZvcmNlXCIgdGhlIG1pY3JvdGFzayBxdWV1ZSB0byBiZSBmbHVzaGVkIGJ5IGFkZGluZyBhbiBlbXB0eSB0aW1lci5cclxuICAgICAgaWYgKGlzSU9TKSB7IHNldFRpbWVvdXQobm9vcCk7IH1cclxuICAgIH07XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxyXG4gICAgaXNOYXRpdmUoTXV0YXRpb25PYnNlcnZlcikgfHxcclxuICAgIC8vIFBoYW50b21KUyBhbmQgaU9TIDcueFxyXG4gICAgTXV0YXRpb25PYnNlcnZlci50b1N0cmluZygpID09PSAnW29iamVjdCBNdXRhdGlvbk9ic2VydmVyQ29uc3RydWN0b3JdJ1xyXG4gICkpIHtcclxuICAgIC8vIHVzZSBNdXRhdGlvbk9ic2VydmVyIHdoZXJlIG5hdGl2ZSBQcm9taXNlIGlzIG5vdCBhdmFpbGFibGUsXHJcbiAgICAvLyBlLmcuIFBoYW50b21KUyBJRTExLCBpT1M3LCBBbmRyb2lkIDQuNFxyXG4gICAgdmFyIGNvdW50ZXIgPSAxO1xyXG4gICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobmV4dFRpY2tIYW5kbGVyKTtcclxuICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhjb3VudGVyKSk7XHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XHJcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb3VudGVyID0gKGNvdW50ZXIgKyAxKSAlIDI7XHJcbiAgICAgIHRleHROb2RlLmRhdGEgPSBTdHJpbmcoY291bnRlcik7XHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBmYWxsYmFjayB0byBzZXRUaW1lb3V0XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KG5leHRUaWNrSGFuZGxlciwgMCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHF1ZXVlTmV4dFRpY2sgKGNiLCBjdHgpIHtcclxuICAgIHZhciBmdW5jID0gY3R4XHJcbiAgICAgID8gZnVuY3Rpb24gKCkgeyBjYi5jYWxsKGN0eCk7IH1cclxuICAgICAgOiBjYjtcclxuICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmMpO1xyXG4gICAgaWYgKCFwZW5kaW5nKSB7XHJcbiAgICAgIHBlbmRpbmcgPSB0cnVlO1xyXG4gICAgICB0aW1lckZ1bmMoKTtcclxuICAgIH1cclxuICB9XHJcbn0pKCk7XHJcblxyXG52YXIgX1NldDtcclxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbmlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTZXQpKSB7XHJcbiAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXHJcbiAgX1NldCA9IFNldDtcclxufSBlbHNlIHtcclxuICAvLyBhIG5vbi1zdGFuZGFyZCBTZXQgcG9seWZpbGwgdGhhdCBvbmx5IHdvcmtzIHdpdGggcHJpbWl0aXZlIGtleXMuXHJcbiAgX1NldCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTZXQgKCkge1xyXG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICB9XHJcbiAgICBTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoa2V5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldICE9PSB1bmRlZmluZWRcclxuICAgIH07XHJcbiAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAoa2V5KSB7XHJcbiAgICAgIHRoaXMuc2V0W2tleV0gPSAxO1xyXG4gICAgfTtcclxuICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XHJcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFNldDtcclxuICB9KCkpO1xyXG59XHJcblxyXG4vKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggUHJveHkgKi9cclxuXHJcbnZhciBoYXNQcm94eTtcclxudmFyIHByb3h5SGFuZGxlcnM7XHJcbnZhciBpbml0UHJveHk7XHJcblxyXG57XHJcbiAgdmFyIGFsbG93ZWRHbG9iYWxzID0gbWFrZU1hcChcclxuICAgICdJbmZpbml0eSx1bmRlZmluZWQsTmFOLGlzRmluaXRlLGlzTmFOLCcgK1xyXG4gICAgJ3BhcnNlRmxvYXQscGFyc2VJbnQsZGVjb2RlVVJJLGRlY29kZVVSSUNvbXBvbmVudCxlbmNvZGVVUkksZW5jb2RlVVJJQ29tcG9uZW50LCcgK1xyXG4gICAgJ01hdGgsTnVtYmVyLERhdGUsQXJyYXksT2JqZWN0LEJvb2xlYW4sU3RyaW5nLFJlZ0V4cCxNYXAsU2V0LEpTT04sSW50bCwnICtcclxuICAgICdyZXF1aXJlJyAvLyBmb3IgV2VicGFjay9Ccm93c2VyaWZ5XHJcbiAgKTtcclxuXHJcbiAgaGFzUHJveHkgPVxyXG4gICAgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgUHJveHkudG9TdHJpbmcoKS5tYXRjaCgvbmF0aXZlIGNvZGUvKTtcclxuXHJcbiAgcHJveHlIYW5kbGVycyA9IHtcclxuICAgIGhhczogZnVuY3Rpb24gaGFzICh0YXJnZXQsIGtleSkge1xyXG4gICAgICB2YXIgaGFzID0ga2V5IGluIHRhcmdldDtcclxuICAgICAgdmFyIGlzQWxsb3dlZCA9IGFsbG93ZWRHbG9iYWxzKGtleSkgfHwga2V5LmNoYXJBdCgwKSA9PT0gJ18nO1xyXG4gICAgICBpZiAoIWhhcyAmJiAhaXNBbGxvd2VkKSB7XHJcbiAgICAgICAgd2FybihcclxuICAgICAgICAgIFwiUHJvcGVydHkgb3IgbWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBub3QgZGVmaW5lZCBvbiB0aGUgaW5zdGFuY2UgYnV0IFwiICtcclxuICAgICAgICAgIFwicmVmZXJlbmNlZCBkdXJpbmcgcmVuZGVyLiBNYWtlIHN1cmUgdG8gZGVjbGFyZSByZWFjdGl2ZSBkYXRhIFwiICtcclxuICAgICAgICAgIFwicHJvcGVydGllcyBpbiB0aGUgZGF0YSBvcHRpb24uXCIsXHJcbiAgICAgICAgICB0YXJnZXRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBoYXMgfHwgIWlzQWxsb3dlZFxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGluaXRQcm94eSA9IGZ1bmN0aW9uIGluaXRQcm94eSAodm0pIHtcclxuICAgIGlmIChoYXNQcm94eSkge1xyXG4gICAgICB2bS5fcmVuZGVyUHJveHkgPSBuZXcgUHJveHkodm0sIHByb3h5SGFuZGxlcnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdm0uX3JlbmRlclByb3h5ID0gdm07XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuLyogICovXHJcblxyXG5cclxudmFyIHVpZCQyID0gMDtcclxuXHJcbi8qKlxyXG4gKiBBIGRlcCBpcyBhbiBvYnNlcnZhYmxlIHRoYXQgY2FuIGhhdmUgbXVsdGlwbGVcclxuICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cclxuICovXHJcbnZhciBEZXAgPSBmdW5jdGlvbiBEZXAgKCkge1xyXG4gIHRoaXMuaWQgPSB1aWQkMisrO1xyXG4gIHRoaXMuc3VicyA9IFtdO1xyXG59O1xyXG5cclxuRGVwLnByb3RvdHlwZS5hZGRTdWIgPSBmdW5jdGlvbiBhZGRTdWIgKHN1Yikge1xyXG4gIHRoaXMuc3Vicy5wdXNoKHN1Yik7XHJcbn07XHJcblxyXG5EZXAucHJvdG90eXBlLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIHJlbW92ZVN1YiAoc3ViKSB7XHJcbiAgcmVtb3ZlJDEodGhpcy5zdWJzLCBzdWIpO1xyXG59O1xyXG5cclxuRGVwLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiBkZXBlbmQgKCkge1xyXG4gIGlmIChEZXAudGFyZ2V0KSB7XHJcbiAgICBEZXAudGFyZ2V0LmFkZERlcCh0aGlzKTtcclxuICB9XHJcbn07XHJcblxyXG5EZXAucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSAoKSB7XHJcbiAgLy8gc3RhYmxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxyXG4gIHZhciBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKCk7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgc3Vic1tpXS51cGRhdGUoKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyB0aGUgY3VycmVudCB0YXJnZXQgd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQuXHJcbi8vIHRoaXMgaXMgZ2xvYmFsbHkgdW5pcXVlIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb25seSBvbmVcclxuLy8gd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQgYXQgYW55IHRpbWUuXHJcbkRlcC50YXJnZXQgPSBudWxsO1xyXG52YXIgdGFyZ2V0U3RhY2sgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIHB1c2hUYXJnZXQgKF90YXJnZXQpIHtcclxuICBpZiAoRGVwLnRhcmdldCkgeyB0YXJnZXRTdGFjay5wdXNoKERlcC50YXJnZXQpOyB9XHJcbiAgRGVwLnRhcmdldCA9IF90YXJnZXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcFRhcmdldCAoKSB7XHJcbiAgRGVwLnRhcmdldCA9IHRhcmdldFN0YWNrLnBvcCgpO1xyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcblxyXG52YXIgcXVldWUgPSBbXTtcclxudmFyIGhhcyQxID0ge307XHJcbnZhciBjaXJjdWxhciA9IHt9O1xyXG52YXIgd2FpdGluZyA9IGZhbHNlO1xyXG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcclxudmFyIGluZGV4ID0gMDtcclxuXHJcbi8qKlxyXG4gKiBSZXNldCB0aGUgc2NoZWR1bGVyJ3Mgc3RhdGUuXHJcbiAqL1xyXG5mdW5jdGlvbiByZXNldFNjaGVkdWxlclN0YXRlICgpIHtcclxuICBxdWV1ZS5sZW5ndGggPSAwO1xyXG4gIGhhcyQxID0ge307XHJcbiAge1xyXG4gICAgY2lyY3VsYXIgPSB7fTtcclxuICB9XHJcbiAgd2FpdGluZyA9IGZsdXNoaW5nID0gZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGbHVzaCBib3RoIHF1ZXVlcyBhbmQgcnVuIHRoZSB3YXRjaGVycy5cclxuICovXHJcbmZ1bmN0aW9uIGZsdXNoU2NoZWR1bGVyUXVldWUgKCkge1xyXG4gIGZsdXNoaW5nID0gdHJ1ZTtcclxuXHJcbiAgLy8gU29ydCBxdWV1ZSBiZWZvcmUgZmx1c2guXHJcbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQ6XHJcbiAgLy8gMS4gQ29tcG9uZW50cyBhcmUgdXBkYXRlZCBmcm9tIHBhcmVudCB0byBjaGlsZC4gKGJlY2F1c2UgcGFyZW50IGlzIGFsd2F5c1xyXG4gIC8vICAgIGNyZWF0ZWQgYmVmb3JlIHRoZSBjaGlsZClcclxuICAvLyAyLiBBIGNvbXBvbmVudCdzIHVzZXIgd2F0Y2hlcnMgYXJlIHJ1biBiZWZvcmUgaXRzIHJlbmRlciB3YXRjaGVyIChiZWNhdXNlXHJcbiAgLy8gICAgdXNlciB3YXRjaGVycyBhcmUgY3JlYXRlZCBiZWZvcmUgdGhlIHJlbmRlciB3YXRjaGVyKVxyXG4gIC8vIDMuIElmIGEgY29tcG9uZW50IGlzIGRlc3Ryb3llZCBkdXJpbmcgYSBwYXJlbnQgY29tcG9uZW50J3Mgd2F0Y2hlciBydW4sXHJcbiAgLy8gICAgaXRzIHdhdGNoZXJzIGNhbiBiZSBza2lwcGVkLlxyXG4gIHF1ZXVlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcclxuXHJcbiAgLy8gZG8gbm90IGNhY2hlIGxlbmd0aCBiZWNhdXNlIG1vcmUgd2F0Y2hlcnMgbWlnaHQgYmUgcHVzaGVkXHJcbiAgLy8gYXMgd2UgcnVuIGV4aXN0aW5nIHdhdGNoZXJzXHJcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcXVldWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICB2YXIgd2F0Y2hlciA9IHF1ZXVlW2luZGV4XTtcclxuICAgIHZhciBpZCA9IHdhdGNoZXIuaWQ7XHJcbiAgICBoYXMkMVtpZF0gPSBudWxsO1xyXG4gICAgd2F0Y2hlci5ydW4oKTtcclxuICAgIC8vIGluIGRldiBidWlsZCwgY2hlY2sgYW5kIHN0b3AgY2lyY3VsYXIgdXBkYXRlcy5cclxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiBoYXMkMVtpZF0gIT0gbnVsbCkge1xyXG4gICAgICBjaXJjdWxhcltpZF0gPSAoY2lyY3VsYXJbaWRdIHx8IDApICsgMTtcclxuICAgICAgaWYgKGNpcmN1bGFyW2lkXSA+IGNvbmZpZy5fbWF4VXBkYXRlQ291bnQpIHtcclxuICAgICAgICB3YXJuKFxyXG4gICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBhbiBpbmZpbml0ZSB1cGRhdGUgbG9vcCAnICsgKFxyXG4gICAgICAgICAgICB3YXRjaGVyLnVzZXJcclxuICAgICAgICAgICAgICA/IChcImluIHdhdGNoZXIgd2l0aCBleHByZXNzaW9uIFxcXCJcIiArICh3YXRjaGVyLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpXHJcbiAgICAgICAgICAgICAgOiBcImluIGEgY29tcG9uZW50IHJlbmRlciBmdW5jdGlvbi5cIlxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIHdhdGNoZXIudm1cclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGRldnRvb2wgaG9va1xyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gIGlmIChkZXZ0b29scyAmJiBjb25maWcuZGV2dG9vbHMpIHtcclxuICAgIGRldnRvb2xzLmVtaXQoJ2ZsdXNoJyk7XHJcbiAgfVxyXG5cclxuICByZXNldFNjaGVkdWxlclN0YXRlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQdXNoIGEgd2F0Y2hlciBpbnRvIHRoZSB3YXRjaGVyIHF1ZXVlLlxyXG4gKiBKb2JzIHdpdGggZHVwbGljYXRlIElEcyB3aWxsIGJlIHNraXBwZWQgdW5sZXNzIGl0J3NcclxuICogcHVzaGVkIHdoZW4gdGhlIHF1ZXVlIGlzIGJlaW5nIGZsdXNoZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWV1ZVdhdGNoZXIgKHdhdGNoZXIpIHtcclxuICB2YXIgaWQgPSB3YXRjaGVyLmlkO1xyXG4gIGlmIChoYXMkMVtpZF0gPT0gbnVsbCkge1xyXG4gICAgaGFzJDFbaWRdID0gdHJ1ZTtcclxuICAgIGlmICghZmx1c2hpbmcpIHtcclxuICAgICAgcXVldWUucHVzaCh3YXRjaGVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlmIGFscmVhZHkgZmx1c2hpbmcsIHNwbGljZSB0aGUgd2F0Y2hlciBiYXNlZCBvbiBpdHMgaWRcclxuICAgICAgLy8gaWYgYWxyZWFkeSBwYXN0IGl0cyBpZCwgaXQgd2lsbCBiZSBydW4gbmV4dCBpbW1lZGlhdGVseS5cclxuICAgICAgdmFyIGkgPSBxdWV1ZS5sZW5ndGggLSAxO1xyXG4gICAgICB3aGlsZSAoaSA+PSAwICYmIHF1ZXVlW2ldLmlkID4gd2F0Y2hlci5pZCkge1xyXG4gICAgICAgIGktLTtcclxuICAgICAgfVxyXG4gICAgICBxdWV1ZS5zcGxpY2UoTWF0aC5tYXgoaSwgaW5kZXgpICsgMSwgMCwgd2F0Y2hlcik7XHJcbiAgICB9XHJcbiAgICAvLyBxdWV1ZSB0aGUgZmx1c2hcclxuICAgIGlmICghd2FpdGluZykge1xyXG4gICAgICB3YWl0aW5nID0gdHJ1ZTtcclxuICAgICAgbmV4dFRpY2soZmx1c2hTY2hlZHVsZXJRdWV1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbnZhciB1aWQkMSA9IDA7XHJcblxyXG4vKipcclxuICogQSB3YXRjaGVyIHBhcnNlcyBhbiBleHByZXNzaW9uLCBjb2xsZWN0cyBkZXBlbmRlbmNpZXMsXHJcbiAqIGFuZCBmaXJlcyBjYWxsYmFjayB3aGVuIHRoZSBleHByZXNzaW9uIHZhbHVlIGNoYW5nZXMuXHJcbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxyXG4gKi9cclxudmFyIFdhdGNoZXIgPSBmdW5jdGlvbiBXYXRjaGVyIChcclxuICB2bSxcclxuICBleHBPckZuLFxyXG4gIGNiLFxyXG4gIG9wdGlvbnNcclxuKSB7XHJcbiAgaWYgKCBvcHRpb25zID09PSB2b2lkIDAgKSBvcHRpb25zID0ge307XHJcblxyXG4gIHRoaXMudm0gPSB2bTtcclxuICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKTtcclxuICAvLyBvcHRpb25zXHJcbiAgdGhpcy5kZWVwID0gISFvcHRpb25zLmRlZXA7XHJcbiAgdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXI7XHJcbiAgdGhpcy5sYXp5ID0gISFvcHRpb25zLmxhenk7XHJcbiAgdGhpcy5zeW5jID0gISFvcHRpb25zLnN5bmM7XHJcbiAgdGhpcy5leHByZXNzaW9uID0gZXhwT3JGbi50b1N0cmluZygpO1xyXG4gIHRoaXMuY2IgPSBjYjtcclxuICB0aGlzLmlkID0gKyt1aWQkMTsgLy8gdWlkIGZvciBiYXRjaGluZ1xyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICB0aGlzLmRpcnR5ID0gdGhpcy5sYXp5OyAvLyBmb3IgbGF6eSB3YXRjaGVyc1xyXG4gIHRoaXMuZGVwcyA9IFtdO1xyXG4gIHRoaXMubmV3RGVwcyA9IFtdO1xyXG4gIHRoaXMuZGVwSWRzID0gbmV3IF9TZXQoKTtcclxuICB0aGlzLm5ld0RlcElkcyA9IG5ldyBfU2V0KCk7XHJcbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyXHJcbiAgaWYgKHR5cGVvZiBleHBPckZuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB0aGlzLmdldHRlciA9IGV4cE9yRm47XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMuZ2V0dGVyID0gcGFyc2VQYXRoKGV4cE9yRm4pO1xyXG4gICAgaWYgKCF0aGlzLmdldHRlcikge1xyXG4gICAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxyXG4gICAgICAgIFwiRmFpbGVkIHdhdGNoaW5nIHBhdGg6IFxcXCJcIiArIGV4cE9yRm4gKyBcIlxcXCIgXCIgK1xyXG4gICAgICAgICdXYXRjaGVyIG9ubHkgYWNjZXB0cyBzaW1wbGUgZG90LWRlbGltaXRlZCBwYXRocy4gJyArXHJcbiAgICAgICAgJ0ZvciBmdWxsIGNvbnRyb2wsIHVzZSBhIGZ1bmN0aW9uIGluc3RlYWQuJyxcclxuICAgICAgICB2bVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICB0aGlzLnZhbHVlID0gdGhpcy5sYXp5XHJcbiAgICA/IHVuZGVmaW5lZFxyXG4gICAgOiB0aGlzLmdldCgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cclxuICovXHJcbldhdGNoZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoKSB7XHJcbiAgcHVzaFRhcmdldCh0aGlzKTtcclxuICB2YXIgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHRoaXMudm0sIHRoaXMudm0pO1xyXG4gIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xyXG4gIC8vIGRlcGVuZGVuY2llcyBmb3IgZGVlcCB3YXRjaGluZ1xyXG4gIGlmICh0aGlzLmRlZXApIHtcclxuICAgIHRyYXZlcnNlKHZhbHVlKTtcclxuICB9XHJcbiAgcG9wVGFyZ2V0KCk7XHJcbiAgdGhpcy5jbGVhbnVwRGVwcygpO1xyXG4gIHJldHVybiB2YWx1ZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXHJcbiAqL1xyXG5XYXRjaGVyLnByb3RvdHlwZS5hZGREZXAgPSBmdW5jdGlvbiBhZGREZXAgKGRlcCkge1xyXG4gIHZhciBpZCA9IGRlcC5pZDtcclxuICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhpZCkpIHtcclxuICAgIHRoaXMubmV3RGVwSWRzLmFkZChpZCk7XHJcbiAgICB0aGlzLm5ld0RlcHMucHVzaChkZXApO1xyXG4gICAgaWYgKCF0aGlzLmRlcElkcy5oYXMoaWQpKSB7XHJcbiAgICAgIGRlcC5hZGRTdWIodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFuIHVwIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXHJcbiAqL1xyXG5XYXRjaGVyLnByb3RvdHlwZS5jbGVhbnVwRGVwcyA9IGZ1bmN0aW9uIGNsZWFudXBEZXBzICgpIHtcclxuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XHJcbiAgd2hpbGUgKGktLSkge1xyXG4gICAgdmFyIGRlcCA9IHRoaXMkMS5kZXBzW2ldO1xyXG4gICAgaWYgKCF0aGlzJDEubmV3RGVwSWRzLmhhcyhkZXAuaWQpKSB7XHJcbiAgICAgIGRlcC5yZW1vdmVTdWIodGhpcyQxKTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFyIHRtcCA9IHRoaXMuZGVwSWRzO1xyXG4gIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHM7XHJcbiAgdGhpcy5uZXdEZXBJZHMgPSB0bXA7XHJcbiAgdGhpcy5uZXdEZXBJZHMuY2xlYXIoKTtcclxuICB0bXAgPSB0aGlzLmRlcHM7XHJcbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzO1xyXG4gIHRoaXMubmV3RGVwcyA9IHRtcDtcclxuICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cclxuICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgY2hhbmdlcy5cclxuICovXHJcbldhdGNoZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICBpZiAodGhpcy5sYXp5KSB7XHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHRoaXMuc3luYykge1xyXG4gICAgdGhpcy5ydW4oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcXVldWVXYXRjaGVyKHRoaXMpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTY2hlZHVsZXIgam9iIGludGVyZmFjZS5cclxuICogV2lsbCBiZSBjYWxsZWQgYnkgdGhlIHNjaGVkdWxlci5cclxuICovXHJcbldhdGNoZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIHJ1biAoKSB7XHJcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XHJcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcclxuICAgICAgLy8gRGVlcCB3YXRjaGVycyBhbmQgd2F0Y2hlcnMgb24gT2JqZWN0L0FycmF5cyBzaG91bGQgZmlyZSBldmVuXHJcbiAgICAgIC8vIHdoZW4gdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCBiZWNhdXNlIHRoZSB2YWx1ZSBtYXlcclxuICAgICAgLy8gaGF2ZSBtdXRhdGVkLlxyXG4gICAgICBpc09iamVjdCh2YWx1ZSkgfHxcclxuICAgICAgdGhpcy5kZWVwXHJcbiAgICApIHtcclxuICAgICAgLy8gc2V0IG5ldyB2YWx1ZVxyXG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLnVzZXIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcclxuICAgICAgICAgICAgKFwiRXJyb3IgaW4gd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSxcclxuICAgICAgICAgICAgdGhpcy52bVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICBpZiAoY29uZmlnLmVycm9ySGFuZGxlcikge1xyXG4gICAgICAgICAgICBjb25maWcuZXJyb3JIYW5kbGVyLmNhbGwobnVsbCwgZSwgdGhpcy52bSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV2YWx1YXRlIHRoZSB2YWx1ZSBvZiB0aGUgd2F0Y2hlci5cclxuICogVGhpcyBvbmx5IGdldHMgY2FsbGVkIGZvciBsYXp5IHdhdGNoZXJzLlxyXG4gKi9cclxuV2F0Y2hlci5wcm90b3R5cGUuZXZhbHVhdGUgPSBmdW5jdGlvbiBldmFsdWF0ZSAoKSB7XHJcbiAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XHJcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlcGVuZCBvbiBhbGwgZGVwcyBjb2xsZWN0ZWQgYnkgdGhpcyB3YXRjaGVyLlxyXG4gKi9cclxuV2F0Y2hlci5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcclxuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XHJcbiAgd2hpbGUgKGktLSkge1xyXG4gICAgdGhpcyQxLmRlcHNbaV0uZGVwZW5kKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBzZWxmIGZyb20gYWxsIGRlcGVuZGVuY2llcycgc3Vic2NyaWJlciBsaXN0LlxyXG4gKi9cclxuV2F0Y2hlci5wcm90b3R5cGUudGVhcmRvd24gPSBmdW5jdGlvbiB0ZWFyZG93biAoKSB7XHJcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XHJcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XHJcbiAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgZXhwZW5zaXZlIG9wZXJhdGlvbiBzbyB3ZSBza2lwIGl0XHJcbiAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkIG9yIGlzIHBlcmZvcm1pbmcgYSB2LWZvclxyXG4gICAgLy8gcmUtcmVuZGVyICh0aGUgd2F0Y2hlciBsaXN0IGlzIHRoZW4gZmlsdGVyZWQgYnkgdi1mb3IpLlxyXG4gICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkICYmICF0aGlzLnZtLl92Rm9yUmVtb3ZpbmcpIHtcclxuICAgICAgcmVtb3ZlJDEodGhpcy52bS5fd2F0Y2hlcnMsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICB0aGlzJDEuZGVwc1tpXS5yZW1vdmVTdWIodGhpcyQxKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlIGFuIG9iamVjdCB0byBldm9rZSBhbGwgY29udmVydGVkXHJcbiAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XHJcbiAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXHJcbiAqL1xyXG52YXIgc2Vlbk9iamVjdHMgPSBuZXcgX1NldCgpO1xyXG5mdW5jdGlvbiB0cmF2ZXJzZSAodmFsKSB7XHJcbiAgc2Vlbk9iamVjdHMuY2xlYXIoKTtcclxuICBfdHJhdmVyc2UodmFsLCBzZWVuT2JqZWN0cyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF90cmF2ZXJzZSAodmFsLCBzZWVuKSB7XHJcbiAgdmFyIGksIGtleXM7XHJcbiAgdmFyIGlzQSA9IEFycmF5LmlzQXJyYXkodmFsKTtcclxuICBpZiAoKCFpc0EgJiYgIWlzT2JqZWN0KHZhbCkpIHx8ICFPYmplY3QuaXNFeHRlbnNpYmxlKHZhbCkpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBpZiAodmFsLl9fb2JfXykge1xyXG4gICAgdmFyIGRlcElkID0gdmFsLl9fb2JfXy5kZXAuaWQ7XHJcbiAgICBpZiAoc2Vlbi5oYXMoZGVwSWQpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgc2Vlbi5hZGQoZGVwSWQpO1xyXG4gIH1cclxuICBpZiAoaXNBKSB7XHJcbiAgICBpID0gdmFsLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pIHsgX3RyYXZlcnNlKHZhbFtpXSwgc2Vlbik7IH1cclxuICB9IGVsc2Uge1xyXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XHJcbiAgICBpID0ga2V5cy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoaS0tKSB7IF90cmF2ZXJzZSh2YWxba2V5c1tpXV0sIHNlZW4pOyB9XHJcbiAgfVxyXG59XHJcblxyXG4vKlxyXG4gKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGhcclxuICogZHluYW1pY2FsbHkgYWNjZXNzaW5nIG1ldGhvZHMgb24gQXJyYXkgcHJvdG90eXBlXHJcbiAqL1xyXG5cclxudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XHJcbnZhciBhcnJheU1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKGFycmF5UHJvdG8pO1tcclxuICAncHVzaCcsXHJcbiAgJ3BvcCcsXHJcbiAgJ3NoaWZ0JyxcclxuICAndW5zaGlmdCcsXHJcbiAgJ3NwbGljZScsXHJcbiAgJ3NvcnQnLFxyXG4gICdyZXZlcnNlJ1xyXG5dXHJcbi5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAvLyBjYWNoZSBvcmlnaW5hbCBtZXRob2RcclxuICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF07XHJcbiAgZGVmKGFycmF5TWV0aG9kcywgbWV0aG9kLCBmdW5jdGlvbiBtdXRhdG9yICgpIHtcclxuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcclxuXHJcbiAgICAvLyBhdm9pZCBsZWFraW5nIGFyZ3VtZW50czpcclxuICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb3N1cmUtd2l0aC1hcmd1bWVudHNcclxuICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGkpO1xyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzJDFbaV07XHJcbiAgICB9XHJcbiAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfXztcclxuICAgIHZhciBpbnNlcnRlZDtcclxuICAgIHN3aXRjaCAobWV0aG9kKSB7XHJcbiAgICAgIGNhc2UgJ3B1c2gnOlxyXG4gICAgICAgIGluc2VydGVkID0gYXJncztcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICd1bnNoaWZ0JzpcclxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3M7XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAnc3BsaWNlJzpcclxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMik7XHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuICAgIGlmIChpbnNlcnRlZCkgeyBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpOyB9XHJcbiAgICAvLyBub3RpZnkgY2hhbmdlXHJcbiAgICBvYi5kZXAubm90aWZ5KCk7XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuLyogICovXHJcblxyXG52YXIgYXJyYXlLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJyYXlNZXRob2RzKTtcclxuXHJcbi8qKlxyXG4gKiBCeSBkZWZhdWx0LCB3aGVuIGEgcmVhY3RpdmUgcHJvcGVydHkgaXMgc2V0LCB0aGUgbmV3IHZhbHVlIGlzXHJcbiAqIGFsc28gY29udmVydGVkIHRvIGJlY29tZSByZWFjdGl2ZS4gSG93ZXZlciB3aGVuIHBhc3NpbmcgZG93biBwcm9wcyxcclxuICogd2UgZG9uJ3Qgd2FudCB0byBmb3JjZSBjb252ZXJzaW9uIGJlY2F1c2UgdGhlIHZhbHVlIG1heSBiZSBhIG5lc3RlZCB2YWx1ZVxyXG4gKiB1bmRlciBhIGZyb3plbiBkYXRhIHN0cnVjdHVyZS4gQ29udmVydGluZyBpdCB3b3VsZCBkZWZlYXQgdGhlIG9wdGltaXphdGlvbi5cclxuICovXHJcbnZhciBvYnNlcnZlclN0YXRlID0ge1xyXG4gIHNob3VsZENvbnZlcnQ6IHRydWUsXHJcbiAgaXNTZXR0aW5nUHJvcHM6IGZhbHNlXHJcbn07XHJcblxyXG4vKipcclxuICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBhcmUgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxyXG4gKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0YXJnZXRcclxuICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcclxuICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoZXMgdXBkYXRlcy5cclxuICovXHJcbnZhciBPYnNlcnZlciA9IGZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSkge1xyXG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICB0aGlzLmRlcCA9IG5ldyBEZXAoKTtcclxuICB0aGlzLnZtQ291bnQgPSAwO1xyXG4gIGRlZih2YWx1ZSwgJ19fb2JfXycsIHRoaXMpO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgdmFyIGF1Z21lbnQgPSBoYXNQcm90b1xyXG4gICAgICA/IHByb3RvQXVnbWVudFxyXG4gICAgICA6IGNvcHlBdWdtZW50O1xyXG4gICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xyXG4gICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLndhbGsodmFsdWUpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBXYWxrIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSBhbmQgY29udmVydCB0aGVtIGludG9cclxuICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXHJcbiAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LlxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLndhbGsgPSBmdW5jdGlvbiB3YWxrIChvYmopIHtcclxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBkZWZpbmVSZWFjdGl2ZSQkMShvYmosIGtleXNbaV0sIG9ialtrZXlzW2ldXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9ic2VydmUgYSBsaXN0IG9mIEFycmF5IGl0ZW1zLlxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmVBcnJheSA9IGZ1bmN0aW9uIG9ic2VydmVBcnJheSAoaXRlbXMpIHtcclxuICBmb3IgKHZhciBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgb2JzZXJ2ZShpdGVtc1tpXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gaGVscGVyc1xyXG5cclxuLyoqXHJcbiAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcclxuICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cclxuICovXHJcbmZ1bmN0aW9uIHByb3RvQXVnbWVudCAodGFyZ2V0LCBzcmMpIHtcclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xyXG4gIHRhcmdldC5fX3Byb3RvX18gPSBzcmM7XHJcbiAgLyogZXNsaW50LWVuYWJsZSBuby1wcm90byAqL1xyXG59XHJcblxyXG4vKipcclxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXHJcbiAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxyXG4gKi9cclxuZnVuY3Rpb24gY29weUF1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgdmFyIGtleSA9IGtleXNbaV07XHJcbiAgICBkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcclxuICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcclxuICogb3IgdGhlIGV4aXN0aW5nIG9ic2VydmVyIGlmIHRoZSB2YWx1ZSBhbHJlYWR5IGhhcyBvbmUuXHJcbiAqL1xyXG5mdW5jdGlvbiBvYnNlcnZlICh2YWx1ZSkge1xyXG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgdmFyIG9iO1xyXG4gIGlmIChoYXNPd24odmFsdWUsICdfX29iX18nKSAmJiB2YWx1ZS5fX29iX18gaW5zdGFuY2VvZiBPYnNlcnZlcikge1xyXG4gICAgb2IgPSB2YWx1ZS5fX29iX187XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCAmJlxyXG4gICAgIWNvbmZpZy5faXNTZXJ2ZXIgJiZcclxuICAgIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqZWN0KHZhbHVlKSkgJiZcclxuICAgIE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpICYmXHJcbiAgICAhdmFsdWUuX2lzVnVlXHJcbiAgKSB7XHJcbiAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XHJcbiAgfVxyXG4gIHJldHVybiBvYlxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lIGEgcmVhY3RpdmUgcHJvcGVydHkgb24gYW4gT2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUkJDEgKFxyXG4gIG9iaixcclxuICBrZXksXHJcbiAgdmFsLFxyXG4gIGN1c3RvbVNldHRlclxyXG4pIHtcclxuICB2YXIgZGVwID0gbmV3IERlcCgpO1xyXG5cclxuICB2YXIgcHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcclxuICBpZiAocHJvcGVydHkgJiYgcHJvcGVydHkuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICAvLyBjYXRlciBmb3IgcHJlLWRlZmluZWQgZ2V0dGVyL3NldHRlcnNcclxuICB2YXIgZ2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuZ2V0O1xyXG4gIHZhciBzZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5zZXQ7XHJcblxyXG4gIHZhciBjaGlsZE9iID0gb2JzZXJ2ZSh2YWwpO1xyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIgKCkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsO1xyXG4gICAgICBpZiAoRGVwLnRhcmdldCkge1xyXG4gICAgICAgIGRlcC5kZXBlbmQoKTtcclxuICAgICAgICBpZiAoY2hpbGRPYikge1xyXG4gICAgICAgICAgY2hpbGRPYi5kZXAuZGVwZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgZGVwZW5kQXJyYXkodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWVcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlU2V0dGVyIChuZXdWYWwpIHtcclxuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcclxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlICovXHJcbiAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlIHx8IChuZXdWYWwgIT09IG5ld1ZhbCAmJiB2YWx1ZSAhPT0gdmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cclxuICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIGN1c3RvbVNldHRlcikge1xyXG4gICAgICAgIGN1c3RvbVNldHRlcigpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzZXR0ZXIpIHtcclxuICAgICAgICBzZXR0ZXIuY2FsbChvYmosIG5ld1ZhbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsID0gbmV3VmFsO1xyXG4gICAgICB9XHJcbiAgICAgIGNoaWxkT2IgPSBvYnNlcnZlKG5ld1ZhbCk7XHJcbiAgICAgIGRlcC5ub3RpZnkoKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBhIHByb3BlcnR5IG9uIGFuIG9iamVjdC4gQWRkcyB0aGUgbmV3IHByb3BlcnR5IGFuZFxyXG4gKiB0cmlnZ2VycyBjaGFuZ2Ugbm90aWZpY2F0aW9uIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0XHJcbiAqIGFscmVhZHkgZXhpc3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXQgKG9iaiwga2V5LCB2YWwpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICBvYmoubGVuZ3RoID0gTWF0aC5tYXgob2JqLmxlbmd0aCwga2V5KTtcclxuICAgIG9iai5zcGxpY2Uoa2V5LCAxLCB2YWwpO1xyXG4gICAgcmV0dXJuIHZhbFxyXG4gIH1cclxuICBpZiAoaGFzT3duKG9iaiwga2V5KSkge1xyXG4gICAgb2JqW2tleV0gPSB2YWw7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgdmFyIG9iID0gb2JqLl9fb2JfXztcclxuICBpZiAob2JqLl9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcclxuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXHJcbiAgICAgICdBdm9pZCBhZGRpbmcgcmVhY3RpdmUgcHJvcGVydGllcyB0byBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcclxuICAgICAgJ2F0IHJ1bnRpbWUgLSBkZWNsYXJlIGl0IHVwZnJvbnQgaW4gdGhlIGRhdGEgb3B0aW9uLidcclxuICAgICk7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgaWYgKCFvYikge1xyXG4gICAgb2JqW2tleV0gPSB2YWw7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgZGVmaW5lUmVhY3RpdmUkJDEob2IudmFsdWUsIGtleSwgdmFsKTtcclxuICBvYi5kZXAubm90aWZ5KCk7XHJcbiAgcmV0dXJuIHZhbFxyXG59XHJcblxyXG4vKipcclxuICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cclxuICovXHJcbmZ1bmN0aW9uIGRlbCAob2JqLCBrZXkpIHtcclxuICB2YXIgb2IgPSBvYmouX19vYl9fO1xyXG4gIGlmIChvYmouX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xyXG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcclxuICAgICAgJ0F2b2lkIGRlbGV0aW5nIHByb3BlcnRpZXMgb24gYSBWdWUgaW5zdGFuY2Ugb3IgaXRzIHJvb3QgJGRhdGEgJyArXHJcbiAgICAgICctIGp1c3Qgc2V0IGl0IHRvIG51bGwuJ1xyXG4gICAgKTtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBpZiAoIWhhc093bihvYmosIGtleSkpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBkZWxldGUgb2JqW2tleV07XHJcbiAgaWYgKCFvYikge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIG9iLmRlcC5ub3RpZnkoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbGxlY3QgZGVwZW5kZW5jaWVzIG9uIGFycmF5IGVsZW1lbnRzIHdoZW4gdGhlIGFycmF5IGlzIHRvdWNoZWQsIHNpbmNlXHJcbiAqIHdlIGNhbm5vdCBpbnRlcmNlcHQgYXJyYXkgZWxlbWVudCBhY2Nlc3MgbGlrZSBwcm9wZXJ0eSBnZXR0ZXJzLlxyXG4gKi9cclxuZnVuY3Rpb24gZGVwZW5kQXJyYXkgKHZhbHVlKSB7XHJcbiAgZm9yICh2YXIgZSA9ICh2b2lkIDApLCBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgZSA9IHZhbHVlW2ldO1xyXG4gICAgZSAmJiBlLl9fb2JfXyAmJiBlLl9fb2JfXy5kZXAuZGVwZW5kKCk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlKSkge1xyXG4gICAgICBkZXBlbmRBcnJheShlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gaW5pdFN0YXRlICh2bSkge1xyXG4gIHZtLl93YXRjaGVycyA9IFtdO1xyXG4gIGluaXRQcm9wcyh2bSk7XHJcbiAgaW5pdERhdGEodm0pO1xyXG4gIGluaXRDb21wdXRlZCh2bSk7XHJcbiAgaW5pdE1ldGhvZHModm0pO1xyXG4gIGluaXRXYXRjaCh2bSk7XHJcbn1cclxuXHJcbnZhciBpc1Jlc2VydmVkUHJvcCA9IG1ha2VNYXAoJ2tleSxyZWYsc2xvdCcpO1xyXG5cclxuZnVuY3Rpb24gaW5pdFByb3BzICh2bSkge1xyXG4gIHZhciBwcm9wcyA9IHZtLiRvcHRpb25zLnByb3BzO1xyXG4gIGlmIChwcm9wcykge1xyXG4gICAgdmFyIHByb3BzRGF0YSA9IHZtLiRvcHRpb25zLnByb3BzRGF0YSB8fCB7fTtcclxuICAgIHZhciBrZXlzID0gdm0uJG9wdGlvbnMuX3Byb3BLZXlzID0gT2JqZWN0LmtleXMocHJvcHMpO1xyXG4gICAgdmFyIGlzUm9vdCA9ICF2bS4kcGFyZW50O1xyXG4gICAgLy8gcm9vdCBpbnN0YW5jZSBwcm9wcyBzaG91bGQgYmUgY29udmVydGVkXHJcbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSBpc1Jvb3Q7XHJcbiAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICggaSApIHtcclxuICAgICAgdmFyIGtleSA9IGtleXNbaV07XHJcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoaXNSZXNlcnZlZFByb3Aoa2V5KSkge1xyXG4gICAgICAgICAgd2FybihcclxuICAgICAgICAgICAgKFwiXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIGEgcmVzZXJ2ZWQgYXR0cmlidXRlIGFuZCBjYW5ub3QgYmUgdXNlZCBhcyBjb21wb25lbnQgcHJvcC5cIiksXHJcbiAgICAgICAgICAgIHZtXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwga2V5LCB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wcywgcHJvcHNEYXRhLCB2bSksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmICh2bS4kcGFyZW50ICYmICFvYnNlcnZlclN0YXRlLmlzU2V0dGluZ1Byb3BzKSB7XHJcbiAgICAgICAgICAgIHdhcm4oXHJcbiAgICAgICAgICAgICAgXCJBdm9pZCBtdXRhdGluZyBhIHByb3AgZGlyZWN0bHkgc2luY2UgdGhlIHZhbHVlIHdpbGwgYmUgXCIgK1xyXG4gICAgICAgICAgICAgIFwib3ZlcndyaXR0ZW4gd2hlbmV2ZXIgdGhlIHBhcmVudCBjb21wb25lbnQgcmUtcmVuZGVycy4gXCIgK1xyXG4gICAgICAgICAgICAgIFwiSW5zdGVhZCwgdXNlIGEgZGF0YSBvciBjb21wdXRlZCBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcHJvcCdzIFwiICtcclxuICAgICAgICAgICAgICBcInZhbHVlLiBQcm9wIGJlaW5nIG11dGF0ZWQ6IFxcXCJcIiArIGtleSArIFwiXFxcIlwiLFxyXG4gICAgICAgICAgICAgIHZtXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSBsb29wKCBpICk7XHJcbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdERhdGEgKHZtKSB7XHJcbiAgdmFyIGRhdGEgPSB2bS4kb3B0aW9ucy5kYXRhO1xyXG4gIGRhdGEgPSB2bS5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nXHJcbiAgICA/IGRhdGEuY2FsbCh2bSlcclxuICAgIDogZGF0YSB8fCB7fTtcclxuICBpZiAoIWlzUGxhaW5PYmplY3QoZGF0YSkpIHtcclxuICAgIGRhdGEgPSB7fTtcclxuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXHJcbiAgICAgICdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdC4nLFxyXG4gICAgICB2bVxyXG4gICAgKTtcclxuICB9XHJcbiAgLy8gcHJveHkgZGF0YSBvbiBpbnN0YW5jZVxyXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XHJcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XHJcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcclxuICB3aGlsZSAoaS0tKSB7XHJcbiAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXlzW2ldKSkge1xyXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxyXG4gICAgICAgIFwiVGhlIGRhdGEgcHJvcGVydHkgXFxcIlwiICsgKGtleXNbaV0pICsgXCJcXFwiIGlzIGFscmVhZHkgZGVjbGFyZWQgYXMgYSBwcm9wLiBcIiArXHJcbiAgICAgICAgXCJVc2UgcHJvcCBkZWZhdWx0IHZhbHVlIGluc3RlYWQuXCIsXHJcbiAgICAgICAgdm1cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHByb3h5KHZtLCBrZXlzW2ldKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gb2JzZXJ2ZSBkYXRhXHJcbiAgb2JzZXJ2ZShkYXRhKTtcclxuICBkYXRhLl9fb2JfXyAmJiBkYXRhLl9fb2JfXy52bUNvdW50Kys7XHJcbn1cclxuXHJcbnZhciBjb21wdXRlZFNoYXJlZERlZmluaXRpb24gPSB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgZ2V0OiBub29wLFxyXG4gIHNldDogbm9vcFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaW5pdENvbXB1dGVkICh2bSkge1xyXG4gIHZhciBjb21wdXRlZCA9IHZtLiRvcHRpb25zLmNvbXB1dGVkO1xyXG4gIGlmIChjb21wdXRlZCkge1xyXG4gICAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XHJcbiAgICAgIHZhciB1c2VyRGVmID0gY29tcHV0ZWRba2V5XTtcclxuICAgICAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29tcHV0ZWRTaGFyZWREZWZpbml0aW9uLmdldCA9IG1ha2VDb21wdXRlZEdldHRlcih1c2VyRGVmLCB2bSk7XHJcbiAgICAgICAgY29tcHV0ZWRTaGFyZWREZWZpbml0aW9uLnNldCA9IG5vb3A7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29tcHV0ZWRTaGFyZWREZWZpbml0aW9uLmdldCA9IHVzZXJEZWYuZ2V0XHJcbiAgICAgICAgICA/IHVzZXJEZWYuY2FjaGUgIT09IGZhbHNlXHJcbiAgICAgICAgICAgID8gbWFrZUNvbXB1dGVkR2V0dGVyKHVzZXJEZWYuZ2V0LCB2bSlcclxuICAgICAgICAgICAgOiBiaW5kJDEodXNlckRlZi5nZXQsIHZtKVxyXG4gICAgICAgICAgOiBub29wO1xyXG4gICAgICAgIGNvbXB1dGVkU2hhcmVkRGVmaW5pdGlvbi5zZXQgPSB1c2VyRGVmLnNldFxyXG4gICAgICAgICAgPyBiaW5kJDEodXNlckRlZi5zZXQsIHZtKVxyXG4gICAgICAgICAgOiBub29wO1xyXG4gICAgICB9XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2bSwga2V5LCBjb21wdXRlZFNoYXJlZERlZmluaXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUNvbXB1dGVkR2V0dGVyIChnZXR0ZXIsIG93bmVyKSB7XHJcbiAgdmFyIHdhdGNoZXIgPSBuZXcgV2F0Y2hlcihvd25lciwgZ2V0dGVyLCBub29wLCB7XHJcbiAgICBsYXp5OiB0cnVlXHJcbiAgfSk7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbXB1dGVkR2V0dGVyICgpIHtcclxuICAgIGlmICh3YXRjaGVyLmRpcnR5KSB7XHJcbiAgICAgIHdhdGNoZXIuZXZhbHVhdGUoKTtcclxuICAgIH1cclxuICAgIGlmIChEZXAudGFyZ2V0KSB7XHJcbiAgICAgIHdhdGNoZXIuZGVwZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2F0Y2hlci52YWx1ZVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdE1ldGhvZHMgKHZtKSB7XHJcbiAgdmFyIG1ldGhvZHMgPSB2bS4kb3B0aW9ucy5tZXRob2RzO1xyXG4gIGlmIChtZXRob2RzKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xyXG4gICAgICB2bVtrZXldID0gbWV0aG9kc1trZXldID09IG51bGwgPyBub29wIDogYmluZCQxKG1ldGhvZHNba2V5XSwgdm0pO1xyXG4gICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgbWV0aG9kc1trZXldID09IG51bGwpIHtcclxuICAgICAgICB3YXJuKFxyXG4gICAgICAgICAgXCJtZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLiBcIiArXHJcbiAgICAgICAgICBcIkRpZCB5b3UgcmVmZXJlbmNlIHRoZSBmdW5jdGlvbiBjb3JyZWN0bHk/XCIsXHJcbiAgICAgICAgICB2bVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRXYXRjaCAodm0pIHtcclxuICB2YXIgd2F0Y2ggPSB2bS4kb3B0aW9ucy53YXRjaDtcclxuICBpZiAod2F0Y2gpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiB3YXRjaCkge1xyXG4gICAgICB2YXIgaGFuZGxlciA9IHdhdGNoW2tleV07XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhbmRsZXIpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVXYXRjaGVyICh2bSwga2V5LCBoYW5kbGVyKSB7XHJcbiAgdmFyIG9wdGlvbnM7XHJcbiAgaWYgKGlzUGxhaW5PYmplY3QoaGFuZGxlcikpIHtcclxuICAgIG9wdGlvbnMgPSBoYW5kbGVyO1xyXG4gICAgaGFuZGxlciA9IGhhbmRsZXIuaGFuZGxlcjtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJykge1xyXG4gICAgaGFuZGxlciA9IHZtW2hhbmRsZXJdO1xyXG4gIH1cclxuICB2bS4kd2F0Y2goa2V5LCBoYW5kbGVyLCBvcHRpb25zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhdGVNaXhpbiAoVnVlKSB7XHJcbiAgLy8gZmxvdyBzb21laG93IGhhcyBwcm9ibGVtcyB3aXRoIGRpcmVjdGx5IGRlY2xhcmVkIGRlZmluaXRpb24gb2JqZWN0XHJcbiAgLy8gd2hlbiB1c2luZyBPYmplY3QuZGVmaW5lUHJvcGVydHksIHNvIHdlIGhhdmUgdG8gcHJvY2VkdXJhbGx5IGJ1aWxkIHVwXHJcbiAgLy8gdGhlIG9iamVjdCBoZXJlLlxyXG4gIHZhciBkYXRhRGVmID0ge307XHJcbiAgZGF0YURlZi5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gIH07XHJcbiAge1xyXG4gICAgZGF0YURlZi5zZXQgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xyXG4gICAgICB3YXJuKFxyXG4gICAgICAgICdBdm9pZCByZXBsYWNpbmcgaW5zdGFuY2Ugcm9vdCAkZGF0YS4gJyArXHJcbiAgICAgICAgJ1VzZSBuZXN0ZWQgZGF0YSBwcm9wZXJ0aWVzIGluc3RlYWQuJyxcclxuICAgICAgICB0aGlzXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRkYXRhJywgZGF0YURlZik7XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuJHNldCA9IHNldDtcclxuICBWdWUucHJvdG90eXBlLiRkZWxldGUgPSBkZWw7XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuJHdhdGNoID0gZnVuY3Rpb24gKFxyXG4gICAgZXhwT3JGbixcclxuICAgIGNiLFxyXG4gICAgb3B0aW9uc1xyXG4gICkge1xyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgb3B0aW9ucy51c2VyID0gdHJ1ZTtcclxuICAgIHZhciB3YXRjaGVyID0gbmV3IFdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKTtcclxuICAgIGlmIChvcHRpb25zLmltbWVkaWF0ZSkge1xyXG4gICAgICBjYi5jYWxsKHZtLCB3YXRjaGVyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiB1bndhdGNoRm4gKCkge1xyXG4gICAgICB3YXRjaGVyLnRlYXJkb3duKCk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJveHkgKHZtLCBrZXkpIHtcclxuICBpZiAoIWlzUmVzZXJ2ZWQoa2V5KSkge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZtLCBrZXksIHtcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcclxuICAgICAgICByZXR1cm4gdm0uX2RhdGFba2V5XVxyXG4gICAgICB9LFxyXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHByb3h5U2V0dGVyICh2YWwpIHtcclxuICAgICAgICB2bS5fZGF0YVtrZXldID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxudmFyIFZOb2RlID0gZnVuY3Rpb24gVk5vZGUgKFxyXG4gIHRhZyxcclxuICBkYXRhLFxyXG4gIGNoaWxkcmVuLFxyXG4gIHRleHQsXHJcbiAgZWxtLFxyXG4gIG5zLFxyXG4gIGNvbnRleHQsXHJcbiAgY29tcG9uZW50T3B0aW9uc1xyXG4pIHtcclxuICB0aGlzLnRhZyA9IHRhZztcclxuICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gIHRoaXMuZWxtID0gZWxtO1xyXG4gIHRoaXMubnMgPSBucztcclxuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gIHRoaXMuZnVuY3Rpb25hbENvbnRleHQgPSB1bmRlZmluZWQ7XHJcbiAgdGhpcy5rZXkgPSBkYXRhICYmIGRhdGEua2V5O1xyXG4gIHRoaXMuY29tcG9uZW50T3B0aW9ucyA9IGNvbXBvbmVudE9wdGlvbnM7XHJcbiAgdGhpcy5jaGlsZCA9IHVuZGVmaW5lZDtcclxuICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICB0aGlzLnJhdyA9IGZhbHNlO1xyXG4gIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcclxuICB0aGlzLmlzUm9vdEluc2VydCA9IHRydWU7XHJcbiAgdGhpcy5pc0NvbW1lbnQgPSBmYWxzZTtcclxuICB0aGlzLmlzQ2xvbmVkID0gZmFsc2U7XHJcbiAgdGhpcy5pc09uY2UgPSBmYWxzZTtcclxufTtcclxuXHJcbnZhciBlbXB0eVZOb2RlID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBub2RlID0gbmV3IFZOb2RlKCk7XHJcbiAgbm9kZS50ZXh0ID0gJyc7XHJcbiAgbm9kZS5pc0NvbW1lbnQgPSB0cnVlO1xyXG4gIHJldHVybiBub2RlXHJcbn07XHJcblxyXG4vLyBvcHRpbWl6ZWQgc2hhbGxvdyBjbG9uZVxyXG4vLyB1c2VkIGZvciBzdGF0aWMgbm9kZXMgYW5kIHNsb3Qgbm9kZXMgYmVjYXVzZSB0aGV5IG1heSBiZSByZXVzZWQgYWNyb3NzXHJcbi8vIG11bHRpcGxlIHJlbmRlcnMsIGNsb25pbmcgdGhlbSBhdm9pZHMgZXJyb3JzIHdoZW4gRE9NIG1hbmlwdWxhdGlvbnMgcmVseVxyXG4vLyBvbiB0aGVpciBlbG0gcmVmZXJlbmNlLlxyXG5mdW5jdGlvbiBjbG9uZVZOb2RlICh2bm9kZSkge1xyXG4gIHZhciBjbG9uZWQgPSBuZXcgVk5vZGUoXHJcbiAgICB2bm9kZS50YWcsXHJcbiAgICB2bm9kZS5kYXRhLFxyXG4gICAgdm5vZGUuY2hpbGRyZW4sXHJcbiAgICB2bm9kZS50ZXh0LFxyXG4gICAgdm5vZGUuZWxtLFxyXG4gICAgdm5vZGUubnMsXHJcbiAgICB2bm9kZS5jb250ZXh0LFxyXG4gICAgdm5vZGUuY29tcG9uZW50T3B0aW9uc1xyXG4gICk7XHJcbiAgY2xvbmVkLmlzU3RhdGljID0gdm5vZGUuaXNTdGF0aWM7XHJcbiAgY2xvbmVkLmtleSA9IHZub2RlLmtleTtcclxuICBjbG9uZWQuaXNDbG9uZWQgPSB0cnVlO1xyXG4gIHJldHVybiBjbG9uZWRcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvbmVWTm9kZXMgKHZub2Rlcykge1xyXG4gIHZhciByZXMgPSBuZXcgQXJyYXkodm5vZGVzLmxlbmd0aCk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHJlc1tpXSA9IGNsb25lVk5vZGUodm5vZGVzW2ldKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbmZ1bmN0aW9uIG1lcmdlVk5vZGVIb29rIChkZWYsIGhvb2tLZXksIGhvb2ssIGtleSkge1xyXG4gIGtleSA9IGtleSArIGhvb2tLZXk7XHJcbiAgdmFyIGluamVjdGVkSGFzaCA9IGRlZi5fX2luamVjdGVkIHx8IChkZWYuX19pbmplY3RlZCA9IHt9KTtcclxuICBpZiAoIWluamVjdGVkSGFzaFtrZXldKSB7XHJcbiAgICBpbmplY3RlZEhhc2hba2V5XSA9IHRydWU7XHJcbiAgICB2YXIgb2xkSG9vayA9IGRlZltob29rS2V5XTtcclxuICAgIGlmIChvbGRIb29rKSB7XHJcbiAgICAgIGRlZltob29rS2V5XSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvbGRIb29rLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgaG9vay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGVmW2hvb2tLZXldID0gaG9vaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGlzdGVuZXJzIChcclxuICBvbixcclxuICBvbGRPbixcclxuICBhZGQsXHJcbiAgcmVtb3ZlJCQxLFxyXG4gIHZtXHJcbikge1xyXG4gIHZhciBuYW1lLCBjdXIsIG9sZCwgZm4sIGV2ZW50LCBjYXB0dXJlO1xyXG4gIGZvciAobmFtZSBpbiBvbikge1xyXG4gICAgY3VyID0gb25bbmFtZV07XHJcbiAgICBvbGQgPSBvbGRPbltuYW1lXTtcclxuICAgIGlmICghY3VyKSB7XHJcbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXHJcbiAgICAgICAgXCJJbnZhbGlkIGhhbmRsZXIgZm9yIGV2ZW50IFxcXCJcIiArIG5hbWUgKyBcIlxcXCI6IGdvdCBcIiArIFN0cmluZyhjdXIpLFxyXG4gICAgICAgIHZtXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKCFvbGQpIHtcclxuICAgICAgY2FwdHVyZSA9IG5hbWUuY2hhckF0KDApID09PSAnISc7XHJcbiAgICAgIGV2ZW50ID0gY2FwdHVyZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXIpKSB7XHJcbiAgICAgICAgYWRkKGV2ZW50LCAoY3VyLmludm9rZXIgPSBhcnJJbnZva2VyKGN1cikpLCBjYXB0dXJlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWN1ci5pbnZva2VyKSB7XHJcbiAgICAgICAgICBmbiA9IGN1cjtcclxuICAgICAgICAgIGN1ciA9IG9uW25hbWVdID0ge307XHJcbiAgICAgICAgICBjdXIuZm4gPSBmbjtcclxuICAgICAgICAgIGN1ci5pbnZva2VyID0gZm5JbnZva2VyKGN1cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkZChldmVudCwgY3VyLmludm9rZXIsIGNhcHR1cmUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGN1ciAhPT0gb2xkKSB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9sZCkpIHtcclxuICAgICAgICBvbGQubGVuZ3RoID0gY3VyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZC5sZW5ndGg7IGkrKykgeyBvbGRbaV0gPSBjdXJbaV07IH1cclxuICAgICAgICBvbltuYW1lXSA9IG9sZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvbGQuZm4gPSBjdXI7XHJcbiAgICAgICAgb25bbmFtZV0gPSBvbGQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChuYW1lIGluIG9sZE9uKSB7XHJcbiAgICBpZiAoIW9uW25hbWVdKSB7XHJcbiAgICAgIGV2ZW50ID0gbmFtZS5jaGFyQXQoMCkgPT09ICchJyA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xyXG4gICAgICByZW1vdmUkJDEoZXZlbnQsIG9sZE9uW25hbWVdLmludm9rZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXJySW52b2tlciAoYXJyKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChldikge1xyXG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xyXG5cclxuICAgIHZhciBzaW5nbGUgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2luZ2xlID8gYXJyW2ldKGV2KSA6IGFycltpXS5hcHBseShudWxsLCBhcmd1bWVudHMkMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmbkludm9rZXIgKG8pIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICB2YXIgc2luZ2xlID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMTtcclxuICAgIHNpbmdsZSA/IG8uZm4oZXYpIDogby5mbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gIH1cclxufVxyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVDaGlsZHJlbiAoXHJcbiAgY2hpbGRyZW4sXHJcbiAgbnMsXHJcbiAgbmVzdGVkSW5kZXhcclxuKSB7XHJcbiAgaWYgKGlzUHJpbWl0aXZlKGNoaWxkcmVuKSkge1xyXG4gICAgcmV0dXJuIFtjcmVhdGVUZXh0Vk5vZGUoY2hpbGRyZW4pXVxyXG4gIH1cclxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcclxuICAgIHZhciByZXMgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIHZhciBjID0gY2hpbGRyZW5baV07XHJcbiAgICAgIHZhciBsYXN0ID0gcmVzW3Jlcy5sZW5ndGggLSAxXTtcclxuICAgICAgLy8gIG5lc3RlZFxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkge1xyXG4gICAgICAgIHJlcy5wdXNoLmFwcGx5KHJlcywgbm9ybWFsaXplQ2hpbGRyZW4oYywgbnMsICgobmVzdGVkSW5kZXggfHwgJycpICsgXCJfXCIgKyBpKSkpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzUHJpbWl0aXZlKGMpKSB7XHJcbiAgICAgICAgaWYgKGxhc3QgJiYgbGFzdC50ZXh0KSB7XHJcbiAgICAgICAgICBsYXN0LnRleHQgKz0gU3RyaW5nKGMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYyAhPT0gJycpIHtcclxuICAgICAgICAgIC8vIGNvbnZlcnQgcHJpbWl0aXZlIHRvIHZub2RlXHJcbiAgICAgICAgICByZXMucHVzaChjcmVhdGVUZXh0Vk5vZGUoYykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChjIGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgICAgICBpZiAoYy50ZXh0ICYmIGxhc3QgJiYgbGFzdC50ZXh0KSB7XHJcbiAgICAgICAgICBpZiAoIWxhc3QuaXNDbG9uZWQpIHtcclxuICAgICAgICAgICAgbGFzdC50ZXh0ICs9IGMudGV4dDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gaW5oZXJpdCBwYXJlbnQgbmFtZXNwYWNlXHJcbiAgICAgICAgICBpZiAobnMpIHtcclxuICAgICAgICAgICAgYXBwbHlOUyhjLCBucyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBkZWZhdWx0IGtleSBmb3IgbmVzdGVkIGFycmF5IGNoaWxkcmVuIChsaWtlbHkgZ2VuZXJhdGVkIGJ5IHYtZm9yKVxyXG4gICAgICAgICAgaWYgKGMudGFnICYmIGMua2V5ID09IG51bGwgJiYgbmVzdGVkSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjLmtleSA9IFwiX192bGlzdFwiICsgbmVzdGVkSW5kZXggKyBcIl9cIiArIGkgKyBcIl9fXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXMucHVzaChjKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXNcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRleHRWTm9kZSAodmFsKSB7XHJcbiAgcmV0dXJuIG5ldyBWTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBTdHJpbmcodmFsKSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlOUyAodm5vZGUsIG5zKSB7XHJcbiAgaWYgKHZub2RlLnRhZyAmJiAhdm5vZGUubnMpIHtcclxuICAgIHZub2RlLm5zID0gbnM7XHJcbiAgICBpZiAodm5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBhcHBseU5TKHZub2RlLmNoaWxkcmVuW2ldLCBucyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZCAoY2hpbGRyZW4pIHtcclxuICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjICYmIGMuY29tcG9uZW50T3B0aW9uczsgfSlbMF1cclxufVxyXG5cclxuLyogICovXHJcblxyXG52YXIgYWN0aXZlSW5zdGFuY2UgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gaW5pdExpZmVjeWNsZSAodm0pIHtcclxuICB2YXIgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xyXG5cclxuICAvLyBsb2NhdGUgZmlyc3Qgbm9uLWFic3RyYWN0IHBhcmVudFxyXG4gIHZhciBwYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcclxuICBpZiAocGFyZW50ICYmICFvcHRpb25zLmFic3RyYWN0KSB7XHJcbiAgICB3aGlsZSAocGFyZW50LiRvcHRpb25zLmFic3RyYWN0ICYmIHBhcmVudC4kcGFyZW50KSB7XHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC4kcGFyZW50O1xyXG4gICAgfVxyXG4gICAgcGFyZW50LiRjaGlsZHJlbi5wdXNoKHZtKTtcclxuICB9XHJcblxyXG4gIHZtLiRwYXJlbnQgPSBwYXJlbnQ7XHJcbiAgdm0uJHJvb3QgPSBwYXJlbnQgPyBwYXJlbnQuJHJvb3QgOiB2bTtcclxuXHJcbiAgdm0uJGNoaWxkcmVuID0gW107XHJcbiAgdm0uJHJlZnMgPSB7fTtcclxuXHJcbiAgdm0uX3dhdGNoZXIgPSBudWxsO1xyXG4gIHZtLl9pbmFjdGl2ZSA9IGZhbHNlO1xyXG4gIHZtLl9pc01vdW50ZWQgPSBmYWxzZTtcclxuICB2bS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcclxuICB2bS5faXNCZWluZ0Rlc3Ryb3llZCA9IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsaWZlY3ljbGVNaXhpbiAoVnVlKSB7XHJcbiAgVnVlLnByb3RvdHlwZS5fbW91bnQgPSBmdW5jdGlvbiAoXHJcbiAgICBlbCxcclxuICAgIGh5ZHJhdGluZ1xyXG4gICkge1xyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLiRlbCA9IGVsO1xyXG4gICAgaWYgKCF2bS4kb3B0aW9ucy5yZW5kZXIpIHtcclxuICAgICAgdm0uJG9wdGlvbnMucmVuZGVyID0gZW1wdHlWTm9kZTtcclxuICAgICAge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh2bS4kb3B0aW9ucy50ZW1wbGF0ZSAmJiB2bS4kb3B0aW9ucy50ZW1wbGF0ZS5jaGFyQXQoMCkgIT09ICcjJykge1xyXG4gICAgICAgICAgd2FybihcclxuICAgICAgICAgICAgJ1lvdSBhcmUgdXNpbmcgdGhlIHJ1bnRpbWUtb25seSBidWlsZCBvZiBWdWUgd2hlcmUgdGhlIHRlbXBsYXRlICcgK1xyXG4gICAgICAgICAgICAnb3B0aW9uIGlzIG5vdCBhdmFpbGFibGUuIEVpdGhlciBwcmUtY29tcGlsZSB0aGUgdGVtcGxhdGVzIGludG8gJyArXHJcbiAgICAgICAgICAgICdyZW5kZXIgZnVuY3Rpb25zLCBvciB1c2UgdGhlIGNvbXBpbGVyLWluY2x1ZGVkIGJ1aWxkLicsXHJcbiAgICAgICAgICAgIHZtXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3YXJuKFxyXG4gICAgICAgICAgICAnRmFpbGVkIHRvIG1vdW50IGNvbXBvbmVudDogdGVtcGxhdGUgb3IgcmVuZGVyIGZ1bmN0aW9uIG5vdCBkZWZpbmVkLicsXHJcbiAgICAgICAgICAgIHZtXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVNb3VudCcpO1xyXG4gICAgdm0uX3dhdGNoZXIgPSBuZXcgV2F0Y2hlcih2bSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICB2bS5fdXBkYXRlKHZtLl9yZW5kZXIoKSwgaHlkcmF0aW5nKTtcclxuICAgIH0sIG5vb3ApO1xyXG4gICAgaHlkcmF0aW5nID0gZmFsc2U7XHJcbiAgICAvLyBtYW51YWxseSBtb3VudGVkIGluc3RhbmNlLCBjYWxsIG1vdW50ZWQgb24gc2VsZlxyXG4gICAgLy8gbW91bnRlZCBpcyBjYWxsZWQgZm9yIHJlbmRlci1jcmVhdGVkIGNoaWxkIGNvbXBvbmVudHMgaW4gaXRzIGluc2VydGVkIGhvb2tcclxuICAgIGlmICh2bS4kdm5vZGUgPT0gbnVsbCkge1xyXG4gICAgICB2bS5faXNNb3VudGVkID0gdHJ1ZTtcclxuICAgICAgY2FsbEhvb2sodm0sICdtb3VudGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdm1cclxuICB9O1xyXG5cclxuICBWdWUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodm5vZGUsIGh5ZHJhdGluZykge1xyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIGlmICh2bS5faXNNb3VudGVkKSB7XHJcbiAgICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlVXBkYXRlJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgcHJldkVsID0gdm0uJGVsO1xyXG4gICAgdmFyIHByZXZBY3RpdmVJbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlO1xyXG4gICAgYWN0aXZlSW5zdGFuY2UgPSB2bTtcclxuICAgIHZhciBwcmV2Vm5vZGUgPSB2bS5fdm5vZGU7XHJcbiAgICB2bS5fdm5vZGUgPSB2bm9kZTtcclxuICAgIGlmICghcHJldlZub2RlKSB7XHJcbiAgICAgIC8vIFZ1ZS5wcm90b3R5cGUuX19wYXRjaF9fIGlzIGluamVjdGVkIGluIGVudHJ5IHBvaW50c1xyXG4gICAgICAvLyBiYXNlZCBvbiB0aGUgcmVuZGVyaW5nIGJhY2tlbmQgdXNlZC5cclxuICAgICAgdm0uJGVsID0gdm0uX19wYXRjaF9fKHZtLiRlbCwgdm5vZGUsIGh5ZHJhdGluZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18ocHJldlZub2RlLCB2bm9kZSk7XHJcbiAgICB9XHJcbiAgICBhY3RpdmVJbnN0YW5jZSA9IHByZXZBY3RpdmVJbnN0YW5jZTtcclxuICAgIC8vIHVwZGF0ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxyXG4gICAgaWYgKHByZXZFbCkge1xyXG4gICAgICBwcmV2RWwuX192dWVfXyA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodm0uJGVsKSB7XHJcbiAgICAgIHZtLiRlbC5fX3Z1ZV9fID0gdm07XHJcbiAgICB9XHJcbiAgICAvLyBpZiBwYXJlbnQgaXMgYW4gSE9DLCB1cGRhdGUgaXRzICRlbCBhcyB3ZWxsXHJcbiAgICBpZiAodm0uJHZub2RlICYmIHZtLiRwYXJlbnQgJiYgdm0uJHZub2RlID09PSB2bS4kcGFyZW50Ll92bm9kZSkge1xyXG4gICAgICB2bS4kcGFyZW50LiRlbCA9IHZtLiRlbDtcclxuICAgIH1cclxuICAgIGlmICh2bS5faXNNb3VudGVkKSB7XHJcbiAgICAgIGNhbGxIb29rKHZtLCAndXBkYXRlZCcpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX3VwZGF0ZUZyb21QYXJlbnQgPSBmdW5jdGlvbiAoXHJcbiAgICBwcm9wc0RhdGEsXHJcbiAgICBsaXN0ZW5lcnMsXHJcbiAgICBwYXJlbnRWbm9kZSxcclxuICAgIHJlbmRlckNoaWxkcmVuXHJcbiAgKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdmFyIGhhc0NoaWxkcmVuID0gISEodm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuIHx8IHJlbmRlckNoaWxkcmVuKTtcclxuICAgIHZtLiRvcHRpb25zLl9wYXJlbnRWbm9kZSA9IHBhcmVudFZub2RlO1xyXG4gICAgdm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuID0gcmVuZGVyQ2hpbGRyZW47XHJcbiAgICAvLyB1cGRhdGUgcHJvcHNcclxuICAgIGlmIChwcm9wc0RhdGEgJiYgdm0uJG9wdGlvbnMucHJvcHMpIHtcclxuICAgICAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ID0gZmFsc2U7XHJcbiAgICAgIHtcclxuICAgICAgICBvYnNlcnZlclN0YXRlLmlzU2V0dGluZ1Byb3BzID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgcHJvcEtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgfHwgW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcEtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gcHJvcEtleXNbaV07XHJcbiAgICAgICAgdm1ba2V5XSA9IHZhbGlkYXRlUHJvcChrZXksIHZtLiRvcHRpb25zLnByb3BzLCBwcm9wc0RhdGEsIHZtKTtcclxuICAgICAgfVxyXG4gICAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSB0cnVlO1xyXG4gICAgICB7XHJcbiAgICAgICAgb2JzZXJ2ZXJTdGF0ZS5pc1NldHRpbmdQcm9wcyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHZtLiRvcHRpb25zLnByb3BzRGF0YSA9IHByb3BzRGF0YTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSBsaXN0ZW5lcnNcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgdmFyIG9sZExpc3RlbmVycyA9IHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XHJcbiAgICAgIHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgPSBsaXN0ZW5lcnM7XHJcbiAgICAgIHZtLl91cGRhdGVMaXN0ZW5lcnMobGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMpO1xyXG4gICAgfVxyXG4gICAgLy8gcmVzb2x2ZSBzbG90cyArIGZvcmNlIHVwZGF0ZSBpZiBoYXMgY2hpbGRyZW5cclxuICAgIGlmIChoYXNDaGlsZHJlbikge1xyXG4gICAgICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMocmVuZGVyQ2hpbGRyZW4sIHZtLl9yZW5kZXJDb250ZXh0KTtcclxuICAgICAgdm0uJGZvcmNlVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS4kZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgaWYgKHZtLl93YXRjaGVyKSB7XHJcbiAgICAgIHZtLl93YXRjaGVyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuJGRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgaWYgKHZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVEZXN0cm95Jyk7XHJcbiAgICB2bS5faXNCZWluZ0Rlc3Ryb3llZCA9IHRydWU7XHJcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHBhcmVudFxyXG4gICAgdmFyIHBhcmVudCA9IHZtLiRwYXJlbnQ7XHJcbiAgICBpZiAocGFyZW50ICYmICFwYXJlbnQuX2lzQmVpbmdEZXN0cm95ZWQgJiYgIXZtLiRvcHRpb25zLmFic3RyYWN0KSB7XHJcbiAgICAgIHJlbW92ZSQxKHBhcmVudC4kY2hpbGRyZW4sIHZtKTtcclxuICAgIH1cclxuICAgIC8vIHRlYXJkb3duIHdhdGNoZXJzXHJcbiAgICBpZiAodm0uX3dhdGNoZXIpIHtcclxuICAgICAgdm0uX3dhdGNoZXIudGVhcmRvd24oKTtcclxuICAgIH1cclxuICAgIHZhciBpID0gdm0uX3dhdGNoZXJzLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgdm0uX3dhdGNoZXJzW2ldLnRlYXJkb3duKCk7XHJcbiAgICB9XHJcbiAgICAvLyByZW1vdmUgcmVmZXJlbmNlIGZyb20gZGF0YSBvYlxyXG4gICAgLy8gZnJvemVuIG9iamVjdCBtYXkgbm90IGhhdmUgb2JzZXJ2ZXIuXHJcbiAgICBpZiAodm0uX2RhdGEuX19vYl9fKSB7XHJcbiAgICAgIHZtLl9kYXRhLl9fb2JfXy52bUNvdW50LS07XHJcbiAgICB9XHJcbiAgICAvLyBjYWxsIHRoZSBsYXN0IGhvb2suLi5cclxuICAgIHZtLl9pc0Rlc3Ryb3llZCA9IHRydWU7XHJcbiAgICBjYWxsSG9vayh2bSwgJ2Rlc3Ryb3llZCcpO1xyXG4gICAgLy8gdHVybiBvZmYgYWxsIGluc3RhbmNlIGxpc3RlbmVycy5cclxuICAgIHZtLiRvZmYoKTtcclxuICAgIC8vIHJlbW92ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxyXG4gICAgaWYgKHZtLiRlbCkge1xyXG4gICAgICB2bS4kZWwuX192dWVfXyA9IG51bGw7XHJcbiAgICB9XHJcbiAgICAvLyBpbnZva2UgZGVzdHJveSBob29rcyBvbiBjdXJyZW50IHJlbmRlcmVkIHRyZWVcclxuICAgIHZtLl9fcGF0Y2hfXyh2bS5fdm5vZGUsIG51bGwpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGxIb29rICh2bSwgaG9vaykge1xyXG4gIHZhciBoYW5kbGVycyA9IHZtLiRvcHRpb25zW2hvb2tdO1xyXG4gIGlmIChoYW5kbGVycykge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgaGFuZGxlcnNbaV0uY2FsbCh2bSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHZtLiRlbWl0KCdob29rOicgKyBob29rKTtcclxufVxyXG5cclxuLyogICovXHJcblxyXG52YXIgaG9va3MgPSB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCwgaW5zZXJ0OiBpbnNlcnQsIGRlc3Ryb3k6IGRlc3Ryb3kkMSB9O1xyXG52YXIgaG9va3NUb01lcmdlID0gT2JqZWN0LmtleXMoaG9va3MpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50IChcclxuICBDdG9yLFxyXG4gIGRhdGEsXHJcbiAgY29udGV4dCxcclxuICBjaGlsZHJlbixcclxuICB0YWdcclxuKSB7XHJcbiAgaWYgKCFDdG9yKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIHZhciBiYXNlQ3RvciA9IGNvbnRleHQuJG9wdGlvbnMuX2Jhc2U7XHJcbiAgaWYgKGlzT2JqZWN0KEN0b3IpKSB7XHJcbiAgICBDdG9yID0gYmFzZUN0b3IuZXh0ZW5kKEN0b3IpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBDdG9yICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB7XHJcbiAgICAgIHdhcm4oKFwiSW52YWxpZCBDb21wb25lbnQgZGVmaW5pdGlvbjogXCIgKyAoU3RyaW5nKEN0b3IpKSksIGNvbnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICAvLyBhc3luYyBjb21wb25lbnRcclxuICBpZiAoIUN0b3IuY2lkKSB7XHJcbiAgICBpZiAoQ3Rvci5yZXNvbHZlZCkge1xyXG4gICAgICBDdG9yID0gQ3Rvci5yZXNvbHZlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEN0b3IgPSByZXNvbHZlQXN5bmNDb21wb25lbnQoQ3RvciwgYmFzZUN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBpdCdzIG9rIHRvIHF1ZXVlIHRoaXMgb24gZXZlcnkgcmVuZGVyIGJlY2F1c2VcclxuICAgICAgICAvLyAkZm9yY2VVcGRhdGUgaXMgYnVmZmVyZWQgYnkgdGhlIHNjaGVkdWxlci5cclxuICAgICAgICBjb250ZXh0LiRmb3JjZVVwZGF0ZSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFDdG9yKSB7XHJcbiAgICAgICAgLy8gcmV0dXJuIG5vdGhpbmcgaWYgdGhpcyBpcyBpbmRlZWQgYW4gYXN5bmMgY29tcG9uZW50XHJcbiAgICAgICAgLy8gd2FpdCBmb3IgdGhlIGNhbGxiYWNrIHRvIHRyaWdnZXIgcGFyZW50IHVwZGF0ZS5cclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcmVzb2x2ZSBjb25zdHJ1Y3RvciBvcHRpb25zIGluIGNhc2UgZ2xvYmFsIG1peGlucyBhcmUgYXBwbGllZCBhZnRlclxyXG4gIC8vIGNvbXBvbmVudCBjb25zdHJ1Y3RvciBjcmVhdGlvblxyXG4gIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMoQ3Rvcik7XHJcblxyXG4gIGRhdGEgPSBkYXRhIHx8IHt9O1xyXG5cclxuICAvLyBleHRyYWN0IHByb3BzXHJcbiAgdmFyIHByb3BzRGF0YSA9IGV4dHJhY3RQcm9wcyhkYXRhLCBDdG9yKTtcclxuXHJcbiAgLy8gZnVuY3Rpb25hbCBjb21wb25lbnRcclxuICBpZiAoQ3Rvci5vcHRpb25zLmZ1bmN0aW9uYWwpIHtcclxuICAgIHJldHVybiBjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50KEN0b3IsIHByb3BzRGF0YSwgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pXHJcbiAgfVxyXG5cclxuICAvLyBleHRyYWN0IGxpc3RlbmVycywgc2luY2UgdGhlc2UgbmVlZHMgdG8gYmUgdHJlYXRlZCBhc1xyXG4gIC8vIGNoaWxkIGNvbXBvbmVudCBsaXN0ZW5lcnMgaW5zdGVhZCBvZiBET00gbGlzdGVuZXJzXHJcbiAgdmFyIGxpc3RlbmVycyA9IGRhdGEub247XHJcbiAgLy8gcmVwbGFjZSB3aXRoIGxpc3RlbmVycyB3aXRoIC5uYXRpdmUgbW9kaWZpZXJcclxuICBkYXRhLm9uID0gZGF0YS5uYXRpdmVPbjtcclxuXHJcbiAgaWYgKEN0b3Iub3B0aW9ucy5hYnN0cmFjdCkge1xyXG4gICAgLy8gYWJzdHJhY3QgY29tcG9uZW50cyBkbyBub3Qga2VlcCBhbnl0aGluZ1xyXG4gICAgLy8gb3RoZXIgdGhhbiBwcm9wcyAmIGxpc3RlbmVyc1xyXG4gICAgZGF0YSA9IHt9O1xyXG4gIH1cclxuXHJcbiAgLy8gbWVyZ2UgY29tcG9uZW50IG1hbmFnZW1lbnQgaG9va3Mgb250byB0aGUgcGxhY2Vob2xkZXIgbm9kZVxyXG4gIG1lcmdlSG9va3MoZGF0YSk7XHJcblxyXG4gIC8vIHJldHVybiBhIHBsYWNlaG9sZGVyIHZub2RlXHJcbiAgdmFyIG5hbWUgPSBDdG9yLm9wdGlvbnMubmFtZSB8fCB0YWc7XHJcbiAgdmFyIHZub2RlID0gbmV3IFZOb2RlKFxyXG4gICAgKFwidnVlLWNvbXBvbmVudC1cIiArIChDdG9yLmNpZCkgKyAobmFtZSA/IChcIi1cIiArIG5hbWUpIDogJycpKSxcclxuICAgIGRhdGEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dCxcclxuICAgIHsgQ3RvcjogQ3RvciwgcHJvcHNEYXRhOiBwcm9wc0RhdGEsIGxpc3RlbmVyczogbGlzdGVuZXJzLCB0YWc6IHRhZywgY2hpbGRyZW46IGNoaWxkcmVuIH1cclxuICApO1xyXG4gIHJldHVybiB2bm9kZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50IChcclxuICBDdG9yLFxyXG4gIHByb3BzRGF0YSxcclxuICBkYXRhLFxyXG4gIGNvbnRleHQsXHJcbiAgY2hpbGRyZW5cclxuKSB7XHJcbiAgdmFyIHByb3BzID0ge307XHJcbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLnByb3BzO1xyXG4gIGlmIChwcm9wT3B0aW9ucykge1xyXG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XHJcbiAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhKTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFyIHZub2RlID0gQ3Rvci5vcHRpb25zLnJlbmRlci5jYWxsKFxyXG4gICAgbnVsbCxcclxuICAgIC8vIGVuc3VyZSB0aGUgY3JlYXRlRWxlbWVudCBmdW5jdGlvbiBpbiBmdW5jdGlvbmFsIGNvbXBvbmVudHNcclxuICAgIC8vIGdldHMgYSB1bmlxdWUgY29udGV4dCAtIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciBjb3JyZWN0IG5hbWVkIHNsb3QgY2hlY2tcclxuICAgIGJpbmQkMShjcmVhdGVFbGVtZW50LCB7IF9zZWxmOiBPYmplY3QuY3JlYXRlKGNvbnRleHQpIH0pLFxyXG4gICAge1xyXG4gICAgICBwcm9wczogcHJvcHMsXHJcbiAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgIHBhcmVudDogY29udGV4dCxcclxuICAgICAgY2hpbGRyZW46IG5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKSxcclxuICAgICAgc2xvdHM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmVTbG90cyhjaGlsZHJlbiwgY29udGV4dCk7IH1cclxuICAgIH1cclxuICApO1xyXG4gIGlmICh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICB2bm9kZS5mdW5jdGlvbmFsQ29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICBpZiAoZGF0YS5zbG90KSB7XHJcbiAgICAgICh2bm9kZS5kYXRhIHx8ICh2bm9kZS5kYXRhID0ge30pKS5zbG90ID0gZGF0YS5zbG90O1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdm5vZGVcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VGb3JWbm9kZSAoXHJcbiAgdm5vZGUsIC8vIHdlIGtub3cgaXQncyBNb3VudGVkQ29tcG9uZW50Vk5vZGUgYnV0IGZsb3cgZG9lc24ndFxyXG4gIHBhcmVudCAvLyBhY3RpdmVJbnN0YW5jZSBpbiBsaWZlY3ljbGUgc3RhdGVcclxuKSB7XHJcbiAgdmFyIHZub2RlQ29tcG9uZW50T3B0aW9ucyA9IHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XHJcbiAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICBfaXNDb21wb25lbnQ6IHRydWUsXHJcbiAgICBwYXJlbnQ6IHBhcmVudCxcclxuICAgIHByb3BzRGF0YTogdm5vZGVDb21wb25lbnRPcHRpb25zLnByb3BzRGF0YSxcclxuICAgIF9jb21wb25lbnRUYWc6IHZub2RlQ29tcG9uZW50T3B0aW9ucy50YWcsXHJcbiAgICBfcGFyZW50Vm5vZGU6IHZub2RlLFxyXG4gICAgX3BhcmVudExpc3RlbmVyczogdm5vZGVDb21wb25lbnRPcHRpb25zLmxpc3RlbmVycyxcclxuICAgIF9yZW5kZXJDaGlsZHJlbjogdm5vZGVDb21wb25lbnRPcHRpb25zLmNoaWxkcmVuXHJcbiAgfTtcclxuICAvLyBjaGVjayBpbmxpbmUtdGVtcGxhdGUgcmVuZGVyIGZ1bmN0aW9uc1xyXG4gIHZhciBpbmxpbmVUZW1wbGF0ZSA9IHZub2RlLmRhdGEuaW5saW5lVGVtcGxhdGU7XHJcbiAgaWYgKGlubGluZVRlbXBsYXRlKSB7XHJcbiAgICBvcHRpb25zLnJlbmRlciA9IGlubGluZVRlbXBsYXRlLnJlbmRlcjtcclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gaW5saW5lVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zO1xyXG4gIH1cclxuICByZXR1cm4gbmV3IHZub2RlQ29tcG9uZW50T3B0aW9ucy5DdG9yKG9wdGlvbnMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQgKHZub2RlLCBoeWRyYXRpbmcpIHtcclxuICBpZiAoIXZub2RlLmNoaWxkIHx8IHZub2RlLmNoaWxkLl9pc0Rlc3Ryb3llZCkge1xyXG4gICAgdmFyIGNoaWxkID0gdm5vZGUuY2hpbGQgPSBjcmVhdGVDb21wb25lbnRJbnN0YW5jZUZvclZub2RlKHZub2RlLCBhY3RpdmVJbnN0YW5jZSk7XHJcbiAgICBjaGlsZC4kbW91bnQoaHlkcmF0aW5nID8gdm5vZGUuZWxtIDogdW5kZWZpbmVkLCBoeWRyYXRpbmcpO1xyXG4gIH0gZWxzZSBpZiAodm5vZGUuZGF0YS5rZWVwQWxpdmUpIHtcclxuICAgIC8vIGtlcHQtYWxpdmUgY29tcG9uZW50cywgdHJlYXQgYXMgYSBwYXRjaFxyXG4gICAgdmFyIG1vdW50ZWROb2RlID0gdm5vZGU7IC8vIHdvcmsgYXJvdW5kIGZsb3dcclxuICAgIHByZXBhdGNoKG1vdW50ZWROb2RlLCBtb3VudGVkTm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXRjaCAoXHJcbiAgb2xkVm5vZGUsXHJcbiAgdm5vZGVcclxuKSB7XHJcbiAgdmFyIG9wdGlvbnMgPSB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xyXG4gIHZhciBjaGlsZCA9IHZub2RlLmNoaWxkID0gb2xkVm5vZGUuY2hpbGQ7XHJcbiAgY2hpbGQuX3VwZGF0ZUZyb21QYXJlbnQoXHJcbiAgICBvcHRpb25zLnByb3BzRGF0YSwgLy8gdXBkYXRlZCBwcm9wc1xyXG4gICAgb3B0aW9ucy5saXN0ZW5lcnMsIC8vIHVwZGF0ZWQgbGlzdGVuZXJzXHJcbiAgICB2bm9kZSwgLy8gbmV3IHBhcmVudCB2bm9kZVxyXG4gICAgb3B0aW9ucy5jaGlsZHJlbiAvLyBuZXcgY2hpbGRyZW5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnQgKHZub2RlKSB7XHJcbiAgaWYgKCF2bm9kZS5jaGlsZC5faXNNb3VudGVkKSB7XHJcbiAgICB2bm9kZS5jaGlsZC5faXNNb3VudGVkID0gdHJ1ZTtcclxuICAgIGNhbGxIb29rKHZub2RlLmNoaWxkLCAnbW91bnRlZCcpO1xyXG4gIH1cclxuICBpZiAodm5vZGUuZGF0YS5rZWVwQWxpdmUpIHtcclxuICAgIHZub2RlLmNoaWxkLl9pbmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgY2FsbEhvb2sodm5vZGUuY2hpbGQsICdhY3RpdmF0ZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc3Ryb3kkMSAodm5vZGUpIHtcclxuICBpZiAoIXZub2RlLmNoaWxkLl9pc0Rlc3Ryb3llZCkge1xyXG4gICAgaWYgKCF2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xyXG4gICAgICB2bm9kZS5jaGlsZC4kZGVzdHJveSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdm5vZGUuY2hpbGQuX2luYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgY2FsbEhvb2sodm5vZGUuY2hpbGQsICdkZWFjdGl2YXRlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZUFzeW5jQ29tcG9uZW50IChcclxuICBmYWN0b3J5LFxyXG4gIGJhc2VDdG9yLFxyXG4gIGNiXHJcbikge1xyXG4gIGlmIChmYWN0b3J5LnJlcXVlc3RlZCkge1xyXG4gICAgLy8gcG9vbCBjYWxsYmFja3NcclxuICAgIGZhY3RvcnkucGVuZGluZ0NhbGxiYWNrcy5wdXNoKGNiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZmFjdG9yeS5yZXF1ZXN0ZWQgPSB0cnVlO1xyXG4gICAgdmFyIGNicyA9IGZhY3RvcnkucGVuZGluZ0NhbGxiYWNrcyA9IFtjYl07XHJcbiAgICB2YXIgc3luYyA9IHRydWU7XHJcblxyXG4gICAgdmFyIHJlc29sdmUgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIGlmIChpc09iamVjdChyZXMpKSB7XHJcbiAgICAgICAgcmVzID0gYmFzZUN0b3IuZXh0ZW5kKHJlcyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gY2FjaGUgcmVzb2x2ZWRcclxuICAgICAgZmFjdG9yeS5yZXNvbHZlZCA9IHJlcztcclxuICAgICAgLy8gaW52b2tlIGNhbGxiYWNrcyBvbmx5IGlmIHRoaXMgaXMgbm90IGEgc3luY2hyb25vdXMgcmVzb2x2ZVxyXG4gICAgICAvLyAoYXN5bmMgcmVzb2x2ZXMgYXJlIHNoaW1tZWQgYXMgc3luY2hyb25vdXMgZHVyaW5nIFNTUilcclxuICAgICAgaWYgKCFzeW5jKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICBjYnNbaV0ocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHJlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcclxuICAgICAgICBcIkZhaWxlZCB0byByZXNvbHZlIGFzeW5jIGNvbXBvbmVudDogXCIgKyAoU3RyaW5nKGZhY3RvcnkpKSArXHJcbiAgICAgICAgKHJlYXNvbiA/IChcIlxcblJlYXNvbjogXCIgKyByZWFzb24pIDogJycpXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciByZXMgPSBmYWN0b3J5KHJlc29sdmUsIHJlamVjdCk7XHJcblxyXG4gICAgLy8gaGFuZGxlIHByb21pc2VcclxuICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nICYmICFmYWN0b3J5LnJlc29sdmVkKSB7XHJcbiAgICAgIHJlcy50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3luYyA9IGZhbHNlO1xyXG4gICAgLy8gcmV0dXJuIGluIGNhc2UgcmVzb2x2ZWQgc3luY2hyb25vdXNseVxyXG4gICAgcmV0dXJuIGZhY3RvcnkucmVzb2x2ZWRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dHJhY3RQcm9wcyAoZGF0YSwgQ3Rvcikge1xyXG4gIC8vIHdlIGFyZSBvbmx5IGV4dHJhY3RpbmcgcmF3IHZhbHVlcyBoZXJlLlxyXG4gIC8vIHZhbGlkYXRpb24gYW5kIGRlZmF1bHQgdmFsdWVzIGFyZSBoYW5kbGVkIGluIHRoZSBjaGlsZFxyXG4gIC8vIGNvbXBvbmVudCBpdHNlbGYuXHJcbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLnByb3BzO1xyXG4gIGlmICghcHJvcE9wdGlvbnMpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICB2YXIgcmVzID0ge307XHJcbiAgdmFyIGF0dHJzID0gZGF0YS5hdHRycztcclxuICB2YXIgcHJvcHMgPSBkYXRhLnByb3BzO1xyXG4gIHZhciBkb21Qcm9wcyA9IGRhdGEuZG9tUHJvcHM7XHJcbiAgaWYgKGF0dHJzIHx8IHByb3BzIHx8IGRvbVByb3BzKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcE9wdGlvbnMpIHtcclxuICAgICAgdmFyIGFsdEtleSA9IGh5cGhlbmF0ZShrZXkpO1xyXG4gICAgICBjaGVja1Byb3AocmVzLCBwcm9wcywga2V5LCBhbHRLZXksIHRydWUpIHx8XHJcbiAgICAgIGNoZWNrUHJvcChyZXMsIGF0dHJzLCBrZXksIGFsdEtleSkgfHxcclxuICAgICAgY2hlY2tQcm9wKHJlcywgZG9tUHJvcHMsIGtleSwgYWx0S2V5KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1Byb3AgKFxyXG4gIHJlcyxcclxuICBoYXNoLFxyXG4gIGtleSxcclxuICBhbHRLZXksXHJcbiAgcHJlc2VydmVcclxuKSB7XHJcbiAgaWYgKGhhc2gpIHtcclxuICAgIGlmIChoYXNPd24oaGFzaCwga2V5KSkge1xyXG4gICAgICByZXNba2V5XSA9IGhhc2hba2V5XTtcclxuICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xyXG4gICAgICAgIGRlbGV0ZSBoYXNoW2tleV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSBpZiAoaGFzT3duKGhhc2gsIGFsdEtleSkpIHtcclxuICAgICAgcmVzW2tleV0gPSBoYXNoW2FsdEtleV07XHJcbiAgICAgIGlmICghcHJlc2VydmUpIHtcclxuICAgICAgICBkZWxldGUgaGFzaFthbHRLZXldO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5mdW5jdGlvbiBtZXJnZUhvb2tzIChkYXRhKSB7XHJcbiAgaWYgKCFkYXRhLmhvb2spIHtcclxuICAgIGRhdGEuaG9vayA9IHt9O1xyXG4gIH1cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzVG9NZXJnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGtleSA9IGhvb2tzVG9NZXJnZVtpXTtcclxuICAgIHZhciBmcm9tUGFyZW50ID0gZGF0YS5ob29rW2tleV07XHJcbiAgICB2YXIgb3VycyA9IGhvb2tzW2tleV07XHJcbiAgICBkYXRhLmhvb2tba2V5XSA9IGZyb21QYXJlbnQgPyBtZXJnZUhvb2skMShvdXJzLCBmcm9tUGFyZW50KSA6IG91cnM7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtZXJnZUhvb2skMSAoYSwgYikge1xyXG4gIC8vIHNpbmNlIGFsbCBob29rcyBoYXZlIGF0IG1vc3QgdHdvIGFyZ3MsIHVzZSBmaXhlZCBhcmdzXHJcbiAgLy8gdG8gYXZvaWQgaGF2aW5nIHRvIHVzZSBmbi5hcHBseSgpLlxyXG4gIHJldHVybiBmdW5jdGlvbiAoXywgX18pIHtcclxuICAgIGEoXywgX18pO1xyXG4gICAgYihfLCBfXyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbi8vIHdyYXBwZXIgZnVuY3Rpb24gZm9yIHByb3ZpZGluZyBhIG1vcmUgZmxleGlibGUgaW50ZXJmYWNlXHJcbi8vIHdpdGhvdXQgZ2V0dGluZyB5ZWxsZWQgYXQgYnkgZmxvd1xyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50IChcclxuICB0YWcsXHJcbiAgZGF0YSxcclxuICBjaGlsZHJlblxyXG4pIHtcclxuICBpZiAoZGF0YSAmJiAoQXJyYXkuaXNBcnJheShkYXRhKSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpKSB7XHJcbiAgICBjaGlsZHJlbiA9IGRhdGE7XHJcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuICAvLyBtYWtlIHN1cmUgdG8gdXNlIHJlYWwgaW5zdGFuY2UgaW5zdGVhZCBvZiBwcm94eSBhcyBjb250ZXh0XHJcbiAgcmV0dXJuIF9jcmVhdGVFbGVtZW50KHRoaXMuX3NlbGYsIHRhZywgZGF0YSwgY2hpbGRyZW4pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50IChcclxuICBjb250ZXh0LFxyXG4gIHRhZyxcclxuICBkYXRhLFxyXG4gIGNoaWxkcmVuXHJcbikge1xyXG4gIGlmIChkYXRhICYmIGRhdGEuX19vYl9fKSB7XHJcbiAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxyXG4gICAgICBcIkF2b2lkIHVzaW5nIG9ic2VydmVkIGRhdGEgb2JqZWN0IGFzIHZub2RlIGRhdGE6IFwiICsgKEpTT04uc3RyaW5naWZ5KGRhdGEpKSArIFwiXFxuXCIgK1xyXG4gICAgICAnQWx3YXlzIGNyZWF0ZSBmcmVzaCB2bm9kZSBkYXRhIG9iamVjdHMgaW4gZWFjaCByZW5kZXIhJyxcclxuICAgICAgY29udGV4dFxyXG4gICAgKTtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBpZiAoIXRhZykge1xyXG4gICAgLy8gaW4gY2FzZSBvZiBjb21wb25lbnQgOmlzIHNldCB0byBmYWxzeSB2YWx1ZVxyXG4gICAgcmV0dXJuIGVtcHR5Vk5vZGUoKVxyXG4gIH1cclxuICBpZiAodHlwZW9mIHRhZyA9PT0gJ3N0cmluZycpIHtcclxuICAgIHZhciBDdG9yO1xyXG4gICAgdmFyIG5zID0gY29uZmlnLmdldFRhZ05hbWVzcGFjZSh0YWcpO1xyXG4gICAgaWYgKGNvbmZpZy5pc1Jlc2VydmVkVGFnKHRhZykpIHtcclxuICAgICAgLy8gcGxhdGZvcm0gYnVpbHQtaW4gZWxlbWVudHNcclxuICAgICAgcmV0dXJuIG5ldyBWTm9kZShcclxuICAgICAgICB0YWcsIGRhdGEsIG5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuLCBucyksXHJcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG5zLCBjb250ZXh0XHJcbiAgICAgIClcclxuICAgIH0gZWxzZSBpZiAoKEN0b3IgPSByZXNvbHZlQXNzZXQoY29udGV4dC4kb3B0aW9ucywgJ2NvbXBvbmVudHMnLCB0YWcpKSkge1xyXG4gICAgICAvLyBjb21wb25lbnRcclxuICAgICAgcmV0dXJuIGNyZWF0ZUNvbXBvbmVudChDdG9yLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbiwgdGFnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gdW5rbm93biBvciB1bmxpc3RlZCBuYW1lc3BhY2VkIGVsZW1lbnRzXHJcbiAgICAgIC8vIGNoZWNrIGF0IHJ1bnRpbWUgYmVjYXVzZSBpdCBtYXkgZ2V0IGFzc2lnbmVkIGEgbmFtZXNwYWNlIHdoZW4gaXRzXHJcbiAgICAgIC8vIHBhcmVudCBub3JtYWxpemVzIGNoaWxkcmVuXHJcbiAgICAgIHZhciBjaGlsZE5zID0gdGFnID09PSAnZm9yZWlnbk9iamVjdCcgPyAneGh0bWwnIDogbnM7XHJcbiAgICAgIHJldHVybiBuZXcgVk5vZGUoXHJcbiAgICAgICAgdGFnLCBkYXRhLCBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbiwgY2hpbGROcyksXHJcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG5zLCBjb250ZXh0XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gZGlyZWN0IGNvbXBvbmVudCBvcHRpb25zIC8gY29uc3RydWN0b3JcclxuICAgIHJldHVybiBjcmVhdGVDb21wb25lbnQodGFnLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbilcclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gaW5pdFJlbmRlciAodm0pIHtcclxuICB2bS4kdm5vZGUgPSBudWxsOyAvLyB0aGUgcGxhY2Vob2xkZXIgbm9kZSBpbiBwYXJlbnQgdHJlZVxyXG4gIHZtLl92bm9kZSA9IG51bGw7IC8vIHRoZSByb290IG9mIHRoZSBjaGlsZCB0cmVlXHJcbiAgdm0uX3N0YXRpY1RyZWVzID0gbnVsbDtcclxuICB2bS5fcmVuZGVyQ29udGV4dCA9IHZtLiRvcHRpb25zLl9wYXJlbnRWbm9kZSAmJiB2bS4kb3B0aW9ucy5fcGFyZW50Vm5vZGUuY29udGV4dDtcclxuICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHModm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuLCB2bS5fcmVuZGVyQ29udGV4dCk7XHJcbiAgLy8gYmluZCB0aGUgcHVibGljIGNyZWF0ZUVsZW1lbnQgZm4gdG8gdGhpcyBpbnN0YW5jZVxyXG4gIC8vIHNvIHRoYXQgd2UgZ2V0IHByb3BlciByZW5kZXIgY29udGV4dCBpbnNpZGUgaXQuXHJcbiAgdm0uJGNyZWF0ZUVsZW1lbnQgPSBiaW5kJDEoY3JlYXRlRWxlbWVudCwgdm0pO1xyXG4gIGlmICh2bS4kb3B0aW9ucy5lbCkge1xyXG4gICAgdm0uJG1vdW50KHZtLiRvcHRpb25zLmVsKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlck1peGluIChWdWUpIHtcclxuICBWdWUucHJvdG90eXBlLiRuZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgbmV4dFRpY2soZm4sIHRoaXMpO1xyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2YXIgcmVmID0gdm0uJG9wdGlvbnM7XHJcbiAgICB2YXIgcmVuZGVyID0gcmVmLnJlbmRlcjtcclxuICAgIHZhciBzdGF0aWNSZW5kZXJGbnMgPSByZWYuc3RhdGljUmVuZGVyRm5zO1xyXG4gICAgdmFyIF9wYXJlbnRWbm9kZSA9IHJlZi5fcGFyZW50Vm5vZGU7XHJcblxyXG4gICAgaWYgKHZtLl9pc01vdW50ZWQpIHtcclxuICAgICAgLy8gY2xvbmUgc2xvdCBub2RlcyBvbiByZS1yZW5kZXJzXHJcbiAgICAgIGZvciAodmFyIGtleSBpbiB2bS4kc2xvdHMpIHtcclxuICAgICAgICB2bS4kc2xvdHNba2V5XSA9IGNsb25lVk5vZGVzKHZtLiRzbG90c1trZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGF0aWNSZW5kZXJGbnMgJiYgIXZtLl9zdGF0aWNUcmVlcykge1xyXG4gICAgICB2bS5fc3RhdGljVHJlZXMgPSBbXTtcclxuICAgIH1cclxuICAgIC8vIHNldCBwYXJlbnQgdm5vZGUuIHRoaXMgYWxsb3dzIHJlbmRlciBmdW5jdGlvbnMgdG8gaGF2ZSBhY2Nlc3NcclxuICAgIC8vIHRvIHRoZSBkYXRhIG9uIHRoZSBwbGFjZWhvbGRlciBub2RlLlxyXG4gICAgdm0uJHZub2RlID0gX3BhcmVudFZub2RlO1xyXG4gICAgLy8gcmVuZGVyIHNlbGZcclxuICAgIHZhciB2bm9kZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZub2RlID0gcmVuZGVyLmNhbGwodm0uX3JlbmRlclByb3h5LCB2bS4kY3JlYXRlRWxlbWVudCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHtcclxuICAgICAgICB3YXJuKChcIkVycm9yIHdoZW4gcmVuZGVyaW5nIFwiICsgKGZvcm1hdENvbXBvbmVudE5hbWUodm0pKSArIFwiOlwiKSk7XHJcbiAgICAgIH1cclxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgaWYgKGNvbmZpZy5lcnJvckhhbmRsZXIpIHtcclxuICAgICAgICBjb25maWcuZXJyb3JIYW5kbGVyLmNhbGwobnVsbCwgZSwgdm0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChjb25maWcuX2lzU2VydmVyKSB7XHJcbiAgICAgICAgICB0aHJvdyBlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIHJldHVybiBwcmV2aW91cyB2bm9kZSB0byBwcmV2ZW50IHJlbmRlciBlcnJvciBjYXVzaW5nIGJsYW5rIGNvbXBvbmVudFxyXG4gICAgICB2bm9kZSA9IHZtLl92bm9kZTtcclxuICAgIH1cclxuICAgIC8vIHJldHVybiBlbXB0eSB2bm9kZSBpbiBjYXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gZXJyb3JlZCBvdXRcclxuICAgIGlmICghKHZub2RlIGluc3RhbmNlb2YgVk5vZGUpKSB7XHJcbiAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiBBcnJheS5pc0FycmF5KHZub2RlKSkge1xyXG4gICAgICAgIHdhcm4oXHJcbiAgICAgICAgICAnTXVsdGlwbGUgcm9vdCBub2RlcyByZXR1cm5lZCBmcm9tIHJlbmRlciBmdW5jdGlvbi4gUmVuZGVyIGZ1bmN0aW9uICcgK1xyXG4gICAgICAgICAgJ3Nob3VsZCByZXR1cm4gYSBzaW5nbGUgcm9vdCBub2RlLicsXHJcbiAgICAgICAgICB2bVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdm5vZGUgPSBlbXB0eVZOb2RlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBzZXQgcGFyZW50XHJcbiAgICB2bm9kZS5wYXJlbnQgPSBfcGFyZW50Vm5vZGU7XHJcbiAgICByZXR1cm4gdm5vZGVcclxuICB9O1xyXG5cclxuICAvLyBzaG9ydGhhbmRzIHVzZWQgaW4gcmVuZGVyIGZ1bmN0aW9uc1xyXG4gIFZ1ZS5wcm90b3R5cGUuX2ggPSBjcmVhdGVFbGVtZW50O1xyXG4gIC8vIHRvU3RyaW5nIGZvciBtdXN0YWNoZXNcclxuICBWdWUucHJvdG90eXBlLl9zID0gX3RvU3RyaW5nO1xyXG4gIC8vIG51bWJlciBjb252ZXJzaW9uXHJcbiAgVnVlLnByb3RvdHlwZS5fbiA9IHRvTnVtYmVyO1xyXG4gIC8vIGVtcHR5IHZub2RlXHJcbiAgVnVlLnByb3RvdHlwZS5fZSA9IGVtcHR5Vk5vZGU7XHJcbiAgLy8gbG9vc2UgZXF1YWxcclxuICBWdWUucHJvdG90eXBlLl9xID0gbG9vc2VFcXVhbDtcclxuICAvLyBsb29zZSBpbmRleE9mXHJcbiAgVnVlLnByb3RvdHlwZS5faSA9IGxvb3NlSW5kZXhPZjtcclxuXHJcbiAgLy8gcmVuZGVyIHN0YXRpYyB0cmVlIGJ5IGluZGV4XHJcbiAgVnVlLnByb3RvdHlwZS5fbSA9IGZ1bmN0aW9uIHJlbmRlclN0YXRpYyAoXHJcbiAgICBpbmRleCxcclxuICAgIGlzSW5Gb3JcclxuICApIHtcclxuICAgIHZhciB0cmVlID0gdGhpcy5fc3RhdGljVHJlZXNbaW5kZXhdO1xyXG4gICAgLy8gaWYgaGFzIGFscmVhZHktcmVuZGVyZWQgc3RhdGljIHRyZWUgYW5kIG5vdCBpbnNpZGUgdi1mb3IsXHJcbiAgICAvLyB3ZSBjYW4gcmV1c2UgdGhlIHNhbWUgdHJlZSBieSBkb2luZyBhIHNoYWxsb3cgY2xvbmUuXHJcbiAgICBpZiAodHJlZSAmJiAhaXNJbkZvcikge1xyXG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh0cmVlKVxyXG4gICAgICAgID8gY2xvbmVWTm9kZXModHJlZSlcclxuICAgICAgICA6IGNsb25lVk5vZGUodHJlZSlcclxuICAgIH1cclxuICAgIC8vIG90aGVyd2lzZSwgcmVuZGVyIGEgZnJlc2ggdHJlZS5cclxuICAgIHRyZWUgPSB0aGlzLl9zdGF0aWNUcmVlc1tpbmRleF0gPSB0aGlzLiRvcHRpb25zLnN0YXRpY1JlbmRlckZuc1tpbmRleF0uY2FsbCh0aGlzLl9yZW5kZXJQcm94eSk7XHJcbiAgICBtYXJrU3RhdGljKHRyZWUsIChcIl9fc3RhdGljX19cIiArIGluZGV4KSwgZmFsc2UpO1xyXG4gICAgcmV0dXJuIHRyZWVcclxuICB9O1xyXG5cclxuICAvLyBtYXJrIG5vZGUgYXMgc3RhdGljICh2LW9uY2UpXHJcbiAgVnVlLnByb3RvdHlwZS5fbyA9IGZ1bmN0aW9uIG1hcmtPbmNlIChcclxuICAgIHRyZWUsXHJcbiAgICBpbmRleCxcclxuICAgIGtleVxyXG4gICkge1xyXG4gICAgbWFya1N0YXRpYyh0cmVlLCAoXCJfX29uY2VfX1wiICsgaW5kZXggKyAoa2V5ID8gKFwiX1wiICsga2V5KSA6IFwiXCIpKSwgdHJ1ZSk7XHJcbiAgICByZXR1cm4gdHJlZVxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIG1hcmtTdGF0aWMgKHRyZWUsIGtleSwgaXNPbmNlKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodHJlZVtpXSAmJiB0eXBlb2YgdHJlZVtpXSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIG1hcmtTdGF0aWNOb2RlKHRyZWVbaV0sIChrZXkgKyBcIl9cIiArIGkpLCBpc09uY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWFya1N0YXRpY05vZGUodHJlZSwga2V5LCBpc09uY2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbWFya1N0YXRpY05vZGUgKG5vZGUsIGtleSwgaXNPbmNlKSB7XHJcbiAgICBub2RlLmlzU3RhdGljID0gdHJ1ZTtcclxuICAgIG5vZGUua2V5ID0ga2V5O1xyXG4gICAgbm9kZS5pc09uY2UgPSBpc09uY2U7XHJcbiAgfVxyXG5cclxuICAvLyBmaWx0ZXIgcmVzb2x1dGlvbiBoZWxwZXJcclxuICB2YXIgaWRlbnRpdHkgPSBmdW5jdGlvbiAoXykgeyByZXR1cm4gXzsgfTtcclxuICBWdWUucHJvdG90eXBlLl9mID0gZnVuY3Rpb24gcmVzb2x2ZUZpbHRlciAoaWQpIHtcclxuICAgIHJldHVybiByZXNvbHZlQXNzZXQodGhpcy4kb3B0aW9ucywgJ2ZpbHRlcnMnLCBpZCwgdHJ1ZSkgfHwgaWRlbnRpdHlcclxuICB9O1xyXG5cclxuICAvLyByZW5kZXIgdi1mb3JcclxuICBWdWUucHJvdG90eXBlLl9sID0gZnVuY3Rpb24gcmVuZGVyTGlzdCAoXHJcbiAgICB2YWwsXHJcbiAgICByZW5kZXJcclxuICApIHtcclxuICAgIHZhciByZXQsIGksIGwsIGtleXMsIGtleTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgcmV0ID0gbmV3IEFycmF5KHZhbC5sZW5ndGgpO1xyXG4gICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxbaV0sIGkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldCA9IG5ldyBBcnJheSh2YWwpO1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsOyBpKyspIHtcclxuICAgICAgICByZXRbaV0gPSByZW5kZXIoaSArIDEsIGkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcclxuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XHJcbiAgICAgIHJldCA9IG5ldyBBcnJheShrZXlzLmxlbmd0aCk7XHJcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgcmV0W2ldID0gcmVuZGVyKHZhbFtrZXldLCBrZXksIGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfTtcclxuXHJcbiAgLy8gcmVuZGVyU2xvdFxyXG4gIFZ1ZS5wcm90b3R5cGUuX3QgPSBmdW5jdGlvbiAoXHJcbiAgICBuYW1lLFxyXG4gICAgZmFsbGJhY2tcclxuICApIHtcclxuICAgIHZhciBzbG90Tm9kZXMgPSB0aGlzLiRzbG90c1tuYW1lXTtcclxuICAgIC8vIHdhcm4gZHVwbGljYXRlIHNsb3QgdXNhZ2VcclxuICAgIGlmIChzbG90Tm9kZXMgJiYgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgc2xvdE5vZGVzLl9yZW5kZXJlZCAmJiB3YXJuKFxyXG4gICAgICAgIFwiRHVwbGljYXRlIHByZXNlbmNlIG9mIHNsb3QgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBmb3VuZCBpbiB0aGUgc2FtZSByZW5kZXIgdHJlZSBcIiArXHJcbiAgICAgICAgXCItIHRoaXMgd2lsbCBsaWtlbHkgY2F1c2UgcmVuZGVyIGVycm9ycy5cIixcclxuICAgICAgICB0aGlzXHJcbiAgICAgICk7XHJcbiAgICAgIHNsb3ROb2Rlcy5fcmVuZGVyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNsb3ROb2RlcyB8fCBmYWxsYmFja1xyXG4gIH07XHJcblxyXG4gIC8vIGFwcGx5IHYtYmluZCBvYmplY3RcclxuICBWdWUucHJvdG90eXBlLl9iID0gZnVuY3Rpb24gYmluZFByb3BzIChcclxuICAgIGRhdGEsXHJcbiAgICB0YWcsXHJcbiAgICB2YWx1ZSxcclxuICAgIGFzUHJvcFxyXG4gICkge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGlmICghaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcclxuICAgICAgICAgICd2LWJpbmQgd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCBvciBBcnJheSB2YWx1ZScsXHJcbiAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgIHZhbHVlID0gdG9PYmplY3QodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcclxuICAgICAgICAgIGlmIChrZXkgPT09ICdjbGFzcycgfHwga2V5ID09PSAnc3R5bGUnKSB7XHJcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlW2tleV07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaGFzaCA9IGFzUHJvcCB8fCBjb25maWcubXVzdFVzZVByb3AodGFnLCBrZXkpXHJcbiAgICAgICAgICAgICAgPyBkYXRhLmRvbVByb3BzIHx8IChkYXRhLmRvbVByb3BzID0ge30pXHJcbiAgICAgICAgICAgICAgOiBkYXRhLmF0dHJzIHx8IChkYXRhLmF0dHJzID0ge30pO1xyXG4gICAgICAgICAgICBoYXNoW2tleV0gPSB2YWx1ZVtrZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFcclxuICB9O1xyXG5cclxuICAvLyBleHBvc2Ugdi1vbiBrZXlDb2Rlc1xyXG4gIFZ1ZS5wcm90b3R5cGUuX2sgPSBmdW5jdGlvbiBnZXRLZXlDb2RlcyAoa2V5KSB7XHJcbiAgICByZXR1cm4gY29uZmlnLmtleUNvZGVzW2tleV1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlU2xvdHMgKFxyXG4gIHJlbmRlckNoaWxkcmVuLFxyXG4gIGNvbnRleHRcclxuKSB7XHJcbiAgdmFyIHNsb3RzID0ge307XHJcbiAgaWYgKCFyZW5kZXJDaGlsZHJlbikge1xyXG4gICAgcmV0dXJuIHNsb3RzXHJcbiAgfVxyXG4gIHZhciBjaGlsZHJlbiA9IG5vcm1hbGl6ZUNoaWxkcmVuKHJlbmRlckNoaWxkcmVuKSB8fCBbXTtcclxuICB2YXIgZGVmYXVsdFNsb3QgPSBbXTtcclxuICB2YXIgbmFtZSwgY2hpbGQ7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAvLyBuYW1lZCBzbG90cyBzaG91bGQgb25seSBiZSByZXNwZWN0ZWQgaWYgdGhlIHZub2RlIHdhcyByZW5kZXJlZCBpbiB0aGVcclxuICAgIC8vIHNhbWUgY29udGV4dC5cclxuICAgIGlmICgoY2hpbGQuY29udGV4dCA9PT0gY29udGV4dCB8fCBjaGlsZC5mdW5jdGlvbmFsQ29udGV4dCA9PT0gY29udGV4dCkgJiZcclxuICAgICAgICBjaGlsZC5kYXRhICYmIChuYW1lID0gY2hpbGQuZGF0YS5zbG90KSkge1xyXG4gICAgICB2YXIgc2xvdCA9IChzbG90c1tuYW1lXSB8fCAoc2xvdHNbbmFtZV0gPSBbXSkpO1xyXG4gICAgICBpZiAoY2hpbGQudGFnID09PSAndGVtcGxhdGUnKSB7XHJcbiAgICAgICAgc2xvdC5wdXNoLmFwcGx5KHNsb3QsIGNoaWxkLmNoaWxkcmVuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzbG90LnB1c2goY2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWZhdWx0U2xvdC5wdXNoKGNoaWxkKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gaWdub3JlIHNpbmdsZSB3aGl0ZXNwYWNlXHJcbiAgaWYgKGRlZmF1bHRTbG90Lmxlbmd0aCAmJiAhKFxyXG4gICAgZGVmYXVsdFNsb3QubGVuZ3RoID09PSAxICYmXHJcbiAgICAoZGVmYXVsdFNsb3RbMF0udGV4dCA9PT0gJyAnIHx8IGRlZmF1bHRTbG90WzBdLmlzQ29tbWVudClcclxuICApKSB7XHJcbiAgICBzbG90cy5kZWZhdWx0ID0gZGVmYXVsdFNsb3Q7XHJcbiAgfVxyXG4gIHJldHVybiBzbG90c1xyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbmZ1bmN0aW9uIGluaXRFdmVudHMgKHZtKSB7XHJcbiAgdm0uX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgLy8gaW5pdCBwYXJlbnQgYXR0YWNoZWQgZXZlbnRzXHJcbiAgdmFyIGxpc3RlbmVycyA9IHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XHJcbiAgdmFyIG9uID0gYmluZCQxKHZtLiRvbiwgdm0pO1xyXG4gIHZhciBvZmYgPSBiaW5kJDEodm0uJG9mZiwgdm0pO1xyXG4gIHZtLl91cGRhdGVMaXN0ZW5lcnMgPSBmdW5jdGlvbiAobGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMpIHtcclxuICAgIHVwZGF0ZUxpc3RlbmVycyhsaXN0ZW5lcnMsIG9sZExpc3RlbmVycyB8fCB7fSwgb24sIG9mZiwgdm0pO1xyXG4gIH07XHJcbiAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgdm0uX3VwZGF0ZUxpc3RlbmVycyhsaXN0ZW5lcnMpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZXZlbnRzTWl4aW4gKFZ1ZSkge1xyXG4gIFZ1ZS5wcm90b3R5cGUuJG9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xyXG4gICAgdmFyIHZtID0gdGhpczsodm0uX2V2ZW50c1tldmVudF0gfHwgKHZtLl9ldmVudHNbZXZlbnRdID0gW10pKS5wdXNoKGZuKTtcclxuICAgIHJldHVybiB2bVxyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuJG9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gb24gKCkge1xyXG4gICAgICB2bS4kb2ZmKGV2ZW50LCBvbik7XHJcbiAgICAgIGZuLmFwcGx5KHZtLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgb24uZm4gPSBmbjtcclxuICAgIHZtLiRvbihldmVudCwgb24pO1xyXG4gICAgcmV0dXJuIHZtXHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIC8vIGFsbFxyXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICByZXR1cm4gdm1cclxuICAgIH1cclxuICAgIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgICB2YXIgY2JzID0gdm0uX2V2ZW50c1tldmVudF07XHJcbiAgICBpZiAoIWNicykge1xyXG4gICAgICByZXR1cm4gdm1cclxuICAgIH1cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHZtLl9ldmVudHNbZXZlbnRdID0gbnVsbDtcclxuICAgICAgcmV0dXJuIHZtXHJcbiAgICB9XHJcbiAgICAvLyBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgICB2YXIgY2I7XHJcbiAgICB2YXIgaSA9IGNicy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgIGNiID0gY2JzW2ldO1xyXG4gICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICAgIGNicy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZtXHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZhciBjYnMgPSB2bS5fZXZlbnRzW2V2ZW50XTtcclxuICAgIGlmIChjYnMpIHtcclxuICAgICAgY2JzID0gY2JzLmxlbmd0aCA+IDEgPyB0b0FycmF5KGNicykgOiBjYnM7XHJcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBjYnNbaV0uYXBwbHkodm0sIGFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdm1cclxuICB9O1xyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbnZhciB1aWQgPSAwO1xyXG5cclxuZnVuY3Rpb24gaW5pdE1peGluIChWdWUpIHtcclxuICBWdWUucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAvLyBhIHVpZFxyXG4gICAgdm0uX3VpZCA9IHVpZCsrO1xyXG4gICAgLy8gYSBmbGFnIHRvIGF2b2lkIHRoaXMgYmVpbmcgb2JzZXJ2ZWRcclxuICAgIHZtLl9pc1Z1ZSA9IHRydWU7XHJcbiAgICAvLyBtZXJnZSBvcHRpb25zXHJcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLl9pc0NvbXBvbmVudCkge1xyXG4gICAgICAvLyBvcHRpbWl6ZSBpbnRlcm5hbCBjb21wb25lbnQgaW5zdGFudGlhdGlvblxyXG4gICAgICAvLyBzaW5jZSBkeW5hbWljIG9wdGlvbnMgbWVyZ2luZyBpcyBwcmV0dHkgc2xvdywgYW5kIG5vbmUgb2YgdGhlXHJcbiAgICAgIC8vIGludGVybmFsIGNvbXBvbmVudCBvcHRpb25zIG5lZWRzIHNwZWNpYWwgdHJlYXRtZW50LlxyXG4gICAgICBpbml0SW50ZXJuYWxDb21wb25lbnQodm0sIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdm0uJG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXHJcbiAgICAgICAgcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyh2bS5jb25zdHJ1Y3RvciksXHJcbiAgICAgICAgb3B0aW9ucyB8fCB7fSxcclxuICAgICAgICB2bVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgIHtcclxuICAgICAgaW5pdFByb3h5KHZtKTtcclxuICAgIH1cclxuICAgIC8vIGV4cG9zZSByZWFsIHNlbGZcclxuICAgIHZtLl9zZWxmID0gdm07XHJcbiAgICBpbml0TGlmZWN5Y2xlKHZtKTtcclxuICAgIGluaXRFdmVudHModm0pO1xyXG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVDcmVhdGUnKTtcclxuICAgIGluaXRTdGF0ZSh2bSk7XHJcbiAgICBjYWxsSG9vayh2bSwgJ2NyZWF0ZWQnKTtcclxuICAgIGluaXRSZW5kZXIodm0pO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRJbnRlcm5hbENvbXBvbmVudCAodm0sIG9wdGlvbnMpIHtcclxuICB2YXIgb3B0cyA9IHZtLiRvcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh2bS5jb25zdHJ1Y3Rvci5vcHRpb25zKTtcclxuICAvLyBkb2luZyB0aGlzIGJlY2F1c2UgaXQncyBmYXN0ZXIgdGhhbiBkeW5hbWljIGVudW1lcmF0aW9uLlxyXG4gIG9wdHMucGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XHJcbiAgb3B0cy5wcm9wc0RhdGEgPSBvcHRpb25zLnByb3BzRGF0YTtcclxuICBvcHRzLl9wYXJlbnRWbm9kZSA9IG9wdGlvbnMuX3BhcmVudFZub2RlO1xyXG4gIG9wdHMuX3BhcmVudExpc3RlbmVycyA9IG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcclxuICBvcHRzLl9yZW5kZXJDaGlsZHJlbiA9IG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuO1xyXG4gIG9wdHMuX2NvbXBvbmVudFRhZyA9IG9wdGlvbnMuX2NvbXBvbmVudFRhZztcclxuICBpZiAob3B0aW9ucy5yZW5kZXIpIHtcclxuICAgIG9wdHMucmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XHJcbiAgICBvcHRzLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyAoQ3Rvcikge1xyXG4gIHZhciBvcHRpb25zID0gQ3Rvci5vcHRpb25zO1xyXG4gIGlmIChDdG9yLnN1cGVyKSB7XHJcbiAgICB2YXIgc3VwZXJPcHRpb25zID0gQ3Rvci5zdXBlci5vcHRpb25zO1xyXG4gICAgdmFyIGNhY2hlZFN1cGVyT3B0aW9ucyA9IEN0b3Iuc3VwZXJPcHRpb25zO1xyXG4gICAgdmFyIGV4dGVuZE9wdGlvbnMgPSBDdG9yLmV4dGVuZE9wdGlvbnM7XHJcbiAgICBpZiAoc3VwZXJPcHRpb25zICE9PSBjYWNoZWRTdXBlck9wdGlvbnMpIHtcclxuICAgICAgLy8gc3VwZXIgb3B0aW9uIGNoYW5nZWRcclxuICAgICAgQ3Rvci5zdXBlck9wdGlvbnMgPSBzdXBlck9wdGlvbnM7XHJcbiAgICAgIGV4dGVuZE9wdGlvbnMucmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XHJcbiAgICAgIGV4dGVuZE9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnM7XHJcbiAgICAgIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoc3VwZXJPcHRpb25zLCBleHRlbmRPcHRpb25zKTtcclxuICAgICAgaWYgKG9wdGlvbnMubmFtZSkge1xyXG4gICAgICAgIG9wdGlvbnMuY29tcG9uZW50c1tvcHRpb25zLm5hbWVdID0gQ3RvcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gb3B0aW9uc1xyXG59XHJcblxyXG5mdW5jdGlvbiBWdWUkMyAob3B0aW9ucykge1xyXG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJlxyXG4gICAgISh0aGlzIGluc3RhbmNlb2YgVnVlJDMpKSB7XHJcbiAgICB3YXJuKCdWdWUgaXMgYSBjb25zdHJ1Y3RvciBhbmQgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSBgbmV3YCBrZXl3b3JkJyk7XHJcbiAgfVxyXG4gIHRoaXMuX2luaXQob3B0aW9ucyk7XHJcbn1cclxuXHJcbmluaXRNaXhpbihWdWUkMyk7XHJcbnN0YXRlTWl4aW4oVnVlJDMpO1xyXG5ldmVudHNNaXhpbihWdWUkMyk7XHJcbmxpZmVjeWNsZU1peGluKFZ1ZSQzKTtcclxucmVuZGVyTWl4aW4oVnVlJDMpO1xyXG5cclxudmFyIHdhcm4gPSBub29wO1xyXG52YXIgZm9ybWF0Q29tcG9uZW50TmFtZTtcclxuXHJcbntcclxuICB2YXIgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgd2FybiA9IGZ1bmN0aW9uIChtc2csIHZtKSB7XHJcbiAgICBpZiAoaGFzQ29uc29sZSAmJiAoIWNvbmZpZy5zaWxlbnQpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJbVnVlIHdhcm5dOiBcIiArIG1zZyArIFwiIFwiICsgKFxyXG4gICAgICAgIHZtID8gZm9ybWF0TG9jYXRpb24oZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpIDogJydcclxuICAgICAgKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZm9ybWF0Q29tcG9uZW50TmFtZSA9IGZ1bmN0aW9uICh2bSkge1xyXG4gICAgaWYgKHZtLiRyb290ID09PSB2bSkge1xyXG4gICAgICByZXR1cm4gJ3Jvb3QgaW5zdGFuY2UnXHJcbiAgICB9XHJcbiAgICB2YXIgbmFtZSA9IHZtLl9pc1Z1ZVxyXG4gICAgICA/IHZtLiRvcHRpb25zLm5hbWUgfHwgdm0uJG9wdGlvbnMuX2NvbXBvbmVudFRhZ1xyXG4gICAgICA6IHZtLm5hbWU7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAobmFtZSA/IChcImNvbXBvbmVudCA8XCIgKyBuYW1lICsgXCI+XCIpIDogXCJhbm9ueW1vdXMgY29tcG9uZW50XCIpICtcclxuICAgICAgKHZtLl9pc1Z1ZSAmJiB2bS4kb3B0aW9ucy5fX2ZpbGUgPyAoXCIgYXQgXCIgKyAodm0uJG9wdGlvbnMuX19maWxlKSkgOiAnJylcclxuICAgIClcclxuICB9O1xyXG5cclxuICB2YXIgZm9ybWF0TG9jYXRpb24gPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICBpZiAoc3RyID09PSAnYW5vbnltb3VzIGNvbXBvbmVudCcpIHtcclxuICAgICAgc3RyICs9IFwiIC0gdXNlIHRoZSBcXFwibmFtZVxcXCIgb3B0aW9uIGZvciBiZXR0ZXIgZGVidWdnaW5nIG1lc3NhZ2VzLlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcIlxcbihmb3VuZCBpbiBcIiArIHN0ciArIFwiKVwiKVxyXG4gIH07XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuLyoqXHJcbiAqIE9wdGlvbiBvdmVyd3JpdGluZyBzdHJhdGVnaWVzIGFyZSBmdW5jdGlvbnMgdGhhdCBoYW5kbGVcclxuICogaG93IHRvIG1lcmdlIGEgcGFyZW50IG9wdGlvbiB2YWx1ZSBhbmQgYSBjaGlsZCBvcHRpb25cclxuICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXHJcbiAqL1xyXG52YXIgc3RyYXRzID0gY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcztcclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIHdpdGggcmVzdHJpY3Rpb25zXHJcbiAqL1xyXG57XHJcbiAgc3RyYXRzLmVsID0gc3RyYXRzLnByb3BzRGF0YSA9IGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkLCB2bSwga2V5KSB7XHJcbiAgICBpZiAoIXZtKSB7XHJcbiAgICAgIHdhcm4oXHJcbiAgICAgICAgXCJvcHRpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiIGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIGluc3RhbmNlIFwiICtcclxuICAgICAgICAnY3JlYXRpb24gd2l0aCB0aGUgYG5ld2Aga2V5d29yZC4nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmYXVsdFN0cmF0KHBhcmVudCwgY2hpbGQpXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhlbHBlciB0aGF0IHJlY3Vyc2l2ZWx5IG1lcmdlcyB0d28gZGF0YSBvYmplY3RzIHRvZ2V0aGVyLlxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VEYXRhICh0bywgZnJvbSkge1xyXG4gIGlmICghZnJvbSkgeyByZXR1cm4gdG8gfVxyXG4gIHZhciBrZXksIHRvVmFsLCBmcm9tVmFsO1xyXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJvbSk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBrZXkgPSBrZXlzW2ldO1xyXG4gICAgdG9WYWwgPSB0b1trZXldO1xyXG4gICAgZnJvbVZhbCA9IGZyb21ba2V5XTtcclxuICAgIGlmICghaGFzT3duKHRvLCBrZXkpKSB7XHJcbiAgICAgIHNldCh0bywga2V5LCBmcm9tVmFsKTtcclxuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh0b1ZhbCkgJiYgaXNQbGFpbk9iamVjdChmcm9tVmFsKSkge1xyXG4gICAgICBtZXJnZURhdGEodG9WYWwsIGZyb21WYWwpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdG9cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGFcclxuICovXHJcbnN0cmF0cy5kYXRhID0gZnVuY3Rpb24gKFxyXG4gIHBhcmVudFZhbCxcclxuICBjaGlsZFZhbCxcclxuICB2bVxyXG4pIHtcclxuICBpZiAoIXZtKSB7XHJcbiAgICAvLyBpbiBhIFZ1ZS5leHRlbmQgbWVyZ2UsIGJvdGggc2hvdWxkIGJlIGZ1bmN0aW9uc1xyXG4gICAgaWYgKCFjaGlsZFZhbCkge1xyXG4gICAgICByZXR1cm4gcGFyZW50VmFsXHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXHJcbiAgICAgICAgJ1RoZSBcImRhdGFcIiBvcHRpb24gc2hvdWxkIGJlIGEgZnVuY3Rpb24gJyArXHJcbiAgICAgICAgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArXHJcbiAgICAgICAgJ2RlZmluaXRpb25zLicsXHJcbiAgICAgICAgdm1cclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIHBhcmVudFZhbFxyXG4gICAgfVxyXG4gICAgaWYgKCFwYXJlbnRWYWwpIHtcclxuICAgICAgcmV0dXJuIGNoaWxkVmFsXHJcbiAgICB9XHJcbiAgICAvLyB3aGVuIHBhcmVudFZhbCAmIGNoaWxkVmFsIGFyZSBib3RoIHByZXNlbnQsXHJcbiAgICAvLyB3ZSBuZWVkIHRvIHJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcclxuICAgIC8vIG1lcmdlZCByZXN1bHQgb2YgYm90aCBmdW5jdGlvbnMuLi4gbm8gbmVlZCB0b1xyXG4gICAgLy8gY2hlY2sgaWYgcGFyZW50VmFsIGlzIGEgZnVuY3Rpb24gaGVyZSBiZWNhdXNlXHJcbiAgICAvLyBpdCBoYXMgdG8gYmUgYSBmdW5jdGlvbiB0byBwYXNzIHByZXZpb3VzIG1lcmdlcy5cclxuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWREYXRhRm4gKCkge1xyXG4gICAgICByZXR1cm4gbWVyZ2VEYXRhKFxyXG4gICAgICAgIGNoaWxkVmFsLmNhbGwodGhpcyksXHJcbiAgICAgICAgcGFyZW50VmFsLmNhbGwodGhpcylcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocGFyZW50VmFsIHx8IGNoaWxkVmFsKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkSW5zdGFuY2VEYXRhRm4gKCkge1xyXG4gICAgICAvLyBpbnN0YW5jZSBtZXJnZVxyXG4gICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgPyBjaGlsZFZhbC5jYWxsKHZtKVxyXG4gICAgICAgIDogY2hpbGRWYWw7XHJcbiAgICAgIHZhciBkZWZhdWx0RGF0YSA9IHR5cGVvZiBwYXJlbnRWYWwgPT09ICdmdW5jdGlvbidcclxuICAgICAgICA/IHBhcmVudFZhbC5jYWxsKHZtKVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoaW5zdGFuY2VEYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlRGF0YShpbnN0YW5jZURhdGEsIGRlZmF1bHREYXRhKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RGF0YVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhvb2tzIGFuZCBwYXJhbSBhdHRyaWJ1dGVzIGFyZSBtZXJnZWQgYXMgYXJyYXlzLlxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VIb29rIChcclxuICBwYXJlbnRWYWwsXHJcbiAgY2hpbGRWYWxcclxuKSB7XHJcbiAgcmV0dXJuIGNoaWxkVmFsXHJcbiAgICA/IHBhcmVudFZhbFxyXG4gICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXHJcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZFZhbClcclxuICAgICAgICA/IGNoaWxkVmFsXHJcbiAgICAgICAgOiBbY2hpbGRWYWxdXHJcbiAgICA6IHBhcmVudFZhbFxyXG59XHJcblxyXG5jb25maWcuX2xpZmVjeWNsZUhvb2tzLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcclxuICBzdHJhdHNbaG9va10gPSBtZXJnZUhvb2s7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEFzc2V0c1xyXG4gKlxyXG4gKiBXaGVuIGEgdm0gaXMgcHJlc2VudCAoaW5zdGFuY2UgY3JlYXRpb24pLCB3ZSBuZWVkIHRvIGRvXHJcbiAqIGEgdGhyZWUtd2F5IG1lcmdlIGJldHdlZW4gY29uc3RydWN0b3Igb3B0aW9ucywgaW5zdGFuY2VcclxuICogb3B0aW9ucyBhbmQgcGFyZW50IG9wdGlvbnMuXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZUFzc2V0cyAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xyXG4gIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFZhbCB8fCBudWxsKTtcclxuICByZXR1cm4gY2hpbGRWYWxcclxuICAgID8gZXh0ZW5kKHJlcywgY2hpbGRWYWwpXHJcbiAgICA6IHJlc1xyXG59XHJcblxyXG5jb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xyXG4gIHN0cmF0c1t0eXBlICsgJ3MnXSA9IG1lcmdlQXNzZXRzO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBXYXRjaGVycy5cclxuICpcclxuICogV2F0Y2hlcnMgaGFzaGVzIHNob3VsZCBub3Qgb3ZlcndyaXRlIG9uZVxyXG4gKiBhbm90aGVyLCBzbyB3ZSBtZXJnZSB0aGVtIGFzIGFycmF5cy5cclxuICovXHJcbnN0cmF0cy53YXRjaCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgaWYgKCFjaGlsZFZhbCkgeyByZXR1cm4gcGFyZW50VmFsIH1cclxuICBpZiAoIXBhcmVudFZhbCkgeyByZXR1cm4gY2hpbGRWYWwgfVxyXG4gIHZhciByZXQgPSB7fTtcclxuICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xyXG4gIGZvciAodmFyIGtleSBpbiBjaGlsZFZhbCkge1xyXG4gICAgdmFyIHBhcmVudCA9IHJldFtrZXldO1xyXG4gICAgdmFyIGNoaWxkID0gY2hpbGRWYWxba2V5XTtcclxuICAgIGlmIChwYXJlbnQgJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkge1xyXG4gICAgICBwYXJlbnQgPSBbcGFyZW50XTtcclxuICAgIH1cclxuICAgIHJldFtrZXldID0gcGFyZW50XHJcbiAgICAgID8gcGFyZW50LmNvbmNhdChjaGlsZClcclxuICAgICAgOiBbY2hpbGRdO1xyXG4gIH1cclxuICByZXR1cm4gcmV0XHJcbn07XHJcblxyXG4vKipcclxuICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cclxuICovXHJcbnN0cmF0cy5wcm9wcyA9XHJcbnN0cmF0cy5tZXRob2RzID1cclxuc3RyYXRzLmNvbXB1dGVkID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcclxuICBpZiAoIWNoaWxkVmFsKSB7IHJldHVybiBwYXJlbnRWYWwgfVxyXG4gIGlmICghcGFyZW50VmFsKSB7IHJldHVybiBjaGlsZFZhbCB9XHJcbiAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKTtcclxuICBleHRlbmQocmV0LCBjaGlsZFZhbCk7XHJcbiAgcmV0dXJuIHJldFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgc3RyYXRlZ3kuXHJcbiAqL1xyXG52YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcclxuICByZXR1cm4gY2hpbGRWYWwgPT09IHVuZGVmaW5lZFxyXG4gICAgPyBwYXJlbnRWYWxcclxuICAgIDogY2hpbGRWYWxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWYWxpZGF0ZSBjb21wb25lbnQgbmFtZXNcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrQ29tcG9uZW50cyAob3B0aW9ucykge1xyXG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLmNvbXBvbmVudHMpIHtcclxuICAgIHZhciBsb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGlzQnVpbHRJblRhZyhsb3dlcikgfHwgY29uZmlnLmlzUmVzZXJ2ZWRUYWcobG93ZXIpKSB7XHJcbiAgICAgIHdhcm4oXHJcbiAgICAgICAgJ0RvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgJyArXHJcbiAgICAgICAgJ2lkOiAnICsga2V5XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRW5zdXJlIGFsbCBwcm9wcyBvcHRpb24gc3ludGF4IGFyZSBub3JtYWxpemVkIGludG8gdGhlXHJcbiAqIE9iamVjdC1iYXNlZCBmb3JtYXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemVQcm9wcyAob3B0aW9ucykge1xyXG4gIHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XHJcbiAgaWYgKCFwcm9wcykgeyByZXR1cm4gfVxyXG4gIHZhciByZXMgPSB7fTtcclxuICB2YXIgaSwgdmFsLCBuYW1lO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkge1xyXG4gICAgaSA9IHByb3BzLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgdmFsID0gcHJvcHNbaV07XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIG5hbWUgPSBjYW1lbGl6ZSh2YWwpO1xyXG4gICAgICAgIHJlc1tuYW1lXSA9IHsgdHlwZTogbnVsbCB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdhcm4oJ3Byb3BzIG11c3QgYmUgc3RyaW5ncyB3aGVuIHVzaW5nIGFycmF5IHN5bnRheC4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwcm9wcykpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xyXG4gICAgICB2YWwgPSBwcm9wc1trZXldO1xyXG4gICAgICBuYW1lID0gY2FtZWxpemUoa2V5KTtcclxuICAgICAgcmVzW25hbWVdID0gaXNQbGFpbk9iamVjdCh2YWwpXHJcbiAgICAgICAgPyB2YWxcclxuICAgICAgICA6IHsgdHlwZTogdmFsIH07XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wdGlvbnMucHJvcHMgPSByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemUgcmF3IGZ1bmN0aW9uIGRpcmVjdGl2ZXMgaW50byBvYmplY3QgZm9ybWF0LlxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyAob3B0aW9ucykge1xyXG4gIHZhciBkaXJzID0gb3B0aW9ucy5kaXJlY3RpdmVzO1xyXG4gIGlmIChkaXJzKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gZGlycykge1xyXG4gICAgICB2YXIgZGVmID0gZGlyc1trZXldO1xyXG4gICAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGRpcnNba2V5XSA9IHsgYmluZDogZGVmLCB1cGRhdGU6IGRlZiB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogTWVyZ2UgdHdvIG9wdGlvbiBvYmplY3RzIGludG8gYSBuZXcgb25lLlxyXG4gKiBDb3JlIHV0aWxpdHkgdXNlZCBpbiBib3RoIGluc3RhbnRpYXRpb24gYW5kIGluaGVyaXRhbmNlLlxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zIChcclxuICBwYXJlbnQsXHJcbiAgY2hpbGQsXHJcbiAgdm1cclxuKSB7XHJcbiAge1xyXG4gICAgY2hlY2tDb21wb25lbnRzKGNoaWxkKTtcclxuICB9XHJcbiAgbm9ybWFsaXplUHJvcHMoY2hpbGQpO1xyXG4gIG5vcm1hbGl6ZURpcmVjdGl2ZXMoY2hpbGQpO1xyXG4gIHZhciBleHRlbmRzRnJvbSA9IGNoaWxkLmV4dGVuZHM7XHJcbiAgaWYgKGV4dGVuZHNGcm9tKSB7XHJcbiAgICBwYXJlbnQgPSB0eXBlb2YgZXh0ZW5kc0Zyb20gPT09ICdmdW5jdGlvbidcclxuICAgICAgPyBtZXJnZU9wdGlvbnMocGFyZW50LCBleHRlbmRzRnJvbS5vcHRpb25zLCB2bSlcclxuICAgICAgOiBtZXJnZU9wdGlvbnMocGFyZW50LCBleHRlbmRzRnJvbSwgdm0pO1xyXG4gIH1cclxuICBpZiAoY2hpbGQubWl4aW5zKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkLm1peGlucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgdmFyIG1peGluID0gY2hpbGQubWl4aW5zW2ldO1xyXG4gICAgICBpZiAobWl4aW4ucHJvdG90eXBlIGluc3RhbmNlb2YgVnVlJDMpIHtcclxuICAgICAgICBtaXhpbiA9IG1peGluLm9wdGlvbnM7XHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgbWl4aW4sIHZtKTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFyIG9wdGlvbnMgPSB7fTtcclxuICB2YXIga2V5O1xyXG4gIGZvciAoa2V5IGluIHBhcmVudCkge1xyXG4gICAgbWVyZ2VGaWVsZChrZXkpO1xyXG4gIH1cclxuICBmb3IgKGtleSBpbiBjaGlsZCkge1xyXG4gICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkpKSB7XHJcbiAgICAgIG1lcmdlRmllbGQoa2V5KTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gbWVyZ2VGaWVsZCAoa2V5KSB7XHJcbiAgICB2YXIgc3RyYXQgPSBzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQ7XHJcbiAgICBvcHRpb25zW2tleV0gPSBzdHJhdChwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwgdm0sIGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiBvcHRpb25zXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlIGFuIGFzc2V0LlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgYmVjYXVzZSBjaGlsZCBpbnN0YW5jZXMgbmVlZCBhY2Nlc3NcclxuICogdG8gYXNzZXRzIGRlZmluZWQgaW4gaXRzIGFuY2VzdG9yIGNoYWluLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVzb2x2ZUFzc2V0IChcclxuICBvcHRpb25zLFxyXG4gIHR5cGUsXHJcbiAgaWQsXHJcbiAgd2Fybk1pc3NpbmdcclxuKSB7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICB2YXIgYXNzZXRzID0gb3B0aW9uc1t0eXBlXTtcclxuICB2YXIgcmVzID0gYXNzZXRzW2lkXSB8fFxyXG4gICAgLy8gY2FtZWxDYXNlIElEXHJcbiAgICBhc3NldHNbY2FtZWxpemUoaWQpXSB8fFxyXG4gICAgLy8gUGFzY2FsIENhc2UgSURcclxuICAgIGFzc2V0c1tjYXBpdGFsaXplKGNhbWVsaXplKGlkKSldO1xyXG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuTWlzc2luZyAmJiAhcmVzKSB7XHJcbiAgICB3YXJuKFxyXG4gICAgICAnRmFpbGVkIHRvIHJlc29sdmUgJyArIHR5cGUuc2xpY2UoMCwgLTEpICsgJzogJyArIGlkLFxyXG4gICAgICBvcHRpb25zXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gcmVzXHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wIChcclxuICBrZXksXHJcbiAgcHJvcE9wdGlvbnMsXHJcbiAgcHJvcHNEYXRhLFxyXG4gIHZtXHJcbikge1xyXG4gIHZhciBwcm9wID0gcHJvcE9wdGlvbnNba2V5XTtcclxuICB2YXIgYWJzZW50ID0gIWhhc093bihwcm9wc0RhdGEsIGtleSk7XHJcbiAgdmFyIHZhbHVlID0gcHJvcHNEYXRhW2tleV07XHJcbiAgLy8gaGFuZGxlIGJvb2xlYW4gcHJvcHNcclxuICBpZiAoaXNCb29sZWFuVHlwZShwcm9wLnR5cGUpKSB7XHJcbiAgICBpZiAoYWJzZW50ICYmICFoYXNPd24ocHJvcCwgJ2RlZmF1bHQnKSkge1xyXG4gICAgICB2YWx1ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IGh5cGhlbmF0ZShrZXkpKSB7XHJcbiAgICAgIHZhbHVlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gY2hlY2sgZGVmYXVsdCB2YWx1ZVxyXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB2YWx1ZSA9IGdldFByb3BEZWZhdWx0VmFsdWUodm0sIHByb3AsIGtleSk7XHJcbiAgICAvLyBzaW5jZSB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBhIGZyZXNoIGNvcHksXHJcbiAgICAvLyBtYWtlIHN1cmUgdG8gb2JzZXJ2ZSBpdC5cclxuICAgIHZhciBwcmV2U2hvdWxkQ29udmVydCA9IG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydDtcclxuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IHRydWU7XHJcbiAgICBvYnNlcnZlKHZhbHVlKTtcclxuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IHByZXZTaG91bGRDb252ZXJ0O1xyXG4gIH1cclxuICB7XHJcbiAgICBhc3NlcnRQcm9wKHByb3AsIGtleSwgdmFsdWUsIHZtLCBhYnNlbnQpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWVcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhIHByb3AuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQcm9wRGVmYXVsdFZhbHVlICh2bSwgcHJvcCwga2V5KSB7XHJcbiAgLy8gbm8gZGVmYXVsdCwgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIGlmICghaGFzT3duKHByb3AsICdkZWZhdWx0JykpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWRcclxuICB9XHJcbiAgdmFyIGRlZiA9IHByb3AuZGVmYXVsdDtcclxuICAvLyB3YXJuIGFnYWluc3Qgbm9uLWZhY3RvcnkgZGVmYXVsdHMgZm9yIE9iamVjdCAmIEFycmF5XHJcbiAgaWYgKGlzT2JqZWN0KGRlZikpIHtcclxuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXHJcbiAgICAgICdJbnZhbGlkIGRlZmF1bHQgdmFsdWUgZm9yIHByb3AgXCInICsga2V5ICsgJ1wiOiAnICtcclxuICAgICAgJ1Byb3BzIHdpdGggdHlwZSBPYmplY3QvQXJyYXkgbXVzdCB1c2UgYSBmYWN0b3J5IGZ1bmN0aW9uICcgK1xyXG4gICAgICAndG8gcmV0dXJuIHRoZSBkZWZhdWx0IHZhbHVlLicsXHJcbiAgICAgIHZtXHJcbiAgICApO1xyXG4gIH1cclxuICAvLyB0aGUgcmF3IHByb3AgdmFsdWUgd2FzIGFsc28gdW5kZWZpbmVkIGZyb20gcHJldmlvdXMgcmVuZGVyLFxyXG4gIC8vIHJldHVybiBwcmV2aW91cyBkZWZhdWx0IHZhbHVlIHRvIGF2b2lkIHVubmVjZXNzYXJ5IHdhdGNoZXIgdHJpZ2dlclxyXG4gIGlmICh2bSAmJiB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgJiZcclxuICAgIHZtLiRvcHRpb25zLnByb3BzRGF0YVtrZXldID09PSB1bmRlZmluZWQgJiZcclxuICAgIHZtW2tleV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIHZtW2tleV1cclxuICB9XHJcbiAgLy8gY2FsbCBmYWN0b3J5IGZ1bmN0aW9uIGZvciBub24tRnVuY3Rpb24gdHlwZXNcclxuICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wLnR5cGUgIT09IEZ1bmN0aW9uXHJcbiAgICA/IGRlZi5jYWxsKHZtKVxyXG4gICAgOiBkZWZcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB3aGV0aGVyIGEgcHJvcCBpcyB2YWxpZC5cclxuICovXHJcbmZ1bmN0aW9uIGFzc2VydFByb3AgKFxyXG4gIHByb3AsXHJcbiAgbmFtZSxcclxuICB2YWx1ZSxcclxuICB2bSxcclxuICBhYnNlbnRcclxuKSB7XHJcbiAgaWYgKHByb3AucmVxdWlyZWQgJiYgYWJzZW50KSB7XHJcbiAgICB3YXJuKFxyXG4gICAgICAnTWlzc2luZyByZXF1aXJlZCBwcm9wOiBcIicgKyBuYW1lICsgJ1wiJyxcclxuICAgICAgdm1cclxuICAgICk7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgaWYgKHZhbHVlID09IG51bGwgJiYgIXByb3AucmVxdWlyZWQpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICB2YXIgdHlwZSA9IHByb3AudHlwZTtcclxuICB2YXIgdmFsaWQgPSAhdHlwZSB8fCB0eXBlID09PSB0cnVlO1xyXG4gIHZhciBleHBlY3RlZFR5cGVzID0gW107XHJcbiAgaWYgKHR5cGUpIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0eXBlKSkge1xyXG4gICAgICB0eXBlID0gW3R5cGVdO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aCAmJiAhdmFsaWQ7IGkrKykge1xyXG4gICAgICB2YXIgYXNzZXJ0ZWRUeXBlID0gYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZVtpXSk7XHJcbiAgICAgIGV4cGVjdGVkVHlwZXMucHVzaChhc3NlcnRlZFR5cGUuZXhwZWN0ZWRUeXBlKTtcclxuICAgICAgdmFsaWQgPSBhc3NlcnRlZFR5cGUudmFsaWQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICghdmFsaWQpIHtcclxuICAgIHdhcm4oXHJcbiAgICAgICdJbnZhbGlkIHByb3A6IHR5cGUgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJyArIG5hbWUgKyAnXCIuJyArXHJcbiAgICAgICcgRXhwZWN0ZWQgJyArIGV4cGVjdGVkVHlwZXMubWFwKGNhcGl0YWxpemUpLmpvaW4oJywgJykgK1xyXG4gICAgICAnLCBnb3QgJyArIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpICsgJy4nLFxyXG4gICAgICB2bVxyXG4gICAgKTtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICB2YXIgdmFsaWRhdG9yID0gcHJvcC52YWxpZGF0b3I7XHJcbiAgaWYgKHZhbGlkYXRvcikge1xyXG4gICAgaWYgKCF2YWxpZGF0b3IodmFsdWUpKSB7XHJcbiAgICAgIHdhcm4oXHJcbiAgICAgICAgJ0ludmFsaWQgcHJvcDogY3VzdG9tIHZhbGlkYXRvciBjaGVjayBmYWlsZWQgZm9yIHByb3AgXCInICsgbmFtZSArICdcIi4nLFxyXG4gICAgICAgIHZtXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoZSB0eXBlIG9mIGEgdmFsdWVcclxuICovXHJcbmZ1bmN0aW9uIGFzc2VydFR5cGUgKHZhbHVlLCB0eXBlKSB7XHJcbiAgdmFyIHZhbGlkO1xyXG4gIHZhciBleHBlY3RlZFR5cGUgPSBnZXRUeXBlKHR5cGUpO1xyXG4gIGlmIChleHBlY3RlZFR5cGUgPT09ICdTdHJpbmcnKSB7XHJcbiAgICB2YWxpZCA9IHR5cGVvZiB2YWx1ZSA9PT0gKGV4cGVjdGVkVHlwZSA9ICdzdHJpbmcnKTtcclxuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ051bWJlcicpIHtcclxuICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSAoZXhwZWN0ZWRUeXBlID0gJ251bWJlcicpO1xyXG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWRUeXBlID09PSAnQm9vbGVhbicpIHtcclxuICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSAoZXhwZWN0ZWRUeXBlID0gJ2Jvb2xlYW4nKTtcclxuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ0Z1bmN0aW9uJykge1xyXG4gICAgdmFsaWQgPSB0eXBlb2YgdmFsdWUgPT09IChleHBlY3RlZFR5cGUgPSAnZnVuY3Rpb24nKTtcclxuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ09iamVjdCcpIHtcclxuICAgIHZhbGlkID0gaXNQbGFpbk9iamVjdCh2YWx1ZSk7XHJcbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdBcnJheScpIHtcclxuICAgIHZhbGlkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgdmFsaWQ6IHZhbGlkLFxyXG4gICAgZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGVcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVc2UgZnVuY3Rpb24gc3RyaW5nIG5hbWUgdG8gY2hlY2sgYnVpbHQtaW4gdHlwZXMsXHJcbiAqIGJlY2F1c2UgYSBzaW1wbGUgZXF1YWxpdHkgY2hlY2sgd2lsbCBmYWlsIHdoZW4gcnVubmluZ1xyXG4gKiBhY3Jvc3MgZGlmZmVyZW50IHZtcyAvIGlmcmFtZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRUeXBlIChmbikge1xyXG4gIHZhciBtYXRjaCA9IGZuICYmIGZuLnRvU3RyaW5nKCkubWF0Y2goL15cXHMqZnVuY3Rpb24gKFxcdyspLyk7XHJcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQm9vbGVhblR5cGUgKGZuKSB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGZuKSkge1xyXG4gICAgcmV0dXJuIGdldFR5cGUoZm4pID09PSAnQm9vbGVhbidcclxuICB9XHJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICBpZiAoZ2V0VHlwZShmbltpXSkgPT09ICdCb29sZWFuJykge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5cclxuXHJcbnZhciB1dGlsID0gT2JqZWN0LmZyZWV6ZSh7XHJcblx0ZGVmaW5lUmVhY3RpdmU6IGRlZmluZVJlYWN0aXZlJCQxLFxyXG5cdF90b1N0cmluZzogX3RvU3RyaW5nLFxyXG5cdHRvTnVtYmVyOiB0b051bWJlcixcclxuXHRtYWtlTWFwOiBtYWtlTWFwLFxyXG5cdGlzQnVpbHRJblRhZzogaXNCdWlsdEluVGFnLFxyXG5cdHJlbW92ZTogcmVtb3ZlJDEsXHJcblx0aGFzT3duOiBoYXNPd24sXHJcblx0aXNQcmltaXRpdmU6IGlzUHJpbWl0aXZlLFxyXG5cdGNhY2hlZDogY2FjaGVkLFxyXG5cdGNhbWVsaXplOiBjYW1lbGl6ZSxcclxuXHRjYXBpdGFsaXplOiBjYXBpdGFsaXplLFxyXG5cdGh5cGhlbmF0ZTogaHlwaGVuYXRlLFxyXG5cdGJpbmQ6IGJpbmQkMSxcclxuXHR0b0FycmF5OiB0b0FycmF5LFxyXG5cdGV4dGVuZDogZXh0ZW5kLFxyXG5cdGlzT2JqZWN0OiBpc09iamVjdCxcclxuXHRpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxyXG5cdHRvT2JqZWN0OiB0b09iamVjdCxcclxuXHRub29wOiBub29wLFxyXG5cdG5vOiBubyxcclxuXHRnZW5TdGF0aWNLZXlzOiBnZW5TdGF0aWNLZXlzLFxyXG5cdGxvb3NlRXF1YWw6IGxvb3NlRXF1YWwsXHJcblx0bG9vc2VJbmRleE9mOiBsb29zZUluZGV4T2YsXHJcblx0aXNSZXNlcnZlZDogaXNSZXNlcnZlZCxcclxuXHRkZWY6IGRlZixcclxuXHRwYXJzZVBhdGg6IHBhcnNlUGF0aCxcclxuXHRoYXNQcm90bzogaGFzUHJvdG8sXHJcblx0aW5Ccm93c2VyOiBpbkJyb3dzZXIsXHJcblx0VUE6IFVBLFxyXG5cdGlzSUU6IGlzSUUsXHJcblx0aXNJRTk6IGlzSUU5LFxyXG5cdGlzRWRnZTogaXNFZGdlLFxyXG5cdGlzQW5kcm9pZDogaXNBbmRyb2lkLFxyXG5cdGlzSU9TOiBpc0lPUyxcclxuXHRkZXZ0b29sczogZGV2dG9vbHMsXHJcblx0bmV4dFRpY2s6IG5leHRUaWNrLFxyXG5cdGdldCBfU2V0ICgpIHsgcmV0dXJuIF9TZXQ7IH0sXHJcblx0bWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXHJcblx0cmVzb2x2ZUFzc2V0OiByZXNvbHZlQXNzZXQsXHJcblx0Z2V0IHdhcm4gKCkgeyByZXR1cm4gd2FybjsgfSxcclxuXHRnZXQgZm9ybWF0Q29tcG9uZW50TmFtZSAoKSB7IHJldHVybiBmb3JtYXRDb21wb25lbnROYW1lOyB9LFxyXG5cdHZhbGlkYXRlUHJvcDogdmFsaWRhdGVQcm9wXHJcbn0pO1xyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBpbml0VXNlIChWdWUpIHtcclxuICBWdWUudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAocGx1Z2luLmluc3RhbGxlZCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIC8vIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xyXG4gICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XHJcbiAgICBhcmdzLnVuc2hpZnQodGhpcyk7XHJcbiAgICBpZiAodHlwZW9mIHBsdWdpbi5pbnN0YWxsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHBsdWdpbi5pbnN0YWxsLmFwcGx5KHBsdWdpbiwgYXJncyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwbHVnaW4uYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICBwbHVnaW4uaW5zdGFsbGVkID0gdHJ1ZTtcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfTtcclxufVxyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBpbml0TWl4aW4kMSAoVnVlKSB7XHJcbiAgVnVlLm1peGluID0gZnVuY3Rpb24gKG1peGluKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnModGhpcy5vcHRpb25zLCBtaXhpbik7XHJcbiAgfTtcclxufVxyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBpbml0RXh0ZW5kIChWdWUpIHtcclxuICAvKipcclxuICAgKiBFYWNoIGluc3RhbmNlIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgVnVlLCBoYXMgYSB1bmlxdWVcclxuICAgKiBjaWQuIFRoaXMgZW5hYmxlcyB1cyB0byBjcmVhdGUgd3JhcHBlZCBcImNoaWxkXHJcbiAgICogY29uc3RydWN0b3JzXCIgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UgYW5kIGNhY2hlIHRoZW0uXHJcbiAgICovXHJcbiAgVnVlLmNpZCA9IDA7XHJcbiAgdmFyIGNpZCA9IDE7XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYXNzIGluaGVyaXRhbmNlXHJcbiAgICovXHJcbiAgVnVlLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbmRPcHRpb25zKSB7XHJcbiAgICBleHRlbmRPcHRpb25zID0gZXh0ZW5kT3B0aW9ucyB8fCB7fTtcclxuICAgIHZhciBTdXBlciA9IHRoaXM7XHJcbiAgICB2YXIgU3VwZXJJZCA9IFN1cGVyLmNpZDtcclxuICAgIHZhciBjYWNoZWRDdG9ycyA9IGV4dGVuZE9wdGlvbnMuX0N0b3IgfHwgKGV4dGVuZE9wdGlvbnMuX0N0b3IgPSB7fSk7XHJcbiAgICBpZiAoY2FjaGVkQ3RvcnNbU3VwZXJJZF0pIHtcclxuICAgICAgcmV0dXJuIGNhY2hlZEN0b3JzW1N1cGVySWRdXHJcbiAgICB9XHJcbiAgICB2YXIgbmFtZSA9IGV4dGVuZE9wdGlvbnMubmFtZSB8fCBTdXBlci5vcHRpb25zLm5hbWU7XHJcbiAgICB7XHJcbiAgICAgIGlmICghL15bYS16QS1aXVtcXHctXSokLy50ZXN0KG5hbWUpKSB7XHJcbiAgICAgICAgd2FybihcclxuICAgICAgICAgICdJbnZhbGlkIGNvbXBvbmVudCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiLiBDb21wb25lbnQgbmFtZXMgJyArXHJcbiAgICAgICAgICAnY2FuIG9ubHkgY29udGFpbiBhbHBoYW51bWVyaWMgY2hhcmFjYXRlcnMgYW5kIHRoZSBoeXBoZW4uJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBTdWIgPSBmdW5jdGlvbiBWdWVDb21wb25lbnQgKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcclxuICAgIH07XHJcbiAgICBTdWIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlci5wcm90b3R5cGUpO1xyXG4gICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcclxuICAgIFN1Yi5jaWQgPSBjaWQrKztcclxuICAgIFN1Yi5vcHRpb25zID0gbWVyZ2VPcHRpb25zKFxyXG4gICAgICBTdXBlci5vcHRpb25zLFxyXG4gICAgICBleHRlbmRPcHRpb25zXHJcbiAgICApO1xyXG4gICAgU3ViWydzdXBlciddID0gU3VwZXI7XHJcbiAgICAvLyBhbGxvdyBmdXJ0aGVyIGV4dGVuc2lvbi9taXhpbi9wbHVnaW4gdXNhZ2VcclxuICAgIFN1Yi5leHRlbmQgPSBTdXBlci5leHRlbmQ7XHJcbiAgICBTdWIubWl4aW4gPSBTdXBlci5taXhpbjtcclxuICAgIFN1Yi51c2UgPSBTdXBlci51c2U7XHJcbiAgICAvLyBjcmVhdGUgYXNzZXQgcmVnaXN0ZXJzLCBzbyBleHRlbmRlZCBjbGFzc2VzXHJcbiAgICAvLyBjYW4gaGF2ZSB0aGVpciBwcml2YXRlIGFzc2V0cyB0b28uXHJcbiAgICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICBTdWJbdHlwZV0gPSBTdXBlclt0eXBlXTtcclxuICAgIH0pO1xyXG4gICAgLy8gZW5hYmxlIHJlY3Vyc2l2ZSBzZWxmLWxvb2t1cFxyXG4gICAgaWYgKG5hbWUpIHtcclxuICAgICAgU3ViLm9wdGlvbnMuY29tcG9uZW50c1tuYW1lXSA9IFN1YjtcclxuICAgIH1cclxuICAgIC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyIG9wdGlvbnMgYXQgZXh0ZW5zaW9uIHRpbWUuXHJcbiAgICAvLyBsYXRlciBhdCBpbnN0YW50aWF0aW9uIHdlIGNhbiBjaGVjayBpZiBTdXBlcidzIG9wdGlvbnMgaGF2ZVxyXG4gICAgLy8gYmVlbiB1cGRhdGVkLlxyXG4gICAgU3ViLnN1cGVyT3B0aW9ucyA9IFN1cGVyLm9wdGlvbnM7XHJcbiAgICBTdWIuZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnM7XHJcbiAgICAvLyBjYWNoZSBjb25zdHJ1Y3RvclxyXG4gICAgY2FjaGVkQ3RvcnNbU3VwZXJJZF0gPSBTdWI7XHJcbiAgICByZXR1cm4gU3ViXHJcbiAgfTtcclxufVxyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBpbml0QXNzZXRSZWdpc3RlcnMgKFZ1ZSkge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhc3NldCByZWdpc3RyYXRpb24gbWV0aG9kcy5cclxuICAgKi9cclxuICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgVnVlW3R5cGVdID0gZnVuY3Rpb24gKFxyXG4gICAgICBpZCxcclxuICAgICAgZGVmaW5pdGlvblxyXG4gICAgKSB7XHJcbiAgICAgIGlmICghZGVmaW5pdGlvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnICYmIGNvbmZpZy5pc1Jlc2VydmVkVGFnKGlkKSkge1xyXG4gICAgICAgICAgICB3YXJuKFxyXG4gICAgICAgICAgICAgICdEbyBub3QgdXNlIGJ1aWx0LWluIG9yIHJlc2VydmVkIEhUTUwgZWxlbWVudHMgYXMgY29tcG9uZW50ICcgK1xyXG4gICAgICAgICAgICAgICdpZDogJyArIGlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnY29tcG9uZW50JyAmJiBpc1BsYWluT2JqZWN0KGRlZmluaXRpb24pKSB7XHJcbiAgICAgICAgICBkZWZpbml0aW9uLm5hbWUgPSBkZWZpbml0aW9uLm5hbWUgfHwgaWQ7XHJcbiAgICAgICAgICBkZWZpbml0aW9uID0gdGhpcy5vcHRpb25zLl9iYXNlLmV4dGVuZChkZWZpbml0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdkaXJlY3RpdmUnICYmIHR5cGVvZiBkZWZpbml0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBkZWZpbml0aW9uID0geyBiaW5kOiBkZWZpbml0aW9uLCB1cGRhdGU6IGRlZmluaXRpb24gfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXSA9IGRlZmluaXRpb247XHJcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9KTtcclxufVxyXG5cclxudmFyIEtlZXBBbGl2ZSA9IHtcclxuICBuYW1lOiAna2VlcC1hbGl2ZScsXHJcbiAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCAoKSB7XHJcbiAgICB0aGlzLmNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyICgpIHtcclxuICAgIHZhciB2bm9kZSA9IGdldEZpcnN0Q29tcG9uZW50Q2hpbGQodGhpcy4kc2xvdHMuZGVmYXVsdCk7XHJcbiAgICBpZiAodm5vZGUgJiYgdm5vZGUuY29tcG9uZW50T3B0aW9ucykge1xyXG4gICAgICB2YXIgb3B0cyA9IHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XHJcbiAgICAgIHZhciBrZXkgPSB2bm9kZS5rZXkgPT0gbnVsbFxyXG4gICAgICAgIC8vIHNhbWUgY29uc3RydWN0b3IgbWF5IGdldCByZWdpc3RlcmVkIGFzIGRpZmZlcmVudCBsb2NhbCBjb21wb25lbnRzXHJcbiAgICAgICAgLy8gc28gY2lkIGFsb25lIGlzIG5vdCBlbm91Z2ggKCMzMjY5KVxyXG4gICAgICAgID8gb3B0cy5DdG9yLmNpZCArICc6OicgKyBvcHRzLnRhZ1xyXG4gICAgICAgIDogdm5vZGUua2V5O1xyXG4gICAgICBpZiAodGhpcy5jYWNoZVtrZXldKSB7XHJcbiAgICAgICAgdm5vZGUuY2hpbGQgPSB0aGlzLmNhY2hlW2tleV0uY2hpbGQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jYWNoZVtrZXldID0gdm5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgdm5vZGUuZGF0YS5rZWVwQWxpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZub2RlXHJcbiAgfSxcclxuICBkZXN0cm95ZWQ6IGZ1bmN0aW9uIGRlc3Ryb3llZCAoKSB7XHJcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jYWNoZSkge1xyXG4gICAgICB2YXIgdm5vZGUgPSB0aGlzJDEuY2FjaGVba2V5XTtcclxuICAgICAgY2FsbEhvb2sodm5vZGUuY2hpbGQsICdkZWFjdGl2YXRlZCcpO1xyXG4gICAgICB2bm9kZS5jaGlsZC4kZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbnZhciBidWlsdEluQ29tcG9uZW50cyA9IHtcclxuICBLZWVwQWxpdmU6IEtlZXBBbGl2ZVxyXG59O1xyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBpbml0R2xvYmFsQVBJIChWdWUpIHtcclxuICAvLyBjb25maWdcclxuICB2YXIgY29uZmlnRGVmID0ge307XHJcbiAgY29uZmlnRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbmZpZzsgfTtcclxuICB7XHJcbiAgICBjb25maWdEZWYuc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB3YXJuKFxyXG4gICAgICAgICdEbyBub3QgcmVwbGFjZSB0aGUgVnVlLmNvbmZpZyBvYmplY3QsIHNldCBpbmRpdmlkdWFsIGZpZWxkcyBpbnN0ZWFkLidcclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUsICdjb25maWcnLCBjb25maWdEZWYpO1xyXG4gIFZ1ZS51dGlsID0gdXRpbDtcclxuICBWdWUuc2V0ID0gc2V0O1xyXG4gIFZ1ZS5kZWxldGUgPSBkZWw7XHJcbiAgVnVlLm5leHRUaWNrID0gbmV4dFRpY2s7XHJcblxyXG4gIFZ1ZS5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgVnVlLm9wdGlvbnNbdHlwZSArICdzJ10gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIH0pO1xyXG5cclxuICAvLyB0aGlzIGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIFwiYmFzZVwiIGNvbnN0cnVjdG9yIHRvIGV4dGVuZCBhbGwgcGxhaW4tb2JqZWN0XHJcbiAgLy8gY29tcG9uZW50cyB3aXRoIGluIFdlZXgncyBtdWx0aS1pbnN0YW5jZSBzY2VuYXJpb3MuXHJcbiAgVnVlLm9wdGlvbnMuX2Jhc2UgPSBWdWU7XHJcblxyXG4gIGV4dGVuZChWdWUub3B0aW9ucy5jb21wb25lbnRzLCBidWlsdEluQ29tcG9uZW50cyk7XHJcblxyXG4gIGluaXRVc2UoVnVlKTtcclxuICBpbml0TWl4aW4kMShWdWUpO1xyXG4gIGluaXRFeHRlbmQoVnVlKTtcclxuICBpbml0QXNzZXRSZWdpc3RlcnMoVnVlKTtcclxufVxyXG5cclxuaW5pdEdsb2JhbEFQSShWdWUkMyk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlJDMucHJvdG90eXBlLCAnJGlzU2VydmVyJywge1xyXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uZmlnLl9pc1NlcnZlcjsgfVxyXG59KTtcclxuXHJcblZ1ZSQzLnZlcnNpb24gPSAnMi4wLjgnO1xyXG5cclxuLyogICovXHJcblxyXG4vLyBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGJlIHVzaW5nIHByb3BzIGZvciBiaW5kaW5nXHJcbnZhciBtdXN0VXNlUHJvcCA9IGZ1bmN0aW9uICh0YWcsIGF0dHIpIHtcclxuICByZXR1cm4gKFxyXG4gICAgKGF0dHIgPT09ICd2YWx1ZScgJiYgKHRhZyA9PT0gJ2lucHV0JyB8fCB0YWcgPT09ICd0ZXh0YXJlYScgfHwgdGFnID09PSAnb3B0aW9uJykpIHx8XHJcbiAgICAoYXR0ciA9PT0gJ3NlbGVjdGVkJyAmJiB0YWcgPT09ICdvcHRpb24nKSB8fFxyXG4gICAgKGF0dHIgPT09ICdjaGVja2VkJyAmJiB0YWcgPT09ICdpbnB1dCcpIHx8XHJcbiAgICAoYXR0ciA9PT0gJ211dGVkJyAmJiB0YWcgPT09ICd2aWRlbycpXHJcbiAgKVxyXG59O1xyXG5cclxudmFyIGlzRW51bWVyYXRlZEF0dHIgPSBtYWtlTWFwKCdjb250ZW50ZWRpdGFibGUsZHJhZ2dhYmxlLHNwZWxsY2hlY2snKTtcclxuXHJcbnZhciBpc0Jvb2xlYW5BdHRyID0gbWFrZU1hcChcclxuICAnYWxsb3dmdWxsc2NyZWVuLGFzeW5jLGF1dG9mb2N1cyxhdXRvcGxheSxjaGVja2VkLGNvbXBhY3QsY29udHJvbHMsZGVjbGFyZSwnICtcclxuICAnZGVmYXVsdCxkZWZhdWx0Y2hlY2tlZCxkZWZhdWx0bXV0ZWQsZGVmYXVsdHNlbGVjdGVkLGRlZmVyLGRpc2FibGVkLCcgK1xyXG4gICdlbmFibGVkLGZvcm1ub3ZhbGlkYXRlLGhpZGRlbixpbmRldGVybWluYXRlLGluZXJ0LGlzbWFwLGl0ZW1zY29wZSxsb29wLG11bHRpcGxlLCcgK1xyXG4gICdtdXRlZCxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3ZhbGlkYXRlLG5vd3JhcCxvcGVuLHBhdXNlb25leGl0LHJlYWRvbmx5LCcgK1xyXG4gICdyZXF1aXJlZCxyZXZlcnNlZCxzY29wZWQsc2VhbWxlc3Msc2VsZWN0ZWQsc29ydGFibGUsdHJhbnNsYXRlLCcgK1xyXG4gICd0cnVlc3BlZWQsdHlwZW11c3RtYXRjaCx2aXNpYmxlJ1xyXG4pO1xyXG5cclxudmFyIGlzQXR0ciA9IG1ha2VNYXAoXHJcbiAgJ2FjY2VwdCxhY2NlcHQtY2hhcnNldCxhY2Nlc3NrZXksYWN0aW9uLGFsaWduLGFsdCxhc3luYyxhdXRvY29tcGxldGUsJyArXHJcbiAgJ2F1dG9mb2N1cyxhdXRvcGxheSxhdXRvc2F2ZSxiZ2NvbG9yLGJvcmRlcixidWZmZXJlZCxjaGFsbGVuZ2UsY2hhcnNldCwnICtcclxuICAnY2hlY2tlZCxjaXRlLGNsYXNzLGNvZGUsY29kZWJhc2UsY29sb3IsY29scyxjb2xzcGFuLGNvbnRlbnQsaHR0cC1lcXVpdiwnICtcclxuICAnbmFtZSxjb250ZW50ZWRpdGFibGUsY29udGV4dG1lbnUsY29udHJvbHMsY29vcmRzLGRhdGEsZGF0ZXRpbWUsZGVmYXVsdCwnICtcclxuICAnZGVmZXIsZGlyLGRpcm5hbWUsZGlzYWJsZWQsZG93bmxvYWQsZHJhZ2dhYmxlLGRyb3B6b25lLGVuY3R5cGUsbWV0aG9kLGZvciwnICtcclxuICAnZm9ybSxmb3JtYWN0aW9uLGhlYWRlcnMsPHRoPixoZWlnaHQsaGlkZGVuLGhpZ2gsaHJlZixocmVmbGFuZyxodHRwLWVxdWl2LCcgK1xyXG4gICdpY29uLGlkLGlzbWFwLGl0ZW1wcm9wLGtleXR5cGUsa2luZCxsYWJlbCxsYW5nLGxhbmd1YWdlLGxpc3QsbG9vcCxsb3csJyArXHJcbiAgJ21hbmlmZXN0LG1heCxtYXhsZW5ndGgsbWVkaWEsbWV0aG9kLEdFVCxQT1NULG1pbixtdWx0aXBsZSxlbWFpbCxmaWxlLCcgK1xyXG4gICdtdXRlZCxuYW1lLG5vdmFsaWRhdGUsb3BlbixvcHRpbXVtLHBhdHRlcm4scGluZyxwbGFjZWhvbGRlcixwb3N0ZXIsJyArXHJcbiAgJ3ByZWxvYWQscmFkaW9ncm91cCxyZWFkb25seSxyZWwscmVxdWlyZWQscmV2ZXJzZWQscm93cyxyb3dzcGFuLHNhbmRib3gsJyArXHJcbiAgJ3Njb3BlLHNjb3BlZCxzZWFtbGVzcyxzZWxlY3RlZCxzaGFwZSxzaXplLHR5cGUsdGV4dCxwYXNzd29yZCxzaXplcyxzcGFuLCcgK1xyXG4gICdzcGVsbGNoZWNrLHNyYyxzcmNkb2Msc3JjbGFuZyxzcmNzZXQsc3RhcnQsc3RlcCxzdHlsZSxzdW1tYXJ5LHRhYmluZGV4LCcgK1xyXG4gICd0YXJnZXQsdGl0bGUsdHlwZSx1c2VtYXAsdmFsdWUsd2lkdGgsd3JhcCdcclxuKTtcclxuXHJcblxyXG5cclxudmFyIHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XHJcblxyXG52YXIgaXNYbGluayA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgcmV0dXJuIG5hbWUuY2hhckF0KDUpID09PSAnOicgJiYgbmFtZS5zbGljZSgwLCA1KSA9PT0gJ3hsaW5rJ1xyXG59O1xyXG5cclxudmFyIGdldFhsaW5rUHJvcCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgcmV0dXJuIGlzWGxpbmsobmFtZSkgPyBuYW1lLnNsaWNlKDYsIG5hbWUubGVuZ3RoKSA6ICcnXHJcbn07XHJcblxyXG52YXIgaXNGYWxzeUF0dHJWYWx1ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICByZXR1cm4gdmFsID09IG51bGwgfHwgdmFsID09PSBmYWxzZVxyXG59O1xyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBnZW5DbGFzc0ZvclZub2RlICh2bm9kZSkge1xyXG4gIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcclxuICB2YXIgcGFyZW50Tm9kZSA9IHZub2RlO1xyXG4gIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcclxuICB3aGlsZSAoY2hpbGROb2RlLmNoaWxkKSB7XHJcbiAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUuY2hpbGQuX3Zub2RlO1xyXG4gICAgaWYgKGNoaWxkTm9kZS5kYXRhKSB7XHJcbiAgICAgIGRhdGEgPSBtZXJnZUNsYXNzRGF0YShjaGlsZE5vZGUuZGF0YSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHdoaWxlICgocGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50KSkge1xyXG4gICAgaWYgKHBhcmVudE5vZGUuZGF0YSkge1xyXG4gICAgICBkYXRhID0gbWVyZ2VDbGFzc0RhdGEoZGF0YSwgcGFyZW50Tm9kZS5kYXRhKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGdlbkNsYXNzRnJvbURhdGEoZGF0YSlcclxufVxyXG5cclxuZnVuY3Rpb24gbWVyZ2VDbGFzc0RhdGEgKGNoaWxkLCBwYXJlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgc3RhdGljQ2xhc3M6IGNvbmNhdChjaGlsZC5zdGF0aWNDbGFzcywgcGFyZW50LnN0YXRpY0NsYXNzKSxcclxuICAgIGNsYXNzOiBjaGlsZC5jbGFzc1xyXG4gICAgICA/IFtjaGlsZC5jbGFzcywgcGFyZW50LmNsYXNzXVxyXG4gICAgICA6IHBhcmVudC5jbGFzc1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuQ2xhc3NGcm9tRGF0YSAoZGF0YSkge1xyXG4gIHZhciBkeW5hbWljQ2xhc3MgPSBkYXRhLmNsYXNzO1xyXG4gIHZhciBzdGF0aWNDbGFzcyA9IGRhdGEuc3RhdGljQ2xhc3M7XHJcbiAgaWYgKHN0YXRpY0NsYXNzIHx8IGR5bmFtaWNDbGFzcykge1xyXG4gICAgcmV0dXJuIGNvbmNhdChzdGF0aWNDbGFzcywgc3RyaW5naWZ5Q2xhc3MoZHluYW1pY0NsYXNzKSlcclxuICB9XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICByZXR1cm4gJydcclxufVxyXG5cclxuZnVuY3Rpb24gY29uY2F0IChhLCBiKSB7XHJcbiAgcmV0dXJuIGEgPyBiID8gKGEgKyAnICcgKyBiKSA6IGEgOiAoYiB8fCAnJylcclxufVxyXG5cclxuZnVuY3Rpb24gc3RyaW5naWZ5Q2xhc3MgKHZhbHVlKSB7XHJcbiAgdmFyIHJlcyA9ICcnO1xyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIHJldHVybiByZXNcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiB2YWx1ZVxyXG4gIH1cclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIHZhciBzdHJpbmdpZmllZDtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIGlmICh2YWx1ZVtpXSkge1xyXG4gICAgICAgIGlmICgoc3RyaW5naWZpZWQgPSBzdHJpbmdpZnlDbGFzcyh2YWx1ZVtpXSkpKSB7XHJcbiAgICAgICAgICByZXMgKz0gc3RyaW5naWZpZWQgKyAnICc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzLnNsaWNlKDAsIC0xKVxyXG4gIH1cclxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlW2tleV0pIHsgcmVzICs9IGtleSArICcgJzsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcy5zbGljZSgwLCAtMSlcclxuICB9XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICByZXR1cm4gcmVzXHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxudmFyIG5hbWVzcGFjZU1hcCA9IHtcclxuICBzdmc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXHJcbiAgbWF0aDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnLFxyXG4gIHhodG1sOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcclxufTtcclxuXHJcbnZhciBpc0hUTUxUYWcgPSBtYWtlTWFwKFxyXG4gICdodG1sLGJvZHksYmFzZSxoZWFkLGxpbmssbWV0YSxzdHlsZSx0aXRsZSwnICtcclxuICAnYWRkcmVzcyxhcnRpY2xlLGFzaWRlLGZvb3RlcixoZWFkZXIsaDEsaDIsaDMsaDQsaDUsaDYsaGdyb3VwLG5hdixzZWN0aW9uLCcgK1xyXG4gICdkaXYsZGQsZGwsZHQsZmlnY2FwdGlvbixmaWd1cmUsaHIsaW1nLGxpLG1haW4sb2wscCxwcmUsdWwsJyArXHJcbiAgJ2EsYixhYmJyLGJkaSxiZG8sYnIsY2l0ZSxjb2RlLGRhdGEsZGZuLGVtLGksa2JkLG1hcmsscSxycCxydCxydGMscnVieSwnICtcclxuICAncyxzYW1wLHNtYWxsLHNwYW4sc3Ryb25nLHN1YixzdXAsdGltZSx1LHZhcix3YnIsYXJlYSxhdWRpbyxtYXAsdHJhY2ssdmlkZW8sJyArXHJcbiAgJ2VtYmVkLG9iamVjdCxwYXJhbSxzb3VyY2UsY2FudmFzLHNjcmlwdCxub3NjcmlwdCxkZWwsaW5zLCcgK1xyXG4gICdjYXB0aW9uLGNvbCxjb2xncm91cCx0YWJsZSx0aGVhZCx0Ym9keSx0ZCx0aCx0ciwnICtcclxuICAnYnV0dG9uLGRhdGFsaXN0LGZpZWxkc2V0LGZvcm0saW5wdXQsbGFiZWwsbGVnZW5kLG1ldGVyLG9wdGdyb3VwLG9wdGlvbiwnICtcclxuICAnb3V0cHV0LHByb2dyZXNzLHNlbGVjdCx0ZXh0YXJlYSwnICtcclxuICAnZGV0YWlscyxkaWFsb2csbWVudSxtZW51aXRlbSxzdW1tYXJ5LCcgK1xyXG4gICdjb250ZW50LGVsZW1lbnQsc2hhZG93LHRlbXBsYXRlJ1xyXG4pO1xyXG5cclxudmFyIGlzVW5hcnlUYWcgPSBtYWtlTWFwKFxyXG4gICdhcmVhLGJhc2UsYnIsY29sLGVtYmVkLGZyYW1lLGhyLGltZyxpbnB1dCxpc2luZGV4LGtleWdlbiwnICtcclxuICAnbGluayxtZXRhLHBhcmFtLHNvdXJjZSx0cmFjayx3YnInLFxyXG4gIHRydWVcclxuKTtcclxuXHJcbi8vIEVsZW1lbnRzIHRoYXQgeW91IGNhbiwgaW50ZW50aW9uYWxseSwgbGVhdmUgb3BlblxyXG4vLyAoYW5kIHdoaWNoIGNsb3NlIHRoZW1zZWx2ZXMpXHJcbnZhciBjYW5CZUxlZnRPcGVuVGFnID0gbWFrZU1hcChcclxuICAnY29sZ3JvdXAsZGQsZHQsbGksb3B0aW9ucyxwLHRkLHRmb290LHRoLHRoZWFkLHRyLHNvdXJjZScsXHJcbiAgdHJ1ZVxyXG4pO1xyXG5cclxuLy8gSFRNTDUgdGFncyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWwjZWxlbWVudHMtM1xyXG4vLyBQaHJhc2luZyBDb250ZW50IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI3BocmFzaW5nLWNvbnRlbnRcclxudmFyIGlzTm9uUGhyYXNpbmdUYWcgPSBtYWtlTWFwKFxyXG4gICdhZGRyZXNzLGFydGljbGUsYXNpZGUsYmFzZSxibG9ja3F1b3RlLGJvZHksY2FwdGlvbixjb2wsY29sZ3JvdXAsZGQsJyArXHJcbiAgJ2RldGFpbHMsZGlhbG9nLGRpdixkbCxkdCxmaWVsZHNldCxmaWdjYXB0aW9uLGZpZ3VyZSxmb290ZXIsZm9ybSwnICtcclxuICAnaDEsaDIsaDMsaDQsaDUsaDYsaGVhZCxoZWFkZXIsaGdyb3VwLGhyLGh0bWwsbGVnZW5kLGxpLG1lbnVpdGVtLG1ldGEsJyArXHJcbiAgJ29wdGdyb3VwLG9wdGlvbixwYXJhbSxycCxydCxzb3VyY2Usc3R5bGUsc3VtbWFyeSx0Ym9keSx0ZCx0Zm9vdCx0aCx0aGVhZCwnICtcclxuICAndGl0bGUsdHIsdHJhY2snLFxyXG4gIHRydWVcclxuKTtcclxuXHJcbi8vIHRoaXMgbWFwIGlzIGludGVudGlvbmFsbHkgc2VsZWN0aXZlLCBvbmx5IGNvdmVyaW5nIFNWRyBlbGVtZW50cyB0aGF0IG1heVxyXG4vLyBjb250YWluIGNoaWxkIGVsZW1lbnRzLlxyXG52YXIgaXNTVkcgPSBtYWtlTWFwKFxyXG4gICdzdmcsYW5pbWF0ZSxjaXJjbGUsY2xpcHBhdGgsY3Vyc29yLGRlZnMsZGVzYyxlbGxpcHNlLGZpbHRlcixmb250LCcgK1xyXG4gICdmb250LWZhY2UsZyxnbHlwaCxpbWFnZSxsaW5lLG1hcmtlcixtYXNrLG1pc3NpbmctZ2x5cGgscGF0aCxwYXR0ZXJuLCcgK1xyXG4gICdwb2x5Z29uLHBvbHlsaW5lLHJlY3Qsc3dpdGNoLHN5bWJvbCx0ZXh0LHRleHRwYXRoLHRzcGFuLHVzZSx2aWV3JyxcclxuICB0cnVlXHJcbik7XHJcblxyXG52YXIgaXNQcmVUYWcgPSBmdW5jdGlvbiAodGFnKSB7IHJldHVybiB0YWcgPT09ICdwcmUnOyB9O1xyXG5cclxudmFyIGlzUmVzZXJ2ZWRUYWcgPSBmdW5jdGlvbiAodGFnKSB7XHJcbiAgcmV0dXJuIGlzSFRNTFRhZyh0YWcpIHx8IGlzU1ZHKHRhZylcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldFRhZ05hbWVzcGFjZSAodGFnKSB7XHJcbiAgaWYgKGlzU1ZHKHRhZykpIHtcclxuICAgIHJldHVybiAnc3ZnJ1xyXG4gIH1cclxuICAvLyBiYXNpYyBzdXBwb3J0IGZvciBNYXRoTUxcclxuICAvLyBub3RlIGl0IGRvZXNuJ3Qgc3VwcG9ydCBvdGhlciBNYXRoTUwgZWxlbWVudHMgYmVpbmcgY29tcG9uZW50IHJvb3RzXHJcbiAgaWYgKHRhZyA9PT0gJ21hdGgnKSB7XHJcbiAgICByZXR1cm4gJ21hdGgnXHJcbiAgfVxyXG59XHJcblxyXG52YXIgdW5rbm93bkVsZW1lbnRDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbmZ1bmN0aW9uIGlzVW5rbm93bkVsZW1lbnQgKHRhZykge1xyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gIGlmICghaW5Ccm93c2VyKSB7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBpZiAoaXNSZXNlcnZlZFRhZyh0YWcpKSB7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgdGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgaWYgKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSAhPSBudWxsKSB7XHJcbiAgICByZXR1cm4gdW5rbm93bkVsZW1lbnRDYWNoZVt0YWddXHJcbiAgfVxyXG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuICBpZiAodGFnLmluZGV4T2YoJy0nKSA+IC0xKSB7XHJcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODIxMDM2NC8xMDcwMjQ0XHJcbiAgICByZXR1cm4gKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSA9IChcclxuICAgICAgZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MVW5rbm93bkVsZW1lbnQgfHxcclxuICAgICAgZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MRWxlbWVudFxyXG4gICAgKSlcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gPSAvSFRNTFVua25vd25FbGVtZW50Ly50ZXN0KGVsLnRvU3RyaW5nKCkpKVxyXG4gIH1cclxufVxyXG5cclxuLyogICovXHJcblxyXG4vKipcclxuICogUXVlcnkgYW4gZWxlbWVudCBzZWxlY3RvciBpZiBpdCdzIG5vdCBhbiBlbGVtZW50IGFscmVhZHkuXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeSAoZWwpIHtcclxuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xyXG4gICAgdmFyIHNlbGVjdG9yID0gZWw7XHJcbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG4gICAgaWYgKCFlbCkge1xyXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxyXG4gICAgICAgICdDYW5ub3QgZmluZCBlbGVtZW50OiAnICsgc2VsZWN0b3JcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBlbFxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQkMSAodGFnTmFtZSwgdm5vZGUpIHtcclxuICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcclxuICBpZiAodGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcclxuICAgIHJldHVybiBlbG1cclxuICB9XHJcbiAgaWYgKHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS5hdHRycyAmJiAnbXVsdGlwbGUnIGluIHZub2RlLmRhdGEuYXR0cnMpIHtcclxuICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ211bHRpcGxlJywgJ211bHRpcGxlJyk7XHJcbiAgfVxyXG4gIHJldHVybiBlbG1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TIChuYW1lc3BhY2UsIHRhZ05hbWUpIHtcclxuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZU1hcFtuYW1lc3BhY2VdLCB0YWdOYW1lKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSAodGV4dCkge1xyXG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb21tZW50ICh0ZXh0KSB7XHJcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dClcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlIChwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XHJcbiAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUNoaWxkIChub2RlLCBjaGlsZCkge1xyXG4gIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDaGlsZCAobm9kZSwgY2hpbGQpIHtcclxuICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyZW50Tm9kZSAobm9kZSkge1xyXG4gIHJldHVybiBub2RlLnBhcmVudE5vZGVcclxufVxyXG5cclxuZnVuY3Rpb24gbmV4dFNpYmxpbmcgKG5vZGUpIHtcclxuICByZXR1cm4gbm9kZS5uZXh0U2libGluZ1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YWdOYW1lIChub2RlKSB7XHJcbiAgcmV0dXJuIG5vZGUudGFnTmFtZVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudCAobm9kZSwgdGV4dCkge1xyXG4gIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGlsZE5vZGVzIChub2RlKSB7XHJcbiAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlc1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUgKG5vZGUsIGtleSwgdmFsKSB7XHJcbiAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWwpO1xyXG59XHJcblxyXG5cclxudmFyIG5vZGVPcHMgPSBPYmplY3QuZnJlZXplKHtcclxuXHRjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50JDEsXHJcblx0Y3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXHJcblx0Y3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxyXG5cdGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXHJcblx0aW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXHJcblx0cmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxyXG5cdGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcclxuXHRwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxyXG5cdG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcclxuXHR0YWdOYW1lOiB0YWdOYW1lLFxyXG5cdHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcclxuXHRjaGlsZE5vZGVzOiBjaGlsZE5vZGVzLFxyXG5cdHNldEF0dHJpYnV0ZTogc2V0QXR0cmlidXRlXHJcbn0pO1xyXG5cclxuLyogICovXHJcblxyXG52YXIgcmVmID0ge1xyXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlIChfLCB2bm9kZSkge1xyXG4gICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xyXG4gIH0sXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUgKG9sZFZub2RlLCB2bm9kZSkge1xyXG4gICAgaWYgKG9sZFZub2RlLmRhdGEucmVmICE9PSB2bm9kZS5kYXRhLnJlZikge1xyXG4gICAgICByZWdpc3RlclJlZihvbGRWbm9kZSwgdHJ1ZSk7XHJcbiAgICAgIHJlZ2lzdGVyUmVmKHZub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3kgKHZub2RlKSB7XHJcbiAgICByZWdpc3RlclJlZih2bm9kZSwgdHJ1ZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJSZWYgKHZub2RlLCBpc1JlbW92YWwpIHtcclxuICB2YXIga2V5ID0gdm5vZGUuZGF0YS5yZWY7XHJcbiAgaWYgKCFrZXkpIHsgcmV0dXJuIH1cclxuXHJcbiAgdmFyIHZtID0gdm5vZGUuY29udGV4dDtcclxuICB2YXIgcmVmID0gdm5vZGUuY2hpbGQgfHwgdm5vZGUuZWxtO1xyXG4gIHZhciByZWZzID0gdm0uJHJlZnM7XHJcbiAgaWYgKGlzUmVtb3ZhbCkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVmc1trZXldKSkge1xyXG4gICAgICByZW1vdmUkMShyZWZzW2tleV0sIHJlZik7XHJcbiAgICB9IGVsc2UgaWYgKHJlZnNba2V5XSA9PT0gcmVmKSB7XHJcbiAgICAgIHJlZnNba2V5XSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHZub2RlLmRhdGEucmVmSW5Gb3IpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVmc1trZXldKSAmJiByZWZzW2tleV0uaW5kZXhPZihyZWYpIDwgMCkge1xyXG4gICAgICAgIHJlZnNba2V5XS5wdXNoKHJlZik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVmc1trZXldID0gW3JlZl07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlZnNba2V5XSA9IHJlZjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWaXJ0dWFsIERPTSBwYXRjaGluZyBhbGdvcml0aG0gYmFzZWQgb24gU25hYmJkb20gYnlcclxuICogU2ltb24gRnJpaXMgVmluZHVtIChAcGFsZGVwaW5kKVxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3BhbGRlcGluZC9zbmFiYmRvbS9ibG9iL21hc3Rlci9MSUNFTlNFXHJcbiAqXHJcbiAqIG1vZGlmaWVkIGJ5IEV2YW4gWW91IChAeXl4OTkwODAzKVxyXG4gKlxyXG5cclxuLypcclxuICogTm90IHR5cGUtY2hlY2tpbmcgdGhpcyBiZWNhdXNlIHRoaXMgZmlsZSBpcyBwZXJmLWNyaXRpY2FsIGFuZCB0aGUgY29zdFxyXG4gKiBvZiBtYWtpbmcgZmxvdyB1bmRlcnN0YW5kIGl0IGlzIG5vdCB3b3J0aCBpdC5cclxuICovXHJcblxyXG52YXIgZW1wdHlOb2RlID0gbmV3IFZOb2RlKCcnLCB7fSwgW10pO1xyXG5cclxudmFyIGhvb2tzJDEgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knXTtcclxuXHJcbmZ1bmN0aW9uIGlzVW5kZWYgKHMpIHtcclxuICByZXR1cm4gcyA9PSBudWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRGVmIChzKSB7XHJcbiAgcmV0dXJuIHMgIT0gbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiBzYW1lVm5vZGUgKHZub2RlMSwgdm5vZGUyKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIHZub2RlMS5rZXkgPT09IHZub2RlMi5rZXkgJiZcclxuICAgIHZub2RlMS50YWcgPT09IHZub2RlMi50YWcgJiZcclxuICAgIHZub2RlMS5pc0NvbW1lbnQgPT09IHZub2RlMi5pc0NvbW1lbnQgJiZcclxuICAgICF2bm9kZTEuZGF0YSA9PT0gIXZub2RlMi5kYXRhXHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeCAoY2hpbGRyZW4sIGJlZ2luSWR4LCBlbmRJZHgpIHtcclxuICB2YXIgaSwga2V5O1xyXG4gIHZhciBtYXAgPSB7fTtcclxuICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xyXG4gICAga2V5ID0gY2hpbGRyZW5baV0ua2V5O1xyXG4gICAgaWYgKGlzRGVmKGtleSkpIHsgbWFwW2tleV0gPSBpOyB9XHJcbiAgfVxyXG4gIHJldHVybiBtYXBcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGF0Y2hGdW5jdGlvbiAoYmFja2VuZCkge1xyXG4gIHZhciBpLCBqO1xyXG4gIHZhciBjYnMgPSB7fTtcclxuXHJcbiAgdmFyIG1vZHVsZXMgPSBiYWNrZW5kLm1vZHVsZXM7XHJcbiAgdmFyIG5vZGVPcHMgPSBiYWNrZW5kLm5vZGVPcHM7XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBob29rcyQxLmxlbmd0aDsgKytpKSB7XHJcbiAgICBjYnNbaG9va3MkMVtpXV0gPSBbXTtcclxuICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgIGlmIChtb2R1bGVzW2pdW2hvb2tzJDFbaV1dICE9PSB1bmRlZmluZWQpIHsgY2JzW2hvb2tzJDFbaV1dLnB1c2gobW9kdWxlc1tqXVtob29rcyQxW2ldXSk7IH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGVtcHR5Tm9kZUF0IChlbG0pIHtcclxuICAgIHJldHVybiBuZXcgVk5vZGUobm9kZU9wcy50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSwge30sIFtdLCB1bmRlZmluZWQsIGVsbSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IgKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcclxuICAgIGZ1bmN0aW9uIHJlbW92ZSQkMSAoKSB7XHJcbiAgICAgIGlmICgtLXJlbW92ZSQkMS5saXN0ZW5lcnMgPT09IDApIHtcclxuICAgICAgICByZW1vdmVFbGVtZW50KGNoaWxkRWxtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlJCQxLmxpc3RlbmVycyA9IGxpc3RlbmVycztcclxuICAgIHJldHVybiByZW1vdmUkJDFcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQgKGVsKSB7XHJcbiAgICB2YXIgcGFyZW50ID0gbm9kZU9wcy5wYXJlbnROb2RlKGVsKTtcclxuICAgIC8vIGVsZW1lbnQgbWF5IGhhdmUgYWxyZWFkeSBiZWVuIHJlbW92ZWQgZHVlIHRvIHYtaHRtbFxyXG4gICAgaWYgKHBhcmVudCkge1xyXG4gICAgICBub2RlT3BzLnJlbW92ZUNoaWxkKHBhcmVudCwgZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlRWxtICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBuZXN0ZWQpIHtcclxuICAgIHZhciBpO1xyXG4gICAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xyXG4gICAgdm5vZGUuaXNSb290SW5zZXJ0ID0gIW5lc3RlZDtcclxuICAgIGlmIChpc0RlZihkYXRhKSkge1xyXG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHsgaSh2bm9kZSk7IH1cclxuICAgICAgLy8gYWZ0ZXIgY2FsbGluZyB0aGUgaW5pdCBob29rLCBpZiB0aGUgdm5vZGUgaXMgYSBjaGlsZCBjb21wb25lbnRcclxuICAgICAgLy8gaXQgc2hvdWxkJ3ZlIGNyZWF0ZWQgYSBjaGlsZCBpbnN0YW5jZSBhbmQgbW91bnRlZCBpdC4gdGhlIGNoaWxkXHJcbiAgICAgIC8vIGNvbXBvbmVudCBhbHNvIGhhcyBzZXQgdGhlIHBsYWNlaG9sZGVyIHZub2RlJ3MgZWxtLlxyXG4gICAgICAvLyBpbiB0aGF0IGNhc2Ugd2UgY2FuIGp1c3QgcmV0dXJuIHRoZSBlbGVtZW50IGFuZCBiZSBkb25lLlxyXG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNoaWxkKSkge1xyXG4gICAgICAgIGluaXRDb21wb25lbnQodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHZub2RlLmVsbVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcclxuICAgIHZhciB0YWcgPSB2bm9kZS50YWc7XHJcbiAgICBpZiAoaXNEZWYodGFnKSkge1xyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIXZub2RlLm5zICYmXHJcbiAgICAgICAgICAhKGNvbmZpZy5pZ25vcmVkRWxlbWVudHMgJiYgY29uZmlnLmlnbm9yZWRFbGVtZW50cy5pbmRleE9mKHRhZykgPiAtMSkgJiZcclxuICAgICAgICAgIGNvbmZpZy5pc1Vua25vd25FbGVtZW50KHRhZylcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHdhcm4oXHJcbiAgICAgICAgICAgICdVbmtub3duIGN1c3RvbSBlbGVtZW50OiA8JyArIHRhZyArICc+IC0gZGlkIHlvdSAnICtcclxuICAgICAgICAgICAgJ3JlZ2lzdGVyIHRoZSBjb21wb25lbnQgY29ycmVjdGx5PyBGb3IgcmVjdXJzaXZlIGNvbXBvbmVudHMsICcgK1xyXG4gICAgICAgICAgICAnbWFrZSBzdXJlIHRvIHByb3ZpZGUgdGhlIFwibmFtZVwiIG9wdGlvbi4nLFxyXG4gICAgICAgICAgICB2bm9kZS5jb250ZXh0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB2bm9kZS5lbG0gPSB2bm9kZS5uc1xyXG4gICAgICAgID8gbm9kZU9wcy5jcmVhdGVFbGVtZW50TlModm5vZGUubnMsIHRhZylcclxuICAgICAgICA6IG5vZGVPcHMuY3JlYXRlRWxlbWVudCh0YWcsIHZub2RlKTtcclxuICAgICAgc2V0U2NvcGUodm5vZGUpO1xyXG4gICAgICBjcmVhdGVDaGlsZHJlbih2bm9kZSwgY2hpbGRyZW4sIGluc2VydGVkVm5vZGVRdWV1ZSk7XHJcbiAgICAgIGlmIChpc0RlZihkYXRhKSkge1xyXG4gICAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHZub2RlLmlzQ29tbWVudCkge1xyXG4gICAgICB2bm9kZS5lbG0gPSBub2RlT3BzLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2bm9kZS5lbG0gPSBub2RlT3BzLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZub2RlLmVsbVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlQ2hpbGRyZW4gKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIG5vZGVPcHMuYXBwZW5kQ2hpbGQodm5vZGUuZWxtLCBjcmVhdGVFbG0oY2hpbGRyZW5baV0sIGluc2VydGVkVm5vZGVRdWV1ZSwgdHJ1ZSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzUHJpbWl0aXZlKHZub2RlLnRleHQpKSB7XHJcbiAgICAgIG5vZGVPcHMuYXBwZW5kQ2hpbGQodm5vZGUuZWxtLCBub2RlT3BzLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzUGF0Y2hhYmxlICh2bm9kZSkge1xyXG4gICAgd2hpbGUgKHZub2RlLmNoaWxkKSB7XHJcbiAgICAgIHZub2RlID0gdm5vZGUuY2hpbGQuX3Zub2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzRGVmKHZub2RlLnRhZylcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGludm9rZUNyZWF0ZUhvb2tzICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XHJcbiAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpJDEpIHtcclxuICAgICAgY2JzLmNyZWF0ZVtpJDFdKGVtcHR5Tm9kZSwgdm5vZGUpO1xyXG4gICAgfVxyXG4gICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcclxuICAgIGlmIChpc0RlZihpKSkge1xyXG4gICAgICBpZiAoaS5jcmVhdGUpIHsgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7IH1cclxuICAgICAgaWYgKGkuaW5zZXJ0KSB7IGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdENvbXBvbmVudCAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xyXG4gICAgaWYgKHZub2RlLmRhdGEucGVuZGluZ0luc2VydCkge1xyXG4gICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaC5hcHBseShpbnNlcnRlZFZub2RlUXVldWUsIHZub2RlLmRhdGEucGVuZGluZ0luc2VydCk7XHJcbiAgICB9XHJcbiAgICB2bm9kZS5lbG0gPSB2bm9kZS5jaGlsZC4kZWw7XHJcbiAgICBpZiAoaXNQYXRjaGFibGUodm5vZGUpKSB7XHJcbiAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xyXG4gICAgICBzZXRTY29wZSh2bm9kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBlbXB0eSBjb21wb25lbnQgcm9vdC5cclxuICAgICAgLy8gc2tpcCBhbGwgZWxlbWVudC1yZWxhdGVkIG1vZHVsZXMgZXhjZXB0IGZvciByZWYgKCMzNDU1KVxyXG4gICAgICByZWdpc3RlclJlZih2bm9kZSk7XHJcbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBpbnZva2UgdGhlIGluc2VydCBob29rXHJcbiAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHNldCBzY29wZSBpZCBhdHRyaWJ1dGUgZm9yIHNjb3BlZCBDU1MuXHJcbiAgLy8gdGhpcyBpcyBpbXBsZW1lbnRlZCBhcyBhIHNwZWNpYWwgY2FzZSB0byBhdm9pZCB0aGUgb3ZlcmhlYWRcclxuICAvLyBvZiBnb2luZyB0aHJvdWdoIHRoZSBub3JtYWwgYXR0cmlidXRlIHBhdGNoaW5nIHByb2Nlc3MuXHJcbiAgZnVuY3Rpb24gc2V0U2NvcGUgKHZub2RlKSB7XHJcbiAgICB2YXIgaTtcclxuICAgIGlmIChpc0RlZihpID0gdm5vZGUuY29udGV4dCkgJiYgaXNEZWYoaSA9IGkuJG9wdGlvbnMuX3Njb3BlSWQpKSB7XHJcbiAgICAgIG5vZGVPcHMuc2V0QXR0cmlidXRlKHZub2RlLmVsbSwgaSwgJycpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzRGVmKGkgPSBhY3RpdmVJbnN0YW5jZSkgJiZcclxuICAgICAgICBpICE9PSB2bm9kZS5jb250ZXh0ICYmXHJcbiAgICAgICAgaXNEZWYoaSA9IGkuJG9wdGlvbnMuX3Njb3BlSWQpKSB7XHJcbiAgICAgIG5vZGVPcHMuc2V0QXR0cmlidXRlKHZub2RlLmVsbSwgaSwgJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkVm5vZGVzIChwYXJlbnRFbG0sIGJlZm9yZSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpIHtcclxuICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcclxuICAgICAgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0odm5vZGVzW3N0YXJ0SWR4XSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgYmVmb3JlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rICh2bm9kZSkge1xyXG4gICAgdmFyIGksIGo7XHJcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XHJcbiAgICBpZiAoaXNEZWYoZGF0YSkpIHtcclxuICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKSB7IGkodm5vZGUpOyB9XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSkgeyBjYnMuZGVzdHJveVtpXSh2bm9kZSk7IH1cclxuICAgIH1cclxuICAgIGlmIChpc0RlZihpID0gdm5vZGUuY2hpbGRyZW4pKSB7XHJcbiAgICAgIGZvciAoaiA9IDA7IGogPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraikge1xyXG4gICAgICAgIGludm9rZURlc3Ryb3lIb29rKHZub2RlLmNoaWxkcmVuW2pdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzIChwYXJlbnRFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xyXG4gICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xyXG4gICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xyXG4gICAgICBpZiAoaXNEZWYoY2gpKSB7XHJcbiAgICAgICAgaWYgKGlzRGVmKGNoLnRhZykpIHtcclxuICAgICAgICAgIHJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2soY2gpO1xyXG4gICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIFRleHQgbm9kZVxyXG4gICAgICAgICAgbm9kZU9wcy5yZW1vdmVDaGlsZChwYXJlbnRFbG0sIGNoLmVsbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVBbmRJbnZva2VSZW1vdmVIb29rICh2bm9kZSwgcm0pIHtcclxuICAgIGlmIChybSB8fCBpc0RlZih2bm9kZS5kYXRhKSkge1xyXG4gICAgICB2YXIgbGlzdGVuZXJzID0gY2JzLnJlbW92ZS5sZW5ndGggKyAxO1xyXG4gICAgICBpZiAoIXJtKSB7XHJcbiAgICAgICAgLy8gZGlyZWN0bHkgcmVtb3ZpbmdcclxuICAgICAgICBybSA9IGNyZWF0ZVJtQ2Iodm5vZGUuZWxtLCBsaXN0ZW5lcnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHdlIGhhdmUgYSByZWN1cnNpdmVseSBwYXNzZWQgZG93biBybSBjYWxsYmFja1xyXG4gICAgICAgIC8vIGluY3JlYXNlIHRoZSBsaXN0ZW5lcnMgY291bnRcclxuICAgICAgICBybS5saXN0ZW5lcnMgKz0gbGlzdGVuZXJzO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJlY3Vyc2l2ZWx5IGludm9rZSBob29rcyBvbiBjaGlsZCBjb21wb25lbnQgcm9vdCBub2RlXHJcbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuY2hpbGQpICYmIGlzRGVmKGkgPSBpLl92bm9kZSkgJiYgaXNEZWYoaS5kYXRhKSkge1xyXG4gICAgICAgIHJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2soaSwgcm0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgY2JzLnJlbW92ZVtpXSh2bm9kZSwgcm0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5yZW1vdmUpKSB7XHJcbiAgICAgICAgaSh2bm9kZSwgcm0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJtKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlbW92ZUVsZW1lbnQodm5vZGUuZWxtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuIChwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCByZW1vdmVPbmx5KSB7XHJcbiAgICB2YXIgb2xkU3RhcnRJZHggPSAwO1xyXG4gICAgdmFyIG5ld1N0YXJ0SWR4ID0gMDtcclxuICAgIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xyXG4gICAgdmFyIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFswXTtcclxuICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XHJcbiAgICB2YXIgbmV3RW5kSWR4ID0gbmV3Q2gubGVuZ3RoIC0gMTtcclxuICAgIHZhciBuZXdTdGFydFZub2RlID0gbmV3Q2hbMF07XHJcbiAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xyXG4gICAgdmFyIG9sZEtleVRvSWR4LCBpZHhJbk9sZCwgZWxtVG9Nb3ZlLCBiZWZvcmU7XHJcblxyXG4gICAgLy8gcmVtb3ZlT25seSBpcyBhIHNwZWNpYWwgZmxhZyB1c2VkIG9ubHkgYnkgPHRyYW5zaXRpb24tZ3JvdXA+XHJcbiAgICAvLyB0byBlbnN1cmUgcmVtb3ZlZCBlbGVtZW50cyBzdGF5IGluIGNvcnJlY3QgcmVsYXRpdmUgcG9zaXRpb25zXHJcbiAgICAvLyBkdXJpbmcgbGVhdmluZyB0cmFuc2l0aW9uc1xyXG4gICAgdmFyIGNhbk1vdmUgPSAhcmVtb3ZlT25seTtcclxuXHJcbiAgICB3aGlsZSAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4ICYmIG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xyXG4gICAgICBpZiAoaXNVbmRlZihvbGRTdGFydFZub2RlKSkge1xyXG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgaGFzIGJlZW4gbW92ZWQgbGVmdFxyXG4gICAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkRW5kVm5vZGUpKSB7XHJcbiAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XHJcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XHJcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xyXG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcclxuICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XHJcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcclxuICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcclxuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcclxuICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcclxuICAgICAgfSBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7IC8vIFZub2RlIG1vdmVkIHJpZ2h0XHJcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcclxuICAgICAgICBjYW5Nb3ZlICYmIG5vZGVPcHMuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIG5vZGVPcHMubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XHJcbiAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xyXG4gICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xyXG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgbGVmdFxyXG4gICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XHJcbiAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xyXG4gICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xyXG4gICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaXNVbmRlZihvbGRLZXlUb0lkeCkpIHsgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7IH1cclxuICAgICAgICBpZHhJbk9sZCA9IGlzRGVmKG5ld1N0YXJ0Vm5vZGUua2V5KSA/IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XSA6IG51bGw7XHJcbiAgICAgICAgaWYgKGlzVW5kZWYoaWR4SW5PbGQpKSB7IC8vIE5ldyBlbGVtZW50XHJcbiAgICAgICAgICBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XHJcbiAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcclxuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmICFlbG1Ub01vdmUpIHtcclxuICAgICAgICAgICAgd2FybihcclxuICAgICAgICAgICAgICAnSXQgc2VlbXMgdGhlcmUgYXJlIGR1cGxpY2F0ZSBrZXlzIHRoYXQgaXMgY2F1c2luZyBhbiB1cGRhdGUgZXJyb3IuICcgK1xyXG4gICAgICAgICAgICAgICdNYWtlIHN1cmUgZWFjaCB2LWZvciBpdGVtIGhhcyBhIHVuaXF1ZSBrZXkuJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGVsbVRvTW92ZS50YWcgIT09IG5ld1N0YXJ0Vm5vZGUudGFnKSB7XHJcbiAgICAgICAgICAgIC8vIHNhbWUga2V5IGJ1dCBkaWZmZXJlbnQgZWxlbWVudC4gdHJlYXQgYXMgbmV3IGVsZW1lbnRcclxuICAgICAgICAgICAgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xyXG4gICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXRjaFZub2RlKGVsbVRvTW92ZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcclxuICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBjYW5Nb3ZlICYmIG5vZGVPcHMuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgbmV3U3RhcnRWbm9kZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcclxuICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XHJcbiAgICAgIGJlZm9yZSA9IGlzVW5kZWYobmV3Q2hbbmV3RW5kSWR4ICsgMV0pID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcclxuICAgICAgYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCBuZXdDaCwgbmV3U3RhcnRJZHgsIG5ld0VuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcclxuICAgIH0gZWxzZSBpZiAobmV3U3RhcnRJZHggPiBuZXdFbmRJZHgpIHtcclxuICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGF0Y2hWbm9kZSAob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHJlbW92ZU9ubHkpIHtcclxuICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICAvLyByZXVzZSBlbGVtZW50IGZvciBzdGF0aWMgdHJlZXMuXHJcbiAgICAvLyBub3RlIHdlIG9ubHkgZG8gdGhpcyBpZiB0aGUgdm5vZGUgaXMgY2xvbmVkIC1cclxuICAgIC8vIGlmIHRoZSBuZXcgbm9kZSBpcyBub3QgY2xvbmVkIGl0IG1lYW5zIHRoZSByZW5kZXIgZnVuY3Rpb25zIGhhdmUgYmVlblxyXG4gICAgLy8gcmVzZXQgYnkgdGhlIGhvdC1yZWxvYWQtYXBpIGFuZCB3ZSBuZWVkIHRvIGRvIGEgcHJvcGVyIHJlLXJlbmRlci5cclxuICAgIGlmICh2bm9kZS5pc1N0YXRpYyAmJlxyXG4gICAgICAgIG9sZFZub2RlLmlzU3RhdGljICYmXHJcbiAgICAgICAgdm5vZGUua2V5ID09PSBvbGRWbm9kZS5rZXkgJiZcclxuICAgICAgICAodm5vZGUuaXNDbG9uZWQgfHwgdm5vZGUuaXNPbmNlKSkge1xyXG4gICAgICB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdmFyIGk7XHJcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XHJcbiAgICB2YXIgaGFzRGF0YSA9IGlzRGVmKGRhdGEpO1xyXG4gICAgaWYgKGhhc0RhdGEgJiYgaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkucHJlcGF0Y2gpKSB7XHJcbiAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcclxuICAgIH1cclxuICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XHJcbiAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcclxuICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xyXG4gICAgaWYgKGhhc0RhdGEgJiYgaXNQYXRjaGFibGUodm5vZGUpKSB7XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKSB7IGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTsgfVxyXG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSkgeyBpKG9sZFZub2RlLCB2bm9kZSk7IH1cclxuICAgIH1cclxuICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XHJcbiAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XHJcbiAgICAgICAgaWYgKG9sZENoICE9PSBjaCkgeyB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoLCBjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCByZW1vdmVPbmx5KTsgfVxyXG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKGNoKSkge1xyXG4gICAgICAgIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkgeyBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgJycpOyB9XHJcbiAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNEZWYob2xkQ2gpKSB7XHJcbiAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XHJcbiAgICAgICAgbm9kZU9wcy5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XHJcbiAgICAgIG5vZGVPcHMuc2V0VGV4dENvbnRlbnQoZWxtLCB2bm9kZS50ZXh0KTtcclxuICAgIH1cclxuICAgIGlmIChoYXNEYXRhKSB7XHJcbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5wb3N0cGF0Y2gpKSB7IGkob2xkVm5vZGUsIHZub2RlKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW52b2tlSW5zZXJ0SG9vayAodm5vZGUsIHF1ZXVlLCBpbml0aWFsKSB7XHJcbiAgICAvLyBkZWxheSBpbnNlcnQgaG9va3MgZm9yIGNvbXBvbmVudCByb290IG5vZGVzLCBpbnZva2UgdGhlbSBhZnRlciB0aGVcclxuICAgIC8vIGVsZW1lbnQgaXMgcmVhbGx5IGluc2VydGVkXHJcbiAgICBpZiAoaW5pdGlhbCAmJiB2bm9kZS5wYXJlbnQpIHtcclxuICAgICAgdm5vZGUucGFyZW50LmRhdGEucGVuZGluZ0luc2VydCA9IHF1ZXVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQocXVldWVbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgYmFpbGVkID0gZmFsc2U7XHJcbiAgZnVuY3Rpb24gaHlkcmF0ZSAoZWxtLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XHJcbiAgICB7XHJcbiAgICAgIGlmICghYXNzZXJ0Tm9kZU1hdGNoKGVsbSwgdm5vZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZub2RlLmVsbSA9IGVsbTtcclxuICAgIHZhciB0YWcgPSB2bm9kZS50YWc7XHJcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcclxuICAgIGlmIChpc0RlZihkYXRhKSkge1xyXG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHsgaSh2bm9kZSwgdHJ1ZSAvKiBoeWRyYXRpbmcgKi8pOyB9XHJcbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuY2hpbGQpKSB7XHJcbiAgICAgICAgLy8gY2hpbGQgY29tcG9uZW50LiBpdCBzaG91bGQgaGF2ZSBoeWRyYXRlZCBpdHMgb3duIHRyZWUuXHJcbiAgICAgICAgaW5pdENvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaXNEZWYodGFnKSkge1xyXG4gICAgICBpZiAoaXNEZWYoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkTm9kZXMgPSBub2RlT3BzLmNoaWxkTm9kZXMoZWxtKTtcclxuICAgICAgICAvLyBlbXB0eSBlbGVtZW50LCBhbGxvdyBjbGllbnQgdG8gcGljayB1cCBhbmQgcG9wdWxhdGUgY2hpbGRyZW5cclxuICAgICAgICBpZiAoIWNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjcmVhdGVDaGlsZHJlbih2bm9kZSwgY2hpbGRyZW4sIGluc2VydGVkVm5vZGVRdWV1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBjaGlsZHJlbk1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCAhPT0gY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuTWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNoaWxkcmVuLmxlbmd0aDsgaSQxKyspIHtcclxuICAgICAgICAgICAgICBpZiAoIWh5ZHJhdGUoY2hpbGROb2Rlc1tpJDFdLCBjaGlsZHJlbltpJDFdLCBpbnNlcnRlZFZub2RlUXVldWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFjaGlsZHJlbk1hdGNoKSB7XHJcbiAgICAgICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgICAgICAgICAgICAhYmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgYmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BhcmVudDogJywgZWxtKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc21hdGNoaW5nIGNoaWxkTm9kZXMgdnMuIFZOb2RlczogJywgY2hpbGROb2RlcywgY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNEZWYoZGF0YSkpIHtcclxuICAgICAgICBpbnZva2VDcmVhdGVIb29rcyh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFzc2VydE5vZGVNYXRjaCAobm9kZSwgdm5vZGUpIHtcclxuICAgIGlmICh2bm9kZS50YWcpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB2bm9kZS50YWcuaW5kZXhPZigndnVlLWNvbXBvbmVudCcpID09PSAwIHx8XHJcbiAgICAgICAgdm5vZGUudGFnLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVPcHMudGFnTmFtZShub2RlKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgIClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBfdG9TdHJpbmcodm5vZGUudGV4dCkgPT09IG5vZGUuZGF0YVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoIChvbGRWbm9kZSwgdm5vZGUsIGh5ZHJhdGluZywgcmVtb3ZlT25seSkge1xyXG4gICAgaWYgKCF2bm9kZSkge1xyXG4gICAgICBpZiAob2xkVm5vZGUpIHsgaW52b2tlRGVzdHJveUhvb2sob2xkVm5vZGUpOyB9XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHZhciBlbG0sIHBhcmVudDtcclxuICAgIHZhciBpc0luaXRpYWxQYXRjaCA9IGZhbHNlO1xyXG4gICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xyXG5cclxuICAgIGlmICghb2xkVm5vZGUpIHtcclxuICAgICAgLy8gZW1wdHkgbW91bnQsIGNyZWF0ZSBuZXcgcm9vdCBlbGVtZW50XHJcbiAgICAgIGlzSW5pdGlhbFBhdGNoID0gdHJ1ZTtcclxuICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGlzUmVhbEVsZW1lbnQgPSBpc0RlZihvbGRWbm9kZS5ub2RlVHlwZSk7XHJcbiAgICAgIGlmICghaXNSZWFsRWxlbWVudCAmJiBzYW1lVm5vZGUob2xkVm5vZGUsIHZub2RlKSkge1xyXG4gICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHJlbW92ZU9ubHkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpc1JlYWxFbGVtZW50KSB7XHJcbiAgICAgICAgICAvLyBtb3VudGluZyB0byBhIHJlYWwgZWxlbWVudFxyXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyBzZXJ2ZXItcmVuZGVyZWQgY29udGVudCBhbmQgaWYgd2UgY2FuIHBlcmZvcm1cclxuICAgICAgICAgIC8vIGEgc3VjY2Vzc2Z1bCBoeWRyYXRpb24uXHJcbiAgICAgICAgICBpZiAob2xkVm5vZGUubm9kZVR5cGUgPT09IDEgJiYgb2xkVm5vZGUuaGFzQXR0cmlidXRlKCdzZXJ2ZXItcmVuZGVyZWQnKSkge1xyXG4gICAgICAgICAgICBvbGRWbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3NlcnZlci1yZW5kZXJlZCcpO1xyXG4gICAgICAgICAgICBoeWRyYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGh5ZHJhdGluZykge1xyXG4gICAgICAgICAgICBpZiAoaHlkcmF0ZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkpIHtcclxuICAgICAgICAgICAgICBpbnZva2VJbnNlcnRIb29rKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBvbGRWbm9kZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHdhcm4oXHJcbiAgICAgICAgICAgICAgICAnVGhlIGNsaWVudC1zaWRlIHJlbmRlcmVkIHZpcnR1YWwgRE9NIHRyZWUgaXMgbm90IG1hdGNoaW5nICcgK1xyXG4gICAgICAgICAgICAgICAgJ3NlcnZlci1yZW5kZXJlZCBjb250ZW50LiBUaGlzIGlzIGxpa2VseSBjYXVzZWQgYnkgaW5jb3JyZWN0ICcgK1xyXG4gICAgICAgICAgICAgICAgJ0hUTUwgbWFya3VwLCBmb3IgZXhhbXBsZSBuZXN0aW5nIGJsb2NrLWxldmVsIGVsZW1lbnRzIGluc2lkZSAnICtcclxuICAgICAgICAgICAgICAgICc8cD4sIG9yIG1pc3NpbmcgPHRib2R5Pi4gQmFpbGluZyBoeWRyYXRpb24gYW5kIHBlcmZvcm1pbmcgJyArXHJcbiAgICAgICAgICAgICAgICAnZnVsbCBjbGllbnQtc2lkZSByZW5kZXIuJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIGVpdGhlciBub3Qgc2VydmVyLXJlbmRlcmVkLCBvciBoeWRyYXRpb24gZmFpbGVkLlxyXG4gICAgICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IG5vZGUgYW5kIHJlcGxhY2UgaXRcclxuICAgICAgICAgIG9sZFZub2RlID0gZW1wdHlOb2RlQXQob2xkVm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbG0gPSBvbGRWbm9kZS5lbG07XHJcbiAgICAgICAgcGFyZW50ID0gbm9kZU9wcy5wYXJlbnROb2RlKGVsbSk7XHJcblxyXG4gICAgICAgIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcclxuXHJcbiAgICAgICAgLy8gY29tcG9uZW50IHJvb3QgZWxlbWVudCByZXBsYWNlZC5cclxuICAgICAgICAvLyB1cGRhdGUgcGFyZW50IHBsYWNlaG9sZGVyIG5vZGUgZWxlbWVudC5cclxuICAgICAgICBpZiAodm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICB2bm9kZS5wYXJlbnQuZWxtID0gdm5vZGUuZWxtO1xyXG4gICAgICAgICAgaWYgKGlzUGF0Y2hhYmxlKHZub2RlKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50LCB2bm9kZS5lbG0sIG5vZGVPcHMubmV4dFNpYmxpbmcoZWxtKSk7XHJcbiAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50LCBbb2xkVm5vZGVdLCAwLCAwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRhZykpIHtcclxuICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKG9sZFZub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnZva2VJbnNlcnRIb29rKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIGlzSW5pdGlhbFBhdGNoKTtcclxuICAgIHJldHVybiB2bm9kZS5lbG1cclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxudmFyIGRpcmVjdGl2ZXMgPSB7XHJcbiAgY3JlYXRlOiB1cGRhdGVEaXJlY3RpdmVzLFxyXG4gIHVwZGF0ZTogdXBkYXRlRGlyZWN0aXZlcyxcclxuICBkZXN0cm95OiBmdW5jdGlvbiB1bmJpbmREaXJlY3RpdmVzICh2bm9kZSkge1xyXG4gICAgdXBkYXRlRGlyZWN0aXZlcyh2bm9kZSwgZW1wdHlOb2RlKTtcclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVEaXJlY3RpdmVzIChcclxuICBvbGRWbm9kZSxcclxuICB2bm9kZVxyXG4pIHtcclxuICBpZiAoIW9sZFZub2RlLmRhdGEuZGlyZWN0aXZlcyAmJiAhdm5vZGUuZGF0YS5kaXJlY3RpdmVzKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgdmFyIGlzQ3JlYXRlID0gb2xkVm5vZGUgPT09IGVtcHR5Tm9kZTtcclxuICB2YXIgb2xkRGlycyA9IG5vcm1hbGl6ZURpcmVjdGl2ZXMkMShvbGRWbm9kZS5kYXRhLmRpcmVjdGl2ZXMsIG9sZFZub2RlLmNvbnRleHQpO1xyXG4gIHZhciBuZXdEaXJzID0gbm9ybWFsaXplRGlyZWN0aXZlcyQxKHZub2RlLmRhdGEuZGlyZWN0aXZlcywgdm5vZGUuY29udGV4dCk7XHJcblxyXG4gIHZhciBkaXJzV2l0aEluc2VydCA9IFtdO1xyXG4gIHZhciBkaXJzV2l0aFBvc3RwYXRjaCA9IFtdO1xyXG5cclxuICB2YXIga2V5LCBvbGREaXIsIGRpcjtcclxuICBmb3IgKGtleSBpbiBuZXdEaXJzKSB7XHJcbiAgICBvbGREaXIgPSBvbGREaXJzW2tleV07XHJcbiAgICBkaXIgPSBuZXdEaXJzW2tleV07XHJcbiAgICBpZiAoIW9sZERpcikge1xyXG4gICAgICAvLyBuZXcgZGlyZWN0aXZlLCBiaW5kXHJcbiAgICAgIGNhbGxIb29rJDEoZGlyLCAnYmluZCcsIHZub2RlLCBvbGRWbm9kZSk7XHJcbiAgICAgIGlmIChkaXIuZGVmICYmIGRpci5kZWYuaW5zZXJ0ZWQpIHtcclxuICAgICAgICBkaXJzV2l0aEluc2VydC5wdXNoKGRpcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGV4aXN0aW5nIGRpcmVjdGl2ZSwgdXBkYXRlXHJcbiAgICAgIGRpci5vbGRWYWx1ZSA9IG9sZERpci52YWx1ZTtcclxuICAgICAgY2FsbEhvb2skMShkaXIsICd1cGRhdGUnLCB2bm9kZSwgb2xkVm5vZGUpO1xyXG4gICAgICBpZiAoZGlyLmRlZiAmJiBkaXIuZGVmLmNvbXBvbmVudFVwZGF0ZWQpIHtcclxuICAgICAgICBkaXJzV2l0aFBvc3RwYXRjaC5wdXNoKGRpcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChkaXJzV2l0aEluc2VydC5sZW5ndGgpIHtcclxuICAgIHZhciBjYWxsSW5zZXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBkaXJzV2l0aEluc2VydC5mb3JFYWNoKGZ1bmN0aW9uIChkaXIpIHtcclxuICAgICAgICBjYWxsSG9vayQxKGRpciwgJ2luc2VydGVkJywgdm5vZGUsIG9sZFZub2RlKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgaWYgKGlzQ3JlYXRlKSB7XHJcbiAgICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLmRhdGEuaG9vayB8fCAodm5vZGUuZGF0YS5ob29rID0ge30pLCAnaW5zZXJ0JywgY2FsbEluc2VydCwgJ2Rpci1pbnNlcnQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNhbGxJbnNlcnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChkaXJzV2l0aFBvc3RwYXRjaC5sZW5ndGgpIHtcclxuICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLmRhdGEuaG9vayB8fCAodm5vZGUuZGF0YS5ob29rID0ge30pLCAncG9zdHBhdGNoJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBkaXJzV2l0aFBvc3RwYXRjaC5mb3JFYWNoKGZ1bmN0aW9uIChkaXIpIHtcclxuICAgICAgICBjYWxsSG9vayQxKGRpciwgJ2NvbXBvbmVudFVwZGF0ZWQnLCB2bm9kZSwgb2xkVm5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0sICdkaXItcG9zdHBhdGNoJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWlzQ3JlYXRlKSB7XHJcbiAgICBmb3IgKGtleSBpbiBvbGREaXJzKSB7XHJcbiAgICAgIGlmICghbmV3RGlyc1trZXldKSB7XHJcbiAgICAgICAgLy8gbm8gbG9uZ2VyIHByZXNlbnQsIHVuYmluZFxyXG4gICAgICAgIGNhbGxIb29rJDEob2xkRGlyc1trZXldLCAndW5iaW5kJywgb2xkVm5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG52YXIgZW1wdHlNb2RpZmllcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyQxIChcclxuICBkaXJzLFxyXG4gIHZtXHJcbikge1xyXG4gIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIGlmICghZGlycykge1xyXG4gICAgcmV0dXJuIHJlc1xyXG4gIH1cclxuICB2YXIgaSwgZGlyO1xyXG4gIGZvciAoaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBkaXIgPSBkaXJzW2ldO1xyXG4gICAgaWYgKCFkaXIubW9kaWZpZXJzKSB7XHJcbiAgICAgIGRpci5tb2RpZmllcnMgPSBlbXB0eU1vZGlmaWVycztcclxuICAgIH1cclxuICAgIHJlc1tnZXRSYXdEaXJOYW1lKGRpcildID0gZGlyO1xyXG4gICAgZGlyLmRlZiA9IHJlc29sdmVBc3NldCh2bS4kb3B0aW9ucywgJ2RpcmVjdGl2ZXMnLCBkaXIubmFtZSwgdHJ1ZSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXNcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmF3RGlyTmFtZSAoZGlyKSB7XHJcbiAgcmV0dXJuIGRpci5yYXdOYW1lIHx8ICgoZGlyLm5hbWUpICsgXCIuXCIgKyAoT2JqZWN0LmtleXMoZGlyLm1vZGlmaWVycyB8fCB7fSkuam9pbignLicpKSlcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsbEhvb2skMSAoZGlyLCBob29rLCB2bm9kZSwgb2xkVm5vZGUpIHtcclxuICB2YXIgZm4gPSBkaXIuZGVmICYmIGRpci5kZWZbaG9va107XHJcbiAgaWYgKGZuKSB7XHJcbiAgICBmbih2bm9kZS5lbG0sIGRpciwgdm5vZGUsIG9sZFZub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBiYXNlTW9kdWxlcyA9IFtcclxuICByZWYsXHJcbiAgZGlyZWN0aXZlc1xyXG5dO1xyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVBdHRycyAob2xkVm5vZGUsIHZub2RlKSB7XHJcbiAgaWYgKCFvbGRWbm9kZS5kYXRhLmF0dHJzICYmICF2bm9kZS5kYXRhLmF0dHJzKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgdmFyIGtleSwgY3VyLCBvbGQ7XHJcbiAgdmFyIGVsbSA9IHZub2RlLmVsbTtcclxuICB2YXIgb2xkQXR0cnMgPSBvbGRWbm9kZS5kYXRhLmF0dHJzIHx8IHt9O1xyXG4gIHZhciBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgfHwge307XHJcbiAgLy8gY2xvbmUgb2JzZXJ2ZWQgb2JqZWN0cywgYXMgdGhlIHVzZXIgcHJvYmFibHkgd2FudHMgdG8gbXV0YXRlIGl0XHJcbiAgaWYgKGF0dHJzLl9fb2JfXykge1xyXG4gICAgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzID0gZXh0ZW5kKHt9LCBhdHRycyk7XHJcbiAgfVxyXG5cclxuICBmb3IgKGtleSBpbiBhdHRycykge1xyXG4gICAgY3VyID0gYXR0cnNba2V5XTtcclxuICAgIG9sZCA9IG9sZEF0dHJzW2tleV07XHJcbiAgICBpZiAob2xkICE9PSBjdXIpIHtcclxuICAgICAgc2V0QXR0cihlbG0sIGtleSwgY3VyKTtcclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChrZXkgaW4gb2xkQXR0cnMpIHtcclxuICAgIGlmIChhdHRyc1trZXldID09IG51bGwpIHtcclxuICAgICAgaWYgKGlzWGxpbmsoa2V5KSkge1xyXG4gICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBnZXRYbGlua1Byb3Aoa2V5KSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIWlzRW51bWVyYXRlZEF0dHIoa2V5KSkge1xyXG4gICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0QXR0ciAoZWwsIGtleSwgdmFsdWUpIHtcclxuICBpZiAoaXNCb29sZWFuQXR0cihrZXkpKSB7XHJcbiAgICAvLyBzZXQgYXR0cmlidXRlIGZvciBibGFuayB2YWx1ZVxyXG4gICAgLy8gZS5nLiA8b3B0aW9uIGRpc2FibGVkPlNlbGVjdCBvbmU8L29wdGlvbj5cclxuICAgIGlmIChpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSkge1xyXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIGtleSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChpc0VudW1lcmF0ZWRBdHRyKGtleSkpIHtcclxuICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpIHx8IHZhbHVlID09PSAnZmFsc2UnID8gJ2ZhbHNlJyA6ICd0cnVlJyk7XHJcbiAgfSBlbHNlIGlmIChpc1hsaW5rKGtleSkpIHtcclxuICAgIGlmIChpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSkge1xyXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBnZXRYbGlua1Byb3Aoa2V5KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIHZhbHVlKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XHJcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxudmFyIGF0dHJzID0ge1xyXG4gIGNyZWF0ZTogdXBkYXRlQXR0cnMsXHJcbiAgdXBkYXRlOiB1cGRhdGVBdHRyc1xyXG59O1xyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDbGFzcyAob2xkVm5vZGUsIHZub2RlKSB7XHJcbiAgdmFyIGVsID0gdm5vZGUuZWxtO1xyXG4gIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcclxuICB2YXIgb2xkRGF0YSA9IG9sZFZub2RlLmRhdGE7XHJcbiAgaWYgKCFkYXRhLnN0YXRpY0NsYXNzICYmICFkYXRhLmNsYXNzICYmXHJcbiAgICAgICghb2xkRGF0YSB8fCAoIW9sZERhdGEuc3RhdGljQ2xhc3MgJiYgIW9sZERhdGEuY2xhc3MpKSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICB2YXIgY2xzID0gZ2VuQ2xhc3NGb3JWbm9kZSh2bm9kZSk7XHJcblxyXG4gIC8vIGhhbmRsZSB0cmFuc2l0aW9uIGNsYXNzZXNcclxuICB2YXIgdHJhbnNpdGlvbkNsYXNzID0gZWwuX3RyYW5zaXRpb25DbGFzc2VzO1xyXG4gIGlmICh0cmFuc2l0aW9uQ2xhc3MpIHtcclxuICAgIGNscyA9IGNvbmNhdChjbHMsIHN0cmluZ2lmeUNsYXNzKHRyYW5zaXRpb25DbGFzcykpO1xyXG4gIH1cclxuXHJcbiAgLy8gc2V0IHRoZSBjbGFzc1xyXG4gIGlmIChjbHMgIT09IGVsLl9wcmV2Q2xhc3MpIHtcclxuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbHMpO1xyXG4gICAgZWwuX3ByZXZDbGFzcyA9IGNscztcclxuICB9XHJcbn1cclxuXHJcbnZhciBrbGFzcyA9IHtcclxuICBjcmVhdGU6IHVwZGF0ZUNsYXNzLFxyXG4gIHVwZGF0ZTogdXBkYXRlQ2xhc3NcclxufTtcclxuXHJcbi8vIHNraXAgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSB3ZSBuZWVkIHRvIGF0dGFjaCBwcml2YXRlIHByb3BlcnRpZXNcclxuLy8gdG8gZWxlbWVudHNcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZURPTUxpc3RlbmVycyAob2xkVm5vZGUsIHZub2RlKSB7XHJcbiAgaWYgKCFvbGRWbm9kZS5kYXRhLm9uICYmICF2bm9kZS5kYXRhLm9uKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgdmFyIG9uID0gdm5vZGUuZGF0YS5vbiB8fCB7fTtcclxuICB2YXIgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uIHx8IHt9O1xyXG4gIHZhciBhZGQgPSB2bm9kZS5lbG0uX3ZfYWRkIHx8ICh2bm9kZS5lbG0uX3ZfYWRkID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlKSB7XHJcbiAgICB2bm9kZS5lbG0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSk7XHJcbiAgfSk7XHJcbiAgdmFyIHJlbW92ZSA9IHZub2RlLmVsbS5fdl9yZW1vdmUgfHwgKHZub2RlLmVsbS5fdl9yZW1vdmUgPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcclxuICAgIHZub2RlLmVsbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcclxuICB9KTtcclxuICB1cGRhdGVMaXN0ZW5lcnMob24sIG9sZE9uLCBhZGQsIHJlbW92ZSwgdm5vZGUuY29udGV4dCk7XHJcbn1cclxuXHJcbnZhciBldmVudHMgPSB7XHJcbiAgY3JlYXRlOiB1cGRhdGVET01MaXN0ZW5lcnMsXHJcbiAgdXBkYXRlOiB1cGRhdGVET01MaXN0ZW5lcnNcclxufTtcclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlRE9NUHJvcHMgKG9sZFZub2RlLCB2bm9kZSkge1xyXG4gIGlmICghb2xkVm5vZGUuZGF0YS5kb21Qcm9wcyAmJiAhdm5vZGUuZGF0YS5kb21Qcm9wcykge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIHZhciBrZXksIGN1cjtcclxuICB2YXIgZWxtID0gdm5vZGUuZWxtO1xyXG4gIHZhciBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEuZG9tUHJvcHMgfHwge307XHJcbiAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5kb21Qcm9wcyB8fCB7fTtcclxuICAvLyBjbG9uZSBvYnNlcnZlZCBvYmplY3RzLCBhcyB0aGUgdXNlciBwcm9iYWJseSB3YW50cyB0byBtdXRhdGUgaXRcclxuICBpZiAocHJvcHMuX19vYl9fKSB7XHJcbiAgICBwcm9wcyA9IHZub2RlLmRhdGEuZG9tUHJvcHMgPSBleHRlbmQoe30sIHByb3BzKTtcclxuICB9XHJcblxyXG4gIGZvciAoa2V5IGluIG9sZFByb3BzKSB7XHJcbiAgICBpZiAocHJvcHNba2V5XSA9PSBudWxsKSB7XHJcbiAgICAgIGVsbVtrZXldID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoa2V5IGluIHByb3BzKSB7XHJcbiAgICBjdXIgPSBwcm9wc1trZXldO1xyXG4gICAgLy8gaWdub3JlIGNoaWxkcmVuIGlmIHRoZSBub2RlIGhhcyB0ZXh0Q29udGVudCBvciBpbm5lckhUTUwsXHJcbiAgICAvLyBhcyB0aGVzZSB3aWxsIHRocm93IGF3YXkgZXhpc3RpbmcgRE9NIG5vZGVzIGFuZCBjYXVzZSByZW1vdmFsIGVycm9yc1xyXG4gICAgLy8gb24gc3Vic2VxdWVudCBwYXRjaGVzICgjMzM2MClcclxuICAgIGlmIChrZXkgPT09ICd0ZXh0Q29udGVudCcgfHwga2V5ID09PSAnaW5uZXJIVE1MJykge1xyXG4gICAgICBpZiAodm5vZGUuY2hpbGRyZW4pIHsgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoID0gMDsgfVxyXG4gICAgICBpZiAoY3VyID09PSBvbGRQcm9wc1trZXldKSB7IGNvbnRpbnVlIH1cclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09ICd2YWx1ZScpIHtcclxuICAgICAgLy8gc3RvcmUgdmFsdWUgYXMgX3ZhbHVlIGFzIHdlbGwgc2luY2VcclxuICAgICAgLy8gbm9uLXN0cmluZyB2YWx1ZXMgd2lsbCBiZSBzdHJpbmdpZmllZFxyXG4gICAgICBlbG0uX3ZhbHVlID0gY3VyO1xyXG4gICAgICAvLyBhdm9pZCByZXNldHRpbmcgY3Vyc29yIHBvc2l0aW9uIHdoZW4gdmFsdWUgaXMgdGhlIHNhbWVcclxuICAgICAgdmFyIHN0ckN1ciA9IGN1ciA9PSBudWxsID8gJycgOiBTdHJpbmcoY3VyKTtcclxuICAgICAgaWYgKGVsbS52YWx1ZSAhPT0gc3RyQ3VyICYmICFlbG0uY29tcG9zaW5nKSB7XHJcbiAgICAgICAgZWxtLnZhbHVlID0gc3RyQ3VyO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbG1ba2V5XSA9IGN1cjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnZhciBkb21Qcm9wcyA9IHtcclxuICBjcmVhdGU6IHVwZGF0ZURPTVByb3BzLFxyXG4gIHVwZGF0ZTogdXBkYXRlRE9NUHJvcHNcclxufTtcclxuXHJcbi8qICAqL1xyXG5cclxudmFyIHBhcnNlU3R5bGVUZXh0ID0gY2FjaGVkKGZ1bmN0aW9uIChjc3NUZXh0KSB7XHJcbiAgdmFyIHJlcyA9IHt9O1xyXG4gIHZhciBoYXNCYWNrZ3JvdW5kID0gY3NzVGV4dC5pbmRleE9mKCdiYWNrZ3JvdW5kJykgPj0gMDtcclxuICAvLyBtYXliZSB3aXRoIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwOi8veHh4KSBvciBiYXNlNjQgaW1nXHJcbiAgdmFyIGxpc3REZWxpbWl0ZXIgPSBoYXNCYWNrZ3JvdW5kID8gLzsoPyFbXihdKlxcKSkvZyA6ICc7JztcclxuICB2YXIgcHJvcGVydHlEZWxpbWl0ZXIgPSBoYXNCYWNrZ3JvdW5kID8gLzooLispLyA6ICc6JztcclxuICBjc3NUZXh0LnNwbGl0KGxpc3REZWxpbWl0ZXIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIHZhciB0bXAgPSBpdGVtLnNwbGl0KHByb3BlcnR5RGVsaW1pdGVyKTtcclxuICAgICAgdG1wLmxlbmd0aCA+IDEgJiYgKHJlc1t0bXBbMF0udHJpbSgpXSA9IHRtcFsxXS50cmltKCkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiByZXNcclxufSk7XHJcblxyXG4vLyBtZXJnZSBzdGF0aWMgYW5kIGR5bmFtaWMgc3R5bGUgZGF0YSBvbiB0aGUgc2FtZSB2bm9kZVxyXG5mdW5jdGlvbiBub3JtYWxpemVTdHlsZURhdGEgKGRhdGEpIHtcclxuICB2YXIgc3R5bGUgPSBub3JtYWxpemVTdHlsZUJpbmRpbmcoZGF0YS5zdHlsZSk7XHJcbiAgLy8gc3RhdGljIHN0eWxlIGlzIHByZS1wcm9jZXNzZWQgaW50byBhbiBvYmplY3QgZHVyaW5nIGNvbXBpbGF0aW9uXHJcbiAgLy8gYW5kIGlzIGFsd2F5cyBhIGZyZXNoIG9iamVjdCwgc28gaXQncyBzYWZlIHRvIG1lcmdlIGludG8gaXRcclxuICByZXR1cm4gZGF0YS5zdGF0aWNTdHlsZVxyXG4gICAgPyBleHRlbmQoZGF0YS5zdGF0aWNTdHlsZSwgc3R5bGUpXHJcbiAgICA6IHN0eWxlXHJcbn1cclxuXHJcbi8vIG5vcm1hbGl6ZSBwb3NzaWJsZSBhcnJheSAvIHN0cmluZyB2YWx1ZXMgaW50byBPYmplY3RcclxuZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVCaW5kaW5nIChiaW5kaW5nU3R5bGUpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShiaW5kaW5nU3R5bGUpKSB7XHJcbiAgICByZXR1cm4gdG9PYmplY3QoYmluZGluZ1N0eWxlKVxyXG4gIH1cclxuICBpZiAodHlwZW9mIGJpbmRpbmdTdHlsZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBwYXJzZVN0eWxlVGV4dChiaW5kaW5nU3R5bGUpXHJcbiAgfVxyXG4gIHJldHVybiBiaW5kaW5nU3R5bGVcclxufVxyXG5cclxuLyoqXHJcbiAqIHBhcmVudCBjb21wb25lbnQgc3R5bGUgc2hvdWxkIGJlIGFmdGVyIGNoaWxkJ3NcclxuICogc28gdGhhdCBwYXJlbnQgY29tcG9uZW50J3Mgc3R5bGUgY291bGQgb3ZlcnJpZGUgaXRcclxuICovXHJcbmZ1bmN0aW9uIGdldFN0eWxlICh2bm9kZSwgY2hlY2tDaGlsZCkge1xyXG4gIHZhciByZXMgPSB7fTtcclxuICB2YXIgc3R5bGVEYXRhO1xyXG5cclxuICBpZiAoY2hlY2tDaGlsZCkge1xyXG4gICAgdmFyIGNoaWxkTm9kZSA9IHZub2RlO1xyXG4gICAgd2hpbGUgKGNoaWxkTm9kZS5jaGlsZCkge1xyXG4gICAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUuY2hpbGQuX3Zub2RlO1xyXG4gICAgICBpZiAoY2hpbGROb2RlLmRhdGEgJiYgKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YShjaGlsZE5vZGUuZGF0YSkpKSB7XHJcbiAgICAgICAgZXh0ZW5kKHJlcywgc3R5bGVEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEodm5vZGUuZGF0YSkpKSB7XHJcbiAgICBleHRlbmQocmVzLCBzdHlsZURhdGEpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHBhcmVudE5vZGUgPSB2bm9kZTtcclxuICB3aGlsZSAoKHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudCkpIHtcclxuICAgIGlmIChwYXJlbnROb2RlLmRhdGEgJiYgKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YShwYXJlbnROb2RlLmRhdGEpKSkge1xyXG4gICAgICBleHRlbmQocmVzLCBzdHlsZURhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzXHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxudmFyIGNzc1ZhclJFID0gL14tLS87XHJcbnZhciBzZXRQcm9wID0gZnVuY3Rpb24gKGVsLCBuYW1lLCB2YWwpIHtcclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICBpZiAoY3NzVmFyUkUudGVzdChuYW1lKSkge1xyXG4gICAgZWwuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZWwuc3R5bGVbbm9ybWFsaXplKG5hbWUpXSA9IHZhbDtcclxuICB9XHJcbn07XHJcblxyXG52YXIgcHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdNb3onLCAnbXMnXTtcclxuXHJcbnZhciB0ZXN0RWw7XHJcbnZhciBub3JtYWxpemUgPSBjYWNoZWQoZnVuY3Rpb24gKHByb3ApIHtcclxuICB0ZXN0RWwgPSB0ZXN0RWwgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgcHJvcCA9IGNhbWVsaXplKHByb3ApO1xyXG4gIGlmIChwcm9wICE9PSAnZmlsdGVyJyAmJiAocHJvcCBpbiB0ZXN0RWwuc3R5bGUpKSB7XHJcbiAgICByZXR1cm4gcHJvcFxyXG4gIH1cclxuICB2YXIgdXBwZXIgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgcHJlZml4ZWQgPSBwcmVmaXhlc1tpXSArIHVwcGVyO1xyXG4gICAgaWYgKHByZWZpeGVkIGluIHRlc3RFbC5zdHlsZSkge1xyXG4gICAgICByZXR1cm4gcHJlZml4ZWRcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG9sZFZub2RlLCB2bm9kZSkge1xyXG4gIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcclxuICB2YXIgb2xkRGF0YSA9IG9sZFZub2RlLmRhdGE7XHJcblxyXG4gIGlmICghZGF0YS5zdGF0aWNTdHlsZSAmJiAhZGF0YS5zdHlsZSAmJlxyXG4gICAgICAhb2xkRGF0YS5zdGF0aWNTdHlsZSAmJiAhb2xkRGF0YS5zdHlsZSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICB2YXIgY3VyLCBuYW1lO1xyXG4gIHZhciBlbCA9IHZub2RlLmVsbTtcclxuICB2YXIgb2xkU3RhdGljU3R5bGUgPSBvbGRWbm9kZS5kYXRhLnN0YXRpY1N0eWxlO1xyXG4gIHZhciBvbGRTdHlsZUJpbmRpbmcgPSBvbGRWbm9kZS5kYXRhLnN0eWxlIHx8IHt9O1xyXG5cclxuICAvLyBpZiBzdGF0aWMgc3R5bGUgZXhpc3RzLCBzdHlsZWJpbmRpbmcgYWxyZWFkeSBtZXJnZWQgaW50byBpdCB3aGVuIGRvaW5nIG5vcm1hbGl6ZVN0eWxlRGF0YVxyXG4gIHZhciBvbGRTdHlsZSA9IG9sZFN0YXRpY1N0eWxlIHx8IG9sZFN0eWxlQmluZGluZztcclxuXHJcbiAgdmFyIHN0eWxlID0gbm9ybWFsaXplU3R5bGVCaW5kaW5nKHZub2RlLmRhdGEuc3R5bGUpIHx8IHt9O1xyXG5cclxuICB2bm9kZS5kYXRhLnN0eWxlID0gc3R5bGUuX19vYl9fID8gZXh0ZW5kKHt9LCBzdHlsZSkgOiBzdHlsZTtcclxuXHJcbiAgdmFyIG5ld1N0eWxlID0gZ2V0U3R5bGUodm5vZGUsIHRydWUpO1xyXG5cclxuICBmb3IgKG5hbWUgaW4gb2xkU3R5bGUpIHtcclxuICAgIGlmIChuZXdTdHlsZVtuYW1lXSA9PSBudWxsKSB7XHJcbiAgICAgIHNldFByb3AoZWwsIG5hbWUsICcnKTtcclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChuYW1lIGluIG5ld1N0eWxlKSB7XHJcbiAgICBjdXIgPSBuZXdTdHlsZVtuYW1lXTtcclxuICAgIGlmIChjdXIgIT09IG9sZFN0eWxlW25hbWVdKSB7XHJcbiAgICAgIC8vIGllOSBzZXR0aW5nIHRvIG51bGwgaGFzIG5vIGVmZmVjdCwgbXVzdCB1c2UgZW1wdHkgc3RyaW5nXHJcbiAgICAgIHNldFByb3AoZWwsIG5hbWUsIGN1ciA9PSBudWxsID8gJycgOiBjdXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxudmFyIHN0eWxlID0ge1xyXG4gIGNyZWF0ZTogdXBkYXRlU3R5bGUsXHJcbiAgdXBkYXRlOiB1cGRhdGVTdHlsZVxyXG59O1xyXG5cclxuLyogICovXHJcblxyXG4vKipcclxuICogQWRkIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgU1ZHIHNpbmNlIGNsYXNzTGlzdCBpcyBub3Qgc3VwcG9ydGVkIG9uXHJcbiAqIFNWRyBlbGVtZW50cyBpbiBJRVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkQ2xhc3MgKGVsLCBjbHMpIHtcclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICBpZiAoIWNscyB8fCAhY2xzLnRyaW0oKSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgIGlmIChjbHMuaW5kZXhPZignICcpID4gLTEpIHtcclxuICAgICAgY2xzLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjKTsgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBjdXIgPSAnICcgKyBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgKyAnICc7XHJcbiAgICBpZiAoY3VyLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA8IDApIHtcclxuICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjdXIgKyBjbHMpLnRyaW0oKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgU1ZHIHNpbmNlIGNsYXNzTGlzdCBpcyBub3Qgc3VwcG9ydGVkIG9uXHJcbiAqIFNWRyBlbGVtZW50cyBpbiBJRVxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MgKGVsLCBjbHMpIHtcclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICBpZiAoIWNscyB8fCAhY2xzLnRyaW0oKSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgIGlmIChjbHMuaW5kZXhPZignICcpID4gLTEpIHtcclxuICAgICAgY2xzLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZWwuY2xhc3NMaXN0LnJlbW92ZShjKTsgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscyk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBjdXIgPSAnICcgKyBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgKyAnICc7XHJcbiAgICB2YXIgdGFyID0gJyAnICsgY2xzICsgJyAnO1xyXG4gICAgd2hpbGUgKGN1ci5pbmRleE9mKHRhcikgPj0gMCkge1xyXG4gICAgICBjdXIgPSBjdXIucmVwbGFjZSh0YXIsICcgJyk7XHJcbiAgICB9XHJcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY3VyLnRyaW0oKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbnZhciBoYXNUcmFuc2l0aW9uID0gaW5Ccm93c2VyICYmICFpc0lFOTtcclxudmFyIFRSQU5TSVRJT04gPSAndHJhbnNpdGlvbic7XHJcbnZhciBBTklNQVRJT04gPSAnYW5pbWF0aW9uJztcclxuXHJcbi8vIFRyYW5zaXRpb24gcHJvcGVydHkvZXZlbnQgc25pZmZpbmdcclxudmFyIHRyYW5zaXRpb25Qcm9wID0gJ3RyYW5zaXRpb24nO1xyXG52YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3RyYW5zaXRpb25lbmQnO1xyXG52YXIgYW5pbWF0aW9uUHJvcCA9ICdhbmltYXRpb24nO1xyXG52YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kJztcclxuaWYgKGhhc1RyYW5zaXRpb24pIHtcclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICBpZiAod2luZG93Lm9udHJhbnNpdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmXHJcbiAgICB3aW5kb3cub253ZWJraXR0cmFuc2l0aW9uZW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHRyYW5zaXRpb25Qcm9wID0gJ1dlYmtpdFRyYW5zaXRpb24nO1xyXG4gICAgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQnO1xyXG4gIH1cclxuICBpZiAod2luZG93Lm9uYW5pbWF0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcclxuICAgIHdpbmRvdy5vbndlYmtpdGFuaW1hdGlvbmVuZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBhbmltYXRpb25Qcm9wID0gJ1dlYmtpdEFuaW1hdGlvbic7XHJcbiAgICBhbmltYXRpb25FbmRFdmVudCA9ICd3ZWJraXRBbmltYXRpb25FbmQnO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJhZiA9IChpbkJyb3dzZXIgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgc2V0VGltZW91dDtcclxuZnVuY3Rpb24gbmV4dEZyYW1lIChmbikge1xyXG4gIHJhZihmdW5jdGlvbiAoKSB7XHJcbiAgICByYWYoZm4pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUcmFuc2l0aW9uQ2xhc3MgKGVsLCBjbHMpIHtcclxuICAoZWwuX3RyYW5zaXRpb25DbGFzc2VzIHx8IChlbC5fdHJhbnNpdGlvbkNsYXNzZXMgPSBbXSkpLnB1c2goY2xzKTtcclxuICBhZGRDbGFzcyhlbCwgY2xzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVHJhbnNpdGlvbkNsYXNzIChlbCwgY2xzKSB7XHJcbiAgaWYgKGVsLl90cmFuc2l0aW9uQ2xhc3Nlcykge1xyXG4gICAgcmVtb3ZlJDEoZWwuX3RyYW5zaXRpb25DbGFzc2VzLCBjbHMpO1xyXG4gIH1cclxuICByZW1vdmVDbGFzcyhlbCwgY2xzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2hlblRyYW5zaXRpb25FbmRzIChcclxuICBlbCxcclxuICBleHBlY3RlZFR5cGUsXHJcbiAgY2JcclxuKSB7XHJcbiAgdmFyIHJlZiA9IGdldFRyYW5zaXRpb25JbmZvKGVsLCBleHBlY3RlZFR5cGUpO1xyXG4gIHZhciB0eXBlID0gcmVmLnR5cGU7XHJcbiAgdmFyIHRpbWVvdXQgPSByZWYudGltZW91dDtcclxuICB2YXIgcHJvcENvdW50ID0gcmVmLnByb3BDb3VudDtcclxuICBpZiAoIXR5cGUpIHsgcmV0dXJuIGNiKCkgfVxyXG4gIHZhciBldmVudCA9IHR5cGUgPT09IFRSQU5TSVRJT04gPyB0cmFuc2l0aW9uRW5kRXZlbnQgOiBhbmltYXRpb25FbmRFdmVudDtcclxuICB2YXIgZW5kZWQgPSAwO1xyXG4gIHZhciBlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBvbkVuZCk7XHJcbiAgICBjYigpO1xyXG4gIH07XHJcbiAgdmFyIG9uRW5kID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChlLnRhcmdldCA9PT0gZWwpIHtcclxuICAgICAgaWYgKCsrZW5kZWQgPj0gcHJvcENvdW50KSB7XHJcbiAgICAgICAgZW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGVuZGVkIDwgcHJvcENvdW50KSB7XHJcbiAgICAgIGVuZCgpO1xyXG4gICAgfVxyXG4gIH0sIHRpbWVvdXQgKyAxKTtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBvbkVuZCk7XHJcbn1cclxuXHJcbnZhciB0cmFuc2Zvcm1SRSA9IC9cXGIodHJhbnNmb3JtfGFsbCkoLHwkKS87XHJcblxyXG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uSW5mbyAoZWwsIGV4cGVjdGVkVHlwZSkge1xyXG4gIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XHJcbiAgdmFyIHRyYW5zaXRpb25lRGVsYXlzID0gc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ0RlbGF5J10uc3BsaXQoJywgJyk7XHJcbiAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbnMgPSBzdHlsZXNbdHJhbnNpdGlvblByb3AgKyAnRHVyYXRpb24nXS5zcGxpdCgnLCAnKTtcclxuICB2YXIgdHJhbnNpdGlvblRpbWVvdXQgPSBnZXRUaW1lb3V0KHRyYW5zaXRpb25lRGVsYXlzLCB0cmFuc2l0aW9uRHVyYXRpb25zKTtcclxuICB2YXIgYW5pbWF0aW9uRGVsYXlzID0gc3R5bGVzW2FuaW1hdGlvblByb3AgKyAnRGVsYXknXS5zcGxpdCgnLCAnKTtcclxuICB2YXIgYW5pbWF0aW9uRHVyYXRpb25zID0gc3R5bGVzW2FuaW1hdGlvblByb3AgKyAnRHVyYXRpb24nXS5zcGxpdCgnLCAnKTtcclxuICB2YXIgYW5pbWF0aW9uVGltZW91dCA9IGdldFRpbWVvdXQoYW5pbWF0aW9uRGVsYXlzLCBhbmltYXRpb25EdXJhdGlvbnMpO1xyXG5cclxuICB2YXIgdHlwZTtcclxuICB2YXIgdGltZW91dCA9IDA7XHJcbiAgdmFyIHByb3BDb3VudCA9IDA7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgaWYgKGV4cGVjdGVkVHlwZSA9PT0gVFJBTlNJVElPTikge1xyXG4gICAgaWYgKHRyYW5zaXRpb25UaW1lb3V0ID4gMCkge1xyXG4gICAgICB0eXBlID0gVFJBTlNJVElPTjtcclxuICAgICAgdGltZW91dCA9IHRyYW5zaXRpb25UaW1lb3V0O1xyXG4gICAgICBwcm9wQ291bnQgPSB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aDtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gQU5JTUFUSU9OKSB7XHJcbiAgICBpZiAoYW5pbWF0aW9uVGltZW91dCA+IDApIHtcclxuICAgICAgdHlwZSA9IEFOSU1BVElPTjtcclxuICAgICAgdGltZW91dCA9IGFuaW1hdGlvblRpbWVvdXQ7XHJcbiAgICAgIHByb3BDb3VudCA9IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBNYXRoLm1heCh0cmFuc2l0aW9uVGltZW91dCwgYW5pbWF0aW9uVGltZW91dCk7XHJcbiAgICB0eXBlID0gdGltZW91dCA+IDBcclxuICAgICAgPyB0cmFuc2l0aW9uVGltZW91dCA+IGFuaW1hdGlvblRpbWVvdXRcclxuICAgICAgICA/IFRSQU5TSVRJT05cclxuICAgICAgICA6IEFOSU1BVElPTlxyXG4gICAgICA6IG51bGw7XHJcbiAgICBwcm9wQ291bnQgPSB0eXBlXHJcbiAgICAgID8gdHlwZSA9PT0gVFJBTlNJVElPTlxyXG4gICAgICAgID8gdHJhbnNpdGlvbkR1cmF0aW9ucy5sZW5ndGhcclxuICAgICAgICA6IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGhcclxuICAgICAgOiAwO1xyXG4gIH1cclxuICB2YXIgaGFzVHJhbnNmb3JtID1cclxuICAgIHR5cGUgPT09IFRSQU5TSVRJT04gJiZcclxuICAgIHRyYW5zZm9ybVJFLnRlc3Qoc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ1Byb3BlcnR5J10pO1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiB0eXBlLFxyXG4gICAgdGltZW91dDogdGltZW91dCxcclxuICAgIHByb3BDb3VudDogcHJvcENvdW50LFxyXG4gICAgaGFzVHJhbnNmb3JtOiBoYXNUcmFuc2Zvcm1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWVvdXQgKGRlbGF5cywgZHVyYXRpb25zKSB7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICB3aGlsZSAoZGVsYXlzLmxlbmd0aCA8IGR1cmF0aW9ucy5sZW5ndGgpIHtcclxuICAgIGRlbGF5cyA9IGRlbGF5cy5jb25jYXQoZGVsYXlzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBkdXJhdGlvbnMubWFwKGZ1bmN0aW9uIChkLCBpKSB7XHJcbiAgICByZXR1cm4gdG9NcyhkKSArIHRvTXMoZGVsYXlzW2ldKVxyXG4gIH0pKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b01zIChzKSB7XHJcbiAgcmV0dXJuIE51bWJlcihzLnNsaWNlKDAsIC0xKSkgKiAxMDAwXHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gZW50ZXIgKHZub2RlKSB7XHJcbiAgdmFyIGVsID0gdm5vZGUuZWxtO1xyXG5cclxuICAvLyBjYWxsIGxlYXZlIGNhbGxiYWNrIG5vd1xyXG4gIGlmIChlbC5fbGVhdmVDYikge1xyXG4gICAgZWwuX2xlYXZlQ2IuY2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGVsLl9sZWF2ZUNiKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZGF0YSA9IHJlc29sdmVUcmFuc2l0aW9uKHZub2RlLmRhdGEudHJhbnNpdGlvbik7XHJcbiAgaWYgKCFkYXRhKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gIGlmIChlbC5fZW50ZXJDYiB8fCBlbC5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICB2YXIgY3NzID0gZGF0YS5jc3M7XHJcbiAgdmFyIHR5cGUgPSBkYXRhLnR5cGU7XHJcbiAgdmFyIGVudGVyQ2xhc3MgPSBkYXRhLmVudGVyQ2xhc3M7XHJcbiAgdmFyIGVudGVyQWN0aXZlQ2xhc3MgPSBkYXRhLmVudGVyQWN0aXZlQ2xhc3M7XHJcbiAgdmFyIGFwcGVhckNsYXNzID0gZGF0YS5hcHBlYXJDbGFzcztcclxuICB2YXIgYXBwZWFyQWN0aXZlQ2xhc3MgPSBkYXRhLmFwcGVhckFjdGl2ZUNsYXNzO1xyXG4gIHZhciBiZWZvcmVFbnRlciA9IGRhdGEuYmVmb3JlRW50ZXI7XHJcbiAgdmFyIGVudGVyID0gZGF0YS5lbnRlcjtcclxuICB2YXIgYWZ0ZXJFbnRlciA9IGRhdGEuYWZ0ZXJFbnRlcjtcclxuICB2YXIgZW50ZXJDYW5jZWxsZWQgPSBkYXRhLmVudGVyQ2FuY2VsbGVkO1xyXG4gIHZhciBiZWZvcmVBcHBlYXIgPSBkYXRhLmJlZm9yZUFwcGVhcjtcclxuICB2YXIgYXBwZWFyID0gZGF0YS5hcHBlYXI7XHJcbiAgdmFyIGFmdGVyQXBwZWFyID0gZGF0YS5hZnRlckFwcGVhcjtcclxuICB2YXIgYXBwZWFyQ2FuY2VsbGVkID0gZGF0YS5hcHBlYXJDYW5jZWxsZWQ7XHJcblxyXG4gIC8vIGFjdGl2ZUluc3RhbmNlIHdpbGwgYWx3YXlzIGJlIHRoZSA8dHJhbnNpdGlvbj4gY29tcG9uZW50IG1hbmFnaW5nIHRoaXNcclxuICAvLyB0cmFuc2l0aW9uLiBPbmUgZWRnZSBjYXNlIHRvIGNoZWNrIGlzIHdoZW4gdGhlIDx0cmFuc2l0aW9uPiBpcyBwbGFjZWRcclxuICAvLyBhcyB0aGUgcm9vdCBub2RlIG9mIGEgY2hpbGQgY29tcG9uZW50LiBJbiB0aGF0IGNhc2Ugd2UgbmVlZCB0byBjaGVja1xyXG4gIC8vIDx0cmFuc2l0aW9uPidzIHBhcmVudCBmb3IgYXBwZWFyIGNoZWNrLlxyXG4gIHZhciB0cmFuc2l0aW9uTm9kZSA9IGFjdGl2ZUluc3RhbmNlLiR2bm9kZTtcclxuICB2YXIgY29udGV4dCA9IHRyYW5zaXRpb25Ob2RlICYmIHRyYW5zaXRpb25Ob2RlLnBhcmVudFxyXG4gICAgPyB0cmFuc2l0aW9uTm9kZS5wYXJlbnQuY29udGV4dFxyXG4gICAgOiBhY3RpdmVJbnN0YW5jZTtcclxuXHJcbiAgdmFyIGlzQXBwZWFyID0gIWNvbnRleHQuX2lzTW91bnRlZCB8fCAhdm5vZGUuaXNSb290SW5zZXJ0O1xyXG5cclxuICBpZiAoaXNBcHBlYXIgJiYgIWFwcGVhciAmJiBhcHBlYXIgIT09ICcnKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIHZhciBzdGFydENsYXNzID0gaXNBcHBlYXIgPyBhcHBlYXJDbGFzcyA6IGVudGVyQ2xhc3M7XHJcbiAgdmFyIGFjdGl2ZUNsYXNzID0gaXNBcHBlYXIgPyBhcHBlYXJBY3RpdmVDbGFzcyA6IGVudGVyQWN0aXZlQ2xhc3M7XHJcbiAgdmFyIGJlZm9yZUVudGVySG9vayA9IGlzQXBwZWFyID8gKGJlZm9yZUFwcGVhciB8fCBiZWZvcmVFbnRlcikgOiBiZWZvcmVFbnRlcjtcclxuICB2YXIgZW50ZXJIb29rID0gaXNBcHBlYXIgPyAodHlwZW9mIGFwcGVhciA9PT0gJ2Z1bmN0aW9uJyA/IGFwcGVhciA6IGVudGVyKSA6IGVudGVyO1xyXG4gIHZhciBhZnRlckVudGVySG9vayA9IGlzQXBwZWFyID8gKGFmdGVyQXBwZWFyIHx8IGFmdGVyRW50ZXIpIDogYWZ0ZXJFbnRlcjtcclxuICB2YXIgZW50ZXJDYW5jZWxsZWRIb29rID0gaXNBcHBlYXIgPyAoYXBwZWFyQ2FuY2VsbGVkIHx8IGVudGVyQ2FuY2VsbGVkKSA6IGVudGVyQ2FuY2VsbGVkO1xyXG5cclxuICB2YXIgZXhwZWN0c0NTUyA9IGNzcyAhPT0gZmFsc2UgJiYgIWlzSUU5O1xyXG4gIHZhciB1c2VyV2FudHNDb250cm9sID1cclxuICAgIGVudGVySG9vayAmJlxyXG4gICAgLy8gZW50ZXJIb29rIG1heSBiZSBhIGJvdW5kIG1ldGhvZCB3aGljaCBleHBvc2VzXHJcbiAgICAvLyB0aGUgbGVuZ3RoIG9mIG9yaWdpbmFsIGZuIGFzIF9sZW5ndGhcclxuICAgIChlbnRlckhvb2suX2xlbmd0aCB8fCBlbnRlckhvb2subGVuZ3RoKSA+IDE7XHJcblxyXG4gIHZhciBjYiA9IGVsLl9lbnRlckNiID0gb25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZXhwZWN0c0NTUykge1xyXG4gICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGFjdGl2ZUNsYXNzKTtcclxuICAgIH1cclxuICAgIGlmIChjYi5jYW5jZWxsZWQpIHtcclxuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcclxuICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIHN0YXJ0Q2xhc3MpO1xyXG4gICAgICB9XHJcbiAgICAgIGVudGVyQ2FuY2VsbGVkSG9vayAmJiBlbnRlckNhbmNlbGxlZEhvb2soZWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWZ0ZXJFbnRlckhvb2sgJiYgYWZ0ZXJFbnRlckhvb2soZWwpO1xyXG4gICAgfVxyXG4gICAgZWwuX2VudGVyQ2IgPSBudWxsO1xyXG4gIH0pO1xyXG5cclxuICBpZiAoIXZub2RlLmRhdGEuc2hvdykge1xyXG4gICAgLy8gcmVtb3ZlIHBlbmRpbmcgbGVhdmUgZWxlbWVudCBvbiBlbnRlciBieSBpbmplY3RpbmcgYW4gaW5zZXJ0IGhvb2tcclxuICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLmRhdGEuaG9vayB8fCAodm5vZGUuZGF0YS5ob29rID0ge30pLCAnaW5zZXJ0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcclxuICAgICAgdmFyIHBlbmRpbmdOb2RlID0gcGFyZW50ICYmIHBhcmVudC5fcGVuZGluZyAmJiBwYXJlbnQuX3BlbmRpbmdbdm5vZGUua2V5XTtcclxuICAgICAgaWYgKHBlbmRpbmdOb2RlICYmIHBlbmRpbmdOb2RlLnRhZyA9PT0gdm5vZGUudGFnICYmIHBlbmRpbmdOb2RlLmVsbS5fbGVhdmVDYikge1xyXG4gICAgICAgIHBlbmRpbmdOb2RlLmVsbS5fbGVhdmVDYigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVudGVySG9vayAmJiBlbnRlckhvb2soZWwsIGNiKTtcclxuICAgIH0sICd0cmFuc2l0aW9uLWluc2VydCcpO1xyXG4gIH1cclxuXHJcbiAgLy8gc3RhcnQgZW50ZXIgdHJhbnNpdGlvblxyXG4gIGJlZm9yZUVudGVySG9vayAmJiBiZWZvcmVFbnRlckhvb2soZWwpO1xyXG4gIGlmIChleHBlY3RzQ1NTKSB7XHJcbiAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIHN0YXJ0Q2xhc3MpO1xyXG4gICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBhY3RpdmVDbGFzcyk7XHJcbiAgICBuZXh0RnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIHN0YXJ0Q2xhc3MpO1xyXG4gICAgICBpZiAoIWNiLmNhbmNlbGxlZCAmJiAhdXNlcldhbnRzQ29udHJvbCkge1xyXG4gICAgICAgIHdoZW5UcmFuc2l0aW9uRW5kcyhlbCwgdHlwZSwgY2IpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmICh2bm9kZS5kYXRhLnNob3cpIHtcclxuICAgIGVudGVySG9vayAmJiBlbnRlckhvb2soZWwsIGNiKTtcclxuICB9XHJcblxyXG4gIGlmICghZXhwZWN0c0NTUyAmJiAhdXNlcldhbnRzQ29udHJvbCkge1xyXG4gICAgY2IoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxlYXZlICh2bm9kZSwgcm0pIHtcclxuICB2YXIgZWwgPSB2bm9kZS5lbG07XHJcblxyXG4gIC8vIGNhbGwgZW50ZXIgY2FsbGJhY2sgbm93XHJcbiAgaWYgKGVsLl9lbnRlckNiKSB7XHJcbiAgICBlbC5fZW50ZXJDYi5jYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgZWwuX2VudGVyQ2IoKTtcclxuICB9XHJcblxyXG4gIHZhciBkYXRhID0gcmVzb2x2ZVRyYW5zaXRpb24odm5vZGUuZGF0YS50cmFuc2l0aW9uKTtcclxuICBpZiAoIWRhdGEpIHtcclxuICAgIHJldHVybiBybSgpXHJcbiAgfVxyXG5cclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICBpZiAoZWwuX2xlYXZlQ2IgfHwgZWwubm9kZVR5cGUgIT09IDEpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgdmFyIGNzcyA9IGRhdGEuY3NzO1xyXG4gIHZhciB0eXBlID0gZGF0YS50eXBlO1xyXG4gIHZhciBsZWF2ZUNsYXNzID0gZGF0YS5sZWF2ZUNsYXNzO1xyXG4gIHZhciBsZWF2ZUFjdGl2ZUNsYXNzID0gZGF0YS5sZWF2ZUFjdGl2ZUNsYXNzO1xyXG4gIHZhciBiZWZvcmVMZWF2ZSA9IGRhdGEuYmVmb3JlTGVhdmU7XHJcbiAgdmFyIGxlYXZlID0gZGF0YS5sZWF2ZTtcclxuICB2YXIgYWZ0ZXJMZWF2ZSA9IGRhdGEuYWZ0ZXJMZWF2ZTtcclxuICB2YXIgbGVhdmVDYW5jZWxsZWQgPSBkYXRhLmxlYXZlQ2FuY2VsbGVkO1xyXG4gIHZhciBkZWxheUxlYXZlID0gZGF0YS5kZWxheUxlYXZlO1xyXG5cclxuICB2YXIgZXhwZWN0c0NTUyA9IGNzcyAhPT0gZmFsc2UgJiYgIWlzSUU5O1xyXG4gIHZhciB1c2VyV2FudHNDb250cm9sID1cclxuICAgIGxlYXZlICYmXHJcbiAgICAvLyBsZWF2ZSBob29rIG1heSBiZSBhIGJvdW5kIG1ldGhvZCB3aGljaCBleHBvc2VzXHJcbiAgICAvLyB0aGUgbGVuZ3RoIG9mIG9yaWdpbmFsIGZuIGFzIF9sZW5ndGhcclxuICAgIChsZWF2ZS5fbGVuZ3RoIHx8IGxlYXZlLmxlbmd0aCkgPiAxO1xyXG5cclxuICB2YXIgY2IgPSBlbC5fbGVhdmVDYiA9IG9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5fcGVuZGluZykge1xyXG4gICAgICBlbC5wYXJlbnROb2RlLl9wZW5kaW5nW3Zub2RlLmtleV0gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKGV4cGVjdHNDU1MpIHtcclxuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcclxuICAgIH1cclxuICAgIGlmIChjYi5jYW5jZWxsZWQpIHtcclxuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcclxuICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQ2xhc3MpO1xyXG4gICAgICB9XHJcbiAgICAgIGxlYXZlQ2FuY2VsbGVkICYmIGxlYXZlQ2FuY2VsbGVkKGVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJtKCk7XHJcbiAgICAgIGFmdGVyTGVhdmUgJiYgYWZ0ZXJMZWF2ZShlbCk7XHJcbiAgICB9XHJcbiAgICBlbC5fbGVhdmVDYiA9IG51bGw7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChkZWxheUxlYXZlKSB7XHJcbiAgICBkZWxheUxlYXZlKHBlcmZvcm1MZWF2ZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHBlcmZvcm1MZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGVyZm9ybUxlYXZlICgpIHtcclxuICAgIC8vIHRoZSBkZWxheWVkIGxlYXZlIG1heSBoYXZlIGFscmVhZHkgYmVlbiBjYW5jZWxsZWRcclxuICAgIGlmIChjYi5jYW5jZWxsZWQpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICAvLyByZWNvcmQgbGVhdmluZyBlbGVtZW50XHJcbiAgICBpZiAoIXZub2RlLmRhdGEuc2hvdykge1xyXG4gICAgICAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyB8fCAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyA9IHt9KSlbdm5vZGUua2V5XSA9IHZub2RlO1xyXG4gICAgfVxyXG4gICAgYmVmb3JlTGVhdmUgJiYgYmVmb3JlTGVhdmUoZWwpO1xyXG4gICAgaWYgKGV4cGVjdHNDU1MpIHtcclxuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcclxuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcclxuICAgICAgbmV4dEZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQ2xhc3MpO1xyXG4gICAgICAgIGlmICghY2IuY2FuY2VsbGVkICYmICF1c2VyV2FudHNDb250cm9sKSB7XHJcbiAgICAgICAgICB3aGVuVHJhbnNpdGlvbkVuZHMoZWwsIHR5cGUsIGNiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGVhdmUgJiYgbGVhdmUoZWwsIGNiKTtcclxuICAgIGlmICghZXhwZWN0c0NTUyAmJiAhdXNlcldhbnRzQ29udHJvbCkge1xyXG4gICAgICBjYigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZVRyYW5zaXRpb24gKGRlZiQkMSkge1xyXG4gIGlmICghZGVmJCQxKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICBpZiAodHlwZW9mIGRlZiQkMSA9PT0gJ29iamVjdCcpIHtcclxuICAgIHZhciByZXMgPSB7fTtcclxuICAgIGlmIChkZWYkJDEuY3NzICE9PSBmYWxzZSkge1xyXG4gICAgICBleHRlbmQocmVzLCBhdXRvQ3NzVHJhbnNpdGlvbihkZWYkJDEubmFtZSB8fCAndicpKTtcclxuICAgIH1cclxuICAgIGV4dGVuZChyZXMsIGRlZiQkMSk7XHJcbiAgICByZXR1cm4gcmVzXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmJCQxID09PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIGF1dG9Dc3NUcmFuc2l0aW9uKGRlZiQkMSlcclxuICB9XHJcbn1cclxuXHJcbnZhciBhdXRvQ3NzVHJhbnNpdGlvbiA9IGNhY2hlZChmdW5jdGlvbiAobmFtZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICBlbnRlckNsYXNzOiAobmFtZSArIFwiLWVudGVyXCIpLFxyXG4gICAgbGVhdmVDbGFzczogKG5hbWUgKyBcIi1sZWF2ZVwiKSxcclxuICAgIGFwcGVhckNsYXNzOiAobmFtZSArIFwiLWVudGVyXCIpLFxyXG4gICAgZW50ZXJBY3RpdmVDbGFzczogKG5hbWUgKyBcIi1lbnRlci1hY3RpdmVcIiksXHJcbiAgICBsZWF2ZUFjdGl2ZUNsYXNzOiAobmFtZSArIFwiLWxlYXZlLWFjdGl2ZVwiKSxcclxuICAgIGFwcGVhckFjdGl2ZUNsYXNzOiAobmFtZSArIFwiLWVudGVyLWFjdGl2ZVwiKVxyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBvbmNlIChmbikge1xyXG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFjYWxsZWQpIHtcclxuICAgICAgY2FsbGVkID0gdHJ1ZTtcclxuICAgICAgZm4oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnZhciB0cmFuc2l0aW9uID0gaW5Ccm93c2VyID8ge1xyXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlIChfLCB2bm9kZSkge1xyXG4gICAgaWYgKCF2bm9kZS5kYXRhLnNob3cpIHtcclxuICAgICAgZW50ZXIodm5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUgKHZub2RlLCBybSkge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XHJcbiAgICAgIGxlYXZlKHZub2RlLCBybSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBybSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSA6IHt9O1xyXG5cclxudmFyIHBsYXRmb3JtTW9kdWxlcyA9IFtcclxuICBhdHRycyxcclxuICBrbGFzcyxcclxuICBldmVudHMsXHJcbiAgZG9tUHJvcHMsXHJcbiAgc3R5bGUsXHJcbiAgdHJhbnNpdGlvblxyXG5dO1xyXG5cclxuLyogICovXHJcblxyXG4vLyB0aGUgZGlyZWN0aXZlIG1vZHVsZSBzaG91bGQgYmUgYXBwbGllZCBsYXN0LCBhZnRlciBhbGxcclxuLy8gYnVpbHQtaW4gbW9kdWxlcyBoYXZlIGJlZW4gYXBwbGllZC5cclxudmFyIG1vZHVsZXMgPSBwbGF0Zm9ybU1vZHVsZXMuY29uY2F0KGJhc2VNb2R1bGVzKTtcclxuXHJcbnZhciBwYXRjaCQxID0gY3JlYXRlUGF0Y2hGdW5jdGlvbih7IG5vZGVPcHM6IG5vZGVPcHMsIG1vZHVsZXM6IG1vZHVsZXMgfSk7XHJcblxyXG4vKipcclxuICogTm90IHR5cGUgY2hlY2tpbmcgdGhpcyBmaWxlIGJlY2F1c2UgZmxvdyBkb2Vzbid0IGxpa2UgYXR0YWNoaW5nXHJcbiAqIHByb3BlcnRpZXMgdG8gRWxlbWVudHMuXHJcbiAqL1xyXG5cclxudmFyIG1vZGVsYWJsZVRhZ1JFID0gL15pbnB1dHxzZWxlY3R8dGV4dGFyZWF8dnVlLWNvbXBvbmVudC1bMC05XSsoLVswLTlhLXpBLVpfLV0qKT8kLztcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG5pZiAoaXNJRTkpIHtcclxuICAvLyBodHRwOi8vd3d3Lm1hdHRzNDExLmNvbS9wb3N0L2ludGVybmV0LWV4cGxvcmVyLTktb25pbnB1dC9cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgaWYgKGVsICYmIGVsLnZtb2RlbCkge1xyXG4gICAgICB0cmlnZ2VyKGVsLCAnaW5wdXQnKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxudmFyIG1vZGVsID0ge1xyXG4gIGluc2VydGVkOiBmdW5jdGlvbiBpbnNlcnRlZCAoZWwsIGJpbmRpbmcsIHZub2RlKSB7XHJcbiAgICB7XHJcbiAgICAgIGlmICghbW9kZWxhYmxlVGFnUkUudGVzdCh2bm9kZS50YWcpKSB7XHJcbiAgICAgICAgd2FybihcclxuICAgICAgICAgIFwidi1tb2RlbCBpcyBub3Qgc3VwcG9ydGVkIG9uIGVsZW1lbnQgdHlwZTogPFwiICsgKHZub2RlLnRhZykgKyBcIj4uIFwiICtcclxuICAgICAgICAgICdJZiB5b3UgYXJlIHdvcmtpbmcgd2l0aCBjb250ZW50ZWRpdGFibGUsIGl0XFwncyByZWNvbW1lbmRlZCB0byAnICtcclxuICAgICAgICAgICd3cmFwIGEgbGlicmFyeSBkZWRpY2F0ZWQgZm9yIHRoYXQgcHVycG9zZSBpbnNpZGUgYSBjdXN0b20gY29tcG9uZW50LicsXHJcbiAgICAgICAgICB2bm9kZS5jb250ZXh0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHZub2RlLnRhZyA9PT0gJ3NlbGVjdCcpIHtcclxuICAgICAgdmFyIGNiID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldFNlbGVjdGVkKGVsLCBiaW5kaW5nLCB2bm9kZS5jb250ZXh0KTtcclxuICAgICAgfTtcclxuICAgICAgY2IoKTtcclxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgIGlmIChpc0lFIHx8IGlzRWRnZSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2IsIDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAodm5vZGUudGFnID09PSAndGV4dGFyZWEnIHx8IGVsLnR5cGUgPT09ICd0ZXh0JykgJiZcclxuICAgICAgIWJpbmRpbmcubW9kaWZpZXJzLmxhenlcclxuICAgICkge1xyXG4gICAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uc3RhcnQnLCBvbkNvbXBvc2l0aW9uU3RhcnQpO1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uZW5kJywgb25Db21wb3NpdGlvbkVuZCk7XHJcbiAgICAgIH1cclxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgIGlmIChpc0lFOSkge1xyXG4gICAgICAgIGVsLnZtb2RlbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXBvbmVudFVwZGF0ZWQ6IGZ1bmN0aW9uIGNvbXBvbmVudFVwZGF0ZWQgKGVsLCBiaW5kaW5nLCB2bm9kZSkge1xyXG4gICAgaWYgKHZub2RlLnRhZyA9PT0gJ3NlbGVjdCcpIHtcclxuICAgICAgc2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZub2RlLmNvbnRleHQpO1xyXG4gICAgICAvLyBpbiBjYXNlIHRoZSBvcHRpb25zIHJlbmRlcmVkIGJ5IHYtZm9yIGhhdmUgY2hhbmdlZCxcclxuICAgICAgLy8gaXQncyBwb3NzaWJsZSB0aGF0IHRoZSB2YWx1ZSBpcyBvdXQtb2Ytc3luYyB3aXRoIHRoZSByZW5kZXJlZCBvcHRpb25zLlxyXG4gICAgICAvLyBkZXRlY3Qgc3VjaCBjYXNlcyBhbmQgZmlsdGVyIG91dCB2YWx1ZXMgdGhhdCBubyBsb25nZXIgaGFzIGEgbWF0Y2hpbmdcclxuICAgICAgLy8gb3B0aW9uIGluIHRoZSBET00uXHJcbiAgICAgIHZhciBuZWVkUmVzZXQgPSBlbC5tdWx0aXBsZVxyXG4gICAgICAgID8gYmluZGluZy52YWx1ZS5zb21lKGZ1bmN0aW9uICh2KSB7IHJldHVybiBoYXNOb01hdGNoaW5nT3B0aW9uKHYsIGVsLm9wdGlvbnMpOyB9KVxyXG4gICAgICAgIDogYmluZGluZy52YWx1ZSAhPT0gYmluZGluZy5vbGRWYWx1ZSAmJiBoYXNOb01hdGNoaW5nT3B0aW9uKGJpbmRpbmcudmFsdWUsIGVsLm9wdGlvbnMpO1xyXG4gICAgICBpZiAobmVlZFJlc2V0KSB7XHJcbiAgICAgICAgdHJpZ2dlcihlbCwgJ2NoYW5nZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0U2VsZWN0ZWQgKGVsLCBiaW5kaW5nLCB2bSkge1xyXG4gIHZhciB2YWx1ZSA9IGJpbmRpbmcudmFsdWU7XHJcbiAgdmFyIGlzTXVsdGlwbGUgPSBlbC5tdWx0aXBsZTtcclxuICBpZiAoaXNNdWx0aXBsZSAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXHJcbiAgICAgIFwiPHNlbGVjdCBtdWx0aXBsZSB2LW1vZGVsPVxcXCJcIiArIChiaW5kaW5nLmV4cHJlc3Npb24pICsgXCJcXFwiPiBcIiArXHJcbiAgICAgIFwiZXhwZWN0cyBhbiBBcnJheSB2YWx1ZSBmb3IgaXRzIGJpbmRpbmcsIGJ1dCBnb3QgXCIgKyAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5zbGljZSg4LCAtMSkpLFxyXG4gICAgICB2bVxyXG4gICAgKTtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICB2YXIgc2VsZWN0ZWQsIG9wdGlvbjtcclxuICBmb3IgKHZhciBpID0gMCwgbCA9IGVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICBvcHRpb24gPSBlbC5vcHRpb25zW2ldO1xyXG4gICAgaWYgKGlzTXVsdGlwbGUpIHtcclxuICAgICAgc2VsZWN0ZWQgPSBsb29zZUluZGV4T2YodmFsdWUsIGdldFZhbHVlKG9wdGlvbikpID4gLTE7XHJcbiAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgIT09IHNlbGVjdGVkKSB7XHJcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChsb29zZUVxdWFsKGdldFZhbHVlKG9wdGlvbiksIHZhbHVlKSkge1xyXG4gICAgICAgIGlmIChlbC5zZWxlY3RlZEluZGV4ICE9PSBpKSB7XHJcbiAgICAgICAgICBlbC5zZWxlY3RlZEluZGV4ID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKCFpc011bHRpcGxlKSB7XHJcbiAgICBlbC5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYXNOb01hdGNoaW5nT3B0aW9uICh2YWx1ZSwgb3B0aW9ucykge1xyXG4gIGZvciAodmFyIGkgPSAwLCBsID0gb3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIGlmIChsb29zZUVxdWFsKGdldFZhbHVlKG9wdGlvbnNbaV0pLCB2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFZhbHVlIChvcHRpb24pIHtcclxuICByZXR1cm4gJ192YWx1ZScgaW4gb3B0aW9uXHJcbiAgICA/IG9wdGlvbi5fdmFsdWVcclxuICAgIDogb3B0aW9uLnZhbHVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQ29tcG9zaXRpb25TdGFydCAoZSkge1xyXG4gIGUudGFyZ2V0LmNvbXBvc2luZyA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQ29tcG9zaXRpb25FbmQgKGUpIHtcclxuICBlLnRhcmdldC5jb21wb3NpbmcgPSBmYWxzZTtcclxuICB0cmlnZ2VyKGUudGFyZ2V0LCAnaW5wdXQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdHJpZ2dlciAoZWwsIHR5cGUpIHtcclxuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XHJcbiAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChlKTtcclxufVxyXG5cclxuLyogICovXHJcblxyXG4vLyByZWN1cnNpdmVseSBzZWFyY2ggZm9yIHBvc3NpYmxlIHRyYW5zaXRpb24gZGVmaW5lZCBpbnNpZGUgdGhlIGNvbXBvbmVudCByb290XHJcbmZ1bmN0aW9uIGxvY2F0ZU5vZGUgKHZub2RlKSB7XHJcbiAgcmV0dXJuIHZub2RlLmNoaWxkICYmICghdm5vZGUuZGF0YSB8fCAhdm5vZGUuZGF0YS50cmFuc2l0aW9uKVxyXG4gICAgPyBsb2NhdGVOb2RlKHZub2RlLmNoaWxkLl92bm9kZSlcclxuICAgIDogdm5vZGVcclxufVxyXG5cclxudmFyIHNob3cgPSB7XHJcbiAgYmluZDogZnVuY3Rpb24gYmluZCAoZWwsIHJlZiwgdm5vZGUpIHtcclxuICAgIHZhciB2YWx1ZSA9IHJlZi52YWx1ZTtcclxuXHJcbiAgICB2bm9kZSA9IGxvY2F0ZU5vZGUodm5vZGUpO1xyXG4gICAgdmFyIHRyYW5zaXRpb24gPSB2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEudHJhbnNpdGlvbjtcclxuICAgIGlmICh2YWx1ZSAmJiB0cmFuc2l0aW9uICYmICFpc0lFOSkge1xyXG4gICAgICBlbnRlcih2bm9kZSk7XHJcbiAgICB9XHJcbiAgICB2YXIgb3JpZ2luYWxEaXNwbGF5ID0gZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJycgOiBlbC5zdHlsZS5kaXNwbGF5O1xyXG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gb3JpZ2luYWxEaXNwbGF5IDogJ25vbmUnO1xyXG4gICAgZWwuX192T3JpZ2luYWxEaXNwbGF5ID0gb3JpZ2luYWxEaXNwbGF5O1xyXG4gIH0sXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUgKGVsLCByZWYsIHZub2RlKSB7XHJcbiAgICB2YXIgdmFsdWUgPSByZWYudmFsdWU7XHJcbiAgICB2YXIgb2xkVmFsdWUgPSByZWYub2xkVmFsdWU7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAodmFsdWUgPT09IG9sZFZhbHVlKSB7IHJldHVybiB9XHJcbiAgICB2bm9kZSA9IGxvY2F0ZU5vZGUodm5vZGUpO1xyXG4gICAgdmFyIHRyYW5zaXRpb24gPSB2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEudHJhbnNpdGlvbjtcclxuICAgIGlmICh0cmFuc2l0aW9uICYmICFpc0lFOSkge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICBlbnRlcih2bm9kZSk7XHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IGVsLl9fdk9yaWdpbmFsRGlzcGxheTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZWF2ZSh2bm9kZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gZWwuX192T3JpZ2luYWxEaXNwbGF5IDogJ25vbmUnO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbnZhciBwbGF0Zm9ybURpcmVjdGl2ZXMgPSB7XHJcbiAgbW9kZWw6IG1vZGVsLFxyXG4gIHNob3c6IHNob3dcclxufTtcclxuXHJcbi8qICAqL1xyXG5cclxuLy8gUHJvdmlkZXMgdHJhbnNpdGlvbiBzdXBwb3J0IGZvciBhIHNpbmdsZSBlbGVtZW50L2NvbXBvbmVudC5cclxuLy8gc3VwcG9ydHMgdHJhbnNpdGlvbiBtb2RlIChvdXQtaW4gLyBpbi1vdXQpXHJcblxyXG52YXIgdHJhbnNpdGlvblByb3BzID0ge1xyXG4gIG5hbWU6IFN0cmluZyxcclxuICBhcHBlYXI6IEJvb2xlYW4sXHJcbiAgY3NzOiBCb29sZWFuLFxyXG4gIG1vZGU6IFN0cmluZyxcclxuICB0eXBlOiBTdHJpbmcsXHJcbiAgZW50ZXJDbGFzczogU3RyaW5nLFxyXG4gIGxlYXZlQ2xhc3M6IFN0cmluZyxcclxuICBlbnRlckFjdGl2ZUNsYXNzOiBTdHJpbmcsXHJcbiAgbGVhdmVBY3RpdmVDbGFzczogU3RyaW5nLFxyXG4gIGFwcGVhckNsYXNzOiBTdHJpbmcsXHJcbiAgYXBwZWFyQWN0aXZlQ2xhc3M6IFN0cmluZ1xyXG59O1xyXG5cclxuLy8gaW4gY2FzZSB0aGUgY2hpbGQgaXMgYWxzbyBhbiBhYnN0cmFjdCBjb21wb25lbnQsIGUuZy4gPGtlZXAtYWxpdmU+XHJcbi8vIHdlIHdhbnQgdG8gcmVjdXJzaXZlbHkgcmV0cmlldmUgdGhlIHJlYWwgY29tcG9uZW50IHRvIGJlIHJlbmRlcmVkXHJcbmZ1bmN0aW9uIGdldFJlYWxDaGlsZCAodm5vZGUpIHtcclxuICB2YXIgY29tcE9wdGlvbnMgPSB2bm9kZSAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xyXG4gIGlmIChjb21wT3B0aW9ucyAmJiBjb21wT3B0aW9ucy5DdG9yLm9wdGlvbnMuYWJzdHJhY3QpIHtcclxuICAgIHJldHVybiBnZXRSZWFsQ2hpbGQoZ2V0Rmlyc3RDb21wb25lbnRDaGlsZChjb21wT3B0aW9ucy5jaGlsZHJlbikpXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2bm9kZVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZXh0cmFjdFRyYW5zaXRpb25EYXRhIChjb21wKSB7XHJcbiAgdmFyIGRhdGEgPSB7fTtcclxuICB2YXIgb3B0aW9ucyA9IGNvbXAuJG9wdGlvbnM7XHJcbiAgLy8gcHJvcHNcclxuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucy5wcm9wc0RhdGEpIHtcclxuICAgIGRhdGFba2V5XSA9IGNvbXBba2V5XTtcclxuICB9XHJcbiAgLy8gZXZlbnRzLlxyXG4gIC8vIGV4dHJhY3QgbGlzdGVuZXJzIGFuZCBwYXNzIHRoZW0gZGlyZWN0bHkgdG8gdGhlIHRyYW5zaXRpb24gbWV0aG9kc1xyXG4gIHZhciBsaXN0ZW5lcnMgPSBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XHJcbiAgZm9yICh2YXIga2V5JDEgaW4gbGlzdGVuZXJzKSB7XHJcbiAgICBkYXRhW2NhbWVsaXplKGtleSQxKV0gPSBsaXN0ZW5lcnNba2V5JDFdLmZuO1xyXG4gIH1cclxuICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGFjZWhvbGRlciAoaCwgcmF3Q2hpbGQpIHtcclxuICByZXR1cm4gL1xcZC1rZWVwLWFsaXZlJC8udGVzdChyYXdDaGlsZC50YWcpXHJcbiAgICA/IGgoJ2tlZXAtYWxpdmUnKVxyXG4gICAgOiBudWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc1BhcmVudFRyYW5zaXRpb24gKHZub2RlKSB7XHJcbiAgd2hpbGUgKCh2bm9kZSA9IHZub2RlLnBhcmVudCkpIHtcclxuICAgIGlmICh2bm9kZS5kYXRhLnRyYW5zaXRpb24pIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnZhciBUcmFuc2l0aW9uID0ge1xyXG4gIG5hbWU6ICd0cmFuc2l0aW9uJyxcclxuICBwcm9wczogdHJhbnNpdGlvblByb3BzLFxyXG4gIGFic3RyYWN0OiB0cnVlLFxyXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyIChoKSB7XHJcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLiRzbG90cy5kZWZhdWx0O1xyXG4gICAgaWYgKCFjaGlsZHJlbikge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaWx0ZXIgb3V0IHRleHQgbm9kZXMgKHBvc3NpYmxlIHdoaXRlc3BhY2VzKVxyXG4gICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMudGFnOyB9KTtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKCFjaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2FybiBtdWx0aXBsZSBlbGVtZW50c1xyXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcclxuICAgICAgd2FybihcclxuICAgICAgICAnPHRyYW5zaXRpb24+IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBzaW5nbGUgZWxlbWVudC4gVXNlICcgK1xyXG4gICAgICAgICc8dHJhbnNpdGlvbi1ncm91cD4gZm9yIGxpc3RzLicsXHJcbiAgICAgICAgdGhpcy4kcGFyZW50XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1vZGUgPSB0aGlzLm1vZGU7XHJcblxyXG4gICAgLy8gd2FybiBpbnZhbGlkIG1vZGVcclxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJlxyXG4gICAgICAgIG1vZGUgJiYgbW9kZSAhPT0gJ2luLW91dCcgJiYgbW9kZSAhPT0gJ291dC1pbicpIHtcclxuICAgICAgd2FybihcclxuICAgICAgICAnaW52YWxpZCA8dHJhbnNpdGlvbj4gbW9kZTogJyArIG1vZGUsXHJcbiAgICAgICAgdGhpcy4kcGFyZW50XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJhd0NoaWxkID0gY2hpbGRyZW5bMF07XHJcblxyXG4gICAgLy8gaWYgdGhpcyBpcyBhIGNvbXBvbmVudCByb290IG5vZGUgYW5kIHRoZSBjb21wb25lbnQnc1xyXG4gICAgLy8gcGFyZW50IGNvbnRhaW5lciBub2RlIGFsc28gaGFzIHRyYW5zaXRpb24sIHNraXAuXHJcbiAgICBpZiAoaGFzUGFyZW50VHJhbnNpdGlvbih0aGlzLiR2bm9kZSkpIHtcclxuICAgICAgcmV0dXJuIHJhd0NoaWxkXHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwbHkgdHJhbnNpdGlvbiBkYXRhIHRvIGNoaWxkXHJcbiAgICAvLyB1c2UgZ2V0UmVhbENoaWxkKCkgdG8gaWdub3JlIGFic3RyYWN0IGNvbXBvbmVudHMgZS5nLiBrZWVwLWFsaXZlXHJcbiAgICB2YXIgY2hpbGQgPSBnZXRSZWFsQ2hpbGQocmF3Q2hpbGQpO1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoIWNoaWxkKSB7XHJcbiAgICAgIHJldHVybiByYXdDaGlsZFxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9sZWF2aW5nKSB7XHJcbiAgICAgIHJldHVybiBwbGFjZWhvbGRlcihoLCByYXdDaGlsZClcclxuICAgIH1cclxuXHJcbiAgICB2YXIga2V5ID0gY2hpbGQua2V5ID0gY2hpbGQua2V5ID09IG51bGwgfHwgY2hpbGQuaXNTdGF0aWNcclxuICAgICAgPyAoXCJfX3ZcIiArIChjaGlsZC50YWcgKyB0aGlzLl91aWQpICsgXCJfX1wiKVxyXG4gICAgICA6IGNoaWxkLmtleTtcclxuICAgIHZhciBkYXRhID0gKGNoaWxkLmRhdGEgfHwgKGNoaWxkLmRhdGEgPSB7fSkpLnRyYW5zaXRpb24gPSBleHRyYWN0VHJhbnNpdGlvbkRhdGEodGhpcyk7XHJcbiAgICB2YXIgb2xkUmF3Q2hpbGQgPSB0aGlzLl92bm9kZTtcclxuICAgIHZhciBvbGRDaGlsZCA9IGdldFJlYWxDaGlsZChvbGRSYXdDaGlsZCk7XHJcblxyXG4gICAgLy8gbWFyayB2LXNob3dcclxuICAgIC8vIHNvIHRoYXQgdGhlIHRyYW5zaXRpb24gbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlIGNvbnRyb2wgdG8gdGhlIGRpcmVjdGl2ZVxyXG4gICAgaWYgKGNoaWxkLmRhdGEuZGlyZWN0aXZlcyAmJiBjaGlsZC5kYXRhLmRpcmVjdGl2ZXMuc29tZShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5uYW1lID09PSAnc2hvdyc7IH0pKSB7XHJcbiAgICAgIGNoaWxkLmRhdGEuc2hvdyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9sZENoaWxkICYmIG9sZENoaWxkLmRhdGEgJiYgb2xkQ2hpbGQua2V5ICE9PSBrZXkpIHtcclxuICAgICAgLy8gcmVwbGFjZSBvbGQgY2hpbGQgdHJhbnNpdGlvbiBkYXRhIHdpdGggZnJlc2ggb25lXHJcbiAgICAgIC8vIGltcG9ydGFudCBmb3IgZHluYW1pYyB0cmFuc2l0aW9ucyFcclxuICAgICAgdmFyIG9sZERhdGEgPSBvbGRDaGlsZC5kYXRhLnRyYW5zaXRpb24gPSBleHRlbmQoe30sIGRhdGEpO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIHRyYW5zaXRpb24gbW9kZVxyXG4gICAgICBpZiAobW9kZSA9PT0gJ291dC1pbicpIHtcclxuICAgICAgICAvLyByZXR1cm4gcGxhY2Vob2xkZXIgbm9kZSBhbmQgcXVldWUgdXBkYXRlIHdoZW4gbGVhdmUgZmluaXNoZXNcclxuICAgICAgICB0aGlzLl9sZWF2aW5nID0gdHJ1ZTtcclxuICAgICAgICBtZXJnZVZOb2RlSG9vayhvbGREYXRhLCAnYWZ0ZXJMZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHRoaXMkMS5fbGVhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcyQxLiRmb3JjZVVwZGF0ZSgpO1xyXG4gICAgICAgIH0sIGtleSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyKGgsIHJhd0NoaWxkKVxyXG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdpbi1vdXQnKSB7XHJcbiAgICAgICAgdmFyIGRlbGF5ZWRMZWF2ZTtcclxuICAgICAgICB2YXIgcGVyZm9ybUxlYXZlID0gZnVuY3Rpb24gKCkgeyBkZWxheWVkTGVhdmUoKTsgfTtcclxuICAgICAgICBtZXJnZVZOb2RlSG9vayhkYXRhLCAnYWZ0ZXJFbnRlcicsIHBlcmZvcm1MZWF2ZSwga2V5KTtcclxuICAgICAgICBtZXJnZVZOb2RlSG9vayhkYXRhLCAnZW50ZXJDYW5jZWxsZWQnLCBwZXJmb3JtTGVhdmUsIGtleSk7XHJcbiAgICAgICAgbWVyZ2VWTm9kZUhvb2sob2xkRGF0YSwgJ2RlbGF5TGVhdmUnLCBmdW5jdGlvbiAobGVhdmUpIHtcclxuICAgICAgICAgIGRlbGF5ZWRMZWF2ZSA9IGxlYXZlO1xyXG4gICAgICAgIH0sIGtleSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmF3Q2hpbGRcclxuICB9XHJcbn07XHJcblxyXG4vKiAgKi9cclxuXHJcbi8vIFByb3ZpZGVzIHRyYW5zaXRpb24gc3VwcG9ydCBmb3IgbGlzdCBpdGVtcy5cclxuLy8gc3VwcG9ydHMgbW92ZSB0cmFuc2l0aW9ucyB1c2luZyB0aGUgRkxJUCB0ZWNobmlxdWUuXHJcblxyXG4vLyBCZWNhdXNlIHRoZSB2ZG9tJ3MgY2hpbGRyZW4gdXBkYXRlIGFsZ29yaXRobSBpcyBcInVuc3RhYmxlXCIgLSBpLmUuXHJcbi8vIGl0IGRvZXNuJ3QgZ3VhcmFudGVlIHRoZSByZWxhdGl2ZSBwb3NpdGlvbmluZyBvZiByZW1vdmVkIGVsZW1lbnRzLFxyXG4vLyB3ZSBmb3JjZSB0cmFuc2l0aW9uLWdyb3VwIHRvIHVwZGF0ZSBpdHMgY2hpbGRyZW4gaW50byB0d28gcGFzc2VzOlxyXG4vLyBpbiB0aGUgZmlyc3QgcGFzcywgd2UgcmVtb3ZlIGFsbCBub2RlcyB0aGF0IG5lZWQgdG8gYmUgcmVtb3ZlZCxcclxuLy8gdHJpZ2dlcmluZyB0aGVpciBsZWF2aW5nIHRyYW5zaXRpb247IGluIHRoZSBzZWNvbmQgcGFzcywgd2UgaW5zZXJ0L21vdmVcclxuLy8gaW50byB0aGUgZmluYWwgZGlzaXJlZCBzdGF0ZS4gVGhpcyB3YXkgaW4gdGhlIHNlY29uZCBwYXNzIHJlbW92ZWRcclxuLy8gbm9kZXMgd2lsbCByZW1haW4gd2hlcmUgdGhleSBzaG91bGQgYmUuXHJcblxyXG52YXIgcHJvcHMgPSBleHRlbmQoe1xyXG4gIHRhZzogU3RyaW5nLFxyXG4gIG1vdmVDbGFzczogU3RyaW5nXHJcbn0sIHRyYW5zaXRpb25Qcm9wcyk7XHJcblxyXG5kZWxldGUgcHJvcHMubW9kZTtcclxuXHJcbnZhciBUcmFuc2l0aW9uR3JvdXAgPSB7XHJcbiAgcHJvcHM6IHByb3BzLFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCkge1xyXG4gICAgdmFyIHRhZyA9IHRoaXMudGFnIHx8IHRoaXMuJHZub2RlLmRhdGEudGFnIHx8ICdzcGFuJztcclxuICAgIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMucHJldkNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcclxuICAgIHZhciByYXdDaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQgfHwgW107XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB2YXIgdHJhbnNpdGlvbkRhdGEgPSBleHRyYWN0VHJhbnNpdGlvbkRhdGEodGhpcyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYXdDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgYyA9IHJhd0NoaWxkcmVuW2ldO1xyXG4gICAgICBpZiAoYy50YWcpIHtcclxuICAgICAgICBpZiAoYy5rZXkgIT0gbnVsbCAmJiBTdHJpbmcoYy5rZXkpLmluZGV4T2YoJ19fdmxpc3QnKSAhPT0gMCkge1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChjKTtcclxuICAgICAgICAgIG1hcFtjLmtleV0gPSBjXHJcbiAgICAgICAgICA7KGMuZGF0YSB8fCAoYy5kYXRhID0ge30pKS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBvcHRzID0gYy5jb21wb25lbnRPcHRpb25zO1xyXG4gICAgICAgICAgdmFyIG5hbWUgPSBvcHRzXHJcbiAgICAgICAgICAgID8gKG9wdHMuQ3Rvci5vcHRpb25zLm5hbWUgfHwgb3B0cy50YWcpXHJcbiAgICAgICAgICAgIDogYy50YWc7XHJcbiAgICAgICAgICB3YXJuKChcIjx0cmFuc2l0aW9uLWdyb3VwPiBjaGlsZHJlbiBtdXN0IGJlIGtleWVkOiA8XCIgKyBuYW1lICsgXCI+XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJldkNoaWxkcmVuKSB7XHJcbiAgICAgIHZhciBrZXB0ID0gW107XHJcbiAgICAgIHZhciByZW1vdmVkID0gW107XHJcbiAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IHByZXZDaGlsZHJlbi5sZW5ndGg7IGkkMSsrKSB7XHJcbiAgICAgICAgdmFyIGMkMSA9IHByZXZDaGlsZHJlbltpJDFdO1xyXG4gICAgICAgIGMkMS5kYXRhLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRGF0YTtcclxuICAgICAgICBjJDEuZGF0YS5wb3MgPSBjJDEuZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChtYXBbYyQxLmtleV0pIHtcclxuICAgICAgICAgIGtlcHQucHVzaChjJDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZW1vdmVkLnB1c2goYyQxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5rZXB0ID0gaCh0YWcsIG51bGwsIGtlcHQpO1xyXG4gICAgICB0aGlzLnJlbW92ZWQgPSByZW1vdmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoKHRhZywgbnVsbCwgY2hpbGRyZW4pXHJcbiAgfSxcclxuXHJcbiAgYmVmb3JlVXBkYXRlOiBmdW5jdGlvbiBiZWZvcmVVcGRhdGUgKCkge1xyXG4gICAgLy8gZm9yY2UgcmVtb3ZpbmcgcGFzc1xyXG4gICAgdGhpcy5fX3BhdGNoX18oXHJcbiAgICAgIHRoaXMuX3Zub2RlLFxyXG4gICAgICB0aGlzLmtlcHQsXHJcbiAgICAgIGZhbHNlLCAvLyBoeWRyYXRpbmdcclxuICAgICAgdHJ1ZSAvLyByZW1vdmVPbmx5ICghaW1wb3J0YW50LCBhdm9pZHMgdW5uZWNlc3NhcnkgbW92ZXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5fdm5vZGUgPSB0aGlzLmtlcHQ7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlZDogZnVuY3Rpb24gdXBkYXRlZCAoKSB7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByZXZDaGlsZHJlbjtcclxuICAgIHZhciBtb3ZlQ2xhc3MgPSB0aGlzLm1vdmVDbGFzcyB8fCAoKHRoaXMubmFtZSB8fCAndicpICsgJy1tb3ZlJyk7XHJcbiAgICBpZiAoIWNoaWxkcmVuLmxlbmd0aCB8fCAhdGhpcy5oYXNNb3ZlKGNoaWxkcmVuWzBdLmVsbSwgbW92ZUNsYXNzKSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyB3ZSBkaXZpZGUgdGhlIHdvcmsgaW50byB0aHJlZSBsb29wcyB0byBhdm9pZCBtaXhpbmcgRE9NIHJlYWRzIGFuZCB3cml0ZXNcclxuICAgIC8vIGluIGVhY2ggaXRlcmF0aW9uIC0gd2hpY2ggaGVscHMgcHJldmVudCBsYXlvdXQgdGhyYXNoaW5nLlxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjYWxsUGVuZGluZ0Nicyk7XHJcbiAgICBjaGlsZHJlbi5mb3JFYWNoKHJlY29yZFBvc2l0aW9uKTtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goYXBwbHlUcmFuc2xhdGlvbik7XHJcblxyXG4gICAgLy8gZm9yY2UgcmVmbG93IHRvIHB1dCBldmVyeXRoaW5nIGluIHBvc2l0aW9uXHJcbiAgICB2YXIgZiA9IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xyXG4gICAgICBpZiAoYy5kYXRhLm1vdmVkKSB7XHJcbiAgICAgICAgdmFyIGVsID0gYy5lbG07XHJcbiAgICAgICAgdmFyIHMgPSBlbC5zdHlsZTtcclxuICAgICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIG1vdmVDbGFzcyk7XHJcbiAgICAgICAgcy50cmFuc2Zvcm0gPSBzLldlYmtpdFRyYW5zZm9ybSA9IHMudHJhbnNpdGlvbkR1cmF0aW9uID0gJyc7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kRXZlbnQsIGVsLl9tb3ZlQ2IgPSBmdW5jdGlvbiBjYiAoZSkge1xyXG4gICAgICAgICAgaWYgKCFlIHx8IC90cmFuc2Zvcm0kLy50ZXN0KGUucHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FbmRFdmVudCwgY2IpO1xyXG4gICAgICAgICAgICBlbC5fbW92ZUNiID0gbnVsbDtcclxuICAgICAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBtb3ZlQ2xhc3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICBoYXNNb3ZlOiBmdW5jdGlvbiBoYXNNb3ZlIChlbCwgbW92ZUNsYXNzKSB7XHJcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICBpZiAoIWhhc1RyYW5zaXRpb24pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5faGFzTW92ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc01vdmVcclxuICAgICAgfVxyXG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIG1vdmVDbGFzcyk7XHJcbiAgICAgIHZhciBpbmZvID0gZ2V0VHJhbnNpdGlvbkluZm8oZWwpO1xyXG4gICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIG1vdmVDbGFzcyk7XHJcbiAgICAgIHJldHVybiAodGhpcy5faGFzTW92ZSA9IGluZm8uaGFzVHJhbnNmb3JtKVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGNhbGxQZW5kaW5nQ2JzIChjKSB7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgaWYgKGMuZWxtLl9tb3ZlQ2IpIHtcclxuICAgIGMuZWxtLl9tb3ZlQ2IoKTtcclxuICB9XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgaWYgKGMuZWxtLl9lbnRlckNiKSB7XHJcbiAgICBjLmVsbS5fZW50ZXJDYigpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVjb3JkUG9zaXRpb24gKGMpIHtcclxuICBjLmRhdGEubmV3UG9zID0gYy5lbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VHJhbnNsYXRpb24gKGMpIHtcclxuICB2YXIgb2xkUG9zID0gYy5kYXRhLnBvcztcclxuICB2YXIgbmV3UG9zID0gYy5kYXRhLm5ld1BvcztcclxuICB2YXIgZHggPSBvbGRQb3MubGVmdCAtIG5ld1Bvcy5sZWZ0O1xyXG4gIHZhciBkeSA9IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wO1xyXG4gIGlmIChkeCB8fCBkeSkge1xyXG4gICAgYy5kYXRhLm1vdmVkID0gdHJ1ZTtcclxuICAgIHZhciBzID0gYy5lbG0uc3R5bGU7XHJcbiAgICBzLnRyYW5zZm9ybSA9IHMuV2Via2l0VHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyBkeCArIFwicHgsXCIgKyBkeSArIFwicHgpXCI7XHJcbiAgICBzLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwcyc7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgcGxhdGZvcm1Db21wb25lbnRzID0ge1xyXG4gIFRyYW5zaXRpb246IFRyYW5zaXRpb24sXHJcbiAgVHJhbnNpdGlvbkdyb3VwOiBUcmFuc2l0aW9uR3JvdXBcclxufTtcclxuXHJcbi8qICAqL1xyXG5cclxuLy8gaW5zdGFsbCBwbGF0Zm9ybSBzcGVjaWZpYyB1dGlsc1xyXG5WdWUkMy5jb25maWcuaXNVbmtub3duRWxlbWVudCA9IGlzVW5rbm93bkVsZW1lbnQ7XHJcblZ1ZSQzLmNvbmZpZy5pc1Jlc2VydmVkVGFnID0gaXNSZXNlcnZlZFRhZztcclxuVnVlJDMuY29uZmlnLmdldFRhZ05hbWVzcGFjZSA9IGdldFRhZ05hbWVzcGFjZTtcclxuVnVlJDMuY29uZmlnLm11c3RVc2VQcm9wID0gbXVzdFVzZVByb3A7XHJcblxyXG4vLyBpbnN0YWxsIHBsYXRmb3JtIHJ1bnRpbWUgZGlyZWN0aXZlcyAmIGNvbXBvbmVudHNcclxuZXh0ZW5kKFZ1ZSQzLm9wdGlvbnMuZGlyZWN0aXZlcywgcGxhdGZvcm1EaXJlY3RpdmVzKTtcclxuZXh0ZW5kKFZ1ZSQzLm9wdGlvbnMuY29tcG9uZW50cywgcGxhdGZvcm1Db21wb25lbnRzKTtcclxuXHJcbi8vIGluc3RhbGwgcGxhdGZvcm0gcGF0Y2ggZnVuY3Rpb25cclxuVnVlJDMucHJvdG90eXBlLl9fcGF0Y2hfXyA9IGNvbmZpZy5faXNTZXJ2ZXIgPyBub29wIDogcGF0Y2gkMTtcclxuXHJcbi8vIHdyYXAgbW91bnRcclxuVnVlJDMucHJvdG90eXBlLiRtb3VudCA9IGZ1bmN0aW9uIChcclxuICBlbCxcclxuICBoeWRyYXRpbmdcclxuKSB7XHJcbiAgZWwgPSBlbCAmJiAhY29uZmlnLl9pc1NlcnZlciA/IHF1ZXJ5KGVsKSA6IHVuZGVmaW5lZDtcclxuICByZXR1cm4gdGhpcy5fbW91bnQoZWwsIGh5ZHJhdGluZylcclxufTtcclxuXHJcbi8vIGRldnRvb2xzIGdsb2JhbCBob29rXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gIGlmIChjb25maWcuZGV2dG9vbHMpIHtcclxuICAgIGlmIChkZXZ0b29scykge1xyXG4gICAgICBkZXZ0b29scy5lbWl0KCdpbml0JywgVnVlJDMpO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiZcclxuICAgICAgaW5Ccm93c2VyICYmIC9DaHJvbWVcXC9cXGQrLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICdEb3dubG9hZCB0aGUgVnVlIERldnRvb2xzIGZvciBhIGJldHRlciBkZXZlbG9wbWVudCBleHBlcmllbmNlOlxcbicgK1xyXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlLWRldnRvb2xzJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufSwgMCk7XHJcblxyXG4vKiAgKi9cclxuXHJcbi8vIGNoZWNrIHdoZXRoZXIgY3VycmVudCBicm93c2VyIGVuY29kZXMgYSBjaGFyIGluc2lkZSBhdHRyaWJ1dGUgdmFsdWVzXHJcbmZ1bmN0aW9uIHNob3VsZERlY29kZSAoY29udGVudCwgZW5jb2RlZCkge1xyXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBkaXYuaW5uZXJIVE1MID0gXCI8ZGl2IGE9XFxcIlwiICsgY29udGVudCArIFwiXFxcIj5cIjtcclxuICByZXR1cm4gZGl2LmlubmVySFRNTC5pbmRleE9mKGVuY29kZWQpID4gMFxyXG59XHJcblxyXG4vLyAjMzY2M1xyXG4vLyBJRSBlbmNvZGVzIG5ld2xpbmVzIGluc2lkZSBhdHRyaWJ1dGUgdmFsdWVzIHdoaWxlIG90aGVyIGJyb3dzZXJzIGRvbid0XHJcbnZhciBzaG91bGREZWNvZGVOZXdsaW5lcyA9IGluQnJvd3NlciA/IHNob3VsZERlY29kZSgnXFxuJywgJyYjMTA7JykgOiBmYWxzZTtcclxuXHJcbi8qICAqL1xyXG5cclxudmFyIGRlY29kZXI7XHJcblxyXG5mdW5jdGlvbiBkZWNvZGUgKGh0bWwpIHtcclxuICBkZWNvZGVyID0gZGVjb2RlciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBkZWNvZGVyLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgcmV0dXJuIGRlY29kZXIudGV4dENvbnRlbnRcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vdCB0eXBlLWNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGl0J3MgbW9zdGx5IHZlbmRvciBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIVxyXG4gKiBIVE1MIFBhcnNlciBCeSBKb2huIFJlc2lnIChlam9obi5vcmcpXHJcbiAqIE1vZGlmaWVkIGJ5IEp1cml5IFwia2FuZ2F4XCIgWmF5dHNldlxyXG4gKiBPcmlnaW5hbCBjb2RlIGJ5IEVyaWsgQXJ2aWRzc29uLCBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlXHJcbiAqIGh0dHA6Ly9lcmlrLmVhZS5uZXQvc2ltcGxlaHRtbHBhcnNlci9zaW1wbGVodG1scGFyc2VyLmpzXHJcbiAqL1xyXG5cclxuLy8gUmVndWxhciBFeHByZXNzaW9ucyBmb3IgcGFyc2luZyB0YWdzIGFuZCBhdHRyaWJ1dGVzXHJcbnZhciBzaW5nbGVBdHRySWRlbnRpZmllciA9IC8oW15cXHNcIic8Pi89XSspLztcclxudmFyIHNpbmdsZUF0dHJBc3NpZ24gPSAvKD86PSkvO1xyXG52YXIgc2luZ2xlQXR0clZhbHVlcyA9IFtcclxuICAvLyBhdHRyIHZhbHVlIGRvdWJsZSBxdW90ZXNcclxuICAvXCIoW15cIl0qKVwiKy8uc291cmNlLFxyXG4gIC8vIGF0dHIgdmFsdWUsIHNpbmdsZSBxdW90ZXNcclxuICAvJyhbXiddKiknKy8uc291cmNlLFxyXG4gIC8vIGF0dHIgdmFsdWUsIG5vIHF1b3Rlc1xyXG4gIC8oW15cXHNcIic9PD5gXSspLy5zb3VyY2VcclxuXTtcclxudmFyIGF0dHJpYnV0ZSA9IG5ldyBSZWdFeHAoXHJcbiAgJ15cXFxccyonICsgc2luZ2xlQXR0cklkZW50aWZpZXIuc291cmNlICtcclxuICAnKD86XFxcXHMqKCcgKyBzaW5nbGVBdHRyQXNzaWduLnNvdXJjZSArICcpJyArXHJcbiAgJ1xcXFxzKig/OicgKyBzaW5nbGVBdHRyVmFsdWVzLmpvaW4oJ3wnKSArICcpKT8nXHJcbik7XHJcblxyXG4vLyBjb3VsZCB1c2UgaHR0cHM6Ly93d3cudzMub3JnL1RSLzE5OTkvUkVDLXhtbC1uYW1lcy0xOTk5MDExNC8jTlQtUU5hbWVcclxuLy8gYnV0IGZvciBWdWUgdGVtcGxhdGVzIHdlIGNhbiBlbmZvcmNlIGEgc2ltcGxlIGNoYXJzZXRcclxudmFyIG5jbmFtZSA9ICdbYS16QS1aX11bXFxcXHdcXFxcLVxcXFwuXSonO1xyXG52YXIgcW5hbWVDYXB0dXJlID0gJygoPzonICsgbmNuYW1lICsgJ1xcXFw6KT8nICsgbmNuYW1lICsgJyknO1xyXG52YXIgc3RhcnRUYWdPcGVuID0gbmV3IFJlZ0V4cCgnXjwnICsgcW5hbWVDYXB0dXJlKTtcclxudmFyIHN0YXJ0VGFnQ2xvc2UgPSAvXlxccyooXFwvPyk+LztcclxudmFyIGVuZFRhZyA9IG5ldyBSZWdFeHAoJ148XFxcXC8nICsgcW5hbWVDYXB0dXJlICsgJ1tePl0qPicpO1xyXG52YXIgZG9jdHlwZSA9IC9ePCFET0NUWVBFIFtePl0rPi9pO1xyXG52YXIgY29tbWVudCA9IC9ePCEtLS87XHJcbnZhciBjb25kaXRpb25hbENvbW1lbnQgPSAvXjwhXFxbLztcclxuXHJcbnZhciBJU19SRUdFWF9DQVBUVVJJTkdfQlJPS0VOID0gZmFsc2U7XHJcbid4Jy5yZXBsYWNlKC94KC4pPy9nLCBmdW5jdGlvbiAobSwgZykge1xyXG4gIElTX1JFR0VYX0NBUFRVUklOR19CUk9LRU4gPSBnID09PSAnJztcclxufSk7XHJcblxyXG4vLyBTcGVjaWFsIEVsZW1lbnRzIChjYW4gY29udGFpbiBhbnl0aGluZylcclxudmFyIGlzU2NyaXB0T3JTdHlsZSA9IG1ha2VNYXAoJ3NjcmlwdCxzdHlsZScsIHRydWUpO1xyXG52YXIgaGFzTGFuZyA9IGZ1bmN0aW9uIChhdHRyKSB7IHJldHVybiBhdHRyLm5hbWUgPT09ICdsYW5nJyAmJiBhdHRyLnZhbHVlICE9PSAnaHRtbCc7IH07XHJcbnZhciBpc1NwZWNpYWxUYWcgPSBmdW5jdGlvbiAodGFnLCBpc1NGQywgc3RhY2spIHtcclxuICBpZiAoaXNTY3JpcHRPclN0eWxlKHRhZykpIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIC8vIHRvcC1sZXZlbCB0ZW1wbGF0ZSB0aGF0IGhhcyBhIHByZS1wcm9jZXNzb3JcclxuICBpZiAoXHJcbiAgICBpc1NGQyAmJlxyXG4gICAgdGFnID09PSAndGVtcGxhdGUnICYmXHJcbiAgICBzdGFjay5sZW5ndGggPT09IDEgJiZcclxuICAgIHN0YWNrWzBdLmF0dHJzLnNvbWUoaGFzTGFuZylcclxuICApIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZVxyXG59O1xyXG5cclxudmFyIHJlQ2FjaGUgPSB7fTtcclxuXHJcbnZhciBsdFJFID0gLyZsdDsvZztcclxudmFyIGd0UkUgPSAvJmd0Oy9nO1xyXG52YXIgbmxSRSA9IC8mIzEwOy9nO1xyXG52YXIgYW1wUkUgPSAvJmFtcDsvZztcclxudmFyIHF1b3RlUkUgPSAvJnF1b3Q7L2c7XHJcblxyXG5mdW5jdGlvbiBkZWNvZGVBdHRyICh2YWx1ZSwgc2hvdWxkRGVjb2RlTmV3bGluZXMpIHtcclxuICBpZiAoc2hvdWxkRGVjb2RlTmV3bGluZXMpIHtcclxuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShubFJFLCAnXFxuJyk7XHJcbiAgfVxyXG4gIHJldHVybiB2YWx1ZVxyXG4gICAgLnJlcGxhY2UobHRSRSwgJzwnKVxyXG4gICAgLnJlcGxhY2UoZ3RSRSwgJz4nKVxyXG4gICAgLnJlcGxhY2UoYW1wUkUsICcmJylcclxuICAgIC5yZXBsYWNlKHF1b3RlUkUsICdcIicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlSFRNTCAoaHRtbCwgb3B0aW9ucykge1xyXG4gIHZhciBzdGFjayA9IFtdO1xyXG4gIHZhciBleHBlY3RIVE1MID0gb3B0aW9ucy5leHBlY3RIVE1MO1xyXG4gIHZhciBpc1VuYXJ5VGFnJCQxID0gb3B0aW9ucy5pc1VuYXJ5VGFnIHx8IG5vO1xyXG4gIHZhciBpbmRleCA9IDA7XHJcbiAgdmFyIGxhc3QsIGxhc3RUYWc7XHJcbiAgd2hpbGUgKGh0bWwpIHtcclxuICAgIGxhc3QgPSBodG1sO1xyXG4gICAgLy8gTWFrZSBzdXJlIHdlJ3JlIG5vdCBpbiBhIHNjcmlwdCBvciBzdHlsZSBlbGVtZW50XHJcbiAgICBpZiAoIWxhc3RUYWcgfHwgIWlzU3BlY2lhbFRhZyhsYXN0VGFnLCBvcHRpb25zLnNmYywgc3RhY2spKSB7XHJcbiAgICAgIHZhciB0ZXh0RW5kID0gaHRtbC5pbmRleE9mKCc8Jyk7XHJcbiAgICAgIGlmICh0ZXh0RW5kID09PSAwKSB7XHJcbiAgICAgICAgLy8gQ29tbWVudDpcclxuICAgICAgICBpZiAoY29tbWVudC50ZXN0KGh0bWwpKSB7XHJcbiAgICAgICAgICB2YXIgY29tbWVudEVuZCA9IGh0bWwuaW5kZXhPZignLS0+Jyk7XHJcblxyXG4gICAgICAgICAgaWYgKGNvbW1lbnRFbmQgPj0gMCkge1xyXG4gICAgICAgICAgICBhZHZhbmNlKGNvbW1lbnRFbmQgKyAzKTtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29uZGl0aW9uYWxfY29tbWVudCNEb3dubGV2ZWwtcmV2ZWFsZWRfY29uZGl0aW9uYWxfY29tbWVudFxyXG4gICAgICAgIGlmIChjb25kaXRpb25hbENvbW1lbnQudGVzdChodG1sKSkge1xyXG4gICAgICAgICAgdmFyIGNvbmRpdGlvbmFsRW5kID0gaHRtbC5pbmRleE9mKCddPicpO1xyXG5cclxuICAgICAgICAgIGlmIChjb25kaXRpb25hbEVuZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGFkdmFuY2UoY29uZGl0aW9uYWxFbmQgKyAyKTtcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERvY3R5cGU6XHJcbiAgICAgICAgdmFyIGRvY3R5cGVNYXRjaCA9IGh0bWwubWF0Y2goZG9jdHlwZSk7XHJcbiAgICAgICAgaWYgKGRvY3R5cGVNYXRjaCkge1xyXG4gICAgICAgICAgYWR2YW5jZShkb2N0eXBlTWF0Y2hbMF0ubGVuZ3RoKTtcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbmQgdGFnOlxyXG4gICAgICAgIHZhciBlbmRUYWdNYXRjaCA9IGh0bWwubWF0Y2goZW5kVGFnKTtcclxuICAgICAgICBpZiAoZW5kVGFnTWF0Y2gpIHtcclxuICAgICAgICAgIHZhciBjdXJJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgYWR2YW5jZShlbmRUYWdNYXRjaFswXS5sZW5ndGgpO1xyXG4gICAgICAgICAgcGFyc2VFbmRUYWcoZW5kVGFnTWF0Y2hbMF0sIGVuZFRhZ01hdGNoWzFdLCBjdXJJbmRleCwgaW5kZXgpO1xyXG4gICAgICAgICAgY29udGludWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IHRhZzpcclxuICAgICAgICB2YXIgc3RhcnRUYWdNYXRjaCA9IHBhcnNlU3RhcnRUYWcoKTtcclxuICAgICAgICBpZiAoc3RhcnRUYWdNYXRjaCkge1xyXG4gICAgICAgICAgaGFuZGxlU3RhcnRUYWcoc3RhcnRUYWdNYXRjaCk7XHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHRleHQgPSAodm9pZCAwKSwgcmVzdCQxID0gKHZvaWQgMCksIG5leHQgPSAodm9pZCAwKTtcclxuICAgICAgaWYgKHRleHRFbmQgPiAwKSB7XHJcbiAgICAgICAgcmVzdCQxID0gaHRtbC5zbGljZSh0ZXh0RW5kKTtcclxuICAgICAgICB3aGlsZSAoXHJcbiAgICAgICAgICAhZW5kVGFnLnRlc3QocmVzdCQxKSAmJlxyXG4gICAgICAgICAgIXN0YXJ0VGFnT3Blbi50ZXN0KHJlc3QkMSkgJiZcclxuICAgICAgICAgICFjb21tZW50LnRlc3QocmVzdCQxKSAmJlxyXG4gICAgICAgICAgIWNvbmRpdGlvbmFsQ29tbWVudC50ZXN0KHJlc3QkMSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIDwgaW4gcGxhaW4gdGV4dCwgYmUgZm9yZ2l2aW5nIGFuZCB0cmVhdCBpdCBhcyB0ZXh0XHJcbiAgICAgICAgICBuZXh0ID0gcmVzdCQxLmluZGV4T2YoJzwnLCAxKTtcclxuICAgICAgICAgIGlmIChuZXh0IDwgMCkgeyBicmVhayB9XHJcbiAgICAgICAgICB0ZXh0RW5kICs9IG5leHQ7XHJcbiAgICAgICAgICByZXN0JDEgPSBodG1sLnNsaWNlKHRleHRFbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXh0ID0gaHRtbC5zdWJzdHJpbmcoMCwgdGV4dEVuZCk7XHJcbiAgICAgICAgYWR2YW5jZSh0ZXh0RW5kKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRleHRFbmQgPCAwKSB7XHJcbiAgICAgICAgdGV4dCA9IGh0bWw7XHJcbiAgICAgICAgaHRtbCA9ICcnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5jaGFycyAmJiB0ZXh0KSB7XHJcbiAgICAgICAgb3B0aW9ucy5jaGFycyh0ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHN0YWNrZWRUYWcgPSBsYXN0VGFnLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIHZhciByZVN0YWNrZWRUYWcgPSByZUNhY2hlW3N0YWNrZWRUYWddIHx8IChyZUNhY2hlW3N0YWNrZWRUYWddID0gbmV3IFJlZ0V4cCgnKFtcXFxcc1xcXFxTXSo/KSg8LycgKyBzdGFja2VkVGFnICsgJ1tePl0qPiknLCAnaScpKTtcclxuICAgICAgdmFyIGVuZFRhZ0xlbmd0aCA9IDA7XHJcbiAgICAgIHZhciByZXN0ID0gaHRtbC5yZXBsYWNlKHJlU3RhY2tlZFRhZywgZnVuY3Rpb24gKGFsbCwgdGV4dCwgZW5kVGFnKSB7XHJcbiAgICAgICAgZW5kVGFnTGVuZ3RoID0gZW5kVGFnLmxlbmd0aDtcclxuICAgICAgICBpZiAoc3RhY2tlZFRhZyAhPT0gJ3NjcmlwdCcgJiYgc3RhY2tlZFRhZyAhPT0gJ3N0eWxlJyAmJiBzdGFja2VkVGFnICE9PSAnbm9zY3JpcHQnKSB7XHJcbiAgICAgICAgICB0ZXh0ID0gdGV4dFxyXG4gICAgICAgICAgICAucmVwbGFjZSgvPCEtLShbXFxzXFxTXSo/KS0tPi9nLCAnJDEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvPCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KV1dPi9nLCAnJDEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnMpIHtcclxuICAgICAgICAgIG9wdGlvbnMuY2hhcnModGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJ1xyXG4gICAgICB9KTtcclxuICAgICAgaW5kZXggKz0gaHRtbC5sZW5ndGggLSByZXN0Lmxlbmd0aDtcclxuICAgICAgaHRtbCA9IHJlc3Q7XHJcbiAgICAgIHBhcnNlRW5kVGFnKCc8LycgKyBzdGFja2VkVGFnICsgJz4nLCBzdGFja2VkVGFnLCBpbmRleCAtIGVuZFRhZ0xlbmd0aCwgaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChodG1sID09PSBsYXN0ICYmIG9wdGlvbnMuY2hhcnMpIHtcclxuICAgICAgb3B0aW9ucy5jaGFycyhodG1sKTtcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIENsZWFuIHVwIGFueSByZW1haW5pbmcgdGFnc1xyXG4gIHBhcnNlRW5kVGFnKCk7XHJcblxyXG4gIGZ1bmN0aW9uIGFkdmFuY2UgKG4pIHtcclxuICAgIGluZGV4ICs9IG47XHJcbiAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcobik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwYXJzZVN0YXJ0VGFnICgpIHtcclxuICAgIHZhciBzdGFydCA9IGh0bWwubWF0Y2goc3RhcnRUYWdPcGVuKTtcclxuICAgIGlmIChzdGFydCkge1xyXG4gICAgICB2YXIgbWF0Y2ggPSB7XHJcbiAgICAgICAgdGFnTmFtZTogc3RhcnRbMV0sXHJcbiAgICAgICAgYXR0cnM6IFtdLFxyXG4gICAgICAgIHN0YXJ0OiBpbmRleFxyXG4gICAgICB9O1xyXG4gICAgICBhZHZhbmNlKHN0YXJ0WzBdLmxlbmd0aCk7XHJcbiAgICAgIHZhciBlbmQsIGF0dHI7XHJcbiAgICAgIHdoaWxlICghKGVuZCA9IGh0bWwubWF0Y2goc3RhcnRUYWdDbG9zZSkpICYmIChhdHRyID0gaHRtbC5tYXRjaChhdHRyaWJ1dGUpKSkge1xyXG4gICAgICAgIGFkdmFuY2UoYXR0clswXS5sZW5ndGgpO1xyXG4gICAgICAgIG1hdGNoLmF0dHJzLnB1c2goYXR0cik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVuZCkge1xyXG4gICAgICAgIG1hdGNoLnVuYXJ5U2xhc2ggPSBlbmRbMV07XHJcbiAgICAgICAgYWR2YW5jZShlbmRbMF0ubGVuZ3RoKTtcclxuICAgICAgICBtYXRjaC5lbmQgPSBpbmRleDtcclxuICAgICAgICByZXR1cm4gbWF0Y2hcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlU3RhcnRUYWcgKG1hdGNoKSB7XHJcbiAgICB2YXIgdGFnTmFtZSA9IG1hdGNoLnRhZ05hbWU7XHJcbiAgICB2YXIgdW5hcnlTbGFzaCA9IG1hdGNoLnVuYXJ5U2xhc2g7XHJcblxyXG4gICAgaWYgKGV4cGVjdEhUTUwpIHtcclxuICAgICAgaWYgKGxhc3RUYWcgPT09ICdwJyAmJiBpc05vblBocmFzaW5nVGFnKHRhZ05hbWUpKSB7XHJcbiAgICAgICAgcGFyc2VFbmRUYWcoJycsIGxhc3RUYWcpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYW5CZUxlZnRPcGVuVGFnKHRhZ05hbWUpICYmIGxhc3RUYWcgPT09IHRhZ05hbWUpIHtcclxuICAgICAgICBwYXJzZUVuZFRhZygnJywgdGFnTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgdW5hcnkgPSBpc1VuYXJ5VGFnJCQxKHRhZ05hbWUpIHx8IHRhZ05hbWUgPT09ICdodG1sJyAmJiBsYXN0VGFnID09PSAnaGVhZCcgfHwgISF1bmFyeVNsYXNoO1xyXG5cclxuICAgIHZhciBsID0gbWF0Y2guYXR0cnMubGVuZ3RoO1xyXG4gICAgdmFyIGF0dHJzID0gbmV3IEFycmF5KGwpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgdmFyIGFyZ3MgPSBtYXRjaC5hdHRyc1tpXTtcclxuICAgICAgLy8gaGFja2lzaCB3b3JrIGFyb3VuZCBGRiBidWcgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MzY5Nzc4XHJcbiAgICAgIGlmIChJU19SRUdFWF9DQVBUVVJJTkdfQlJPS0VOICYmIGFyZ3NbMF0uaW5kZXhPZignXCJcIicpID09PSAtMSkge1xyXG4gICAgICAgIGlmIChhcmdzWzNdID09PSAnJykgeyBkZWxldGUgYXJnc1szXTsgfVxyXG4gICAgICAgIGlmIChhcmdzWzRdID09PSAnJykgeyBkZWxldGUgYXJnc1s0XTsgfVxyXG4gICAgICAgIGlmIChhcmdzWzVdID09PSAnJykgeyBkZWxldGUgYXJnc1s1XTsgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciB2YWx1ZSA9IGFyZ3NbM10gfHwgYXJnc1s0XSB8fCBhcmdzWzVdIHx8ICcnO1xyXG4gICAgICBhdHRyc1tpXSA9IHtcclxuICAgICAgICBuYW1lOiBhcmdzWzFdLFxyXG4gICAgICAgIHZhbHVlOiBkZWNvZGVBdHRyKFxyXG4gICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICBvcHRpb25zLnNob3VsZERlY29kZU5ld2xpbmVzXHJcbiAgICAgICAgKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdW5hcnkpIHtcclxuICAgICAgc3RhY2sucHVzaCh7IHRhZzogdGFnTmFtZSwgYXR0cnM6IGF0dHJzIH0pO1xyXG4gICAgICBsYXN0VGFnID0gdGFnTmFtZTtcclxuICAgICAgdW5hcnlTbGFzaCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnN0YXJ0KSB7XHJcbiAgICAgIG9wdGlvbnMuc3RhcnQodGFnTmFtZSwgYXR0cnMsIHVuYXJ5LCBtYXRjaC5zdGFydCwgbWF0Y2guZW5kKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhcnNlRW5kVGFnICh0YWcsIHRhZ05hbWUsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBwb3M7XHJcbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkgeyBzdGFydCA9IGluZGV4OyB9XHJcbiAgICBpZiAoZW5kID09IG51bGwpIHsgZW5kID0gaW5kZXg7IH1cclxuXHJcbiAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IG9wZW5lZCB0YWcgb2YgdGhlIHNhbWUgdHlwZVxyXG4gICAgaWYgKHRhZ05hbWUpIHtcclxuICAgICAgdmFyIG5lZWRsZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgZm9yIChwb3MgPSBzdGFjay5sZW5ndGggLSAxOyBwb3MgPj0gMDsgcG9zLS0pIHtcclxuICAgICAgICBpZiAoc3RhY2tbcG9zXS50YWcudG9Mb3dlckNhc2UoKSA9PT0gbmVlZGxlKSB7XHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gSWYgbm8gdGFnIG5hbWUgaXMgcHJvdmlkZWQsIGNsZWFuIHNob3BcclxuICAgICAgcG9zID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9zID49IDApIHtcclxuICAgICAgLy8gQ2xvc2UgYWxsIHRoZSBvcGVuIGVsZW1lbnRzLCB1cCB0aGUgc3RhY2tcclxuICAgICAgZm9yICh2YXIgaSA9IHN0YWNrLmxlbmd0aCAtIDE7IGkgPj0gcG9zOyBpLS0pIHtcclxuICAgICAgICBpZiAob3B0aW9ucy5lbmQpIHtcclxuICAgICAgICAgIG9wdGlvbnMuZW5kKHN0YWNrW2ldLnRhZywgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgdGhlIG9wZW4gZWxlbWVudHMgZnJvbSB0aGUgc3RhY2tcclxuICAgICAgc3RhY2subGVuZ3RoID0gcG9zO1xyXG4gICAgICBsYXN0VGFnID0gcG9zICYmIHN0YWNrW3BvcyAtIDFdLnRhZztcclxuICAgIH0gZWxzZSBpZiAodGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYnInKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLnN0YXJ0KSB7XHJcbiAgICAgICAgb3B0aW9ucy5zdGFydCh0YWdOYW1lLCBbXSwgdHJ1ZSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncCcpIHtcclxuICAgICAgaWYgKG9wdGlvbnMuc3RhcnQpIHtcclxuICAgICAgICBvcHRpb25zLnN0YXJ0KHRhZ05hbWUsIFtdLCBmYWxzZSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMuZW5kKSB7XHJcbiAgICAgICAgb3B0aW9ucy5lbmQodGFnTmFtZSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gcGFyc2VGaWx0ZXJzIChleHApIHtcclxuICB2YXIgaW5TaW5nbGUgPSBmYWxzZTtcclxuICB2YXIgaW5Eb3VibGUgPSBmYWxzZTtcclxuICB2YXIgY3VybHkgPSAwO1xyXG4gIHZhciBzcXVhcmUgPSAwO1xyXG4gIHZhciBwYXJlbiA9IDA7XHJcbiAgdmFyIGxhc3RGaWx0ZXJJbmRleCA9IDA7XHJcbiAgdmFyIGMsIHByZXYsIGksIGV4cHJlc3Npb24sIGZpbHRlcnM7XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBleHAubGVuZ3RoOyBpKyspIHtcclxuICAgIHByZXYgPSBjO1xyXG4gICAgYyA9IGV4cC5jaGFyQ29kZUF0KGkpO1xyXG4gICAgaWYgKGluU2luZ2xlKSB7XHJcbiAgICAgIC8vIGNoZWNrIHNpbmdsZSBxdW90ZVxyXG4gICAgICBpZiAoYyA9PT0gMHgyNyAmJiBwcmV2ICE9PSAweDVDKSB7IGluU2luZ2xlID0gIWluU2luZ2xlOyB9XHJcbiAgICB9IGVsc2UgaWYgKGluRG91YmxlKSB7XHJcbiAgICAgIC8vIGNoZWNrIGRvdWJsZSBxdW90ZVxyXG4gICAgICBpZiAoYyA9PT0gMHgyMiAmJiBwcmV2ICE9PSAweDVDKSB7IGluRG91YmxlID0gIWluRG91YmxlOyB9XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBjID09PSAweDdDICYmIC8vIHBpcGVcclxuICAgICAgZXhwLmNoYXJDb2RlQXQoaSArIDEpICE9PSAweDdDICYmXHJcbiAgICAgIGV4cC5jaGFyQ29kZUF0KGkgLSAxKSAhPT0gMHg3QyAmJlxyXG4gICAgICAhY3VybHkgJiYgIXNxdWFyZSAmJiAhcGFyZW5cclxuICAgICkge1xyXG4gICAgICBpZiAoZXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gZmlyc3QgZmlsdGVyLCBlbmQgb2YgZXhwcmVzc2lvblxyXG4gICAgICAgIGxhc3RGaWx0ZXJJbmRleCA9IGkgKyAxO1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBleHAuc2xpY2UoMCwgaSkudHJpbSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1c2hGaWx0ZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgY2FzZSAweDIyOiBpbkRvdWJsZSA9IHRydWU7IGJyZWFrIC8vIFwiXHJcbiAgICAgICAgY2FzZSAweDI3OiBpblNpbmdsZSA9IHRydWU7IGJyZWFrIC8vICdcclxuICAgICAgICBjYXNlIDB4Mjg6IHBhcmVuKys7IGJyZWFrICAgICAgICAgLy8gKFxyXG4gICAgICAgIGNhc2UgMHgyOTogcGFyZW4tLTsgYnJlYWsgICAgICAgICAvLyApXHJcbiAgICAgICAgY2FzZSAweDVCOiBzcXVhcmUrKzsgYnJlYWsgICAgICAgIC8vIFtcclxuICAgICAgICBjYXNlIDB4NUQ6IHNxdWFyZS0tOyBicmVhayAgICAgICAgLy8gXVxyXG4gICAgICAgIGNhc2UgMHg3QjogY3VybHkrKzsgYnJlYWsgICAgICAgICAvLyB7XHJcbiAgICAgICAgY2FzZSAweDdEOiBjdXJseS0tOyBicmVhayAgICAgICAgIC8vIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGV4cHJlc3Npb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgZXhwcmVzc2lvbiA9IGV4cC5zbGljZSgwLCBpKS50cmltKCk7XHJcbiAgfSBlbHNlIGlmIChsYXN0RmlsdGVySW5kZXggIT09IDApIHtcclxuICAgIHB1c2hGaWx0ZXIoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1c2hGaWx0ZXIgKCkge1xyXG4gICAgKGZpbHRlcnMgfHwgKGZpbHRlcnMgPSBbXSkpLnB1c2goZXhwLnNsaWNlKGxhc3RGaWx0ZXJJbmRleCwgaSkudHJpbSgpKTtcclxuICAgIGxhc3RGaWx0ZXJJbmRleCA9IGkgKyAxO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZpbHRlcnMpIHtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBmaWx0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGV4cHJlc3Npb24gPSB3cmFwRmlsdGVyKGV4cHJlc3Npb24sIGZpbHRlcnNbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGV4cHJlc3Npb25cclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcEZpbHRlciAoZXhwLCBmaWx0ZXIpIHtcclxuICB2YXIgaSA9IGZpbHRlci5pbmRleE9mKCcoJyk7XHJcbiAgaWYgKGkgPCAwKSB7XHJcbiAgICAvLyBfZjogcmVzb2x2ZUZpbHRlclxyXG4gICAgcmV0dXJuIChcIl9mKFxcXCJcIiArIGZpbHRlciArIFwiXFxcIikoXCIgKyBleHAgKyBcIilcIilcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIG5hbWUgPSBmaWx0ZXIuc2xpY2UoMCwgaSk7XHJcbiAgICB2YXIgYXJncyA9IGZpbHRlci5zbGljZShpICsgMSk7XHJcbiAgICByZXR1cm4gKFwiX2YoXFxcIlwiICsgbmFtZSArIFwiXFxcIikoXCIgKyBleHAgKyBcIixcIiArIGFyZ3MpXHJcbiAgfVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbnZhciBkZWZhdWx0VGFnUkUgPSAvXFx7XFx7KCg/Oi58XFxuKSs/KVxcfVxcfS9nO1xyXG52YXIgcmVnZXhFc2NhcGVSRSA9IC9bLS4qKz9eJHt9KCl8W1xcXS9cXFxcXS9nO1xyXG5cclxudmFyIGJ1aWxkUmVnZXggPSBjYWNoZWQoZnVuY3Rpb24gKGRlbGltaXRlcnMpIHtcclxuICB2YXIgb3BlbiA9IGRlbGltaXRlcnNbMF0ucmVwbGFjZShyZWdleEVzY2FwZVJFLCAnXFxcXCQmJyk7XHJcbiAgdmFyIGNsb3NlID0gZGVsaW1pdGVyc1sxXS5yZXBsYWNlKHJlZ2V4RXNjYXBlUkUsICdcXFxcJCYnKTtcclxuICByZXR1cm4gbmV3IFJlZ0V4cChvcGVuICsgJygoPzoufFxcXFxuKSs/KScgKyBjbG9zZSwgJ2cnKVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHBhcnNlVGV4dCAoXHJcbiAgdGV4dCxcclxuICBkZWxpbWl0ZXJzXHJcbikge1xyXG4gIHZhciB0YWdSRSA9IGRlbGltaXRlcnMgPyBidWlsZFJlZ2V4KGRlbGltaXRlcnMpIDogZGVmYXVsdFRhZ1JFO1xyXG4gIGlmICghdGFnUkUudGVzdCh0ZXh0KSkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIHZhciB0b2tlbnMgPSBbXTtcclxuICB2YXIgbGFzdEluZGV4ID0gdGFnUkUubGFzdEluZGV4ID0gMDtcclxuICB2YXIgbWF0Y2gsIGluZGV4O1xyXG4gIHdoaWxlICgobWF0Y2ggPSB0YWdSRS5leGVjKHRleHQpKSkge1xyXG4gICAgaW5kZXggPSBtYXRjaC5pbmRleDtcclxuICAgIC8vIHB1c2ggdGV4dCB0b2tlblxyXG4gICAgaWYgKGluZGV4ID4gbGFzdEluZGV4KSB7XHJcbiAgICAgIHRva2Vucy5wdXNoKEpTT04uc3RyaW5naWZ5KHRleHQuc2xpY2UobGFzdEluZGV4LCBpbmRleCkpKTtcclxuICAgIH1cclxuICAgIC8vIHRhZyB0b2tlblxyXG4gICAgdmFyIGV4cCA9IHBhcnNlRmlsdGVycyhtYXRjaFsxXS50cmltKCkpO1xyXG4gICAgdG9rZW5zLnB1c2goKFwiX3MoXCIgKyBleHAgKyBcIilcIikpO1xyXG4gICAgbGFzdEluZGV4ID0gaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XHJcbiAgfVxyXG4gIGlmIChsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xyXG4gICAgdG9rZW5zLnB1c2goSlNPTi5zdHJpbmdpZnkodGV4dC5zbGljZShsYXN0SW5kZXgpKSk7XHJcbiAgfVxyXG4gIHJldHVybiB0b2tlbnMuam9pbignKycpXHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gYmFzZVdhcm4gKG1zZykge1xyXG4gIGNvbnNvbGUuZXJyb3IoKFwiW1Z1ZSBwYXJzZXJdOiBcIiArIG1zZykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbHVja01vZHVsZUZ1bmN0aW9uIChcclxuICBtb2R1bGVzLFxyXG4gIGtleVxyXG4pIHtcclxuICByZXR1cm4gbW9kdWxlc1xyXG4gICAgPyBtb2R1bGVzLm1hcChmdW5jdGlvbiAobSkgeyByZXR1cm4gbVtrZXldOyB9KS5maWx0ZXIoZnVuY3Rpb24gKF8pIHsgcmV0dXJuIF87IH0pXHJcbiAgICA6IFtdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFByb3AgKGVsLCBuYW1lLCB2YWx1ZSkge1xyXG4gIChlbC5wcm9wcyB8fCAoZWwucHJvcHMgPSBbXSkpLnB1c2goeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEF0dHIgKGVsLCBuYW1lLCB2YWx1ZSkge1xyXG4gIChlbC5hdHRycyB8fCAoZWwuYXR0cnMgPSBbXSkpLnB1c2goeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZERpcmVjdGl2ZSAoXHJcbiAgZWwsXHJcbiAgbmFtZSxcclxuICByYXdOYW1lLFxyXG4gIHZhbHVlLFxyXG4gIGFyZyxcclxuICBtb2RpZmllcnNcclxuKSB7XHJcbiAgKGVsLmRpcmVjdGl2ZXMgfHwgKGVsLmRpcmVjdGl2ZXMgPSBbXSkpLnB1c2goeyBuYW1lOiBuYW1lLCByYXdOYW1lOiByYXdOYW1lLCB2YWx1ZTogdmFsdWUsIGFyZzogYXJnLCBtb2RpZmllcnM6IG1vZGlmaWVycyB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkSGFuZGxlciAoXHJcbiAgZWwsXHJcbiAgbmFtZSxcclxuICB2YWx1ZSxcclxuICBtb2RpZmllcnMsXHJcbiAgaW1wb3J0YW50XHJcbikge1xyXG4gIC8vIGNoZWNrIGNhcHR1cmUgbW9kaWZpZXJcclxuICBpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5jYXB0dXJlKSB7XHJcbiAgICBkZWxldGUgbW9kaWZpZXJzLmNhcHR1cmU7XHJcbiAgICBuYW1lID0gJyEnICsgbmFtZTsgLy8gbWFyayB0aGUgZXZlbnQgYXMgY2FwdHVyZWRcclxuICB9XHJcbiAgdmFyIGV2ZW50cztcclxuICBpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy5uYXRpdmUpIHtcclxuICAgIGRlbGV0ZSBtb2RpZmllcnMubmF0aXZlO1xyXG4gICAgZXZlbnRzID0gZWwubmF0aXZlRXZlbnRzIHx8IChlbC5uYXRpdmVFdmVudHMgPSB7fSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGV2ZW50cyA9IGVsLmV2ZW50cyB8fCAoZWwuZXZlbnRzID0ge30pO1xyXG4gIH1cclxuICB2YXIgbmV3SGFuZGxlciA9IHsgdmFsdWU6IHZhbHVlLCBtb2RpZmllcnM6IG1vZGlmaWVycyB9O1xyXG4gIHZhciBoYW5kbGVycyA9IGV2ZW50c1tuYW1lXTtcclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICBpZiAoQXJyYXkuaXNBcnJheShoYW5kbGVycykpIHtcclxuICAgIGltcG9ydGFudCA/IGhhbmRsZXJzLnVuc2hpZnQobmV3SGFuZGxlcikgOiBoYW5kbGVycy5wdXNoKG5ld0hhbmRsZXIpO1xyXG4gIH0gZWxzZSBpZiAoaGFuZGxlcnMpIHtcclxuICAgIGV2ZW50c1tuYW1lXSA9IGltcG9ydGFudCA/IFtuZXdIYW5kbGVyLCBoYW5kbGVyc10gOiBbaGFuZGxlcnMsIG5ld0hhbmRsZXJdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBldmVudHNbbmFtZV0gPSBuZXdIYW5kbGVyO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QmluZGluZ0F0dHIgKFxyXG4gIGVsLFxyXG4gIG5hbWUsXHJcbiAgZ2V0U3RhdGljXHJcbikge1xyXG4gIHZhciBkeW5hbWljVmFsdWUgPVxyXG4gICAgZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJzonICsgbmFtZSkgfHxcclxuICAgIGdldEFuZFJlbW92ZUF0dHIoZWwsICd2LWJpbmQ6JyArIG5hbWUpO1xyXG4gIGlmIChkeW5hbWljVmFsdWUgIT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIGR5bmFtaWNWYWx1ZVxyXG4gIH0gZWxzZSBpZiAoZ2V0U3RhdGljICE9PSBmYWxzZSkge1xyXG4gICAgdmFyIHN0YXRpY1ZhbHVlID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgbmFtZSk7XHJcbiAgICBpZiAoc3RhdGljVmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc3RhdGljVmFsdWUpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBbmRSZW1vdmVBdHRyIChlbCwgbmFtZSkge1xyXG4gIHZhciB2YWw7XHJcbiAgaWYgKCh2YWwgPSBlbC5hdHRyc01hcFtuYW1lXSkgIT0gbnVsbCkge1xyXG4gICAgdmFyIGxpc3QgPSBlbC5hdHRyc0xpc3Q7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIGlmIChsaXN0W2ldLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB2YWxcclxufVxyXG5cclxudmFyIGxlbjtcclxudmFyIHN0cjtcclxudmFyIGNocjtcclxudmFyIGluZGV4JDE7XHJcbnZhciBleHByZXNzaW9uUG9zO1xyXG52YXIgZXhwcmVzc2lvbkVuZFBvcztcclxuXHJcbi8qKlxyXG4gKiBwYXJzZSBkaXJlY3RpdmUgbW9kZWwgdG8gZG8gdGhlIGFycmF5IHVwZGF0ZSB0cmFuc2Zvcm0uIGFbaWR4XSA9IHZhbCA9PiAkJGEuc3BsaWNlKCQkaWR4LCAxLCB2YWwpXHJcbiAqXHJcbiAqIGZvciBsb29wIHBvc3NpYmxlIGNhc2VzOlxyXG4gKlxyXG4gKiAtIHRlc3RcclxuICogLSB0ZXN0W2lkeF1cclxuICogLSB0ZXN0W3Rlc3QxW2lkeF1dXHJcbiAqIC0gdGVzdFtcImFcIl1baWR4XVxyXG4gKiAtIHh4eC50ZXN0W2FbYV0udGVzdDFbaWR4XV1cclxuICogLSB0ZXN0Lnh4eC5hW1wiYXNhXCJdW3Rlc3QxW2lkeF1dXHJcbiAqXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcGFyc2VNb2RlbCAodmFsKSB7XHJcbiAgc3RyID0gdmFsO1xyXG4gIGxlbiA9IHN0ci5sZW5ndGg7XHJcbiAgaW5kZXgkMSA9IGV4cHJlc3Npb25Qb3MgPSBleHByZXNzaW9uRW5kUG9zID0gMDtcclxuXHJcbiAgaWYgKHZhbC5pbmRleE9mKCdbJykgPCAwIHx8IHZhbC5sYXN0SW5kZXhPZignXScpIDwgbGVuIC0gMSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXhwOiB2YWwsXHJcbiAgICAgIGlkeDogbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd2hpbGUgKCFlb2YoKSkge1xyXG4gICAgY2hyID0gbmV4dCgpO1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoaXNTdHJpbmdTdGFydChjaHIpKSB7XHJcbiAgICAgIHBhcnNlU3RyaW5nKGNocik7XHJcbiAgICB9IGVsc2UgaWYgKGNociA9PT0gMHg1Qikge1xyXG4gICAgICBwYXJzZUJyYWNrZXQoY2hyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBleHA6IHZhbC5zdWJzdHJpbmcoMCwgZXhwcmVzc2lvblBvcyksXHJcbiAgICBpZHg6IHZhbC5zdWJzdHJpbmcoZXhwcmVzc2lvblBvcyArIDEsIGV4cHJlc3Npb25FbmRQb3MpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBuZXh0ICgpIHtcclxuICByZXR1cm4gc3RyLmNoYXJDb2RlQXQoKytpbmRleCQxKVxyXG59XHJcblxyXG5mdW5jdGlvbiBlb2YgKCkge1xyXG4gIHJldHVybiBpbmRleCQxID49IGxlblxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1N0cmluZ1N0YXJ0IChjaHIpIHtcclxuICByZXR1cm4gY2hyID09PSAweDIyIHx8IGNociA9PT0gMHgyN1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJyYWNrZXQgKGNocikge1xyXG4gIHZhciBpbkJyYWNrZXQgPSAxO1xyXG4gIGV4cHJlc3Npb25Qb3MgPSBpbmRleCQxO1xyXG4gIHdoaWxlICghZW9mKCkpIHtcclxuICAgIGNociA9IG5leHQoKTtcclxuICAgIGlmIChpc1N0cmluZ1N0YXJ0KGNocikpIHtcclxuICAgICAgcGFyc2VTdHJpbmcoY2hyKTtcclxuICAgICAgY29udGludWVcclxuICAgIH1cclxuICAgIGlmIChjaHIgPT09IDB4NUIpIHsgaW5CcmFja2V0Kys7IH1cclxuICAgIGlmIChjaHIgPT09IDB4NUQpIHsgaW5CcmFja2V0LS07IH1cclxuICAgIGlmIChpbkJyYWNrZXQgPT09IDApIHtcclxuICAgICAgZXhwcmVzc2lvbkVuZFBvcyA9IGluZGV4JDE7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVN0cmluZyAoY2hyKSB7XHJcbiAgdmFyIHN0cmluZ1F1b3RlID0gY2hyO1xyXG4gIHdoaWxlICghZW9mKCkpIHtcclxuICAgIGNociA9IG5leHQoKTtcclxuICAgIGlmIChjaHIgPT09IHN0cmluZ1F1b3RlKSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbnZhciBkaXJSRSA9IC9edi18XkB8XjovO1xyXG52YXIgZm9yQWxpYXNSRSA9IC8oLio/KVxccysoPzppbnxvZilcXHMrKC4qKS87XHJcbnZhciBmb3JJdGVyYXRvclJFID0gL1xcKChbXixdKiksKFteLF0qKSg/OiwoW14sXSopKT9cXCkvO1xyXG52YXIgYmluZFJFID0gL146fF52LWJpbmQ6LztcclxudmFyIG9uUkUgPSAvXkB8XnYtb246LztcclxudmFyIGFyZ1JFID0gLzooLiopJC87XHJcbnZhciBtb2RpZmllclJFID0gL1xcLlteLl0rL2c7XHJcbnZhciBzcGVjaWFsTmV3bGluZVJFID0gL1xcdTIwMjh8XFx1MjAyOS9nO1xyXG5cclxudmFyIGRlY29kZUhUTUxDYWNoZWQgPSBjYWNoZWQoZGVjb2RlKTtcclxuXHJcbi8vIGNvbmZpZ3VyYWJsZSBzdGF0ZVxyXG52YXIgd2FybiQxO1xyXG52YXIgcGxhdGZvcm1HZXRUYWdOYW1lc3BhY2U7XHJcbnZhciBwbGF0Zm9ybU11c3RVc2VQcm9wO1xyXG52YXIgcGxhdGZvcm1Jc1ByZVRhZztcclxudmFyIHByZVRyYW5zZm9ybXM7XHJcbnZhciB0cmFuc2Zvcm1zO1xyXG52YXIgcG9zdFRyYW5zZm9ybXM7XHJcbnZhciBkZWxpbWl0ZXJzO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgSFRNTCBzdHJpbmcgdG8gQVNULlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2UgKFxyXG4gIHRlbXBsYXRlLFxyXG4gIG9wdGlvbnNcclxuKSB7XHJcbiAgd2FybiQxID0gb3B0aW9ucy53YXJuIHx8IGJhc2VXYXJuO1xyXG4gIHBsYXRmb3JtR2V0VGFnTmFtZXNwYWNlID0gb3B0aW9ucy5nZXRUYWdOYW1lc3BhY2UgfHwgbm87XHJcbiAgcGxhdGZvcm1NdXN0VXNlUHJvcCA9IG9wdGlvbnMubXVzdFVzZVByb3AgfHwgbm87XHJcbiAgcGxhdGZvcm1Jc1ByZVRhZyA9IG9wdGlvbnMuaXNQcmVUYWcgfHwgbm87XHJcbiAgcHJlVHJhbnNmb3JtcyA9IHBsdWNrTW9kdWxlRnVuY3Rpb24ob3B0aW9ucy5tb2R1bGVzLCAncHJlVHJhbnNmb3JtTm9kZScpO1xyXG4gIHRyYW5zZm9ybXMgPSBwbHVja01vZHVsZUZ1bmN0aW9uKG9wdGlvbnMubW9kdWxlcywgJ3RyYW5zZm9ybU5vZGUnKTtcclxuICBwb3N0VHJhbnNmb3JtcyA9IHBsdWNrTW9kdWxlRnVuY3Rpb24ob3B0aW9ucy5tb2R1bGVzLCAncG9zdFRyYW5zZm9ybU5vZGUnKTtcclxuICBkZWxpbWl0ZXJzID0gb3B0aW9ucy5kZWxpbWl0ZXJzO1xyXG4gIHZhciBzdGFjayA9IFtdO1xyXG4gIHZhciBwcmVzZXJ2ZVdoaXRlc3BhY2UgPSBvcHRpb25zLnByZXNlcnZlV2hpdGVzcGFjZSAhPT0gZmFsc2U7XHJcbiAgdmFyIHJvb3Q7XHJcbiAgdmFyIGN1cnJlbnRQYXJlbnQ7XHJcbiAgdmFyIGluVlByZSA9IGZhbHNlO1xyXG4gIHZhciBpblByZSA9IGZhbHNlO1xyXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcclxuICBwYXJzZUhUTUwodGVtcGxhdGUsIHtcclxuICAgIGV4cGVjdEhUTUw6IG9wdGlvbnMuZXhwZWN0SFRNTCxcclxuICAgIGlzVW5hcnlUYWc6IG9wdGlvbnMuaXNVbmFyeVRhZyxcclxuICAgIHNob3VsZERlY29kZU5ld2xpbmVzOiBvcHRpb25zLnNob3VsZERlY29kZU5ld2xpbmVzLFxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0ICh0YWcsIGF0dHJzLCB1bmFyeSkge1xyXG4gICAgICAvLyBjaGVjayBuYW1lc3BhY2UuXHJcbiAgICAgIC8vIGluaGVyaXQgcGFyZW50IG5zIGlmIHRoZXJlIGlzIG9uZVxyXG4gICAgICB2YXIgbnMgPSAoY3VycmVudFBhcmVudCAmJiBjdXJyZW50UGFyZW50Lm5zKSB8fCBwbGF0Zm9ybUdldFRhZ05hbWVzcGFjZSh0YWcpO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIElFIHN2ZyBidWdcclxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgIGlmIChvcHRpb25zLmlzSUUgJiYgbnMgPT09ICdzdmcnKSB7XHJcbiAgICAgICAgYXR0cnMgPSBndWFyZElFU1ZHQnVnKGF0dHJzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGVsZW1lbnQgPSB7XHJcbiAgICAgICAgdHlwZTogMSxcclxuICAgICAgICB0YWc6IHRhZyxcclxuICAgICAgICBhdHRyc0xpc3Q6IGF0dHJzLFxyXG4gICAgICAgIGF0dHJzTWFwOiBtYWtlQXR0cnNNYXAoYXR0cnMsIG9wdGlvbnMuaXNJRSksXHJcbiAgICAgICAgcGFyZW50OiBjdXJyZW50UGFyZW50LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAobnMpIHtcclxuICAgICAgICBlbGVtZW50Lm5zID0gbnM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcImNsaWVudFwiICE9PSAnc2VydmVyJyAmJiBpc0ZvcmJpZGRlblRhZyhlbGVtZW50KSkge1xyXG4gICAgICAgIGVsZW1lbnQuZm9yYmlkZGVuID0gdHJ1ZTtcclxuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuJDEoXHJcbiAgICAgICAgICAnVGVtcGxhdGVzIHNob3VsZCBvbmx5IGJlIHJlc3BvbnNpYmxlIGZvciBtYXBwaW5nIHRoZSBzdGF0ZSB0byB0aGUgJyArXHJcbiAgICAgICAgICAnVUkuIEF2b2lkIHBsYWNpbmcgdGFncyB3aXRoIHNpZGUtZWZmZWN0cyBpbiB5b3VyIHRlbXBsYXRlcywgc3VjaCBhcyAnICtcclxuICAgICAgICAgIFwiPFwiICsgdGFnICsgXCI+LlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXBwbHkgcHJlLXRyYW5zZm9ybXNcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVUcmFuc2Zvcm1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcHJlVHJhbnNmb3Jtc1tpXShlbGVtZW50LCBvcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFpblZQcmUpIHtcclxuICAgICAgICBwcm9jZXNzUHJlKGVsZW1lbnQpO1xyXG4gICAgICAgIGlmIChlbGVtZW50LnByZSkge1xyXG4gICAgICAgICAgaW5WUHJlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBsYXRmb3JtSXNQcmVUYWcoZWxlbWVudC50YWcpKSB7XHJcbiAgICAgICAgaW5QcmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpblZQcmUpIHtcclxuICAgICAgICBwcm9jZXNzUmF3QXR0cnMoZWxlbWVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvY2Vzc0ZvcihlbGVtZW50KTtcclxuICAgICAgICBwcm9jZXNzSWYoZWxlbWVudCk7XHJcbiAgICAgICAgcHJvY2Vzc09uY2UoZWxlbWVudCk7XHJcbiAgICAgICAgcHJvY2Vzc0tleShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBhIHBsYWluIGVsZW1lbnQgYWZ0ZXJcclxuICAgICAgICAvLyByZW1vdmluZyBzdHJ1Y3R1cmFsIGF0dHJpYnV0ZXNcclxuICAgICAgICBlbGVtZW50LnBsYWluID0gIWVsZW1lbnQua2V5ICYmICFhdHRycy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHByb2Nlc3NSZWYoZWxlbWVudCk7XHJcbiAgICAgICAgcHJvY2Vzc1Nsb3QoZWxlbWVudCk7XHJcbiAgICAgICAgcHJvY2Vzc0NvbXBvbmVudChlbGVtZW50KTtcclxuICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCB0cmFuc2Zvcm1zLmxlbmd0aDsgaSQxKyspIHtcclxuICAgICAgICAgIHRyYW5zZm9ybXNbaSQxXShlbGVtZW50LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvY2Vzc0F0dHJzKGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBjaGVja1Jvb3RDb25zdHJhaW50cyAoZWwpIHtcclxuICAgICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgIXdhcm5lZCkge1xyXG4gICAgICAgICAgaWYgKGVsLnRhZyA9PT0gJ3Nsb3QnIHx8IGVsLnRhZyA9PT0gJ3RlbXBsYXRlJykge1xyXG4gICAgICAgICAgICB3YXJuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB3YXJuJDEoXHJcbiAgICAgICAgICAgICAgXCJDYW5ub3QgdXNlIDxcIiArIChlbC50YWcpICsgXCI+IGFzIGNvbXBvbmVudCByb290IGVsZW1lbnQgYmVjYXVzZSBpdCBtYXkgXCIgK1xyXG4gICAgICAgICAgICAgICdjb250YWluIG11bHRpcGxlIG5vZGVzOlxcbicgKyB0ZW1wbGF0ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGVsLmF0dHJzTWFwLmhhc093blByb3BlcnR5KCd2LWZvcicpKSB7XHJcbiAgICAgICAgICAgIHdhcm5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHdhcm4kMShcclxuICAgICAgICAgICAgICAnQ2Fubm90IHVzZSB2LWZvciBvbiBzdGF0ZWZ1bCBjb21wb25lbnQgcm9vdCBlbGVtZW50IGJlY2F1c2UgJyArXHJcbiAgICAgICAgICAgICAgJ2l0IHJlbmRlcnMgbXVsdGlwbGUgZWxlbWVudHM6XFxuJyArIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0cmVlIG1hbmFnZW1lbnRcclxuICAgICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgcm9vdCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgY2hlY2tSb290Q29uc3RyYWludHMocm9vdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIGFsbG93IDIgcm9vdCBlbGVtZW50cyB3aXRoIHYtaWYgYW5kIHYtZWxzZVxyXG4gICAgICAgIGlmIChyb290LmlmICYmIGVsZW1lbnQuZWxzZSkge1xyXG4gICAgICAgICAgY2hlY2tSb290Q29uc3RyYWludHMoZWxlbWVudCk7XHJcbiAgICAgICAgICByb290LmVsc2VCbG9jayA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiAhd2FybmVkKSB7XHJcbiAgICAgICAgICB3YXJuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgd2FybiQxKFxyXG4gICAgICAgICAgICAoXCJDb21wb25lbnQgdGVtcGxhdGUgc2hvdWxkIGNvbnRhaW4gZXhhY3RseSBvbmUgcm9vdCBlbGVtZW50OlxcblxcblwiICsgdGVtcGxhdGUpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoY3VycmVudFBhcmVudCAmJiAhZWxlbWVudC5mb3JiaWRkZW4pIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5lbHNlKSB7XHJcbiAgICAgICAgICBwcm9jZXNzRWxzZShlbGVtZW50LCBjdXJyZW50UGFyZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY3VycmVudFBhcmVudC5jaGlsZHJlbi5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgZWxlbWVudC5wYXJlbnQgPSBjdXJyZW50UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIXVuYXJ5KSB7XHJcbiAgICAgICAgY3VycmVudFBhcmVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgc3RhY2sucHVzaChlbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgICAvLyBhcHBseSBwb3N0LXRyYW5zZm9ybXNcclxuICAgICAgZm9yICh2YXIgaSQyID0gMDsgaSQyIDwgcG9zdFRyYW5zZm9ybXMubGVuZ3RoOyBpJDIrKykge1xyXG4gICAgICAgIHBvc3RUcmFuc2Zvcm1zW2kkMl0oZWxlbWVudCwgb3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZW5kOiBmdW5jdGlvbiBlbmQgKCkge1xyXG4gICAgICAvLyByZW1vdmUgdHJhaWxpbmcgd2hpdGVzcGFjZVxyXG4gICAgICB2YXIgZWxlbWVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgICB2YXIgbGFzdE5vZGUgPSBlbGVtZW50LmNoaWxkcmVuW2VsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XHJcbiAgICAgIGlmIChsYXN0Tm9kZSAmJiBsYXN0Tm9kZS50eXBlID09PSAzICYmIGxhc3ROb2RlLnRleHQgPT09ICcgJykge1xyXG4gICAgICAgIGVsZW1lbnQuY2hpbGRyZW4ucG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gcG9wIHN0YWNrXHJcbiAgICAgIHN0YWNrLmxlbmd0aCAtPSAxO1xyXG4gICAgICBjdXJyZW50UGFyZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgIC8vIGNoZWNrIHByZSBzdGF0ZVxyXG4gICAgICBpZiAoZWxlbWVudC5wcmUpIHtcclxuICAgICAgICBpblZQcmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocGxhdGZvcm1Jc1ByZVRhZyhlbGVtZW50LnRhZykpIHtcclxuICAgICAgICBpblByZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYXJzOiBmdW5jdGlvbiBjaGFycyAodGV4dCkge1xyXG4gICAgICBpZiAoIWN1cnJlbnRQYXJlbnQpIHtcclxuICAgICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgIXdhcm5lZCAmJiB0ZXh0ID09PSB0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgd2FybmVkID0gdHJ1ZTtcclxuICAgICAgICAgIHdhcm4kMShcclxuICAgICAgICAgICAgJ0NvbXBvbmVudCB0ZW1wbGF0ZSByZXF1aXJlcyBhIHJvb3QgZWxlbWVudCwgcmF0aGVyIHRoYW4ganVzdCB0ZXh0OlxcblxcbicgKyB0ZW1wbGF0ZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgLy8gSUUgdGV4dGFyZWEgcGxhY2Vob2xkZXIgYnVnXHJcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICBpZiAob3B0aW9ucy5pc0lFICYmXHJcbiAgICAgICAgICBjdXJyZW50UGFyZW50LnRhZyA9PT0gJ3RleHRhcmVhJyAmJlxyXG4gICAgICAgICAgY3VycmVudFBhcmVudC5hdHRyc01hcC5wbGFjZWhvbGRlciA9PT0gdGV4dCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRleHQgPSBpblByZSB8fCB0ZXh0LnRyaW0oKVxyXG4gICAgICAgID8gZGVjb2RlSFRNTENhY2hlZCh0ZXh0KVxyXG4gICAgICAgIC8vIG9ubHkgcHJlc2VydmUgd2hpdGVzcGFjZSBpZiBpdHMgbm90IHJpZ2h0IGFmdGVyIGEgc3RhcnRpbmcgdGFnXHJcbiAgICAgICAgOiBwcmVzZXJ2ZVdoaXRlc3BhY2UgJiYgY3VycmVudFBhcmVudC5jaGlsZHJlbi5sZW5ndGggPyAnICcgOiAnJztcclxuICAgICAgaWYgKHRleHQpIHtcclxuICAgICAgICB2YXIgZXhwcmVzc2lvbjtcclxuICAgICAgICBpZiAoIWluVlByZSAmJiB0ZXh0ICE9PSAnICcgJiYgKGV4cHJlc3Npb24gPSBwYXJzZVRleHQodGV4dCwgZGVsaW1pdGVycykpKSB7XHJcbiAgICAgICAgICBjdXJyZW50UGFyZW50LmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlOiAyLFxyXG4gICAgICAgICAgICBleHByZXNzaW9uOiBleHByZXNzaW9uLFxyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gIzM4OTUgc3BlY2lhbCBjaGFyYWN0ZXJcclxuICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2Uoc3BlY2lhbE5ld2xpbmVSRSwgJycpO1xyXG4gICAgICAgICAgY3VycmVudFBhcmVudC5jaGlsZHJlbi5wdXNoKHtcclxuICAgICAgICAgICAgdHlwZTogMyxcclxuICAgICAgICAgICAgdGV4dDogdGV4dFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHJvb3RcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1ByZSAoZWwpIHtcclxuICBpZiAoZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtcHJlJykgIT0gbnVsbCkge1xyXG4gICAgZWwucHJlID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NSYXdBdHRycyAoZWwpIHtcclxuICB2YXIgbCA9IGVsLmF0dHJzTGlzdC5sZW5ndGg7XHJcbiAgaWYgKGwpIHtcclxuICAgIHZhciBhdHRycyA9IGVsLmF0dHJzID0gbmV3IEFycmF5KGwpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgYXR0cnNbaV0gPSB7XHJcbiAgICAgICAgbmFtZTogZWwuYXR0cnNMaXN0W2ldLm5hbWUsXHJcbiAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KGVsLmF0dHJzTGlzdFtpXS52YWx1ZSlcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKCFlbC5wcmUpIHtcclxuICAgIC8vIG5vbiByb290IG5vZGUgaW4gcHJlIGJsb2NrcyB3aXRoIG5vIGF0dHJpYnV0ZXNcclxuICAgIGVsLnBsYWluID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NLZXkgKGVsKSB7XHJcbiAgdmFyIGV4cCA9IGdldEJpbmRpbmdBdHRyKGVsLCAna2V5Jyk7XHJcbiAgaWYgKGV4cCkge1xyXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIGVsLnRhZyA9PT0gJ3RlbXBsYXRlJykge1xyXG4gICAgICB3YXJuJDEoXCI8dGVtcGxhdGU+IGNhbm5vdCBiZSBrZXllZC4gUGxhY2UgdGhlIGtleSBvbiByZWFsIGVsZW1lbnRzIGluc3RlYWQuXCIpO1xyXG4gICAgfVxyXG4gICAgZWwua2V5ID0gZXhwO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1JlZiAoZWwpIHtcclxuICB2YXIgcmVmID0gZ2V0QmluZGluZ0F0dHIoZWwsICdyZWYnKTtcclxuICBpZiAocmVmKSB7XHJcbiAgICBlbC5yZWYgPSByZWY7XHJcbiAgICBlbC5yZWZJbkZvciA9IGNoZWNrSW5Gb3IoZWwpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0ZvciAoZWwpIHtcclxuICB2YXIgZXhwO1xyXG4gIGlmICgoZXhwID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtZm9yJykpKSB7XHJcbiAgICB2YXIgaW5NYXRjaCA9IGV4cC5tYXRjaChmb3JBbGlhc1JFKTtcclxuICAgIGlmICghaW5NYXRjaCkge1xyXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuJDEoXHJcbiAgICAgICAgKFwiSW52YWxpZCB2LWZvciBleHByZXNzaW9uOiBcIiArIGV4cClcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBlbC5mb3IgPSBpbk1hdGNoWzJdLnRyaW0oKTtcclxuICAgIHZhciBhbGlhcyA9IGluTWF0Y2hbMV0udHJpbSgpO1xyXG4gICAgdmFyIGl0ZXJhdG9yTWF0Y2ggPSBhbGlhcy5tYXRjaChmb3JJdGVyYXRvclJFKTtcclxuICAgIGlmIChpdGVyYXRvck1hdGNoKSB7XHJcbiAgICAgIGVsLmFsaWFzID0gaXRlcmF0b3JNYXRjaFsxXS50cmltKCk7XHJcbiAgICAgIGVsLml0ZXJhdG9yMSA9IGl0ZXJhdG9yTWF0Y2hbMl0udHJpbSgpO1xyXG4gICAgICBpZiAoaXRlcmF0b3JNYXRjaFszXSkge1xyXG4gICAgICAgIGVsLml0ZXJhdG9yMiA9IGl0ZXJhdG9yTWF0Y2hbM10udHJpbSgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5hbGlhcyA9IGFsaWFzO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0lmIChlbCkge1xyXG4gIHZhciBleHAgPSBnZXRBbmRSZW1vdmVBdHRyKGVsLCAndi1pZicpO1xyXG4gIGlmIChleHApIHtcclxuICAgIGVsLmlmID0gZXhwO1xyXG4gIH1cclxuICBpZiAoZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtZWxzZScpICE9IG51bGwpIHtcclxuICAgIGVsLmVsc2UgPSB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0Vsc2UgKGVsLCBwYXJlbnQpIHtcclxuICB2YXIgcHJldiA9IGZpbmRQcmV2RWxlbWVudChwYXJlbnQuY2hpbGRyZW4pO1xyXG4gIGlmIChwcmV2ICYmIHByZXYuaWYpIHtcclxuICAgIHByZXYuZWxzZUJsb2NrID0gZWw7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdhcm4kMShcclxuICAgICAgKFwidi1lbHNlIHVzZWQgb24gZWxlbWVudCA8XCIgKyAoZWwudGFnKSArIFwiPiB3aXRob3V0IGNvcnJlc3BvbmRpbmcgdi1pZi5cIilcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzT25jZSAoZWwpIHtcclxuICB2YXIgb25jZSA9IGdldEFuZFJlbW92ZUF0dHIoZWwsICd2LW9uY2UnKTtcclxuICBpZiAob25jZSAhPSBudWxsKSB7XHJcbiAgICBlbC5vbmNlID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NTbG90IChlbCkge1xyXG4gIGlmIChlbC50YWcgPT09ICdzbG90Jykge1xyXG4gICAgZWwuc2xvdE5hbWUgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ25hbWUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIHNsb3RUYXJnZXQgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ3Nsb3QnKTtcclxuICAgIGlmIChzbG90VGFyZ2V0KSB7XHJcbiAgICAgIGVsLnNsb3RUYXJnZXQgPSBzbG90VGFyZ2V0O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0NvbXBvbmVudCAoZWwpIHtcclxuICB2YXIgYmluZGluZztcclxuICBpZiAoKGJpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ2lzJykpKSB7XHJcbiAgICBlbC5jb21wb25lbnQgPSBiaW5kaW5nO1xyXG4gIH1cclxuICBpZiAoZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ2lubGluZS10ZW1wbGF0ZScpICE9IG51bGwpIHtcclxuICAgIGVsLmlubGluZVRlbXBsYXRlID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NBdHRycyAoZWwpIHtcclxuICB2YXIgbGlzdCA9IGVsLmF0dHJzTGlzdDtcclxuICB2YXIgaSwgbCwgbmFtZSwgcmF3TmFtZSwgdmFsdWUsIGFyZywgbW9kaWZpZXJzLCBpc1Byb3A7XHJcbiAgZm9yIChpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICBuYW1lID0gcmF3TmFtZSA9IGxpc3RbaV0ubmFtZTtcclxuICAgIHZhbHVlID0gbGlzdFtpXS52YWx1ZTtcclxuICAgIGlmIChkaXJSRS50ZXN0KG5hbWUpKSB7XHJcbiAgICAgIC8vIG1hcmsgZWxlbWVudCBhcyBkeW5hbWljXHJcbiAgICAgIGVsLmhhc0JpbmRpbmdzID0gdHJ1ZTtcclxuICAgICAgLy8gbW9kaWZpZXJzXHJcbiAgICAgIG1vZGlmaWVycyA9IHBhcnNlTW9kaWZpZXJzKG5hbWUpO1xyXG4gICAgICBpZiAobW9kaWZpZXJzKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZShtb2RpZmllclJFLCAnJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJpbmRSRS50ZXN0KG5hbWUpKSB7IC8vIHYtYmluZFxyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoYmluZFJFLCAnJyk7XHJcbiAgICAgICAgaWYgKG1vZGlmaWVycyAmJiBtb2RpZmllcnMucHJvcCkge1xyXG4gICAgICAgICAgaXNQcm9wID0gdHJ1ZTtcclxuICAgICAgICAgIG5hbWUgPSBjYW1lbGl6ZShuYW1lKTtcclxuICAgICAgICAgIGlmIChuYW1lID09PSAnaW5uZXJIdG1sJykgeyBuYW1lID0gJ2lubmVySFRNTCc7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUHJvcCB8fCBwbGF0Zm9ybU11c3RVc2VQcm9wKGVsLnRhZywgbmFtZSkpIHtcclxuICAgICAgICAgIGFkZFByb3AoZWwsIG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWRkQXR0cihlbCwgbmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChvblJFLnRlc3QobmFtZSkpIHsgLy8gdi1vblxyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2Uob25SRSwgJycpO1xyXG4gICAgICAgIGFkZEhhbmRsZXIoZWwsIG5hbWUsIHZhbHVlLCBtb2RpZmllcnMpO1xyXG4gICAgICB9IGVsc2UgeyAvLyBub3JtYWwgZGlyZWN0aXZlc1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoZGlyUkUsICcnKTtcclxuICAgICAgICAvLyBwYXJzZSBhcmdcclxuICAgICAgICB2YXIgYXJnTWF0Y2ggPSBuYW1lLm1hdGNoKGFyZ1JFKTtcclxuICAgICAgICBpZiAoYXJnTWF0Y2ggJiYgKGFyZyA9IGFyZ01hdGNoWzFdKSkge1xyXG4gICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgLShhcmcubGVuZ3RoICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGREaXJlY3RpdmUoZWwsIG5hbWUsIHJhd05hbWUsIHZhbHVlLCBhcmcsIG1vZGlmaWVycyk7XHJcbiAgICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIG5hbWUgPT09ICdtb2RlbCcpIHtcclxuICAgICAgICAgIGNoZWNrRm9yQWxpYXNNb2RlbChlbCwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbGl0ZXJhbCBhdHRyaWJ1dGVcclxuICAgICAge1xyXG4gICAgICAgIHZhciBleHByZXNzaW9uID0gcGFyc2VUZXh0KHZhbHVlLCBkZWxpbWl0ZXJzKTtcclxuICAgICAgICBpZiAoZXhwcmVzc2lvbikge1xyXG4gICAgICAgICAgd2FybiQxKFxyXG4gICAgICAgICAgICBuYW1lICsgXCI9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCI6IFwiICtcclxuICAgICAgICAgICAgJ0ludGVycG9sYXRpb24gaW5zaWRlIGF0dHJpYnV0ZXMgaGFzIGJlZW4gcmVtb3ZlZC4gJyArXHJcbiAgICAgICAgICAgICdVc2Ugdi1iaW5kIG9yIHRoZSBjb2xvbiBzaG9ydGhhbmQgaW5zdGVhZC4gRm9yIGV4YW1wbGUsICcgK1xyXG4gICAgICAgICAgICAnaW5zdGVhZCBvZiA8ZGl2IGlkPVwie3sgdmFsIH19XCI+LCB1c2UgPGRpdiA6aWQ9XCJ2YWxcIj4uJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgYWRkQXR0cihlbCwgbmFtZSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSW5Gb3IgKGVsKSB7XHJcbiAgdmFyIHBhcmVudCA9IGVsO1xyXG4gIHdoaWxlIChwYXJlbnQpIHtcclxuICAgIGlmIChwYXJlbnQuZm9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZU1vZGlmaWVycyAobmFtZSkge1xyXG4gIHZhciBtYXRjaCA9IG5hbWUubWF0Y2gobW9kaWZpZXJSRSk7XHJcbiAgaWYgKG1hdGNoKSB7XHJcbiAgICB2YXIgcmV0ID0ge307XHJcbiAgICBtYXRjaC5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7IHJldFttLnNsaWNlKDEpXSA9IHRydWU7IH0pO1xyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUF0dHJzTWFwIChhdHRycywgaXNJRSkge1xyXG4gIHZhciBtYXAgPSB7fTtcclxuICBmb3IgKHZhciBpID0gMCwgbCA9IGF0dHJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIG1hcFthdHRyc1tpXS5uYW1lXSAmJiAhaXNJRSkge1xyXG4gICAgICB3YXJuJDEoJ2R1cGxpY2F0ZSBhdHRyaWJ1dGU6ICcgKyBhdHRyc1tpXS5uYW1lKTtcclxuICAgIH1cclxuICAgIG1hcFthdHRyc1tpXS5uYW1lXSA9IGF0dHJzW2ldLnZhbHVlO1xyXG4gIH1cclxuICByZXR1cm4gbWFwXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRQcmV2RWxlbWVudCAoY2hpbGRyZW4pIHtcclxuICB2YXIgaSA9IGNoaWxkcmVuLmxlbmd0aDtcclxuICB3aGlsZSAoaS0tKSB7XHJcbiAgICBpZiAoY2hpbGRyZW5baV0udGFnKSB7IHJldHVybiBjaGlsZHJlbltpXSB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0ZvcmJpZGRlblRhZyAoZWwpIHtcclxuICByZXR1cm4gKFxyXG4gICAgZWwudGFnID09PSAnc3R5bGUnIHx8XHJcbiAgICAoZWwudGFnID09PSAnc2NyaXB0JyAmJiAoXHJcbiAgICAgICFlbC5hdHRyc01hcC50eXBlIHx8XHJcbiAgICAgIGVsLmF0dHJzTWFwLnR5cGUgPT09ICd0ZXh0L2phdmFzY3JpcHQnXHJcbiAgICApKVxyXG4gIClcclxufVxyXG5cclxudmFyIGllTlNCdWcgPSAvXnhtbG5zOk5TXFxkKy87XHJcbnZhciBpZU5TUHJlZml4ID0gL15OU1xcZCs6LztcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmZ1bmN0aW9uIGd1YXJkSUVTVkdCdWcgKGF0dHJzKSB7XHJcbiAgdmFyIHJlcyA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBhdHRyID0gYXR0cnNbaV07XHJcbiAgICBpZiAoIWllTlNCdWcudGVzdChhdHRyLm5hbWUpKSB7XHJcbiAgICAgIGF0dHIubmFtZSA9IGF0dHIubmFtZS5yZXBsYWNlKGllTlNQcmVmaXgsICcnKTtcclxuICAgICAgcmVzLnB1c2goYXR0cik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXNcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tGb3JBbGlhc01vZGVsIChlbCwgdmFsdWUpIHtcclxuICB2YXIgX2VsID0gZWw7XHJcbiAgd2hpbGUgKF9lbCkge1xyXG4gICAgaWYgKF9lbC5mb3IgJiYgX2VsLmFsaWFzID09PSB2YWx1ZSkge1xyXG4gICAgICB3YXJuJDEoXHJcbiAgICAgICAgXCI8XCIgKyAoZWwudGFnKSArIFwiIHYtbW9kZWw9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCI+OiBcIiArXHJcbiAgICAgICAgXCJZb3UgYXJlIGJpbmRpbmcgdi1tb2RlbCBkaXJlY3RseSB0byBhIHYtZm9yIGl0ZXJhdGlvbiBhbGlhcy4gXCIgK1xyXG4gICAgICAgIFwiVGhpcyB3aWxsIG5vdCBiZSBhYmxlIHRvIG1vZGlmeSB0aGUgdi1mb3Igc291cmNlIGFycmF5IGJlY2F1c2UgXCIgK1xyXG4gICAgICAgIFwid3JpdGluZyB0byB0aGUgYWxpYXMgaXMgbGlrZSBtb2RpZnlpbmcgYSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZS4gXCIgK1xyXG4gICAgICAgIFwiQ29uc2lkZXIgdXNpbmcgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhbmQgdXNlIHYtbW9kZWwgb24gYW4gb2JqZWN0IHByb3BlcnR5IGluc3RlYWQuXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIF9lbCA9IF9lbC5wYXJlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbnZhciBpc1N0YXRpY0tleTtcclxudmFyIGlzUGxhdGZvcm1SZXNlcnZlZFRhZztcclxuXHJcbnZhciBnZW5TdGF0aWNLZXlzQ2FjaGVkID0gY2FjaGVkKGdlblN0YXRpY0tleXMkMSk7XHJcblxyXG4vKipcclxuICogR29hbCBvZiB0aGUgb3B0aW1pemVyOiB3YWxrIHRoZSBnZW5lcmF0ZWQgdGVtcGxhdGUgQVNUIHRyZWVcclxuICogYW5kIGRldGVjdCBzdWItdHJlZXMgdGhhdCBhcmUgcHVyZWx5IHN0YXRpYywgaS5lLiBwYXJ0cyBvZlxyXG4gKiB0aGUgRE9NIHRoYXQgbmV2ZXIgbmVlZHMgdG8gY2hhbmdlLlxyXG4gKlxyXG4gKiBPbmNlIHdlIGRldGVjdCB0aGVzZSBzdWItdHJlZXMsIHdlIGNhbjpcclxuICpcclxuICogMS4gSG9pc3QgdGhlbSBpbnRvIGNvbnN0YW50cywgc28gdGhhdCB3ZSBubyBsb25nZXIgbmVlZCB0b1xyXG4gKiAgICBjcmVhdGUgZnJlc2ggbm9kZXMgZm9yIHRoZW0gb24gZWFjaCByZS1yZW5kZXI7XHJcbiAqIDIuIENvbXBsZXRlbHkgc2tpcCB0aGVtIGluIHRoZSBwYXRjaGluZyBwcm9jZXNzLlxyXG4gKi9cclxuZnVuY3Rpb24gb3B0aW1pemUgKHJvb3QsIG9wdGlvbnMpIHtcclxuICBpZiAoIXJvb3QpIHsgcmV0dXJuIH1cclxuICBpc1N0YXRpY0tleSA9IGdlblN0YXRpY0tleXNDYWNoZWQob3B0aW9ucy5zdGF0aWNLZXlzIHx8ICcnKTtcclxuICBpc1BsYXRmb3JtUmVzZXJ2ZWRUYWcgPSBvcHRpb25zLmlzUmVzZXJ2ZWRUYWcgfHwgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9KTtcclxuICAvLyBmaXJzdCBwYXNzOiBtYXJrIGFsbCBub24tc3RhdGljIG5vZGVzLlxyXG4gIG1hcmtTdGF0aWMocm9vdCk7XHJcbiAgLy8gc2Vjb25kIHBhc3M6IG1hcmsgc3RhdGljIHJvb3RzLlxyXG4gIG1hcmtTdGF0aWNSb290cyhyb290LCBmYWxzZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlblN0YXRpY0tleXMkMSAoa2V5cykge1xyXG4gIHJldHVybiBtYWtlTWFwKFxyXG4gICAgJ3R5cGUsdGFnLGF0dHJzTGlzdCxhdHRyc01hcCxwbGFpbixwYXJlbnQsY2hpbGRyZW4sYXR0cnMnICtcclxuICAgIChrZXlzID8gJywnICsga2V5cyA6ICcnKVxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya1N0YXRpYyAobm9kZSkge1xyXG4gIG5vZGUuc3RhdGljID0gaXNTdGF0aWMobm9kZSk7XHJcbiAgaWYgKG5vZGUudHlwZSA9PT0gMSkge1xyXG4gICAgLy8gZG8gbm90IG1ha2UgY29tcG9uZW50IHNsb3QgY29udGVudCBzdGF0aWMuIHRoaXMgYXZvaWRzXHJcbiAgICAvLyAxLiBjb21wb25lbnRzIG5vdCBhYmxlIHRvIG11dGF0ZSBzbG90IG5vZGVzXHJcbiAgICAvLyAyLiBzdGF0aWMgc2xvdCBjb250ZW50IGZhaWxzIGZvciBob3QtcmVsb2FkaW5nXHJcbiAgICBpZiAoXHJcbiAgICAgICFpc1BsYXRmb3JtUmVzZXJ2ZWRUYWcobm9kZS50YWcpICYmXHJcbiAgICAgIG5vZGUudGFnICE9PSAnc2xvdCcgJiZcclxuICAgICAgbm9kZS5hdHRyc01hcFsnaW5saW5lLXRlbXBsYXRlJ10gPT0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICB2YXIgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICBtYXJrU3RhdGljKGNoaWxkKTtcclxuICAgICAgaWYgKCFjaGlsZC5zdGF0aWMpIHtcclxuICAgICAgICBub2RlLnN0YXRpYyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrU3RhdGljUm9vdHMgKG5vZGUsIGlzSW5Gb3IpIHtcclxuICBpZiAobm9kZS50eXBlID09PSAxKSB7XHJcbiAgICBpZiAobm9kZS5zdGF0aWMgfHwgbm9kZS5vbmNlKSB7XHJcbiAgICAgIG5vZGUuc3RhdGljSW5Gb3IgPSBpc0luRm9yO1xyXG4gICAgfVxyXG4gICAgLy8gRm9yIGEgbm9kZSB0byBxdWFsaWZ5IGFzIGEgc3RhdGljIHJvb3QsIGl0IHNob3VsZCBoYXZlIGNoaWxkcmVuIHRoYXRcclxuICAgIC8vIGFyZSBub3QganVzdCBzdGF0aWMgdGV4dC4gT3RoZXJ3aXNlIHRoZSBjb3N0IG9mIGhvaXN0aW5nIG91dCB3aWxsXHJcbiAgICAvLyBvdXR3ZWlnaCB0aGUgYmVuZWZpdHMgYW5kIGl0J3MgYmV0dGVyIG9mZiB0byBqdXN0IGFsd2F5cyByZW5kZXIgaXQgZnJlc2guXHJcbiAgICBpZiAobm9kZS5zdGF0aWMgJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggJiYgIShcclxuICAgICAgbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEgJiZcclxuICAgICAgbm9kZS5jaGlsZHJlblswXS50eXBlID09PSAzXHJcbiAgICApKSB7XHJcbiAgICAgIG5vZGUuc3RhdGljUm9vdCA9IHRydWU7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbm9kZS5zdGF0aWNSb290ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gbm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICBpc0luRm9yID0gaXNJbkZvciB8fCAhIW5vZGUuZm9yO1xyXG4gICAgICAgIG1hcmtTdGF0aWNSb290cyhjaGlsZCwgaXNJbkZvcik7XHJcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IDEgJiYgY2hpbGQuZWxzZUJsb2NrKSB7XHJcbiAgICAgICAgICBtYXJrU3RhdGljUm9vdHMoY2hpbGQuZWxzZUJsb2NrLCBpc0luRm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzU3RhdGljIChub2RlKSB7XHJcbiAgaWYgKG5vZGUudHlwZSA9PT0gMikgeyAvLyBleHByZXNzaW9uXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgaWYgKG5vZGUudHlwZSA9PT0gMykgeyAvLyB0ZXh0XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICByZXR1cm4gISEobm9kZS5wcmUgfHwgKFxyXG4gICAgIW5vZGUuaGFzQmluZGluZ3MgJiYgLy8gbm8gZHluYW1pYyBiaW5kaW5nc1xyXG4gICAgIW5vZGUuaWYgJiYgIW5vZGUuZm9yICYmIC8vIG5vdCB2LWlmIG9yIHYtZm9yIG9yIHYtZWxzZVxyXG4gICAgIWlzQnVpbHRJblRhZyhub2RlLnRhZykgJiYgLy8gbm90IGEgYnVpbHQtaW5cclxuICAgIGlzUGxhdGZvcm1SZXNlcnZlZFRhZyhub2RlLnRhZykgJiYgLy8gbm90IGEgY29tcG9uZW50XHJcbiAgICAhaXNEaXJlY3RDaGlsZE9mVGVtcGxhdGVGb3Iobm9kZSkgJiZcclxuICAgIE9iamVjdC5rZXlzKG5vZGUpLmV2ZXJ5KGlzU3RhdGljS2V5KVxyXG4gICkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRGlyZWN0Q2hpbGRPZlRlbXBsYXRlRm9yIChub2RlKSB7XHJcbiAgd2hpbGUgKG5vZGUucGFyZW50KSB7XHJcbiAgICBub2RlID0gbm9kZS5wYXJlbnQ7XHJcbiAgICBpZiAobm9kZS50YWcgIT09ICd0ZW1wbGF0ZScpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5mb3IpIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxudmFyIHNpbXBsZVBhdGhSRSA9IC9eXFxzKltBLVphLXpfJF1bXFx3JF0qKD86XFwuW0EtWmEtel8kXVtcXHckXSp8XFxbJy4qPyddfFxcW1wiLio/XCJdfFxcW1xcZCtdfFxcW1tBLVphLXpfJF1bXFx3JF0qXSkqXFxzKiQvO1xyXG5cclxuLy8ga2V5Q29kZSBhbGlhc2VzXHJcbnZhciBrZXlDb2RlcyA9IHtcclxuICBlc2M6IDI3LFxyXG4gIHRhYjogOSxcclxuICBlbnRlcjogMTMsXHJcbiAgc3BhY2U6IDMyLFxyXG4gIHVwOiAzOCxcclxuICBsZWZ0OiAzNyxcclxuICByaWdodDogMzksXHJcbiAgZG93bjogNDAsXHJcbiAgJ2RlbGV0ZSc6IFs4LCA0Nl1cclxufTtcclxuXHJcbnZhciBtb2RpZmllckNvZGUgPSB7XHJcbiAgc3RvcDogJyRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsnLFxyXG4gIHByZXZlbnQ6ICckZXZlbnQucHJldmVudERlZmF1bHQoKTsnLFxyXG4gIHNlbGY6ICdpZigkZXZlbnQudGFyZ2V0ICE9PSAkZXZlbnQuY3VycmVudFRhcmdldClyZXR1cm47J1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2VuSGFuZGxlcnMgKGV2ZW50cywgbmF0aXZlKSB7XHJcbiAgdmFyIHJlcyA9IG5hdGl2ZSA/ICduYXRpdmVPbjp7JyA6ICdvbjp7JztcclxuICBmb3IgKHZhciBuYW1lIGluIGV2ZW50cykge1xyXG4gICAgcmVzICs9IFwiXFxcIlwiICsgbmFtZSArIFwiXFxcIjpcIiArIChnZW5IYW5kbGVyKGV2ZW50c1tuYW1lXSkpICsgXCIsXCI7XHJcbiAgfVxyXG4gIHJldHVybiByZXMuc2xpY2UoMCwgLTEpICsgJ30nXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbkhhbmRsZXIgKFxyXG4gIGhhbmRsZXJcclxuKSB7XHJcbiAgaWYgKCFoYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gJ2Z1bmN0aW9uKCl7fSdcclxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGFuZGxlcikpIHtcclxuICAgIHJldHVybiAoXCJbXCIgKyAoaGFuZGxlci5tYXAoZ2VuSGFuZGxlcikuam9pbignLCcpKSArIFwiXVwiKVxyXG4gIH0gZWxzZSBpZiAoIWhhbmRsZXIubW9kaWZpZXJzKSB7XHJcbiAgICByZXR1cm4gc2ltcGxlUGF0aFJFLnRlc3QoaGFuZGxlci52YWx1ZSlcclxuICAgICAgPyBoYW5kbGVyLnZhbHVlXHJcbiAgICAgIDogKFwiZnVuY3Rpb24oJGV2ZW50KXtcIiArIChoYW5kbGVyLnZhbHVlKSArIFwifVwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgY29kZSA9ICcnO1xyXG4gICAgdmFyIGtleXMgPSBbXTtcclxuICAgIGZvciAodmFyIGtleSBpbiBoYW5kbGVyLm1vZGlmaWVycykge1xyXG4gICAgICBpZiAobW9kaWZpZXJDb2RlW2tleV0pIHtcclxuICAgICAgICBjb2RlICs9IG1vZGlmaWVyQ29kZVtrZXldO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5cy5sZW5ndGgpIHtcclxuICAgICAgY29kZSA9IGdlbktleUZpbHRlcihrZXlzKSArIGNvZGU7XHJcbiAgICB9XHJcbiAgICB2YXIgaGFuZGxlckNvZGUgPSBzaW1wbGVQYXRoUkUudGVzdChoYW5kbGVyLnZhbHVlKVxyXG4gICAgICA/IGhhbmRsZXIudmFsdWUgKyAnKCRldmVudCknXHJcbiAgICAgIDogaGFuZGxlci52YWx1ZTtcclxuICAgIHJldHVybiAnZnVuY3Rpb24oJGV2ZW50KXsnICsgY29kZSArIGhhbmRsZXJDb2RlICsgJ30nXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5LZXlGaWx0ZXIgKGtleXMpIHtcclxuICB2YXIgY29kZSA9IGtleXMubGVuZ3RoID09PSAxXHJcbiAgICA/IG5vcm1hbGl6ZUtleUNvZGUoa2V5c1swXSlcclxuICAgIDogQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwga2V5cy5tYXAobm9ybWFsaXplS2V5Q29kZSkpO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGNvZGUpKSB7XHJcbiAgICByZXR1cm4gKFwiaWYoXCIgKyAoY29kZS5tYXAoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIChcIiRldmVudC5rZXlDb2RlIT09XCIgKyBjKTsgfSkuam9pbignJiYnKSkgKyBcIilyZXR1cm47XCIpXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAoXCJpZigkZXZlbnQua2V5Q29kZSE9PVwiICsgY29kZSArIFwiKXJldHVybjtcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUtleUNvZGUgKGtleSkge1xyXG4gIHJldHVybiAoXHJcbiAgICBwYXJzZUludChrZXksIDEwKSB8fCAvLyBudW1iZXIga2V5Q29kZVxyXG4gICAga2V5Q29kZXNba2V5XSB8fCAvLyBidWlsdC1pbiBhbGlhc1xyXG4gICAgKFwiX2soXCIgKyAoSlNPTi5zdHJpbmdpZnkoa2V5KSkgKyBcIilcIikgLy8gY3VzdG9tIGFsaWFzXHJcbiAgKVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbmZ1bmN0aW9uIGJpbmQkMiAoZWwsIGRpcikge1xyXG4gIGVsLndyYXBEYXRhID0gZnVuY3Rpb24gKGNvZGUpIHtcclxuICAgIHJldHVybiAoXCJfYihcIiArIGNvZGUgKyBcIiwnXCIgKyAoZWwudGFnKSArIFwiJyxcIiArIChkaXIudmFsdWUpICsgKGRpci5tb2RpZmllcnMgJiYgZGlyLm1vZGlmaWVycy5wcm9wID8gJyx0cnVlJyA6ICcnKSArIFwiKVwiKVxyXG4gIH07XHJcbn1cclxuXHJcbnZhciBiYXNlRGlyZWN0aXZlcyA9IHtcclxuICBiaW5kOiBiaW5kJDIsXHJcbiAgY2xvYWs6IG5vb3BcclxufTtcclxuXHJcbi8qICAqL1xyXG5cclxuLy8gY29uZmlndXJhYmxlIHN0YXRlXHJcbnZhciB3YXJuJDI7XHJcbnZhciB0cmFuc2Zvcm1zJDE7XHJcbnZhciBkYXRhR2VuRm5zO1xyXG52YXIgcGxhdGZvcm1EaXJlY3RpdmVzJDE7XHJcbnZhciBzdGF0aWNSZW5kZXJGbnM7XHJcbnZhciBvbmNlQ291bnQ7XHJcbnZhciBjdXJyZW50T3B0aW9ucztcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlIChcclxuICBhc3QsXHJcbiAgb3B0aW9uc1xyXG4pIHtcclxuICAvLyBzYXZlIHByZXZpb3VzIHN0YXRpY1JlbmRlckZucyBzbyBnZW5lcmF0ZSBjYWxscyBjYW4gYmUgbmVzdGVkXHJcbiAgdmFyIHByZXZTdGF0aWNSZW5kZXJGbnMgPSBzdGF0aWNSZW5kZXJGbnM7XHJcbiAgdmFyIGN1cnJlbnRTdGF0aWNSZW5kZXJGbnMgPSBzdGF0aWNSZW5kZXJGbnMgPSBbXTtcclxuICB2YXIgcHJldk9uY2VDb3VudCA9IG9uY2VDb3VudDtcclxuICBvbmNlQ291bnQgPSAwO1xyXG4gIGN1cnJlbnRPcHRpb25zID0gb3B0aW9ucztcclxuICB3YXJuJDIgPSBvcHRpb25zLndhcm4gfHwgYmFzZVdhcm47XHJcbiAgdHJhbnNmb3JtcyQxID0gcGx1Y2tNb2R1bGVGdW5jdGlvbihvcHRpb25zLm1vZHVsZXMsICd0cmFuc2Zvcm1Db2RlJyk7XHJcbiAgZGF0YUdlbkZucyA9IHBsdWNrTW9kdWxlRnVuY3Rpb24ob3B0aW9ucy5tb2R1bGVzLCAnZ2VuRGF0YScpO1xyXG4gIHBsYXRmb3JtRGlyZWN0aXZlcyQxID0gb3B0aW9ucy5kaXJlY3RpdmVzIHx8IHt9O1xyXG4gIHZhciBjb2RlID0gYXN0ID8gZ2VuRWxlbWVudChhc3QpIDogJ19oKFwiZGl2XCIpJztcclxuICBzdGF0aWNSZW5kZXJGbnMgPSBwcmV2U3RhdGljUmVuZGVyRm5zO1xyXG4gIG9uY2VDb3VudCA9IHByZXZPbmNlQ291bnQ7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlbmRlcjogKFwid2l0aCh0aGlzKXtyZXR1cm4gXCIgKyBjb2RlICsgXCJ9XCIpLFxyXG4gICAgc3RhdGljUmVuZGVyRm5zOiBjdXJyZW50U3RhdGljUmVuZGVyRm5zXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5FbGVtZW50IChlbCkge1xyXG4gIGlmIChlbC5zdGF0aWNSb290ICYmICFlbC5zdGF0aWNQcm9jZXNzZWQpIHtcclxuICAgIHJldHVybiBnZW5TdGF0aWMoZWwpXHJcbiAgfSBlbHNlIGlmIChlbC5vbmNlICYmICFlbC5vbmNlUHJvY2Vzc2VkKSB7XHJcbiAgICByZXR1cm4gZ2VuT25jZShlbClcclxuICB9IGVsc2UgaWYgKGVsLmZvciAmJiAhZWwuZm9yUHJvY2Vzc2VkKSB7XHJcbiAgICByZXR1cm4gZ2VuRm9yKGVsKVxyXG4gIH0gZWxzZSBpZiAoZWwuaWYgJiYgIWVsLmlmUHJvY2Vzc2VkKSB7XHJcbiAgICByZXR1cm4gZ2VuSWYoZWwpXHJcbiAgfSBlbHNlIGlmIChlbC50YWcgPT09ICd0ZW1wbGF0ZScgJiYgIWVsLnNsb3RUYXJnZXQpIHtcclxuICAgIHJldHVybiBnZW5DaGlsZHJlbihlbCkgfHwgJ3ZvaWQgMCdcclxuICB9IGVsc2UgaWYgKGVsLnRhZyA9PT0gJ3Nsb3QnKSB7XHJcbiAgICByZXR1cm4gZ2VuU2xvdChlbClcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gY29tcG9uZW50IG9yIGVsZW1lbnRcclxuICAgIHZhciBjb2RlO1xyXG4gICAgaWYgKGVsLmNvbXBvbmVudCkge1xyXG4gICAgICBjb2RlID0gZ2VuQ29tcG9uZW50KGVsLmNvbXBvbmVudCwgZWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGRhdGEgPSBlbC5wbGFpbiA/IHVuZGVmaW5lZCA6IGdlbkRhdGEoZWwpO1xyXG5cclxuICAgICAgdmFyIGNoaWxkcmVuID0gZWwuaW5saW5lVGVtcGxhdGUgPyBudWxsIDogZ2VuQ2hpbGRyZW4oZWwpO1xyXG4gICAgICBjb2RlID0gXCJfaCgnXCIgKyAoZWwudGFnKSArIFwiJ1wiICsgKGRhdGEgPyAoXCIsXCIgKyBkYXRhKSA6ICcnKSArIChjaGlsZHJlbiA/IChcIixcIiArIGNoaWxkcmVuKSA6ICcnKSArIFwiKVwiO1xyXG4gICAgfVxyXG4gICAgLy8gbW9kdWxlIHRyYW5zZm9ybXNcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNmb3JtcyQxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvZGUgPSB0cmFuc2Zvcm1zJDFbaV0oZWwsIGNvZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGVcclxuICB9XHJcbn1cclxuXHJcbi8vIGhvaXN0IHN0YXRpYyBzdWItdHJlZXMgb3V0XHJcbmZ1bmN0aW9uIGdlblN0YXRpYyAoZWwpIHtcclxuICBlbC5zdGF0aWNQcm9jZXNzZWQgPSB0cnVlO1xyXG4gIHN0YXRpY1JlbmRlckZucy5wdXNoKChcIndpdGgodGhpcyl7cmV0dXJuIFwiICsgKGdlbkVsZW1lbnQoZWwpKSArIFwifVwiKSk7XHJcbiAgcmV0dXJuIChcIl9tKFwiICsgKHN0YXRpY1JlbmRlckZucy5sZW5ndGggLSAxKSArIChlbC5zdGF0aWNJbkZvciA/ICcsdHJ1ZScgOiAnJykgKyBcIilcIilcclxufVxyXG5cclxuLy8gdi1vbmNlXHJcbmZ1bmN0aW9uIGdlbk9uY2UgKGVsKSB7XHJcbiAgZWwub25jZVByb2Nlc3NlZCA9IHRydWU7XHJcbiAgaWYgKGVsLmlmICYmICFlbC5pZlByb2Nlc3NlZCkge1xyXG4gICAgcmV0dXJuIGdlbklmKGVsKVxyXG4gIH0gZWxzZSBpZiAoZWwuc3RhdGljSW5Gb3IpIHtcclxuICAgIHZhciBrZXkgPSAnJztcclxuICAgIHZhciBwYXJlbnQgPSBlbC5wYXJlbnQ7XHJcbiAgICB3aGlsZSAocGFyZW50KSB7XHJcbiAgICAgIGlmIChwYXJlbnQuZm9yKSB7XHJcbiAgICAgICAga2V5ID0gcGFyZW50LmtleTtcclxuICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuJDIoXHJcbiAgICAgICAgXCJ2LW9uY2UgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgdi1mb3IgdGhhdCBpcyBrZXllZC4gXCJcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIGdlbkVsZW1lbnQoZWwpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFwiX28oXCIgKyAoZ2VuRWxlbWVudChlbCkpICsgXCIsXCIgKyAob25jZUNvdW50KyspICsgKGtleSA/IChcIixcIiArIGtleSkgOiBcIlwiKSArIFwiKVwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZ2VuU3RhdGljKGVsKVxyXG4gIH1cclxufVxyXG5cclxuLy8gdi1pZiB3aXRoIHYtb25jZSBzaHVvbGQgZ2VuZXJhdGUgY29kZSBsaWtlIChhKT9fbSgwKTpfbSgxKVxyXG5mdW5jdGlvbiBnZW5JZiAoZWwpIHtcclxuICB2YXIgZXhwID0gZWwuaWY7XHJcbiAgZWwuaWZQcm9jZXNzZWQgPSB0cnVlOyAvLyBhdm9pZCByZWN1cnNpb25cclxuICByZXR1cm4gKFwiKFwiICsgZXhwICsgXCIpP1wiICsgKGVsLm9uY2UgPyBnZW5PbmNlKGVsKSA6IGdlbkVsZW1lbnQoZWwpKSArIFwiOlwiICsgKGdlbkVsc2UoZWwpKSlcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuRWxzZSAoZWwpIHtcclxuICByZXR1cm4gZWwuZWxzZUJsb2NrXHJcbiAgICA/IGdlbkVsZW1lbnQoZWwuZWxzZUJsb2NrKVxyXG4gICAgOiAnX2UoKSdcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuRm9yIChlbCkge1xyXG4gIHZhciBleHAgPSBlbC5mb3I7XHJcbiAgdmFyIGFsaWFzID0gZWwuYWxpYXM7XHJcbiAgdmFyIGl0ZXJhdG9yMSA9IGVsLml0ZXJhdG9yMSA/IChcIixcIiArIChlbC5pdGVyYXRvcjEpKSA6ICcnO1xyXG4gIHZhciBpdGVyYXRvcjIgPSBlbC5pdGVyYXRvcjIgPyAoXCIsXCIgKyAoZWwuaXRlcmF0b3IyKSkgOiAnJztcclxuICBlbC5mb3JQcm9jZXNzZWQgPSB0cnVlOyAvLyBhdm9pZCByZWN1cnNpb25cclxuICByZXR1cm4gXCJfbCgoXCIgKyBleHAgKyBcIiksXCIgK1xyXG4gICAgXCJmdW5jdGlvbihcIiArIGFsaWFzICsgaXRlcmF0b3IxICsgaXRlcmF0b3IyICsgXCIpe1wiICtcclxuICAgICAgXCJyZXR1cm4gXCIgKyAoZ2VuRWxlbWVudChlbCkpICtcclxuICAgICd9KSdcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuRGF0YSAoZWwpIHtcclxuICB2YXIgZGF0YSA9ICd7JztcclxuXHJcbiAgLy8gZGlyZWN0aXZlcyBmaXJzdC5cclxuICAvLyBkaXJlY3RpdmVzIG1heSBtdXRhdGUgdGhlIGVsJ3Mgb3RoZXIgcHJvcGVydGllcyBiZWZvcmUgdGhleSBhcmUgZ2VuZXJhdGVkLlxyXG4gIHZhciBkaXJzID0gZ2VuRGlyZWN0aXZlcyhlbCk7XHJcbiAgaWYgKGRpcnMpIHsgZGF0YSArPSBkaXJzICsgJywnOyB9XHJcblxyXG4gIC8vIGtleVxyXG4gIGlmIChlbC5rZXkpIHtcclxuICAgIGRhdGEgKz0gXCJrZXk6XCIgKyAoZWwua2V5KSArIFwiLFwiO1xyXG4gIH1cclxuICAvLyByZWZcclxuICBpZiAoZWwucmVmKSB7XHJcbiAgICBkYXRhICs9IFwicmVmOlwiICsgKGVsLnJlZikgKyBcIixcIjtcclxuICB9XHJcbiAgaWYgKGVsLnJlZkluRm9yKSB7XHJcbiAgICBkYXRhICs9IFwicmVmSW5Gb3I6dHJ1ZSxcIjtcclxuICB9XHJcbiAgLy8gcmVjb3JkIG9yaWdpbmFsIHRhZyBuYW1lIGZvciBjb21wb25lbnRzIHVzaW5nIFwiaXNcIiBhdHRyaWJ1dGVcclxuICBpZiAoZWwuY29tcG9uZW50KSB7XHJcbiAgICBkYXRhICs9IFwidGFnOlxcXCJcIiArIChlbC50YWcpICsgXCJcXFwiLFwiO1xyXG4gIH1cclxuICAvLyBzbG90IHRhcmdldFxyXG4gIGlmIChlbC5zbG90VGFyZ2V0KSB7XHJcbiAgICBkYXRhICs9IFwic2xvdDpcIiArIChlbC5zbG90VGFyZ2V0KSArIFwiLFwiO1xyXG4gIH1cclxuICAvLyBtb2R1bGUgZGF0YSBnZW5lcmF0aW9uIGZ1bmN0aW9uc1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUdlbkZucy5sZW5ndGg7IGkrKykge1xyXG4gICAgZGF0YSArPSBkYXRhR2VuRm5zW2ldKGVsKTtcclxuICB9XHJcbiAgLy8gYXR0cmlidXRlc1xyXG4gIGlmIChlbC5hdHRycykge1xyXG4gICAgZGF0YSArPSBcImF0dHJzOntcIiArIChnZW5Qcm9wcyhlbC5hdHRycykpICsgXCJ9LFwiO1xyXG4gIH1cclxuICAvLyBET00gcHJvcHNcclxuICBpZiAoZWwucHJvcHMpIHtcclxuICAgIGRhdGEgKz0gXCJkb21Qcm9wczp7XCIgKyAoZ2VuUHJvcHMoZWwucHJvcHMpKSArIFwifSxcIjtcclxuICB9XHJcbiAgLy8gZXZlbnQgaGFuZGxlcnNcclxuICBpZiAoZWwuZXZlbnRzKSB7XHJcbiAgICBkYXRhICs9IChnZW5IYW5kbGVycyhlbC5ldmVudHMpKSArIFwiLFwiO1xyXG4gIH1cclxuICBpZiAoZWwubmF0aXZlRXZlbnRzKSB7XHJcbiAgICBkYXRhICs9IChnZW5IYW5kbGVycyhlbC5uYXRpdmVFdmVudHMsIHRydWUpKSArIFwiLFwiO1xyXG4gIH1cclxuICAvLyBpbmxpbmUtdGVtcGxhdGVcclxuICBpZiAoZWwuaW5saW5lVGVtcGxhdGUpIHtcclxuICAgIHZhciBhc3QgPSBlbC5jaGlsZHJlblswXTtcclxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiAoXHJcbiAgICAgIGVsLmNoaWxkcmVuLmxlbmd0aCA+IDEgfHwgYXN0LnR5cGUgIT09IDFcclxuICAgICkpIHtcclxuICAgICAgd2FybiQyKCdJbmxpbmUtdGVtcGxhdGUgY29tcG9uZW50cyBtdXN0IGhhdmUgZXhhY3RseSBvbmUgY2hpbGQgZWxlbWVudC4nKTtcclxuICAgIH1cclxuICAgIGlmIChhc3QudHlwZSA9PT0gMSkge1xyXG4gICAgICB2YXIgaW5saW5lUmVuZGVyRm5zID0gZ2VuZXJhdGUoYXN0LCBjdXJyZW50T3B0aW9ucyk7XHJcbiAgICAgIGRhdGEgKz0gXCJpbmxpbmVUZW1wbGF0ZTp7cmVuZGVyOmZ1bmN0aW9uKCl7XCIgKyAoaW5saW5lUmVuZGVyRm5zLnJlbmRlcikgKyBcIn0sc3RhdGljUmVuZGVyRm5zOltcIiArIChpbmxpbmVSZW5kZXJGbnMuc3RhdGljUmVuZGVyRm5zLm1hcChmdW5jdGlvbiAoY29kZSkgeyByZXR1cm4gKFwiZnVuY3Rpb24oKXtcIiArIGNvZGUgKyBcIn1cIik7IH0pLmpvaW4oJywnKSkgKyBcIl19XCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRhdGEgPSBkYXRhLnJlcGxhY2UoLywkLywgJycpICsgJ30nO1xyXG4gIC8vIHYtYmluZCBkYXRhIHdyYXBcclxuICBpZiAoZWwud3JhcERhdGEpIHtcclxuICAgIGRhdGEgPSBlbC53cmFwRGF0YShkYXRhKTtcclxuICB9XHJcbiAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuRGlyZWN0aXZlcyAoZWwpIHtcclxuICB2YXIgZGlycyA9IGVsLmRpcmVjdGl2ZXM7XHJcbiAgaWYgKCFkaXJzKSB7IHJldHVybiB9XHJcbiAgdmFyIHJlcyA9ICdkaXJlY3RpdmVzOlsnO1xyXG4gIHZhciBoYXNSdW50aW1lID0gZmFsc2U7XHJcbiAgdmFyIGksIGwsIGRpciwgbmVlZFJ1bnRpbWU7XHJcbiAgZm9yIChpID0gMCwgbCA9IGRpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICBkaXIgPSBkaXJzW2ldO1xyXG4gICAgbmVlZFJ1bnRpbWUgPSB0cnVlO1xyXG4gICAgdmFyIGdlbiA9IHBsYXRmb3JtRGlyZWN0aXZlcyQxW2Rpci5uYW1lXSB8fCBiYXNlRGlyZWN0aXZlc1tkaXIubmFtZV07XHJcbiAgICBpZiAoZ2VuKSB7XHJcbiAgICAgIC8vIGNvbXBpbGUtdGltZSBkaXJlY3RpdmUgdGhhdCBtYW5pcHVsYXRlcyBBU1QuXHJcbiAgICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBpdCBhbHNvIG5lZWRzIGEgcnVudGltZSBjb3VudGVycGFydC5cclxuICAgICAgbmVlZFJ1bnRpbWUgPSAhIWdlbihlbCwgZGlyLCB3YXJuJDIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG5lZWRSdW50aW1lKSB7XHJcbiAgICAgIGhhc1J1bnRpbWUgPSB0cnVlO1xyXG4gICAgICByZXMgKz0gXCJ7bmFtZTpcXFwiXCIgKyAoZGlyLm5hbWUpICsgXCJcXFwiLHJhd05hbWU6XFxcIlwiICsgKGRpci5yYXdOYW1lKSArIFwiXFxcIlwiICsgKGRpci52YWx1ZSA/IChcIix2YWx1ZTooXCIgKyAoZGlyLnZhbHVlKSArIFwiKSxleHByZXNzaW9uOlwiICsgKEpTT04uc3RyaW5naWZ5KGRpci52YWx1ZSkpKSA6ICcnKSArIChkaXIuYXJnID8gKFwiLGFyZzpcXFwiXCIgKyAoZGlyLmFyZykgKyBcIlxcXCJcIikgOiAnJykgKyAoZGlyLm1vZGlmaWVycyA/IChcIixtb2RpZmllcnM6XCIgKyAoSlNPTi5zdHJpbmdpZnkoZGlyLm1vZGlmaWVycykpKSA6ICcnKSArIFwifSxcIjtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGhhc1J1bnRpbWUpIHtcclxuICAgIHJldHVybiByZXMuc2xpY2UoMCwgLTEpICsgJ10nXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5DaGlsZHJlbiAoZWwpIHtcclxuICBpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gJ1snICsgZWwuY2hpbGRyZW4ubWFwKGdlbk5vZGUpLmpvaW4oJywnKSArICddJ1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuTm9kZSAobm9kZSkge1xyXG4gIGlmIChub2RlLnR5cGUgPT09IDEpIHtcclxuICAgIHJldHVybiBnZW5FbGVtZW50KG5vZGUpXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBnZW5UZXh0KG5vZGUpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5UZXh0ICh0ZXh0KSB7XHJcbiAgcmV0dXJuIHRleHQudHlwZSA9PT0gMlxyXG4gICAgPyB0ZXh0LmV4cHJlc3Npb24gLy8gbm8gbmVlZCBmb3IgKCkgYmVjYXVzZSBhbHJlYWR5IHdyYXBwZWQgaW4gX3MoKVxyXG4gICAgOiBKU09OLnN0cmluZ2lmeSh0ZXh0LnRleHQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlblNsb3QgKGVsKSB7XHJcbiAgdmFyIHNsb3ROYW1lID0gZWwuc2xvdE5hbWUgfHwgJ1wiZGVmYXVsdFwiJztcclxuICB2YXIgY2hpbGRyZW4gPSBnZW5DaGlsZHJlbihlbCk7XHJcbiAgcmV0dXJuIChcIl90KFwiICsgc2xvdE5hbWUgKyAoY2hpbGRyZW4gPyAoXCIsXCIgKyBjaGlsZHJlbikgOiAnJykgKyBcIilcIilcclxufVxyXG5cclxuLy8gY29tcG9uZW50TmFtZSBpcyBlbC5jb21wb25lbnQsIHRha2UgaXQgYXMgYXJndW1lbnQgdG8gc2h1biBmbG93J3MgcGVzc2ltaXN0aWMgcmVmaW5lbWVudFxyXG5mdW5jdGlvbiBnZW5Db21wb25lbnQgKGNvbXBvbmVudE5hbWUsIGVsKSB7XHJcbiAgdmFyIGNoaWxkcmVuID0gZWwuaW5saW5lVGVtcGxhdGUgPyBudWxsIDogZ2VuQ2hpbGRyZW4oZWwpO1xyXG4gIHJldHVybiAoXCJfaChcIiArIGNvbXBvbmVudE5hbWUgKyBcIixcIiArIChnZW5EYXRhKGVsKSkgKyAoY2hpbGRyZW4gPyAoXCIsXCIgKyBjaGlsZHJlbikgOiAnJykgKyBcIilcIilcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuUHJvcHMgKHByb3BzKSB7XHJcbiAgdmFyIHJlcyA9ICcnO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBwcm9wID0gcHJvcHNbaV07XHJcbiAgICByZXMgKz0gXCJcXFwiXCIgKyAocHJvcC5uYW1lKSArIFwiXFxcIjpcIiArIChwcm9wLnZhbHVlKSArIFwiLFwiO1xyXG4gIH1cclxuICByZXR1cm4gcmVzLnNsaWNlKDAsIC0xKVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbi8qKlxyXG4gKiBDb21waWxlIGEgdGVtcGxhdGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21waWxlJDEgKFxyXG4gIHRlbXBsYXRlLFxyXG4gIG9wdGlvbnNcclxuKSB7XHJcbiAgdmFyIGFzdCA9IHBhcnNlKHRlbXBsYXRlLnRyaW0oKSwgb3B0aW9ucyk7XHJcbiAgb3B0aW1pemUoYXN0LCBvcHRpb25zKTtcclxuICB2YXIgY29kZSA9IGdlbmVyYXRlKGFzdCwgb3B0aW9ucyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGFzdDogYXN0LFxyXG4gICAgcmVuZGVyOiBjb2RlLnJlbmRlcixcclxuICAgIHN0YXRpY1JlbmRlckZuczogY29kZS5zdGF0aWNSZW5kZXJGbnNcclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuLy8gb3BlcmF0b3JzIGxpa2UgdHlwZW9mLCBpbnN0YW5jZW9mIGFuZCBpbiBhcmUgYWxsb3dlZFxyXG52YXIgcHJvaGliaXRlZEtleXdvcmRSRSA9IG5ldyBSZWdFeHAoJ1xcXFxiJyArIChcclxuICAnZG8saWYsZm9yLGxldCxuZXcsdHJ5LHZhcixjYXNlLGVsc2Usd2l0aCxhd2FpdCxicmVhayxjYXRjaCxjbGFzcyxjb25zdCwnICtcclxuICAnc3VwZXIsdGhyb3csd2hpbGUseWllbGQsZGVsZXRlLGV4cG9ydCxpbXBvcnQscmV0dXJuLHN3aXRjaCxkZWZhdWx0LCcgK1xyXG4gICdleHRlbmRzLGZpbmFsbHksY29udGludWUsZGVidWdnZXIsZnVuY3Rpb24sYXJndW1lbnRzJ1xyXG4pLnNwbGl0KCcsJykuam9pbignXFxcXGJ8XFxcXGInKSArICdcXFxcYicpO1xyXG4vLyBjaGVjayB2YWxpZCBpZGVudGlmaWVyIGZvciB2LWZvclxyXG52YXIgaWRlbnRSRSA9IC9bQS1aYS16XyRdW1xcdyRdKi87XHJcbi8vIHN0cmlwIHN0cmluZ3MgaW4gZXhwcmVzc2lvbnNcclxudmFyIHN0cmlwU3RyaW5nUkUgPSAvJyg/OlteJ1xcXFxdfFxcXFwuKSonfFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInxgKD86W15gXFxcXF18XFxcXC4pKlxcJFxce3xcXH0oPzpbXmBcXFxcXXxcXFxcLikqYHxgKD86W15gXFxcXF18XFxcXC4pKmAvZztcclxuXHJcbi8vIGRldGVjdCBwcm9ibGVtYXRpYyBleHByZXNzaW9ucyBpbiBhIHRlbXBsYXRlXHJcbmZ1bmN0aW9uIGRldGVjdEVycm9ycyAoYXN0KSB7XHJcbiAgdmFyIGVycm9ycyA9IFtdO1xyXG4gIGlmIChhc3QpIHtcclxuICAgIGNoZWNrTm9kZShhc3QsIGVycm9ycyk7XHJcbiAgfVxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tOb2RlIChub2RlLCBlcnJvcnMpIHtcclxuICBpZiAobm9kZS50eXBlID09PSAxKSB7XHJcbiAgICBmb3IgKHZhciBuYW1lIGluIG5vZGUuYXR0cnNNYXApIHtcclxuICAgICAgaWYgKGRpclJFLnRlc3QobmFtZSkpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBub2RlLmF0dHJzTWFwW25hbWVdO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKG5hbWUgPT09ICd2LWZvcicpIHtcclxuICAgICAgICAgICAgY2hlY2tGb3Iobm9kZSwgKFwidi1mb3I9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIiksIGVycm9ycyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGVja0V4cHJlc3Npb24odmFsdWUsIChuYW1lICsgXCI9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIiksIGVycm9ycyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaGVja05vZGUobm9kZS5jaGlsZHJlbltpXSwgZXJyb3JzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAyKSB7XHJcbiAgICBjaGVja0V4cHJlc3Npb24obm9kZS5leHByZXNzaW9uLCBub2RlLnRleHQsIGVycm9ycyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0ZvciAobm9kZSwgdGV4dCwgZXJyb3JzKSB7XHJcbiAgY2hlY2tFeHByZXNzaW9uKG5vZGUuZm9yIHx8ICcnLCB0ZXh0LCBlcnJvcnMpO1xyXG4gIGNoZWNrSWRlbnRpZmllcihub2RlLmFsaWFzLCAndi1mb3IgYWxpYXMnLCB0ZXh0LCBlcnJvcnMpO1xyXG4gIGNoZWNrSWRlbnRpZmllcihub2RlLml0ZXJhdG9yMSwgJ3YtZm9yIGl0ZXJhdG9yJywgdGV4dCwgZXJyb3JzKTtcclxuICBjaGVja0lkZW50aWZpZXIobm9kZS5pdGVyYXRvcjIsICd2LWZvciBpdGVyYXRvcicsIHRleHQsIGVycm9ycyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSWRlbnRpZmllciAoaWRlbnQsIHR5cGUsIHRleHQsIGVycm9ycykge1xyXG4gIGlmICh0eXBlb2YgaWRlbnQgPT09ICdzdHJpbmcnICYmICFpZGVudFJFLnRlc3QoaWRlbnQpKSB7XHJcbiAgICBlcnJvcnMucHVzaCgoXCItIGludmFsaWQgXCIgKyB0eXBlICsgXCIgXFxcIlwiICsgaWRlbnQgKyBcIlxcXCIgaW4gZXhwcmVzc2lvbjogXCIgKyB0ZXh0KSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0V4cHJlc3Npb24gKGV4cCwgdGV4dCwgZXJyb3JzKSB7XHJcbiAgdHJ5IHtcclxuICAgIG5ldyBGdW5jdGlvbigoXCJyZXR1cm4gXCIgKyBleHApKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICB2YXIga2V5d29yZE1hdGNoID0gZXhwLnJlcGxhY2Uoc3RyaXBTdHJpbmdSRSwgJycpLm1hdGNoKHByb2hpYml0ZWRLZXl3b3JkUkUpO1xyXG4gICAgaWYgKGtleXdvcmRNYXRjaCkge1xyXG4gICAgICBlcnJvcnMucHVzaChcclxuICAgICAgICBcIi0gYXZvaWQgdXNpbmcgSmF2YVNjcmlwdCBrZXl3b3JkIGFzIHByb3BlcnR5IG5hbWU6IFwiICtcclxuICAgICAgICBcIlxcXCJcIiArIChrZXl3b3JkTWF0Y2hbMF0pICsgXCJcXFwiIGluIGV4cHJlc3Npb24gXCIgKyB0ZXh0XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlcnJvcnMucHVzaCgoXCItIGludmFsaWQgZXhwcmVzc2lvbjogXCIgKyB0ZXh0KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiAgKi9cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybU5vZGUgKGVsLCBvcHRpb25zKSB7XHJcbiAgdmFyIHdhcm4gPSBvcHRpb25zLndhcm4gfHwgYmFzZVdhcm47XHJcbiAgdmFyIHN0YXRpY0NsYXNzID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ2NsYXNzJyk7XHJcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHN0YXRpY0NsYXNzKSB7XHJcbiAgICB2YXIgZXhwcmVzc2lvbiA9IHBhcnNlVGV4dChzdGF0aWNDbGFzcywgb3B0aW9ucy5kZWxpbWl0ZXJzKTtcclxuICAgIGlmIChleHByZXNzaW9uKSB7XHJcbiAgICAgIHdhcm4oXHJcbiAgICAgICAgXCJjbGFzcz1cXFwiXCIgKyBzdGF0aWNDbGFzcyArIFwiXFxcIjogXCIgK1xyXG4gICAgICAgICdJbnRlcnBvbGF0aW9uIGluc2lkZSBhdHRyaWJ1dGVzIGhhcyBiZWVuIHJlbW92ZWQuICcgK1xyXG4gICAgICAgICdVc2Ugdi1iaW5kIG9yIHRoZSBjb2xvbiBzaG9ydGhhbmQgaW5zdGVhZC4gRm9yIGV4YW1wbGUsICcgK1xyXG4gICAgICAgICdpbnN0ZWFkIG9mIDxkaXYgY2xhc3M9XCJ7eyB2YWwgfX1cIj4sIHVzZSA8ZGl2IDpjbGFzcz1cInZhbFwiPi4nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChzdGF0aWNDbGFzcykge1xyXG4gICAgZWwuc3RhdGljQ2xhc3MgPSBKU09OLnN0cmluZ2lmeShzdGF0aWNDbGFzcyk7XHJcbiAgfVxyXG4gIHZhciBjbGFzc0JpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ2NsYXNzJywgZmFsc2UgLyogZ2V0U3RhdGljICovKTtcclxuICBpZiAoY2xhc3NCaW5kaW5nKSB7XHJcbiAgICBlbC5jbGFzc0JpbmRpbmcgPSBjbGFzc0JpbmRpbmc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5EYXRhJDEgKGVsKSB7XHJcbiAgdmFyIGRhdGEgPSAnJztcclxuICBpZiAoZWwuc3RhdGljQ2xhc3MpIHtcclxuICAgIGRhdGEgKz0gXCJzdGF0aWNDbGFzczpcIiArIChlbC5zdGF0aWNDbGFzcykgKyBcIixcIjtcclxuICB9XHJcbiAgaWYgKGVsLmNsYXNzQmluZGluZykge1xyXG4gICAgZGF0YSArPSBcImNsYXNzOlwiICsgKGVsLmNsYXNzQmluZGluZykgKyBcIixcIjtcclxuICB9XHJcbiAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxudmFyIGtsYXNzJDEgPSB7XHJcbiAgc3RhdGljS2V5czogWydzdGF0aWNDbGFzcyddLFxyXG4gIHRyYW5zZm9ybU5vZGU6IHRyYW5zZm9ybU5vZGUsXHJcbiAgZ2VuRGF0YTogZ2VuRGF0YSQxXHJcbn07XHJcblxyXG4vKiAgKi9cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybU5vZGUkMSAoZWwsIG9wdGlvbnMpIHtcclxuICB2YXIgd2FybiA9IG9wdGlvbnMud2FybiB8fCBiYXNlV2FybjtcclxuICB2YXIgc3RhdGljU3R5bGUgPSBnZXRBbmRSZW1vdmVBdHRyKGVsLCAnc3R5bGUnKTtcclxuICBpZiAoc3RhdGljU3R5bGUpIHtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAge1xyXG4gICAgICB2YXIgZXhwcmVzc2lvbiA9IHBhcnNlVGV4dChzdGF0aWNTdHlsZSwgb3B0aW9ucy5kZWxpbWl0ZXJzKTtcclxuICAgICAgaWYgKGV4cHJlc3Npb24pIHtcclxuICAgICAgICB3YXJuKFxyXG4gICAgICAgICAgXCJzdHlsZT1cXFwiXCIgKyBzdGF0aWNTdHlsZSArIFwiXFxcIjogXCIgK1xyXG4gICAgICAgICAgJ0ludGVycG9sYXRpb24gaW5zaWRlIGF0dHJpYnV0ZXMgaGFzIGJlZW4gcmVtb3ZlZC4gJyArXHJcbiAgICAgICAgICAnVXNlIHYtYmluZCBvciB0aGUgY29sb24gc2hvcnRoYW5kIGluc3RlYWQuIEZvciBleGFtcGxlLCAnICtcclxuICAgICAgICAgICdpbnN0ZWFkIG9mIDxkaXYgc3R5bGU9XCJ7eyB2YWwgfX1cIj4sIHVzZSA8ZGl2IDpzdHlsZT1cInZhbFwiPi4nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWwuc3RhdGljU3R5bGUgPSBKU09OLnN0cmluZ2lmeShwYXJzZVN0eWxlVGV4dChzdGF0aWNTdHlsZSkpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHN0eWxlQmluZGluZyA9IGdldEJpbmRpbmdBdHRyKGVsLCAnc3R5bGUnLCBmYWxzZSAvKiBnZXRTdGF0aWMgKi8pO1xyXG4gIGlmIChzdHlsZUJpbmRpbmcpIHtcclxuICAgIGVsLnN0eWxlQmluZGluZyA9IHN0eWxlQmluZGluZztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbkRhdGEkMiAoZWwpIHtcclxuICB2YXIgZGF0YSA9ICcnO1xyXG4gIGlmIChlbC5zdGF0aWNTdHlsZSkge1xyXG4gICAgZGF0YSArPSBcInN0YXRpY1N0eWxlOlwiICsgKGVsLnN0YXRpY1N0eWxlKSArIFwiLFwiO1xyXG4gIH1cclxuICBpZiAoZWwuc3R5bGVCaW5kaW5nKSB7XHJcbiAgICBkYXRhICs9IFwic3R5bGU6KFwiICsgKGVsLnN0eWxlQmluZGluZykgKyBcIiksXCI7XHJcbiAgfVxyXG4gIHJldHVybiBkYXRhXHJcbn1cclxuXHJcbnZhciBzdHlsZSQxID0ge1xyXG4gIHN0YXRpY0tleXM6IFsnc3RhdGljU3R5bGUnXSxcclxuICB0cmFuc2Zvcm1Ob2RlOiB0cmFuc2Zvcm1Ob2RlJDEsXHJcbiAgZ2VuRGF0YTogZ2VuRGF0YSQyXHJcbn07XHJcblxyXG52YXIgbW9kdWxlcyQxID0gW1xyXG4gIGtsYXNzJDEsXHJcbiAgc3R5bGUkMVxyXG5dO1xyXG5cclxuLyogICovXHJcblxyXG52YXIgd2FybiQzO1xyXG5cclxuZnVuY3Rpb24gbW9kZWwkMSAoXHJcbiAgZWwsXHJcbiAgZGlyLFxyXG4gIF93YXJuXHJcbikge1xyXG4gIHdhcm4kMyA9IF93YXJuO1xyXG4gIHZhciB2YWx1ZSA9IGRpci52YWx1ZTtcclxuICB2YXIgbW9kaWZpZXJzID0gZGlyLm1vZGlmaWVycztcclxuICB2YXIgdGFnID0gZWwudGFnO1xyXG4gIHZhciB0eXBlID0gZWwuYXR0cnNNYXAudHlwZTtcclxuICB7XHJcbiAgICB2YXIgZHluYW1pY1R5cGUgPSBlbC5hdHRyc01hcFsndi1iaW5kOnR5cGUnXSB8fCBlbC5hdHRyc01hcFsnOnR5cGUnXTtcclxuICAgIGlmICh0YWcgPT09ICdpbnB1dCcgJiYgZHluYW1pY1R5cGUpIHtcclxuICAgICAgd2FybiQzKFxyXG4gICAgICAgIFwiPGlucHV0IDp0eXBlPVxcXCJcIiArIGR5bmFtaWNUeXBlICsgXCJcXFwiIHYtbW9kZWw9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCI+OlxcblwiICtcclxuICAgICAgICBcInYtbW9kZWwgZG9lcyBub3Qgc3VwcG9ydCBkeW5hbWljIGlucHV0IHR5cGVzLiBVc2Ugdi1pZiBicmFuY2hlcyBpbnN0ZWFkLlwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh0YWcgPT09ICdzZWxlY3QnKSB7XHJcbiAgICBnZW5TZWxlY3QoZWwsIHZhbHVlLCBtb2RpZmllcnMpO1xyXG4gIH0gZWxzZSBpZiAodGFnID09PSAnaW5wdXQnICYmIHR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgIGdlbkNoZWNrYm94TW9kZWwoZWwsIHZhbHVlLCBtb2RpZmllcnMpO1xyXG4gIH0gZWxzZSBpZiAodGFnID09PSAnaW5wdXQnICYmIHR5cGUgPT09ICdyYWRpbycpIHtcclxuICAgIGdlblJhZGlvTW9kZWwoZWwsIHZhbHVlLCBtb2RpZmllcnMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBnZW5EZWZhdWx0TW9kZWwoZWwsIHZhbHVlLCBtb2RpZmllcnMpO1xyXG4gIH1cclxuICAvLyBlbnN1cmUgcnVudGltZSBkaXJlY3RpdmUgbWV0YWRhdGFcclxuICByZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5DaGVja2JveE1vZGVsIChcclxuICBlbCxcclxuICB2YWx1ZSxcclxuICBtb2RpZmllcnNcclxuKSB7XHJcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmXHJcbiAgICBlbC5hdHRyc01hcC5jaGVja2VkICE9IG51bGwpIHtcclxuICAgIHdhcm4kMyhcclxuICAgICAgXCI8XCIgKyAoZWwudGFnKSArIFwiIHYtbW9kZWw9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCIgY2hlY2tlZD46XFxuXCIgK1xyXG4gICAgICBcImlubGluZSBjaGVja2VkIGF0dHJpYnV0ZXMgd2lsbCBiZSBpZ25vcmVkIHdoZW4gdXNpbmcgdi1tb2RlbC4gXCIgK1xyXG4gICAgICAnRGVjbGFyZSBpbml0aWFsIHZhbHVlcyBpbiB0aGUgY29tcG9uZW50XFwncyBkYXRhIG9wdGlvbiBpbnN0ZWFkLidcclxuICAgICk7XHJcbiAgfVxyXG4gIHZhciBudW1iZXIgPSBtb2RpZmllcnMgJiYgbW9kaWZpZXJzLm51bWJlcjtcclxuICB2YXIgdmFsdWVCaW5kaW5nID0gZ2V0QmluZGluZ0F0dHIoZWwsICd2YWx1ZScpIHx8ICdudWxsJztcclxuICB2YXIgdHJ1ZVZhbHVlQmluZGluZyA9IGdldEJpbmRpbmdBdHRyKGVsLCAndHJ1ZS12YWx1ZScpIHx8ICd0cnVlJztcclxuICB2YXIgZmFsc2VWYWx1ZUJpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ2ZhbHNlLXZhbHVlJykgfHwgJ2ZhbHNlJztcclxuICBhZGRQcm9wKGVsLCAnY2hlY2tlZCcsXHJcbiAgICBcIkFycmF5LmlzQXJyYXkoXCIgKyB2YWx1ZSArIFwiKVwiICtcclxuICAgICAgXCI/X2koXCIgKyB2YWx1ZSArIFwiLFwiICsgdmFsdWVCaW5kaW5nICsgXCIpPi0xXCIgK1xyXG4gICAgICBcIjpfcShcIiArIHZhbHVlICsgXCIsXCIgKyB0cnVlVmFsdWVCaW5kaW5nICsgXCIpXCJcclxuICApO1xyXG4gIGFkZEhhbmRsZXIoZWwsICdjaGFuZ2UnLFxyXG4gICAgXCJ2YXIgJCRhPVwiICsgdmFsdWUgKyBcIixcIiArXHJcbiAgICAgICAgJyQkZWw9JGV2ZW50LnRhcmdldCwnICtcclxuICAgICAgICBcIiQkYz0kJGVsLmNoZWNrZWQ/KFwiICsgdHJ1ZVZhbHVlQmluZGluZyArIFwiKTooXCIgKyBmYWxzZVZhbHVlQmluZGluZyArIFwiKTtcIiArXHJcbiAgICAnaWYoQXJyYXkuaXNBcnJheSgkJGEpKXsnICtcclxuICAgICAgXCJ2YXIgJCR2PVwiICsgKG51bWJlciA/ICdfbignICsgdmFsdWVCaW5kaW5nICsgJyknIDogdmFsdWVCaW5kaW5nKSArIFwiLFwiICtcclxuICAgICAgICAgICckJGk9X2koJCRhLCQkdik7JyArXHJcbiAgICAgIFwiaWYoJCRjKXskJGk8MCYmKFwiICsgdmFsdWUgKyBcIj0kJGEuY29uY2F0KCQkdikpfVwiICtcclxuICAgICAgXCJlbHNleyQkaT4tMSYmKFwiICsgdmFsdWUgKyBcIj0kJGEuc2xpY2UoMCwkJGkpLmNvbmNhdCgkJGEuc2xpY2UoJCRpKzEpKSl9XCIgK1xyXG4gICAgXCJ9ZWxzZXtcIiArIHZhbHVlICsgXCI9JCRjfVwiLFxyXG4gICAgbnVsbCwgdHJ1ZVxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlblJhZGlvTW9kZWwgKFxyXG4gICAgZWwsXHJcbiAgICB2YWx1ZSxcclxuICAgIG1vZGlmaWVyc1xyXG4pIHtcclxuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiZcclxuICAgIGVsLmF0dHJzTWFwLmNoZWNrZWQgIT0gbnVsbCkge1xyXG4gICAgd2FybiQzKFxyXG4gICAgICBcIjxcIiArIChlbC50YWcpICsgXCIgdi1tb2RlbD1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIiBjaGVja2VkPjpcXG5cIiArXHJcbiAgICAgIFwiaW5saW5lIGNoZWNrZWQgYXR0cmlidXRlcyB3aWxsIGJlIGlnbm9yZWQgd2hlbiB1c2luZyB2LW1vZGVsLiBcIiArXHJcbiAgICAgICdEZWNsYXJlIGluaXRpYWwgdmFsdWVzIGluIHRoZSBjb21wb25lbnRcXCdzIGRhdGEgb3B0aW9uIGluc3RlYWQuJ1xyXG4gICAgKTtcclxuICB9XHJcbiAgdmFyIG51bWJlciA9IG1vZGlmaWVycyAmJiBtb2RpZmllcnMubnVtYmVyO1xyXG4gIHZhciB2YWx1ZUJpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ3ZhbHVlJykgfHwgJ251bGwnO1xyXG4gIHZhbHVlQmluZGluZyA9IG51bWJlciA/IChcIl9uKFwiICsgdmFsdWVCaW5kaW5nICsgXCIpXCIpIDogdmFsdWVCaW5kaW5nO1xyXG4gIGFkZFByb3AoZWwsICdjaGVja2VkJywgKFwiX3EoXCIgKyB2YWx1ZSArIFwiLFwiICsgdmFsdWVCaW5kaW5nICsgXCIpXCIpKTtcclxuICBhZGRIYW5kbGVyKGVsLCAnY2hhbmdlJywgZ2VuQXNzaWdubWVudENvZGUodmFsdWUsIHZhbHVlQmluZGluZyksIG51bGwsIHRydWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5EZWZhdWx0TW9kZWwgKFxyXG4gIGVsLFxyXG4gIHZhbHVlLFxyXG4gIG1vZGlmaWVyc1xyXG4pIHtcclxuICB7XHJcbiAgICBpZiAoZWwudGFnID09PSAnaW5wdXQnICYmIGVsLmF0dHJzTWFwLnZhbHVlKSB7XHJcbiAgICAgIHdhcm4kMyhcclxuICAgICAgICBcIjxcIiArIChlbC50YWcpICsgXCIgdi1tb2RlbD1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIiB2YWx1ZT1cXFwiXCIgKyAoZWwuYXR0cnNNYXAudmFsdWUpICsgXCJcXFwiPjpcXG5cIiArXHJcbiAgICAgICAgJ2lubGluZSB2YWx1ZSBhdHRyaWJ1dGVzIHdpbGwgYmUgaWdub3JlZCB3aGVuIHVzaW5nIHYtbW9kZWwuICcgK1xyXG4gICAgICAgICdEZWNsYXJlIGluaXRpYWwgdmFsdWVzIGluIHRoZSBjb21wb25lbnRcXCdzIGRhdGEgb3B0aW9uIGluc3RlYWQuJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGVsLnRhZyA9PT0gJ3RleHRhcmVhJyAmJiBlbC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgd2FybiQzKFxyXG4gICAgICAgIFwiPHRleHRhcmVhIHYtbW9kZWw9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCI+OlxcblwiICtcclxuICAgICAgICAnaW5saW5lIGNvbnRlbnQgaW5zaWRlIDx0ZXh0YXJlYT4gd2lsbCBiZSBpZ25vcmVkIHdoZW4gdXNpbmcgdi1tb2RlbC4gJyArXHJcbiAgICAgICAgJ0RlY2xhcmUgaW5pdGlhbCB2YWx1ZXMgaW4gdGhlIGNvbXBvbmVudFxcJ3MgZGF0YSBvcHRpb24gaW5zdGVhZC4nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgdHlwZSA9IGVsLmF0dHJzTWFwLnR5cGU7XHJcbiAgdmFyIHJlZiA9IG1vZGlmaWVycyB8fCB7fTtcclxuICB2YXIgbGF6eSA9IHJlZi5sYXp5O1xyXG4gIHZhciBudW1iZXIgPSByZWYubnVtYmVyO1xyXG4gIHZhciB0cmltID0gcmVmLnRyaW07XHJcbiAgdmFyIGV2ZW50ID0gbGF6eSB8fCAoaXNJRSAmJiB0eXBlID09PSAncmFuZ2UnKSA/ICdjaGFuZ2UnIDogJ2lucHV0JztcclxuICB2YXIgbmVlZENvbXBvc2l0aW9uR3VhcmQgPSAhbGF6eSAmJiB0eXBlICE9PSAncmFuZ2UnO1xyXG4gIHZhciBpc05hdGl2ZSA9IGVsLnRhZyA9PT0gJ2lucHV0JyB8fCBlbC50YWcgPT09ICd0ZXh0YXJlYSc7XHJcblxyXG4gIHZhciB2YWx1ZUV4cHJlc3Npb24gPSBpc05hdGl2ZVxyXG4gICAgPyAoXCIkZXZlbnQudGFyZ2V0LnZhbHVlXCIgKyAodHJpbSA/ICcudHJpbSgpJyA6ICcnKSlcclxuICAgIDogdHJpbSA/IFwiKHR5cGVvZiAkZXZlbnQgPT09ICdzdHJpbmcnID8gJGV2ZW50LnRyaW0oKSA6ICRldmVudClcIiA6IFwiJGV2ZW50XCI7XHJcbiAgdmFsdWVFeHByZXNzaW9uID0gbnVtYmVyIHx8IHR5cGUgPT09ICdudW1iZXInXHJcbiAgICA/IChcIl9uKFwiICsgdmFsdWVFeHByZXNzaW9uICsgXCIpXCIpXHJcbiAgICA6IHZhbHVlRXhwcmVzc2lvbjtcclxuICB2YXIgY29kZSA9IGdlbkFzc2lnbm1lbnRDb2RlKHZhbHVlLCB2YWx1ZUV4cHJlc3Npb24pO1xyXG4gIGlmIChpc05hdGl2ZSAmJiBuZWVkQ29tcG9zaXRpb25HdWFyZCkge1xyXG4gICAgY29kZSA9IFwiaWYoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpcmV0dXJuO1wiICsgY29kZTtcclxuICB9XHJcbiAgLy8gaW5wdXRzIHdpdGggdHlwZT1cImZpbGVcIiBhcmUgcmVhZCBvbmx5IGFuZCBzZXR0aW5nIHRoZSBpbnB1dCdzXHJcbiAgLy8gdmFsdWUgd2lsbCB0aHJvdyBhbiBlcnJvci5cclxuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiZcclxuICAgICAgdHlwZSA9PT0gJ2ZpbGUnKSB7XHJcbiAgICB3YXJuJDMoXHJcbiAgICAgIFwiPFwiICsgKGVsLnRhZykgKyBcIiB2LW1vZGVsPVxcXCJcIiArIHZhbHVlICsgXCJcXFwiIHR5cGU9XFxcImZpbGVcXFwiPjpcXG5cIiArXHJcbiAgICAgIFwiRmlsZSBpbnB1dHMgYXJlIHJlYWQgb25seS4gVXNlIGEgdi1vbjpjaGFuZ2UgbGlzdGVuZXIgaW5zdGVhZC5cIlxyXG4gICAgKTtcclxuICB9XHJcbiAgYWRkUHJvcChlbCwgJ3ZhbHVlJywgaXNOYXRpdmUgPyAoXCJfcyhcIiArIHZhbHVlICsgXCIpXCIpIDogKFwiKFwiICsgdmFsdWUgKyBcIilcIikpO1xyXG4gIGFkZEhhbmRsZXIoZWwsIGV2ZW50LCBjb2RlLCBudWxsLCB0cnVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuU2VsZWN0IChcclxuICAgIGVsLFxyXG4gICAgdmFsdWUsXHJcbiAgICBtb2RpZmllcnNcclxuKSB7XHJcbiAge1xyXG4gICAgZWwuY2hpbGRyZW4uc29tZShjaGVja09wdGlvbldhcm5pbmcpO1xyXG4gIH1cclxuXHJcbiAgdmFyIG51bWJlciA9IG1vZGlmaWVycyAmJiBtb2RpZmllcnMubnVtYmVyO1xyXG4gIHZhciBhc3NpZ25tZW50ID0gXCJBcnJheS5wcm90b3R5cGUuZmlsdGVyXCIgK1xyXG4gICAgXCIuY2FsbCgkZXZlbnQudGFyZ2V0Lm9wdGlvbnMsZnVuY3Rpb24obyl7cmV0dXJuIG8uc2VsZWN0ZWR9KVwiICtcclxuICAgIFwiLm1hcChmdW5jdGlvbihvKXt2YXIgdmFsID0gXFxcIl92YWx1ZVxcXCIgaW4gbyA/IG8uX3ZhbHVlIDogby52YWx1ZTtcIiArXHJcbiAgICBcInJldHVybiBcIiArIChudW1iZXIgPyAnX24odmFsKScgOiAndmFsJykgKyBcIn0pXCIgK1xyXG4gICAgKGVsLmF0dHJzTWFwLm11bHRpcGxlID09IG51bGwgPyAnWzBdJyA6ICcnKTtcclxuXHJcbiAgdmFyIGNvZGUgPSBnZW5Bc3NpZ25tZW50Q29kZSh2YWx1ZSwgYXNzaWdubWVudCk7XHJcbiAgYWRkSGFuZGxlcihlbCwgJ2NoYW5nZScsIGNvZGUsIG51bGwsIHRydWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja09wdGlvbldhcm5pbmcgKG9wdGlvbikge1xyXG4gIGlmIChvcHRpb24udHlwZSA9PT0gMSAmJlxyXG4gICAgb3B0aW9uLnRhZyA9PT0gJ29wdGlvbicgJiZcclxuICAgIG9wdGlvbi5hdHRyc01hcC5zZWxlY3RlZCAhPSBudWxsKSB7XHJcbiAgICB3YXJuJDMoXHJcbiAgICAgIFwiPHNlbGVjdCB2LW1vZGVsPVxcXCJcIiArIChvcHRpb24ucGFyZW50LmF0dHJzTWFwWyd2LW1vZGVsJ10pICsgXCJcXFwiPjpcXG5cIiArXHJcbiAgICAgICdpbmxpbmUgc2VsZWN0ZWQgYXR0cmlidXRlcyBvbiA8b3B0aW9uPiB3aWxsIGJlIGlnbm9yZWQgd2hlbiB1c2luZyB2LW1vZGVsLiAnICtcclxuICAgICAgJ0RlY2xhcmUgaW5pdGlhbCB2YWx1ZXMgaW4gdGhlIGNvbXBvbmVudFxcJ3MgZGF0YSBvcHRpb24gaW5zdGVhZC4nXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbkFzc2lnbm1lbnRDb2RlICh2YWx1ZSwgYXNzaWdubWVudCkge1xyXG4gIHZhciBtb2RlbFJzID0gcGFyc2VNb2RlbCh2YWx1ZSk7XHJcbiAgaWYgKG1vZGVsUnMuaWR4ID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gKHZhbHVlICsgXCI9XCIgKyBhc3NpZ25tZW50KVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJ2YXIgJCRleHAgPSBcIiArIChtb2RlbFJzLmV4cCkgKyBcIiwgJCRpZHggPSBcIiArIChtb2RlbFJzLmlkeCkgKyBcIjtcIiArXHJcbiAgICAgIFwiaWYgKCFBcnJheS5pc0FycmF5KCQkZXhwKSl7XCIgK1xyXG4gICAgICAgIHZhbHVlICsgXCI9XCIgKyBhc3NpZ25tZW50ICsgXCJ9XCIgK1xyXG4gICAgICBcImVsc2V7JCRleHAuc3BsaWNlKCQkaWR4LCAxLCBcIiArIGFzc2lnbm1lbnQgKyBcIil9XCJcclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gdGV4dCAoZWwsIGRpcikge1xyXG4gIGlmIChkaXIudmFsdWUpIHtcclxuICAgIGFkZFByb3AoZWwsICd0ZXh0Q29udGVudCcsIChcIl9zKFwiICsgKGRpci52YWx1ZSkgKyBcIilcIikpO1xyXG4gIH1cclxufVxyXG5cclxuLyogICovXHJcblxyXG5mdW5jdGlvbiBodG1sIChlbCwgZGlyKSB7XHJcbiAgaWYgKGRpci52YWx1ZSkge1xyXG4gICAgYWRkUHJvcChlbCwgJ2lubmVySFRNTCcsIChcIl9zKFwiICsgKGRpci52YWx1ZSkgKyBcIilcIikpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIGRpcmVjdGl2ZXMkMSA9IHtcclxuICBtb2RlbDogbW9kZWwkMSxcclxuICB0ZXh0OiB0ZXh0LFxyXG4gIGh0bWw6IGh0bWxcclxufTtcclxuXHJcbi8qICAqL1xyXG5cclxudmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbnZhciBiYXNlT3B0aW9ucyA9IHtcclxuICBpc0lFOiBpc0lFLFxyXG4gIGV4cGVjdEhUTUw6IHRydWUsXHJcbiAgbW9kdWxlczogbW9kdWxlcyQxLFxyXG4gIHN0YXRpY0tleXM6IGdlblN0YXRpY0tleXMobW9kdWxlcyQxKSxcclxuICBkaXJlY3RpdmVzOiBkaXJlY3RpdmVzJDEsXHJcbiAgaXNSZXNlcnZlZFRhZzogaXNSZXNlcnZlZFRhZyxcclxuICBpc1VuYXJ5VGFnOiBpc1VuYXJ5VGFnLFxyXG4gIG11c3RVc2VQcm9wOiBtdXN0VXNlUHJvcCxcclxuICBnZXRUYWdOYW1lc3BhY2U6IGdldFRhZ05hbWVzcGFjZSxcclxuICBpc1ByZVRhZzogaXNQcmVUYWdcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBpbGUkJDEgKFxyXG4gIHRlbXBsYXRlLFxyXG4gIG9wdGlvbnNcclxuKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnNcclxuICAgID8gZXh0ZW5kKGV4dGVuZCh7fSwgYmFzZU9wdGlvbnMpLCBvcHRpb25zKVxyXG4gICAgOiBiYXNlT3B0aW9ucztcclxuICByZXR1cm4gY29tcGlsZSQxKHRlbXBsYXRlLCBvcHRpb25zKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21waWxlVG9GdW5jdGlvbnMgKFxyXG4gIHRlbXBsYXRlLFxyXG4gIG9wdGlvbnMsXHJcbiAgdm1cclxuKSB7XHJcbiAgdmFyIF93YXJuID0gKG9wdGlvbnMgJiYgb3B0aW9ucy53YXJuKSB8fCB3YXJuO1xyXG4gIC8vIGRldGVjdCBwb3NzaWJsZSBDU1AgcmVzdHJpY3Rpb25cclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgRnVuY3Rpb24oJ3JldHVybiAxJyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmIChlLnRvU3RyaW5nKCkubWF0Y2goL3Vuc2FmZS1ldmFsfENTUC8pKSB7XHJcbiAgICAgICAgX3dhcm4oXHJcbiAgICAgICAgICAnSXQgc2VlbXMgeW91IGFyZSB1c2luZyB0aGUgc3RhbmRhbG9uZSBidWlsZCBvZiBWdWUuanMgaW4gYW4gJyArXHJcbiAgICAgICAgICAnZW52aXJvbm1lbnQgd2l0aCBDb250ZW50IFNlY3VyaXR5IFBvbGljeSB0aGF0IHByb2hpYml0cyB1bnNhZmUtZXZhbC4gJyArXHJcbiAgICAgICAgICAnVGhlIHRlbXBsYXRlIGNvbXBpbGVyIGNhbm5vdCB3b3JrIGluIHRoaXMgZW52aXJvbm1lbnQuIENvbnNpZGVyICcgK1xyXG4gICAgICAgICAgJ3JlbGF4aW5nIHRoZSBwb2xpY3kgdG8gYWxsb3cgdW5zYWZlLWV2YWwgb3IgcHJlLWNvbXBpbGluZyB5b3VyICcgK1xyXG4gICAgICAgICAgJ3RlbXBsYXRlcyBpbnRvIHJlbmRlciBmdW5jdGlvbnMuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdmFyIGtleSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWxpbWl0ZXJzXHJcbiAgICA/IFN0cmluZyhvcHRpb25zLmRlbGltaXRlcnMpICsgdGVtcGxhdGVcclxuICAgIDogdGVtcGxhdGU7XHJcbiAgaWYgKGNhY2hlW2tleV0pIHtcclxuICAgIHJldHVybiBjYWNoZVtrZXldXHJcbiAgfVxyXG4gIHZhciByZXMgPSB7fTtcclxuICB2YXIgY29tcGlsZWQgPSBjb21waWxlJCQxKHRlbXBsYXRlLCBvcHRpb25zKTtcclxuICByZXMucmVuZGVyID0gbWFrZUZ1bmN0aW9uKGNvbXBpbGVkLnJlbmRlcik7XHJcbiAgdmFyIGwgPSBjb21waWxlZC5zdGF0aWNSZW5kZXJGbnMubGVuZ3RoO1xyXG4gIHJlcy5zdGF0aWNSZW5kZXJGbnMgPSBuZXcgQXJyYXkobCk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgIHJlcy5zdGF0aWNSZW5kZXJGbnNbaV0gPSBtYWtlRnVuY3Rpb24oY29tcGlsZWQuc3RhdGljUmVuZGVyRm5zW2ldKTtcclxuICB9XHJcbiAge1xyXG4gICAgaWYgKHJlcy5yZW5kZXIgPT09IG5vb3AgfHwgcmVzLnN0YXRpY1JlbmRlckZucy5zb21lKGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4gPT09IG5vb3A7IH0pKSB7XHJcbiAgICAgIF93YXJuKFxyXG4gICAgICAgIFwiZmFpbGVkIHRvIGNvbXBpbGUgdGVtcGxhdGU6XFxuXFxuXCIgKyB0ZW1wbGF0ZSArIFwiXFxuXFxuXCIgK1xyXG4gICAgICAgIGRldGVjdEVycm9ycyhjb21waWxlZC5hc3QpLmpvaW4oJ1xcbicpICtcclxuICAgICAgICAnXFxuXFxuJyxcclxuICAgICAgICB2bVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gKGNhY2hlW2tleV0gPSByZXMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VGdW5jdGlvbiAoY29kZSkge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKGNvZGUpXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIG5vb3BcclxuICB9XHJcbn1cclxuXHJcbi8qICAqL1xyXG5cclxudmFyIGlkVG9UZW1wbGF0ZSA9IGNhY2hlZChmdW5jdGlvbiAoaWQpIHtcclxuICB2YXIgZWwgPSBxdWVyeShpZCk7XHJcbiAgcmV0dXJuIGVsICYmIGVsLmlubmVySFRNTFxyXG59KTtcclxuXHJcbnZhciBtb3VudCA9IFZ1ZSQzLnByb3RvdHlwZS4kbW91bnQ7XHJcblZ1ZSQzLnByb3RvdHlwZS4kbW91bnQgPSBmdW5jdGlvbiAoXHJcbiAgZWwsXHJcbiAgaHlkcmF0aW5nXHJcbikge1xyXG4gIGVsID0gZWwgJiYgcXVlcnkoZWwpO1xyXG5cclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICBpZiAoZWwgPT09IGRvY3VtZW50LmJvZHkgfHwgZWwgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcclxuICAgICAgXCJEbyBub3QgbW91bnQgVnVlIHRvIDxodG1sPiBvciA8Ym9keT4gLSBtb3VudCB0byBub3JtYWwgZWxlbWVudHMgaW5zdGVhZC5cIlxyXG4gICAgKTtcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XHJcbiAgLy8gcmVzb2x2ZSB0ZW1wbGF0ZS9lbCBhbmQgY29udmVydCB0byByZW5kZXIgZnVuY3Rpb25cclxuICBpZiAoIW9wdGlvbnMucmVuZGVyKSB7XHJcbiAgICB2YXIgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xyXG4gICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYgKHRlbXBsYXRlLmNoYXJBdCgwKSA9PT0gJyMnKSB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZSA9IGlkVG9UZW1wbGF0ZSh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyAmJiAhdGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgd2FybihcclxuICAgICAgICAgICAgICAoXCJUZW1wbGF0ZSBlbGVtZW50IG5vdCBmb3VuZCBvciBpcyBlbXB0eTogXCIgKyAob3B0aW9ucy50ZW1wbGF0ZSkpLFxyXG4gICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGVtcGxhdGUubm9kZVR5cGUpIHtcclxuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLmlubmVySFRNTDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB3YXJuKCdpbnZhbGlkIHRlbXBsYXRlIG9wdGlvbjonICsgdGVtcGxhdGUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGVsKSB7XHJcbiAgICAgIHRlbXBsYXRlID0gZ2V0T3V0ZXJIVE1MKGVsKTtcclxuICAgIH1cclxuICAgIGlmICh0ZW1wbGF0ZSkge1xyXG4gICAgICB2YXIgcmVmID0gY29tcGlsZVRvRnVuY3Rpb25zKHRlbXBsYXRlLCB7XHJcbiAgICAgICAgd2Fybjogd2FybixcclxuICAgICAgICBzaG91bGREZWNvZGVOZXdsaW5lczogc2hvdWxkRGVjb2RlTmV3bGluZXMsXHJcbiAgICAgICAgZGVsaW1pdGVyczogb3B0aW9ucy5kZWxpbWl0ZXJzXHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgICB2YXIgcmVuZGVyID0gcmVmLnJlbmRlcjtcclxuICAgICAgdmFyIHN0YXRpY1JlbmRlckZucyA9IHJlZi5zdGF0aWNSZW5kZXJGbnM7XHJcbiAgICAgIG9wdGlvbnMucmVuZGVyID0gcmVuZGVyO1xyXG4gICAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHN0YXRpY1JlbmRlckZucztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1vdW50LmNhbGwodGhpcywgZWwsIGh5ZHJhdGluZylcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgb3V0ZXJIVE1MIG9mIGVsZW1lbnRzLCB0YWtpbmcgY2FyZVxyXG4gKiBvZiBTVkcgZWxlbWVudHMgaW4gSUUgYXMgd2VsbC5cclxuICovXHJcbmZ1bmN0aW9uIGdldE91dGVySFRNTCAoZWwpIHtcclxuICBpZiAoZWwub3V0ZXJIVE1MKSB7XHJcbiAgICByZXR1cm4gZWwub3V0ZXJIVE1MXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbC5jbG9uZU5vZGUodHJ1ZSkpO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5lci5pbm5lckhUTUxcclxuICB9XHJcbn1cclxuXHJcblZ1ZSQzLmNvbXBpbGUgPSBjb21waWxlVG9GdW5jdGlvbnM7XHJcblxyXG5yZXR1cm4gVnVlJDM7XHJcblxyXG59KSkpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlL2Rpc3QvdnVlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuXHJcbnZhciBGZWVkYmFjayA9IFZ1ZS5jb21wb25lbnQoJ2ZlZWRiYWNrJywge1xyXG50ZW1wbGF0ZTogYFxyXG48ZGl2IGNsYXNzPVwiY29udGFjdHNcIj5cclxuXHQ8Zm9ybSBjbGFzcz1cImNvbnRhY3RzX19mb3JtXCIgQHN1Ym1pdC5wcmV2ZW50PVwib25TdWJtaXRcIj5cclxuXHRcdDxoMT5Db250YWN0IFVzPC9oMT5cclxuXHRcdDxpbnB1dCBjbGFzcz1cImNvbnRhY3RzX19uYW1lXCIgdHlwZT1cInRleHRcIiB2LW1vZGVsPVwib2JqLm5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgTmFtZVwiPlxyXG5cclxuXHRcdDxpbnB1dCBjbGFzcz1cImNvbnRhY3RzX19lbWFpbFwiIHR5cGU9XCJlbWFpbFwiIHYtbW9kZWw9XCJvYmouZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgRW1haWxcIj5cclxuXHJcblx0XHQ8dGV4dGFyZWEgY2xhc3M9XCJjb250YWN0c19fY29tbWVudFwiIHJvd3M9XCI1XCIgdi1tb2RlbD1cIm9iai5jb21tZW50XCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIENvbW1lbnQuLi5cIiA+PC90ZXh0YXJlYT5cclxuXHJcblx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImNvbnRhY3RzX19zdWJtaXRcIj5TZW5kPC9idXR0b24+XHJcblx0PC9mb3JtPlxyXG48L2Rpdj5gXHJcbixcclxuICBcdGRhdGEoKSB7XHJcblx0ICAgIHJldHVybiB7XHJcblx0XHRcdG9iajoge25hbWU6IFwiXCIsIGVtYWlsOiBcIlwiLCBjb21tZW50OiBcIlwifVxyXG5cdCAgICB9XHJcblx0fSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgIFx0b25TdWJtaXQoKSB7XHJcblx0ICAgICAgXHR0aGlzLiRodHRwLnBvc3QoJy4uLy4uL3NjcmlwdHMvZmVlZGJhY2sucGhwJywgdGhpcy5vYmopXHJcblx0ICAgICAgICAudGhlbihyZXMgPT4ge1xyXG5cdCAgICAgICAgYWxlcnQocmVzLmJvZHkpO1xyXG5cdCAgICAgICAgfSwgKGVycikgPT4ge1xyXG5cdCAgICAgICAgYWxlcnQoJ2ZlZWRiYWNrJywgZXJyKTtcclxuXHQgICAgICAgXHR9KTtcclxuICAgIFx0fVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGZWVkYmFjaztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvZmVlZGJhY2suanMiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XHJcbmltcG9ydCBWdWVSZXNvdXJjZSBmcm9tICd2dWUtcmVzb3VyY2UnO1xyXG5cclxuVnVlLnVzZShWdWVSZXNvdXJjZSk7XHJcblxyXG5WdWUuaHR0cC5vcHRpb25zLnJvb3QgPSAnL3Jvb3QnO1xyXG5WdWUuaHR0cC5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljIFlYQnBPbkJoYzNOM2IzSmsnO1xyXG5WdWUuaHR0cC5vcHRpb25zLmVtdWxhdGVKU09OID0gdHJ1ZTtcclxuVnVlLmh0dHAub3B0aW9ucy5lbXVsYXRlSFRUUCA9IHRydWU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2NvbmZpZy5qcyIsIi8qIVxyXG4gKiB2dWUtcmVzb3VyY2UgdjEuMC4zXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtcmVzb3VyY2VcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBQcm9taXNlcy9BKyBwb2x5ZmlsbCB2MS4xLjQgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFtc3RlaW4vcHJvbWlzKVxyXG4gKi9cclxuXHJcbnZhciBSRVNPTFZFRCA9IDA7XHJcbnZhciBSRUpFQ1RFRCA9IDE7XHJcbnZhciBQRU5ESU5HID0gMjtcclxuXHJcbmZ1bmN0aW9uIFByb21pc2UkMShleGVjdXRvcikge1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSBQRU5ESU5HO1xyXG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZGVmZXJyZWQgPSBbXTtcclxuXHJcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBleGVjdXRvcihmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoeCk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3Qocik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblByb21pc2UkMS5yZWplY3QgPSBmdW5jdGlvbiAocikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHJlamVjdChyKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUHJvbWlzZSQxLnJlc29sdmUgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHJlc29sdmUoeCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblByb21pc2UkMS5hbGwgPSBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgY291bnQgPSAwLFxyXG4gICAgICAgICAgICByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZXJhYmxlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlcihpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0geDtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSBpdGVyYWJsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIFByb21pc2UkMS5yZXNvbHZlKGl0ZXJhYmxlW2ldKS50aGVuKHJlc29sdmVyKGkpLCByZWplY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuUHJvbWlzZSQxLnJhY2UgPSBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBQcm9taXNlJDEucmVzb2x2ZShpdGVyYWJsZVtpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHAkMSA9IFByb21pc2UkMS5wcm90b3R5cGU7XHJcblxyXG5wJDEucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xyXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG5cclxuICAgIGlmIChwcm9taXNlLnN0YXRlID09PSBQRU5ESU5HKSB7XHJcbiAgICAgICAgaWYgKHggPT09IHByb21pc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZSBzZXR0bGVkIHdpdGggaXRzZWxmLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgdGhlbiA9IHggJiYgeFsndGhlbiddO1xyXG5cclxuICAgICAgICAgICAgaWYgKHggIT09IG51bGwgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVuLmNhbGwoeCwgZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UucmVqZWN0KHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9taXNlLnN0YXRlID0gUkVTT0xWRUQ7XHJcbiAgICAgICAgcHJvbWlzZS52YWx1ZSA9IHg7XHJcbiAgICAgICAgcHJvbWlzZS5ub3RpZnkoKTtcclxuICAgIH1cclxufTtcclxuXHJcbnAkMS5yZWplY3QgPSBmdW5jdGlvbiByZWplY3QocmVhc29uKSB7XHJcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFBFTkRJTkcpIHtcclxuICAgICAgICBpZiAocmVhc29uID09PSBwcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2Ugc2V0dGxlZCB3aXRoIGl0c2VsZi4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb21pc2Uuc3RhdGUgPSBSRUpFQ1RFRDtcclxuICAgICAgICBwcm9taXNlLnZhbHVlID0gcmVhc29uO1xyXG4gICAgICAgIHByb21pc2Uubm90aWZ5KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5wJDEubm90aWZ5ID0gZnVuY3Rpb24gbm90aWZ5KCkge1xyXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG5cclxuICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAocHJvbWlzZS5zdGF0ZSAhPT0gUEVORElORykge1xyXG4gICAgICAgICAgICB3aGlsZSAocHJvbWlzZS5kZWZlcnJlZC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IHByb21pc2UuZGVmZXJyZWQuc2hpZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICBvblJlc29sdmVkID0gZGVmZXJyZWRbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25SZWplY3RlZCA9IGRlZmVycmVkWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUgPSBkZWZlcnJlZFsyXSxcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QgPSBkZWZlcnJlZFszXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9taXNlLnN0YXRlID09PSBSRVNPTFZFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9uUmVzb2x2ZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob25SZXNvbHZlZC5jYWxsKHVuZGVmaW5lZCwgcHJvbWlzZS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvbWlzZS5zdGF0ZSA9PT0gUkVKRUNURUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9uUmVqZWN0ZWQuY2FsbCh1bmRlZmluZWQsIHByb21pc2UudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnAkMS50aGVuID0gZnVuY3Rpb24gdGhlbihvblJlc29sdmVkLCBvblJlamVjdGVkKSB7XHJcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHByb21pc2UuZGVmZXJyZWQucHVzaChbb25SZXNvbHZlZCwgb25SZWplY3RlZCwgcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgICAgcHJvbWlzZS5ub3RpZnkoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxucCQxLmNhdGNoID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcclxuICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9taXNlIGFkYXB0ZXIuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgd2luZG93LlByb21pc2UgPSBQcm9taXNlJDE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFByb21pc2VPYmooZXhlY3V0b3IsIGNvbnRleHQpIHtcclxuXHJcbiAgICBpZiAoZXhlY3V0b3IgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgdGhpcy5wcm9taXNlID0gZXhlY3V0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGV4ZWN1dG9yLmJpbmQoY29udGV4dCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn1cclxuXHJcblByb21pc2VPYmouYWxsID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBjb250ZXh0KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2VPYmooUHJvbWlzZS5hbGwoaXRlcmFibGUpLCBjb250ZXh0KTtcclxufTtcclxuXHJcblByb21pc2VPYmoucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29udGV4dCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JqKFByb21pc2UucmVzb2x2ZSh2YWx1ZSksIGNvbnRleHQpO1xyXG59O1xyXG5cclxuUHJvbWlzZU9iai5yZWplY3QgPSBmdW5jdGlvbiAocmVhc29uLCBjb250ZXh0KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2VPYmooUHJvbWlzZS5yZWplY3QocmVhc29uKSwgY29udGV4dCk7XHJcbn07XHJcblxyXG5Qcm9taXNlT2JqLnJhY2UgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGNvbnRleHQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaihQcm9taXNlLnJhY2UoaXRlcmFibGUpLCBjb250ZXh0KTtcclxufTtcclxuXHJcbnZhciBwID0gUHJvbWlzZU9iai5wcm90b3R5cGU7XHJcblxyXG5wLmJpbmQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxucC50aGVuID0gZnVuY3Rpb24gKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcclxuXHJcbiAgICBpZiAoZnVsZmlsbGVkICYmIGZ1bGZpbGxlZC5iaW5kICYmIHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgIGZ1bGZpbGxlZCA9IGZ1bGZpbGxlZC5iaW5kKHRoaXMuY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlamVjdGVkICYmIHJlamVjdGVkLmJpbmQgJiYgdGhpcy5jb250ZXh0KSB7XHJcbiAgICAgICAgcmVqZWN0ZWQgPSByZWplY3RlZC5iaW5kKHRoaXMuY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JqKHRoaXMucHJvbWlzZS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpLCB0aGlzLmNvbnRleHQpO1xyXG59O1xyXG5cclxucC5jYXRjaCA9IGZ1bmN0aW9uIChyZWplY3RlZCkge1xyXG5cclxuICAgIGlmIChyZWplY3RlZCAmJiByZWplY3RlZC5iaW5kICYmIHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgIHJlamVjdGVkID0gcmVqZWN0ZWQuYmluZCh0aGlzLmNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaih0aGlzLnByb21pc2UuY2F0Y2gocmVqZWN0ZWQpLCB0aGlzLmNvbnRleHQpO1xyXG59O1xyXG5cclxucC5maW5hbGx5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqL1xyXG5cclxudmFyIGRlYnVnID0gZmFsc2U7dmFyIHV0aWwgPSB7fTt2YXIgc2xpY2UgPSBbXS5zbGljZTtcclxuXHJcblxyXG5mdW5jdGlvbiBVdGlsIChWdWUpIHtcclxuICAgIHV0aWwgPSBWdWUudXRpbDtcclxuICAgIGRlYnVnID0gVnVlLmNvbmZpZy5kZWJ1ZyB8fCAhVnVlLmNvbmZpZy5zaWxlbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdhcm4obXNnKSB7XHJcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGRlYnVnKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdbVnVlUmVzb3VyY2Ugd2Fybl06ICcgKyBtc2cpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBlcnJvcihtc2cpIHtcclxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5leHRUaWNrKGNiLCBjdHgpIHtcclxuICAgIHJldHVybiB1dGlsLm5leHRUaWNrKGNiLCBjdHgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0cmltKHN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvTG93ZXIoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyID8gc3RyLnRvTG93ZXJDYXNlKCkgOiAnJztcclxufVxyXG5cclxuZnVuY3Rpb24gdG9VcHBlcihzdHIpIHtcclxuICAgIHJldHVybiBzdHIgPyBzdHIudG9VcHBlckNhc2UoKSA6ICcnO1xyXG59XHJcblxyXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XHJcblxyXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNCb29sZWFuKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xyXG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcclxuICAgIHJldHVybiBpc09iamVjdChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09IE9iamVjdC5wcm90b3R5cGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQmxvYihvYmopIHtcclxuICAgIHJldHVybiB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqIGluc3RhbmNlb2YgQmxvYjtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNGb3JtRGF0YShvYmopIHtcclxuICAgIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEZvcm1EYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aGVuKHZhbHVlLCBmdWxmaWxsZWQsIHJlamVjdGVkKSB7XHJcblxyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlT2JqLnJlc29sdmUodmFsdWUpO1xyXG5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wdGlvbnMoZm4sIG9iaiwgb3B0cykge1xyXG5cclxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xyXG5cclxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdHMpKSB7XHJcbiAgICAgICAgb3B0cyA9IG9wdHMuY2FsbChvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZXJnZShmbi5iaW5kKHsgJHZtOiBvYmosICRvcHRpb25zOiBvcHRzIH0pLCBmbiwgeyAkb3B0aW9uczogb3B0cyB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yKSB7XHJcblxyXG4gICAgdmFyIGksIGtleTtcclxuXHJcbiAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKG9ialtpXSwgb2JqW2ldLCBpKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KG9iaikpIHtcclxuICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKG9ialtrZXldLCBvYmpba2V5XSwga2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBfYXNzaWduO1xyXG5cclxuZnVuY3Rpb24gbWVyZ2UodGFyZ2V0KSB7XHJcblxyXG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblxyXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICBfbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVmYXVsdHModGFyZ2V0KSB7XHJcblxyXG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblxyXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0W2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9hc3NpZ24odGFyZ2V0KSB7XHJcblxyXG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblxyXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICBfbWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuZnVuY3Rpb24gX21lcmdlKHRhcmdldCwgc291cmNlLCBkZWVwKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKGRlZXAgJiYgKGlzUGxhaW5PYmplY3Qoc291cmNlW2tleV0pIHx8IGlzQXJyYXkoc291cmNlW2tleV0pKSkge1xyXG4gICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkgJiYgIWlzUGxhaW5PYmplY3QodGFyZ2V0W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0FycmF5KHNvdXJjZVtrZXldKSAmJiAhaXNBcnJheSh0YXJnZXRba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX21lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgZGVlcCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzb3VyY2Vba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUm9vdCBQcmVmaXggVHJhbnNmb3JtLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHJvb3QgKG9wdGlvbnMsIG5leHQpIHtcclxuXHJcbiAgICB2YXIgdXJsID0gbmV4dChvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoaXNTdHJpbmcob3B0aW9ucy5yb290KSAmJiAhdXJsLm1hdGNoKC9eKGh0dHBzPzopP1xcLy8pKSB7XHJcbiAgICAgICAgdXJsID0gb3B0aW9ucy5yb290ICsgJy8nICsgdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1cmw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyeSBQYXJhbWV0ZXIgVHJhbnNmb3JtLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHF1ZXJ5IChvcHRpb25zLCBuZXh0KSB7XHJcblxyXG4gICAgdmFyIHVybFBhcmFtcyA9IE9iamVjdC5rZXlzKFVybC5vcHRpb25zLnBhcmFtcyksXHJcbiAgICAgICAgcXVlcnkgPSB7fSxcclxuICAgICAgICB1cmwgPSBuZXh0KG9wdGlvbnMpO1xyXG5cclxuICAgIGVhY2gob3B0aW9ucy5wYXJhbXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgaWYgKHVybFBhcmFtcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBxdWVyeSA9IFVybC5wYXJhbXMocXVlcnkpO1xyXG5cclxuICAgIGlmIChxdWVyeSkge1xyXG4gICAgICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PSAtMSA/ICc/JyA6ICcmJykgKyBxdWVyeTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJsO1xyXG59XHJcblxyXG4vKipcclxuICogVVJMIFRlbXBsYXRlIHYyLjAuNiAoaHR0cHM6Ly9naXRodWIuY29tL2JyYW1zdGVpbi91cmwtdGVtcGxhdGUpXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZXhwYW5kKHVybCwgcGFyYW1zLCB2YXJpYWJsZXMpIHtcclxuXHJcbiAgICB2YXIgdG1wbCA9IHBhcnNlKHVybCksXHJcbiAgICAgICAgZXhwYW5kZWQgPSB0bXBsLmV4cGFuZChwYXJhbXMpO1xyXG5cclxuICAgIGlmICh2YXJpYWJsZXMpIHtcclxuICAgICAgICB2YXJpYWJsZXMucHVzaC5hcHBseSh2YXJpYWJsZXMsIHRtcGwudmFycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGV4cGFuZGVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSkge1xyXG5cclxuICAgIHZhciBvcGVyYXRvcnMgPSBbJysnLCAnIycsICcuJywgJy8nLCAnOycsICc/JywgJyYnXSxcclxuICAgICAgICB2YXJpYWJsZXMgPSBbXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhcnM6IHZhcmlhYmxlcyxcclxuICAgICAgICBleHBhbmQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC9cXHsoW15cXHtcXH1dKylcXH18KFteXFx7XFx9XSspL2csIGZ1bmN0aW9uIChfLCBleHByZXNzaW9uLCBsaXRlcmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXhwcmVzc2lvbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BlcmF0b3IgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdG9ycy5pbmRleE9mKGV4cHJlc3Npb24uY2hhckF0KDApKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IgPSBleHByZXNzaW9uLmNoYXJBdCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24uc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5zcGxpdCgvLC9nKS5mb3JFYWNoKGZ1bmN0aW9uICh2YXJpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gLyhbXjpcXCpdKikoPzo6KFxcZCspfChcXCopKT8vLmV4ZWModmFyaWFibGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaC5hcHBseSh2YWx1ZXMsIGdldFZhbHVlcyhjb250ZXh0LCBvcGVyYXRvciwgdG1wWzFdLCB0bXBbMl0gfHwgdG1wWzNdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKHRtcFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvciAmJiBvcGVyYXRvciAhPT0gJysnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gJywnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnPycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvciA9ICcmJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3IgPSBvcGVyYXRvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZXMubGVuZ3RoICE9PSAwID8gb3BlcmF0b3IgOiAnJykgKyB2YWx1ZXMuam9pbihzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuam9pbignLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZVJlc2VydmVkKGxpdGVyYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRWYWx1ZXMoY29udGV4dCwgb3BlcmF0b3IsIGtleSwgbW9kaWZpZXIpIHtcclxuXHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0W2tleV0sXHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcblxyXG4gICAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkgJiYgdmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kaWZpZXIgJiYgbW9kaWZpZXIgIT09ICcqJykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgcGFyc2VJbnQobW9kaWZpZXIsIDEwKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwgaXNLZXlPcGVyYXRvcihvcGVyYXRvcikgPyBrZXkgOiBudWxsKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG1vZGlmaWVyID09PSAnKicpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmZpbHRlcihpc0RlZmluZWQpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwgaXNLZXlPcGVyYXRvcihvcGVyYXRvcikgPyBrZXkgOiBudWxsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZmluZWQodmFsdWVba10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWVba10sIGspKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmZpbHRlcihpc0RlZmluZWQpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHZhbHVlW2tdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGspKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZVtrXS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNLZXlPcGVyYXRvcihvcGVyYXRvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIHRtcC5qb2luKCcsJykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXAubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godG1wLmpvaW4oJywnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJzsnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnJyAmJiAob3BlcmF0b3IgPT09ICcmJyB8fCBvcGVyYXRvciA9PT0gJz8nKSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0RlZmluZWQodmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0tleU9wZXJhdG9yKG9wZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gb3BlcmF0b3IgPT09ICc7JyB8fCBvcGVyYXRvciA9PT0gJyYnIHx8IG9wZXJhdG9yID09PSAnPyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgdmFsdWUgPSBvcGVyYXRvciA9PT0gJysnIHx8IG9wZXJhdG9yID09PSAnIycgPyBlbmNvZGVSZXNlcnZlZCh2YWx1ZSkgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBlbmNvZGVSZXNlcnZlZChzdHIpIHtcclxuICAgIHJldHVybiBzdHIuc3BsaXQoLyglWzAtOUEtRmEtZl17Mn0pL2cpLm1hcChmdW5jdGlvbiAocGFydCkge1xyXG4gICAgICAgIGlmICghLyVbMC05QS1GYS1mXS8udGVzdChwYXJ0KSkge1xyXG4gICAgICAgICAgICBwYXJ0ID0gZW5jb2RlVVJJKHBhcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFydDtcclxuICAgIH0pLmpvaW4oJycpO1xyXG59XHJcblxyXG4vKipcclxuICogVVJMIFRlbXBsYXRlIChSRkMgNjU3MCkgVHJhbnNmb3JtLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHRlbXBsYXRlIChvcHRpb25zKSB7XHJcblxyXG4gICAgdmFyIHZhcmlhYmxlcyA9IFtdLFxyXG4gICAgICAgIHVybCA9IGV4cGFuZChvcHRpb25zLnVybCwgb3B0aW9ucy5wYXJhbXMsIHZhcmlhYmxlcyk7XHJcblxyXG4gICAgdmFyaWFibGVzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLnBhcmFtc1trZXldO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgZm9yIFVSTCB0ZW1wbGF0aW5nLlxyXG4gKi9cclxuXHJcbnZhciBpZSA9IGRvY3VtZW50LmRvY3VtZW50TW9kZTtcclxudmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuZnVuY3Rpb24gVXJsKHVybCwgcGFyYW1zKSB7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzIHx8IHt9LFxyXG4gICAgICAgIG9wdGlvbnMgPSB1cmwsXHJcbiAgICAgICAgdHJhbnNmb3JtO1xyXG5cclxuICAgIGlmIChpc1N0cmluZyh1cmwpKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IHsgdXJsOiB1cmwsIHBhcmFtczogcGFyYW1zIH07XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKHt9LCBVcmwub3B0aW9ucywgc2VsZi4kb3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgVXJsLnRyYW5zZm9ybXMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgIHRyYW5zZm9ybSA9IGZhY3RvcnkoaGFuZGxlciwgdHJhbnNmb3JtLCBzZWxmLiR2bSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtKG9wdGlvbnMpO1xyXG59XHJcblxyXG4vKipcclxuICogVXJsIG9wdGlvbnMuXHJcbiAqL1xyXG5cclxuVXJsLm9wdGlvbnMgPSB7XHJcbiAgICB1cmw6ICcnLFxyXG4gICAgcm9vdDogbnVsbCxcclxuICAgIHBhcmFtczoge31cclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcmwgdHJhbnNmb3Jtcy5cclxuICovXHJcblxyXG5VcmwudHJhbnNmb3JtcyA9IFt0ZW1wbGF0ZSwgcXVlcnksIHJvb3RdO1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZXMgYSBVcmwgcGFyYW1ldGVyIHN0cmluZy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKi9cclxuXHJcblVybC5wYXJhbXMgPSBmdW5jdGlvbiAob2JqKSB7XHJcblxyXG4gICAgdmFyIHBhcmFtcyA9IFtdLFxyXG4gICAgICAgIGVzY2FwZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcclxuXHJcbiAgICBwYXJhbXMuYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wdXNoKGVzY2FwZShrZXkpICsgJz0nICsgZXNjYXBlKHZhbHVlKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlcmlhbGl6ZShwYXJhbXMsIG9iaik7XHJcblxyXG4gICAgcmV0dXJuIHBhcmFtcy5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csICcrJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyc2UgYSBVUkwgYW5kIHJldHVybiBpdHMgY29tcG9uZW50cy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxyXG4gKi9cclxuXHJcblVybC5wYXJzZSA9IGZ1bmN0aW9uICh1cmwpIHtcclxuXHJcbiAgICBpZiAoaWUpIHtcclxuICAgICAgICBlbC5ocmVmID0gdXJsO1xyXG4gICAgICAgIHVybCA9IGVsLmhyZWY7XHJcbiAgICB9XHJcblxyXG4gICAgZWwuaHJlZiA9IHVybDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGhyZWY6IGVsLmhyZWYsXHJcbiAgICAgICAgcHJvdG9jb2w6IGVsLnByb3RvY29sID8gZWwucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcclxuICAgICAgICBwb3J0OiBlbC5wb3J0LFxyXG4gICAgICAgIGhvc3Q6IGVsLmhvc3QsXHJcbiAgICAgICAgaG9zdG5hbWU6IGVsLmhvc3RuYW1lLFxyXG4gICAgICAgIHBhdGhuYW1lOiBlbC5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyA/IGVsLnBhdGhuYW1lIDogJy8nICsgZWwucGF0aG5hbWUsXHJcbiAgICAgICAgc2VhcmNoOiBlbC5zZWFyY2ggPyBlbC5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxyXG4gICAgICAgIGhhc2g6IGVsLmhhc2ggPyBlbC5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJydcclxuICAgIH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmYWN0b3J5KGhhbmRsZXIsIG5leHQsIHZtKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gaGFuZGxlci5jYWxsKHZtLCBvcHRpb25zLCBuZXh0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZShwYXJhbXMsIG9iaiwgc2NvcGUpIHtcclxuXHJcbiAgICB2YXIgYXJyYXkgPSBpc0FycmF5KG9iaiksXHJcbiAgICAgICAgcGxhaW4gPSBpc1BsYWluT2JqZWN0KG9iaiksXHJcbiAgICAgICAgaGFzaDtcclxuXHJcbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICAgICAgaGFzaCA9IGlzT2JqZWN0KHZhbHVlKSB8fCBpc0FycmF5KHZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHNjb3BlKSB7XHJcbiAgICAgICAgICAgIGtleSA9IHNjb3BlICsgJ1snICsgKHBsYWluIHx8IGhhc2ggPyBrZXkgOiAnJykgKyAnXSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNjb3BlICYmIGFycmF5KSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5hZGQodmFsdWUubmFtZSwgdmFsdWUudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaCkge1xyXG4gICAgICAgICAgICBzZXJpYWxpemUocGFyYW1zLCB2YWx1ZSwga2V5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJhbXMuYWRkKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogWERvbWFpbiBjbGllbnQgKEludGVybmV0IEV4cGxvcmVyKS5cclxuICovXHJcblxyXG5mdW5jdGlvbiB4ZHJDbGllbnQgKHJlcXVlc3QpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaihmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG5cclxuICAgICAgICB2YXIgeGRyID0gbmV3IFhEb21haW5SZXF1ZXN0KCksXHJcbiAgICAgICAgICAgIGhhbmRsZXIgPSBmdW5jdGlvbiAoX3JlZikge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IF9yZWYudHlwZTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnbG9hZCcpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSA1MDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXNwb25kV2l0aCh4ZHIucmVzcG9uc2VUZXh0LCB7IHN0YXR1czogc3RhdHVzIH0pKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXF1ZXN0LmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geGRyLmFib3J0KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGRyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QuZ2V0VXJsKCkpO1xyXG4gICAgICAgIHhkci50aW1lb3V0ID0gMDtcclxuICAgICAgICB4ZHIub25sb2FkID0gaGFuZGxlcjtcclxuICAgICAgICB4ZHIub25lcnJvciA9IGhhbmRsZXI7XHJcbiAgICAgICAgeGRyLm9udGltZW91dCA9IGhhbmRsZXI7XHJcbiAgICAgICAgeGRyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgICB4ZHIuc2VuZChyZXF1ZXN0LmdldEJvZHkoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENPUlMgSW50ZXJjZXB0b3IuXHJcbiAqL1xyXG5cclxudmFyIE9SSUdJTl9VUkwgPSBVcmwucGFyc2UobG9jYXRpb24uaHJlZik7XHJcbnZhciBTVVBQT1JUU19DT1JTID0gJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5mdW5jdGlvbiBjb3JzIChyZXF1ZXN0LCBuZXh0KSB7XHJcblxyXG4gICAgaWYgKCFpc0Jvb2xlYW4ocmVxdWVzdC5jcm9zc09yaWdpbikgJiYgY3Jvc3NPcmlnaW4ocmVxdWVzdCkpIHtcclxuICAgICAgICByZXF1ZXN0LmNyb3NzT3JpZ2luID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVxdWVzdC5jcm9zc09yaWdpbikge1xyXG5cclxuICAgICAgICBpZiAoIVNVUFBPUlRTX0NPUlMpIHtcclxuICAgICAgICAgICAgcmVxdWVzdC5jbGllbnQgPSB4ZHJDbGllbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgcmVxdWVzdC5lbXVsYXRlSFRUUDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyb3NzT3JpZ2luKHJlcXVlc3QpIHtcclxuXHJcbiAgICB2YXIgcmVxdWVzdFVybCA9IFVybC5wYXJzZShVcmwocmVxdWVzdCkpO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0VXJsLnByb3RvY29sICE9PSBPUklHSU5fVVJMLnByb3RvY29sIHx8IHJlcXVlc3RVcmwuaG9zdCAhPT0gT1JJR0lOX1VSTC5ob3N0O1xyXG59XHJcblxyXG4vKipcclxuICogQm9keSBJbnRlcmNlcHRvci5cclxuICovXHJcblxyXG5mdW5jdGlvbiBib2R5IChyZXF1ZXN0LCBuZXh0KSB7XHJcblxyXG4gICAgaWYgKGlzRm9ybURhdGEocmVxdWVzdC5ib2R5KSkge1xyXG5cclxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZGVsZXRlKCdDb250ZW50LVR5cGUnKTtcclxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocmVxdWVzdC5ib2R5KSB8fCBpc0FycmF5KHJlcXVlc3QuYm9keSkpIHtcclxuXHJcbiAgICAgICAgaWYgKHJlcXVlc3QuZW11bGF0ZUpTT04pIHtcclxuICAgICAgICAgICAgcmVxdWVzdC5ib2R5ID0gVXJsLnBhcmFtcyhyZXF1ZXN0LmJvZHkpO1xyXG4gICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVxdWVzdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3BvbnNlLCAnZGF0YScsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib2R5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChib2R5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5VGV4dCA/IHdoZW4ocmVzcG9uc2UudGV4dCgpLCBmdW5jdGlvbiAodGV4dCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcodHlwZSkgJiYgdHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBKU09OLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IHRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9KSA6IHJlc3BvbnNlO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBKU09OUCBjbGllbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24ganNvbnBDbGllbnQgKHJlcXVlc3QpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaihmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG5cclxuICAgICAgICB2YXIgbmFtZSA9IHJlcXVlc3QuanNvbnAgfHwgJ2NhbGxiYWNrJyxcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSAnX2pzb25wJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSxcclxuICAgICAgICAgICAgYm9keSA9IG51bGwsXHJcbiAgICAgICAgICAgIGhhbmRsZXIsXHJcbiAgICAgICAgICAgIHNjcmlwdDtcclxuXHJcbiAgICAgICAgaGFuZGxlciA9IGZ1bmN0aW9uIChfcmVmKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gX3JlZi50eXBlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdsb2FkJyAmJiBib2R5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gNTAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzcG9uZFdpdGgoYm9keSwgeyBzdGF0dXM6IHN0YXR1cyB9KSk7XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrXTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3QucGFyYW1zW25hbWVdID0gY2FsbGJhY2s7XHJcblxyXG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSByZXF1ZXN0LmdldFVybCgpO1xyXG4gICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuICAgICAgICBzY3JpcHQub25sb2FkID0gaGFuZGxlcjtcclxuICAgICAgICBzY3JpcHQub25lcnJvciA9IGhhbmRsZXI7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSlNPTlAgSW50ZXJjZXB0b3IuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24ganNvbnAgKHJlcXVlc3QsIG5leHQpIHtcclxuXHJcbiAgICBpZiAocmVxdWVzdC5tZXRob2QgPT0gJ0pTT05QJykge1xyXG4gICAgICAgIHJlcXVlc3QuY2xpZW50ID0ganNvbnBDbGllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgaWYgKHJlcXVlc3QubWV0aG9kID09ICdKU09OUCcpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB3aGVuKHJlc3BvbnNlLmpzb24oKSwgZnVuY3Rpb24gKGpzb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5ib2R5ID0ganNvbjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQmVmb3JlIEludGVyY2VwdG9yLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGJlZm9yZSAocmVxdWVzdCwgbmV4dCkge1xyXG5cclxuICAgIGlmIChpc0Z1bmN0aW9uKHJlcXVlc3QuYmVmb3JlKSkge1xyXG4gICAgICAgIHJlcXVlc3QuYmVmb3JlLmNhbGwodGhpcywgcmVxdWVzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpO1xyXG59XHJcblxyXG4vKipcclxuICogSFRUUCBtZXRob2Qgb3ZlcnJpZGUgSW50ZXJjZXB0b3IuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWV0aG9kIChyZXF1ZXN0LCBuZXh0KSB7XHJcblxyXG4gICAgaWYgKHJlcXVlc3QuZW11bGF0ZUhUVFAgJiYgL14oUFVUfFBBVENIfERFTEVURSkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcclxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdYLUhUVFAtTWV0aG9kLU92ZXJyaWRlJywgcmVxdWVzdC5tZXRob2QpO1xyXG4gICAgICAgIHJlcXVlc3QubWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhlYWRlciBJbnRlcmNlcHRvci5cclxuICovXHJcblxyXG5mdW5jdGlvbiBoZWFkZXIgKHJlcXVlc3QsIG5leHQpIHtcclxuXHJcbiAgICB2YXIgaGVhZGVycyA9IGFzc2lnbih7fSwgSHR0cC5oZWFkZXJzLmNvbW1vbiwgIXJlcXVlc3QuY3Jvc3NPcmlnaW4gPyBIdHRwLmhlYWRlcnMuY3VzdG9tIDoge30sIEh0dHAuaGVhZGVyc1t0b0xvd2VyKHJlcXVlc3QubWV0aG9kKV0pO1xyXG5cclxuICAgIGVhY2goaGVhZGVycywgZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0LmhlYWRlcnMuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG5leHQoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRpbWVvdXQgSW50ZXJjZXB0b3IuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gdGltZW91dCAocmVxdWVzdCwgbmV4dCkge1xyXG5cclxuICAgIHZhciB0aW1lb3V0O1xyXG5cclxuICAgIGlmIChyZXF1ZXN0LnRpbWVvdXQpIHtcclxuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcclxuICAgICAgICB9LCByZXF1ZXN0LnRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogWE1MSHR0cCBjbGllbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24geGhyQ2xpZW50IChyZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2VPYmooZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuXHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxyXG4gICAgICAgICAgICBoYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbmRXaXRoKCdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dCwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogeGhyLnN0YXR1cywgLy8gSUU5IHN0YXR1cyBidWdcclxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiB0cmltKHhoci5zdGF0dXNUZXh0KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGVhY2godHJpbSh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5hcHBlbmQocm93LnNsaWNlKDAsIHJvdy5pbmRleE9mKCc6JykpLCByb3cuc2xpY2Uocm93LmluZGV4T2YoJzonKSArIDEpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXF1ZXN0LmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geGhyLmFib3J0KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHJlcXVlc3QucHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcmVxdWVzdC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoL14oUE9TVHxQVVQpJC9pLnRlc3QocmVxdWVzdC5tZXRob2QpKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcmVxdWVzdC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LmdldFVybCgpLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhocikge1xyXG4gICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB4aHIudGltZW91dCA9IDA7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGhhbmRsZXI7XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBoYW5kbGVyO1xyXG4gICAgICAgIHhoci5zZW5kKHJlcXVlc3QuZ2V0Qm9keSgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQmFzZSBjbGllbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gQ2xpZW50IChjb250ZXh0KSB7XHJcblxyXG4gICAgdmFyIHJlcUhhbmRsZXJzID0gW3NlbmRSZXF1ZXN0XSxcclxuICAgICAgICByZXNIYW5kbGVycyA9IFtdLFxyXG4gICAgICAgIGhhbmRsZXI7XHJcblxyXG4gICAgaWYgKCFpc09iamVjdChjb250ZXh0KSkge1xyXG4gICAgICAgIGNvbnRleHQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIENsaWVudChyZXF1ZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlT2JqKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBleGVjKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXIgPSByZXFIYW5kbGVycy5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbChjb250ZXh0LCByZXF1ZXN0LCBuZXh0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FybignSW52YWxpZCBpbnRlcmNlcHRvciBvZiB0eXBlICcgKyB0eXBlb2YgaGFuZGxlciArICcsIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbmV4dChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHJlc3BvbnNlKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNIYW5kbGVycy51bnNoaWZ0KHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocmVzcG9uc2UpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc0hhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB3aGVuKHJlc3BvbnNlLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwoY29udGV4dCwgcmVzcG9uc2UpIHx8IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hlbihyZXNwb25zZSwgcmVzb2x2ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBleGVjKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV4ZWMoKTtcclxuICAgICAgICB9LCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBDbGllbnQudXNlID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICByZXFIYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gQ2xpZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kUmVxdWVzdChyZXF1ZXN0LCByZXNvbHZlKSB7XHJcblxyXG4gICAgdmFyIGNsaWVudCA9IHJlcXVlc3QuY2xpZW50IHx8IHhockNsaWVudDtcclxuXHJcbiAgICByZXNvbHZlKGNsaWVudChyZXF1ZXN0KSk7XHJcbn1cclxuXHJcbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcclxuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSFRUUCBIZWFkZXJzLlxyXG4gKi9cclxuXHJcbnZhciBIZWFkZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgSGVhZGVycyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IHt9O1xyXG5cclxuICAgICAgICBlYWNoKGhlYWRlcnMsIGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBnZXROYW1lKHRoaXMubWFwLCBuYW1lKSAhPT0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KG5hbWUpIHtcclxuXHJcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtnZXROYW1lKHRoaXMubWFwLCBuYW1lKV07XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0ID8gbGlzdFswXSA6IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIEhlYWRlcnMucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uIGdldEFsbChuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwW2dldE5hbWUodGhpcy5tYXAsIG5hbWUpXSB8fCBbXTtcclxuICAgIH07XHJcblxyXG4gICAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShnZXROYW1lKHRoaXMubWFwLCBuYW1lKSB8fCBuYW1lKV0gPSBbdHJpbSh2YWx1ZSldO1xyXG4gICAgfTtcclxuXHJcbiAgICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLmdldEFsbChuYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0cmltKHZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgSGVhZGVycy5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gX2RlbGV0ZShuYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubWFwW2dldE5hbWUodGhpcy5tYXAsIG5hbWUpXTtcclxuICAgIH07XHJcblxyXG4gICAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcclxuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcclxuXHJcbiAgICAgICAgZWFjaCh0aGlzLm1hcCwgZnVuY3Rpb24gKGxpc3QsIG5hbWUpIHtcclxuICAgICAgICAgICAgZWFjaChsaXN0LCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCBfdGhpczIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIEhlYWRlcnM7XHJcbn0oKTtcclxuXHJcbmZ1bmN0aW9uIGdldE5hbWUobWFwLCBuYW1lKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobWFwKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHtcclxuICAgICAgICByZXR1cm4gdG9Mb3dlcihuYW1lKSA9PT0gdG9Mb3dlcihjdXJyKSA/IGN1cnIgOiBwcmV2O1xyXG4gICAgfSwgbnVsbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xyXG5cclxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyaW0obmFtZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIVFRQIFJlc3BvbnNlLlxyXG4gKi9cclxuXHJcbnZhciBSZXNwb25zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHksIF9yZWYpIHtcclxuICAgICAgICB2YXIgdXJsID0gX3JlZi51cmw7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBfcmVmLmhlYWRlcnM7XHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IF9yZWYuc3RhdHVzO1xyXG4gICAgICAgIHZhciBzdGF0dXNUZXh0ID0gX3JlZi5zdGF0dXNUZXh0O1xyXG4gICAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFJlc3BvbnNlKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMub2sgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cyB8fCAwO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaGVhZGVycyk7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcclxuXHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKGJvZHkpKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvZHlUZXh0ID0gYm9keTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ib2R5QmxvYiA9IGJvZHk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNCbG9iVGV4dChib2R5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5VGV4dCA9IGJsb2JUZXh0KGJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFJlc3BvbnNlLnByb3RvdHlwZS5ibG9iID0gZnVuY3Rpb24gYmxvYigpIHtcclxuICAgICAgICByZXR1cm4gd2hlbih0aGlzLmJvZHlCbG9iKTtcclxuICAgIH07XHJcblxyXG4gICAgUmVzcG9uc2UucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbiB0ZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB3aGVuKHRoaXMuYm9keVRleHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBSZXNwb25zZS5wcm90b3R5cGUuanNvbiA9IGZ1bmN0aW9uIGpzb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHdoZW4odGhpcy50ZXh0KCksIGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gUmVzcG9uc2U7XHJcbn0oKTtcclxuXHJcbmZ1bmN0aW9uIGJsb2JUZXh0KGJvZHkpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaihmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG5cclxuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoYm9keSk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQmxvYlRleHQoYm9keSkge1xyXG4gICAgcmV0dXJuIGJvZHkudHlwZS5pbmRleE9mKCd0ZXh0JykgPT09IDAgfHwgYm9keS50eXBlLmluZGV4T2YoJ2pzb24nKSAhPT0gLTE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIVFRQIFJlcXVlc3QuXHJcbiAqL1xyXG5cclxudmFyIFJlcXVlc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBSZXF1ZXN0KG9wdGlvbnMpIHtcclxuICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBSZXF1ZXN0KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYm9keSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7fTtcclxuXHJcbiAgICAgICAgYXNzaWduKHRoaXMsIG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiB0b1VwcGVyKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoISh0aGlzLmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIFVybCh0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgUmVxdWVzdC5wcm90b3R5cGUuZ2V0Qm9keSA9IGZ1bmN0aW9uIGdldEJvZHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9keTtcclxuICAgIH07XHJcblxyXG4gICAgUmVxdWVzdC5wcm90b3R5cGUucmVzcG9uZFdpdGggPSBmdW5jdGlvbiByZXNwb25kV2l0aChib2R5LCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShib2R5LCBhc3NpZ24ob3B0aW9ucyB8fCB7fSwgeyB1cmw6IHRoaXMuZ2V0VXJsKCkgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gUmVxdWVzdDtcclxufSgpO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgZm9yIHNlbmRpbmcgbmV0d29yayByZXF1ZXN0cy5cclxuICovXHJcblxyXG52YXIgQ1VTVE9NX0hFQURFUlMgPSB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9O1xyXG52YXIgQ09NTU9OX0hFQURFUlMgPSB7ICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyB9O1xyXG52YXIgSlNPTl9DT05URU5UX1RZUEUgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JyB9O1xyXG5cclxuZnVuY3Rpb24gSHR0cChvcHRpb25zKSB7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzIHx8IHt9LFxyXG4gICAgICAgIGNsaWVudCA9IENsaWVudChzZWxmLiR2bSk7XHJcblxyXG4gICAgZGVmYXVsdHMob3B0aW9ucyB8fCB7fSwgc2VsZi4kb3B0aW9ucywgSHR0cC5vcHRpb25zKTtcclxuXHJcbiAgICBIdHRwLmludGVyY2VwdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgY2xpZW50LnVzZShoYW5kbGVyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjbGllbnQobmV3IFJlcXVlc3Qob3B0aW9ucykpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayA/IHJlc3BvbnNlIDogUHJvbWlzZU9iai5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIGVycm9yKHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlT2JqLnJlamVjdChyZXNwb25zZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuSHR0cC5vcHRpb25zID0ge307XHJcblxyXG5IdHRwLmhlYWRlcnMgPSB7XHJcbiAgICBwdXQ6IEpTT05fQ09OVEVOVF9UWVBFLFxyXG4gICAgcG9zdDogSlNPTl9DT05URU5UX1RZUEUsXHJcbiAgICBwYXRjaDogSlNPTl9DT05URU5UX1RZUEUsXHJcbiAgICBkZWxldGU6IEpTT05fQ09OVEVOVF9UWVBFLFxyXG4gICAgY3VzdG9tOiBDVVNUT01fSEVBREVSUyxcclxuICAgIGNvbW1vbjogQ09NTU9OX0hFQURFUlNcclxufTtcclxuXHJcbkh0dHAuaW50ZXJjZXB0b3JzID0gW2JlZm9yZSwgdGltZW91dCwgbWV0aG9kLCBib2R5LCBqc29ucCwgaGVhZGVyLCBjb3JzXTtcclxuXHJcblsnZ2V0JywgJ2RlbGV0ZScsICdoZWFkJywgJ2pzb25wJ10uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcblxyXG4gICAgSHR0cFttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzKGFzc2lnbihvcHRpb25zIHx8IHt9LCB7IHVybDogdXJsLCBtZXRob2Q6IG1ldGhvZCB9KSk7XHJcbiAgICB9O1xyXG59KTtcclxuXHJcblsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuXHJcbiAgICBIdHRwW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBib2R5LCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMoYXNzaWduKG9wdGlvbnMgfHwge30sIHsgdXJsOiB1cmwsIG1ldGhvZDogbWV0aG9kLCBib2R5OiBib2R5IH0pKTtcclxuICAgIH07XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgZm9yIGludGVyYWN0aW5nIHdpdGggUkVTVGZ1bCBzZXJ2aWNlcy5cclxuICovXHJcblxyXG5mdW5jdGlvbiBSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucywgb3B0aW9ucykge1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcyB8fCB7fSxcclxuICAgICAgICByZXNvdXJjZSA9IHt9O1xyXG5cclxuICAgIGFjdGlvbnMgPSBhc3NpZ24oe30sIFJlc291cmNlLmFjdGlvbnMsIGFjdGlvbnMpO1xyXG5cclxuICAgIGVhY2goYWN0aW9ucywgZnVuY3Rpb24gKGFjdGlvbiwgbmFtZSkge1xyXG5cclxuICAgICAgICBhY3Rpb24gPSBtZXJnZSh7IHVybDogdXJsLCBwYXJhbXM6IGFzc2lnbih7fSwgcGFyYW1zKSB9LCBvcHRpb25zLCBhY3Rpb24pO1xyXG5cclxuICAgICAgICByZXNvdXJjZVtuYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChzZWxmLiRodHRwIHx8IEh0dHApKG9wdHMoYWN0aW9uLCBhcmd1bWVudHMpKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc291cmNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcHRzKGFjdGlvbiwgYXJncykge1xyXG5cclxuICAgIHZhciBvcHRpb25zID0gYXNzaWduKHt9LCBhY3Rpb24pLFxyXG4gICAgICAgIHBhcmFtcyA9IHt9LFxyXG4gICAgICAgIGJvZHk7XHJcblxyXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xyXG5cclxuICAgICAgICBjYXNlIDI6XHJcblxyXG4gICAgICAgICAgICBwYXJhbXMgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICBib2R5ID0gYXJnc1sxXTtcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE6XHJcblxyXG4gICAgICAgICAgICBpZiAoL14oUE9TVHxQVVR8UEFUQ0gpJC9pLnRlc3Qob3B0aW9ucy5tZXRob2QpKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5ID0gYXJnc1swXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGFyZ3NbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDA6XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgIHRocm93ICdFeHBlY3RlZCB1cCB0byA0IGFyZ3VtZW50cyBbcGFyYW1zLCBib2R5XSwgZ290ICcgKyBhcmdzLmxlbmd0aCArICcgYXJndW1lbnRzJztcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25zLmJvZHkgPSBib2R5O1xyXG4gICAgb3B0aW9ucy5wYXJhbXMgPSBhc3NpZ24oe30sIG9wdGlvbnMucGFyYW1zLCBwYXJhbXMpO1xyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG59XHJcblxyXG5SZXNvdXJjZS5hY3Rpb25zID0ge1xyXG5cclxuICAgIGdldDogeyBtZXRob2Q6ICdHRVQnIH0sXHJcbiAgICBzYXZlOiB7IG1ldGhvZDogJ1BPU1QnIH0sXHJcbiAgICBxdWVyeTogeyBtZXRob2Q6ICdHRVQnIH0sXHJcbiAgICB1cGRhdGU6IHsgbWV0aG9kOiAnUFVUJyB9LFxyXG4gICAgcmVtb3ZlOiB7IG1ldGhvZDogJ0RFTEVURScgfSxcclxuICAgIGRlbGV0ZTogeyBtZXRob2Q6ICdERUxFVEUnIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogSW5zdGFsbCBwbHVnaW4uXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcGx1Z2luKFZ1ZSkge1xyXG5cclxuICAgIGlmIChwbHVnaW4uaW5zdGFsbGVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIFV0aWwoVnVlKTtcclxuXHJcbiAgICBWdWUudXJsID0gVXJsO1xyXG4gICAgVnVlLmh0dHAgPSBIdHRwO1xyXG4gICAgVnVlLnJlc291cmNlID0gUmVzb3VyY2U7XHJcbiAgICBWdWUuUHJvbWlzZSA9IFByb21pc2VPYmo7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVnVlLnByb3RvdHlwZSwge1xyXG5cclxuICAgICAgICAkdXJsOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMoVnVlLnVybCwgdGhpcywgdGhpcy4kb3B0aW9ucy51cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgJGh0dHA6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucyhWdWUuaHR0cCwgdGhpcywgdGhpcy4kb3B0aW9ucy5odHRwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICRyZXNvdXJjZToge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWdWUucmVzb3VyY2UuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICRwcm9taXNlOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4ZWN1dG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWdWUuUHJvbWlzZShleGVjdXRvciwgX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcclxuICAgIHdpbmRvdy5WdWUudXNlKHBsdWdpbik7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGx1Z2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtcmVzb3VyY2UvZGlzdC92dWUtcmVzb3VyY2UuY29tbW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDQ0E7QUFDQTtBQURBO0FBSEE7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdHZQQTtBQUNBOzs7OztBQUNBO0FGQ0E7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBckJBO0FBQ0E7QUFnQ0E7Ozs7Ozs7O0FHbkNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FIQ0E7QUFDQTs7Ozs7OztBSVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNytDQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==