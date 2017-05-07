(function() {
    if (window.magicJS) {
        return
    }
    var a = {
        version: "v2.4.2",
        UUID: 0,
        storage: {},
        $uuid: function(b) {
            return (b.$J_UUID || (b.$J_UUID = ++$J.UUID))
        },
        getStorage: function(b) {
            return ($J.storage[b] || ($J.storage[b] = {}))
        },
        $F: function() { },
        $false: function() {
            return false
        },
        defined: function(b) {
            return (undefined != b)
        },
        exists: function(b) {
            return !!(b)
        },
        j1: function(b) {
            if (!$J.defined(b)) {
                return false
            }
            if (b.$J_TYPE) {
                return b.$J_TYPE
            }
            if (!!b.nodeType) {
                if (1 == b.nodeType) {
                    return "element"
                }
                if (3 == b.nodeType) {
                    return "textnode"
                }
            }
            if (b.length && b.item) {
                return "collection"
            }
            if (b.length && b.callee) {
                return "arguments"
            }
            if ((b instanceof window.Object || b instanceof window.Function) && b.constructor === $J.Class) {
                return "class"
            }
            if (b instanceof window.Array) {
                return "array"
            }
            if (b instanceof window.Function) {
                return "function"
            }
            if (b instanceof window.String) {
                return "string"
            }
            if ($J.j21.trident) {
                if ($J.defined(b.cancelBubble)) {
                    return "event"
                }
            } else {
                if (b instanceof window.Event || b === window.event || b.constructor == window.MouseEvent) {
                    return "event"
                }
            }
            if (b instanceof window.Date) {
                return "date"
            }
            if (b instanceof window.RegExp) {
                return "regexp"
            }
            if (b === window) {
                return "window"
            }
            if (b === document) {
                return "document"
            }
            return typeof (b)
        },
        extend: function(j, g) {
            if (!(j instanceof window.Array)) {
                j = [j]
            }
            for (var f = 0, c = j.length; f < c; f++) {
                if (!$J.defined(j)) {
                    continue
                }
                for (var d in (g || {})) {
                    try {
                        j[f][d] = g[d]
                    } catch (b) { }
                }
            }
            return j[0]
        },
        implement: function(g, f) {
            if (!(g instanceof window.Array)) {
                g = [g]
            }
            for (var d = 0, b = g.length; d < b; d++) {
                if (!$J.defined(g[d])) {
                    continue
                }
                if (!g[d].prototype) {
                    continue
                }
                for (var c in (f || {})) {
                    if (!g[d].prototype[c]) {
                        g[d].prototype[c] = f[c]
                    }
                }
            }
            return g[0]
        },
        nativize: function(d, c) {
            if (!$J.defined(d)) {
                return d
            }
            for (var b in (c || {})) {
                if (!d[b]) {
                    d[b] = c[b]
                }
            }
            return d
        },
        $try: function() {
            for (var c = 0, b = arguments.length; c < b; c++) {
                try {
                    return arguments[c]()
                } catch (d) { }
            }
            return null
        },
        $A: function(d) {
            if (!$J.defined(d)) {
                return $mjs([])
            }
            if (d.toArray) {
                return $mjs(d.toArray())
            }
            if (d.item) {
                var c = d.length || 0,
                    b = new Array(c);
                while (c--) {
                    b[c] = d[c]
                }
                return $mjs(b)
            }
            return $mjs(Array.prototype.slice.call(d))
        },
        now: function() {
            return new Date().getTime()
        },
        detach: function(g) {
            var d;
            switch ($J.j1(g)) {
                case "object":
                    d = {};
                    for (var f in g) {
                        d[f] = $J.detach(g[f])
                    }
                    break;
                case "array":
                    d = [];
                    for (var c = 0, b = g.length; c < b; c++) {
                        d[c] = $J.detach(g[c])
                    }
                    break;
                default:
                    return g
            }
            return $J.$(d)
        },
        $: function(c) {
            if (!$J.defined(c)) {
                return null
            }
            if (c.$J_EXTENDED) {
                return c
            }
            switch ($J.j1(c)) {
                case "array":
                    c = $J.nativize(c, $J.extend($J.Array, {
                        $J_EXTENDED: $J.$F
                    }));
                    c.j14 = c.forEach;
                    return c;
                    break;
                case "string":
                    var b = document.getElementById(c);
                    if ($J.defined(b)) {
                        return $J.$(b)
                    }
                    return null;
                    break;
                case "window":
                case "document":
                    $J.$uuid(c);
                    c = $J.extend(c, $J.Doc);
                    break;
                case "element":
                    $J.$uuid(c);
                    c = $J.extend(c, $J.Element);
                    break;
                case "event":
                    c = $J.extend(c, $J.Event);
                    break;
                case "textnode":
                    return c;
                    break;
                case "function":
                case "array":
                case "date":
                default:
                    break
            }
            return $J.extend(c, {
                $J_EXTENDED: $J.$F
            })
        },
        $new: function(b, d, c) {
            return $mjs($J.doc.createElement(b)).setProps(d || {}).j6(c || {})
        }
    };
    window.magicJS = window.$J = a;
    window.$mjs = a.$;
    $J.Array = {
        $J_TYPE: "array",
        indexOf: function(f, g) {
            var b = this.length;
            for (var c = this.length, d = (g < 0) ? Math.max(0, c + g) : g || 0; d < c; d++) {
                if (this[d] === f) {
                    return d
                }
            }
            return -1
        },
        contains: function(b, c) {
            return this.indexOf(b, c) != -1
        },
        forEach: function(b, f) {
            for (var d = 0, c = this.length; d < c; d++) {
                if (d in this) {
                    b.call(f, this[d], d, this)
                }
            }
        },
        filter: function(b, j) {
            var g = [];
            for (var f = 0, c = this.length; f < c; f++) {
                if (f in this) {
                    var d = this[f];
                    if (b.call(j, this[f], f, this)) {
                        g.push(d)
                    }
                }
            }
            return g
        },
        map: function(b, g) {
            var f = [];
            for (var d = 0, c = this.length; d < c; d++) {
                if (d in this) {
                    f[d] = b.call(g, this[d], d, this)
                }
            }
            return f
        }
    };
    $J.implement(String, {
        $J_TYPE: "string",
        j26: function() {
            return this.replace(/^\s+|\s+$/g, "")
        },
        trimLeft: function() {
            return this.replace(/^\s+/g, "")
        },
        trimRight: function() {
            return this.replace(/\s+$/g, "")
        },
        j25: function(b) {
            return (this.toString() === b.toString())
        },
        icompare: function(b) {
            return (this.toLowerCase().toString() === b.toLowerCase().toString())
        },
        j22: function() {
            return this.replace(/-\D/g, function(b) {
                return b.charAt(1).toUpperCase()
            })
        },
        dashize: function() {
            return this.replace(/[A-Z]/g, function(b) {
                return ("-" + b.charAt(0).toLowerCase())
            })
        },
        j17: function(c) {
            return parseInt(this, c || 10)
        },
        toFloat: function() {
            return parseFloat(this)
        },
        j18: function() {
            return !this.replace(/true/i, "").j26()
        },
        has: function(c, b) {
            b = b || "";
            return (b + this + b).indexOf(b + c + b) > -1
        }
    });
    a.implement(Function, {
        $J_TYPE: "function",
        j24: function() {
            var c = $J.$A(arguments),
                b = this,
                d = c.shift();
            return function() {
                return b.apply(d || null, c.concat($J.$A(arguments)))
            }
        },
        j16: function() {
            var c = $J.$A(arguments),
                b = this,
                d = c.shift();
            return function(f) {
                return b.apply(d || null, $mjs([f || window.event]).concat(c))
            }
        },
        j27: function() {
            var c = $J.$A(arguments),
                b = this,
                d = c.shift();
            return window.setTimeout(function() {
                return b.apply(b, c)
            }, d || 0)
        },
        j28: function() {
            var c = $J.$A(arguments),
                b = this;
            return function() {
                return b.j27.apply(b, c)
            }
        },
        interval: function() {
            var c = $J.$A(arguments),
                b = this,
                d = c.shift();
            return window.setInterval(function() {
                return b.apply(b, c)
            }, d || 0)
        }
    });
    $J.j21 = {
        features: {
            xpath: !!(document.evaluate),
            air: !!(window.runtime),
            query: !!(document.querySelector)
        },
        engine: (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (!navigator.taintEnabled) ? "webkit" : (undefined != document.getBoxObjectFor || null != window.mozInnerScreenY) ? "gecko" : "unknown",
        version: "",
        platform: ($J.defined(window.orientation)) ? "ipod" : (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
        backCompat: document.compatMode && "backcompat" == document.compatMode.toLowerCase(),
        getDoc: function() {
            return (document.compatMode && "backcompat" == document.compatMode.toLowerCase()) ? document.body : document.documentElement
        },
        ready: false,
        onready: function() {
            if ($J.j21.ready) {
                return
            }
            $J.j21.ready = true;
            $J.body = $mjs(document.body);
            $mjs(document).raiseEvent("domready")
        }
    };
    (function() {
        function b() {
            return !!(arguments.callee.caller)
        }
        $J.j21.version = ("presto" == $J.j21.engine) ? !!(document.head) ? 270 : !!(window.applicationCache) ? 260 : !!(window.localStorage) ? 250 : ($J.j21.features.query) ? 220 : ((b()) ? 211 : ((document.getElementsByClassName) ? 210 : 200)) : ("trident" == $J.j21.engine) ? !!(window.msPerformance || window.performance) ? 900 : !!(window.XMLHttpRequest && window.postMessage) ? 6 : ((window.XMLHttpRequest) ? 5 : 4) : ("webkit" == $J.j21.engine) ? (($J.j21.features.xpath) ? (($J.j21.features.query) ? 525 : 420) : 419) : ("gecko" == $J.j21.engine) ? !!(document.head) ? 200 : !!document.readyState ? 192 : !!(window.localStorage) ? 191 : ((document.getElementsByClassName) ? 190 : 181) : "";
        $J.j21[$J.j21.engine] = $J.j21[$J.j21.engine + $J.j21.version] = true;
        if (window.chrome) {
            $J.j21.chrome = true
        }
    })();
    $J.Element = {
        j13: function(b) {
            return this.className.has(b, " ")
        },
        j2: function(b) {
            if (b && !this.j13(b)) {
                this.className += (this.className ? " " : "") + b
            }
            return this
        },
        j3: function(b) {
            b = b || ".*";
            this.className = this.className.replace(new RegExp("(^|\\s)" + b + "(?:\\s|$)"), "$1").j26();
            return this
        },
        j4: function(b) {
            return this.j13(b) ? this.j3(b) : this.j2(b)
        },
        j5: function(c) {
            c = (c == "float" && this.currentStyle) ? "styleFloat" : c.j22();
            var b = null;
            if (this.currentStyle) {
                b = this.currentStyle[c]
            } else {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    css = document.defaultView.getComputedStyle(this, null);
                    b = css ? css.getPropertyValue([c.dashize()]) : null
                }
            }
            if (!b) {
                b = this.style[c]
            }
            if ("opacity" == c) {
                return $J.defined(b) ? parseFloat(b) : 1
            }
            if (/^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/.test(c)) {
                b = parseInt(b) ? b : "0px"
            }
            return ("auto" == b ? null : b)
        },
        j6Prop: function(c, b) {
            try {
                if ("opacity" == c) {
                    this.j23(b);
                    return this
                }
                if ("float" == c) {
                    this.style[("undefined" === typeof (this.style.styleFloat)) ? "cssFloat" : "styleFloat"] = b;
                    return this
                }
                this.style[c.j22()] = b + (("number" == $J.j1(b) && !$mjs(["zIndex", "zoom"]).contains(c.j22())) ? "px" : "")
            } catch (d) { }
            return this
        },
        j6: function(c) {
            for (var b in c) {
                this.j6Prop(b, c[b])
            }
            return this
        },
        j19s: function() {
            var b = {};
            $J.$A(arguments).j14(function(c) {
                b[c] = this.j5(c)
            }, this);
            return b
        },
        j23: function(g, c) {
            c = c || false;
            g = parseFloat(g);
            if (c) {
                if (g == 0) {
                    if ("hidden" != this.style.visibility) {
                        this.style.visibility = "hidden"
                    }
                } else {
                    if ("visible" != this.style.visibility) {
                        this.style.visibility = "visible"
                    }
                }
            }
            if ($J.j21.trident) {
                if (!this.currentStyle || !this.currentStyle.hasLayout) {
                    this.style.zoom = 1
                }
                try {
                    var d = this.filters.item("DXImageTransform.Microsoft.Alpha");
                    d.enabled = (1 != g);
                    d.opacity = g * 100
                } catch (b) {
                    this.style.filter += (1 == g) ? "" : "progid:DXImageTransform.Microsoft.Alpha(enabled=true,opacity=" + g * 100 + ")"
                }
            }
            this.style.opacity = g;
            return this
        },
        setProps: function(b) {
            for (var c in b) {
                this.setAttribute(c, "" + b[c])
            }
            return this
        },
        hide: function() {
            return this.j6({
                display: "none",
                visibility: "hidden"
            })
        },
        show: function() {
            return this.j6({
                display: "block",
                visibility: "visible"
            })
        },
        j7: function() {
            return {
                width: this.offsetWidth,
                height: this.offsetHeight
            }
        },
        j10: function() {
            return {
                top: this.scrollTop,
                left: this.scrollLeft
            }
        },
        j11: function() {
            var b = this,
                c = {
                    top: 0,
                    left: 0
                };
            do {
                c.left += b.scrollLeft || 0;
                c.top += b.scrollTop || 0;
                b = b.parentNode
            } while (b);
            return c
        },
        j8: function() {
            if ($J.defined(document.documentElement.getBoundingClientRect)) {
                var c = this.getBoundingClientRect(),
                    f = $mjs(document).j10(),
                    i = $J.j21.getDoc();
                return {
                    top: c.top + f.y - i.clientTop,
                    left: c.left + f.x - i.clientLeft
                }
            }
            var g = this,
                d = t = 0;
            do {
                d += g.offsetLeft || 0;
                t += g.offsetTop || 0;
                g = g.offsetParent
            } while (g && !(/^(?:body|html)$/i).test(g.tagName));
            return {
                top: t,
                left: d
            }
        },
        j9: function() {
            var c = this.j8();
            var b = this.j7();
            return {
                top: c.top,
                bottom: c.top + b.height,
                left: c.left,
                right: c.left + b.width
            }
        },
        update: function(d) {
            try {
                this.innerHTML = d
            } catch (b) {
                this.innerText = d
            }
            return this
        },
        remove: function() {
            return (this.parentNode) ? this.parentNode.removeChild(this) : this
        },
        kill: function() {
            $J.$A(this.childNodes).j14(function(b) {
                if (3 == b.nodeType || 8 == b.nodeType) {
                    return
                }
                $mjs(b).kill()
            });
            this.remove();
            this.je3();
            if (this.$J_UUID) {
                $J.storage[this.$J_UUID] = null;
                delete $J.storage[this.$J_UUID]
            }
            return null
        },
        append: function(d, c) {
            c = c || "bottom";
            var b = this.firstChild;
            ("top" == c && b) ? this.insertBefore(d, b) : this.appendChild(d);
            return this
        },
        j32: function(d, c) {
            var b = $mjs(d).append(this, c);
            return this
        },
        enclose: function(b) {
            this.append(b.parentNode.replaceChild(this, b));
            return this
        },
        hasChild: function(b) {
            if (!(b = $mjs(b))) {
                return false
            }
            return (this == b) ? false : (this.contains && !($J.j21.webkit419)) ? (this.contains(b)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(b) & 16) : $J.$A(this.byTag(b.tagName)).contains(b)
        }
    };
    $J.Element.j19 = $J.Element.j5;
    $J.Element.j20 = $J.Element.j6;
    if (!window.Element) {
        window.Element = $J.$F;
        if ($J.j21.engine.webkit) {
            window.document.createElement("iframe")
        }
        window.Element.prototype = ($J.j21.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
    }
    $J.implement(window.Element, {
        $J_TYPE: "element"
    });
    $J.Doc = {
        j7: function() {
            if ($J.j21.presto925 || $J.j21.webkit419) {
                return {
                    width: self.innerWidth,
                    height: self.innerHeight
                }
            }
            return {
                width: $J.j21.getDoc().clientWidth,
                height: $J.j21.getDoc().clientHeight
            }
        },
        j10: function() {
            return {
                x: self.pageXOffset || $J.j21.getDoc().scrollLeft,
                y: self.pageYOffset || $J.j21.getDoc().scrollTop
            }
        },
        j12: function() {
            var b = this.j7();
            return {
                width: Math.max($J.j21.getDoc().scrollWidth, b.width),
                height: Math.max($J.j21.getDoc().scrollHeight, b.height)
            }
        }
    };
    $J.extend(document, {
        $J_TYPE: "document"
    });
    $J.extend(window, {
        $J_TYPE: "window"
    });
    $J.extend([$J.Element, $J.Doc], {
        j29: function(f, c) {
            var b = $J.getStorage(this.$J_UUID),
                d = b[f];
            if (undefined != c && undefined == d) {
                d = b[f] = c
            }
            return ($J.defined(d) ? d : null)
        },
        j30: function(d, c) {
            var b = $J.getStorage(this.$J_UUID);
            b[d] = c;
            return this
        },
        j31: function(c) {
            var b = $J.getStorage(this.$J_UUID);
            delete b[c];
            return this
        }
    });
    if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
        $J.extend([$J.Element, $J.Doc], {
            getElementsByClassName: function(b) {
                return $J.$A(this.getElementsByTagName("*")).filter(function(d) {
                    try {
                        return (1 == d.nodeType && d.className.has(b, " "))
                    } catch (c) { }
                })
            }
        })
    }
    $J.extend([$J.Element, $J.Doc], {
        byClass: function() {
            return this.getElementsByClassName(arguments[0])
        },
        byTag: function() {
            return this.getElementsByTagName(arguments[0])
        }
    });
    $J.Event = {
        $J_TYPE: "event",
        stop: function() {
            if (this.stopPropagation) {
                this.stopPropagation()
            } else {
                this.cancelBubble = true
            }
            if (this.preventDefault) {
                this.preventDefault()
            } else {
                this.returnValue = false
            }
            return this
        },
        j15: function() {
            return {
                x: this.pageX || this.clientX + $J.j21.getDoc().scrollLeft,
                y: this.pageY || this.clientY + $J.j21.getDoc().scrollTop
            }
        },
        getTarget: function() {
            var b = this.target || this.srcElement;
            while (b && 3 == b.nodeType) {
                b = b.parentNode
            }
            return b
        },
        getRelated: function() {
            var c = null;
            switch (this.type) {
                case "mouseover":
                    c = this.relatedTarget || this.fromElement;
                    break;
                case "mouseout":
                    c = this.relatedTarget || this.toElement;
                    break;
                default:
                    return c
            }
            try {
                while (c && 3 == c.nodeType) {
                    c = c.parentNode
                }
            } catch (b) {
                c = null
            }
            return c
        },
        getButton: function() {
            if (!this.which && this.button !== undefined) {
                return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
            }
            return this.which
        }
    };
    $J._event_add_ = "addEventListener";
    $J._event_del_ = "removeEventListener";
    $J._event_prefix_ = "";
    if (!document.addEventListener) {
        $J._event_add_ = "attachEvent";
        $J._event_del_ = "detachEvent";
        $J._event_prefix_ = "on"
    }
    $J.extend([$J.Element, $J.Doc], {
        je1: function(f, d) {
            var i = ("domready" == f) ? false : true,
                c = this.j29("events", {});
            c[f] = c[f] || {};
            if (c[f].hasOwnProperty(d.$J_EUID)) {
                return this
            }
            if (!d.$J_EUID) {
                d.$J_EUID = Math.floor(Math.random() * $J.now())
            }
            var b = this,
                g = function(j) {
                    return d.call(b)
                };
            if ("domready" == f) {
                if ($J.j21.ready) {
                    d.call(this);
                    return this
                }
            }
            if (i) {
                g = function(j) {
                    j = $J.extend(j || window.e, {
                        $J_TYPE: "event"
                    });
                    return d.call(b, $mjs(j))
                };
                this[$J._event_add_]($J._event_prefix_ + f, g, false)
            }
            c[f][d.$J_EUID] = g;
            return this
        },
        je2: function(f) {
            var i = ("domready" == f) ? false : true,
                c = this.j29("events");
            if (!c || !c[f]) {
                return this
            }
            var g = c[f],
                d = arguments[1] || null;
            if (f && !d) {
                for (var b in g) {
                    if (!g.hasOwnProperty(b)) {
                        continue
                    }
                    this.je2(f, b)
                }
                return this
            }
            d = ("function" == $J.j1(d)) ? d.$J_EUID : d;
            if (!g.hasOwnProperty(d)) {
                return this
            }
            if ("domready" == f) {
                i = false
            }
            if (i) {
                this[$J._event_del_]($J._event_prefix_ + f, g[d], false)
            }
            delete g[d];
            return this
        },
        raiseEvent: function(f, c) {
            var l = ("domready" == f) ? false : true,
                j = this,
                i;
            if (!l) {
                var d = this.j29("events");
                if (!d || !d[f]) {
                    return this
                }
                var g = d[f];
                for (var b in g) {
                    if (!g.hasOwnProperty(b)) {
                        continue
                    }
                    g[b].call(this)
                }
                return this
            }
            if (j === document && document.createEvent && !el.dispatchEvent) {
                j = document.documentElement
            }
            if (document.createEvent) {
                i = document.createEvent(f);
                i.initEvent(c, true, true)
            } else {
                i = document.createEventObject();
                i.eventType = f
            }
            if (document.createEvent) {
                j.dispatchEvent(i)
            } else {
                j.fireEvent("on" + c, i)
            }
            return i
        },
        je3: function() {
            var b = this.j29("events");
            if (!b) {
                return this
            }
            for (var c in b) {
                this.je2(c)
            }
            this.j31("events");
            return this
        }
    });
    (function() {
        if ($J.j21.webkit && $J.j21.version < 420) {
            (function() {
                ($mjs(["loaded", "complete"]).contains(document.readyState)) ? $J.j21.onready() : arguments.callee.j27(50)
            })()
        } else {
            if ($J.j21.trident && window == top) {
                (function() {
                    ($J.$try(function() {
                        $J.j21.getDoc().doScroll("left");
                        return true
                    })) ? $J.j21.onready() : arguments.callee.j27(50)
                })()
            } else {
                $mjs(document).je1("DOMContentLoaded", $J.j21.onready);
                $mjs(window).je1("load", $J.j21.onready)
            }
        }
    })();
    $J.Class = function() {
        var g = null,
            c = $J.$A(arguments);
        if ("class" == $J.j1(c[0])) {
            g = c.shift()
        }
        var b = function() {
            for (var l in this) {
                this[l] = $J.detach(this[l])
            }
            if (this.constructor.$parent) {
                this.$parent = {};
                var o = this.constructor.$parent;
                for (var n in o) {
                    var j = o[n];
                    switch ($J.j1(j)) {
                        case "function":
                            this.$parent[n] = $J.Class.wrap(this, j);
                            break;
                        case "object":
                            this.$parent[n] = $J.detach(j);
                            break;
                        case "array":
                            this.$parent[n] = $J.detach(j);
                            break
                    }
                }
            }
            var i = (this.init) ? this.init.apply(this, arguments) : this;
            delete this.caller;
            return i
        };
        if (!b.prototype.init) {
            b.prototype.init = $J.$F
        }
        if (g) {
            var f = function() { };
            f.prototype = g.prototype;
            b.prototype = new f;
            b.$parent = {};
            for (var d in g.prototype) {
                b.$parent[d] = g.prototype[d]
            }
        } else {
            b.$parent = null
        }
        b.constructor = $J.Class;
        b.prototype.constructor = b;
        $J.extend(b.prototype, c[0]);
        $J.extend(b, {
            $J_TYPE: "class"
        });
        return b
    };
    a.Class.wrap = function(b, c) {
        return function() {
            var f = this.caller;
            var d = c.apply(b, arguments);
            return d
        }
    };
    $J.FX = new $J.Class({
        options: {
            fps: 50,
            duration: 500,
            transition: function(b) {
                return -(Math.cos(Math.PI * b) - 1) / 2
            },
            onStart: $J.$F,
            onComplete: $J.$F,
            onBeforeRender: $J.$F
        },
        styles: null,
        init: function(c, b) {
            this.el = $mjs(c);
            this.options = $J.extend(this.options, b);
            this.timer = false
        },
        start: function(b) {
            this.styles = b;
            this.state = 0;
            this.curFrame = 0;
            this.startTime = $J.now();
            this.finishTime = this.startTime + this.options.duration;
            this.timer = this.loop.j24(this).interval(Math.round(1000 / this.options.fps));
            this.options.onStart.call();
            return this
        },
        stop: function(b) {
            b = $J.defined(b) ? b : false;
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = false
            }
            if (b) {
                this.render(1);
                this.options.onComplete.j27(10)
            }
            return this
        },
        calc: function(d, c, b) {
            return (c - d) * b + d
        },
        loop: function() {
            var c = $J.now();
            if (c >= this.finishTime) {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = false
                }
                this.render(1);
                this.options.onComplete.j27(10);
                return this
            }
            var b = this.options.transition((c - this.startTime) / this.options.duration);
            this.render(b)
        },
        render: function(b) {
            var c = {};
            for (var d in this.styles) {
                if ("opacity" === d) {
                    c[d] = Math.round(this.calc(this.styles[d][0], this.styles[d][1], b) * 100) / 100
                } else {
                    c[d] = Math.round(this.calc(this.styles[d][0], this.styles[d][1], b))
                }
            }
            this.options.onBeforeRender(c);
            this.set(c)
        },
        set: function(b) {
            return this.el.j6(b)
        }
    });
    $J.FX.Transition = {
        linear: function(b) {
            return b
        },
        sineIn: function(b) {
            return -(Math.cos(Math.PI * b) - 1) / 2
        },
        sineOut: function(b) {
            return 1 - $J.FX.Transition.sineIn(1 - b)
        },
        expoIn: function(b) {
            return Math.pow(2, 8 * (b - 1))
        },
        expoOut: function(b) {
            return 1 - $J.FX.Transition.expoIn(1 - b)
        },
        quadIn: function(b) {
            return Math.pow(b, 2)
        },
        quadOut: function(b) {
            return 1 - $J.FX.Transition.quadIn(1 - b)
        },
        cubicIn: function(b) {
            return Math.pow(b, 3)
        },
        cubicOut: function(b) {
            return 1 - $J.FX.Transition.cubicIn(1 - b)
        },
        backIn: function(c, b) {
            b = b || 1.618;
            return Math.pow(c, 2) * ((b + 1) * c - b)
        },
        backOut: function(c, b) {
            return 1 - $J.FX.Transition.backIn(1 - c)
        },
        elasticIn: function(c, b) {
            b = b || [];
            return Math.pow(2, 10 * --c) * Math.cos(20 * c * Math.PI * (b[0] || 1) / 3)
        },
        elasticOut: function(c, b) {
            return 1 - $J.FX.Transition.elasticIn(1 - c, b)
        },
        bounceIn: function(f) {
            for (var d = 0, c = 1; 1; d += c, c /= 2) {
                if (f >= (7 - 4 * d) / 11) {
                    return c * c - Math.pow((11 - 6 * d - 11 * f) / 4, 2)
                }
            }
        },
        bounceOut: function(b) {
            return 1 - $J.FX.Transition.bounceIn(1 - b)
        },
        none: function(b) {
            return 0
        }
    };
    $J.PFX = new $J.Class($J.FX, {
        init: function(b, c) {
            this.el_arr = b;
            this.options = $J.extend(this.options, c);
            this.timer = false
        },
        start: function(b) {
            this.$parent.start([]);
            this.styles_arr = b;
            return this
        },
        render: function(b) {
            for (var c = 0; c < this.el_arr.length; c++) {
                this.el = $mjs(this.el_arr[c]);
                this.styles = this.styles_arr[c];
                this.$parent.render(b)
            }
        }
    });
    $J.FX.Slide = new $J.Class($J.FX, {
        options: {
            mode: "vertical"
        },
        init: function(c, b) {
            this.el = $mjs(c);
            this.options = $J.extend(this.$parent.options, this.options);
            this.$parent.init(c, b);
            this.wrapper = this.el.j29("slide:wrapper");
            this.wrapper = this.wrapper || $J.$new("DIV").j6($J.extend(this.el.j19s("margin-top", "margin-left", "margin-right", "margin-bottom", "position", "top", "float"), {
                overflow: "hidden"
            })).enclose(this.el);
            this.el.j30("slide:wrapper", this.wrapper).j6({
                margin: 0
            })
        },
        vertical: function() {
            this.margin = "margin-top";
            this.layout = "height";
            this.offset = this.el.offsetHeight
        },
        horizontal: function(b) {
            this.margin = "margin-" + (b || "left");
            this.layout = "width";
            this.offset = this.el.offsetWidth
        },
        right: function() {
            this.horizontal()
        },
        left: function() {
            this.horizontal("right")
        },
        start: function(d, i) {
            this[i || this.options.mode]();
            var g = this.el.j5(this.margin).j17(),
                f = this.wrapper.j5(this.layout).j17(),
                b = {},
                j = {},
                c;
            b[this.margin] = [g, 0],
            b[this.layout] = [0, this.offset],
            j[this.margin] = [g, -this.offset],
            j[this.layout] = [f, 0];
            switch (d) {
                case "in":
                    c = b;
                    break;
                case "out":
                    c = j;
                    break;
                case "toggle":
                    c = (0 == f) ? b : j;
                    break
            }
            this.$parent.start(c);
            return this
        },
        set: function(b) {
            this.el.j6Prop(this.margin, b[this.margin]);
            this.wrapper.j6Prop(this.layout, b[this.layout]);
            return this
        },
        slideIn: function(b) {
            return this.start("in", b)
        },
        slideOut: function(b) {
            return this.start("out", b)
        },
        hide: function(c) {
            this[c || this.options.mode]();
            var b = {};
            b[this.layout] = 0,
            b[this.margin] = -this.offset;
            return this.set(b)
        },
        show: function(c) {
            this[c || this.options.mode]();
            var b = {};
            b[this.layout] = this.offset,
            b[this.margin] = 0;
            return this.set(b)
        },
        toggle: function(b) {
            return this.start("toggle", b)
        }
    });
    $J.win = $mjs(window);
    $J.doc = $mjs(document)
})();
$J.$Ff = function() {
    return false
};
var MagicZoom = {
    version: "v3.1.28",
    options: {},
    defaults: {
        opacity: 50,
        opacityReverse: false,
        smoothingSpeed: 40,
        fps: 25,
        zoomWidth: 300,
        zoomHeight: 300,
        zoomDistance: 15,
        zoomPosition: "right",
        dragMode: false,
        moveOnClick: false,
        alwaysShowZoom: false,
        preservePosition: false,
        x: -1,
        y: -1,
        clickToActivate: false,
        clickToInitialize: false,
        smoothing: true,
        showTitle: "top",
        thumbChange: "click",
        zoomFade: false,
        zoomFadeInSpeed: 400,
        zoomFadeOutSpeed: 200,
        hotspots: "",
        preloadSelectorsSmall: true,
        preloadSelectorsBig: false,
        showLoading: true,
        loadingMsg: "Loading zoom..",
        loadingOpacity: 75,
        loadingPositionX: -1,
        loadingPositionY: -1,
        selectorsMouseoverDelay: 200,
        selectorsEffect: "dissolve",
        selectorsEffectSpeed: 400,
        fitZoomWindow: true,
        entireImage: false,
        enableRightClick: false,
        mouseoverDelay: 0
    },
    z40: $mjs([/^(opacity)(\s+)?:(\s+)?(\d+)$/i, /^(opacity-reverse)(\s+)?:(\s+)?(true|false)$/i, /^(smoothing\-speed)(\s+)?:(\s+)?(\d+)$/i, /^(fps)(\s+)?:(\s+)?(\d+)$/i, /^(zoom\-width)(\s+)?:(\s+)?(\d+)(px)?/i, /^(zoom\-height)(\s+)?:(\s+)?(\d+)(px)?/i, /^(zoom\-distance)(\s+)?:(\s+)?(\d+)(px)?/i, /^(zoom\-position)(\s+)?:(\s+)?(right|left|top|bottom|custom|inner)$/i, /^(drag\-mode)(\s+)?:(\s+)?(true|false)$/i, /^(move\-on\-click)(\s+)?:(\s+)?(true|false)$/i, /^(always\-show\-zoom)(\s+)?:(\s+)?(true|false)$/i, /^(preserve\-position)(\s+)?:(\s+)?(true|false)$/i, /^(x)(\s+)?:(\s+)?([\d.]+)(px)?/i, /^(y)(\s+)?:(\s+)?([\d.]+)(px)?/i, /^(click\-to\-activate)(\s+)?:(\s+)?(true|false)$/i, /^(click\-to\-initialize)(\s+)?:(\s+)?(true|false)$/i, /^(smoothing)(\s+)?:(\s+)?(true|false)$/i, /^(show\-title)(\s+)?:(\s+)?(true|false|top|bottom)$/i, /^(thumb\-change)(\s+)?:(\s+)?(click|mouseover)$/i, /^(zoom\-fade)(\s+)?:(\s+)?(true|false)$/i, /^(zoom\-fade\-in\-speed)(\s+)?:(\s+)?(\d+)$/i, /^(zoom\-fade\-out\-speed)(\s+)?:(\s+)?(\d+)$/i, /^(hotspots)(\s+)?:(\s+)?([a-z0-9_\-:\.]+)$/i, /^(preload\-selectors\-small)(\s+)?:(\s+)?(true|false)$/i, /^(preload\-selectors\-big)(\s+)?:(\s+)?(true|false)$/i, /^(show\-loading)(\s+)?:(\s+)?(true|false)$/i, /^(loading\-msg)(\s+)?:(\s+)?([^;]*)$/i, /^(loading\-opacity)(\s+)?:(\s+)?(\d+)$/i, /^(loading\-position\-x)(\s+)?:(\s+)?(\d+)(px)?/i, /^(loading\-position\-y)(\s+)?:(\s+)?(\d+)(px)?/i, /^(selectors\-mouseover\-delay)(\s+)?:(\s+)?(\d+)$/i, /^(selectors\-effect)(\s+)?:(\s+)?(dissolve|fade|false)$/i, /^(selectors\-effect\-speed)(\s+)?:(\s+)?(\d+)$/i, /^(fit\-zoom\-window)(\s+)?:(\s+)?(true|false)$/i, /^(entire\-image)(\s+)?:(\s+)?(true|false)$/i, /^(enable\-right\-click)(\s+)?:(\s+)?(true|false)$/i, /^(mouseover\-delay)(\s+)?:(\s+)?(\d+)$/i]),
    zooms: $mjs([]),
    z9: function(b) {
        for (var a = 0; a < MagicZoom.zooms.length; a++) {
            if (MagicZoom.zooms[a].z31) {
                MagicZoom.zooms[a].pause()
            } else {
                if (MagicZoom.zooms[a].options.clickToInitialize && MagicZoom.zooms[a].initMouseEvent) {
                    MagicZoom.zooms[a].initMouseEvent = b
                }
            }
        }
    },
    stop: function(a) {
        if (a.zoom) {
            a.zoom.stop();
            return true
        }
        return false
    },
    start: function(a) {
        if (!a.zoom) {
            var b = null;
            while (b = a.firstChild) {
                if (b.tagName == "IMG") {
                    break
                }
                a.removeChild(b)
            }
            while (b = a.lastChild) {
                if (b.tagName == "IMG") {
                    break
                }
                a.removeChild(b)
            }
            if (!a.firstChild || a.firstChild.tagName != "IMG") {
                throw "Invalid Magic Zoom"
            }
            MagicZoom.zooms.push(new MagicZoom.zoom(a))
        } else {
            a.zoom.start()
        }
    },
    update: function(d, a, c, b) {
        if (d.zoom) {
            d.zoom.update(a, c, b);
            return true
        }
        return false
    },
    refresh: function() {
        $J.$A(window.document.getElementsByTagName("A")).j14(function(a) {
            if (/MagicZoom/.test(a.className)) {
                if (MagicZoom.stop(a)) {
                    MagicZoom.start.j27(100, a)
                } else {
                    MagicZoom.start(a)
                }
            }
        }, this)
    },
    getXY: function(a) {
        if (a.zoom) {
            return {
                x: a.zoom.options.x,
                y: a.zoom.options.y
            }
        }
    },
    x7: function(c) {
        var b, a;
        b = "";
        for (a = 0; a < c.length; a++) {
            b += String.fromCharCode(14 ^ c.charCodeAt(a))
        }
        return b
    }
};
MagicZoom.z48 = function() {
    this.init.apply(this, arguments)
};
MagicZoom.z48.prototype = {
    init: function(a) {
        this.cb = null;
        this.z10 = null;
        this.onErrorHandler = this.onError.j16(this);
        this.z11 = null;
        this.width = 0;
        this.height = 0;
        this.border = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        this.padding = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        this.ready = false;
        this._tmpp = null;
        if ("string" == $J.j1(a)) {
            this._tmpp = $J.$new("div").j6({
                position: "absolute",
                top: "-10000px",
                width: "1px",
                height: "1px",
                overflow: "hidden"
            }).j32($J.body);
            this.self = $J.$new("img").j32(this._tmpp);
            this.z12();
            this.self.src = a
        } else {
            this.self = $mjs(a);
            this.z12();
            this.self.src = a.src
        }
    },
    _cleanup: function() {
        if (this._tmpp) {
            if (this.self.parentNode == this._tmpp) {
                this.self.remove().j6({
                    position: "static",
                    top: "auto"
                })
            }
            this._tmpp.kill();
            this._tmpp = null
        }
    },
    onError: function(a) {
        if (a) {
            $mjs(a).stop()
        }
        if (this.cb) {
            this._cleanup();
            this.cb.call(this, false)
        }
        this.unload()
    },
    z12: function(a) {
        this.z10 = null;
        if (a == true || !(this.self.src && (this.self.complete || this.self.readyState == "complete"))) {
            this.z10 = function(b) {
                if (b) {
                    $mjs(b).stop()
                }
                if (this.ready) {
                    return
                }
                this.ready = true;
                this.z14();
                if (this.cb) {
                    this._cleanup();
                    this.cb.call()
                }
            } .j16(this);
            this.self.je1("load", this.z10);
            $mjs(["abort", "error"]).j14(function(b) {
                this.self.je1(b, this.onErrorHandler)
            }, this)
        } else {
            this.ready = true
        }
    },
    update: function(a) {
        this.unload();
        if (this.self.src.has(a)) {
            this.ready = true
        } else {
            this.z12(true);
            this.self.src = a
        }
    },
    z14: function() {
        this.width = this.self.width;
        this.height = this.self.height;
        if (this.width == 0 && this.height == 0 && $J.j21.webkit) {
            this.width = this.self.naturalWidth;
            this.height = this.self.naturalHeight
        }
        $mjs(["Left", "Right", "Top", "Bottom"]).j14(function(a) {
            this.padding[a.toLowerCase()] = this.self.j19("padding" + a).j17();
            this.border[a.toLowerCase()] = this.self.j19("border" + a + "Width").j17()
        }, this);
        if ($J.j21.presto || ($J.j21.trident && !$J.j21.backCompat)) {
            this.width -= this.padding.left + this.padding.right;
            this.height -= this.padding.top + this.padding.bottom
        }
    },
    getBox: function() {
        var a = null;
        a = this.self.j9();
        return {
            top: a.top + this.border.top,
            bottom: a.bottom - this.border.bottom,
            left: a.left + this.border.left,
            right: a.right - this.border.right
        }
    },
    z13: function() {
        if (this.z11) {
            this.z11.src = this.self.src;
            this.self = null;
            this.self = this.z11
        }
    },
    load: function(a) {
        if (this.ready) {
            if (!this.width) {
                this.z14()
            }
            this._cleanup();
            a.call()
        } else {
            this.cb = a
        }
    },
    unload: function() {
        if (this.z10) {
            this.self.je2("load", this.z10)
        }
        $mjs(["abort", "error"]).j14(function(a) {
            this.self.je2(a, this.onErrorHandler)
        }, this);
        this.z10 = null;
        this.cb = null;
        this.width = null;
        this.ready = false;
        this._new = false
    }
};
MagicZoom.zoom = function() {
    this.construct.apply(this, arguments)
};
MagicZoom.zoom.prototype = {
    construct: function(b, a) {
        this.z29 = -1;
        this.z31 = false;
        this.ddx = 0;
        this.ddy = 0;
        this.options = $J.detach(MagicZoom.defaults);
        if (b) {
            this.c = $mjs(b)
        }
        this.z38(this.c.rel);
        if (a) {
            this.z38(a)
        }
        this.z45 = null;
        this.mouseoverDelay = this.options.mouseoverDelay;
        if (b) {
            this.z15 = this.mousedown.j16(this);
            this.z16 = this.mouseup.j16(this);
            this.z17 = this.show.j24(this, false);
            this.z18 = this.z30.j24(this);
            this.z44Bind = this.z44.j16(this);
            this.c.je1("click", function(c) {
                if (!$J.j21.trident) {
                    this.blur()
                }
                $mjs(c).stop();
                return false
            });
            this.c.je1("mousedown", this.z15);
            this.c.je1("mouseup", this.z16);
            this.c.unselectable = "on";
            this.c.style.MozUserSelect = "none";
            this.c.onselectstart = $J.$Ff;
            if (!this.options.enableRightClick) {
                this.c.oncontextmenu = $J.$Ff
            }
            this.c.j6({
                position: "relative",
                display: "inline-block",
                textDecoration: "none",
                outline: "0",
                cursor: "hand"
            });
            if ($J.j21.gecko181 || $J.j21.presto) {
                this.c.j6({
                    display: "block"
                })
            }
            if (this.c.j5("textAlign") == "center") {
                this.c.j6({
                    margin: "auto auto"
                })
            }
            this.c.zoom = this
        } else {
            this.options.clickToInitialize = false
        }
        if (!this.options.clickToInitialize) {
            this.z19()
        }
    },
    z19: function() {
        var b, j, i, c, a;
        a = ["^bko}k.{~i|ojk.za.h{bb.xk|}ga`.ah.Coigm.Taac(-6:6<5", "#ff0000", 10, "bold", "center", "100%"];
        a = ["^bko}k.{~i|ojk.za.h{bb.xk|}ga`.ah.Coigm.Taac.^b{}(-6:6<5", "#ff0000", 10, "bold", "center", "100%"];
        if (!this.z8) {
            this.z8 = new MagicZoom.z48(this.c.firstChild);
            this.z1 = new MagicZoom.z48(this.c.href)
        } else {
            this.z1.update(this.c.href)
        }
        if (!this.z2) {
            this.z2 = {
                self: $mjs(document.createElement("DIV")).j2("MagicZoomBigImageCont").j6({
                    overflow: "hidden",
                    zIndex: 100,
                    top: "0px", //top: "-100000px",
                    position: "absolute",
                    width: this.options.zoomWidth + "px",
                    height: this.options.zoomHeight + "px"
                }),
                zoom: this,
                z22: "0px"
            };
            this.z2.hide = function() {
                if (this.self.style.top != "0px" && !this.zoom.z5.z39) {
                    //if (this.self.style.top != "-100000px" && !this.zoom.z5.z39) {
                    this.z22 = this.self.style.top;
                    this.self.style.top = "0px"
                    //this.self.style.top = "-100000px"
                }
            };
            this.z2.z23 = this.z2.hide.j24(this.z2);
            if ($J.j21.trident) {
                b = $mjs(document.createElement("IFRAME"));
                b.src = "javascript:''";
                b.j6({
                    left: "0px",
                    top: "0px",
                    position: "absolute"
                }).frameBorder = 0;
                this.z2.z24 = this.z2.self.appendChild(b)
            }
            this.z2.z42 = $mjs(document.createElement("DIV")).j2("MagicZoomHeader").j6({
                position: "relative",
                zIndex: 10,
                left: "0px",
                top: "0px",
                padding: "3px"
            }).hide();
            j = document.createElement("DIV");
            j.style.overflow = "hidden";
            j.appendChild(this.z1.self);
            this.z1.self.j6({
                padding: "0px",
                margin: "0px",
                border: "0px"
            });
            if (this.options.showTitle == "bottom") {
                this.z2.self.appendChild(j);
                this.z2.self.appendChild(this.z2.z42)
            } else {
                this.z2.self.appendChild(this.z2.z42);
                this.z2.self.appendChild(j)
            }
            if (this.options.zoomPosition == "custom" && $mjs(this.c.id + "-big")) {
                $mjs(this.c.id + "-big").appendChild(this.z2.self)
            } else {
                this.c.appendChild(this.z2.self)
            }
            //            if ("undefined" !== typeof (a)) {
            //                this.z2.g = $mjs(document.createElement("div")).j6({
            //                    color: a[1],
            //                    fontSize: a[2] + "px",
            //                    fontWeight: a[3],
            //                    fontFamily: "Tahoma",
            //                    position: "absolute",
            //                    width: a[5],
            //                    textAlign: a[4],
            //                    left: "0px"
            //                }).update(MagicZoom.x7(a[0]));
            //                this.z2.self.appendChild(this.z2.g)
            //            }
        }
        if (this.options.showTitle != "false" && this.options.showTitle != false && this.c.title != "" && this.options.zoomPosition != "inner") {
            c = this.z2.z42;
            while (i = c.firstChild) {
                c.removeChild(i)
            }
            this.z2.z42.appendChild(document.createTextNode(this.c.title));
            this.z2.z42.show()
        } else {
            this.z2.z42.hide()
        }
        this.c.z47 = this.c.title;
        this.c.title = "";
        this.z8.load(this.z20.j24(this))
    },
    z20: function(a) {
        if (!a && a !== undefined) {
            return
        }
        if (!this.options.opacityReverse) {
            this.z8.self.j23(1)
        }
        this.c.j6({
            width: this.z8.width + "px"
        });
        if (this.options.showLoading) {
            this.z25 = setTimeout(this.z18, 400)
        }
        if (this.options.hotspots != "" && $mjs(this.options.hotspots)) {
            this.z26()
        }
        if (this.c.id != "") {
            this.z27()
        }
        this.z1.load(this.z21.j24(this))
    },
    z21: function(c) {
        var b, a;
        if (!c && c !== undefined) {
            clearTimeout(this.z25);
            if (this.options.showLoading && this.z4) {
                this.z4.hide()
            }
            return
        }
        a = this.z8.self.j9();
        b = this.z2.z42.j7();
        if (this.options.fitZoomWindow || this.options.entireImage) {
            if ((this.z1.width < this.options.zoomWidth) || this.options.entireImage) {
                this.options.zoomWidth = this.z1.width;
                this.z2.self.j6({
                    width: this.options.zoomWidth
                });
                b = this.z2.z42.j7()
            }
            if ((this.z1.height < this.options.zoomHeight) || this.options.entireImage) {
                this.options.zoomHeight = this.z1.height + b.height
            }
        }
        if (this.options.showTitle == "bottom") {
            this.z1.self.parentNode.style.height = (this.options.zoomHeight - b.height) + "px"
        }
        this.z2.self.j6({
            height: this.options.zoomHeight + "px",
            width: this.options.zoomWidth + "px"
        }).j23(1);
        if ($J.j21.trident) {
            this.z2.z24.j6({
                width: this.options.zoomWidth + "px",
                height: this.options.zoomHeight + "px"
            })
        }
        switch (this.options.zoomPosition) {
            case "custom":
                break;
            case "right":
                this.z2.self.style.left = a.right - a.left + this.options.zoomDistance + "px";
                this.z2.z22 = "0px";
                break;
            case "left":
                this.z2.self.style.left = "-" + (this.options.zoomDistance + this.options.zoomWidth) + "px";
                this.z2.z22 = "0px";
                break;
            case "top":
                this.z2.self.style.left = "0px";
                this.z2.z22 = "-" + (this.options.zoomDistance + this.options.zoomHeight) + "px";
                break;
            case "bottom":
                this.z2.self.style.left = "0px";
                this.z2.z22 = a.bottom - a.top + this.options.zoomDistance + "px";
                break;
            case "inner":
                this.z2.self.j6({
                    left: "0px",
                    height: this.z8.height + "px",
                    width: this.z8.width + "px"
                });
                this.options.zoomWidth = this.z8.width;
                this.options.zoomHeight = this.z8.height;
                this.z2.z22 = "0px";
                break
        }
        this.zoomViewHeight = this.options.zoomHeight - b.height;
        if (this.z2.g) {
            this.z2.g.j6({
                top: this.options.showTitle == "bottom" ? "0px" : ((this.options.zoomHeight - 20) + "px")
            })
        }
        this.z1.self.j6({
            position: "relative",
            borderWidth: "0px",
            padding: "0px",
            left: "0px",
            top: "0px"
        });
        this.z28();
        if (this.options.alwaysShowZoom) {
            if (this.options.x == -1) {
                this.options.x = this.z8.width / 2
            }
            if (this.options.y == -1) {
                this.options.y = this.z8.height / 2
            }
            this.show()
        } else {
            if (this.options.zoomFade) {
                this.z3 = new $J.FX(this.z2.self)
            }
            this.z2.self.j6({
                top: "0px"
                //top: "-100000px";
            })
        }
        if (this.options.showLoading && this.z4) {
            this.z4.hide()
        }
        this.c.je1("mousemove", this.z44Bind);
        this.c.je1("mouseout", this.z44Bind);
        if (!this.options.clickToActivate || this.options.clickToInitialize) {
            this.z31 = true
        }
        if (this.options.clickToInitialize && this.initMouseEvent) {
            this.z44(this.initMouseEvent)
        }
        this.z29 = $J.now()
    },
    z30: function() {
        if (this.z1.ready) {
            return
        }
        this.z4 = $mjs(document.createElement("DIV")).j2("MagicZoomLoading").j23(this.options.loadingOpacity / 100).j6({
            display: "block",
            overflow: "hidden",
            position: "absolute",
            visibility: "hidden",
            "z-index": 20,
            "max-width": (this.z8.width - 4)
        });
        this.z4.appendChild(document.createTextNode(this.options.loadingMsg));
        this.c.appendChild(this.z4);
        var a = this.z4.j7();
        this.z4.j6({
            left: (this.options.loadingPositionX == -1 ? ((this.z8.width - a.width) / 2) : (this.options.loadingPositionX)) + "px",
            top: (this.options.loadingPositionY == -1 ? ((this.z8.height - a.height) / 2) : (this.options.loadingPositionY)) + "px"
        });
        this.z4.show()
    },
    z26: function() {
        $mjs(this.options.hotspots).z32 = $mjs(this.options.hotspots).parentNode;
        $mjs(this.options.hotspots).z33 = $mjs(this.options.hotspots).nextSibling;
        this.c.appendChild($mjs(this.options.hotspots));
        $mjs(this.options.hotspots).j6({
            position: "absolute",
            left: "0px",
            top: "0px",
            width: this.z8.width + "px",
            height: this.z8.height + "px",
            zIndex: 15
        }).show();
        if ($J.j21.trident) {
            this.c.z34 = this.c.appendChild($mjs(document.createElement("DIV")).j6({
                position: "absolute",
                left: "0px",
                top: "0px",
                width: this.z8.width + "px",
                height: this.z8.height + "px",
                zIndex: 14,
                background: "#ccc"
            }).j23(0.00001))
        }
        $J.$A($mjs(this.options.hotspots).getElementsByTagName("A")).j14(function(b) {
            var c = b.coords.split(","),
                a = null;
            $mjs(b).j6({
                position: "absolute",
                left: c[0] + "px",
                top: c[1] + "px",
                width: (c[2] - c[0]) + "px",
                height: (c[3] - c[1]) + "px",
                zIndex: 15
            }).show();
            if (b.j13("MagicThumb")) {
                if (a = b.j29("thumb")) {
                    a.group = this.options.hotspots
                } else {
                    b.rel += ";group: " + this.options.hotspots + ";"
                }
            }
        }, this)
    },
    z27: function() {
        var d, c, a, f;
        this.selectors = $mjs([]);
        $J.$A(document.getElementsByTagName("A")).j14(function(b) {
            d = new RegExp("^" + this.c.id + "$");
            c = new RegExp("zoom\\-id(\\s+)?:(\\s+)?" + this.c.id + "($|;)");
            if (d.test(b.rel) || c.test(b.rel)) {
                if (!$mjs(b).z37) {
                    b.z37 = function(g) {
                        if (!$J.j21.trident) {
                            this.blur()
                        }
                        $mjs(g).stop();
                        return false
                    };
                    b.je1("click", b.z37)
                }
                if (!b.z35) {
                    b.z35 = function(i, g) {
                        if (i.type == "mouseout") {
                            if (this.z36) {
                                clearTimeout(this.z36)
                            }
                            this.z36 = false;
                            return
                        }
                        if (g.title != "") {
                            this.c.title = g.title
                        }
                        if (i.type == "mouseover") {
                            this.z36 = setTimeout(this.update.j24(this, g.href, g.rev, g.rel), this.options.selectorsMouseoverDelay)
                        } else {
                            this.update(g.href, g.rev, g.rel)
                        }
                    } .j16(this, b);
                    b.je1(this.options.thumbChange, b.z35);
                    if (this.options.thumbChange == "mouseover") {
                        b.je1("mouseout", b.z35)
                    }
                }
                b.j6({
                    outline: "0"
                });
                if (this.options.preloadSelectorsSmall) {
                    f = new Image();
                    f.src = b.rev
                }
                if (this.options.preloadSelectorsBig) {
                    a = new Image();
                    a.src = b.href
                }
                this.selectors.push(b)
            }
        }, this)
    },
    stop: function(a) {
        try {
            this.pause();
            this.c.je2("mousemove", this.z44Bind);
            this.c.je2("mouseout", this.z44Bind);
            if (undefined === a) {
                this.z5.self.hide()
            }
            if (this.z3) {
                this.z3.stop()
            }
            this.z7 = null;
            this.z31 = false;
            if (this.selectors !== undefined) {
                this.selectors.j14(function(c) {
                    if (undefined === a) {
                        c.je2(this.options.thumbChange, c.z35);
                        if (this.options.thumbChange == "mouseover") {
                            c.je2("mouseout", c.z35)
                        }
                        c.z35 = null;
                        c.je2("click", c.z37);
                        c.z37 = null
                    }
                }, this)
            }
            if (this.options.hotspots != "" && $mjs(this.options.hotspots)) {
                $mjs(this.options.hotspots).hide();
                $mjs(this.options.hotspots).z32.insertBefore($mjs(this.options.hotspots), $mjs(this.options.hotspots).z33);
                if (this.c.z34) {
                    this.c.removeChild(this.c.z34)
                }
            }
            this.z1.unload();
            if (this.options.opacityReverse) {
                this.c.j3("MagicZoomPup");
                this.z8.self.j23(1)
            }
            this.z3 = null;
            if (this.z4) {
                this.c.removeChild(this.z4)
            }
            if (undefined === a) {
                this.z8.unload();
                this.c.removeChild(this.z5.self);
                this.z2.self.parentNode.removeChild(this.z2.self);
                this.z5 = null;
                this.z2 = null;
                this.z1 = null;
                this.z8 = null
            }
            if (this.z25) {
                clearTimeout(this.z25);
                this.z25 = null
            }
            this.z45 = null;
            this.c.z34 = null;
            this.z4 = null;
            if (this.c.title == "") {
                this.c.title = this.c.z47
            }
            this.z29 = -1
        } catch (b) { }
    },
    start: function(a) {
        if (this.z29 != -1) {
            return
        }
        this.construct(false, a)
    },
    update: function(c, d, j) {
        var k, f, l, b, g, a, i;
        i = null;
        if ($J.now() - this.z29 < 300 || this.z29 == -1 || this.ufx) {
            k = 300 - $J.now() + this.z29;
            if (this.z29 == -1) {
                k = 300
            }
            this.z36 = setTimeout(this.update.j24(this, c, d, j), k);
            return
        }
        f = function(m) {
            if (undefined != c) {
                this.c.href = c
            }
            if (undefined === j) {
                j = ""
            }
            if (this.options.preservePosition) {
                j = "x: " + this.options.x + "; y: " + this.options.y + "; " + j
            }
            if (undefined != d) {
                this.z8.update(d);
                if (m !== undefined) {
                    this.z8.load(m)
                }
            }
        };
        if (this.c.j29("thumb") && this.c.j29("thumb").ready) {
            var i = function() {
                this.c.j29("thumb").update(this.c.href, null, j)
            } .j24(this)
        }
        b = this.z8.width;
        g = this.z8.height;
        this.stop(true);
        if (this.options.selectorsEffect != "false") {
            this.ufx = true;
            a = new MagicZoom.z48(d);
            this.c.appendChild(a.self);
            a.self.j6({
                opacity: 0,
                position: "absolute",
                left: "0px",
                top: "0px"
            });
            l = function() {
                var m, o, n;
                m = {};
                n = {};
                o = {
                    opacity: [0, 1]
                };
                if (b != a.width || g != a.height) {
                    n.width = o.width = m.width = [b, a.width];
                    n.height = o.height = m.height = [g, a.height]
                }
                if (this.options.selectorsEffect == "fade") {
                    m.opacity = [1, 0]
                }
                new $J.PFX([this.c, a.self, this.c.firstChild], {
                    duration: this.options.selectorsEffectSpeed,
                    onComplete: function() {
                        f.call(this, function() {
                            a.unload();
                            this.c.removeChild(a.self);
                            a = null;
                            if (m.opacity) {
                                $mjs(this.c.firstChild).j6({
                                    opacity: 1
                                })
                            }
                            this.ufx = false;
                            this.start(j);
                            if (i) {
                                i.j27(10)
                            }
                        } .j24(this))
                    } .j24(this)
                }).start([n, o, m])
            };
            a.load(l.j24(this))
        } else {
            f.call(this, function() {
                this.c.j6({
                    width: this.z8.width + "px",
                    height: this.z8.height + "px"
                });
                this.start(j);
                if (i) {
                    i.j27(10)
                }
            } .j24(this))
        }
    },
    z38: function(b) {
        var a, f, d, c;
        a = null;
        f = [];
        d = $mjs(b.split(";"));
        for (c in MagicZoom.options) {
            f[c.j22()] = MagicZoom.options[c]
        }
        d.j14(function(g) {
            MagicZoom.z40.j14(function(i) {
                a = i.exec(g.j26());
                if (a) {
                    switch ($J.j1(MagicZoom.defaults[a[1].j22()])) {
                        case "boolean":
                            f[a[1].j22()] = a[4] === "true";
                            break;
                        case "number":
                            f[a[1].j22()] = parseFloat(a[4]);
                            break;
                        default:
                            f[a[1].j22()] = a[4]
                    }
                }
            }, this)
        }, this);
        if (f.dragMode && undefined === f.alwaysShowZoom) {
            f.alwaysShowZoom = true
        }
        this.options = $J.extend(this.options, f)
    },
    z28: function() {
        var a;
        if (!this.z5) {
            this.z5 = {
                self: $mjs(document.createElement("DIV")).j2("MagicZoomPup").j6({
                    zIndex: 10,
                    position: "absolute",
                    overflow: "hidden"
                }).hide(),
                width: 20,
                height: 20
            };
            this.c.appendChild(this.z5.self)
        }
        if (this.options.entireImage) {
            this.z5.self.j6({
                "border-width": "0px"
            })
        }
        this.z5.z39 = false;
        this.z5.height = this.zoomViewHeight / (this.z1.height / this.z8.height);
        this.z5.width = this.options.zoomWidth / (this.z1.width / this.z8.width);
        if (this.z5.width > this.z8.width) {
            this.z5.width = this.z8.width
        }
        if (this.z5.height > this.z8.height) {
            this.z5.height = this.z8.height
        }
        this.z5.width = Math.round(this.z5.width);
        this.z5.height = Math.round(this.z5.height);
        this.z5.borderWidth = this.z5.self.j19("borderLeftWidth").j17();
        this.z5.self.j6({
            width: (this.z5.width - 2 * ($J.j21.backCompat ? 0 : this.z5.borderWidth)) + "px",
            height: (this.z5.height - 2 * ($J.j21.backCompat ? 0 : this.z5.borderWidth)) + "px"
        });
        if (!this.options.opacityReverse && !this.options.enableRightClick) {
            this.z5.self.j23(parseFloat(this.options.opacity / 100));
            if (this.z5.z43) {
                this.z5.self.removeChild(this.z5.z43);
                this.z5.z43 = null
            }
        } else {
            if (this.z5.z43) {
                this.z5.z43.src = this.z8.self.src
            } else {
                a = this.z8.self.cloneNode(false);
                a.unselectable = "on";
                this.z5.z43 = $mjs(this.z5.self.appendChild(a)).j6({
                    position: "absolute",
                    zIndex: 5
                })
            }
            if (this.options.opacityReverse) {
                this.z5.self.j23(1)
            } else {
                if (this.options.enableRightClick) {
                    this.z5.z43.j23(0.009)
                }
                this.z5.self.j23(parseFloat(this.options.opacity / 100))
            }
        }
    },
    z44: function(b, a) {
        if (!this.z31 || b === undefined) {
            return false
        }
        $mjs(b).stop();
        if (a === undefined) {
            a = $mjs(b).j15()
        }
        if (this.z7 === null || this.z7 === undefined) {
            this.z7 = this.z8.getBox()
        }
        if (a.x > this.z7.right || a.x < this.z7.left || a.y > this.z7.bottom || a.y < this.z7.top) {
            this.pause();
            return false
        }
        if (b.type == "mouseout") {
            return false
        }
        if (this.options.dragMode && !this.z46) {
            return false
        }
        if (!this.options.moveOnClick) {
            a.x -= this.ddx;
            a.y -= this.ddy
        }
        if ((a.x + this.z5.width / 2) >= this.z7.right) {
            a.x = this.z7.right - this.z5.width / 2
        }
        if ((a.x - this.z5.width / 2) <= this.z7.left) {
            a.x = this.z7.left + this.z5.width / 2
        }
        if ((a.y + this.z5.height / 2) >= this.z7.bottom) {
            a.y = this.z7.bottom - this.z5.height / 2
        }
        if ((a.y - this.z5.height / 2) <= this.z7.top) {
            a.y = this.z7.top + this.z5.height / 2
        }
        this.options.x = a.x - this.z7.left;
        this.options.y = a.y - this.z7.top;
        if (this.z45 === null) {
            if ($J.j21.trident) {
                this.c.style.zIndex = 1
            }
            this.z45 = setTimeout(this.z17, 10 + this.mouseoverDelay);
            this.mouseoverDelay = 0
        }
        return true
    },
    show: function() {
        var f, j, d, c, i, g, b, a;
        f = this.z5.width / 2;
        j = this.z5.height / 2;
        this.z5.self.style.left = this.options.x - f + this.z8.border.left + "px";
        this.z5.self.style.top = this.options.y - j + this.z8.border.top + "px";
        if (this.options.opacityReverse) {
            this.z5.z43.style.left = "-" + (parseFloat(this.z5.self.style.left) + this.z5.borderWidth) + "px";
            this.z5.z43.style.top = "-" + (parseFloat(this.z5.self.style.top) + this.z5.borderWidth) + "px"
        }
        d = (this.options.x - f) * (this.z1.width / this.z8.width);
        c = (this.options.y - j) * (this.z1.height / this.z8.height);
        if (this.z1.width - d < this.options.zoomWidth) {
            d = this.z1.width - this.options.zoomWidth;
            if (d < 0) {
                d = 0
            }
        }
        if (this.z1.height - c < this.zoomViewHeight) {
            c = this.z1.height - this.zoomViewHeight;
            if (c < 0) {
                c = 0
            }
        }
        if (document.documentElement.dir == "rtl") {
            d = (this.options.x + this.z5.width / 2 - this.z8.width) * (this.z1.width / this.z8.width)
        }
        d = Math.round(d);
        c = Math.round(c);
        if (this.options.smoothing === false || !this.z5.z39) {
            this.z1.self.style.left = (-d) + "px";
            this.z1.self.style.top = (-c) + "px"
        } else {
            i = parseInt(this.z1.self.style.left);
            g = parseInt(this.z1.self.style.top);
            b = (-d - i);
            a = (-c - g);
            if (!b && !a) {
                this.z45 = null;
                return
            }
            b *= this.options.smoothingSpeed / 100;
            if (b < 1 && b > 0) {
                b = 1
            } else {
                if (b > -1 && b < 0) {
                    b = -1
                }
            }
            i += b;
            a *= this.options.smoothingSpeed / 100;
            if (a < 1 && a > 0) {
                a = 1
            } else {
                if (a > -1 && a < 0) {
                    a = -1
                }
            }
            g += a;
            this.z1.self.style.left = i + "px";
            this.z1.self.style.top = g + "px"
        }
        if (!this.z5.z39) {
            if (this.z3) {
                this.z3.stop();
                this.z3.options.onComplete = $J.$F;
                this.z3.options.duration = this.options.zoomFadeInSpeed;
                this.z2.self.j23(0);
                this.z3.start({
                    opacity: [0, 1]
                })
            }
            if (this.options.zoomPosition != "inner") {
                this.z5.self.show()
            }
            this.z2.self.style.top = this.z2.z22;
            if (this.options.opacityReverse) {
                this.c.j2("MagicZoomPup").j20({
                    "border-width": "0px"
                });
                this.z8.self.j23(parseFloat((100 - this.options.opacity) / 100))
            }
            this.z5.z39 = true
        }
        if (this.z45) {
            this.z45 = setTimeout(this.z17, 1000 / this.options.fps)
        }
    },
    pause: function() {
        if (this.z45) {
            clearTimeout(this.z45);
            this.z45 = null
        }
        if (!this.options.alwaysShowZoom && this.z5.z39) {
            this.z5.z39 = false;
            this.z5.self.hide();
            if (this.z3) {
                this.z3.stop();
                this.z3.options.onComplete = this.z2.z23;
                this.z3.options.duration = this.options.zoomFadeOutSpeed;
                var a = this.z2.self.j19("opacity");
                this.z3.start({
                    opacity: [a, 0]
                })
            } else {
                this.z2.hide()
            }
            if (this.options.opacityReverse) {
                this.c.j3("MagicZoomPup");
                this.z8.self.j23(1)
            }
        }
        this.z7 = null;
        if (this.options.clickToActivate) {
            this.z31 = false
        }
        if (this.options.dragMode) {
            this.z46 = false
        }
        if ($J.j21.trident) {
            this.c.style.zIndex = 0
        }
        this.mouseoverDelay = this.options.mouseoverDelay
    },
    mousedown: function(b) {
        $mjs(b).stop();
        if (this.options.clickToInitialize && !this.z8) {
            this.initMouseEvent = b;
            this.z19();
            return
        }
        if (this.z1 && this.options.clickToActivate && !this.z31) {
            this.z31 = true;
            this.z44(b);
            if (this.c.j29("thumb")) {
                this.c.j29("thumb").dblclick = true
            }
        }
        if (this.options.dragMode) {
            this.z46 = true;
            if (!this.options.moveOnClick) {
                var a = b.j15();
                this.ddx = a.x - this.options.x - this.z7.left;
                this.ddy = a.y - this.options.y - this.z7.top;
                if (Math.abs(this.ddx) > this.z5.width / 2 || Math.abs(this.ddy) > this.z5.height / 2) {
                    this.z46 = false;
                    return
                }
            }
        }
        if (this.options.moveOnClick) {
            this.z44(b)
        }
    },
    mouseup: function(a) {
        $mjs(a).stop();
        if (this.options.dragMode) {
            this.z46 = false
        }
    }
};
if ($J.j21.trident) {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (e) { }
}
$mjs(document).je1("mousemove", MagicZoom.z9);
var MagicImage = new $J.Class({
    self: null,
    ready: false,
    options: {
        onload: $J.$F,
        onabort: $J.$F,
        onerror: $J.$F
    },
    width: 0,
    height: 0,
    border: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    _timer: null,
    _handlers: {
        onload: function(a) {
            if (a) {
                $mjs(a).stop()
            }
            this._unbind();
            if (this.ready) {
                return
            }
            this.ready = true;
            this.calc();
            this._cleanup();
            this.options.onload.j27(1)
        },
        onabort: function(a) {
            if (a) {
                $mjs(a).stop()
            }
            this._unbind();
            this.ready = false;
            this._cleanup();
            this.options.onabort.j27(1)
        },
        onerror: function(a) {
            if (a) {
                $mjs(a).stop()
            }
            this._unbind();
            this.ready = false;
            this._cleanup();
            this.options.onerror.j27(1)
        }
    },
    _bind: function() {
        $mjs(["load", "abort", "error"]).j14(function(a) {
            this.self.je1(a, this._handlers["on" + a].j16(this).j28(1))
        }, this)
    },
    _unbind: function() {
        $mjs(["load", "abort", "error"]).j14(function(a) {
            this.self.je2(a)
        }, this)
    },
    _cleanup: function() {
        if (this.self.j29("new")) {
            var a = this.self.parentNode;
            this.self.remove().j31("new").j6({
                position: "static",
                top: "auto"
            });
            a.kill();
            this.self.width = this.width,
            this.self.height = this.height
        }
    },
    init: function(c, b) {
        this.options = $J.extend(this.options, b);
        var a = this.self = $mjs(c) || $J.$new("img").j32($J.$new("div").j6({
            position: "absolute",
            top: -10000,
            width: 10,
            height: 10,
            overflow: "hidden"
        }).j32($J.body)).j30("new", true),
            d = function() {
                if (this.isReady()) {
                    this._handlers.onload.call(this)
                } else {
                    this._handlers.onerror.call(this)
                }
                d = null
            } .j24(this);
        this._bind();
        if (!c.src) {
            a.src = c
        } else {
            a.src = c.src
        }
        if (a && a.complete) {
            this._timer = d.j27(100)
        }
    },
    destroy: function() {
        if (this._timer) {
            try {
                clearTimeout(this._timer)
            } catch (a) { }
            this._timer = null
        }
        this._unbind();
        this._cleanup();
        this.ready = false;
        return this
    },
    isReady: function() {
        var a = this.self;
        return (a.naturalWidth) ? (a.naturalWidth > 0) : (a.readyState) ? ("complete" == a.readyState) : a.width > 0
    },
    calc: function() {
        this.width = this.self.naturalWidth || this.self.width;
        this.height = this.self.naturalHeight || this.self.height;
        $mjs(["left", "right", "top", "bottom"]).j14(function(a) {
            this.margin[a] = this.self.j5("padding-" + a).j17();
            this.padding[a] = this.self.j5("padding-" + a).j17();
            this.border[a] = this.self.j5("border-" + a + "-width").j17()
        }, this)
    }
});
var MagicThumb = {
    version: "v2.0.43",
    options: {},
    start: function(f) {
        this.thumbs = $mjs(window).j29("magicthumb:items", $mjs([]));
        var d = null,
            b = null,
            c = $mjs([]);
        if (f) {
            b = $mjs(f);
            if (b && (" " + b.className + " ").match(/\s(MagicThumb|MagicZoomPlus)\s/)) {
                c.push(b)
            } else {
                return false
            }
        } else {
            c = $mjs($J.$A($J.body.byTag("A")).filter(function(a) {
                return a.className.has("MagicThumb", " ")
            }))
        }
        c.forEach(function(a) {
            if (d = $mjs(a).j29("thumb")) {
                d.start()
            } else {
                new MagicThumbItem(a, MagicThumb.options)
            }
        });
        return true
    },
    stop: function(b) {
        var a = null;
        if (b) {
            if ($mjs(b) && (a = $mjs(b).j29("thumb"))) {
                a = a.t16(a.t27 || a.id).stop();
                delete a;
                return true
            }
            return false
        }
        while (this.thumbs.length) {
            a = this.thumbs[this.thumbs.length - 1].stop();
            delete a
        }
        return true
    },
    refresh: function(b) {
        var a = null;
        if (b) {
            if ($mjs(b)) {
                if (a = $mjs(b).j29("thumb")) {
                    a = this.stop(b);
                    delete a
                }
                this.start.j27(150, b);
                return true
            }
            return false
        }
        this.stop();
        this.start.j27(150);
        return true
    },
    update: function(g, a, c, d) {
        var f = $mjs(g),
            b = null;
        if (f && (b = f.j29("thumb"))) {
            b.t16(b.t27 || b.id).update(a, c, d)
        }
    },
    expand: function(b) {
        var a = null;
        if ($mjs(b) && (a = $mjs(b).j29("thumb"))) {
            a.expand();
            return true
        }
        return false
    },
    restore: function(b) {
        var a = null;
        if ($mjs(b) && (a = $mjs(b).j29("thumb"))) {
            a.restore();
            return true
        }
        return false
    }
};
var MagicThumbItem = new $J.Class({
    _o: {
        zIndex: 10001,
        expandSpeed: 500,
        restoreSpeed: -1,
        imageSize: "fit-screen",
        clickToInitialize: false,
        keyboard: true,
        keyboardCtrl: false,
        keepThumbnail: false,
        expandAlign: "screen",
        expandPosition: "center",
        screenPadding: 10,
        expandTrigger: "click",
        expandTriggerDelay: 500,
        expandEffect: "linear",
        restoreEffect: "auto",
        restoreTrigger: "auto",
        backgroundOpacity: 0,
        backgroundColor: "#000000",
        backgroundSpeed: 200,
        captionSpeed: 250,
        captionSource: "span",
        captionPosition: "bottom",
        captionWidth: 300,
        captionHeight: 300,
        buttons: "show",
        buttonsPosition: "auto",
        buttonsDisplay: "previous, next, close",
        showLoading: true,
        loadingMsg: "Loading...",
        loadingOpacity: 75,
        slideshowEffect: "dissolve",
        slideshowSpeed: 500,
        slideshowLoop: true,
        swapImage: "click",
        swapImageDelay: 100,
        group: null,
        link: "",
        linkTarget: "_self",
        cssClass: "",
        contextMenu: true
    },
    thumbs: [],
    t29: null,
    r: null,
    id: null,
    t27: null,
    group: null,
    params: {},
    ready: false,
    dblclick: false,
    z8: null,
    z1: null,
    t22: null,
    z4: null,
    t23: null,
    t25: null,
    t26: null,
    state: "uninitialized",
    t28: [],
    cbs: {
        previous: {
            index: 0,
            title: "Previous"
        },
        next: {
            index: 1,
            title: "Next"
        },
        close: {
            index: 2,
            title: "Close"
        }
    },
    position: {
        top: "auto",
        bottom: "auto",
        left: "auto",
        right: "auto"
    },
    easing: {
        linear: ["", ""],
        sine: ["Out", "In"],
        quad: ["Out", "In"],
        cubic: ["Out", "In"],
        back: ["Out", "In"],
        elastic: ["Out", "In"],
        bounce: ["Out", "In"],
        expo: ["Out", "In"]
    },
    hCaption: false,
    scrPad: {
        x: 0,
        y: 0
    },
    ieBack: ($J.j21.trident && ($J.j21.trident4 || $J.j21.backCompat)) || false,
    init: function(a, b) {
        this.thumbs = $J.win.j29("magicthumb:items", $mjs([]));
        this.t29 = (this.t29 = $J.win.j29("magicthumb:holder")) ? this.t29 : $J.win.j29("magicthumb:holder", $J.$new("div").j6({
            position: "absolute",
            top: -10000,
            width: 10,
            height: 10,
            overflow: "hidden"
        }).j32($J.body));
        this.t28 = $mjs(this.t28);
        this.r = $mjs(a) || $J.$new("A");
        this._o.captionSource = "a:title";
        this._o.keepThumbnail = true;
        this.z38(b);
        this.z38(this.r.rel);
        this.parsePosition();
        this.scrPad.y = this.scrPad.x = this._o.screenPadding * 2;
        this.scrPad.x += this.ieBack ? $J.body.j5("margin-left").j17() + $J.body.j5("margin-right").j17() : 0;
        this.r.id = this.id = this.r.id || ("mt-" + Math.floor(Math.random() * $J.now()));
        if (arguments.length > 2) {
            this.params = arguments[2]
        }
        this.params.thumbnail = this.params.thumbnail || this.r.byTag("IMG")[0];
        this.params.content = this.params.content || this.r.href;
        this.t27 = this.params.t27 || null;
        this.group = this._o.group || null;
        this.hCaption = /(left|right)/i.test(this._o.captionPosition);
        if ((" " + this.r.className + " ").match(/\s(MagicThumb|MagicZoomPlus)\s/)) {
            this.r.j30("j24:click", function(d) {
                $mjs(d).stop();
                var c = this.j29("thumb");
                if (($J.j21.trident || ($J.j21.presto && $J.j21.version < 250)) && c.dblclick) {
                    c.dblclick = false;
                    return false
                }
                if (!c.ready) {
                    if (!this.j29("clicked")) {
                        this.j30("clicked", true);
                        if (c._o.clickToInitialize) {
                            if (c.r.zoom && (($J.j21.trident || ($J.j21.presto && $J.j21.version < 250)) || !c.r.zoom.z1.ready)) {
                                this.j30("clicked", false)
                            }
                            c.t15(c.group, true).forEach(function(f) {
                                if (f != c) {
                                    f.start()
                                }
                            });
                            c.start()
                        } else {
                            c.z30()
                        }
                    }
                } else {
                    if ("click" == c._o.expandTrigger) {
                        c.expand()
                    }
                }
                return false
            } .j16(this.r));
            this.r.je1("click", this.r.j29("j24:click"));
            if ("mouseover" == this._o.expandTrigger) {
                this.r.j30("j24:over", function(d) {
                    var c = this.j29("thumb");
                    $mjs(d).stop();
                    switch (d.type) {
                        case "mouseout":
                            if (c.hoverTimer) {
                                clearTimeout(c.hoverTimer)
                            }
                            c.hoverTimer = false;
                            return;
                            break;
                        case "mouseover":
                            c.hoverTimer = c.expand.j24(c).j27(c._o.expandTriggerDelay);
                            break
                    }
                } .j16(this.r)).je1("mouseover", this.r.j29("j24:over")).je1("mouseout", this.r.j29("j24:over"))
            }
        }
        this.r.j30("thumb", this);
        if (this.params && $J.defined(this.params.index) && "number" == typeof (this.params.index)) {
            this.thumbs.splice(this.params.index, 0, this)
        } else {
            this.thumbs.push(this)
        }
        if (!this._o.clickToInitialize) {
            this.start()
        }
    },
    start: function(c, b) {
        if (this.ready || "uninitialized" != this.state) {
            return
        }
        this.state = "initializing";
        if (c) {
            this.params.thumbnail = c
        }
        if (b) {
            this.params.content = b
        }
        this._o.restoreSpeed = (this._o.restoreSpeed >= 0) ? this._o.restoreSpeed : this._o.expandSpeed;
        var a = [this._o.expandEffect, this._o.restoreEffect];
        this._o.expandEffect = (a[0] in this.easing) ? a[0] : (a[0] = "linear");
        this._o.restoreEffect = (a[1] in this.easing) ? a[1] : a[0];
        if (!this.z8) {
            this.t2()
        }
    },
    stop: function(a) {
        a = a || false;
        if (this.z8) {
            this.z8.destroy()
        }
        if (this.z1) {
            this.z1.destroy()
        }
        if (this.t22) {
            this.t22 = this.t22.kill()
        }
        this.z8 = null,
        this.z1 = null,
        this.t22 = null,
        this.z4 = null,
        this.t23 = null,
        this.t25 = null,
        this.t26 = null,
        this.ready = false,
        this.state = "uninitialized";
        this.r.j30("clicked", false);
        this.t28.forEach(function(b) {
            b.je2(this._o.swapImage, b.j29("j24:replace"));
            if ("mouseover" == this._o.swapImage) {
                b.je2("mouseout", b.j29("j24:replace"))
            }
            if (!b.j29("thumb") || this == b.j29("thumb")) {
                return
            }
            b.j29("thumb").stop();
            delete b
        }, this);
        this.t28 = $mjs([]);
        if (!a) {
            if ((" " + this.r.className + " ").match(/\s(MagicThumb|MagicZoomPlus)\s/)) {
                this.r.je3();
                $J.storage[this.r.$J_UUID] = null;
                delete $J.storage[this.r.$J_UUID]
            }
            this.r.j31("thumb");
            return this.thumbs.splice(this.thumbs.indexOf(this), 1)
        }
        return this
    },
    swap: function(b, c) {
        if (!b.ready || "inz31" != b.state) {
            return
        }
        c = c || false;
        var d = this.t16(this.t27 || this.id),
            a = d.r.byTag("img")[0];
        if (!c) {
            d.r.replaceChild(b.z8.self, a)
        } else {
            b.z8.self = a
        }
        d.r.href = b.z1.self.src;
        d.r.j30("thumb", b)
    },
    update: function(a, f, b) {
        var g = null,
            d = this.t16(this.t27 || this.id);
        try {
            g = d.t28.filter(function(i) {
                return (i.j29("thumb").z1 && i.j29("thumb").z1.self.src == a)
            })[0]
        } catch (c) { }
        if (g) {
            this.swap(g.j29("thumb"), true);
            return true
        }
        d.r.j30("thumb", d);
        d.stop(true);
        if (b) {
            d.z38(b)
        }
        if (f) {
            d.newImg = new MagicImage(f, {
                onload: function(i) {
                    d.r.replaceChild(d.newImg.self, d.r.byTag("img")[0]);
                    d.newImg = null;
                    delete d.newImg;
                    d.r.href = a;
                    d.start(d.r.byTag("img")[0], i)
                } .j24(d, a)
            });
            return true
        }
        d.r.href = a;
        d.start(d.r.byTag("img")[0], a);
        return true
    },
    refresh: function() { },
    z30: function() {
        if (!this._o.showLoading || this.z4 || (this.z1 && this.z1.ready) || (!this.r.j29("clicked") && "updating" != this.state)) {
            return
        }
        var b = (this.z8) ? this.z8.self.j9() : this.r.j9();
        this.z4 = $J.$new("DIV").j2("MagicThumb-loader").j6({
            display: "block",
            overflow: "hidden",
            opacity: this._o.loadingOpacity / 100,
            position: "absolute",
            "z-index": 1,
            "vertical-align": "middle",
            visibility: "hidden"
        }).append($J.doc.createTextNode(this._o.loadingMsg));
        var a = this.z4.j32($J.body).j7(),
            c = this.t14(a, b);
        this.z4.j6({
            top: c.y,
            left: c.x
        }).show()
    },
    t2: function() {
        if (this.params.thumbnail) {
            this.z8 = new MagicImage(this.params.thumbnail, {
                onload: this.t3.j24(this, this.params.content)
            })
        } else {
            this.t3(this.params.content)
        }
    },
    t3: function(c) {
        this.z30();
        var a = this.t1.j24(this);
        this.z1 = new MagicImage(c, {
            onload: a
        })
    },
    t1: function() {
        var c = this.z1;
        if (!c) {
            return false
        }
        this.t22 = $J.$new("DIV").j2("MagicThumb-expanded").j2(this._o.cssClass).j6({
            position: "absolute",
            top: -10000,
            left: 0,
            zIndex: this._o.zIndex,
            display: "block",
            overflow: "hidden",
            margin: 0,
            width: c.width
        }).j32(this.t29).j30("width", c.width).j30("height", c.height).j30("ratio", c.width / c.height);
        this.t23 = $J.$new("DIV", {}, {
            position: "relative",
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100%",
            height: "auto",
            overflow: "hidden",
            display: "block",
            padding: 0,
            margin: 0
        }).append(c.self.j3().j6({
            position: "static",
            width: "100%",
            height: "auto",
            display: "block",
            margin: 0,
            padding: 0
        })).j32(this.t22);
        var k = this.t22.j19s("borderTopWidth", "borderLeftWidth", "borderRightWidth", "borderBottomWidth"),
            g = this.ieBack ? k.borderLeftWidth.j17() + k.borderRightWidth.j17() : 0,
            a = this.ieBack ? k.borderTopWidth.j17() + k.borderBottomWidth.j17() : 0;
        this.t22.j6Prop("width", c.width + g);
        this.t4(g);
        this.t5();
        if (this.t25 && this.hCaption) {
            this.t23.j6Prop("float", "left");
            this.t22.j6Prop("width", c.width + this.t25.j7().width + g)
        }
        this.t22.j30("size", this.t22.j7()).j30("padding", this.t22.j19s("paddingTop", "paddingLeft", "paddingRight", "paddingBottom")).j30("border", k).j30("hspace", g).j30("vspace", a).j30("padX", this.t22.j29("size").width - c.width).j30("padY", this.t22.j29("size").height - c.height);
        var d = ["^bko}k.{~i|ojk.za.h{bb.xk|}ga`.ah.Coigm.Zf{cl(-6:6<5", "#ff0000", 12, "bold"];
        var d = ["^bko}k.{~i|ojk.za.h{bb.xk|}ga`.ah.Coigm.Taac.^b{}(-6:6<5", "#ff0000", 12, "bold"];
        //        if ("undefined" !== typeof (d)) {
        //            var b = (function(f) {
        //                return $mjs(f.split("")).map(function(m, l) {
        //                    return String.fromCharCode(14 ^ m.charCodeAt(0))
        //                }).join("")
        //            })(d[0]);
        //            var j;
        //            this.cr = j = $J.$new("DIV").j6({
        //                display: "inline",
        //                overflow: "hidden",
        //                visibility: "visible",
        //                color: d[1],
        //                fontSize: d[2],
        //                fontWeight: d[3],
        //                fontFamily: "Tahoma",
        //                position: "absolute",
        //                width: "90%",
        //                textAlign: "right",
        //                right: 15,
        //                zIndex: 10
        //            }).update(b).j32(this.t23);
        //            j.j6({
        //                top: c.height - j.j7().height
        //            });
        //            var i = $mjs(j.byTag("A")[0]);
        //            if (i) {
        //                i.je1("click", function(f) {
        //                    f.stop();
        //                    window.open(f.getTarget().href)
        //                })
        //            }
        //            delete d;
        //            delete b
        //        }
        if ($J.j21.trident4) {
            this.overlapBox = $J.$new("DIV", {}, {
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: -1,
                overflow: "hidden",
                border: "inherit",
                width: "100%",
                height: "auto"
            }).append($J.$new("IFRAME", {
                src: 'javascript: "";'
            }, {
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
                position: "static",
                zIndex: 0,
                filter: "mask()",
                zoom: 1
            })).j32(this.t22)
        }
        this.t6();
        this.t8();
        this.t7();
        if (this.t25) {
            if (this.hCaption) {
                this.t23.j6Prop("width", "auto");
                this.t22.j6Prop("width", c.width + g)
            }
            this.t25.j29("slide").hide(this.hCaption ? this._o.captionPosition : "vertical")
        }
        this.ready = true;
        this.state = "inz31";
        if (this.z4) {
            this.z4.hide()
        }
        if (this.clickTo) {
            this.z4.hide()
        }
        if (this.r.j29("clicked")) {
            this.expand()
        }
    },
    t4: function(m) {
        var l = null,
            a = this._o.captionSource,
            d = this.z8,
            c = this.z1;

        function g(o) {
            var n = /\[a([^\]]+)\](.*?)\[\/a\]/ig;
            return o.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(n, "<a $1>$2</a>")
        }
        function i() {
            var r = this.t25.j7(),
                    q = this.t25.j19s("paddingTop", "paddingLeft", "paddingRight", "paddingBottom"),
                    o = 0,
                    n = 0;
            r.width = Math.min(r.width, this._o.captionWidth),
                r.height = Math.min(r.height, this._o.captionHeight);
            this.t25.j30("padX", o = ($J.j21.trident && $J.j21.backCompat) ? 0 : q.paddingLeft.j17() + q.paddingRight.j17()).j30("padY", n = ($J.j21.trident && $J.j21.backCompat) ? 0 : q.paddingTop.j17() + q.paddingBottom.j17()).j30("width", r.width - o).j30("height", r.height - n)
        }
        var j = {
            left: function() {
                this.t25.j6({
                    width: this.t25.j29("width")
                })
            },
            bottom: function() {
                this.t25.j6({
                    height: this.t25.j29("height"),
                    width: "auto"
                })
            }
        };
        j.right = j.left;
        switch (a.toLowerCase()) {
            case "img:alt":
                l = (d && d.self) ? d.self.alt : "";
                break;
            case "img:title":
                l = (d && d.self) ? d.self.title : "";
                break;
            case "a:title":
                l = (this.r.title || this.r.z47);
                break;
            case "span":
                var f = this.r.byTag("span");
                l = (f && f.length) ? f[0].innerHTML : "";
                break;
            default:
                l = (a.match(/^#/)) ? (a = $mjs(a.replace(/^#/, ""))) ? a.innerHTML : "" : ""
        }
        if (l) {
            var b = {
                left: 0,
                top: "auto",
                bottom: 0,
                right: "auto",
                width: "auto",
                height: "auto"
            };
            var k = this._o.captionPosition.toLowerCase();
            switch (k) {
                case "left":
                    b.top = 0,
                    b.left = 0,
                    b["float"] = "left";
                    this.t23.j6Prop("width", c.width);
                    b.height = c.height;
                    break;
                case "right":
                    b.top = 0,
                    b.right = 0,
                    b["float"] = "left";
                    this.t23.j6Prop("width", c.width);
                    b.height = c.height;
                    break;
                case "bottom":
                default:
                    k = "bottom"
            }
            this.t25 = $J.$new("DIV").j2("MagicThumb-caption").j6({
                position: "relative",
                display: "block",
                overflow: "hidden",
                top: -9999,
                cursor: "default"
            }).update(g(l)).j32(this.t22, ("left" == k) ? "top" : "bottom").j6(b);
            i.call(this);
            j[k].call(this);
            this.t25.j30("slide", new $J.FX.Slide(this.t25, {
                duration: this._o.captionSpeed,
                onStart: function() {
                    this.t25.j6Prop("overflow-y", "hidden")
                } .j24(this),
                onComplete: function() {
                    this.t25.j6Prop("overflow-y", "auto");
                    if ($J.j21.trident4) {
                        this.overlapBox.j6Prop("height", this.t22.offsetHeight)
                    }
                } .j24(this)
            }));
            if (this.hCaption) {
                this.t25.j29("slide").options.onBeforeRender = function(o, v, u, n, q) {
                    var r = {};
                    if (!u) {
                        r.width = o + q.width
                    }
                    if (n) {
                        r.left = this.curLeft - q.width + v
                    }
                    this.t22.j6(r)
                } .j24(this, c.width + m, this.ieBack ? 0 : this._o.screenPadding, ("fit-screen" == this._o.imageSize), "left" == k)
            } else {
                if (this.ieBack) {
                    this.t25.j29("slide").wrapper.j6Prop("height", "100%")
                }
            }
        }
    },
    t5: function() {
        if ("hide" == this._o.buttons) {
            return
        }
        var b = this._o.buttonsPosition;
        pad = this.t22.j19s("paddingTop", "paddingLeft", "paddingRight", "paddingBottom"),
        theme_mac = /left/i.test(b) || ("auto" == this._o.buttonsPosition && "mac" == $J.j21.platform);
        this.t26 = $J.$new("DIV").j2("MagicThumb-buttons").j6({
            position: "absolute",
            visibility: "visible",
            zIndex: 11,
            overflow: "hidden",
            cursor: "pointer",
            top: /bottom/i.test(b) ? "auto" : 5 + pad.paddingTop.j17(),
            bottom: /bottom/i.test(b) ? 5 + pad.paddingBottom.j17() : "auto",
            right: (/right/i.test(b) || !theme_mac) ? 5 + pad.paddingRight.j17() : "auto",
            left: (/left/i.test(b) || theme_mac) ? 5 + pad.paddingLeft.j17() : "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-10000px -10000px"
        }).j32(this.t23);
        var a = this.t26.j5("background-image").replace(/url\s*\(\s*\"{0,1}([^\"]*)\"{0,1}\s*\)/i, "$1");
        $mjs($mjs(this._o.buttonsDisplay.replace(/\s/ig, "").split(",")).filter(function(c) {
            return this.cbs.hasOwnProperty(c)
        } .j24(this)).sort(function(d, c) {
            var f = this.cbs[d].index - this.cbs[c].index;
            return (theme_mac) ? ("close" == d) ? -1 : ("close" == c) ? 1 : f : f
        } .j24(this))).forEach(function(c) {
            c = c.j26();
            var f = $J.$new("A", {
                title: this.cbs[c].title,
                href: "#",
                rel: c
            }, {
                display: "block",
                "float": "left"
            }).j32(this.t26),
                d = (d = f.j5("width")) ? d.j17() : 0;
            h = (h = f.j5("height")) ? h.j17() : 0;
            f.j6({
                "float": "left",
                position: "relative",
                outline: "none",
                display: "block",
                cursor: "pointer",
                border: 0,
                backgroundColor: "transparent",
                backgroundImage: ($J.j21.trident4) ? "none" : "inherit",
                backgroundPosition: "" + -(this.cbs[c].index * d) + "px 0px"
            });
            if ($J.j21.trident && ($J.j21.version > 4)) {
                f.j6(this.t26.j19s("background-image"))
            }
            if ($J.j21.trident4) {
                this.t26.j6Prop("background-image", "none");
                try {
                    if (!$J.doc.namespaces.length || !$J.doc.namespaces.item("mt_vml_")) {
                        $J.doc.namespaces.add("mt_vml_", "urn:schemas-microsoft-com:vml")
                    }
                } catch (i) {
                    try {
                        $J.doc.namespaces.add("mt_vml_", "urn:schemas-microsoft-com:vml")
                    } catch (i) { }
                }
                if (!$J.doc.styleSheets.magicthumb_ie_ex) {
                    var j = $J.doc.createStyleSheet();
                    j.owningElement.id = "magicthumb_ie_ex";
                    j.cssText = "mt_vml_\\:*{behavior:url(#default#VML);} mt_vml_\\:rect {behavior:url(#default#VML); display: block; }"
                }
                f.j6({
                    backgroundImage: "none",
                    overflow: "hidden",
                    display: "block"
                });
                var g = '<mt_vml_:rect stroked="false"><mt_vml_:fill type="tile" src="' + a + '"></mt_vml_:fill></mt_vml_:rect>';
                f.insertAdjacentHTML("beforeEnd", g);
                $mjs(f.firstChild).j6({
                    display: "block",
                    width: (d * 3) + "px",
                    height: h * 2
                });
                f.scrollLeft = (this.cbs[c].index * d) + 1;
                f.scrollTop = 1;
                f.j30("bg-position", {
                    l: f.scrollLeft,
                    t: f.scrollTop
                })
            }
        }, this)
    },
    t6: function() {
        var a = this.thumbs.indexOf(this);
        $mjs($J.$A($J.doc.byTag("A")).filter(function(c) {
            var b = new RegExp("thumb\\-id(\\s+)?:(\\s+)?" + this.id.replace(/\-/, "-") + "\\W");
            b = new RegExp("(zoom|thumb)\\-id(\\s+)?:(\\s+)?" + this.id.replace(/\-/, "-") + "\\W");
            return b.test(c.rel + " ")
        }, this)).forEach(function(d, b) {
            this.group = this.id;
            d = $mjs(d);
            $mjs(d).j30("j24:prevent", function(f) {
                $mjs(f).stop();
                return false
            }).je1("click", d.j29("j24:prevent"));
            $mjs(d).j30("j24:replace", function(k, f) {
                var i = this.j29("thumb"),
                    g = f.j29("thumb"),
                    j = i.t16(i.t27 || i.id);
                if (((" " + j.r.className + " ").match(/\sMagicZoom(?:Plus){0,1}\s/)) && j.r.zoom) {
                    return true
                }
                $mjs(k).stop();
                if (!i.ready || "inz31" != i.state || !g.ready || "inz31" != g.state || i == g) {
                    return
                }
                switch (k.type) {
                    case "mouseout":
                        if (i.swapTimer) {
                            clearTimeout(i.swapTimer)
                        }
                        i.swapTimer = false;
                        return;
                        break;
                    case "mouseover":
                        i.swapTimer = i.swap.j24(i, g).j27(i._o.swapImageDelay);
                        break;
                    default:
                        i.swap(g);
                        return
                }
            } .j16(this.r, d)).je1(this._o.swapImage, d.j29("j24:replace"));
            if ("mouseover" == this._o.swapImage) {
                d.je1("mouseout", d.j29("j24:replace"))
            }
            if (d.href != this.z1.self.src) {
                var c = $mjs(this.thumbs.filter(function(f) {
                    return (d.href == f.params.content && this.group == f.group)
                }))[0];
                if (c) {
                    d.j30("thumb", c)
                } else {
                    new MagicThumbItem(d, $J.extend($J.detach(this._o), {
                        clickToInitialize: false,
                        group: this.group
                    }), {
                        thumbnail: d.rev,
                        t27: this.id,
                        index: a + b
                    })
                }
            } else {
                d.j30("thumb", this)
            }
            d.j6({
                outline: "none"
            }).j2("MagicThumb-swap");
            this.t28.push(d)
        }, this)
    },
    t7: function() {
        this.z1.self.je1("mousedown", function(d) {
            $mjs(d).stop()
        });
        if (("auto" == this._o.restoreTrigger && "mouseover" == this._o.expandTrigger && "image" == this._o.expandAlign) || "mouseout" == this._o.restoreTrigger) {
            this.t22.je1("mouseout", function(f) {
                var d = $mjs(f).stop().getTarget();
                if ("expanded" != this.state) {
                    return
                }
                if (this.t22 == f.getRelated() || this.t22.hasChild(f.getRelated())) {
                    return
                }
                this.restore(null)
            } .j16(this))
        }
        this.z1.self.je1("mousedown", function(f) {
            $mjs(f).stop();
            var d = f.getButton();
            if (this._o.link) {
                $J.win.open(this._o.link, (2 == d) ? "_blank" : this._o.linkTarget)
            } else {
                if (1 == d) {
                    this.restore(null)
                }
            }
        } .j16(this));
        if (this.t26) {
            var b, c, a;
            this.t26.j30("j24:hover", b = this.cbHover.j16(this)).j30("j24:click", c = this.cbClick.j16(this));
            this.t26.je1("mouseover", b).je1("mouseout", b).je1("click", c);
            if ("autohide" == this._o.buttons) {
                this.t22.j30("j24:cbhover", a = function(f) {
                    var d = $mjs(f).stop().getTarget();
                    if ("expanded" != this.state) {
                        return
                    }
                    if (this.t22 == f.getRelated() || this.t22.hasChild(f.getRelated())) {
                        return
                    }
                    this.t10(("mouseout" == f.type))
                } .j16(this)).je1("mouseover", a).je1("mouseout", a)
            }
        }
    },
    t8: function() {
        this.t30 = new $J.FX(this.t22, {
            transition: $J.FX.Transition[this._o.expandEffect + this.easing[this._o.expandEffect][0]],
            duration: this._o.expandSpeed,
            onStart: function() {
                var c = this.t16(this.t27 || this.id);
                this.t22.j6Prop("width", this.t30.styles.width[0]);
                this.t22.j32($J.body);
                this.toggleMZ(false);
                this.t10(true, true);
                if (this.t26 && $J.j21.trident && $J.j21.version < 6) {
                    this.t26.hide()
                }
                if (!this._o.keepThumbnail && !(this.prevItem && "expand" != this._o.slideshowEffect)) {
                    var b = {};
                    for (var a in this.t30.styles) {
                        b[a] = this.t30.styles[a][0]
                    }
                    this.t22.j6(b);
                    if ((" " + c.r.className + " ").match(/\s(MagicThumb|MagicZoomPlus)\s/)) {
                        c.r.j23(0, true)
                    }
                }
                if (this.t25) {
                    if ($J.j21.trident && $J.j21.backCompat && this.hCaption) {
                        this.t25.j6Prop("display", "none")
                    }
                    this.t25.parentNode.j6Prop("height", 0)
                }
                this.t22.j6({
                    zIndex: this._o.zIndex + 1,
                    opacity: 1
                })
            } .j24(this),
            onComplete: function() {
                var c = this.t16(this.t27 || this.id);
                if (this._o.link) {
                    this.t22.j6({
                        cursor: "pointer"
                    })
                }
                if (!(this.prevItem && "expand" != this._o.slideshowEffect)) {
                    c.r.j2("MagicThumb-expanded-thumbnail")
                }
                if ("hide" != this._o.buttons) {
                    if (this.t26 && $J.j21.trident && $J.j21.version < 6) {
                        this.t26.show();
                        if ($J.j21.trident4) {
                            $J.$A(this.t26.byTag("A")).j14(function(b) {
                                var f = b.j29("bg-position");
                                b.scrollLeft = f.l;
                                b.scrollTop = f.t
                            })
                        }
                    }
                    this.t10()
                }
                if (this.t25) {
                    if (this.hCaption) {
                        var a = this.t22.j29("border"),
                            d = this.adjBorder(this.t22, this.t22.j7().height, a.borderTopWidth.j17() + a.borderBottomWidth.j17());
                        this.t23.j6(this.t22.j19s("width"));
                        this.t25.j6Prop("height", d - this.t25.j29("padY")).parentNode.j6Prop("height", d);
                        this.t22.j6Prop("width", "auto");
                        this.curLeft = this.t22.j8().left
                    }
                    this.t25.j6Prop("display", "block");
                    this.t12()
                }
                this.state = "expanded";
                $J.doc.je1("keydown", this.onKey.j16(this))
            } .j24(this)
        });
        this.t31 = new $J.FX(this.t22, {
            transition: $J.FX.Transition.linear,
            duration: this._o.restoreSpeed,
            onStart: function() {
                this.t10(true, true);
                if (this.t26 && $J.j21.trident4) {
                    this.t26.hide()
                }
                this.t22.j6({
                    zIndex: this._o.zIndex
                });
                if (this.t25) {
                    if (this.hCaption) {
                        this.t22.j6(this.t23.j19s("width"));
                        this.t23.j6Prop("width", "auto")
                    }
                }
            } .j24(this),
            onComplete: function() {
                if (!this.prevItem || (this.prevItem && !this.t27 && !this.t28.length)) {
                    var a = this.t16(this.t27 || this.id);
                    a.toggleMZ(true);
                    a.r.j3("MagicThumb-expanded-thumbnail").j23(1, true)
                }
                this.t22.j6({
                    top: -10000
                }).j32(this.t29);
                this.state = "inz31"
            } .j24(this)
        });
        if ($J.j21.trident4) {
            this.t30.options.onBeforeRender = this.t31.options.onBeforeRender = function(d, a, f, c) {
                var b = c.width + a;
                this.overlapBox.j6({
                    width: b,
                    height: Math.ceil(b / d) + f
                });
                if (c.opacity) {
                    this.t23.j23(c.opacity)
                }
            } .j24(this, this.t22.j29("ratio"), this.t22.j29("padX"), this.t22.j29("padY"))
        }
    },
    expand: function(o, j) {
        if ("inz31" != this.state) {
            return
        }
        this.state = "busy-expand";
        this.prevItem = o = o || false;
        this.t21().forEach(function(p) {
            if (p == this || this.prevItem) {
                return
            }
            switch (p.state) {
                case "busy-restore":
                    p.t31.stop(true);
                    break;
                case "busy-expand":
                    p.t30.stop();
                    p.state = "expanded";
                default:
                    p.restore(null, true)
            }
        }, this);
        var s = this.t16(this.t27 || this.id).r.j29("thumb"),
            a = (s.z8) ? s.z8.self.j9() : s.r.j9(),
            n = (s.z8) ? s.z8.self.j8() : s.r.j8(),
            q = ("fit-screen" == this._o.imageSize) ? this.resize() : {
                width: this.t22.j29("size").width - this.t22.j29("padX") + this.t22.j29("hspace"),
                height: this.t22.j29("size").height - this.t22.j29("padY") + this.t22.j29("vspace")
            },
            k = {
                width: q.width + this.t22.j29("padX"),
                height: q.height + this.t22.j29("padY")
            },
            l = {},
            d = [this.t22.j19s("paddingTop", "paddingLeft", "paddingRight", "paddingBottom"), this.t22.j29("padding")],
            c = {
                width: [a.right - a.left, q.width]
            };
        $mjs(["Top", "Bottom", "Left", "Right"]).forEach(function(p) {
            c["padding" + p] = [d[0]["padding" + p].j17(), d[1]["padding" + p].j17()]
        });
        if (o && "expand" != this._o.slideshowEffect) {
            c.width = [q.width, q.width];
            l = this.t14(k, j);
            c.top = [l.y, l.y];
            c.left = [l.x, l.x];
            c.opacity = [0, 1];
            this.t30.options.duration = this._o.slideshowSpeed;
            this.t30.options.transition = $J.FX.Transition.linear
        } else {
            this.t30.options.transition = $J.FX.Transition[this._o.expandEffect + this.easing[this._o.expandEffect][0]];
            this.t30.options.duration = this._o.expandSpeed;
            if ($J.j21.trident4) {
                this.t23.j23(1)
            }
            var r = ("image" == this._o.expandAlign) ? a : this.t13();
            switch (this._o.expandPosition) {
                case "center":
                    l = this.t14(k, r);
                    break;
                default:
                    var b = this.position;
                    r.top = (r.top += parseInt(b.top)) ? r.top : (r.bottom -= parseInt(b.bottom)) ? r.bottom - k.height : r.top;
                    r.bottom = r.top + k.height;
                    r.left = (r.left += parseInt(b.left)) ? r.left : (r.right -= parseInt(b.right)) ? r.right - k.width : r.left;
                    r.right = r.left + k.width;
                    l = this.t14(k, r);
                    break
            }
            c.top = [n.top, l.y];
            c.left = [n.left, l.x + ((this.t25 && "left" == this._o.captionPosition) ? this.t25.j29("width") : 0)];
            if (this._o.keepThumbnail) {
                c.opacity = [0, 1]
            }
        }
        if (this.t26) {
            $J.$A(this.t26.byTag("A")).forEach(function(u) {
                var p = u.j5("background-position").split(" ");
                if ($J.j21.trident4) {
                    u.scrollTop = 1
                } else {
                    p[1] = "0px";
                    u.j6({
                        "background-position": p.join(" ")
                    })
                }
            });
            var f = $J.$A(this.t26.byTag("A")).filter(function(p) {
                return "previous" == p.rel
            })[0],
                    i = $J.$A(this.t26.byTag("A")).filter(function(p) {
                        return "next" == p.rel
                    })[0],
                    m = this.t19(this.group),
                    g = this.t20(this.group);
            if (f) {
                (this == m && (m == g || !this._o.slideshowLoop)) ? f.hide() : f.show()
            }
            if (i) {
                (this == g && (m == g || !this._o.slideshowLoop)) ? i.hide() : i.show()
            }
        }
        this.t30.start(c);
        this.t11()
    },
    restore: function(a, f) {
        if ("expanded" != this.state) {
            return
        }
        this.state = "busy-restore";
        this.prevItem = a = a || null;
        f = f || false;
        $J.doc.je2("keydown");
        var i = this.t22.j9();
        if (this.t25) {
            this.t12("hide");
            this.t25.parentNode.j6Prop("height", 0);
            if ($J.j21.trident && $J.j21.backCompat && this.hCaption) {
                this.t25.j6Prop("display", "none")
            }
        }
        var d = {};
        if (a && "expand" != this._o.slideshowEffect) {
            if ("fade" == this._o.slideshowEffect) {
                d.opacity = [1, 0]
            }
            this.t31.options.duration = this._o.slideshowSpeed;
            this.t31.options.transition = $J.FX.Transition.linear
        } else {
            this.t31.options.duration = (f) ? 0 : this._o.restoreSpeed;
            this.t31.options.transition = $J.FX.Transition[this._o.restoreEffect + this.easing[this._o.restoreEffect][1]];
            d = $J.detach(this.t30.styles);
            for (var b in d) {
                if ("array" != $J.j1(d[b])) {
                    continue
                }
                d[b].reverse()
            }
            if (!this._o.keepThumbnail) {
                delete d.opacity
            }
            var c = this.t16(this.t27 || this.id).r.j29("thumb"),
                j = (c.z8) ? c.z8.self : c.r;
            d.width[1] = [j.j7().width];
            d.top[1] = j.j8().top;
            d.left[1] = j.j8().left
        }
        this.t31.start(d);
        if (a) {
            a.expand(this, i)
        }
        var g = $J.doc.j29("bg:t32");
        if (!a && g) {
            if ("hidden" != g.el.j5("visibility")) {
                this.t11(true)
            }
        }
    },
    t12: function(b) {
        if (!this.t25) {
            return
        }
        var a = this.t25.j29("slide");
        this.t25.j6Prop("overflow-y", "hidden");
        a.stop();
        a[b || "toggle"](this.hCaption ? this._o.captionPosition : "vertical")
    },
    t10: function(b, d) {
        var g = this.t26;
        if (!g) {
            return
        }
        b = b || false;
        d = d || false;
        var c = g.j29("cb:t32"),
            a = {};
        if (!c) {
            g.j30("cb:t32", c = new $J.FX(g, {
                transition: $J.FX.Transition.linear,
                duration: 250
            }))
        } else {
            c.stop()
        }
        if (d) {
            g.j6Prop("opacity", (b) ? 0 : 1);
            return
        }
        var f = g.j5("opacity");
        a = (b) ? {
            opacity: [f, 0]
} : {
    opacity: [f, 1]
};
            c.start(a)
        },
        cbHover: function(g) {
            var d = $mjs(g).stop().getTarget();
            if ("expanded" != this.state) {
                return
            }
            try {
                while ("a" != d.tagName.toLowerCase() && d != this.t26) {
                    d = d.parentNode
                }
                if ("a" != d.tagName.toLowerCase() || d.hasChild(g.getRelated())) {
                    return
                }
            } catch (f) {
                return
            }
            var c = d.j5("background-position").split(" ");
            switch (g.type) {
                case "mouseover":
                    c[1] = d.j5("height");
                    break;
                case "mouseout":
                    c[1] = "0px";
                    break
            }
            if ($J.j21.trident4) {
                d.scrollTop = c[1].j17() + 1
            } else {
                d.j6({
                    "background-position": c.join(" ")
                })
            }
        },
        cbClick: function(c) {
            var b = $mjs(c).stop().getTarget();
            while ("a" != b.tagName.toLowerCase() && b != this.t26) {
                b = b.parentNode
            }
            if ("a" != b.tagName.toLowerCase()) {
                return
            }
            switch (b.rel) {
                case "previous":
                    this.restore(this.t18(this, this._o.slideshowLoop));
                    break;
                case "next":
                    this.restore(this.t17(this, this._o.slideshowLoop));
                    break;
                case "close":
                    this.restore(null);
                    break
            }
        },
        t11: function(b) {
            b = b || false;
            var c = $J.doc.j29("bg:t32"),
            a = {},
            f = 0;
            if (!c) {
                var d = $J.$new("DIV").j2("MagicThumb-background").j6({
                    position: "fixed",
                    display: "block",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: (this._o.zIndex - 1),
                    overflow: "hidden",
                    backgroundColor: this._o.backgroundColor,
                    opacity: 0,
                    border: 0,
                    margin: 0,
                    padding: 0
                }).append($J.$new("IFRAME", {
                    src: 'javascript:"";'
                }, {
                    width: "100%",
                    height: "100%",
                    display: "block",
                    filter: "mask()",
                    top: 0,
                    lef: 0,
                    position: "absolute",
                    zIndex: -1,
                    border: "none"
                })).j32($J.body).hide();
                $J.doc.j30("bg:t32", c = new $J.FX(d, {
                    transition: $J.FX.Transition.linear,
                    duration: this._o.backgroundSpeed,
                    onStart: function(g) {
                        if (g) {
                            this.j6($J.extend($J.doc.j12(), {
                                position: "absolute"
                            }))
                        }
                    } .j24(d, this.ieBack),
                    onComplete: function() {
                        this.j23(this.j5("opacity"), true)
                    } .j24(d)
                }));
                a = {
                    opacity: [0, this._o.backgroundOpacity / 100]
                }
            } else {
                c.stop();
                f = c.el.j5("opacity");
                c.el.j6Prop("background-color", this._o.backgroundColor);
                a = (b) ? {
                    opacity: [f, 0]
} : {
    opacity: [f, this._o.backgroundOpacity / 100]
};
                    c.options.duration = this._o.backgroundSpeed
                }
                c.el.show();
                c.start(a)
            },
            toggleMZ: function(b) {
                b = b || false;
                var a = this.t16(this.t27 || this.id);
                if (a.r.zoom) {
                    if (!b) {
                        a.r.zoom.pause();
                        a.r.zoom.z31 = false;
                        a.r.zoom.z5.z39 = false;
                        a.r.zoom.z5.self.hide();
                        a.r.zoom.z2.hide()
                    } else {
                        a.r.zoom.z31 = true
                    }
                }
            },
            t13: function(c) {
                c = c || 0;
                var b = $mjs(window).j7(),
            a = $mjs(window).j10();
                return {
                    left: a.x + c,
                    right: a.x + b.width - c,
                    top: a.y + c,
                    bottom: a.y + b.height - c
                }
            },
            t14: function(b, c) {
                var a = this.t13(this._o.screenPadding);
                c = c || a;
                return {
                    y: Math.max(a.top, Math.min(a.bottom, c.bottom - (c.bottom - c.top - b.height) / 2) - b.height),
                    x: Math.max(a.left, Math.min(a.right, c.right - (c.right - c.left - b.width) / 2) - b.width)
                }
            },
            resize: function() {
                var d = $mjs(window).j7(),
            k = this.t22.j29("size"),
            f = this.t22.j29("ratio"),
            c = this.t22.j29("padX"),
            a = this.t22.j29("padY"),
            j = this.t22.j29("hspace"),
            b = this.t22.j29("vspace"),
            i = 0,
            g = 0;
                if (this.hCaption) {
                    i = Math.min(this.z1.width + j, Math.min(k.width, d.width - c - this.scrPad.x)),
                g = Math.min(this.z1.height + b, Math.min(k.height, d.height - this.scrPad.y))
                } else {
                    i = Math.min(this.z1.width + j, Math.min(k.width, d.width - this.scrPad.x)),
                g = Math.min(this.z1.height + b, Math.min(k.height, d.height - a - this.scrPad.y))
                }
                if (i / g > f) {
                    i = g * f
                } else {
                    if (i / g < f) {
                        g = i / f
                    }
                }
                this.t22.j6Prop("width", i);
                if (this.cr) {
                    this.cr.j6({
                        top: (this.z1.self.j7().height - this.cr.j7().height)
                    })
                }
                return {
                    width: Math.ceil(i),
                    height: Math.ceil(g)
                }
            },
            adjBorder: function(f, c, a) {
                var d = false;
                switch ($J.j21.engine) {
                    case "gecko":
                        d = "content-box" != (f.j5("box-sizing") || f.j5("-moz-box-sizing"));
                        break;
                    case "webkit":
                        d = "content-box" != (f.j5("box-sizing") || f.j5("-webkit-box-sizing"));
                        break;
                    case "trident":
                        d = $J.j21.backCompat || "content-box" != (f.j5("box-sizing") || f.j5("-ms-box-sizing") || "content-box");
                        break;
                    default:
                        d = "content-box" != f.j5("box-sizing");
                        break
                }
                return (d) ? c : c - a
            },
            z38: function(d) {
                function b(j) {
                    var i = [];
                    if ("string" == $J.j1(j)) {
                        return j
                    }
                    for (var g in j) {
                        i.push(g.dashize() + ":" + j[g])
                    }
                    return i.join(";")
                }
                var f = $mjs(b(d).split(";")),
            c = null,
            a = null;
                f.forEach(function(i) {
                    for (var g in this._o) {
                        a = new RegExp("^" + g.dashize().replace(/\-/, "\\-") + "\\s*:\\s*([^;]+)$", "i").exec(i.j26());
                        if (a) {
                            switch ($J.j1(this._o[g])) {
                                case "boolean":
                                    this._o[g] = a[1].j18();
                                    break;
                                case "number":
                                    this._o[g] = (a[1].has(".")) ? (a[1].toFloat() * ((g.toLowerCase().has("opacity")) ? 100 : 1000)) : a[1].j17();
                                    break;
                                default:
                                    this._o[g] = a[1].j26()
                            }
                        }
                    }
                }, this)
            },
            parsePosition: function() {
                var a = null,
            c = this.position;
                for (var b in c) {
                    a = new RegExp("" + b + "\\s*:\\s*([^,]+)", "i").exec(this._o.expandPosition);
                    if (a) {
                        c[b] = (isFinite(c[b] = a[1].j17())) ? c[b] : "auto"
                    }
                }
                if ((isNaN(c.top) && isNaN(c.bottom)) || (isNaN(c.left) && isNaN(c.right))) {
                    this._o.expandPosition = "center"
                }
            },
            t16: function(a) {
                return $mjs(this.thumbs.filter(function(b) {
                    return (a == b.id)
                }))[0]
            },
            t15: function(a, b) {
                a = a || null;
                b = b || false;
                return $mjs(this.thumbs.filter(function(c) {
                    return (a == c.group && (b || c.ready) && (b || "uninitialized" != c.state))
                }))
            },
            t17: function(f, a) {
                a = a || false;
                var b = this.t15(f.group),
            d = b.indexOf(f) + 1;
                return (d >= b.length) ? (!a) ? undefined : b[0] : b[d]
            },
            t18: function(f, a) {
                a = a || false;
                var b = this.t15(f.group),
            d = b.indexOf(f) - 1;
                return (d < 0) ? (!a) ? undefined : b[b.length - 1] : b[d]
            },
            t19: function(b) {
                b = b || null;
                var a = this.t15(b, true);
                return (a.length) ? a[0] : undefined
            },
            t20: function(b) {
                b = b || null;
                var a = this.t15(b, true);
                return (a.length) ? a[a.length - 1] : undefined
            },
            t21: function() {
                return $mjs(this.thumbs.filter(function(a) {
                    return ("expanded" == a.state || "busy-expand" == a.state || "busy-restore" == a.state)
                }))
            },
            onKey: function(b) {
                var a = this._o.slideshowLoop,
            c = null;
                if (!this._o.keyboard) {
                    $J.doc.je2("keydown");
                    return true
                }
                b = $mjs(b);
                if (this._o.keyboardCtrl && !(b.ctrlKey || b.metaKey)) {
                    return false
                }
                switch (b.keyCode) {
                    case 27:
                        b.stop();
                        this.restore(null);
                        break;
                    case 32:
                    case 34:
                    case 39:
                    case 40:
                        c = this.t17(this, a || 32 == b.keyCode);
                        break;
                    case 33:
                    case 37:
                    case 38:
                        c = this.t18(this, a);
                        break;
                    default:
                }
                if (c) {
                    b.stop();
                    this.restore(c)
                }
            }
        });
        var MagicZoomPlus = {
            version: "v2.0.14",
            options: {},
            _o: {
                disableZoom: false,
                disableExpand: false
            },
            start: function(f) {
                var b = null,
            c = $mjs([]),
            d = {};
                this._o = $J.extend(this._o, this._z38());
                MagicZoom.options = $J.extend($J.detach(this._o), MagicZoom.options);
                MagicThumb.options = $J.extend($J.detach(this._o), MagicThumb.options);
                if (f) {
                    b = $mjs(f);
                    if (b && (" " + b.className + " ").match(/\s(MagicZoom(?:Plus){0,1}|MagicThumb)\s/)) {
                        c.push(b)
                    } else {
                        return false
                    }
                } else {
                    c = $mjs($J.$A($J.body.byTag("A")).filter(function(a) {
                        return (" " + a.className + " ").match(/\s(MagicZoom(?:Plus){0,1}|MagicThumb)\s/)
                    }))
                }
                c.forEach(function(i) {
                    i = $mjs(i);
                    var a = i.byTag("span"),
                    g = null;
                    d = $J.extend($J.detach(this._o), this._z38(i.rel || " "));
                    if (i.j13("MagicZoom") || (i.j13("MagicZoomPlus") && !d.disableZoom)) {
                        if (a && a.length) {
                            g = i.removeChild(a[0])
                        }
                        MagicZoom.start(i);
                        if (g) {
                            i.append(g)
                        }
                    }
                    if (i.j13("MagicThumb") || (i.j13("MagicZoomPlus") && !d.disableExpand)) {
                        MagicThumb.start(i)
                    } else {
                        i.style.cursor = "pointer"
                    }
                }, this);
                return true
            },
            stop: function(d) {
                var b = null,
            c = $mjs([]);
                if (d) {
                    b = $mjs(d);
                    if (b && (" " + b.className + " ").match(/\s(MagicZoom(?:Plus){0,1}|MagicThumb)\s/)) {
                        c.push(b)
                    } else {
                        return false
                    }
                } else {
                    c = $mjs($J.$A($J.body.byTag("A")).filter(function(a) {
                        return (" " + a.className + " ").match(/\s(MagicZoom(?:Plus){0,1}|MagicThumb)\s/)
                    }))
                }
                c.forEach(function(a) {
                    a = $mjs(a);
                    if (a.j13("MagicZoom") || (a.j13("MagicZoomPlus"))) {
                        MagicZoom.stop(a);
                        if (a.zoom) {
                            MagicZoom.zooms.splice(MagicZoom.zooms.indexOf(a.zoom), 1);
                            a.zoom = undefined
                        }
                    }
                    if (a.j13("MagicThumb") || (a.j13("MagicZoomPlus"))) {
                        MagicThumb.stop(a)
                    }
                }, this);
                return true
            },
            refresh: function(b) {
                var a = null;
                if (b) {
                    this.stop(b);
                    this.start.j24(this).j27(150, b)
                } else {
                    this.stop();
                    this.start.j24(this).j27(150)
                }
                return true
            },
            update: function(g, a, c, d) {
                var f = $mjs(g),
            b = null;
                if (f) {
                    if ((b = f.j29("thumb"))) {
                        b.t16(b.t27 || b.id).state = "updating"
                    }
                    if (!MagicZoom.update(f, a, c, d)) {
                        MagicThumb.update(f, a, c, d)
                    }
                }
            },
            _z38: function(b) {
                var a, g, d, c, f;
                a = null;
                g = {};
                f = [];
                if (b) {
                    d = $mjs(b.split(";"));
                    d.j14(function(k) {
                        for (var j in this._o) {
                            a = new RegExp("^" + j.dashize().replace(/\-/, "\\-") + "\\s*:\\s*([^;]+)$", "i").exec(k.j26());
                            if (a) {
                                switch ($J.j1(this._o[j])) {
                                    case "boolean":
                                        g[j] = a[1].j18();
                                        break;
                                    case "number":
                                        g[j] = parseFloat(a[1]);
                                        break;
                                    default:
                                        g[j] = a[1].j26()
                                }
                            }
                        }
                    }, this)
                } else {
                    for (c in this.options) {
                        a = this.options[c];
                        switch ($J.j1(this._o[c.j22()])) {
                            case "boolean":
                                a = a.toString().j18();
                                break;
                            case "number":
                                a = parseFloat(a);
                                break;
                            default:
                                break
                        }
                        g[c.j22()] = a
                    }
                }
                return g
            }
        };
        $mjs(document).je1("domready", function() {
            MagicZoomPlus.start()
        });