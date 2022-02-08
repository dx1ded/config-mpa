/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/vanilla-lazyload/dist/lazyload.js":
/*!********************************************************!*\
  !*** ./node_modules/vanilla-lazyload/dist/lazyload.js ***!
  \********************************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var runningOnBrowser = typeof window !== "undefined";
  var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
  var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;
  var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");
  var isHiDpi = runningOnBrowser && window.devicePixelRatio > 1;

  var defaultSettings = {
    elements_selector: ".lazy",
    container: isBot || runningOnBrowser ? document : null,
    threshold: 300,
    thresholds: null,
    data_src: "src",
    data_srcset: "srcset",
    data_sizes: "sizes",
    data_bg: "bg",
    data_bg_hidpi: "bg-hidpi",
    data_bg_multi: "bg-multi",
    data_bg_multi_hidpi: "bg-multi-hidpi",
    data_poster: "poster",
    class_applied: "applied",
    class_loading: "loading",
    class_loaded: "loaded",
    class_error: "error",
    class_entered: "entered",
    class_exited: "exited",
    unobserve_completed: true,
    unobserve_entered: false,
    cancel_on_exit: true,
    callback_enter: null,
    callback_exit: null,
    callback_applied: null,
    callback_loading: null,
    callback_loaded: null,
    callback_error: null,
    callback_finish: null,
    callback_cancel: null,
    use_native: false
  };
  var getExtendedSettings = function getExtendedSettings(customSettings) {
    return _extends({}, defaultSettings, customSettings);
  };

  /* Creates instance and notifies it through the window element */
  var createInstance = function createInstance(classObj, options) {
    var event;
    var eventString = "LazyLoad::Initialized";
    var instance = new classObj(options);

    try {
      // Works in modern browsers
      event = new CustomEvent(eventString, {
        detail: {
          instance: instance
        }
      });
    } catch (err) {
      // Works in Internet Explorer (all versions)
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventString, false, false, {
        instance: instance
      });
    }

    window.dispatchEvent(event);
  };
  /* Auto initialization of one or more instances of lazyload, depending on the 
      options passed in (plain object or an array) */


  var autoInitialize = function autoInitialize(classObj, options) {
    if (!options) {
      return;
    }

    if (!options.length) {
      // Plain object
      createInstance(classObj, options);
    } else {
      // Array of objects
      for (var i = 0, optionsItem; optionsItem = options[i]; i += 1) {
        createInstance(classObj, optionsItem);
      }
    }
  };

  var SRC = "src";
  var SRCSET = "srcset";
  var SIZES = "sizes";
  var POSTER = "poster";
  var ORIGINALS = "llOriginalAttrs";

  var statusLoading = "loading";
  var statusLoaded = "loaded";
  var statusApplied = "applied";
  var statusEntered = "entered";
  var statusError = "error";
  var statusNative = "native";

  var dataPrefix = "data-";
  var statusDataName = "ll-status";
  var getData = function getData(element, attribute) {
    return element.getAttribute(dataPrefix + attribute);
  };
  var setData = function setData(element, attribute, value) {
    var attrName = dataPrefix + attribute;

    if (value === null) {
      element.removeAttribute(attrName);
      return;
    }

    element.setAttribute(attrName, value);
  };
  var getStatus = function getStatus(element) {
    return getData(element, statusDataName);
  };
  var setStatus = function setStatus(element, status) {
    return setData(element, statusDataName, status);
  };
  var resetStatus = function resetStatus(element) {
    return setStatus(element, null);
  };
  var hasEmptyStatus = function hasEmptyStatus(element) {
    return getStatus(element) === null;
  };
  var hasStatusLoading = function hasStatusLoading(element) {
    return getStatus(element) === statusLoading;
  };
  var hasStatusError = function hasStatusError(element) {
    return getStatus(element) === statusError;
  };
  var hasStatusNative = function hasStatusNative(element) {
    return getStatus(element) === statusNative;
  };
  var statusesAfterLoading = [statusLoading, statusLoaded, statusApplied, statusError];
  var hadStartedLoading = function hadStartedLoading(element) {
    return statusesAfterLoading.indexOf(getStatus(element)) >= 0;
  };

  var safeCallback = function safeCallback(callback, arg1, arg2, arg3) {
    if (!callback) {
      return;
    }

    if (arg3 !== undefined) {
      callback(arg1, arg2, arg3);
      return;
    }

    if (arg2 !== undefined) {
      callback(arg1, arg2);
      return;
    }

    callback(arg1);
  };

  var addClass = function addClass(element, className) {
    if (supportsClassList) {
      element.classList.add(className);
      return;
    }

    element.className += (element.className ? " " : "") + className;
  };
  var removeClass = function removeClass(element, className) {
    if (supportsClassList) {
      element.classList.remove(className);
      return;
    }

    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
  };

  var addTempImage = function addTempImage(element) {
    element.llTempImage = document.createElement("IMG");
  };
  var deleteTempImage = function deleteTempImage(element) {
    delete element.llTempImage;
  };
  var getTempImage = function getTempImage(element) {
    return element.llTempImage;
  };

  var unobserve = function unobserve(element, instance) {
    if (!instance) return;
    var observer = instance._observer;
    if (!observer) return;
    observer.unobserve(element);
  };
  var resetObserver = function resetObserver(observer) {
    observer.disconnect();
  };
  var unobserveEntered = function unobserveEntered(element, settings, instance) {
    if (settings.unobserve_entered) unobserve(element, instance);
  };

  var updateLoadingCount = function updateLoadingCount(instance, delta) {
    if (!instance) return;
    instance.loadingCount += delta;
  };
  var decreaseToLoadCount = function decreaseToLoadCount(instance) {
    if (!instance) return;
    instance.toLoadCount -= 1;
  };
  var setToLoadCount = function setToLoadCount(instance, value) {
    if (!instance) return;
    instance.toLoadCount = value;
  };
  var isSomethingLoading = function isSomethingLoading(instance) {
    return instance.loadingCount > 0;
  };
  var haveElementsToLoad = function haveElementsToLoad(instance) {
    return instance.toLoadCount > 0;
  };

  var getSourceTags = function getSourceTags(parentTag) {
    var sourceTags = [];

    for (var i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
      if (childTag.tagName === "SOURCE") {
        sourceTags.push(childTag);
      }
    }

    return sourceTags;
  };

  var forEachPictureSource = function forEachPictureSource(element, fn) {
    var parent = element.parentNode;

    if (!parent || parent.tagName !== "PICTURE") {
      return;
    }

    var sourceTags = getSourceTags(parent);
    sourceTags.forEach(fn);
  };
  var forEachVideoSource = function forEachVideoSource(element, fn) {
    var sourceTags = getSourceTags(element);
    sourceTags.forEach(fn);
  };

  var attrsSrc = [SRC];
  var attrsSrcPoster = [SRC, POSTER];
  var attrsSrcSrcsetSizes = [SRC, SRCSET, SIZES];
  var hasOriginalAttrs = function hasOriginalAttrs(element) {
    return !!element[ORIGINALS];
  };
  var getOriginalAttrs = function getOriginalAttrs(element) {
    return element[ORIGINALS];
  };
  var deleteOriginalAttrs = function deleteOriginalAttrs(element) {
    return delete element[ORIGINALS];
  }; // ## SAVE ##

  var setOriginalsObject = function setOriginalsObject(element, attributes) {
    if (hasOriginalAttrs(element)) {
      return;
    }

    var originals = {};
    attributes.forEach(function (attribute) {
      originals[attribute] = element.getAttribute(attribute);
    });
    element[ORIGINALS] = originals;
  };
  var saveOriginalBackgroundStyle = function saveOriginalBackgroundStyle(element) {
    if (hasOriginalAttrs(element)) {
      return;
    }

    element[ORIGINALS] = {
      backgroundImage: element.style.backgroundImage
    };
  }; // ## RESTORE ##

  var setOrResetAttribute = function setOrResetAttribute(element, attrName, value) {
    if (!value) {
      element.removeAttribute(attrName);
      return;
    }

    element.setAttribute(attrName, value);
  };

  var restoreOriginalAttrs = function restoreOriginalAttrs(element, attributes) {
    if (!hasOriginalAttrs(element)) {
      return;
    }

    var originals = getOriginalAttrs(element);
    attributes.forEach(function (attribute) {
      setOrResetAttribute(element, attribute, originals[attribute]);
    });
  };
  var restoreOriginalBgImage = function restoreOriginalBgImage(element) {
    if (!hasOriginalAttrs(element)) {
      return;
    }

    var originals = getOriginalAttrs(element);
    element.style.backgroundImage = originals.backgroundImage;
  };

  var manageApplied = function manageApplied(element, settings, instance) {
    addClass(element, settings.class_applied);
    setStatus(element, statusApplied); // Instance is not provided when loading is called from static class

    if (!instance) return;

    if (settings.unobserve_completed) {
      // Unobserve now because we can't do it on load
      unobserve(element, settings);
    }

    safeCallback(settings.callback_applied, element, instance);
  };
  var manageLoading = function manageLoading(element, settings, instance) {
    addClass(element, settings.class_loading);
    setStatus(element, statusLoading); // Instance is not provided when loading is called from static class

    if (!instance) return;
    updateLoadingCount(instance, +1);
    safeCallback(settings.callback_loading, element, instance);
  };
  var setAttributeIfValue = function setAttributeIfValue(element, attrName, value) {
    if (!value) {
      return;
    }

    element.setAttribute(attrName, value);
  };
  var setImageAttributes = function setImageAttributes(element, settings) {
    setAttributeIfValue(element, SIZES, getData(element, settings.data_sizes));
    setAttributeIfValue(element, SRCSET, getData(element, settings.data_srcset));
    setAttributeIfValue(element, SRC, getData(element, settings.data_src));
  };
  var setSourcesImg = function setSourcesImg(imgEl, settings) {
    forEachPictureSource(imgEl, function (sourceTag) {
      setOriginalsObject(sourceTag, attrsSrcSrcsetSizes);
      setImageAttributes(sourceTag, settings);
    });
    setOriginalsObject(imgEl, attrsSrcSrcsetSizes);
    setImageAttributes(imgEl, settings);
  };
  var setSourcesIframe = function setSourcesIframe(iframe, settings) {
    setOriginalsObject(iframe, attrsSrc);
    setAttributeIfValue(iframe, SRC, getData(iframe, settings.data_src));
  };
  var setSourcesVideo = function setSourcesVideo(videoEl, settings) {
    forEachVideoSource(videoEl, function (sourceEl) {
      setOriginalsObject(sourceEl, attrsSrc);
      setAttributeIfValue(sourceEl, SRC, getData(sourceEl, settings.data_src));
    });
    setOriginalsObject(videoEl, attrsSrcPoster);
    setAttributeIfValue(videoEl, POSTER, getData(videoEl, settings.data_poster));
    setAttributeIfValue(videoEl, SRC, getData(videoEl, settings.data_src));
    videoEl.load();
  };
  var setBackground = function setBackground(element, settings, instance) {
    var bg1xValue = getData(element, settings.data_bg);
    var bgHiDpiValue = getData(element, settings.data_bg_hidpi);
    var bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
    if (!bgDataValue) return;
    element.style.backgroundImage = "url(\"".concat(bgDataValue, "\")");
    getTempImage(element).setAttribute(SRC, bgDataValue);
    manageLoading(element, settings, instance);
  }; // NOTE: THE TEMP IMAGE TRICK CANNOT BE DONE WITH data-multi-bg
  // BECAUSE INSIDE ITS VALUES MUST BE WRAPPED WITH URL() AND ONE OF THEM
  // COULD BE A GRADIENT BACKGROUND IMAGE

  var setMultiBackground = function setMultiBackground(element, settings, instance) {
    var bg1xValue = getData(element, settings.data_bg_multi);
    var bgHiDpiValue = getData(element, settings.data_bg_multi_hidpi);
    var bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;

    if (!bgDataValue) {
      return;
    }

    element.style.backgroundImage = bgDataValue;
    manageApplied(element, settings, instance);
  };
  var setSourcesFunctions = {
    IMG: setSourcesImg,
    IFRAME: setSourcesIframe,
    VIDEO: setSourcesVideo
  };
  var setSourcesNative = function setSourcesNative(element, settings) {
    var setSourcesFunction = setSourcesFunctions[element.tagName];

    if (!setSourcesFunction) {
      return;
    }

    setSourcesFunction(element, settings);
  };
  var setSources = function setSources(element, settings, instance) {
    var setSourcesFunction = setSourcesFunctions[element.tagName];

    if (!setSourcesFunction) {
      return;
    }

    setSourcesFunction(element, settings);
    manageLoading(element, settings, instance);
  };

  var elementsWithLoadEvent = ["IMG", "IFRAME", "VIDEO"];
  var hasLoadEvent = function hasLoadEvent(element) {
    return elementsWithLoadEvent.indexOf(element.tagName) > -1;
  };
  var checkFinish = function checkFinish(settings, instance) {
    if (instance && !isSomethingLoading(instance) && !haveElementsToLoad(instance)) {
      safeCallback(settings.callback_finish, instance);
    }
  };
  var addEventListener = function addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler);
    element.llEvLisnrs[eventName] = handler;
  };
  var removeEventListener = function removeEventListener(element, eventName, handler) {
    element.removeEventListener(eventName, handler);
  };
  var hasEventListeners = function hasEventListeners(element) {
    return !!element.llEvLisnrs;
  };
  var addEventListeners = function addEventListeners(element, loadHandler, errorHandler) {
    if (!hasEventListeners(element)) element.llEvLisnrs = {};
    var loadEventName = element.tagName === "VIDEO" ? "loadeddata" : "load";
    addEventListener(element, loadEventName, loadHandler);
    addEventListener(element, "error", errorHandler);
  };
  var removeEventListeners = function removeEventListeners(element) {
    if (!hasEventListeners(element)) {
      return;
    }

    var eventListeners = element.llEvLisnrs;

    for (var eventName in eventListeners) {
      var handler = eventListeners[eventName];
      removeEventListener(element, eventName, handler);
    }

    delete element.llEvLisnrs;
  };
  var doneHandler = function doneHandler(element, settings, instance) {
    deleteTempImage(element);
    updateLoadingCount(instance, -1);
    decreaseToLoadCount(instance);
    removeClass(element, settings.class_loading);

    if (settings.unobserve_completed) {
      unobserve(element, instance);
    }
  };
  var loadHandler = function loadHandler(event, element, settings, instance) {
    var goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass(element, settings.class_loaded);
    setStatus(element, statusLoaded);
    safeCallback(settings.callback_loaded, element, instance);
    if (!goingNative) checkFinish(settings, instance);
  };
  var errorHandler = function errorHandler(event, element, settings, instance) {
    var goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass(element, settings.class_error);
    setStatus(element, statusError);
    safeCallback(settings.callback_error, element, instance);
    if (!goingNative) checkFinish(settings, instance);
  };
  var addOneShotEventListeners = function addOneShotEventListeners(element, settings, instance) {
    var elementToListenTo = getTempImage(element) || element;

    if (hasEventListeners(elementToListenTo)) {
      // This happens when loading is retried twice
      return;
    }

    var _loadHandler = function _loadHandler(event) {
      loadHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };

    var _errorHandler = function _errorHandler(event) {
      errorHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };

    addEventListeners(elementToListenTo, _loadHandler, _errorHandler);
  };

  var loadBackground = function loadBackground(element, settings, instance) {
    addTempImage(element);
    addOneShotEventListeners(element, settings, instance);
    saveOriginalBackgroundStyle(element);
    setBackground(element, settings, instance);
    setMultiBackground(element, settings, instance);
  };

  var loadRegular = function loadRegular(element, settings, instance) {
    addOneShotEventListeners(element, settings, instance);
    setSources(element, settings, instance);
  };

  var load = function load(element, settings, instance) {
    if (hasLoadEvent(element)) {
      loadRegular(element, settings, instance);
    } else {
      loadBackground(element, settings, instance);
    }
  };
  var loadNative = function loadNative(element, settings, instance) {
    element.setAttribute("loading", "lazy");
    addOneShotEventListeners(element, settings, instance);
    setSourcesNative(element, settings);
    setStatus(element, statusNative);
  };

  var removeImageAttributes = function removeImageAttributes(element) {
    element.removeAttribute(SRC);
    element.removeAttribute(SRCSET);
    element.removeAttribute(SIZES);
  };

  var resetSourcesImg = function resetSourcesImg(element) {
    forEachPictureSource(element, function (sourceTag) {
      removeImageAttributes(sourceTag);
    });
    removeImageAttributes(element);
  };

  var restoreImg = function restoreImg(imgEl) {
    forEachPictureSource(imgEl, function (sourceEl) {
      restoreOriginalAttrs(sourceEl, attrsSrcSrcsetSizes);
    });
    restoreOriginalAttrs(imgEl, attrsSrcSrcsetSizes);
  };
  var restoreVideo = function restoreVideo(videoEl) {
    forEachVideoSource(videoEl, function (sourceEl) {
      restoreOriginalAttrs(sourceEl, attrsSrc);
    });
    restoreOriginalAttrs(videoEl, attrsSrcPoster);
    videoEl.load();
  };
  var restoreIframe = function restoreIframe(iframeEl) {
    restoreOriginalAttrs(iframeEl, attrsSrc);
  };
  var restoreFunctions = {
    IMG: restoreImg,
    IFRAME: restoreIframe,
    VIDEO: restoreVideo
  };

  var restoreAttributes = function restoreAttributes(element) {
    var restoreFunction = restoreFunctions[element.tagName];

    if (!restoreFunction) {
      restoreOriginalBgImage(element);
      return;
    }

    restoreFunction(element);
  };

  var resetClasses = function resetClasses(element, settings) {
    if (hasEmptyStatus(element) || hasStatusNative(element)) {
      return;
    }

    removeClass(element, settings.class_entered);
    removeClass(element, settings.class_exited);
    removeClass(element, settings.class_applied);
    removeClass(element, settings.class_loading);
    removeClass(element, settings.class_loaded);
    removeClass(element, settings.class_error);
  };

  var restore = function restore(element, settings) {
    restoreAttributes(element);
    resetClasses(element, settings);
    resetStatus(element);
    deleteOriginalAttrs(element);
  };

  var cancelLoading = function cancelLoading(element, entry, settings, instance) {
    if (!settings.cancel_on_exit) return;
    if (!hasStatusLoading(element)) return;
    if (element.tagName !== "IMG") return; //Works only on images

    removeEventListeners(element);
    resetSourcesImg(element);
    restoreImg(element);
    removeClass(element, settings.class_loading);
    updateLoadingCount(instance, -1);
    resetStatus(element);
    safeCallback(settings.callback_cancel, element, entry, instance);
  };

  var onEnter = function onEnter(element, entry, settings, instance) {
    var dontLoad = hadStartedLoading(element);
    /* Save status 
    before setting it, to prevent loading it again. Fixes #526. */

    setStatus(element, statusEntered);
    addClass(element, settings.class_entered);
    removeClass(element, settings.class_exited);
    unobserveEntered(element, settings, instance);
    safeCallback(settings.callback_enter, element, entry, instance);
    if (dontLoad) return;
    load(element, settings, instance);
  };
  var onExit = function onExit(element, entry, settings, instance) {
    if (hasEmptyStatus(element)) return; //Ignore the first pass, at landing

    addClass(element, settings.class_exited);
    cancelLoading(element, entry, settings, instance);
    safeCallback(settings.callback_exit, element, entry, instance);
  };

  var tagsWithNativeLazy = ["IMG", "IFRAME", "VIDEO"];
  var shouldUseNative = function shouldUseNative(settings) {
    return settings.use_native && "loading" in HTMLImageElement.prototype;
  };
  var loadAllNative = function loadAllNative(elements, settings, instance) {
    elements.forEach(function (element) {
      if (tagsWithNativeLazy.indexOf(element.tagName) === -1) {
        return;
      }

      loadNative(element, settings, instance);
    });
    setToLoadCount(instance, 0);
  };

  var isIntersecting = function isIntersecting(entry) {
    return entry.isIntersecting || entry.intersectionRatio > 0;
  };

  var getObserverSettings = function getObserverSettings(settings) {
    return {
      root: settings.container === document ? null : settings.container,
      rootMargin: settings.thresholds || settings.threshold + "px"
    };
  };

  var intersectionHandler = function intersectionHandler(entries, settings, instance) {
    entries.forEach(function (entry) {
      return isIntersecting(entry) ? onEnter(entry.target, entry, settings, instance) : onExit(entry.target, entry, settings, instance);
    });
  };

  var observeElements = function observeElements(observer, elements) {
    elements.forEach(function (element) {
      observer.observe(element);
    });
  };
  var updateObserver = function updateObserver(observer, elementsToObserve) {
    resetObserver(observer);
    observeElements(observer, elementsToObserve);
  };
  var setObserver = function setObserver(settings, instance) {
    if (!supportsIntersectionObserver || shouldUseNative(settings)) {
      return;
    }

    instance._observer = new IntersectionObserver(function (entries) {
      intersectionHandler(entries, settings, instance);
    }, getObserverSettings(settings));
  };

  var toArray = function toArray(nodeSet) {
    return Array.prototype.slice.call(nodeSet);
  };
  var queryElements = function queryElements(settings) {
    return settings.container.querySelectorAll(settings.elements_selector);
  };
  var excludeManagedElements = function excludeManagedElements(elements) {
    return toArray(elements).filter(hasEmptyStatus);
  };
  var hasError = function hasError(element) {
    return hasStatusError(element);
  };
  var filterErrorElements = function filterErrorElements(elements) {
    return toArray(elements).filter(hasError);
  };
  var getElementsToLoad = function getElementsToLoad(elements, settings) {
    return excludeManagedElements(elements || queryElements(settings));
  };

  var retryLazyLoad = function retryLazyLoad(settings, instance) {
    var errorElements = filterErrorElements(queryElements(settings));
    errorElements.forEach(function (element) {
      removeClass(element, settings.class_error);
      resetStatus(element);
    });
    instance.update();
  };
  var setOnlineCheck = function setOnlineCheck(settings, instance) {
    if (!runningOnBrowser) {
      return;
    }

    window.addEventListener("online", function () {
      retryLazyLoad(settings, instance);
    });
  };

  var LazyLoad = function LazyLoad(customSettings, elements) {
    var settings = getExtendedSettings(customSettings);
    this._settings = settings;
    this.loadingCount = 0;
    setObserver(settings, this);
    setOnlineCheck(settings, this);
    this.update(elements);
  };

  LazyLoad.prototype = {
    update: function update(givenNodeset) {
      var settings = this._settings;
      var elementsToLoad = getElementsToLoad(givenNodeset, settings);
      setToLoadCount(this, elementsToLoad.length);

      if (isBot || !supportsIntersectionObserver) {
        this.loadAll(elementsToLoad);
        return;
      }

      if (shouldUseNative(settings)) {
        loadAllNative(elementsToLoad, settings, this);
        return;
      }

      updateObserver(this._observer, elementsToLoad);
    },
    destroy: function destroy() {
      // Observer
      if (this._observer) {
        this._observer.disconnect();
      } // Clean custom attributes on elements


      queryElements(this._settings).forEach(function (element) {
        deleteOriginalAttrs(element);
      }); // Delete all internal props

      delete this._observer;
      delete this._settings;
      delete this.loadingCount;
      delete this.toLoadCount;
    },
    loadAll: function loadAll(elements) {
      var _this = this;

      var settings = this._settings;
      var elementsToLoad = getElementsToLoad(elements, settings);
      elementsToLoad.forEach(function (element) {
        unobserve(element, _this);
        load(element, settings, _this);
      });
    },
    restoreAll: function restoreAll() {
      var settings = this._settings;
      queryElements(settings).forEach(function (element) {
        restore(element, settings);
      });
    }
  };

  LazyLoad.load = function (element, customSettings) {
    var settings = getExtendedSettings(customSettings);
    load(element, settings);
  };

  LazyLoad.resetStatus = function (element) {
    resetStatus(element);
  }; // Automatic instances creation if required (useful for async script loading)


  if (runningOnBrowser) {
    autoInitialize(LazyLoad, window.lazyLoadOptions);
  }

  return LazyLoad;

})));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./src/scripts/_imageLazy.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vanilla_lazyload_dist_lazyload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanilla-lazyload/dist/lazyload */ "./node_modules/vanilla-lazyload/dist/lazyload.js");
/* harmony import */ var vanilla_lazyload_dist_lazyload__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vanilla_lazyload_dist_lazyload__WEBPACK_IMPORTED_MODULE_0__);

new (vanilla_lazyload_dist_lazyload__WEBPACK_IMPORTED_MODULE_0___default())();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2ltYWdlTGF6eS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLEVBQUUsS0FBNEQ7QUFDOUQsRUFBRSxDQUN1RztBQUN6RyxDQUFDLHNCQUFzQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLG1DQUFtQywwQkFBMEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxHQUFHO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQzV5QkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQSxJQUFJQSx1RUFBSixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lLy4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtbGF6eWxvYWQvZGlzdC9sYXp5bG9hZC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LW5hbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Byb2plY3QtbmFtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC1uYW1lLy4vc3JjL3NjcmlwdHMvX2ltYWdlTGF6eS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xyXG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcclxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxyXG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5MYXp5TG9hZCA9IGZhY3RvcnkoKSk7XHJcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcclxuICAgIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcclxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHJ1bm5pbmdPbkJyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gIHZhciBpc0JvdCA9IHJ1bm5pbmdPbkJyb3dzZXIgJiYgIShcIm9uc2Nyb2xsXCIgaW4gd2luZG93KSB8fCB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIC8oZ2xlfGluZ3xybylib3R8Y3Jhd2x8c3BpZGVyL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICB2YXIgc3VwcG9ydHNJbnRlcnNlY3Rpb25PYnNlcnZlciA9IHJ1bm5pbmdPbkJyb3dzZXIgJiYgXCJJbnRlcnNlY3Rpb25PYnNlcnZlclwiIGluIHdpbmRvdztcclxuICB2YXIgc3VwcG9ydHNDbGFzc0xpc3QgPSBydW5uaW5nT25Ccm93c2VyICYmIFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgdmFyIGlzSGlEcGkgPSBydW5uaW5nT25Ccm93c2VyICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMTtcclxuXHJcbiAgdmFyIGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuICAgIGVsZW1lbnRzX3NlbGVjdG9yOiBcIi5sYXp5XCIsXHJcbiAgICBjb250YWluZXI6IGlzQm90IHx8IHJ1bm5pbmdPbkJyb3dzZXIgPyBkb2N1bWVudCA6IG51bGwsXHJcbiAgICB0aHJlc2hvbGQ6IDMwMCxcclxuICAgIHRocmVzaG9sZHM6IG51bGwsXHJcbiAgICBkYXRhX3NyYzogXCJzcmNcIixcclxuICAgIGRhdGFfc3Jjc2V0OiBcInNyY3NldFwiLFxyXG4gICAgZGF0YV9zaXplczogXCJzaXplc1wiLFxyXG4gICAgZGF0YV9iZzogXCJiZ1wiLFxyXG4gICAgZGF0YV9iZ19oaWRwaTogXCJiZy1oaWRwaVwiLFxyXG4gICAgZGF0YV9iZ19tdWx0aTogXCJiZy1tdWx0aVwiLFxyXG4gICAgZGF0YV9iZ19tdWx0aV9oaWRwaTogXCJiZy1tdWx0aS1oaWRwaVwiLFxyXG4gICAgZGF0YV9wb3N0ZXI6IFwicG9zdGVyXCIsXHJcbiAgICBjbGFzc19hcHBsaWVkOiBcImFwcGxpZWRcIixcclxuICAgIGNsYXNzX2xvYWRpbmc6IFwibG9hZGluZ1wiLFxyXG4gICAgY2xhc3NfbG9hZGVkOiBcImxvYWRlZFwiLFxyXG4gICAgY2xhc3NfZXJyb3I6IFwiZXJyb3JcIixcclxuICAgIGNsYXNzX2VudGVyZWQ6IFwiZW50ZXJlZFwiLFxyXG4gICAgY2xhc3NfZXhpdGVkOiBcImV4aXRlZFwiLFxyXG4gICAgdW5vYnNlcnZlX2NvbXBsZXRlZDogdHJ1ZSxcclxuICAgIHVub2JzZXJ2ZV9lbnRlcmVkOiBmYWxzZSxcclxuICAgIGNhbmNlbF9vbl9leGl0OiB0cnVlLFxyXG4gICAgY2FsbGJhY2tfZW50ZXI6IG51bGwsXHJcbiAgICBjYWxsYmFja19leGl0OiBudWxsLFxyXG4gICAgY2FsbGJhY2tfYXBwbGllZDogbnVsbCxcclxuICAgIGNhbGxiYWNrX2xvYWRpbmc6IG51bGwsXHJcbiAgICBjYWxsYmFja19sb2FkZWQ6IG51bGwsXHJcbiAgICBjYWxsYmFja19lcnJvcjogbnVsbCxcclxuICAgIGNhbGxiYWNrX2ZpbmlzaDogbnVsbCxcclxuICAgIGNhbGxiYWNrX2NhbmNlbDogbnVsbCxcclxuICAgIHVzZV9uYXRpdmU6IGZhbHNlXHJcbiAgfTtcclxuICB2YXIgZ2V0RXh0ZW5kZWRTZXR0aW5ncyA9IGZ1bmN0aW9uIGdldEV4dGVuZGVkU2V0dGluZ3MoY3VzdG9tU2V0dGluZ3MpIHtcclxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgZGVmYXVsdFNldHRpbmdzLCBjdXN0b21TZXR0aW5ncyk7XHJcbiAgfTtcclxuXHJcbiAgLyogQ3JlYXRlcyBpbnN0YW5jZSBhbmQgbm90aWZpZXMgaXQgdGhyb3VnaCB0aGUgd2luZG93IGVsZW1lbnQgKi9cclxuICB2YXIgY3JlYXRlSW5zdGFuY2UgPSBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShjbGFzc09iaiwgb3B0aW9ucykge1xyXG4gICAgdmFyIGV2ZW50O1xyXG4gICAgdmFyIGV2ZW50U3RyaW5nID0gXCJMYXp5TG9hZDo6SW5pdGlhbGl6ZWRcIjtcclxuICAgIHZhciBpbnN0YW5jZSA9IG5ldyBjbGFzc09iaihvcHRpb25zKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBXb3JrcyBpbiBtb2Rlcm4gYnJvd3NlcnNcclxuICAgICAgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnRTdHJpbmcsIHtcclxuICAgICAgICBkZXRhaWw6IHtcclxuICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy8gV29ya3MgaW4gSW50ZXJuZXQgRXhwbG9yZXIgKGFsbCB2ZXJzaW9ucylcclxuICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xyXG4gICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnRTdHJpbmcsIGZhbHNlLCBmYWxzZSwge1xyXG4gICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgfTtcclxuICAvKiBBdXRvIGluaXRpYWxpemF0aW9uIG9mIG9uZSBvciBtb3JlIGluc3RhbmNlcyBvZiBsYXp5bG9hZCwgZGVwZW5kaW5nIG9uIHRoZSBcclxuICAgICAgb3B0aW9ucyBwYXNzZWQgaW4gKHBsYWluIG9iamVjdCBvciBhbiBhcnJheSkgKi9cclxuXHJcblxyXG4gIHZhciBhdXRvSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIGF1dG9Jbml0aWFsaXplKGNsYXNzT2JqLCBvcHRpb25zKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghb3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgLy8gUGxhaW4gb2JqZWN0XHJcbiAgICAgIGNyZWF0ZUluc3RhbmNlKGNsYXNzT2JqLCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEFycmF5IG9mIG9iamVjdHNcclxuICAgICAgZm9yICh2YXIgaSA9IDAsIG9wdGlvbnNJdGVtOyBvcHRpb25zSXRlbSA9IG9wdGlvbnNbaV07IGkgKz0gMSkge1xyXG4gICAgICAgIGNyZWF0ZUluc3RhbmNlKGNsYXNzT2JqLCBvcHRpb25zSXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgU1JDID0gXCJzcmNcIjtcclxuICB2YXIgU1JDU0VUID0gXCJzcmNzZXRcIjtcclxuICB2YXIgU0laRVMgPSBcInNpemVzXCI7XHJcbiAgdmFyIFBPU1RFUiA9IFwicG9zdGVyXCI7XHJcbiAgdmFyIE9SSUdJTkFMUyA9IFwibGxPcmlnaW5hbEF0dHJzXCI7XHJcblxyXG4gIHZhciBzdGF0dXNMb2FkaW5nID0gXCJsb2FkaW5nXCI7XHJcbiAgdmFyIHN0YXR1c0xvYWRlZCA9IFwibG9hZGVkXCI7XHJcbiAgdmFyIHN0YXR1c0FwcGxpZWQgPSBcImFwcGxpZWRcIjtcclxuICB2YXIgc3RhdHVzRW50ZXJlZCA9IFwiZW50ZXJlZFwiO1xyXG4gIHZhciBzdGF0dXNFcnJvciA9IFwiZXJyb3JcIjtcclxuICB2YXIgc3RhdHVzTmF0aXZlID0gXCJuYXRpdmVcIjtcclxuXHJcbiAgdmFyIGRhdGFQcmVmaXggPSBcImRhdGEtXCI7XHJcbiAgdmFyIHN0YXR1c0RhdGFOYW1lID0gXCJsbC1zdGF0dXNcIjtcclxuICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uIGdldERhdGEoZWxlbWVudCwgYXR0cmlidXRlKSB7XHJcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoZGF0YVByZWZpeCArIGF0dHJpYnV0ZSk7XHJcbiAgfTtcclxuICB2YXIgc2V0RGF0YSA9IGZ1bmN0aW9uIHNldERhdGEoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSkge1xyXG4gICAgdmFyIGF0dHJOYW1lID0gZGF0YVByZWZpeCArIGF0dHJpYnV0ZTtcclxuXHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbHVlKTtcclxuICB9O1xyXG4gIHZhciBnZXRTdGF0dXMgPSBmdW5jdGlvbiBnZXRTdGF0dXMoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGdldERhdGEoZWxlbWVudCwgc3RhdHVzRGF0YU5hbWUpO1xyXG4gIH07XHJcbiAgdmFyIHNldFN0YXR1cyA9IGZ1bmN0aW9uIHNldFN0YXR1cyhlbGVtZW50LCBzdGF0dXMpIHtcclxuICAgIHJldHVybiBzZXREYXRhKGVsZW1lbnQsIHN0YXR1c0RhdGFOYW1lLCBzdGF0dXMpO1xyXG4gIH07XHJcbiAgdmFyIHJlc2V0U3RhdHVzID0gZnVuY3Rpb24gcmVzZXRTdGF0dXMoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIHNldFN0YXR1cyhlbGVtZW50LCBudWxsKTtcclxuICB9O1xyXG4gIHZhciBoYXNFbXB0eVN0YXR1cyA9IGZ1bmN0aW9uIGhhc0VtcHR5U3RhdHVzKGVsZW1lbnQpIHtcclxuICAgIHJldHVybiBnZXRTdGF0dXMoZWxlbWVudCkgPT09IG51bGw7XHJcbiAgfTtcclxuICB2YXIgaGFzU3RhdHVzTG9hZGluZyA9IGZ1bmN0aW9uIGhhc1N0YXR1c0xvYWRpbmcoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGdldFN0YXR1cyhlbGVtZW50KSA9PT0gc3RhdHVzTG9hZGluZztcclxuICB9O1xyXG4gIHZhciBoYXNTdGF0dXNFcnJvciA9IGZ1bmN0aW9uIGhhc1N0YXR1c0Vycm9yKGVsZW1lbnQpIHtcclxuICAgIHJldHVybiBnZXRTdGF0dXMoZWxlbWVudCkgPT09IHN0YXR1c0Vycm9yO1xyXG4gIH07XHJcbiAgdmFyIGhhc1N0YXR1c05hdGl2ZSA9IGZ1bmN0aW9uIGhhc1N0YXR1c05hdGl2ZShlbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZ2V0U3RhdHVzKGVsZW1lbnQpID09PSBzdGF0dXNOYXRpdmU7XHJcbiAgfTtcclxuICB2YXIgc3RhdHVzZXNBZnRlckxvYWRpbmcgPSBbc3RhdHVzTG9hZGluZywgc3RhdHVzTG9hZGVkLCBzdGF0dXNBcHBsaWVkLCBzdGF0dXNFcnJvcl07XHJcbiAgdmFyIGhhZFN0YXJ0ZWRMb2FkaW5nID0gZnVuY3Rpb24gaGFkU3RhcnRlZExvYWRpbmcoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIHN0YXR1c2VzQWZ0ZXJMb2FkaW5nLmluZGV4T2YoZ2V0U3RhdHVzKGVsZW1lbnQpKSA+PSAwO1xyXG4gIH07XHJcblxyXG4gIHZhciBzYWZlQ2FsbGJhY2sgPSBmdW5jdGlvbiBzYWZlQ2FsbGJhY2soY2FsbGJhY2ssIGFyZzEsIGFyZzIsIGFyZzMpIHtcclxuICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmczICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY2FsbGJhY2soYXJnMSwgYXJnMiwgYXJnMyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXJnMiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNhbGxiYWNrKGFyZzEsIGFyZzIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbGJhY2soYXJnMSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGFkZENsYXNzID0gZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICBpZiAoc3VwcG9ydHNDbGFzc0xpc3QpIHtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAoZWxlbWVudC5jbGFzc05hbWUgPyBcIiBcIiA6IFwiXCIpICsgY2xhc3NOYW1lO1xyXG4gIH07XHJcbiAgdmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICBpZiAoc3VwcG9ydHNDbGFzc0xpc3QpIHtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIihefFxcXFxzKylcIiArIGNsYXNzTmFtZSArIFwiKFxcXFxzK3wkKVwiKSwgXCIgXCIpLnJlcGxhY2UoL15cXHMrLywgXCJcIikucmVwbGFjZSgvXFxzKyQvLCBcIlwiKTtcclxuICB9O1xyXG5cclxuICB2YXIgYWRkVGVtcEltYWdlID0gZnVuY3Rpb24gYWRkVGVtcEltYWdlKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQubGxUZW1wSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIH07XHJcbiAgdmFyIGRlbGV0ZVRlbXBJbWFnZSA9IGZ1bmN0aW9uIGRlbGV0ZVRlbXBJbWFnZShlbGVtZW50KSB7XHJcbiAgICBkZWxldGUgZWxlbWVudC5sbFRlbXBJbWFnZTtcclxuICB9O1xyXG4gIHZhciBnZXRUZW1wSW1hZ2UgPSBmdW5jdGlvbiBnZXRUZW1wSW1hZ2UoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGVsZW1lbnQubGxUZW1wSW1hZ2U7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHVub2JzZXJ2ZSA9IGZ1bmN0aW9uIHVub2JzZXJ2ZShlbGVtZW50LCBpbnN0YW5jZSkge1xyXG4gICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xyXG4gICAgdmFyIG9ic2VydmVyID0gaW5zdGFuY2UuX29ic2VydmVyO1xyXG4gICAgaWYgKCFvYnNlcnZlcikgcmV0dXJuO1xyXG4gICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpO1xyXG4gIH07XHJcbiAgdmFyIHJlc2V0T2JzZXJ2ZXIgPSBmdW5jdGlvbiByZXNldE9ic2VydmVyKG9ic2VydmVyKSB7XHJcbiAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgfTtcclxuICB2YXIgdW5vYnNlcnZlRW50ZXJlZCA9IGZ1bmN0aW9uIHVub2JzZXJ2ZUVudGVyZWQoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICBpZiAoc2V0dGluZ3MudW5vYnNlcnZlX2VudGVyZWQpIHVub2JzZXJ2ZShlbGVtZW50LCBpbnN0YW5jZSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHVwZGF0ZUxvYWRpbmdDb3VudCA9IGZ1bmN0aW9uIHVwZGF0ZUxvYWRpbmdDb3VudChpbnN0YW5jZSwgZGVsdGEpIHtcclxuICAgIGlmICghaW5zdGFuY2UpIHJldHVybjtcclxuICAgIGluc3RhbmNlLmxvYWRpbmdDb3VudCArPSBkZWx0YTtcclxuICB9O1xyXG4gIHZhciBkZWNyZWFzZVRvTG9hZENvdW50ID0gZnVuY3Rpb24gZGVjcmVhc2VUb0xvYWRDb3VudChpbnN0YW5jZSkge1xyXG4gICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xyXG4gICAgaW5zdGFuY2UudG9Mb2FkQ291bnQgLT0gMTtcclxuICB9O1xyXG4gIHZhciBzZXRUb0xvYWRDb3VudCA9IGZ1bmN0aW9uIHNldFRvTG9hZENvdW50KGluc3RhbmNlLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xyXG4gICAgaW5zdGFuY2UudG9Mb2FkQ291bnQgPSB2YWx1ZTtcclxuICB9O1xyXG4gIHZhciBpc1NvbWV0aGluZ0xvYWRpbmcgPSBmdW5jdGlvbiBpc1NvbWV0aGluZ0xvYWRpbmcoaW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBpbnN0YW5jZS5sb2FkaW5nQ291bnQgPiAwO1xyXG4gIH07XHJcbiAgdmFyIGhhdmVFbGVtZW50c1RvTG9hZCA9IGZ1bmN0aW9uIGhhdmVFbGVtZW50c1RvTG9hZChpbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIGluc3RhbmNlLnRvTG9hZENvdW50ID4gMDtcclxuICB9O1xyXG5cclxuICB2YXIgZ2V0U291cmNlVGFncyA9IGZ1bmN0aW9uIGdldFNvdXJjZVRhZ3MocGFyZW50VGFnKSB7XHJcbiAgICB2YXIgc291cmNlVGFncyA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBjaGlsZFRhZzsgY2hpbGRUYWcgPSBwYXJlbnRUYWcuY2hpbGRyZW5baV07IGkgKz0gMSkge1xyXG4gICAgICBpZiAoY2hpbGRUYWcudGFnTmFtZSA9PT0gXCJTT1VSQ0VcIikge1xyXG4gICAgICAgIHNvdXJjZVRhZ3MucHVzaChjaGlsZFRhZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc291cmNlVGFncztcclxuICB9O1xyXG5cclxuICB2YXIgZm9yRWFjaFBpY3R1cmVTb3VyY2UgPSBmdW5jdGlvbiBmb3JFYWNoUGljdHVyZVNvdXJjZShlbGVtZW50LCBmbikge1xyXG4gICAgdmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcclxuXHJcbiAgICBpZiAoIXBhcmVudCB8fCBwYXJlbnQudGFnTmFtZSAhPT0gXCJQSUNUVVJFXCIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzb3VyY2VUYWdzID0gZ2V0U291cmNlVGFncyhwYXJlbnQpO1xyXG4gICAgc291cmNlVGFncy5mb3JFYWNoKGZuKTtcclxuICB9O1xyXG4gIHZhciBmb3JFYWNoVmlkZW9Tb3VyY2UgPSBmdW5jdGlvbiBmb3JFYWNoVmlkZW9Tb3VyY2UoZWxlbWVudCwgZm4pIHtcclxuICAgIHZhciBzb3VyY2VUYWdzID0gZ2V0U291cmNlVGFncyhlbGVtZW50KTtcclxuICAgIHNvdXJjZVRhZ3MuZm9yRWFjaChmbik7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGF0dHJzU3JjID0gW1NSQ107XHJcbiAgdmFyIGF0dHJzU3JjUG9zdGVyID0gW1NSQywgUE9TVEVSXTtcclxuICB2YXIgYXR0cnNTcmNTcmNzZXRTaXplcyA9IFtTUkMsIFNSQ1NFVCwgU0laRVNdO1xyXG4gIHZhciBoYXNPcmlnaW5hbEF0dHJzID0gZnVuY3Rpb24gaGFzT3JpZ2luYWxBdHRycyhlbGVtZW50KSB7XHJcbiAgICByZXR1cm4gISFlbGVtZW50W09SSUdJTkFMU107XHJcbiAgfTtcclxuICB2YXIgZ2V0T3JpZ2luYWxBdHRycyA9IGZ1bmN0aW9uIGdldE9yaWdpbmFsQXR0cnMoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGVsZW1lbnRbT1JJR0lOQUxTXTtcclxuICB9O1xyXG4gIHZhciBkZWxldGVPcmlnaW5hbEF0dHJzID0gZnVuY3Rpb24gZGVsZXRlT3JpZ2luYWxBdHRycyhlbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZGVsZXRlIGVsZW1lbnRbT1JJR0lOQUxTXTtcclxuICB9OyAvLyAjIyBTQVZFICMjXHJcblxyXG4gIHZhciBzZXRPcmlnaW5hbHNPYmplY3QgPSBmdW5jdGlvbiBzZXRPcmlnaW5hbHNPYmplY3QoZWxlbWVudCwgYXR0cmlidXRlcykge1xyXG4gICAgaWYgKGhhc09yaWdpbmFsQXR0cnMoZWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvcmlnaW5hbHMgPSB7fTtcclxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlKSB7XHJcbiAgICAgIG9yaWdpbmFsc1thdHRyaWJ1dGVdID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcclxuICAgIH0pO1xyXG4gICAgZWxlbWVudFtPUklHSU5BTFNdID0gb3JpZ2luYWxzO1xyXG4gIH07XHJcbiAgdmFyIHNhdmVPcmlnaW5hbEJhY2tncm91bmRTdHlsZSA9IGZ1bmN0aW9uIHNhdmVPcmlnaW5hbEJhY2tncm91bmRTdHlsZShlbGVtZW50KSB7XHJcbiAgICBpZiAoaGFzT3JpZ2luYWxBdHRycyhlbGVtZW50KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudFtPUklHSU5BTFNdID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlXHJcbiAgICB9O1xyXG4gIH07IC8vICMjIFJFU1RPUkUgIyNcclxuXHJcbiAgdmFyIHNldE9yUmVzZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBzZXRPclJlc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgdmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIHZhciByZXN0b3JlT3JpZ2luYWxBdHRycyA9IGZ1bmN0aW9uIHJlc3RvcmVPcmlnaW5hbEF0dHJzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcclxuICAgIGlmICghaGFzT3JpZ2luYWxBdHRycyhlbGVtZW50KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9yaWdpbmFscyA9IGdldE9yaWdpbmFsQXR0cnMoZWxlbWVudCk7XHJcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xyXG4gICAgICBzZXRPclJlc2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZSwgb3JpZ2luYWxzW2F0dHJpYnV0ZV0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICB2YXIgcmVzdG9yZU9yaWdpbmFsQmdJbWFnZSA9IGZ1bmN0aW9uIHJlc3RvcmVPcmlnaW5hbEJnSW1hZ2UoZWxlbWVudCkge1xyXG4gICAgaWYgKCFoYXNPcmlnaW5hbEF0dHJzKGVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3JpZ2luYWxzID0gZ2V0T3JpZ2luYWxBdHRycyhlbGVtZW50KTtcclxuICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gb3JpZ2luYWxzLmJhY2tncm91bmRJbWFnZTtcclxuICB9O1xyXG5cclxuICB2YXIgbWFuYWdlQXBwbGllZCA9IGZ1bmN0aW9uIG1hbmFnZUFwcGxpZWQoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICBhZGRDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5jbGFzc19hcHBsaWVkKTtcclxuICAgIHNldFN0YXR1cyhlbGVtZW50LCBzdGF0dXNBcHBsaWVkKTsgLy8gSW5zdGFuY2UgaXMgbm90IHByb3ZpZGVkIHdoZW4gbG9hZGluZyBpcyBjYWxsZWQgZnJvbSBzdGF0aWMgY2xhc3NcclxuXHJcbiAgICBpZiAoIWluc3RhbmNlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHNldHRpbmdzLnVub2JzZXJ2ZV9jb21wbGV0ZWQpIHtcclxuICAgICAgLy8gVW5vYnNlcnZlIG5vdyBiZWNhdXNlIHdlIGNhbid0IGRvIGl0IG9uIGxvYWRcclxuICAgICAgdW5vYnNlcnZlKGVsZW1lbnQsIHNldHRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBzYWZlQ2FsbGJhY2soc2V0dGluZ3MuY2FsbGJhY2tfYXBwbGllZCwgZWxlbWVudCwgaW5zdGFuY2UpO1xyXG4gIH07XHJcbiAgdmFyIG1hbmFnZUxvYWRpbmcgPSBmdW5jdGlvbiBtYW5hZ2VMb2FkaW5nKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuY2xhc3NfbG9hZGluZyk7XHJcbiAgICBzZXRTdGF0dXMoZWxlbWVudCwgc3RhdHVzTG9hZGluZyk7IC8vIEluc3RhbmNlIGlzIG5vdCBwcm92aWRlZCB3aGVuIGxvYWRpbmcgaXMgY2FsbGVkIGZyb20gc3RhdGljIGNsYXNzXHJcblxyXG4gICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xyXG4gICAgdXBkYXRlTG9hZGluZ0NvdW50KGluc3RhbmNlLCArMSk7XHJcbiAgICBzYWZlQ2FsbGJhY2soc2V0dGluZ3MuY2FsbGJhY2tfbG9hZGluZywgZWxlbWVudCwgaW5zdGFuY2UpO1xyXG4gIH07XHJcbiAgdmFyIHNldEF0dHJpYnV0ZUlmVmFsdWUgPSBmdW5jdGlvbiBzZXRBdHRyaWJ1dGVJZlZhbHVlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbHVlKTtcclxuICB9O1xyXG4gIHZhciBzZXRJbWFnZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBzZXRJbWFnZUF0dHJpYnV0ZXMoZWxlbWVudCwgc2V0dGluZ3MpIHtcclxuICAgIHNldEF0dHJpYnV0ZUlmVmFsdWUoZWxlbWVudCwgU0laRVMsIGdldERhdGEoZWxlbWVudCwgc2V0dGluZ3MuZGF0YV9zaXplcykpO1xyXG4gICAgc2V0QXR0cmlidXRlSWZWYWx1ZShlbGVtZW50LCBTUkNTRVQsIGdldERhdGEoZWxlbWVudCwgc2V0dGluZ3MuZGF0YV9zcmNzZXQpKTtcclxuICAgIHNldEF0dHJpYnV0ZUlmVmFsdWUoZWxlbWVudCwgU1JDLCBnZXREYXRhKGVsZW1lbnQsIHNldHRpbmdzLmRhdGFfc3JjKSk7XHJcbiAgfTtcclxuICB2YXIgc2V0U291cmNlc0ltZyA9IGZ1bmN0aW9uIHNldFNvdXJjZXNJbWcoaW1nRWwsIHNldHRpbmdzKSB7XHJcbiAgICBmb3JFYWNoUGljdHVyZVNvdXJjZShpbWdFbCwgZnVuY3Rpb24gKHNvdXJjZVRhZykge1xyXG4gICAgICBzZXRPcmlnaW5hbHNPYmplY3Qoc291cmNlVGFnLCBhdHRyc1NyY1NyY3NldFNpemVzKTtcclxuICAgICAgc2V0SW1hZ2VBdHRyaWJ1dGVzKHNvdXJjZVRhZywgc2V0dGluZ3MpO1xyXG4gICAgfSk7XHJcbiAgICBzZXRPcmlnaW5hbHNPYmplY3QoaW1nRWwsIGF0dHJzU3JjU3Jjc2V0U2l6ZXMpO1xyXG4gICAgc2V0SW1hZ2VBdHRyaWJ1dGVzKGltZ0VsLCBzZXR0aW5ncyk7XHJcbiAgfTtcclxuICB2YXIgc2V0U291cmNlc0lmcmFtZSA9IGZ1bmN0aW9uIHNldFNvdXJjZXNJZnJhbWUoaWZyYW1lLCBzZXR0aW5ncykge1xyXG4gICAgc2V0T3JpZ2luYWxzT2JqZWN0KGlmcmFtZSwgYXR0cnNTcmMpO1xyXG4gICAgc2V0QXR0cmlidXRlSWZWYWx1ZShpZnJhbWUsIFNSQywgZ2V0RGF0YShpZnJhbWUsIHNldHRpbmdzLmRhdGFfc3JjKSk7XHJcbiAgfTtcclxuICB2YXIgc2V0U291cmNlc1ZpZGVvID0gZnVuY3Rpb24gc2V0U291cmNlc1ZpZGVvKHZpZGVvRWwsIHNldHRpbmdzKSB7XHJcbiAgICBmb3JFYWNoVmlkZW9Tb3VyY2UodmlkZW9FbCwgZnVuY3Rpb24gKHNvdXJjZUVsKSB7XHJcbiAgICAgIHNldE9yaWdpbmFsc09iamVjdChzb3VyY2VFbCwgYXR0cnNTcmMpO1xyXG4gICAgICBzZXRBdHRyaWJ1dGVJZlZhbHVlKHNvdXJjZUVsLCBTUkMsIGdldERhdGEoc291cmNlRWwsIHNldHRpbmdzLmRhdGFfc3JjKSk7XHJcbiAgICB9KTtcclxuICAgIHNldE9yaWdpbmFsc09iamVjdCh2aWRlb0VsLCBhdHRyc1NyY1Bvc3Rlcik7XHJcbiAgICBzZXRBdHRyaWJ1dGVJZlZhbHVlKHZpZGVvRWwsIFBPU1RFUiwgZ2V0RGF0YSh2aWRlb0VsLCBzZXR0aW5ncy5kYXRhX3Bvc3RlcikpO1xyXG4gICAgc2V0QXR0cmlidXRlSWZWYWx1ZSh2aWRlb0VsLCBTUkMsIGdldERhdGEodmlkZW9FbCwgc2V0dGluZ3MuZGF0YV9zcmMpKTtcclxuICAgIHZpZGVvRWwubG9hZCgpO1xyXG4gIH07XHJcbiAgdmFyIHNldEJhY2tncm91bmQgPSBmdW5jdGlvbiBzZXRCYWNrZ3JvdW5kKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgdmFyIGJnMXhWYWx1ZSA9IGdldERhdGEoZWxlbWVudCwgc2V0dGluZ3MuZGF0YV9iZyk7XHJcbiAgICB2YXIgYmdIaURwaVZhbHVlID0gZ2V0RGF0YShlbGVtZW50LCBzZXR0aW5ncy5kYXRhX2JnX2hpZHBpKTtcclxuICAgIHZhciBiZ0RhdGFWYWx1ZSA9IGlzSGlEcGkgJiYgYmdIaURwaVZhbHVlID8gYmdIaURwaVZhbHVlIDogYmcxeFZhbHVlO1xyXG4gICAgaWYgKCFiZ0RhdGFWYWx1ZSkgcmV0dXJuO1xyXG4gICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcXFwiXCIuY29uY2F0KGJnRGF0YVZhbHVlLCBcIlxcXCIpXCIpO1xyXG4gICAgZ2V0VGVtcEltYWdlKGVsZW1lbnQpLnNldEF0dHJpYnV0ZShTUkMsIGJnRGF0YVZhbHVlKTtcclxuICAgIG1hbmFnZUxvYWRpbmcoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICB9OyAvLyBOT1RFOiBUSEUgVEVNUCBJTUFHRSBUUklDSyBDQU5OT1QgQkUgRE9ORSBXSVRIIGRhdGEtbXVsdGktYmdcclxuICAvLyBCRUNBVVNFIElOU0lERSBJVFMgVkFMVUVTIE1VU1QgQkUgV1JBUFBFRCBXSVRIIFVSTCgpIEFORCBPTkUgT0YgVEhFTVxyXG4gIC8vIENPVUxEIEJFIEEgR1JBRElFTlQgQkFDS0dST1VORCBJTUFHRVxyXG5cclxuICB2YXIgc2V0TXVsdGlCYWNrZ3JvdW5kID0gZnVuY3Rpb24gc2V0TXVsdGlCYWNrZ3JvdW5kKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgdmFyIGJnMXhWYWx1ZSA9IGdldERhdGEoZWxlbWVudCwgc2V0dGluZ3MuZGF0YV9iZ19tdWx0aSk7XHJcbiAgICB2YXIgYmdIaURwaVZhbHVlID0gZ2V0RGF0YShlbGVtZW50LCBzZXR0aW5ncy5kYXRhX2JnX211bHRpX2hpZHBpKTtcclxuICAgIHZhciBiZ0RhdGFWYWx1ZSA9IGlzSGlEcGkgJiYgYmdIaURwaVZhbHVlID8gYmdIaURwaVZhbHVlIDogYmcxeFZhbHVlO1xyXG5cclxuICAgIGlmICghYmdEYXRhVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYmdEYXRhVmFsdWU7XHJcbiAgICBtYW5hZ2VBcHBsaWVkKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgfTtcclxuICB2YXIgc2V0U291cmNlc0Z1bmN0aW9ucyA9IHtcclxuICAgIElNRzogc2V0U291cmNlc0ltZyxcclxuICAgIElGUkFNRTogc2V0U291cmNlc0lmcmFtZSxcclxuICAgIFZJREVPOiBzZXRTb3VyY2VzVmlkZW9cclxuICB9O1xyXG4gIHZhciBzZXRTb3VyY2VzTmF0aXZlID0gZnVuY3Rpb24gc2V0U291cmNlc05hdGl2ZShlbGVtZW50LCBzZXR0aW5ncykge1xyXG4gICAgdmFyIHNldFNvdXJjZXNGdW5jdGlvbiA9IHNldFNvdXJjZXNGdW5jdGlvbnNbZWxlbWVudC50YWdOYW1lXTtcclxuXHJcbiAgICBpZiAoIXNldFNvdXJjZXNGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U291cmNlc0Z1bmN0aW9uKGVsZW1lbnQsIHNldHRpbmdzKTtcclxuICB9O1xyXG4gIHZhciBzZXRTb3VyY2VzID0gZnVuY3Rpb24gc2V0U291cmNlcyhlbGVtZW50LCBzZXR0aW5ncywgaW5zdGFuY2UpIHtcclxuICAgIHZhciBzZXRTb3VyY2VzRnVuY3Rpb24gPSBzZXRTb3VyY2VzRnVuY3Rpb25zW2VsZW1lbnQudGFnTmFtZV07XHJcblxyXG4gICAgaWYgKCFzZXRTb3VyY2VzRnVuY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNvdXJjZXNGdW5jdGlvbihlbGVtZW50LCBzZXR0aW5ncyk7XHJcbiAgICBtYW5hZ2VMb2FkaW5nKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGVsZW1lbnRzV2l0aExvYWRFdmVudCA9IFtcIklNR1wiLCBcIklGUkFNRVwiLCBcIlZJREVPXCJdO1xyXG4gIHZhciBoYXNMb2FkRXZlbnQgPSBmdW5jdGlvbiBoYXNMb2FkRXZlbnQoZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGVsZW1lbnRzV2l0aExvYWRFdmVudC5pbmRleE9mKGVsZW1lbnQudGFnTmFtZSkgPiAtMTtcclxuICB9O1xyXG4gIHZhciBjaGVja0ZpbmlzaCA9IGZ1bmN0aW9uIGNoZWNrRmluaXNoKHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgaWYgKGluc3RhbmNlICYmICFpc1NvbWV0aGluZ0xvYWRpbmcoaW5zdGFuY2UpICYmICFoYXZlRWxlbWVudHNUb0xvYWQoaW5zdGFuY2UpKSB7XHJcbiAgICAgIHNhZmVDYWxsYmFjayhzZXR0aW5ncy5jYWxsYmFja19maW5pc2gsIGluc3RhbmNlKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHZhciBhZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gICAgZWxlbWVudC5sbEV2TGlzbnJzW2V2ZW50TmFtZV0gPSBoYW5kbGVyO1xyXG4gIH07XHJcbiAgdmFyIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XHJcbiAgfTtcclxuICB2YXIgaGFzRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBoYXNFdmVudExpc3RlbmVycyhlbGVtZW50KSB7XHJcbiAgICByZXR1cm4gISFlbGVtZW50LmxsRXZMaXNucnM7XHJcbiAgfTtcclxuICB2YXIgYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyhlbGVtZW50LCBsb2FkSGFuZGxlciwgZXJyb3JIYW5kbGVyKSB7XHJcbiAgICBpZiAoIWhhc0V2ZW50TGlzdGVuZXJzKGVsZW1lbnQpKSBlbGVtZW50LmxsRXZMaXNucnMgPSB7fTtcclxuICAgIHZhciBsb2FkRXZlbnROYW1lID0gZWxlbWVudC50YWdOYW1lID09PSBcIlZJREVPXCIgPyBcImxvYWRlZGRhdGFcIiA6IFwibG9hZFwiO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBsb2FkRXZlbnROYW1lLCBsb2FkSGFuZGxlcik7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIFwiZXJyb3JcIiwgZXJyb3JIYW5kbGVyKTtcclxuICB9O1xyXG4gIHZhciByZW1vdmVFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGVsZW1lbnQpIHtcclxuICAgIGlmICghaGFzRXZlbnRMaXN0ZW5lcnMoZWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBldmVudExpc3RlbmVycyA9IGVsZW1lbnQubGxFdkxpc25ycztcclxuXHJcbiAgICBmb3IgKHZhciBldmVudE5hbWUgaW4gZXZlbnRMaXN0ZW5lcnMpIHtcclxuICAgICAgdmFyIGhhbmRsZXIgPSBldmVudExpc3RlbmVyc1tldmVudE5hbWVdO1xyXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlIGVsZW1lbnQubGxFdkxpc25ycztcclxuICB9O1xyXG4gIHZhciBkb25lSGFuZGxlciA9IGZ1bmN0aW9uIGRvbmVIYW5kbGVyKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgZGVsZXRlVGVtcEltYWdlKGVsZW1lbnQpO1xyXG4gICAgdXBkYXRlTG9hZGluZ0NvdW50KGluc3RhbmNlLCAtMSk7XHJcbiAgICBkZWNyZWFzZVRvTG9hZENvdW50KGluc3RhbmNlKTtcclxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNsYXNzX2xvYWRpbmcpO1xyXG5cclxuICAgIGlmIChzZXR0aW5ncy51bm9ic2VydmVfY29tcGxldGVkKSB7XHJcbiAgICAgIHVub2JzZXJ2ZShlbGVtZW50LCBpbnN0YW5jZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICB2YXIgbG9hZEhhbmRsZXIgPSBmdW5jdGlvbiBsb2FkSGFuZGxlcihldmVudCwgZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICB2YXIgZ29pbmdOYXRpdmUgPSBoYXNTdGF0dXNOYXRpdmUoZWxlbWVudCk7XHJcbiAgICBkb25lSGFuZGxlcihlbGVtZW50LCBzZXR0aW5ncywgaW5zdGFuY2UpO1xyXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuY2xhc3NfbG9hZGVkKTtcclxuICAgIHNldFN0YXR1cyhlbGVtZW50LCBzdGF0dXNMb2FkZWQpO1xyXG4gICAgc2FmZUNhbGxiYWNrKHNldHRpbmdzLmNhbGxiYWNrX2xvYWRlZCwgZWxlbWVudCwgaW5zdGFuY2UpO1xyXG4gICAgaWYgKCFnb2luZ05hdGl2ZSkgY2hlY2tGaW5pc2goc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICB9O1xyXG4gIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbiBlcnJvckhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgdmFyIGdvaW5nTmF0aXZlID0gaGFzU3RhdHVzTmF0aXZlKGVsZW1lbnQpO1xyXG4gICAgZG9uZUhhbmRsZXIoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICAgIGFkZENsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNsYXNzX2Vycm9yKTtcclxuICAgIHNldFN0YXR1cyhlbGVtZW50LCBzdGF0dXNFcnJvcik7XHJcbiAgICBzYWZlQ2FsbGJhY2soc2V0dGluZ3MuY2FsbGJhY2tfZXJyb3IsIGVsZW1lbnQsIGluc3RhbmNlKTtcclxuICAgIGlmICghZ29pbmdOYXRpdmUpIGNoZWNrRmluaXNoKHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgfTtcclxuICB2YXIgYWRkT25lU2hvdEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkT25lU2hvdEV2ZW50TGlzdGVuZXJzKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgdmFyIGVsZW1lbnRUb0xpc3RlblRvID0gZ2V0VGVtcEltYWdlKGVsZW1lbnQpIHx8IGVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKGVsZW1lbnRUb0xpc3RlblRvKSkge1xyXG4gICAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiBsb2FkaW5nIGlzIHJldHJpZWQgdHdpY2VcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfbG9hZEhhbmRsZXIgPSBmdW5jdGlvbiBfbG9hZEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgbG9hZEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGVsZW1lbnRUb0xpc3RlblRvKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9lcnJvckhhbmRsZXIgPSBmdW5jdGlvbiBfZXJyb3JIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgIGVycm9ySGFuZGxlcihldmVudCwgZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoZWxlbWVudFRvTGlzdGVuVG8pO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycyhlbGVtZW50VG9MaXN0ZW5UbywgX2xvYWRIYW5kbGVyLCBfZXJyb3JIYW5kbGVyKTtcclxuICB9O1xyXG5cclxuICB2YXIgbG9hZEJhY2tncm91bmQgPSBmdW5jdGlvbiBsb2FkQmFja2dyb3VuZChlbGVtZW50LCBzZXR0aW5ncywgaW5zdGFuY2UpIHtcclxuICAgIGFkZFRlbXBJbWFnZShlbGVtZW50KTtcclxuICAgIGFkZE9uZVNob3RFdmVudExpc3RlbmVycyhlbGVtZW50LCBzZXR0aW5ncywgaW5zdGFuY2UpO1xyXG4gICAgc2F2ZU9yaWdpbmFsQmFja2dyb3VuZFN0eWxlKGVsZW1lbnQpO1xyXG4gICAgc2V0QmFja2dyb3VuZChlbGVtZW50LCBzZXR0aW5ncywgaW5zdGFuY2UpO1xyXG4gICAgc2V0TXVsdGlCYWNrZ3JvdW5kKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGxvYWRSZWd1bGFyID0gZnVuY3Rpb24gbG9hZFJlZ3VsYXIoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICBhZGRPbmVTaG90RXZlbnRMaXN0ZW5lcnMoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICAgIHNldFNvdXJjZXMoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICB9O1xyXG5cclxuICB2YXIgbG9hZCA9IGZ1bmN0aW9uIGxvYWQoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICBpZiAoaGFzTG9hZEV2ZW50KGVsZW1lbnQpKSB7XHJcbiAgICAgIGxvYWRSZWd1bGFyKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2FkQmFja2dyb3VuZChlbGVtZW50LCBzZXR0aW5ncywgaW5zdGFuY2UpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgdmFyIGxvYWROYXRpdmUgPSBmdW5jdGlvbiBsb2FkTmF0aXZlKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJsb2FkaW5nXCIsIFwibGF6eVwiKTtcclxuICAgIGFkZE9uZVNob3RFdmVudExpc3RlbmVycyhlbGVtZW50LCBzZXR0aW5ncywgaW5zdGFuY2UpO1xyXG4gICAgc2V0U291cmNlc05hdGl2ZShlbGVtZW50LCBzZXR0aW5ncyk7XHJcbiAgICBzZXRTdGF0dXMoZWxlbWVudCwgc3RhdHVzTmF0aXZlKTtcclxuICB9O1xyXG5cclxuICB2YXIgcmVtb3ZlSW1hZ2VBdHRyaWJ1dGVzID0gZnVuY3Rpb24gcmVtb3ZlSW1hZ2VBdHRyaWJ1dGVzKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFNSQyk7XHJcbiAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShTUkNTRVQpO1xyXG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoU0laRVMpO1xyXG4gIH07XHJcblxyXG4gIHZhciByZXNldFNvdXJjZXNJbWcgPSBmdW5jdGlvbiByZXNldFNvdXJjZXNJbWcoZWxlbWVudCkge1xyXG4gICAgZm9yRWFjaFBpY3R1cmVTb3VyY2UoZWxlbWVudCwgZnVuY3Rpb24gKHNvdXJjZVRhZykge1xyXG4gICAgICByZW1vdmVJbWFnZUF0dHJpYnV0ZXMoc291cmNlVGFnKTtcclxuICAgIH0pO1xyXG4gICAgcmVtb3ZlSW1hZ2VBdHRyaWJ1dGVzKGVsZW1lbnQpO1xyXG4gIH07XHJcblxyXG4gIHZhciByZXN0b3JlSW1nID0gZnVuY3Rpb24gcmVzdG9yZUltZyhpbWdFbCkge1xyXG4gICAgZm9yRWFjaFBpY3R1cmVTb3VyY2UoaW1nRWwsIGZ1bmN0aW9uIChzb3VyY2VFbCkge1xyXG4gICAgICByZXN0b3JlT3JpZ2luYWxBdHRycyhzb3VyY2VFbCwgYXR0cnNTcmNTcmNzZXRTaXplcyk7XHJcbiAgICB9KTtcclxuICAgIHJlc3RvcmVPcmlnaW5hbEF0dHJzKGltZ0VsLCBhdHRyc1NyY1NyY3NldFNpemVzKTtcclxuICB9O1xyXG4gIHZhciByZXN0b3JlVmlkZW8gPSBmdW5jdGlvbiByZXN0b3JlVmlkZW8odmlkZW9FbCkge1xyXG4gICAgZm9yRWFjaFZpZGVvU291cmNlKHZpZGVvRWwsIGZ1bmN0aW9uIChzb3VyY2VFbCkge1xyXG4gICAgICByZXN0b3JlT3JpZ2luYWxBdHRycyhzb3VyY2VFbCwgYXR0cnNTcmMpO1xyXG4gICAgfSk7XHJcbiAgICByZXN0b3JlT3JpZ2luYWxBdHRycyh2aWRlb0VsLCBhdHRyc1NyY1Bvc3Rlcik7XHJcbiAgICB2aWRlb0VsLmxvYWQoKTtcclxuICB9O1xyXG4gIHZhciByZXN0b3JlSWZyYW1lID0gZnVuY3Rpb24gcmVzdG9yZUlmcmFtZShpZnJhbWVFbCkge1xyXG4gICAgcmVzdG9yZU9yaWdpbmFsQXR0cnMoaWZyYW1lRWwsIGF0dHJzU3JjKTtcclxuICB9O1xyXG4gIHZhciByZXN0b3JlRnVuY3Rpb25zID0ge1xyXG4gICAgSU1HOiByZXN0b3JlSW1nLFxyXG4gICAgSUZSQU1FOiByZXN0b3JlSWZyYW1lLFxyXG4gICAgVklERU86IHJlc3RvcmVWaWRlb1xyXG4gIH07XHJcblxyXG4gIHZhciByZXN0b3JlQXR0cmlidXRlcyA9IGZ1bmN0aW9uIHJlc3RvcmVBdHRyaWJ1dGVzKGVsZW1lbnQpIHtcclxuICAgIHZhciByZXN0b3JlRnVuY3Rpb24gPSByZXN0b3JlRnVuY3Rpb25zW2VsZW1lbnQudGFnTmFtZV07XHJcblxyXG4gICAgaWYgKCFyZXN0b3JlRnVuY3Rpb24pIHtcclxuICAgICAgcmVzdG9yZU9yaWdpbmFsQmdJbWFnZShlbGVtZW50KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVGdW5jdGlvbihlbGVtZW50KTtcclxuICB9O1xyXG5cclxuICB2YXIgcmVzZXRDbGFzc2VzID0gZnVuY3Rpb24gcmVzZXRDbGFzc2VzKGVsZW1lbnQsIHNldHRpbmdzKSB7XHJcbiAgICBpZiAoaGFzRW1wdHlTdGF0dXMoZWxlbWVudCkgfHwgaGFzU3RhdHVzTmF0aXZlKGVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5jbGFzc19lbnRlcmVkKTtcclxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNsYXNzX2V4aXRlZCk7XHJcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5jbGFzc19hcHBsaWVkKTtcclxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNsYXNzX2xvYWRpbmcpO1xyXG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuY2xhc3NfbG9hZGVkKTtcclxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNsYXNzX2Vycm9yKTtcclxuICB9O1xyXG5cclxuICB2YXIgcmVzdG9yZSA9IGZ1bmN0aW9uIHJlc3RvcmUoZWxlbWVudCwgc2V0dGluZ3MpIHtcclxuICAgIHJlc3RvcmVBdHRyaWJ1dGVzKGVsZW1lbnQpO1xyXG4gICAgcmVzZXRDbGFzc2VzKGVsZW1lbnQsIHNldHRpbmdzKTtcclxuICAgIHJlc2V0U3RhdHVzKGVsZW1lbnQpO1xyXG4gICAgZGVsZXRlT3JpZ2luYWxBdHRycyhlbGVtZW50KTtcclxuICB9O1xyXG5cclxuICB2YXIgY2FuY2VsTG9hZGluZyA9IGZ1bmN0aW9uIGNhbmNlbExvYWRpbmcoZWxlbWVudCwgZW50cnksIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgaWYgKCFzZXR0aW5ncy5jYW5jZWxfb25fZXhpdCkgcmV0dXJuO1xyXG4gICAgaWYgKCFoYXNTdGF0dXNMb2FkaW5nKGVsZW1lbnQpKSByZXR1cm47XHJcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lICE9PSBcIklNR1wiKSByZXR1cm47IC8vV29ya3Mgb25seSBvbiBpbWFnZXNcclxuXHJcbiAgICByZW1vdmVFdmVudExpc3RlbmVycyhlbGVtZW50KTtcclxuICAgIHJlc2V0U291cmNlc0ltZyhlbGVtZW50KTtcclxuICAgIHJlc3RvcmVJbWcoZWxlbWVudCk7XHJcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5jbGFzc19sb2FkaW5nKTtcclxuICAgIHVwZGF0ZUxvYWRpbmdDb3VudChpbnN0YW5jZSwgLTEpO1xyXG4gICAgcmVzZXRTdGF0dXMoZWxlbWVudCk7XHJcbiAgICBzYWZlQ2FsbGJhY2soc2V0dGluZ3MuY2FsbGJhY2tfY2FuY2VsLCBlbGVtZW50LCBlbnRyeSwgaW5zdGFuY2UpO1xyXG4gIH07XHJcblxyXG4gIHZhciBvbkVudGVyID0gZnVuY3Rpb24gb25FbnRlcihlbGVtZW50LCBlbnRyeSwgc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICB2YXIgZG9udExvYWQgPSBoYWRTdGFydGVkTG9hZGluZyhlbGVtZW50KTtcclxuICAgIC8qIFNhdmUgc3RhdHVzIFxyXG4gICAgYmVmb3JlIHNldHRpbmcgaXQsIHRvIHByZXZlbnQgbG9hZGluZyBpdCBhZ2Fpbi4gRml4ZXMgIzUyNi4gKi9cclxuXHJcbiAgICBzZXRTdGF0dXMoZWxlbWVudCwgc3RhdHVzRW50ZXJlZCk7XHJcbiAgICBhZGRDbGFzcyhlbGVtZW50LCBzZXR0aW5ncy5jbGFzc19lbnRlcmVkKTtcclxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNsYXNzX2V4aXRlZCk7XHJcbiAgICB1bm9ic2VydmVFbnRlcmVkKGVsZW1lbnQsIHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgICBzYWZlQ2FsbGJhY2soc2V0dGluZ3MuY2FsbGJhY2tfZW50ZXIsIGVsZW1lbnQsIGVudHJ5LCBpbnN0YW5jZSk7XHJcbiAgICBpZiAoZG9udExvYWQpIHJldHVybjtcclxuICAgIGxvYWQoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICB9O1xyXG4gIHZhciBvbkV4aXQgPSBmdW5jdGlvbiBvbkV4aXQoZWxlbWVudCwgZW50cnksIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgaWYgKGhhc0VtcHR5U3RhdHVzKGVsZW1lbnQpKSByZXR1cm47IC8vSWdub3JlIHRoZSBmaXJzdCBwYXNzLCBhdCBsYW5kaW5nXHJcblxyXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgc2V0dGluZ3MuY2xhc3NfZXhpdGVkKTtcclxuICAgIGNhbmNlbExvYWRpbmcoZWxlbWVudCwgZW50cnksIHNldHRpbmdzLCBpbnN0YW5jZSk7XHJcbiAgICBzYWZlQ2FsbGJhY2soc2V0dGluZ3MuY2FsbGJhY2tfZXhpdCwgZWxlbWVudCwgZW50cnksIGluc3RhbmNlKTtcclxuICB9O1xyXG5cclxuICB2YXIgdGFnc1dpdGhOYXRpdmVMYXp5ID0gW1wiSU1HXCIsIFwiSUZSQU1FXCIsIFwiVklERU9cIl07XHJcbiAgdmFyIHNob3VsZFVzZU5hdGl2ZSA9IGZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZShzZXR0aW5ncykge1xyXG4gICAgcmV0dXJuIHNldHRpbmdzLnVzZV9uYXRpdmUgJiYgXCJsb2FkaW5nXCIgaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGU7XHJcbiAgfTtcclxuICB2YXIgbG9hZEFsbE5hdGl2ZSA9IGZ1bmN0aW9uIGxvYWRBbGxOYXRpdmUoZWxlbWVudHMsIHNldHRpbmdzLCBpbnN0YW5jZSkge1xyXG4gICAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICBpZiAodGFnc1dpdGhOYXRpdmVMYXp5LmluZGV4T2YoZWxlbWVudC50YWdOYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxvYWROYXRpdmUoZWxlbWVudCwgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICAgIH0pO1xyXG4gICAgc2V0VG9Mb2FkQ291bnQoaW5zdGFuY2UsIDApO1xyXG4gIH07XHJcblxyXG4gIHZhciBpc0ludGVyc2VjdGluZyA9IGZ1bmN0aW9uIGlzSW50ZXJzZWN0aW5nKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkuaXNJbnRlcnNlY3RpbmcgfHwgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwO1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRPYnNlcnZlclNldHRpbmdzID0gZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJTZXR0aW5ncyhzZXR0aW5ncykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcm9vdDogc2V0dGluZ3MuY29udGFpbmVyID09PSBkb2N1bWVudCA/IG51bGwgOiBzZXR0aW5ncy5jb250YWluZXIsXHJcbiAgICAgIHJvb3RNYXJnaW46IHNldHRpbmdzLnRocmVzaG9sZHMgfHwgc2V0dGluZ3MudGhyZXNob2xkICsgXCJweFwiXHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIHZhciBpbnRlcnNlY3Rpb25IYW5kbGVyID0gZnVuY3Rpb24gaW50ZXJzZWN0aW9uSGFuZGxlcihlbnRyaWVzLCBzZXR0aW5ncywgaW5zdGFuY2UpIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcclxuICAgICAgcmV0dXJuIGlzSW50ZXJzZWN0aW5nKGVudHJ5KSA/IG9uRW50ZXIoZW50cnkudGFyZ2V0LCBlbnRyeSwgc2V0dGluZ3MsIGluc3RhbmNlKSA6IG9uRXhpdChlbnRyeS50YXJnZXQsIGVudHJ5LCBzZXR0aW5ncywgaW5zdGFuY2UpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIG9ic2VydmVFbGVtZW50cyA9IGZ1bmN0aW9uIG9ic2VydmVFbGVtZW50cyhvYnNlcnZlciwgZWxlbWVudHMpIHtcclxuICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgdmFyIHVwZGF0ZU9ic2VydmVyID0gZnVuY3Rpb24gdXBkYXRlT2JzZXJ2ZXIob2JzZXJ2ZXIsIGVsZW1lbnRzVG9PYnNlcnZlKSB7XHJcbiAgICByZXNldE9ic2VydmVyKG9ic2VydmVyKTtcclxuICAgIG9ic2VydmVFbGVtZW50cyhvYnNlcnZlciwgZWxlbWVudHNUb09ic2VydmUpO1xyXG4gIH07XHJcbiAgdmFyIHNldE9ic2VydmVyID0gZnVuY3Rpb24gc2V0T2JzZXJ2ZXIoc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICBpZiAoIXN1cHBvcnRzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgfHwgc2hvdWxkVXNlTmF0aXZlKHNldHRpbmdzKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaW5zdGFuY2UuX29ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChlbnRyaWVzKSB7XHJcbiAgICAgIGludGVyc2VjdGlvbkhhbmRsZXIoZW50cmllcywgc2V0dGluZ3MsIGluc3RhbmNlKTtcclxuICAgIH0sIGdldE9ic2VydmVyU2V0dGluZ3Moc2V0dGluZ3MpKTtcclxuICB9O1xyXG5cclxuICB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkobm9kZVNldCkge1xyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVTZXQpO1xyXG4gIH07XHJcbiAgdmFyIHF1ZXJ5RWxlbWVudHMgPSBmdW5jdGlvbiBxdWVyeUVsZW1lbnRzKHNldHRpbmdzKSB7XHJcbiAgICByZXR1cm4gc2V0dGluZ3MuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xyXG4gIH07XHJcbiAgdmFyIGV4Y2x1ZGVNYW5hZ2VkRWxlbWVudHMgPSBmdW5jdGlvbiBleGNsdWRlTWFuYWdlZEVsZW1lbnRzKGVsZW1lbnRzKSB7XHJcbiAgICByZXR1cm4gdG9BcnJheShlbGVtZW50cykuZmlsdGVyKGhhc0VtcHR5U3RhdHVzKTtcclxuICB9O1xyXG4gIHZhciBoYXNFcnJvciA9IGZ1bmN0aW9uIGhhc0Vycm9yKGVsZW1lbnQpIHtcclxuICAgIHJldHVybiBoYXNTdGF0dXNFcnJvcihlbGVtZW50KTtcclxuICB9O1xyXG4gIHZhciBmaWx0ZXJFcnJvckVsZW1lbnRzID0gZnVuY3Rpb24gZmlsdGVyRXJyb3JFbGVtZW50cyhlbGVtZW50cykge1xyXG4gICAgcmV0dXJuIHRvQXJyYXkoZWxlbWVudHMpLmZpbHRlcihoYXNFcnJvcik7XHJcbiAgfTtcclxuICB2YXIgZ2V0RWxlbWVudHNUb0xvYWQgPSBmdW5jdGlvbiBnZXRFbGVtZW50c1RvTG9hZChlbGVtZW50cywgc2V0dGluZ3MpIHtcclxuICAgIHJldHVybiBleGNsdWRlTWFuYWdlZEVsZW1lbnRzKGVsZW1lbnRzIHx8IHF1ZXJ5RWxlbWVudHMoc2V0dGluZ3MpKTtcclxuICB9O1xyXG5cclxuICB2YXIgcmV0cnlMYXp5TG9hZCA9IGZ1bmN0aW9uIHJldHJ5TGF6eUxvYWQoc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICB2YXIgZXJyb3JFbGVtZW50cyA9IGZpbHRlckVycm9yRWxlbWVudHMocXVlcnlFbGVtZW50cyhzZXR0aW5ncykpO1xyXG4gICAgZXJyb3JFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHNldHRpbmdzLmNsYXNzX2Vycm9yKTtcclxuICAgICAgcmVzZXRTdGF0dXMoZWxlbWVudCk7XHJcbiAgICB9KTtcclxuICAgIGluc3RhbmNlLnVwZGF0ZSgpO1xyXG4gIH07XHJcbiAgdmFyIHNldE9ubGluZUNoZWNrID0gZnVuY3Rpb24gc2V0T25saW5lQ2hlY2soc2V0dGluZ3MsIGluc3RhbmNlKSB7XHJcbiAgICBpZiAoIXJ1bm5pbmdPbkJyb3dzZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib25saW5lXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0cnlMYXp5TG9hZChzZXR0aW5ncywgaW5zdGFuY2UpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIExhenlMb2FkID0gZnVuY3Rpb24gTGF6eUxvYWQoY3VzdG9tU2V0dGluZ3MsIGVsZW1lbnRzKSB7XHJcbiAgICB2YXIgc2V0dGluZ3MgPSBnZXRFeHRlbmRlZFNldHRpbmdzKGN1c3RvbVNldHRpbmdzKTtcclxuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICB0aGlzLmxvYWRpbmdDb3VudCA9IDA7XHJcbiAgICBzZXRPYnNlcnZlcihzZXR0aW5ncywgdGhpcyk7XHJcbiAgICBzZXRPbmxpbmVDaGVjayhzZXR0aW5ncywgdGhpcyk7XHJcbiAgICB0aGlzLnVwZGF0ZShlbGVtZW50cyk7XHJcbiAgfTtcclxuXHJcbiAgTGF6eUxvYWQucHJvdG90eXBlID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZ2l2ZW5Ob2Rlc2V0KSB7XHJcbiAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuX3NldHRpbmdzO1xyXG4gICAgICB2YXIgZWxlbWVudHNUb0xvYWQgPSBnZXRFbGVtZW50c1RvTG9hZChnaXZlbk5vZGVzZXQsIHNldHRpbmdzKTtcclxuICAgICAgc2V0VG9Mb2FkQ291bnQodGhpcywgZWxlbWVudHNUb0xvYWQubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChpc0JvdCB8fCAhc3VwcG9ydHNJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xyXG4gICAgICAgIHRoaXMubG9hZEFsbChlbGVtZW50c1RvTG9hZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2hvdWxkVXNlTmF0aXZlKHNldHRpbmdzKSkge1xyXG4gICAgICAgIGxvYWRBbGxOYXRpdmUoZWxlbWVudHNUb0xvYWQsIHNldHRpbmdzLCB0aGlzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVwZGF0ZU9ic2VydmVyKHRoaXMuX29ic2VydmVyLCBlbGVtZW50c1RvTG9hZCk7XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgICAgLy8gT2JzZXJ2ZXJcclxuICAgICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB9IC8vIENsZWFuIGN1c3RvbSBhdHRyaWJ1dGVzIG9uIGVsZW1lbnRzXHJcblxyXG5cclxuICAgICAgcXVlcnlFbGVtZW50cyh0aGlzLl9zZXR0aW5ncykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGRlbGV0ZU9yaWdpbmFsQXR0cnMoZWxlbWVudCk7XHJcbiAgICAgIH0pOyAvLyBEZWxldGUgYWxsIGludGVybmFsIHByb3BzXHJcblxyXG4gICAgICBkZWxldGUgdGhpcy5fb2JzZXJ2ZXI7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9zZXR0aW5ncztcclxuICAgICAgZGVsZXRlIHRoaXMubG9hZGluZ0NvdW50O1xyXG4gICAgICBkZWxldGUgdGhpcy50b0xvYWRDb3VudDtcclxuICAgIH0sXHJcbiAgICBsb2FkQWxsOiBmdW5jdGlvbiBsb2FkQWxsKGVsZW1lbnRzKSB7XHJcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncztcclxuICAgICAgdmFyIGVsZW1lbnRzVG9Mb2FkID0gZ2V0RWxlbWVudHNUb0xvYWQoZWxlbWVudHMsIHNldHRpbmdzKTtcclxuICAgICAgZWxlbWVudHNUb0xvYWQuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIHVub2JzZXJ2ZShlbGVtZW50LCBfdGhpcyk7XHJcbiAgICAgICAgbG9hZChlbGVtZW50LCBzZXR0aW5ncywgX3RoaXMpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICByZXN0b3JlQWxsOiBmdW5jdGlvbiByZXN0b3JlQWxsKCkge1xyXG4gICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncztcclxuICAgICAgcXVlcnlFbGVtZW50cyhzZXR0aW5ncykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIHJlc3RvcmUoZWxlbWVudCwgc2V0dGluZ3MpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBMYXp5TG9hZC5sb2FkID0gZnVuY3Rpb24gKGVsZW1lbnQsIGN1c3RvbVNldHRpbmdzKSB7XHJcbiAgICB2YXIgc2V0dGluZ3MgPSBnZXRFeHRlbmRlZFNldHRpbmdzKGN1c3RvbVNldHRpbmdzKTtcclxuICAgIGxvYWQoZWxlbWVudCwgc2V0dGluZ3MpO1xyXG4gIH07XHJcblxyXG4gIExhenlMb2FkLnJlc2V0U3RhdHVzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIHJlc2V0U3RhdHVzKGVsZW1lbnQpO1xyXG4gIH07IC8vIEF1dG9tYXRpYyBpbnN0YW5jZXMgY3JlYXRpb24gaWYgcmVxdWlyZWQgKHVzZWZ1bCBmb3IgYXN5bmMgc2NyaXB0IGxvYWRpbmcpXHJcblxyXG5cclxuICBpZiAocnVubmluZ09uQnJvd3Nlcikge1xyXG4gICAgYXV0b0luaXRpYWxpemUoTGF6eUxvYWQsIHdpbmRvdy5sYXp5TG9hZE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIExhenlMb2FkO1xyXG5cclxufSkpKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBMYXp5TG9hZCBmcm9tICd2YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQnXG5cbm5ldyBMYXp5TG9hZCgpXG4iXSwibmFtZXMiOlsiTGF6eUxvYWQiXSwic291cmNlUm9vdCI6IiJ9