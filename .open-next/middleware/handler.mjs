
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.6.5";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        return new Response(result.body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, a = true;
        try {
          e[o](i, i.exports, t), a = false;
        } finally {
          a && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var a = e2.length; a > 0 && e2[a - 1][2] > i; a--) e2[a] = e2[a - 1];
            e2[a] = [o, n, i];
            return;
          }
          for (var l = 1 / 0, a = 0; a < e2.length; a++) {
            for (var [o, n, i] = e2[a], u = true, f = 0; f < o.length; f++) (false & i || l >= i) && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < l && (l = i));
            if (u) {
              e2.splice(a--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [a, l, u] = o2, f = 0;
          if (a.some((r4) => 0 !== e2[r4])) {
            for (n in l) t.o(l, n) && (t.m[n] = l[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < a.length; f++) i = a[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[550], { 9: (e) => {
      "use strict";
      let t = (e2) => "object" == typeof e2 && null !== e2, r = Symbol("skip"), n = (e2) => t(e2) && !(e2 instanceof RegExp) && !(e2 instanceof Error) && !(e2 instanceof Date), i = (e2, t2, s, a = /* @__PURE__ */ new WeakMap()) => {
        if (s = { deep: false, target: {}, ...s }, a.has(e2)) return a.get(e2);
        a.set(e2, s.target);
        let { target: o } = s;
        delete s.target;
        let l = (e3) => e3.map((e4) => n(e4) ? i(e4, t2, s, a) : e4);
        if (Array.isArray(e2)) return l(e2);
        for (let [c, u] of Object.entries(e2)) {
          let d = t2(c, u, e2);
          if (d === r) continue;
          let [h, p, { shouldRecurse: f = true } = {}] = d;
          "__proto__" !== h && (s.deep && f && n(p) && (p = Array.isArray(p) ? l(p) : i(p, t2, s, a)), o[h] = p);
        }
        return o;
      };
      e.exports = (e2, r2, n2) => {
        if (!t(e2)) throw TypeError(`Expected an object, got \`${e2}\` (${typeof e2})`);
        return i(e2, r2, n2);
      }, e.exports.mapObjectSkip = r;
    }, 16: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => i, h: () => s });
      let n = "DYNAMIC_SERVER_USAGE";
      class i extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = n;
        }
      }
      function s(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === n;
      }
    }, 35: (e, t) => {
      "use strict";
      var r = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray, s = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), u = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.iterator, g = Object.prototype.hasOwnProperty, m = Object.assign;
      function y(e2, t2, r2, n2, i2, a2) {
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== (r2 = a2.ref) ? r2 : null, props: a2 };
      }
      function b(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var v = /\/+/g;
      function _(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function w() {
      }
      function S(e2, t2, r2) {
        if (null == e2) return e2;
        var o2 = [], l2 = 0;
        return !function e3(t3, r3, o3, l3, c2) {
          var u2, d2, h2, g2 = typeof t3;
          ("undefined" === g2 || "boolean" === g2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (g2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case a:
                  m2 = true;
                  break;
                case p:
                  return e3((m2 = t3._init)(t3._payload), r3, o3, l3, c2);
              }
          }
          if (m2) return c2 = c2(t3), m2 = "" === l3 ? "." + _(t3, 0) : l3, i(c2) ? (o3 = "", null != m2 && (o3 = m2.replace(v, "$&/") + "/"), e3(c2, r3, o3, "", function(e4) {
            return e4;
          })) : null != c2 && (b(c2) && (u2 = c2, d2 = o3 + (null == c2.key || t3 && t3.key === c2.key ? "" : ("" + c2.key).replace(v, "$&/") + "/") + m2, c2 = y(u2.type, d2, void 0, void 0, void 0, u2.props)), r3.push(c2)), 1;
          m2 = 0;
          var S2 = "" === l3 ? "." : l3 + ":";
          if (i(t3)) for (var E2 = 0; E2 < t3.length; E2++) g2 = S2 + _(l3 = t3[E2], E2), m2 += e3(l3, r3, o3, g2, c2);
          else if ("function" == typeof (E2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = f && h2[f] || h2["@@iterator"]) ? h2 : null)) for (t3 = E2.call(t3), E2 = 0; !(l3 = t3.next()).done; ) g2 = S2 + _(l3 = l3.value, E2++), m2 += e3(l3, r3, o3, g2, c2);
          else if ("object" === g2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(w, w) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, o3, l3, c2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, o2, "", "", function(e3) {
          return t2.call(r2, e3, l2++);
        }), o2;
      }
      function E(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function k() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      t.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!b(e2)) throw Error(n(143));
        return e2;
      } }, t.Fragment = o, t.Profiler = c, t.StrictMode = l, t.Suspense = d, t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, t.cache = function(e2) {
        return function() {
          var t2 = r.A;
          if (!t2) return e2.apply(null, arguments);
          var n2 = t2.getCacheForType(k);
          void 0 === (t2 = n2.get(e2)) && (t2 = T(), n2.set(e2, t2)), n2 = 0;
          for (var i2 = arguments.length; n2 < i2; n2++) {
            var s2 = arguments[n2];
            if ("function" == typeof s2 || "object" == typeof s2 && null !== s2) {
              var a2 = t2.o;
              null === a2 && (t2.o = a2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = a2.get(s2)) && (t2 = T(), a2.set(s2, t2));
            } else null === (a2 = t2.p) && (t2.p = a2 = /* @__PURE__ */ new Map()), void 0 === (t2 = a2.get(s2)) && (t2 = T(), a2.set(s2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var o2 = e2.apply(null, arguments);
            return (n2 = t2).s = 1, n2.v = o2;
          } catch (e3) {
            throw (o2 = t2).s = 2, o2.v = e3, e3;
          }
        };
      }, t.captureOwnerStack = function() {
        return null;
      }, t.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var i2 = m({}, e2.props), s2 = e2.key, a2 = void 0;
        if (null != t2) for (o2 in void 0 !== t2.ref && (a2 = void 0), void 0 !== t2.key && (s2 = "" + t2.key), t2) g.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (i2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var l2 = Array(o2), c2 = 0; c2 < o2; c2++) l2[c2] = arguments[c2 + 2];
          i2.children = l2;
        }
        return y(e2.type, s2, void 0, void 0, a2, i2);
      }, t.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, s2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (s2 = "" + t2.key), t2) g.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var a2 = arguments.length - 2;
        if (1 === a2) i2.children = r2;
        else if (1 < a2) {
          for (var o2 = Array(a2), l2 = 0; l2 < a2; l2++) o2[l2] = arguments[l2 + 2];
          i2.children = o2;
        }
        if (e2 && e2.defaultProps) for (n2 in a2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = a2[n2]);
        return y(e2, s2, void 0, void 0, null, i2);
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: u, render: e2 };
      }, t.isValidElement = b, t.lazy = function(e2) {
        return { $$typeof: p, _payload: { _status: -1, _result: e2 }, _init: E };
      }, t.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.use = function(e2) {
        return r.H.use(e2);
      }, t.useCallback = function(e2, t2) {
        return r.H.useCallback(e2, t2);
      }, t.useDebugValue = function() {
      }, t.useId = function() {
        return r.H.useId();
      }, t.useMemo = function(e2, t2) {
        return r.H.useMemo(e2, t2);
      }, t.version = "19.2.0-canary-3fbfb9ba-20250409";
    }, 58: (e, t, r) => {
      "use strict";
      r.d(t, { xl: () => a });
      let n = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let s = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return s ? new s() : new i();
      }
    }, 74: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { snakeCase: () => l });
      var n = function() {
        return (n = Object.assign || function(e2) {
          for (var t2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var i2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, i2) && (e2[i2] = t2[i2]);
          return e2;
        }).apply(this, arguments);
      };
      Object.create;
      function i(e2) {
        return e2.toLowerCase();
      }
      Object.create, "function" == typeof SuppressedError && SuppressedError;
      var s = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], a = /[^A-Z0-9]+/gi;
      function o(e2, t2, r2) {
        return t2 instanceof RegExp ? e2.replace(t2, r2) : t2.reduce(function(e3, t3) {
          return e3.replace(t3, r2);
        }, e2);
      }
      function l(e2, t2) {
        var r2;
        return void 0 === t2 && (t2 = {}), void 0 === (r2 = n({ delimiter: "_" }, t2)) && (r2 = {}), function(e3, t3) {
          void 0 === t3 && (t3 = {});
          for (var r3 = t3.splitRegexp, n2 = t3.stripRegexp, l2 = t3.transform, c = t3.delimiter, u = o(o(e3, void 0 === r3 ? s : r3, "$1\0$2"), void 0 === n2 ? a : n2, "\0"), d = 0, h = u.length; "\0" === u.charAt(d); ) d++;
          for (; "\0" === u.charAt(h - 1); ) h--;
          return u.slice(d, h).split("\0").map(void 0 === l2 ? i : l2).join(void 0 === c ? " " : c);
        }(e2, n({ delimiter: "." }, r2));
      }
    }, 115: (e, t, r) => {
      "use strict";
      r.d(t, { XN: () => i, FP: () => n });
      let n = (0, r(58).xl)();
      function i(e2) {
        let t2 = n.getStore();
        switch (!t2 && function(e3) {
          throw Object.defineProperty(Error(`\`${e3}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
        }(e2), t2.type) {
          case "request":
          default:
            return t2;
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", { value: "E401", enumerable: false, configurable: true });
          case "cache":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E37", enumerable: false, configurable: true });
          case "unstable-cache":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E69", enumerable: false, configurable: true });
        }
      }
    }, 159: (e, t, r) => {
      "use strict";
      r.d(t, { RM: () => s, s8: () => i });
      let n = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), i = "NEXT_HTTP_ERROR_FALLBACK";
      function s(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [t2, r2] = e2.digest.split(";");
        return t2 === i && n.has(Number(r2));
      }
    }, 167: (e, t, r) => {
      "use strict";
      r.d(t, { nJ: () => i });
      var n = r(821);
      function i(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, i2] = t2, s = t2.slice(2, -2).join(";"), a = Number(t2.at(-2));
        return "NEXT_REDIRECT" === r2 && ("replace" === i2 || "push" === i2) && "string" == typeof s && !isNaN(a) && a in n.Q;
      }
    }, 183: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => on });
      var i = {};
      async function s() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(i), r.d(i, { config: () => a7, default: () => a9 });
      let a = null;
      async function o() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        a || (a = s());
        let e10 = await a;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function l(...e10) {
        let t10 = await s();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let c = null;
      function u() {
        return c || (c = o()), c;
      }
      function d(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10) return {};
          throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, construct() {
          throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, apply(r10, n10, i10) {
          if ("function" == typeof i10[0]) return i10[0](t10);
          throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), u();
      class h extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class p extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class f extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let g = "_N_T_", m = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function y(e10) {
        var t10, r10, n10, i10, s10, a10 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, s10 = false; l2(); ) if ("," === (r10 = e10.charAt(o2))) {
            for (n10 = o2, o2 += 1, l2(), i10 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (s10 = true, o2 = i10, a10.push(e10.substring(t10, n10)), t10 = o2) : o2 = n10 + 1;
          } else o2 += 1;
          (!s10 || o2 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function b(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...y(i10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i10;
        return t10;
      }
      function v(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...m, GROUP: { builtinReact: [m.reactServerComponents, m.actionBrowser], serverOnly: [m.reactServerComponents, m.actionBrowser, m.instrument, m.middleware], neutralTarget: [m.apiNode, m.apiEdge], clientOnly: [m.serverSideRendering, m.appPagesBrowser], bundled: [m.reactServerComponents, m.actionBrowser, m.serverSideRendering, m.appPagesBrowser, m.shared, m.instrument, m.middleware], appPages: [m.reactServerComponents, m.serverSideRendering, m.appPagesBrowser, m.actionBrowser] } });
      let _ = Symbol("response"), w = Symbol("passThrough"), S = Symbol("waitUntil");
      class E {
        constructor(e10, t10) {
          this[w] = false, this[S] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[_] || (this[_] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[w] = true;
        }
        waitUntil(e10) {
          if ("external" === this[S].kind) return (0, this[S].function)(e10);
          this[S].promises.push(e10);
        }
      }
      class k extends E {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function T(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function x(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function O(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = x(e10);
        return "" + t10 + r10 + n10 + i10;
      }
      function C(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = x(e10);
        return "" + r10 + t10 + n10 + i10;
      }
      function R(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = x(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let P = /* @__PURE__ */ new WeakMap();
      function I(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n10 = P.get(t10);
        n10 || (n10 = t10.map((e11) => e11.toLowerCase()), P.set(t10, n10));
        let i10 = e10.split("/", 2);
        if (!i10[1]) return { pathname: e10 };
        let s10 = i10[1].toLowerCase(), a10 = n10.indexOf(s10);
        return a10 < 0 ? { pathname: e10 } : (r10 = t10[a10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let N = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function A(e10, t10) {
        return new URL(String(e10).replace(N, "localhost"), t10 && String(t10).replace(N, "localhost"));
      }
      let U = Symbol("NextURLInternal");
      class M {
        constructor(e10, t10, r10) {
          let n10, i10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[U] = { url: A(e10, n10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i10;
          let s10 = function(e11, t11) {
            var r11, n11;
            let { basePath: i11, i18n: s11, trailingSlash: a11 } = null != (r11 = t11.nextConfig) ? r11 : {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a11 };
            i11 && R(o3.pathname, i11) && (o3.pathname = function(e12, t12) {
              if (!R(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o3.pathname, i11), o3.basePath = i11);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              o3.buildId = e12[0], l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o3.pathname = l2);
            }
            if (s11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3.pathname) : I(o3.pathname, s11.locales);
              o3.locale = e12.detectedLocale, o3.pathname = null != (n11 = e12.pathname) ? n11 : o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : I(l2, s11.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[U].url.pathname, { nextConfig: this[U].options.nextConfig, parseData: true, i18nProvider: this[U].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[U].url, this[U].options.headers);
          this[U].domainLocale = this[U].options.i18nProvider ? this[U].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) for (let s11 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var n11, i11;
              if (t11 === (null == (n11 = s11.domain) ? void 0 : n11.split(":", 1)[0].toLowerCase()) || r11 === s11.defaultLocale.toLowerCase() || (null == (i11 = s11.locales) ? void 0 : i11.some((e12) => e12.toLowerCase() === r11))) return s11;
            }
          }(null == (t10 = this[U].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let o2 = (null == (r10 = this[U].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[U].options.nextConfig) || null == (n10 = i10.i18n) ? void 0 : n10.defaultLocale);
          this[U].url.pathname = s10.pathname, this[U].defaultLocale = o2, this[U].basePath = s10.basePath ?? "", this[U].buildId = s10.buildId, this[U].locale = s10.locale ?? o2, this[U].trailingSlash = s10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i10 = e11.toLowerCase();
            return !n10 && (R(i10, "/api") || R(i10, "/" + t11.toLowerCase())) ? e11 : O(e11, "/" + t11);
          }((e10 = { basePath: this[U].basePath, buildId: this[U].buildId, defaultLocale: this[U].options.forceLocale ? void 0 : this[U].defaultLocale, locale: this[U].locale, pathname: this[U].url.pathname, trailingSlash: this[U].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = T(t10)), e10.buildId && (t10 = C(O(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = O(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : C(t10, "/") : T(t10);
        }
        formatSearch() {
          return this[U].url.search;
        }
        get buildId() {
          return this[U].buildId;
        }
        set buildId(e10) {
          this[U].buildId = e10;
        }
        get locale() {
          return this[U].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[U].locale || !(null == (r10 = this[U].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[U].locale = e10;
        }
        get defaultLocale() {
          return this[U].defaultLocale;
        }
        get domainLocale() {
          return this[U].domainLocale;
        }
        get searchParams() {
          return this[U].url.searchParams;
        }
        get host() {
          return this[U].url.host;
        }
        set host(e10) {
          this[U].url.host = e10;
        }
        get hostname() {
          return this[U].url.hostname;
        }
        set hostname(e10) {
          this[U].url.hostname = e10;
        }
        get port() {
          return this[U].url.port;
        }
        set port(e10) {
          this[U].url.port = e10;
        }
        get protocol() {
          return this[U].url.protocol;
        }
        set protocol(e10) {
          this[U].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[U].url = A(e10), this.analyze();
        }
        get origin() {
          return this[U].url.origin;
        }
        get pathname() {
          return this[U].url.pathname;
        }
        set pathname(e10) {
          this[U].url.pathname = e10;
        }
        get hash() {
          return this[U].url.hash;
        }
        set hash(e10) {
          this[U].url.hash = e10;
        }
        get search() {
          return this[U].url.search;
        }
        set search(e10) {
          this[U].url.search = e10;
        }
        get password() {
          return this[U].url.password;
        }
        set password(e10) {
          this[U].url.password = e10;
        }
        get username() {
          return this[U].url.username;
        }
        set username(e10) {
          this[U].url.username = e10;
        }
        get basePath() {
          return this[U].basePath;
        }
        set basePath(e10) {
          this[U].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new M(String(this), this[U].options);
        }
      }
      var D = r(725);
      let j = Symbol("internal request");
      class L extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          v(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n10 = new M(r10, { headers: b(this.headers), nextConfig: t10.nextConfig });
          this[j] = { cookies: new D.tm(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[j].cookies;
        }
        get nextUrl() {
          return this[j].nextUrl;
        }
        get page() {
          throw new p();
        }
        get ua() {
          throw new f();
        }
        get url() {
          return this[j].url;
        }
      }
      var q = r(716);
      let B = Symbol("internal response"), H = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function z(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n10, i10] of e10.request.headers) t10.set("x-middleware-request-" + n10, i10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class $ extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, n10 = new Proxy(new D.VO(r10), { get(e11, n11, i10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i11) => {
                  let s10 = Reflect.apply(e11[n11], e11, i11), a10 = new Headers(r10);
                  return s10 instanceof D.VO && r10.set("x-middleware-set-cookie", s10.getAll().map((e12) => (0, D.Ud)(e12)).join(",")), z(t10, a10), s10;
                };
              default:
                return q.l.get(e11, n11, i10);
            }
          } });
          this[B] = { cookies: n10, url: t10.url ? new M(t10.url, { headers: b(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[B].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new $(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!H.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n10 = "object" == typeof t10 ? t10 : {}, i10 = new Headers(null == n10 ? void 0 : n10.headers);
          return i10.set("Location", v(e10)), new $(null, { ...n10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", v(e10)), z(t10, r10), new $(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), z(e10, t10), new $(null, { ...e10, headers: t10 });
        }
      }
      function K(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i10 = n10.origin === r10.origin;
        return { url: i10 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: i10 };
      }
      let J = "Next-Router-Prefetch", W = ["RSC", "Next-Router-State-Tree", J, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], F = "_rsc";
      var V = r(381), G = r(818), X = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(X || {}), Q = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(Q || {}), Y = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(Y || {}), Z = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(Z || {}), ee = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(ee || {}), et = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(et || {}), er = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(er || {}), en = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(en || {}), ei = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(ei || {}), es = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(es || {}), ea = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(ea || {}), eo = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eo || {});
      let el = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ec = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function eu(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: ed, propagation: eh, trace: ep, SpanStatusCode: ef, SpanKind: eg, ROOT_CONTEXT: em } = n = r(956);
      class ey extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eb = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof ey;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: ef.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, ev = /* @__PURE__ */ new Map(), e_ = n.createContextKey("next.rootSpanId"), ew = 0, eS = () => ew++, eE = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      class ek {
        getTracerInstance() {
          return ep.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ed;
        }
        getTracePropagationData() {
          let e10 = ed.active(), t10 = [];
          return eh.inject(e10, t10, eE), t10;
        }
        getActiveScopeSpan() {
          return ep.getSpan(null == ed ? void 0 : ed.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = ed.active();
          if (ep.getSpanContext(n10)) return t10();
          let i10 = eh.extract(n10, e10, r10);
          return ed.with(i10, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, n10, i10] = e10, { fn: s10, options: a10 } = "function" == typeof n10 ? { fn: n10, options: {} } : { fn: i10, options: { ...n10 } }, o2 = a10.spanName ?? r10;
          if (!el.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return s10();
          let l2 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan()), c2 = false;
          l2 ? (null == (t10 = ep.getSpanContext(l2)) ? void 0 : t10.isRemote) && (c2 = true) : (l2 = (null == ed ? void 0 : ed.active()) ?? em, c2 = true);
          let u2 = eS();
          return a10.attributes = { "next.span_name": o2, "next.span_type": r10, ...a10.attributes }, ed.with(l2.setValue(e_, u2), () => this.getTracerInstance().startActiveSpan(o2, a10, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, n11 = () => {
              ev.delete(u2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ec.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            c2 && ev.set(u2, new Map(Object.entries(a10.attributes ?? {})));
            try {
              if (s10.length > 1) return s10(e11, (t13) => eb(e11, t13));
              let t12 = s10(e11);
              if (eu(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw eb(e11, t13), t13;
              }).finally(n11);
              return e11.end(), n11(), t12;
            } catch (t12) {
              throw eb(e11, t12), n11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return el.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i10 && (e11 = e11.apply(this, arguments));
            let s10 = arguments.length - 1, a10 = arguments[s10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(ed.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[s10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? ep.setSpan(ed.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ed.active().getValue(e_);
          return ev.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = ed.active().getValue(e_), n10 = ev.get(r10);
          n10 && n10.set(e10, t10);
        }
      }
      let eT = (() => {
        let e10 = new ek();
        return () => e10;
      })(), ex = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(ex);
      class eO {
        constructor(e10, t10, r10, n10) {
          var i10;
          let s10 = e10 && function(e11, t11) {
            let r11 = V.o.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (i10 = r10.get(ex)) ? void 0 : i10.value;
          this._isEnabled = !!(!s10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: ex, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: ex, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eC(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of y(r10)) n10.append("set-cookie", e11);
          for (let e11 of new D.VO(n10).getAll()) t10.set(e11);
        }
      }
      var eR = r(115), eP = r(802), eI = r.n(eP);
      class eN extends Error {
        constructor(e10, t10) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t10), this.name = "InvariantError";
        }
      }
      var eA = r(535);
      class eU {
        constructor(e10, t10) {
          this.cache = /* @__PURE__ */ new Map(), this.sizes = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10 || (() => 1);
        }
        set(e10, t10) {
          if (!e10 || !t10) return;
          let r10 = this.calculateSize(t10);
          if (r10 > this.maxSize) return void console.warn("Single item size exceeds maxSize");
          this.cache.has(e10) && (this.totalSize -= this.sizes.get(e10) || 0), this.cache.set(e10, t10), this.sizes.set(e10, r10), this.totalSize += r10, this.touch(e10);
        }
        has(e10) {
          return !!e10 && (this.touch(e10), !!this.cache.get(e10));
        }
        get(e10) {
          if (!e10) return;
          let t10 = this.cache.get(e10);
          if (void 0 !== t10) return this.touch(e10), t10;
        }
        touch(e10) {
          let t10 = this.cache.get(e10);
          void 0 !== t10 && (this.cache.delete(e10), this.cache.set(e10, t10), this.evictIfNecessary());
        }
        evictIfNecessary() {
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) this.evictLeastRecentlyUsed();
        }
        evictLeastRecentlyUsed() {
          let e10 = this.cache.keys().next().value;
          if (void 0 !== e10) {
            let t10 = this.sizes.get(e10) || 0;
            this.totalSize -= t10, this.cache.delete(e10), this.sizes.delete(e10);
          }
        }
        reset() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        keys() {
          return [...this.cache.keys()];
        }
        remove(e10) {
          this.cache.has(e10) && (this.totalSize -= this.sizes.get(e10) || 0, this.cache.delete(e10), this.sizes.delete(e10));
        }
        clear() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      r(356).Buffer, new eU(52428800, (e10) => e10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eM = Symbol.for("@next/cache-handlers-map"), eD = Symbol.for("@next/cache-handlers-set"), ej = globalThis;
      function eL() {
        if (ej[eM]) return ej[eM].entries();
      }
      async function eq(e10, t10) {
        if (!e10) return t10();
        let r10 = eB(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r11 = new Set(e11.pendingRevalidatedTags), n10 = new Set(e11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: t12.pendingRevalidatedTags.filter((e12) => !r11.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !n10.has(e12)) };
          }(r10, eB(e10));
          await ez(e10, t11);
        }
      }
      function eB(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eH(e10, t10) {
        if (0 === e10.length) return;
        let r10 = [];
        t10 && r10.push(t10.revalidateTag(e10));
        let n10 = function() {
          if (ej[eD]) return ej[eD].values();
        }();
        if (n10) for (let t11 of n10) r10.push(t11.expireTags(...e10));
        await Promise.all(r10);
      }
      async function ez(e10, t10) {
        let r10 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], n10 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, i10 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([eH(r10, e10.incrementalCache), ...Object.values(n10), ...i10]);
      }
      var e$ = r(620), eK = r(427);
      class eJ {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new (eI())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eu(e10)) this.waitUntil || eW(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || eW();
          let t10 = eR.FP.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = eK.Z.getStore(), n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (0, e$.cg)(async () => {
            try {
              await eK.Z.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eA.J.getStore();
          if (!e10) throw Object.defineProperty(new eN("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eq(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eN("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function eW() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function eF(e10) {
        let t10, r10 = { then: (n10, i10) => (t10 || (t10 = e10()), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, i10)) };
        return r10;
      }
      class eV {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function eG() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let eX = Symbol.for("@next/request-context"), eQ = (e10) => {
        let t10 = ["/layout"];
        if (e10.startsWith("/")) {
          let r10 = e10.split("/");
          for (let e11 = 1; e11 < r10.length + 1; e11++) {
            let n10 = r10.slice(0, e11).join("/");
            n10 && (n10.endsWith("/page") || n10.endsWith("/route") || (n10 = `${n10}${!n10.endsWith("/") ? "/" : ""}layout`), t10.push(n10));
          }
        }
        return t10;
      };
      async function eY(e10, t10, r10) {
        let n10 = [], i10 = r10 && r10.size > 0;
        for (let t11 of eQ(e10)) t11 = `${g}${t11}`, n10.push(t11);
        if (t10.pathname && !i10) {
          let e11 = `${g}${t10.pathname}`;
          n10.push(e11);
        }
        return { tags: n10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = eL();
          if (r11) for (let [n11, i11] of r11) "getExpiration" in i11 && t11.set(n11, eF(async () => i11.getExpiration(...e11)));
          return t11;
        }(n10) };
      }
      class eZ extends L {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let e0 = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, e1 = (e10, t10) => eT().withPropagatedContext(e10.headers, t10, e0), e2 = false;
      async function e5(e10) {
        var t10;
        let n10, i10;
        if (!e2 && (e2 = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(905);
          e11(), e1 = t11(e1);
        }
        await u();
        let s10 = void 0 !== globalThis.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let a10 = new M(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...a10.searchParams.keys()]) {
          let t11 = a10.searchParams.getAll(e11), r10 = function(e12) {
            for (let t12 of ["nxtP", "nxtI"]) if (e12 !== t12 && e12.startsWith(t12)) return e12.substring(t12.length);
            return null;
          }(e11);
          if (r10) {
            for (let e12 of (a10.searchParams.delete(r10), t11)) a10.searchParams.append(r10, e12);
            a10.searchParams.delete(e11);
          }
        }
        let o2 = a10.buildId;
        a10.buildId = "";
        let l2 = function(e11) {
          let t11 = new Headers();
          for (let [r10, n11] of Object.entries(e11)) for (let e12 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), c2 = l2.has("x-nextjs-data"), d2 = "1" === l2.get("RSC");
        c2 && "/index" === a10.pathname && (a10.pathname = "/");
        let h2 = /* @__PURE__ */ new Map();
        if (!s10) for (let e11 of W) {
          let t11 = e11.toLowerCase(), r10 = l2.get(t11);
          null !== r10 && (h2.set(t11, r10), l2.delete(t11));
        }
        let p2 = new eZ({ page: e10.page, input: function(e11) {
          let t11 = "string" == typeof e11, r10 = t11 ? new URL(e11) : e11;
          return r10.searchParams.delete(F), t11 ? r10.toString() : r10;
        }(a10).toString(), init: { body: e10.request.body, headers: l2, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        c2 && Object.defineProperty(p2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eG() }) }));
        let f2 = e10.request.waitUntil ?? (null == (t10 = function() {
          let e11 = globalThis[eX];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t10.waitUntil), g2 = new k({ request: p2, page: e10.page, context: f2 ? { waitUntil: f2 } : void 0 });
        if ((n10 = await e1(p2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t11 = g2.waitUntil.bind(g2), r10 = new eV();
            return eT().trace(eo.execute, { spanName: `middleware ${p2.method} ${p2.nextUrl.pathname}`, attributes: { "http.target": p2.nextUrl.pathname, "http.method": p2.method } }, async () => {
              try {
                var n11, s11, a11, l3, c3, u2;
                let d3 = eG(), h3 = await eY("/", p2.nextUrl, null), f3 = (c3 = p2.nextUrl, u2 = (e11) => {
                  i10 = e11;
                }, function(e11, t12, r11, n12, i11, s12, a12, o3, l4, c4, u3) {
                  function d4(e12) {
                    r11 && r11.setHeader("Set-Cookie", e12);
                  }
                  let h4 = {};
                  return { type: "request", phase: e11, implicitTags: s12, url: { pathname: n12.pathname, search: n12.search ?? "" }, rootParams: i11, get headers() {
                    return h4.headers || (h4.headers = function(e12) {
                      let t13 = V.o.from(e12);
                      for (let e13 of W) t13.delete(e13.toLowerCase());
                      return V.o.seal(t13);
                    }(t12.headers)), h4.headers;
                  }, get cookies() {
                    if (!h4.cookies) {
                      let e12 = new D.tm(V.o.from(t12.headers));
                      eC(t12, e12), h4.cookies = G.Ck.seal(e12);
                    }
                    return h4.cookies;
                  }, set cookies(value) {
                    h4.cookies = value;
                  }, get mutableCookies() {
                    if (!h4.mutableCookies) {
                      let e12 = function(e13, t13) {
                        let r12 = new D.tm(V.o.from(e13));
                        return G.K8.wrap(r12, t13);
                      }(t12.headers, a12 || (r11 ? d4 : void 0));
                      eC(t12, e12), h4.mutableCookies = e12;
                    }
                    return h4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return h4.userspaceMutableCookies || (h4.userspaceMutableCookies = (0, G.hm)(this.mutableCookies)), h4.userspaceMutableCookies;
                  }, get draftMode() {
                    return h4.draftMode || (h4.draftMode = new eO(l4, t12, this.cookies, this.mutableCookies)), h4.draftMode;
                  }, renderResumeDataCache: o3 ?? null, isHmrRefresh: c4, serverComponentsHmrCache: u3 || globalThis.__serverComponentsHmrCache };
                }("action", p2, void 0, c3, {}, h3, u2, void 0, d3, false, void 0)), m3 = function({ page: e11, fallbackRouteParams: t12, renderOpts: r11, requestEndedState: n12, isPrefetchRequest: i11, buildId: s12, previouslyRevalidatedTags: a12 }) {
                  var o3;
                  let l4 = { isStaticGeneration: !r11.shouldWaitOnAllReady && !r11.supportsDynamicResponse && !r11.isDraftMode && !r11.isPossibleServerAction, page: e11, fallbackRouteParams: t12, route: (o3 = e11.split("/").reduce((e12, t13, r12, n13) => t13 ? "(" === t13[0] && t13.endsWith(")") || "@" === t13[0] || ("page" === t13 || "route" === t13) && r12 === n13.length - 1 ? e12 : e12 + "/" + t13 : e12, "")).startsWith("/") ? o3 : "/" + o3, incrementalCache: r11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r11.cacheLifeProfiles, isRevalidate: r11.isRevalidate, isPrerendering: r11.nextExport, fetchCache: r11.fetchCache, isOnDemandRevalidate: r11.isOnDemandRevalidate, isDraftMode: r11.isDraftMode, requestEndedState: n12, isPrefetchRequest: i11, buildId: s12, reactLoadableManifest: (null == r11 ? void 0 : r11.reactLoadableManifest) || {}, assetPrefix: (null == r11 ? void 0 : r11.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t13, onClose: r12, onAfterTaskError: n13 } = e12;
                    return new eJ({ waitUntil: t13, onClose: r12, onTaskError: n13 });
                  }(r11), dynamicIOEnabled: r11.experimental.dynamicIO, dev: r11.dev ?? false, previouslyRevalidatedTags: a12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t13 = eL();
                    if (t13) for (let [r12, n13] of t13) "refreshTags" in n13 && e12.set(r12, eF(async () => n13.refreshTags()));
                    return e12;
                  }() };
                  return r11.store = l4, l4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (s11 = e10.request.nextConfig) || null == (n11 = s11.experimental) ? void 0 : n11.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (l3 = e10.request.nextConfig) || null == (a11 = l3.experimental) ? void 0 : a11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: t11, onClose: r10.onClose.bind(r10), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: p2.headers.has(J), buildId: o2 ?? "", previouslyRevalidatedTags: [] });
                return await eA.J.run(m3, () => eR.FP.run(f3, e10.handler, p2, g2));
              } finally {
                setTimeout(() => {
                  r10.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(p2, g2);
        })) && !(n10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        n10 && i10 && n10.headers.set("set-cookie", i10);
        let m2 = null == n10 ? void 0 : n10.headers.get("x-middleware-rewrite");
        if (n10 && m2 && (d2 || !s10)) {
          let t11 = new M(m2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          s10 || t11.host !== p2.nextUrl.host || (t11.buildId = o2 || t11.buildId, n10.headers.set("x-middleware-rewrite", String(t11)));
          let { url: r10, isRelative: i11 } = K(t11.toString(), a10.toString());
          !s10 && c2 && n10.headers.set("x-nextjs-rewrite", r10), d2 && i11 && (a10.pathname !== t11.pathname && n10.headers.set("x-nextjs-rewritten-path", t11.pathname), a10.search !== t11.search && n10.headers.set("x-nextjs-rewritten-query", t11.search.slice(1)));
        }
        let y2 = null == n10 ? void 0 : n10.headers.get("Location");
        if (n10 && y2 && !s10) {
          let t11 = new M(y2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          n10 = new Response(n10.body, n10), t11.host === a10.host && (t11.buildId = o2 || t11.buildId, n10.headers.set("Location", t11.toString())), c2 && (n10.headers.delete("Location"), n10.headers.set("x-nextjs-redirect", K(t11.toString(), a10.toString()).url));
        }
        let b2 = n10 || $.next(), v2 = b2.headers.get("x-middleware-override-headers"), _2 = [];
        if (v2) {
          for (let [e11, t11] of h2) b2.headers.set(`x-middleware-request-${e11}`, t11), _2.push(e11);
          _2.length > 0 && b2.headers.set("x-middleware-override-headers", v2 + "," + _2.join(","));
        }
        return { response: b2, waitUntil: ("internal" === g2[S].kind ? Promise.all(g2[S].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: p2.fetchMetrics };
      }
      function e4(e10) {
        return e10.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function e3(e10) {
        return e10 && e10.sensitive ? "" : "i";
      }
      function e6(e10, t10, r10) {
        var n10;
        return e10 instanceof RegExp ? function(e11, t11) {
          if (!t11) return e11;
          for (var r11 = /\((?:\?<(.*?)>)?(?!\?)/g, n11 = 0, i10 = r11.exec(e11.source); i10; ) t11.push({ name: i10[1] || n11++, prefix: "", suffix: "", modifier: "", pattern: "" }), i10 = r11.exec(e11.source);
          return e11;
        }(e10, t10) : Array.isArray(e10) ? (n10 = e10.map(function(e11) {
          return e6(e11, t10, r10).source;
        }), new RegExp("(?:".concat(n10.join("|"), ")"), e3(r10))) : function(e11, t11, r11) {
          void 0 === r11 && (r11 = {});
          for (var n11 = r11.strict, i10 = void 0 !== n11 && n11, s10 = r11.start, a10 = r11.end, o2 = r11.encode, l2 = void 0 === o2 ? function(e12) {
            return e12;
          } : o2, c2 = r11.delimiter, u2 = r11.endsWith, d2 = "[".concat(e4(void 0 === u2 ? "" : u2), "]|$"), h2 = "[".concat(e4(void 0 === c2 ? "/#?" : c2), "]"), p2 = void 0 === s10 || s10 ? "^" : "", f2 = 0; f2 < e11.length; f2++) {
            var g2 = e11[f2];
            if ("string" == typeof g2) p2 += e4(l2(g2));
            else {
              var m2 = e4(l2(g2.prefix)), y2 = e4(l2(g2.suffix));
              if (g2.pattern) if (t11 && t11.push(g2), m2 || y2) if ("+" === g2.modifier || "*" === g2.modifier) {
                var b2 = "*" === g2.modifier ? "?" : "";
                p2 += "(?:".concat(m2, "((?:").concat(g2.pattern, ")(?:").concat(y2).concat(m2, "(?:").concat(g2.pattern, "))*)").concat(y2, ")").concat(b2);
              } else p2 += "(?:".concat(m2, "(").concat(g2.pattern, ")").concat(y2, ")").concat(g2.modifier);
              else {
                if ("+" === g2.modifier || "*" === g2.modifier) throw TypeError('Can not repeat "'.concat(g2.name, '" without a prefix and suffix'));
                p2 += "(".concat(g2.pattern, ")").concat(g2.modifier);
              }
              else p2 += "(?:".concat(m2).concat(y2, ")").concat(g2.modifier);
            }
          }
          if (void 0 === a10 || a10) i10 || (p2 += "".concat(h2, "?")), p2 += r11.endsWith ? "(?=".concat(d2, ")") : "$";
          else {
            var v2 = e11[e11.length - 1], _2 = "string" == typeof v2 ? h2.indexOf(v2[v2.length - 1]) > -1 : void 0 === v2;
            i10 || (p2 += "(?:".concat(h2, "(?=").concat(d2, "))?")), _2 || (p2 += "(?=".concat(h2, "|").concat(d2, ")"));
          }
          return new RegExp(p2, e3(r11));
        }(function(e11, t11) {
          void 0 === t11 && (t11 = {});
          for (var r11 = function(e12) {
            for (var t12 = [], r12 = 0; r12 < e12.length; ) {
              var n12 = e12[r12];
              if ("*" === n12 || "+" === n12 || "?" === n12) {
                t12.push({ type: "MODIFIER", index: r12, value: e12[r12++] });
                continue;
              }
              if ("\\" === n12) {
                t12.push({ type: "ESCAPED_CHAR", index: r12++, value: e12[r12++] });
                continue;
              }
              if ("{" === n12) {
                t12.push({ type: "OPEN", index: r12, value: e12[r12++] });
                continue;
              }
              if ("}" === n12) {
                t12.push({ type: "CLOSE", index: r12, value: e12[r12++] });
                continue;
              }
              if (":" === n12) {
                for (var i11 = "", s11 = r12 + 1; s11 < e12.length; ) {
                  var a11 = e12.charCodeAt(s11);
                  if (a11 >= 48 && a11 <= 57 || a11 >= 65 && a11 <= 90 || a11 >= 97 && a11 <= 122 || 95 === a11) {
                    i11 += e12[s11++];
                    continue;
                  }
                  break;
                }
                if (!i11) throw TypeError("Missing parameter name at ".concat(r12));
                t12.push({ type: "NAME", index: r12, value: i11 }), r12 = s11;
                continue;
              }
              if ("(" === n12) {
                var o3 = 1, l3 = "", s11 = r12 + 1;
                if ("?" === e12[s11]) throw TypeError('Pattern cannot start with "?" at '.concat(s11));
                for (; s11 < e12.length; ) {
                  if ("\\" === e12[s11]) {
                    l3 += e12[s11++] + e12[s11++];
                    continue;
                  }
                  if (")" === e12[s11]) {
                    if (0 == --o3) {
                      s11++;
                      break;
                    }
                  } else if ("(" === e12[s11] && (o3++, "?" !== e12[s11 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(s11));
                  l3 += e12[s11++];
                }
                if (o3) throw TypeError("Unbalanced pattern at ".concat(r12));
                if (!l3) throw TypeError("Missing pattern at ".concat(r12));
                t12.push({ type: "PATTERN", index: r12, value: l3 }), r12 = s11;
                continue;
              }
              t12.push({ type: "CHAR", index: r12, value: e12[r12++] });
            }
            return t12.push({ type: "END", index: r12, value: "" }), t12;
          }(e11), n11 = t11.prefixes, i10 = void 0 === n11 ? "./" : n11, s10 = t11.delimiter, a10 = void 0 === s10 ? "/#?" : s10, o2 = [], l2 = 0, c2 = 0, u2 = "", d2 = function(e12) {
            if (c2 < r11.length && r11[c2].type === e12) return r11[c2++].value;
          }, h2 = function(e12) {
            var t12 = d2(e12);
            if (void 0 !== t12) return t12;
            var n12 = r11[c2], i11 = n12.type, s11 = n12.index;
            throw TypeError("Unexpected ".concat(i11, " at ").concat(s11, ", expected ").concat(e12));
          }, p2 = function() {
            for (var e12, t12 = ""; e12 = d2("CHAR") || d2("ESCAPED_CHAR"); ) t12 += e12;
            return t12;
          }, f2 = function(e12) {
            for (var t12 = 0; t12 < a10.length; t12++) {
              var r12 = a10[t12];
              if (e12.indexOf(r12) > -1) return true;
            }
            return false;
          }, g2 = function(e12) {
            var t12 = o2[o2.length - 1], r12 = e12 || (t12 && "string" == typeof t12 ? t12 : "");
            if (t12 && !r12) throw TypeError('Must have text between two parameters, missing text after "'.concat(t12.name, '"'));
            return !r12 || f2(r12) ? "[^".concat(e4(a10), "]+?") : "(?:(?!".concat(e4(r12), ")[^").concat(e4(a10), "])+?");
          }; c2 < r11.length; ) {
            var m2 = d2("CHAR"), y2 = d2("NAME"), b2 = d2("PATTERN");
            if (y2 || b2) {
              var v2 = m2 || "";
              -1 === i10.indexOf(v2) && (u2 += v2, v2 = ""), u2 && (o2.push(u2), u2 = ""), o2.push({ name: y2 || l2++, prefix: v2, suffix: "", pattern: b2 || g2(v2), modifier: d2("MODIFIER") || "" });
              continue;
            }
            var _2 = m2 || d2("ESCAPED_CHAR");
            if (_2) {
              u2 += _2;
              continue;
            }
            if (u2 && (o2.push(u2), u2 = ""), d2("OPEN")) {
              var v2 = p2(), w2 = d2("NAME") || "", S2 = d2("PATTERN") || "", E2 = p2();
              h2("CLOSE"), o2.push({ name: w2 || (S2 ? l2++ : ""), pattern: w2 && !S2 ? g2(v2) : S2, prefix: v2, suffix: E2, modifier: d2("MODIFIER") || "" });
              continue;
            }
            h2("END");
          }
          return o2;
        }(e10, r10), t10, r10);
      }
      var e8 = (e10) => {
        try {
          return e6(e10);
        } catch (t10) {
          throw Error(`Invalid path: ${e10}.
Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${t10.message}`);
        }
      }, e9 = (e10) => e10.map((e11) => e11 instanceof RegExp ? e11 : e8(e11)), e7 = (e10) => {
        let t10 = e9([e10 || ""].flat().filter(Boolean));
        return (e11) => t10.some((t11) => t11.test(e11));
      }, te = Object.defineProperty, tt = Object.getOwnPropertyDescriptor, tr = Object.getOwnPropertyNames, tn = Object.prototype.hasOwnProperty, ti = (e10) => {
        throw TypeError(e10);
      }, ts = (e10, t10, r10) => t10.has(e10) || ti("Cannot " + r10), ta = (e10, t10, r10) => (ts(e10, t10, "read from private field"), r10 ? r10.call(e10) : t10.get(e10)), to = (e10, t10, r10) => t10.has(e10) ? ti("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10), tl = (e10, t10, r10, n10) => (ts(e10, t10, "write to private field"), n10 ? n10.call(e10, r10) : t10.set(e10, r10), r10), tc = (e10, t10, r10) => (ts(e10, t10, "access private method"), r10), tu = { initialDelay: 125, maxDelayBetweenRetries: 0, factor: 2, shouldRetry: (e10, t10) => t10 < 5, retryImmediately: false, jitter: true }, td = async (e10) => new Promise((t10) => setTimeout(t10, e10)), th = (e10, t10) => t10 ? e10 * (1 + Math.random()) : e10, tp = (e10) => {
        let t10 = 0, r10 = () => {
          let r11 = e10.initialDelay * Math.pow(e10.factor, t10);
          return r11 = th(r11, e10.jitter), Math.min(e10.maxDelayBetweenRetries || r11, r11);
        };
        return async () => {
          await td(r10()), t10++;
        };
      }, tf = async (e10, t10 = {}) => {
        let r10 = 0, { shouldRetry: n10, initialDelay: i10, maxDelayBetweenRetries: s10, factor: a10, retryImmediately: o2, jitter: l2 } = { ...tu, ...t10 }, c2 = tp({ initialDelay: i10, maxDelayBetweenRetries: s10, factor: a10, jitter: l2 });
        for (; ; ) try {
          return await e10();
        } catch (e11) {
          if (!n10(e11, ++r10)) throw e11;
          o2 && 1 === r10 ? await td(th(100, l2)) : await c2();
        }
      }, tg = (e10) => "undefined" != typeof atob && "function" == typeof atob ? atob(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10, "base64").toString() : e10, tm = (e10) => "undefined" != typeof btoa && "function" == typeof btoa ? btoa(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10).toString("base64") : e10, ty = [".lcl.dev", ".lclstage.dev", ".lclclerk.com"], tb = [".lcl.dev", ".stg.dev", ".lclstage.dev", ".stgstage.dev", ".dev.lclclerk.com", ".stg.lclclerk.com", ".accounts.lclclerk.com", "accountsstage.dev", "accounts.dev"], tv = [".lcl.dev", "lclstage.dev", ".lclclerk.com", ".accounts.lclclerk.com"], t_ = [".accountsstage.dev"], tw = "https://api.clerk.com", tS = "pk_live_";
      function tE(e10, t10 = {}) {
        if (!(e10 = e10 || "") || !tk(e10)) {
          if (t10.fatal && !e10) throw Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
          if (t10.fatal && !tk(e10)) throw Error("Publishable key not valid.");
          return null;
        }
        let r10 = e10.startsWith(tS) ? "production" : "development", n10 = tg(e10.split("_")[2]);
        return n10 = n10.slice(0, -1), t10.proxyUrl ? n10 = t10.proxyUrl : "development" !== r10 && t10.domain && (n10 = `clerk.${t10.domain}`), { instanceType: r10, frontendApi: n10 };
      }
      function tk(e10 = "") {
        try {
          let t10 = e10.startsWith(tS) || e10.startsWith("pk_test_"), r10 = tg(e10.split("_")[2] || "").endsWith("$");
          return t10 && r10;
        } catch {
          return false;
        }
      }
      function tT(e10) {
        return e10.startsWith("test_") || e10.startsWith("sk_test_");
      }
      async function tx(e10, t10 = globalThis.crypto.subtle) {
        let r10 = new TextEncoder().encode(e10);
        return tm(String.fromCharCode(...new Uint8Array(await t10.digest("sha-1", r10)))).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
      }
      var tO = (e10, t10) => `${e10}_${t10}`, tC = () => false, tR = () => {
        try {
          return true;
        } catch {
        }
        return false;
      }, tP = /* @__PURE__ */ new Set(), tI = (e10, t10, r10) => {
        let n10 = tC() || tR(), i10 = r10 ?? e10;
        tP.has(i10) || n10 || (tP.add(i10), console.warn(`Clerk - DEPRECATION WARNING: "${e10}" is deprecated and will be removed in the next major release.
${t10}`));
      };
      function tN(e10) {
        return { code: e10.code, message: e10.message, longMessage: e10.long_message, meta: { paramName: e10?.meta?.param_name, sessionId: e10?.meta?.session_id, emailAddresses: e10?.meta?.email_addresses, identifiers: e10?.meta?.identifiers, zxcvbn: e10?.meta?.zxcvbn } };
      }
      var tA = class e10 extends Error {
        constructor(t10, { data: r10, status: n10, clerkTraceId: i10, retryAfter: s10 }) {
          super(t10), this.toString = () => {
            let e11 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e12) => JSON.stringify(e12))}`;
            return this.clerkTraceId && (e11 += `
Clerk Trace ID: ${this.clerkTraceId}`), e11;
          }, Object.setPrototypeOf(this, e10.prototype), this.status = n10, this.message = t10, this.clerkTraceId = i10, this.retryAfter = s10, this.clerkError = true, this.errors = function(e11 = []) {
            return e11.length > 0 ? e11.map(tN) : [];
          }(r10);
        }
      }, tU = Object.freeze({ InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})", InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})", MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider" });
      function tM({ packageName: e10, customMessages: t10 }) {
        let r10 = e10, n10 = { ...tU, ...t10 };
        function i10(e11, t11) {
          if (!t11) return `${r10}: ${e11}`;
          let n11 = e11;
          for (let r11 of e11.matchAll(/{{([a-zA-Z0-9-_]+)}}/g)) {
            let e12 = (t11[r11[1]] || "").toString();
            n11 = n11.replace(`{{${r11[1]}}}`, e12);
          }
          return `${r10}: ${n11}`;
        }
        return { setPackageName({ packageName: e11 }) {
          return "string" == typeof e11 && (r10 = e11), this;
        }, setMessages({ customMessages: e11 }) {
          return Object.assign(n10, e11 || {}), this;
        }, throwInvalidPublishableKeyError(e11) {
          throw Error(i10(n10.InvalidPublishableKeyErrorMessage, e11));
        }, throwInvalidProxyUrl(e11) {
          throw Error(i10(n10.InvalidProxyUrlErrorMessage, e11));
        }, throwMissingPublishableKeyError() {
          throw Error(i10(n10.MissingPublishableKeyErrorMessage));
        }, throwMissingSecretKeyError() {
          throw Error(i10(n10.MissingSecretKeyErrorMessage));
        }, throwMissingClerkProviderError(e11) {
          throw Error(i10(n10.MissingClerkProvider, e11));
        }, throw(e11) {
          throw Error(i10(e11));
        } };
      }
      var tD = tM({ packageName: "@clerk/backend" }), { isDevOrStagingUrl: tj } = /* @__PURE__ */ function() {
        let e10 = /* @__PURE__ */ new Map();
        return { isDevOrStagingUrl: (t10) => {
          if (!t10) return false;
          let r10 = "string" == typeof t10 ? t10 : t10.hostname, n10 = e10.get(r10);
          return void 0 === n10 && (n10 = tb.some((e11) => r10.endsWith(e11)), e10.set(r10, n10)), n10;
        } };
      }(), tL = { InvalidSecretKey: "clerk_key_invalid" }, tq = { TokenExpired: "token-expired", TokenInvalid: "token-invalid", TokenInvalidAlgorithm: "token-invalid-algorithm", TokenInvalidAuthorizedParties: "token-invalid-authorized-parties", TokenInvalidSignature: "token-invalid-signature", TokenNotActiveYet: "token-not-active-yet", TokenIatInTheFuture: "token-iat-in-the-future", TokenVerificationFailed: "token-verification-failed", InvalidSecretKey: "secret-key-invalid", LocalJWKMissing: "jwk-local-missing", RemoteJWKFailedToLoad: "jwk-remote-failed-to-load", JWKFailedToResolve: "jwk-failed-to-resolve", JWKKidMismatch: "jwk-kid-mismatch" }, tB = { ContactSupport: "Contact support@clerk.com", EnsureClerkJWT: "Make sure that this is a valid Clerk generate JWT.", SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.", SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable." }, tH = class e10 extends Error {
        constructor({ action: t10, message: r10, reason: n10 }) {
          super(r10), Object.setPrototypeOf(this, e10.prototype), this.reason = n10, this.message = r10, this.action = t10;
        }
        getFullMessage() {
          return `${[this.message, this.action].filter((e11) => e11).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
        }
      };
      let tz = crypto;
      var t$ = fetch.bind(globalThis), tK = { crypto: tz, get fetch() {
        return t$;
      }, AbortController: globalThis.AbortController, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response }, tJ = { parse: (e10, t10) => function(e11, t11, r10 = {}) {
        if (!t11.codes) {
          t11.codes = {};
          for (let e12 = 0; e12 < t11.chars.length; ++e12) t11.codes[t11.chars[e12]] = e12;
        }
        if (!r10.loose && e11.length * t11.bits & 7) throw SyntaxError("Invalid padding");
        let n10 = e11.length;
        for (; "=" === e11[n10 - 1]; ) if (--n10, !r10.loose && !((e11.length - n10) * t11.bits & 7)) throw SyntaxError("Invalid padding");
        let i10 = new (r10.out ?? Uint8Array)(n10 * t11.bits / 8 | 0), s10 = 0, a10 = 0, o2 = 0;
        for (let r11 = 0; r11 < n10; ++r11) {
          let n11 = t11.codes[e11[r11]];
          if (void 0 === n11) throw SyntaxError("Invalid character " + e11[r11]);
          a10 = a10 << t11.bits | n11, (s10 += t11.bits) >= 8 && (s10 -= 8, i10[o2++] = 255 & a10 >> s10);
        }
        if (s10 >= t11.bits || 255 & a10 << 8 - s10) throw SyntaxError("Unexpected end of data");
        return i10;
      }(e10, tW, t10) }, tW = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bits: 6 }, tF = { RS256: "SHA-256", RS384: "SHA-384", RS512: "SHA-512" }, tV = "RSASSA-PKCS1-v1_5", tG = { RS256: tV, RS384: tV, RS512: tV }, tX = Object.keys(tF), tQ = (e10) => Array.isArray(e10) && e10.length > 0 && e10.every((e11) => "string" == typeof e11), tY = (e10, t10) => {
        let r10 = [t10].flat().filter((e11) => !!e11), n10 = [e10].flat().filter((e11) => !!e11);
        if (r10.length > 0 && n10.length > 0) {
          if ("string" == typeof e10) {
            if (!r10.includes(e10)) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenVerificationFailed, message: `Invalid JWT audience claim (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
          } else if (tQ(e10) && !e10.some((e11) => r10.includes(e11))) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenVerificationFailed, message: `Invalid JWT audience claim array (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
        }
      }, tZ = (e10) => {
        if (void 0 !== e10 && "JWT" !== e10) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenInvalid, message: `Invalid JWT type ${JSON.stringify(e10)}. Expected "JWT".` });
      }, t0 = (e10) => {
        if (!tX.includes(e10)) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenInvalidAlgorithm, message: `Invalid JWT algorithm ${JSON.stringify(e10)}. Supported: ${tX}.` });
      }, t1 = (e10) => {
        if ("string" != typeof e10) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenVerificationFailed, message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(e10)}.` });
      }, t2 = (e10, t10) => {
        if (e10 && t10 && 0 !== t10.length && !t10.includes(e10)) throw new tH({ reason: tq.TokenInvalidAuthorizedParties, message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(e10)}. Expected "${t10}".` });
      }, t5 = (e10, t10) => {
        if ("number" != typeof e10) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenVerificationFailed, message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() <= r10.getTime() - t10) throw new tH({ reason: tq.TokenExpired, message: `JWT is expired. Expiry date: ${n10.toUTCString()}, Current date: ${r10.toUTCString()}.` });
      }, t4 = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenVerificationFailed, message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new tH({ reason: tq.TokenNotActiveYet, message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      }, t3 = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenVerificationFailed, message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new tH({ reason: tq.TokenIatInTheFuture, message: `JWT issued at date claim (iat) is in the future. Issued at date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      };
      async function t6(e10, t10) {
        let { header: r10, signature: n10, raw: i10 } = e10, s10 = new TextEncoder().encode([i10.header, i10.payload].join(".")), a10 = function(e11) {
          let t11 = tF[e11], r11 = tG[e11];
          if (!t11 || !r11) throw Error(`Unsupported algorithm ${e11}, expected one of ${tX.join(",")}.`);
          return { hash: { name: tF[e11] }, name: tG[e11] };
        }(r10.alg);
        try {
          let e11 = await function(e12, t11, r11) {
            if ("object" == typeof e12) return tK.crypto.subtle.importKey("jwk", e12, t11, false, [r11]);
            let n11 = function(e13) {
              let t12 = tg(e13.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")), r12 = new Uint8Array(new ArrayBuffer(t12.length));
              for (let e14 = 0, n12 = t12.length; e14 < n12; e14++) r12[e14] = t12.charCodeAt(e14);
              return r12;
            }(e12), i11 = "sign" === r11 ? "pkcs8" : "spki";
            return tK.crypto.subtle.importKey(i11, n11, t11, false, [r11]);
          }(t10, a10, "verify");
          return { data: await tK.crypto.subtle.verify(a10.name, e11, n10, s10) };
        } catch (e11) {
          return { errors: [new tH({ reason: tq.TokenInvalidSignature, message: e11?.message })] };
        }
      }
      function t8(e10) {
        let t10 = (e10 || "").toString().split(".");
        if (3 !== t10.length) return { errors: [new tH({ reason: tq.TokenInvalid, message: "Invalid JWT form. A JWT consists of three parts separated by dots." })] };
        let [r10, n10, i10] = t10, s10 = new TextDecoder(), a10 = JSON.parse(s10.decode(tJ.parse(r10, { loose: true }))), o2 = JSON.parse(s10.decode(tJ.parse(n10, { loose: true })));
        return { data: { header: a10, payload: o2, signature: tJ.parse(i10, { loose: true }), raw: { header: r10, payload: n10, signature: i10, text: e10 } } };
      }
      async function t9(e10, t10) {
        let { audience: r10, authorizedParties: n10, clockSkewInMs: i10, key: s10 } = t10, a10 = i10 || 5e3, { data: o2, errors: l2 } = t8(e10);
        if (l2) return { errors: l2 };
        let { header: c2, payload: u2 } = o2;
        try {
          let { typ: e11, alg: t11 } = c2;
          tZ(e11), t0(t11);
          let { azp: i11, sub: s11, aud: o3, iat: l3, exp: d3, nbf: h3 } = u2;
          t1(s11), tY([o3], [r10]), t2(i11, n10), t5(d3, a10), t4(h3, a10), t3(l3, a10);
        } catch (e11) {
          return { errors: [e11] };
        }
        let { data: d2, errors: h2 } = await t6(o2, s10);
        return h2 ? { errors: [new tH({ action: tB.EnsureClerkJWT, reason: tq.TokenVerificationFailed, message: `Error verifying JWT signature. ${h2[0]}` })] } : d2 ? { data: u2 } : { errors: [new tH({ reason: tq.TokenInvalidSignature, message: "JWT signature is invalid." })] };
      }
      var t7 = r(412), re = { strict_mfa: { afterMinutes: 10, level: "multi_factor" }, strict: { afterMinutes: 10, level: "second_factor" }, moderate: { afterMinutes: 60, level: "second_factor" }, lax: { afterMinutes: 1440, level: "second_factor" } }, rt = /* @__PURE__ */ new Set(["first_factor", "second_factor", "multi_factor"]), rr = /* @__PURE__ */ new Set(["strict_mfa", "strict", "moderate", "lax"]), rn = (e10) => "number" == typeof e10 && e10 > 0, ri = (e10) => rt.has(e10), rs = (e10) => rr.has(e10), ra = (e10) => e10.startsWith("org:") ? e10 : `org:${e10}`, ro = (e10, t10) => {
        let { orgId: r10, orgRole: n10, orgPermissions: i10 } = t10;
        return (e10.role || e10.permission) && r10 && n10 && i10 ? e10.permission ? i10.includes(ra(e10.permission)) : e10.role ? n10 === ra(e10.role) : null : null;
      }, rl = (e10, t10) => {
        let { org: r10, user: n10 } = ru(e10), [i10, s10] = t10.split(":"), a10 = s10 || i10;
        return "org" === i10 ? r10.includes(a10) : "user" === i10 ? n10.includes(a10) : [...r10, ...n10].includes(a10);
      }, rc = (e10, t10) => {
        let { features: r10, plans: n10 } = t10;
        return e10.feature && r10 ? rl(r10, e10.feature) : e10.plan && n10 ? rl(n10, e10.plan) : null;
      }, ru = (e10) => {
        let t10 = e10 ? e10.split(",").map((e11) => e11.trim()) : [];
        return { org: t10.filter((e11) => e11.split(":")[0].includes("o")).map((e11) => e11.split(":")[1]), user: t10.filter((e11) => e11.split(":")[0].includes("u")).map((e11) => e11.split(":")[1]) };
      }, rd = (e10) => {
        if (!e10) return false;
        let t10 = "string" == typeof e10 && rs(e10), r10 = "object" == typeof e10 && ri(e10.level) && rn(e10.afterMinutes);
        return (!!t10 || !!r10) && ((e11) => "string" == typeof e11 ? re[e11] : e11).bind(null, e10);
      }, rh = (e10, { factorVerificationAge: t10 }) => {
        if (!e10.reverification || !t10) return null;
        let r10 = rd(e10.reverification);
        if (!r10) return null;
        let { level: n10, afterMinutes: i10 } = r10(), [s10, a10] = t10, o2 = -1 !== s10 ? i10 > s10 : null, l2 = -1 !== a10 ? i10 > a10 : null;
        switch (n10) {
          case "first_factor":
            return o2;
          case "second_factor":
            return -1 !== a10 ? l2 : o2;
          case "multi_factor":
            return -1 === a10 ? o2 : o2 && l2;
        }
      }, rp = (e10) => (t10) => {
        if (!e10.userId) return false;
        let r10 = rc(t10, e10), n10 = ro(t10, e10), i10 = rh(t10, e10);
        return [r10 || n10, i10].some((e11) => null === e11) ? [r10 || n10, i10].some((e11) => true === e11) : [r10 || n10, i10].every((e11) => true === e11);
      }, rf = ({ per: e10, fpm: t10 }) => {
        if (!e10 || !t10) return { permissions: [], featurePermissionMap: [] };
        let r10 = e10.split(",").map((e11) => e11.trim()), n10 = t10.split(",").map((e11) => Number.parseInt(e11.trim(), 10)).map((e11) => e11.toString(2).padStart(r10.length, "0").split("").map((e12) => Number.parseInt(e12, 10)).reverse()).filter(Boolean);
        return { permissions: r10, featurePermissionMap: n10 };
      }, rg = (e10) => {
        let t10, r10, n10, i10, s10 = e10.fva ?? null, a10 = e10.sts ?? null;
        if (2 === e10.v) {
          if (e10.o) {
            t10 = e10.o?.id, n10 = e10.o?.slg, e10.o?.rol && (r10 = `org:${e10.o?.rol}`);
            let { org: s11 } = ru(e10.fea), { permissions: a11, featurePermissionMap: o2 } = rf({ per: e10.o?.per, fpm: e10.o?.fpm });
            i10 = function({ features: e11, permissions: t11, featurePermissionMap: r11 }) {
              if (!e11 || !t11 || !r11) return [];
              let n11 = [];
              for (let i11 = 0; i11 < e11.length; i11++) {
                let s12 = e11[i11];
                if (i11 >= r11.length) continue;
                let a12 = r11[i11];
                if (a12) for (let e12 = 0; e12 < a12.length; e12++) 1 === a12[e12] && n11.push(`org:${s12}:${t11[e12]}`);
              }
              return n11;
            }({ features: s11, featurePermissionMap: o2, permissions: a11 });
          }
        } else t10 = e10.org_id, r10 = e10.org_role, n10 = e10.org_slug, i10 = e10.org_permissions;
        return { sessionClaims: e10, sessionId: e10.sid, sessionStatus: a10, actor: e10.act, userId: e10.sub, orgId: t10, orgRole: r10, orgSlug: n10, orgPermissions: i10, factorVerificationAge: s10 };
      }, rm = r(554), ry = "https://api.clerk.com", rb = "@clerk/backend@1.32.2", rv = "2025-04-10", r_ = { Session: "__session", Refresh: "__refresh", ClientUat: "__client_uat", Handshake: "__clerk_handshake", DevBrowser: "__clerk_db_jwt", RedirectCount: "__clerk_redirect_count", HandshakeNonce: "__clerk_handshake_nonce" }, rw = { ClerkSynced: "__clerk_synced", SuffixedCookies: "suffixed_cookies", ClerkRedirectUrl: "__clerk_redirect_url", DevBrowser: r_.DevBrowser, Handshake: r_.Handshake, HandshakeHelp: "__clerk_help", LegacyDevBrowser: "__dev_session", HandshakeReason: "__clerk_hs_reason", HandshakeNonce: r_.HandshakeNonce }, rS = { Cookies: r_, Headers: { Accept: "accept", AuthMessage: "x-clerk-auth-message", Authorization: "authorization", AuthReason: "x-clerk-auth-reason", AuthSignature: "x-clerk-auth-signature", AuthStatus: "x-clerk-auth-status", AuthToken: "x-clerk-auth-token", CacheControl: "cache-control", ClerkRedirectTo: "x-clerk-redirect-to", ClerkRequestData: "x-clerk-request-data", ClerkUrl: "x-clerk-clerk-url", CloudFrontForwardedProto: "cloudfront-forwarded-proto", ContentType: "content-type", ContentSecurityPolicy: "content-security-policy", ContentSecurityPolicyReportOnly: "content-security-policy-report-only", EnableDebug: "x-clerk-debug", ForwardedHost: "x-forwarded-host", ForwardedPort: "x-forwarded-port", ForwardedProto: "x-forwarded-proto", Host: "host", Location: "location", Nonce: "x-nonce", Origin: "origin", Referrer: "referer", SecFetchDest: "sec-fetch-dest", UserAgent: "user-agent", ReportingEndpoints: "reporting-endpoints" }, ContentTypes: { Json: "application/json" }, QueryParameters: rw }, rE = RegExp("(?<!:)/{1,}", "g");
      function rk(...e10) {
        return e10.filter((e11) => e11).join("/").replace(rE, "/");
      }
      var rT = class {
        constructor(e10) {
          this.request = e10;
        }
        requireId(e10) {
          if (!e10) throw Error("A valid resource ID is required.");
        }
      }, rx = "/actor_tokens", rO = class extends rT {
        async create(e10) {
          return this.request({ method: "POST", path: rx, bodyParams: e10 });
        }
        async revoke(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(rx, e10, "revoke") });
        }
      }, rC = "/accountless_applications", rR = class extends rT {
        async createAccountlessApplication() {
          return this.request({ method: "POST", path: rC });
        }
        async completeAccountlessApplicationOnboarding() {
          return this.request({ method: "POST", path: rk(rC, "complete") });
        }
      }, rP = "/allowlist_identifiers", rI = class extends rT {
        async getAllowlistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rP, queryParams: { ...e10, paginated: true } });
        }
        async createAllowlistIdentifier(e10) {
          return this.request({ method: "POST", path: rP, bodyParams: e10 });
        }
        async deleteAllowlistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rP, e10) });
        }
      }, rN = class extends rT {
        async changeDomain(e10) {
          return this.request({ method: "POST", path: rk("/beta_features", "change_domain"), bodyParams: e10 });
        }
      }, rA = "/blocklist_identifiers", rU = class extends rT {
        async getBlocklistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rA, queryParams: e10 });
        }
        async createBlocklistIdentifier(e10) {
          return this.request({ method: "POST", path: rA, bodyParams: e10 });
        }
        async deleteBlocklistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rA, e10) });
        }
      }, rM = "/clients", rD = class extends rT {
        async getClientList(e10 = {}) {
          return this.request({ method: "GET", path: rM, queryParams: { ...e10, paginated: true } });
        }
        async getClient(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(rM, e10) });
        }
        verifyClient(e10) {
          return this.request({ method: "POST", path: rk(rM, "verify"), bodyParams: { token: e10 } });
        }
        async getHandshakePayload(e10) {
          return this.request({ method: "GET", path: rk(rM, "handshake_payload"), queryParams: e10 });
        }
      }, rj = "/domains", rL = class extends rT {
        async list() {
          return this.request({ method: "GET", path: rj });
        }
        async add(e10) {
          return this.request({ method: "POST", path: rj, bodyParams: e10 });
        }
        async update(e10) {
          let { domainId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rk(rj, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.deleteDomain(e10);
        }
        async deleteDomain(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rj, e10) });
        }
      }, rq = "/email_addresses", rB = class extends rT {
        async getEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(rq, e10) });
        }
        async createEmailAddress(e10) {
          return this.request({ method: "POST", path: rq, bodyParams: e10 });
        }
        async updateEmailAddress(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rk(rq, e10), bodyParams: t10 });
        }
        async deleteEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rq, e10) });
        }
      }, rH = "/instance", rz = class extends rT {
        async get() {
          return this.request({ method: "GET", path: rH });
        }
        async update(e10) {
          return this.request({ method: "PATCH", path: rH, bodyParams: e10 });
        }
        async updateRestrictions(e10) {
          return this.request({ method: "PATCH", path: rk(rH, "restrictions"), bodyParams: e10 });
        }
        async updateOrganizationSettings(e10) {
          return this.request({ method: "PATCH", path: rk(rH, "organization_settings"), bodyParams: e10 });
        }
      }, r$ = "/invitations", rK = class extends rT {
        async getInvitationList(e10 = {}) {
          return this.request({ method: "GET", path: r$, queryParams: { ...e10, paginated: true } });
        }
        async createInvitation(e10) {
          return this.request({ method: "POST", path: r$, bodyParams: e10 });
        }
        async revokeInvitation(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(r$, e10, "revoke") });
        }
      }, rJ = class extends rT {
        async getJwks() {
          return this.request({ method: "GET", path: "/jwks" });
        }
      }, rW = "/jwt_templates", rF = class extends rT {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: rW, queryParams: { ...e10, paginated: true } });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(rW, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rW, bodyParams: e10 });
        }
        async update(e10) {
          let { templateId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rk(rW, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rW, e10) });
        }
      }, rV = "/organizations", rG = class extends rT {
        async getOrganizationList(e10) {
          return this.request({ method: "GET", path: rV, queryParams: e10 });
        }
        async createOrganization(e10) {
          return this.request({ method: "POST", path: rV, bodyParams: e10 });
        }
        async getOrganization(e10) {
          let { includeMembersCount: t10 } = e10, r10 = "organizationId" in e10 ? e10.organizationId : e10.slug;
          return this.requireId(r10), this.request({ method: "GET", path: rk(rV, r10), queryParams: { includeMembersCount: t10 } });
        }
        async updateOrganization(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rk(rV, e10), bodyParams: t10 });
        }
        async updateOrganizationLogo(e10, t10) {
          this.requireId(e10);
          let r10 = new tK.FormData();
          return r10.append("file", t10?.file), t10?.uploaderUserId && r10.append("uploader_user_id", t10?.uploaderUserId), this.request({ method: "PUT", path: rk(rV, e10, "logo"), formData: r10 });
        }
        async deleteOrganizationLogo(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rV, e10, "logo") });
        }
        async updateOrganizationMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rk(rV, e10, "metadata"), bodyParams: t10 });
        }
        async deleteOrganization(e10) {
          return this.request({ method: "DELETE", path: rk(rV, e10) });
        }
        async getOrganizationMembershipList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rk(rV, t10, "memberships"), queryParams: r10 });
        }
        async createOrganizationMembership(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rk(rV, t10, "memberships"), bodyParams: r10 });
        }
        async updateOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, ...n10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rk(rV, t10, "memberships", r10), bodyParams: n10 });
        }
        async updateOrganizationMembershipMetadata(e10) {
          let { organizationId: t10, userId: r10, ...n10 } = e10;
          return this.request({ method: "PATCH", path: rk(rV, t10, "memberships", r10, "metadata"), bodyParams: n10 });
        }
        async deleteOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10 } = e10;
          return this.requireId(t10), this.request({ method: "DELETE", path: rk(rV, t10, "memberships", r10) });
        }
        async getOrganizationInvitationList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rk(rV, t10, "invitations"), queryParams: r10 });
        }
        async createOrganizationInvitation(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rk(rV, t10, "invitations"), bodyParams: r10 });
        }
        async getOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "GET", path: rk(rV, t10, "invitations", r10) });
        }
        async revokeOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10, ...n10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rk(rV, t10, "invitations", r10, "revoke"), bodyParams: n10 });
        }
        async getOrganizationDomainList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rk(rV, t10, "domains"), queryParams: r10 });
        }
        async createOrganizationDomain(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rk(rV, t10, "domains"), bodyParams: { ...r10, verified: r10.verified ?? true } });
        }
        async updateOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10, ...n10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "PATCH", path: rk(rV, t10, "domains", r10), bodyParams: n10 });
        }
        async deleteOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "DELETE", path: rk(rV, t10, "domains", r10) });
        }
      }, rX = "/oauth_applications", rQ = class extends rT {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: rX, queryParams: e10 });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(rX, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rX, bodyParams: e10 });
        }
        async update(e10) {
          let { oauthApplicationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rk(rX, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rX, e10) });
        }
        async rotateSecret(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(rX, e10, "rotate_secret") });
        }
      }, rY = "/phone_numbers", rZ = class extends rT {
        async getPhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(rY, e10) });
        }
        async createPhoneNumber(e10) {
          return this.request({ method: "POST", path: rY, bodyParams: e10 });
        }
        async updatePhoneNumber(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rk(rY, e10), bodyParams: t10 });
        }
        async deletePhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(rY, e10) });
        }
      }, r0 = class extends rT {
        async verify(e10) {
          return this.request({ method: "POST", path: "/proxy_checks", bodyParams: e10 });
        }
      }, r1 = "/redirect_urls", r2 = class extends rT {
        async getRedirectUrlList() {
          return this.request({ method: "GET", path: r1, queryParams: { paginated: true } });
        }
        async getRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(r1, e10) });
        }
        async createRedirectUrl(e10) {
          return this.request({ method: "POST", path: r1, bodyParams: e10 });
        }
        async deleteRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(r1, e10) });
        }
      }, r5 = "/saml_connections", r4 = class extends rT {
        async getSamlConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: r5, queryParams: e10 });
        }
        async createSamlConnection(e10) {
          return this.request({ method: "POST", path: r5, bodyParams: e10 });
        }
        async getSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(r5, e10) });
        }
        async updateSamlConnection(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rk(r5, e10), bodyParams: t10 });
        }
        async deleteSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(r5, e10) });
        }
      }, r3 = "/sessions", r6 = class extends rT {
        async getSessionList(e10 = {}) {
          return this.request({ method: "GET", path: r3, queryParams: { ...e10, paginated: true } });
        }
        async getSession(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(r3, e10) });
        }
        async createSession(e10) {
          return this.request({ method: "POST", path: r3, bodyParams: e10 });
        }
        async revokeSession(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(r3, e10, "revoke") });
        }
        async verifySession(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(r3, e10, "verify"), bodyParams: { token: t10 } });
        }
        async getToken(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(r3, e10, "tokens", t10 || "") });
        }
        async refreshSession(e10, t10) {
          this.requireId(e10);
          let { suffixed_cookies: r10, ...n10 } = t10;
          return this.request({ method: "POST", path: rk(r3, e10, "refresh"), bodyParams: n10, queryParams: { suffixed_cookies: r10 } });
        }
      }, r8 = "/sign_in_tokens", r9 = class extends rT {
        async createSignInToken(e10) {
          return this.request({ method: "POST", path: r8, bodyParams: e10 });
        }
        async revokeSignInToken(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(r8, e10, "revoke") });
        }
      }, r7 = "/sign_ups", ne = class extends rT {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(r7, e10) });
        }
        async update(e10) {
          let { signUpAttemptId: t10, ...r10 } = e10;
          return this.request({ method: "PATCH", path: rk(r7, t10), bodyParams: r10 });
        }
      }, nt = class extends rT {
        async createTestingToken() {
          return this.request({ method: "POST", path: "/testing_tokens" });
        }
      }, nr = "/users", nn = class extends rT {
        async getUserList(e10 = {}) {
          let { limit: t10, offset: r10, orderBy: n10, ...i10 } = e10, [s10, a10] = await Promise.all([this.request({ method: "GET", path: nr, queryParams: e10 }), this.getCount(i10)]);
          return { data: s10, totalCount: a10 };
        }
        async getUser(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rk(nr, e10) });
        }
        async createUser(e10) {
          return this.request({ method: "POST", path: nr, bodyParams: e10 });
        }
        async updateUser(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rk(nr, e10), bodyParams: t10 });
        }
        async updateUserProfileImage(e10, t10) {
          this.requireId(e10);
          let r10 = new tK.FormData();
          return r10.append("file", t10?.file), this.request({ method: "POST", path: rk(nr, e10, "profile_image"), formData: r10 });
        }
        async updateUserMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rk(nr, e10, "metadata"), bodyParams: t10 });
        }
        async deleteUser(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(nr, e10) });
        }
        async getCount(e10 = {}) {
          return this.request({ method: "GET", path: rk(nr, "count"), queryParams: e10 });
        }
        async getUserOauthAccessToken(e10, t10) {
          this.requireId(e10);
          let r10 = t10.startsWith("oauth_"), n10 = r10 ? t10 : `oauth_${t10}`;
          return r10 && tI("getUserOauthAccessToken(userId, provider)", "Remove the `oauth_` prefix from the `provider` argument."), this.request({ method: "GET", path: rk(nr, e10, "oauth_access_tokens", n10), queryParams: { paginated: true } });
        }
        async disableUserMFA(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(nr, e10, "mfa") });
        }
        async getOrganizationMembershipList(e10) {
          let { userId: t10, limit: r10, offset: n10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rk(nr, t10, "organization_memberships"), queryParams: { limit: r10, offset: n10 } });
        }
        async getOrganizationInvitationList(e10) {
          let { userId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rk(nr, t10, "organization_invitations"), queryParams: r10 });
        }
        async verifyPassword(e10) {
          let { userId: t10, password: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rk(nr, t10, "verify_password"), bodyParams: { password: r10 } });
        }
        async verifyTOTP(e10) {
          let { userId: t10, code: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rk(nr, t10, "verify_totp"), bodyParams: { code: r10 } });
        }
        async banUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(nr, e10, "ban") });
        }
        async unbanUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(nr, e10, "unban") });
        }
        async lockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(nr, e10, "lock") });
        }
        async unlockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rk(nr, e10, "unlock") });
        }
        async deleteUserProfileImage(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(nr, e10, "profile_image") });
        }
        async deleteUserPasskey(e10) {
          return this.requireId(e10.userId), this.requireId(e10.passkeyIdentificationId), this.request({ method: "DELETE", path: rk(nr, e10.userId, "passkeys", e10.passkeyIdentificationId) });
        }
        async deleteUserWeb3Wallet(e10) {
          return this.requireId(e10.userId), this.requireId(e10.web3WalletIdentificationId), this.request({ method: "DELETE", path: rk(nr, e10.userId, "web3_wallets", e10.web3WalletIdentificationId) });
        }
        async deleteUserExternalAccount(e10) {
          return this.requireId(e10.userId), this.requireId(e10.externalAccountId), this.request({ method: "DELETE", path: rk(nr, e10.userId, "external_accounts", e10.externalAccountId) });
        }
        async deleteUserBackupCodes(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(nr, e10, "backup_code") });
        }
        async deleteUserTOTP(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rk(nr, e10, "totp") });
        }
      }, ni = "/waitlist_entries", ns = class extends rT {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: ni, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: ni, bodyParams: e10 });
        }
      }, na = "/webhooks", no = class extends rT {
        async createSvixApp() {
          return this.request({ method: "POST", path: rk(na, "svix") });
        }
        async generateSvixAuthURL() {
          return this.request({ method: "POST", path: rk(na, "svix_url") });
        }
        async deleteSvixApp() {
          return this.request({ method: "DELETE", path: rk(na, "svix") });
        }
      };
      function nl(e10) {
        if (!e10 || "string" != typeof e10) throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
      }
      var nc = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.status = t10, this.userId = r10, this.actor = n10, this.token = i10, this.url = s10, this.createdAt = a10, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.user_id, t10.actor, t10.token, t10.url, t10.created_at, t10.updated_at);
        }
      }, nu = class e10 {
        constructor(e11, t10, r10, n10) {
          this.publishableKey = e11, this.secretKey = t10, this.claimUrl = r10, this.apiKeysUrl = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.publishable_key, t10.secret_key, t10.claim_url, t10.api_keys_url);
        }
      }, nd = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = n10, this.updatedAt = i10, this.instanceId = s10, this.invitationId = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id, t10.invitation_id);
        }
      }, nh = class e10 {
        constructor(e11, t10, r10, n10, i10, s10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = n10, this.updatedAt = i10, this.instanceId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id);
        }
      }, np = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.isMobile = t10, this.ipAddress = r10, this.city = n10, this.country = i10, this.browserVersion = s10, this.browserName = a10, this.deviceType = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.is_mobile, t10.ip_address, t10.city, t10.country, t10.browser_version, t10.browser_name, t10.device_type);
        }
      }, nf = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2 = null) {
          this.id = e11, this.clientId = t10, this.userId = r10, this.status = n10, this.lastActiveAt = i10, this.expireAt = s10, this.abandonAt = a10, this.createdAt = o2, this.updatedAt = l2, this.lastActiveOrganizationId = c2, this.latestActivity = u2, this.actor = d2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.user_id, t10.status, t10.last_active_at, t10.expire_at, t10.abandon_at, t10.created_at, t10.updated_at, t10.last_active_organization_id, t10.latest_activity && np.fromJSON(t10.latest_activity), t10.actor);
        }
      }, ng = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.sessionIds = t10, this.sessions = r10, this.signInId = n10, this.signUpId = i10, this.lastActiveSessionId = s10, this.createdAt = a10, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.session_ids, t10.sessions.map((e11) => nf.fromJSON(e11)), t10.sign_in_id, t10.sign_up_id, t10.last_active_session_id, t10.created_at, t10.updated_at);
        }
      }, nm = class e10 {
        constructor(e11, t10, r10) {
          this.host = e11, this.value = t10, this.required = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.host, t10.value, t10.required);
        }
      }, ny = class e10 {
        constructor(e11) {
          this.cookies = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.cookies);
        }
      }, nb = class e10 {
        constructor(e11, t10, r10, n10) {
          this.object = e11, this.id = t10, this.slug = r10, this.deleted = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.object, t10.id || null, t10.slug || null, t10.deleted);
        }
      }, nv = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.name = t10, this.isSatellite = r10, this.frontendApiUrl = n10, this.developmentOrigin = i10, this.cnameTargets = s10, this.accountsPortalUrl = a10, this.proxyUrl = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.is_satellite, t10.frontend_api_url, t10.development_origin, t10.cname_targets && t10.cname_targets.map((e11) => nm.fromJSON(e11)), t10.accounts_portal_url, t10.proxy_url);
        }
      }, n_ = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2) {
          this.id = e11, this.fromEmailName = t10, this.emailAddressId = r10, this.toEmailAddress = n10, this.subject = i10, this.body = s10, this.bodyPlain = a10, this.status = o2, this.slug = l2, this.data = c2, this.deliveredByClerk = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_email_name, t10.email_address_id, t10.to_email_address, t10.subject, t10.body, t10.body_plain, t10.status, t10.slug, t10.data, t10.delivered_by_clerk);
        }
      }, nw = class e10 {
        constructor(e11, t10) {
          this.id = e11, this.type = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type);
        }
      }, nS = class e10 {
        constructor(e11, t10, r10 = null, n10 = null, i10 = null, s10 = null, a10 = null) {
          this.status = e11, this.strategy = t10, this.externalVerificationRedirectURL = r10, this.attempts = n10, this.expireAt = i10, this.nonce = s10, this.message = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.status, t10.strategy, t10.external_verification_redirect_url ? new URL(t10.external_verification_redirect_url) : null, t10.attempts, t10.expire_at, t10.nonce);
        }
      }, nE = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.emailAddress = t10, this.verification = r10, this.linkedTo = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.verification && nS.fromJSON(t10.verification), t10.linked_to.map((e11) => nw.fromJSON(e11)));
        }
      }, nk = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2 = {}, h2, p2) {
          this.id = e11, this.provider = t10, this.identificationId = r10, this.externalId = n10, this.approvedScopes = i10, this.emailAddress = s10, this.firstName = a10, this.lastName = o2, this.imageUrl = l2, this.username = c2, this.phoneNumber = u2, this.publicMetadata = d2, this.label = h2, this.verification = p2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.identification_id, t10.provider_user_id, t10.approved_scopes, t10.email_address, t10.first_name, t10.last_name, t10.image_url || "", t10.username, t10.phone_number, t10.public_metadata, t10.label, t10.verification && nS.fromJSON(t10.verification));
        }
      }, nT = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.environmentType = t10, this.allowedOrigins = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.environment_type, t10.allowed_origins);
        }
      }, nx = class e10 {
        constructor(e11, t10, r10, n10, i10) {
          this.allowlist = e11, this.blocklist = t10, this.blockEmailSubaddresses = r10, this.blockDisposableEmailDomains = n10, this.ignoreDotsForGmailAddresses = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.allowlist, t10.blocklist, t10.block_email_subaddresses, t10.block_disposable_email_domains, t10.ignore_dots_for_gmail_addresses);
        }
      }, nO = class e10 {
        constructor(e11, t10, r10, n10, i10) {
          this.id = e11, this.restrictedToAllowlist = t10, this.fromEmailAddress = r10, this.progressiveSignUp = n10, this.enhancedEmailDeliverability = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.restricted_to_allowlist, t10.from_email_address, t10.progressive_sign_up, t10.enhanced_email_deliverability);
        }
      }, nC = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.emailAddress = t10, this.publicMetadata = r10, this.createdAt = n10, this.updatedAt = i10, this.status = s10, this.url = a10, this.revoked = o2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.public_metadata, t10.created_at, t10.updated_at, t10.status, t10.url, t10.revoked);
          return r10._raw = t10, r10;
        }
      }, nR = { AccountlessApplication: "accountless_application", ActorToken: "actor_token", AllowlistIdentifier: "allowlist_identifier", BlocklistIdentifier: "blocklist_identifier", Client: "client", Cookies: "cookies", Domain: "domain", Email: "email", EmailAddress: "email_address", Instance: "instance", InstanceRestrictions: "instance_restrictions", InstanceSettings: "instance_settings", Invitation: "invitation", JwtTemplate: "jwt_template", OauthAccessToken: "oauth_access_token", OAuthApplication: "oauth_application", Organization: "organization", OrganizationInvitation: "organization_invitation", OrganizationMembership: "organization_membership", OrganizationSettings: "organization_settings", PhoneNumber: "phone_number", ProxyCheck: "proxy_check", RedirectUrl: "redirect_url", Session: "session", SignInToken: "sign_in_token", SignUpAttempt: "sign_up_attempt", SmsMessage: "sms_message", User: "user", WaitlistEntry: "waitlist_entry", Token: "token", TotalCount: "total_count" }, nP = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2) {
          this.id = e11, this.name = t10, this.claims = r10, this.lifetime = n10, this.allowedClockSkew = i10, this.customSigningKey = s10, this.signingAlgorithm = a10, this.createdAt = o2, this.updatedAt = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.claims, t10.lifetime, t10.allowed_clock_skew, t10.custom_signing_key, t10.signing_algorithm, t10.created_at, t10.updated_at);
        }
      }, nI = class e10 {
        constructor(e11, t10, r10, n10 = {}, i10, s10, a10, o2) {
          this.externalAccountId = e11, this.provider = t10, this.token = r10, this.publicMetadata = n10, this.label = i10, this.scopes = s10, this.tokenSecret = a10, this.expiresAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.external_account_id, t10.provider, t10.token, t10.public_metadata, t10.label || "", t10.scopes, t10.token_secret, t10.expires_at);
        }
      }, nN = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2) {
          this.id = e11, this.instanceId = t10, this.name = r10, this.clientId = n10, this.isPublic = i10, this.scopes = s10, this.redirectUris = a10, this.authorizeUrl = o2, this.tokenFetchUrl = l2, this.userInfoUrl = c2, this.discoveryUrl = u2, this.tokenIntrospectionUrl = d2, this.createdAt = h2, this.updatedAt = p2, this.clientSecret = f2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.instance_id, t10.name, t10.client_id, t10.public, t10.scopes, t10.redirect_uris, t10.authorize_url, t10.token_fetch_url, t10.user_info_url, t10.discovery_url, t10.token_introspection_url, t10.created_at, t10.updated_at, t10.client_secret);
        }
      }, nA = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2 = {}, l2 = {}, c2, u2, d2, h2) {
          this.id = e11, this.name = t10, this.slug = r10, this.imageUrl = n10, this.hasImage = i10, this.createdAt = s10, this.updatedAt = a10, this.publicMetadata = o2, this.privateMetadata = l2, this.maxAllowedMemberships = c2, this.adminDeleteEnabled = u2, this.membersCount = d2, this.createdBy = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.name, t10.slug, t10.image_url || "", t10.has_image, t10.created_at, t10.updated_at, t10.public_metadata, t10.private_metadata, t10.max_allowed_memberships, t10.admin_delete_enabled, t10.members_count, t10.created_by);
          return r10._raw = t10, r10;
        }
      }, nU = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2 = {}, d2 = {}, h2) {
          this.id = e11, this.emailAddress = t10, this.role = r10, this.roleName = n10, this.organizationId = i10, this.createdAt = s10, this.updatedAt = a10, this.expiresAt = o2, this.url = l2, this.status = c2, this.publicMetadata = u2, this.privateMetadata = d2, this.publicOrganizationData = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.role, t10.role_name, t10.organization_id, t10.created_at, t10.updated_at, t10.expires_at, t10.url, t10.status, t10.public_metadata, t10.private_metadata, t10.public_organization_data);
          return r10._raw = t10, r10;
        }
      }, nM = class e10 {
        constructor(e11, t10, r10, n10 = {}, i10 = {}, s10, a10, o2, l2) {
          this.id = e11, this.role = t10, this.permissions = r10, this.publicMetadata = n10, this.privateMetadata = i10, this.createdAt = s10, this.updatedAt = a10, this.organization = o2, this.publicUserData = l2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.role, t10.permissions, t10.public_metadata, t10.private_metadata, t10.created_at, t10.updated_at, nA.fromJSON(t10.organization), nD.fromJSON(t10.public_user_data));
          return r10._raw = t10, r10;
        }
      }, nD = class e10 {
        constructor(e11, t10, r10, n10, i10, s10) {
          this.identifier = e11, this.firstName = t10, this.lastName = r10, this.imageUrl = n10, this.hasImage = i10, this.userId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.identifier, t10.first_name, t10.last_name, t10.image_url, t10.has_image, t10.user_id);
        }
      }, nj = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2) {
          this.enabled = e11, this.maxAllowedMemberships = t10, this.maxAllowedRoles = r10, this.maxAllowedPermissions = n10, this.creatorRole = i10, this.adminDeleteEnabled = s10, this.domainsEnabled = a10, this.domainsEnrollmentModes = o2, this.domainsDefaultRole = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.enabled, t10.max_allowed_memberships, t10.max_allowed_roles, t10.max_allowed_permissions, t10.creator_role, t10.admin_delete_enabled, t10.domains_enabled, t10.domains_enrollment_modes, t10.domains_default_role);
        }
      }, nL = class e10 {
        constructor(e11, t10, r10, n10, i10, s10) {
          this.id = e11, this.phoneNumber = t10, this.reservedForSecondFactor = r10, this.defaultSecondFactor = n10, this.verification = i10, this.linkedTo = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.phone_number, t10.reserved_for_second_factor, t10.default_second_factor, t10.verification && nS.fromJSON(t10.verification), t10.linked_to.map((e11) => nw.fromJSON(e11)));
        }
      }, nq = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.domainId = t10, this.lastRunAt = r10, this.proxyUrl = n10, this.successful = i10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.domain_id, t10.last_run_at, t10.proxy_url, t10.successful, t10.created_at, t10.updated_at);
        }
      }, nB = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.url = t10, this.createdAt = r10, this.updatedAt = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.url, t10.created_at, t10.updated_at);
        }
      }, nH = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.userId = t10, this.token = r10, this.status = n10, this.url = i10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.user_id, t10.token, t10.status, t10.url, t10.created_at, t10.updated_at);
        }
      }, nz = class e10 {
        constructor(e11, t10) {
          this.nextAction = e11, this.supportedStrategies = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.next_action, t10.supported_strategies);
        }
      }, n$ = class e10 {
        constructor(e11, t10, r10, n10) {
          this.emailAddress = e11, this.phoneNumber = t10, this.web3Wallet = r10, this.externalAccount = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.email_address && nz.fromJSON(t10.email_address), t10.phone_number && nz.fromJSON(t10.phone_number), t10.web3_wallet && nz.fromJSON(t10.web3_wallet), t10.external_account);
        }
      }, nK = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, b2, v2, _2, w2) {
          this.id = e11, this.status = t10, this.requiredFields = r10, this.optionalFields = n10, this.missingFields = i10, this.unverifiedFields = s10, this.verifications = a10, this.username = o2, this.emailAddress = l2, this.phoneNumber = c2, this.web3Wallet = u2, this.passwordEnabled = d2, this.firstName = h2, this.lastName = p2, this.customAction = f2, this.externalId = g2, this.createdSessionId = m2, this.createdUserId = y2, this.abandonAt = b2, this.legalAcceptedAt = v2, this.publicMetadata = _2, this.unsafeMetadata = w2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.required_fields, t10.optional_fields, t10.missing_fields, t10.unverified_fields, t10.verifications ? n$.fromJSON(t10.verifications) : null, t10.username, t10.email_address, t10.phone_number, t10.web3_wallet, t10.password_enabled, t10.first_name, t10.last_name, t10.custom_action, t10.external_id, t10.created_session_id, t10.created_user_id, t10.abandon_at, t10.legal_accepted_at, t10.public_metadata, t10.unsafe_metadata);
        }
      }, nJ = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.fromPhoneNumber = t10, this.toPhoneNumber = r10, this.message = n10, this.status = i10, this.phoneNumberId = s10, this.data = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_phone_number, t10.to_phone_number, t10.message, t10.status, t10.phone_number_id, t10.data);
        }
      }, nW = class e10 {
        constructor(e11) {
          this.jwt = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.jwt);
        }
      }, nF = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2) {
          this.id = e11, this.name = t10, this.domain = r10, this.active = n10, this.provider = i10, this.syncUserAttributes = s10, this.allowSubdomains = a10, this.allowIdpInitiated = o2, this.createdAt = l2, this.updatedAt = c2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.active, t10.provider, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at);
        }
      }, nV = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2) {
          this.id = e11, this.provider = t10, this.providerUserId = r10, this.active = n10, this.emailAddress = i10, this.firstName = s10, this.lastName = a10, this.verification = o2, this.samlConnection = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.provider_user_id, t10.active, t10.email_address, t10.first_name, t10.last_name, t10.verification && nS.fromJSON(t10.verification), t10.saml_connection && nF.fromJSON(t10.saml_connection));
        }
      }, nG = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.web3Wallet = t10, this.verification = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.web3_wallet, t10.verification && nS.fromJSON(t10.verification));
        }
      }, nX = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, b2, v2 = {}, _2 = {}, w2 = {}, S2 = [], E2 = [], k2 = [], T2 = [], x2 = [], O2, C2, R2 = null, P2, I2) {
          this.id = e11, this.passwordEnabled = t10, this.totpEnabled = r10, this.backupCodeEnabled = n10, this.twoFactorEnabled = i10, this.banned = s10, this.locked = a10, this.createdAt = o2, this.updatedAt = l2, this.imageUrl = c2, this.hasImage = u2, this.primaryEmailAddressId = d2, this.primaryPhoneNumberId = h2, this.primaryWeb3WalletId = p2, this.lastSignInAt = f2, this.externalId = g2, this.username = m2, this.firstName = y2, this.lastName = b2, this.publicMetadata = v2, this.privateMetadata = _2, this.unsafeMetadata = w2, this.emailAddresses = S2, this.phoneNumbers = E2, this.web3Wallets = k2, this.externalAccounts = T2, this.samlAccounts = x2, this.lastActiveAt = O2, this.createOrganizationEnabled = C2, this.createOrganizationsLimit = R2, this.deleteSelfEnabled = P2, this.legalAcceptedAt = I2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.password_enabled, t10.totp_enabled, t10.backup_code_enabled, t10.two_factor_enabled, t10.banned, t10.locked, t10.created_at, t10.updated_at, t10.image_url, t10.has_image, t10.primary_email_address_id, t10.primary_phone_number_id, t10.primary_web3_wallet_id, t10.last_sign_in_at, t10.external_id, t10.username, t10.first_name, t10.last_name, t10.public_metadata, t10.private_metadata, t10.unsafe_metadata, (t10.email_addresses || []).map((e11) => nE.fromJSON(e11)), (t10.phone_numbers || []).map((e11) => nL.fromJSON(e11)), (t10.web3_wallets || []).map((e11) => nG.fromJSON(e11)), (t10.external_accounts || []).map((e11) => nk.fromJSON(e11)), (t10.saml_accounts || []).map((e11) => nV.fromJSON(e11)), t10.last_active_at, t10.create_organization_enabled, t10.create_organizations_limit, t10.delete_self_enabled, t10.legal_accepted_at);
          return r10._raw = t10, r10;
        }
        get primaryEmailAddress() {
          return this.emailAddresses.find(({ id: e11 }) => e11 === this.primaryEmailAddressId) ?? null;
        }
        get primaryPhoneNumber() {
          return this.phoneNumbers.find(({ id: e11 }) => e11 === this.primaryPhoneNumberId) ?? null;
        }
        get primaryWeb3Wallet() {
          return this.web3Wallets.find(({ id: e11 }) => e11 === this.primaryWeb3WalletId) ?? null;
        }
        get fullName() {
          return [this.firstName, this.lastName].join(" ").trim() || null;
        }
      }, nQ = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.emailAddress = t10, this.status = r10, this.invitation = n10, this.createdAt = i10, this.updatedAt = s10, this.isLocked = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.status, t10.invitation && nC.fromJSON(t10.invitation), t10.created_at, t10.updated_at, t10.is_locked);
        }
      };
      function nY(e10) {
        if ("string" != typeof e10 && "object" in e10 && "deleted" in e10) return nb.fromJSON(e10);
        switch (e10.object) {
          case nR.AccountlessApplication:
            return nu.fromJSON(e10);
          case nR.ActorToken:
            return nc.fromJSON(e10);
          case nR.AllowlistIdentifier:
            return nd.fromJSON(e10);
          case nR.BlocklistIdentifier:
            return nh.fromJSON(e10);
          case nR.Client:
            return ng.fromJSON(e10);
          case nR.Cookies:
            return ny.fromJSON(e10);
          case nR.Domain:
            return nv.fromJSON(e10);
          case nR.EmailAddress:
            return nE.fromJSON(e10);
          case nR.Email:
            return n_.fromJSON(e10);
          case nR.Instance:
            return nT.fromJSON(e10);
          case nR.InstanceRestrictions:
            return nx.fromJSON(e10);
          case nR.InstanceSettings:
            return nO.fromJSON(e10);
          case nR.Invitation:
            return nC.fromJSON(e10);
          case nR.JwtTemplate:
            return nP.fromJSON(e10);
          case nR.OauthAccessToken:
            return nI.fromJSON(e10);
          case nR.OAuthApplication:
            return nN.fromJSON(e10);
          case nR.Organization:
            return nA.fromJSON(e10);
          case nR.OrganizationInvitation:
            return nU.fromJSON(e10);
          case nR.OrganizationMembership:
            return nM.fromJSON(e10);
          case nR.OrganizationSettings:
            return nj.fromJSON(e10);
          case nR.PhoneNumber:
            return nL.fromJSON(e10);
          case nR.ProxyCheck:
            return nq.fromJSON(e10);
          case nR.RedirectUrl:
            return nB.fromJSON(e10);
          case nR.SignInToken:
            return nH.fromJSON(e10);
          case nR.SignUpAttempt:
            return nK.fromJSON(e10);
          case nR.Session:
            return nf.fromJSON(e10);
          case nR.SmsMessage:
            return nJ.fromJSON(e10);
          case nR.Token:
            return nW.fromJSON(e10);
          case nR.TotalCount:
            return e10.total_count;
          case nR.User:
            return nX.fromJSON(e10);
          case nR.WaitlistEntry:
            return nQ.fromJSON(e10);
          default:
            return e10;
        }
      }
      function nZ(e10) {
        var t10;
        return t10 = async (t11) => {
          let r10, { secretKey: n10, requireSecretKey: i10 = true, apiUrl: s10 = ry, apiVersion: a10 = "v1", userAgent: o2 = rb } = e10, { path: l2, method: c2, queryParams: u2, headerParams: d2, bodyParams: h2, formData: p2 } = t11;
          i10 && nl(n10);
          let f2 = new URL(rk(s10, a10, l2));
          if (u2) for (let [e11, t12] of Object.entries(t7({ ...u2 }))) t12 && [t12].flat().forEach((t13) => f2.searchParams.append(e11, t13));
          let g2 = { "Clerk-API-Version": rv, "User-Agent": o2, ...d2 };
          n10 && (g2.Authorization = `Bearer ${n10}`);
          try {
            var m2;
            if (p2) r10 = await tK.fetch(f2.href, { method: c2, headers: g2, body: p2 });
            else {
              g2["Content-Type"] = "application/json";
              let e12 = "GET" !== c2 && h2 && Object.keys(h2).length > 0 ? { body: JSON.stringify(t7(h2, { deep: false })) } : null;
              r10 = await tK.fetch(f2.href, { method: c2, headers: g2, ...e12 });
            }
            let e11 = r10?.headers && r10.headers?.get(rS.Headers.ContentType) === rS.ContentTypes.Json, t12 = await (e11 ? r10.json() : r10.text());
            if (!r10.ok) return { data: null, errors: n2(t12), status: r10?.status, statusText: r10?.statusText, clerkTraceId: n0(t12, r10?.headers), retryAfter: n1(r10?.headers) };
            return { ...Array.isArray(t12) ? { data: t12.map((e12) => nY(e12)) } : (m2 = t12) && "object" == typeof m2 && "data" in m2 && Array.isArray(m2.data) && void 0 !== m2.data ? { data: t12.data.map((e12) => nY(e12)), totalCount: t12.total_count } : { data: nY(t12) }, errors: null };
          } catch (e11) {
            if (e11 instanceof Error) return { data: null, errors: [{ code: "unexpected_error", message: e11.message || "Unexpected error" }], clerkTraceId: n0(e11, r10?.headers) };
            return { data: null, errors: n2(e11), status: r10?.status, statusText: r10?.statusText, clerkTraceId: n0(e11, r10?.headers), retryAfter: n1(r10?.headers) };
          }
        }, async (...e11) => {
          let { data: r10, errors: n10, totalCount: i10, status: s10, statusText: a10, clerkTraceId: o2, retryAfter: l2 } = await t10(...e11);
          if (n10) {
            let e12 = new tA(a10 || "", { data: [], status: s10, clerkTraceId: o2, retryAfter: l2 });
            throw e12.errors = n10, e12;
          }
          return void 0 !== i10 ? { data: r10, totalCount: i10 } : r10;
        };
      }
      function n0(e10, t10) {
        return e10 && "object" == typeof e10 && "clerk_trace_id" in e10 && "string" == typeof e10.clerk_trace_id ? e10.clerk_trace_id : t10?.get("cf-ray") || "";
      }
      function n1(e10) {
        let t10 = e10?.get("Retry-After");
        if (!t10) return;
        let r10 = parseInt(t10, 10);
        if (!isNaN(r10)) return r10;
      }
      function n2(e10) {
        if (e10 && "object" == typeof e10 && "errors" in e10) {
          let t10 = e10.errors;
          return t10.length > 0 ? t10.map(tN) : [];
        }
        return [];
      }
      function n5(e10) {
        let t10 = nZ(e10);
        return { __experimental_accountlessApplications: new rR(nZ({ ...e10, requireSecretKey: false })), actorTokens: new rO(t10), allowlistIdentifiers: new rI(t10), betaFeatures: new rN(t10), blocklistIdentifiers: new rU(t10), clients: new rD(t10), domains: new rL(t10), emailAddresses: new rB(t10), instance: new rz(t10), invitations: new rK(t10), jwks: new rJ(t10), jwtTemplates: new rF(t10), oauthApplications: new rQ(t10), organizations: new rG(t10), phoneNumbers: new rZ(t10), proxyChecks: new r0(t10), redirectUrls: new r2(t10), samlConnections: new r4(t10), sessions: new r6(t10), signInTokens: new r9(t10), signUps: new ne(t10), testingTokens: new nt(t10), users: new nn(t10), waitlistEntries: new ns(t10), webhooks: new no(t10) };
      }
      var n4 = (e10) => () => {
        let t10 = { ...e10 };
        return t10.secretKey = (t10.secretKey || "").substring(0, 7), t10.jwtKey = (t10.jwtKey || "").substring(0, 7), { ...t10 };
      }, n3 = (e10) => {
        let { fetcher: t10, sessionToken: r10, sessionId: n10 } = e10 || {};
        return async (e11 = {}) => n10 ? e11.template ? t10(n10, e11.template) : r10 : null;
      }, n6 = { SignedIn: "signed-in", SignedOut: "signed-out", Handshake: "handshake" }, n8 = { ClientUATWithoutSessionToken: "client-uat-but-no-session-token", DevBrowserMissing: "dev-browser-missing", DevBrowserSync: "dev-browser-sync", PrimaryRespondsToSyncing: "primary-responds-to-syncing", SatelliteCookieNeedsSyncing: "satellite-needs-syncing", SessionTokenAndUATMissing: "session-token-and-uat-missing", SessionTokenMissing: "session-token-missing", SessionTokenExpired: "session-token-expired", SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat", SessionTokenNBF: "session-token-nbf", SessionTokenIatInTheFuture: "session-token-iat-in-the-future", SessionTokenWithoutClientUAT: "session-token-but-no-client-uat", ActiveOrganizationMismatch: "active-organization-mismatch", UnexpectedError: "unexpected-error" };
      function n9(e10, t10, r10 = new Headers(), n10) {
        let i10 = function(e11, t11, r11) {
          let { actor: n11, sessionId: i11, sessionStatus: s10, userId: a10, orgId: o2, orgRole: l2, orgSlug: c2, orgPermissions: u2, factorVerificationAge: d2 } = rg(r11), h2 = n5(e11), p2 = n3({ sessionId: i11, sessionToken: t11, fetcher: async (...e12) => (await h2.sessions.getToken(...e12)).jwt });
          return { actor: n11, sessionClaims: r11, sessionId: i11, sessionStatus: s10, userId: a10, orgId: o2, orgRole: l2, orgSlug: c2, orgPermissions: u2, factorVerificationAge: d2, getToken: p2, has: rp({ orgId: o2, orgRole: l2, orgPermissions: u2, userId: a10, factorVerificationAge: d2, features: r11.fea || "", plans: r11.pla || "" }), debug: n4({ ...e11, sessionToken: t11 }) };
        }(e10, n10, t10);
        return { status: n6.SignedIn, reason: null, message: null, proxyUrl: e10.proxyUrl || "", publishableKey: e10.publishableKey || "", isSatellite: e10.isSatellite || false, domain: e10.domain || "", signInUrl: e10.signInUrl || "", signUpUrl: e10.signUpUrl || "", afterSignInUrl: e10.afterSignInUrl || "", afterSignUpUrl: e10.afterSignUpUrl || "", isSignedIn: true, toAuth: () => i10, headers: r10, token: n10 };
      }
      function n7(e10, t10, r10 = "", n10 = new Headers()) {
        return ie({ status: n6.SignedOut, reason: t10, message: r10, proxyUrl: e10.proxyUrl || "", publishableKey: e10.publishableKey || "", isSatellite: e10.isSatellite || false, domain: e10.domain || "", signInUrl: e10.signInUrl || "", signUpUrl: e10.signUpUrl || "", afterSignInUrl: e10.afterSignInUrl || "", afterSignUpUrl: e10.afterSignUpUrl || "", isSignedIn: false, headers: n10, toAuth: () => ({ sessionClaims: null, sessionId: null, sessionStatus: null, userId: null, actor: null, orgId: null, orgRole: null, orgSlug: null, orgPermissions: null, factorVerificationAge: null, getToken: () => Promise.resolve(null), has: () => false, debug: n4({ ...e10, status: n6.SignedOut, reason: t10, message: r10 }) }), token: null });
      }
      var ie = (e10) => {
        let t10 = new Headers(e10.headers || {});
        if (e10.message) try {
          t10.set(rS.Headers.AuthMessage, e10.message);
        } catch {
        }
        if (e10.reason) try {
          t10.set(rS.Headers.AuthReason, e10.reason);
        } catch {
        }
        if (e10.status) try {
          t10.set(rS.Headers.AuthStatus, e10.status);
        } catch {
        }
        return e10.headers = t10, e10;
      }, it = class extends URL {
        isCrossOrigin(e10) {
          return this.origin !== new URL(e10.toString()).origin;
        }
      }, ir = (...e10) => new it(...e10), ii = class extends Request {
        constructor(e10, t10) {
          super("string" != typeof e10 && "url" in e10 ? e10.url : String(e10), t10 || "string" == typeof e10 ? void 0 : e10), this.clerkUrl = this.deriveUrlFromHeaders(this), this.cookies = this.parseCookies(this);
        }
        toJSON() {
          return { url: this.clerkUrl.href, method: this.method, headers: JSON.stringify(Object.fromEntries(this.headers)), clerkUrl: this.clerkUrl.toString(), cookies: JSON.stringify(Object.fromEntries(this.cookies)) };
        }
        deriveUrlFromHeaders(e10) {
          let t10 = new URL(e10.url), r10 = e10.headers.get(rS.Headers.ForwardedProto), n10 = e10.headers.get(rS.Headers.ForwardedHost), i10 = e10.headers.get(rS.Headers.Host), s10 = t10.protocol, a10 = this.getFirstValueFromHeader(n10) ?? i10, o2 = this.getFirstValueFromHeader(r10) ?? s10?.replace(/[:/]/, ""), l2 = a10 && o2 ? `${o2}://${a10}` : t10.origin;
          return l2 === t10.origin ? ir(t10) : ir(t10.pathname + t10.search, l2);
        }
        getFirstValueFromHeader(e10) {
          return e10?.split(",")[0];
        }
        parseCookies(e10) {
          return new Map(Object.entries((0, rm.qg)(this.decodeCookieValue(e10.headers.get("cookie") || ""))));
        }
        decodeCookieValue(e10) {
          return e10 ? e10.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : e10;
        }
      }, is = (...e10) => e10[0] instanceof ii ? e10[0] : new ii(...e10), ia = {}, io = 0;
      function il(e10, t10 = true) {
        ia[e10.kid] = e10, io = t10 ? Date.now() : -1;
      }
      var ic = "local";
      function iu(e10) {
        if (!ia[ic]) {
          if (!e10) throw new tH({ action: tB.SetClerkJWTKey, message: "Missing local JWK.", reason: tq.LocalJWKMissing });
          il({ kid: "local", kty: "RSA", alg: "RS256", n: e10.replace(/\r\n|\n|\r/g, "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA", "").replace("IDAQAB", "").replace(/\+/g, "-").replace(/\//g, "_"), e: "AQAB" }, false);
        }
        return ia[ic];
      }
      async function id({ secretKey: e10, apiUrl: t10 = ry, apiVersion: r10 = "v1", kid: n10, skipJwksCache: i10 }) {
        if (i10 || function() {
          if (-1 === io) return false;
          let e11 = Date.now() - io >= 3e5;
          return e11 && (ia = {}), e11;
        }() || !ia[n10]) {
          if (!e10) throw new tH({ action: tB.ContactSupport, message: "Failed to load JWKS from Clerk Backend or Frontend API.", reason: tq.RemoteJWKFailedToLoad });
          let { keys: n11 } = await tf(() => ih(t10, e10, r10));
          if (!n11 || !n11.length) throw new tH({ action: tB.ContactSupport, message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.", reason: tq.RemoteJWKFailedToLoad });
          n11.forEach((e11) => il(e11));
        }
        let s10 = ia[n10];
        if (!s10) {
          let e11 = Object.values(ia).map((e12) => e12.kid).sort().join(", ");
          throw new tH({ action: `Go to your Dashboard and validate your secret and public keys are correct. ${tB.ContactSupport} if the issue persists.`, message: `Unable to find a signing key in JWKS that matches the kid='${n10}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${e11}`, reason: tq.JWKKidMismatch });
        }
        return s10;
      }
      async function ih(e10, t10, r10) {
        if (!t10) throw new tH({ action: tB.SetClerkSecretKey, message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.", reason: tq.RemoteJWKFailedToLoad });
        let n10 = new URL(e10);
        n10.pathname = rk(n10.pathname, r10, "/jwks");
        let i10 = await tK.fetch(n10.href, { headers: { Authorization: `Bearer ${t10}`, "Clerk-API-Version": rv, "Content-Type": "application/json", "User-Agent": rb } });
        if (!i10.ok) {
          let e11 = await i10.json(), t11 = ip(e11?.errors, tL.InvalidSecretKey);
          if (t11) {
            let e12 = tq.InvalidSecretKey;
            throw new tH({ action: tB.ContactSupport, message: t11.message, reason: e12 });
          }
          throw new tH({ action: tB.ContactSupport, message: `Error loading Clerk JWKS from ${n10.href} with code=${i10.status}`, reason: tq.RemoteJWKFailedToLoad });
        }
        return i10.json();
      }
      var ip = (e10, t10) => e10 ? e10.find((e11) => e11.code === t10) : null;
      async function ig(e10, t10) {
        let { data: r10, errors: n10 } = t8(e10);
        if (n10) return { errors: n10 };
        let { header: i10 } = r10, { kid: s10 } = i10;
        try {
          let r11;
          if (t10.jwtKey) r11 = iu(t10.jwtKey);
          else {
            if (!t10.secretKey) return { errors: [new tH({ action: tB.SetClerkJWTKey, message: "Failed to resolve JWK during verification.", reason: tq.JWKFailedToResolve })] };
            r11 = await id({ ...t10, kid: s10 });
          }
          return await t9(e10, { ...t10, key: r11 });
        } catch (e11) {
          return { errors: [e11] };
        }
      }
      var im = class {
        constructor(e10, t10, r10) {
          this.cookieSuffix = e10, this.clerkRequest = t10, this.initPublishableKeyValues(r10), this.initHeaderValues(), this.initCookieValues(), this.initHandshakeValues(), Object.assign(this, r10), this.clerkUrl = this.clerkRequest.clerkUrl;
        }
        get sessionToken() {
          return this.sessionTokenInCookie || this.sessionTokenInHeader;
        }
        usesSuffixedCookies() {
          let e10 = this.getSuffixedCookie(rS.Cookies.ClientUat), t10 = this.getCookie(rS.Cookies.ClientUat), r10 = this.getSuffixedCookie(rS.Cookies.Session) || "", n10 = this.getCookie(rS.Cookies.Session) || "";
          if (n10 && !this.tokenHasIssuer(n10)) return false;
          if (n10 && !this.tokenBelongsToInstance(n10)) return true;
          if (!e10 && !r10) return false;
          let { data: i10 } = t8(n10), s10 = i10?.payload.iat || 0, { data: a10 } = t8(r10), o2 = a10?.payload.iat || 0;
          if ("0" !== e10 && "0" !== t10 && s10 > o2 || "0" === e10 && "0" !== t10) return false;
          if ("production" !== this.instanceType) {
            let r11 = this.sessionExpired(a10);
            if ("0" !== e10 && "0" === t10 && r11) return false;
          }
          return !!e10 || !r10;
        }
        initPublishableKeyValues(e10) {
          tE(e10.publishableKey, { fatal: true }), this.publishableKey = e10.publishableKey;
          let t10 = tE(this.publishableKey, { fatal: true, proxyUrl: e10.proxyUrl, domain: e10.domain });
          this.instanceType = t10.instanceType, this.frontendApi = t10.frontendApi;
        }
        initHeaderValues() {
          this.sessionTokenInHeader = this.parseAuthorizationHeader(this.getHeader(rS.Headers.Authorization)), this.origin = this.getHeader(rS.Headers.Origin), this.host = this.getHeader(rS.Headers.Host), this.forwardedHost = this.getHeader(rS.Headers.ForwardedHost), this.forwardedProto = this.getHeader(rS.Headers.CloudFrontForwardedProto) || this.getHeader(rS.Headers.ForwardedProto), this.referrer = this.getHeader(rS.Headers.Referrer), this.userAgent = this.getHeader(rS.Headers.UserAgent), this.secFetchDest = this.getHeader(rS.Headers.SecFetchDest), this.accept = this.getHeader(rS.Headers.Accept);
        }
        initCookieValues() {
          this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(rS.Cookies.Session), this.refreshTokenInCookie = this.getSuffixedCookie(rS.Cookies.Refresh), this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(rS.Cookies.ClientUat) || "") || 0;
        }
        initHandshakeValues() {
          this.devBrowserToken = this.getQueryParam(rS.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(rS.Cookies.DevBrowser), this.handshakeToken = this.getQueryParam(rS.QueryParameters.Handshake) || this.getCookie(rS.Cookies.Handshake), this.handshakeRedirectLoopCounter = Number(this.getCookie(rS.Cookies.RedirectCount)) || 0, this.handshakeNonce = this.getQueryParam(rS.QueryParameters.HandshakeNonce) || this.getCookie(rS.Cookies.HandshakeNonce);
        }
        getQueryParam(e10) {
          return this.clerkRequest.clerkUrl.searchParams.get(e10);
        }
        getHeader(e10) {
          return this.clerkRequest.headers.get(e10) || void 0;
        }
        getCookie(e10) {
          return this.clerkRequest.cookies.get(e10) || void 0;
        }
        getSuffixedCookie(e10) {
          return this.getCookie(tO(e10, this.cookieSuffix)) || void 0;
        }
        getSuffixedOrUnSuffixedCookie(e10) {
          return this.usesSuffixedCookies() ? this.getSuffixedCookie(e10) : this.getCookie(e10);
        }
        parseAuthorizationHeader(e10) {
          if (!e10) return;
          let [t10, r10] = e10.split(" ", 2);
          return r10 ? "Bearer" === t10 ? r10 : void 0 : t10;
        }
        tokenHasIssuer(e10) {
          let { data: t10, errors: r10 } = t8(e10);
          return !r10 && !!t10.payload.iss;
        }
        tokenBelongsToInstance(e10) {
          if (!e10) return false;
          let { data: t10, errors: r10 } = t8(e10);
          if (r10) return false;
          let n10 = t10.payload.iss.replace(/https?:\/\//gi, "");
          return this.frontendApi === n10;
        }
        sessionExpired(e10) {
          return !!e10 && e10?.payload.exp <= (Date.now() / 1e3 | 0);
        }
      }, iy = async (e10, t10) => new im(t10.publishableKey ? await tx(t10.publishableKey, tK.crypto.subtle) : "", e10, t10), ib = (e10) => e10.split(";")[0]?.split("=")[0], iv = (e10) => e10.split(";")[0]?.split("=")[1];
      async function i_(e10, { key: t10 }) {
        let { data: r10, errors: n10 } = t8(e10);
        if (n10) throw n10[0];
        let { header: i10, payload: s10 } = r10, { typ: a10, alg: o2 } = i10;
        tZ(a10), t0(o2);
        let { data: l2, errors: c2 } = await t6(r10, t10);
        if (c2) throw new tH({ reason: tq.TokenVerificationFailed, message: `Error verifying handshake token. ${c2[0]}` });
        if (!l2) throw new tH({ reason: tq.TokenInvalidSignature, message: "Handshake signature is invalid." });
        return s10;
      }
      async function iw(e10, t10) {
        let r10, { secretKey: n10, apiUrl: i10, apiVersion: s10, jwksCacheTtlInMs: a10, jwtKey: o2, skipJwksCache: l2 } = t10, { data: c2, errors: u2 } = t8(e10);
        if (u2) throw u2[0];
        let { kid: d2 } = c2.header;
        if (o2) r10 = iu(o2);
        else if (n10) r10 = await id({ secretKey: n10, apiUrl: i10, apiVersion: s10, kid: d2, jwksCacheTtlInMs: a10, skipJwksCache: l2 });
        else throw new tH({ action: tB.SetClerkJWTKey, message: "Failed to resolve JWK during handshake verification.", reason: tq.JWKFailedToResolve });
        return await i_(e10, { key: r10 });
      }
      var iS = class {
        constructor(e10, t10, r10) {
          this.authenticateContext = e10, this.options = t10, this.organizationMatcher = r10, this.redirectLoopCounter = 0;
        }
        isRequestEligibleForHandshake() {
          let { accept: e10, secFetchDest: t10 } = this.authenticateContext;
          return !!("document" === t10 || "iframe" === t10 || !t10 && e10?.startsWith("text/html"));
        }
        buildRedirectToHandshake(e10) {
          if (!this.authenticateContext?.clerkUrl) throw Error("Missing clerkUrl in authenticateContext");
          let t10 = this.removeDevBrowserFromURL(this.authenticateContext.clerkUrl), r10 = this.authenticateContext.frontendApi.replace(/http(s)?:\/\//, ""), n10 = new URL(`https://${r10}/v1/client/handshake`);
          n10.searchParams.append("redirect_url", t10?.href || ""), n10.searchParams.append("__clerk_api_version", rv), n10.searchParams.append(rS.QueryParameters.SuffixedCookies, this.authenticateContext.usesSuffixedCookies().toString()), n10.searchParams.append(rS.QueryParameters.HandshakeReason, e10), "development" === this.authenticateContext.instanceType && this.authenticateContext.devBrowserToken && n10.searchParams.append(rS.QueryParameters.DevBrowser, this.authenticateContext.devBrowserToken);
          let i10 = this.getOrganizationSyncTarget(this.authenticateContext.clerkUrl, this.organizationMatcher);
          return i10 && this.getOrganizationSyncQueryParams(i10).forEach((e11, t11) => {
            n10.searchParams.append(t11, e11);
          }), new Headers({ [rS.Headers.Location]: n10.href });
        }
        async getCookiesFromHandshake() {
          let e10 = [];
          if (this.authenticateContext.handshakeNonce) try {
            let t10 = await this.authenticateContext.apiClient?.clients.getHandshakePayload({ nonce: this.authenticateContext.handshakeNonce });
            t10 && e10.push(...t10.directives);
          } catch (e11) {
            console.error("Clerk: HandshakeService: error getting handshake payload:", e11);
          }
          else if (this.authenticateContext.handshakeToken) {
            let t10 = await iw(this.authenticateContext.handshakeToken, this.authenticateContext);
            t10 && Array.isArray(t10.handshake) && e10.push(...t10.handshake);
          }
          return e10;
        }
        async resolveHandshake() {
          let e10 = new Headers({ "Access-Control-Allow-Origin": "null", "Access-Control-Allow-Credentials": "true" }), t10 = await this.getCookiesFromHandshake(), r10 = "";
          if (t10.forEach((t11) => {
            e10.append("Set-Cookie", t11), ib(t11).startsWith(rS.Cookies.Session) && (r10 = iv(t11));
          }), "development" === this.authenticateContext.instanceType) {
            let t11 = new URL(this.authenticateContext.clerkUrl);
            t11.searchParams.delete(rS.QueryParameters.Handshake), t11.searchParams.delete(rS.QueryParameters.HandshakeHelp), e10.append(rS.Headers.Location, t11.toString()), e10.set(rS.Headers.CacheControl, "no-store");
          }
          if ("" === r10) return n7(this.authenticateContext, n8.SessionTokenMissing, "", e10);
          let { data: n10, errors: [i10] = [] } = await ig(r10, this.authenticateContext);
          if (n10) return n9(this.authenticateContext, n10, e10, r10);
          if ("development" === this.authenticateContext.instanceType && (i10?.reason === tq.TokenExpired || i10?.reason === tq.TokenNotActiveYet || i10?.reason === tq.TokenIatInTheFuture)) {
            let t11 = new tH({ action: i10.action, message: i10.message, reason: i10.reason });
            t11.tokenCarrier = "cookie", console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${t11.getFullMessage()}`);
            let { data: n11, errors: [s10] = [] } = await ig(r10, { ...this.authenticateContext, clockSkewInMs: 864e5 });
            if (n11) return n9(this.authenticateContext, n11, e10, r10);
            throw Error(s10?.message || "Clerk: Handshake retry failed.");
          }
          throw Error(i10?.message || "Clerk: Handshake failed.");
        }
        handleTokenVerificationErrorInDevelopment(e10) {
          if (e10.reason === tq.TokenInvalidSignature) throw Error("Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.");
          throw Error(`Clerk: Handshake token verification failed: ${e10.getFullMessage()}.`);
        }
        checkAndTrackRedirectLoop(e10) {
          if (3 === this.redirectLoopCounter) return true;
          let t10 = this.redirectLoopCounter + 1, r10 = rS.Cookies.RedirectCount;
          return e10.append("Set-Cookie", `${r10}=${t10}; SameSite=Lax; HttpOnly; Max-Age=3`), false;
        }
        removeDevBrowserFromURL(e10) {
          let t10 = new URL(e10);
          return t10.searchParams.delete(rS.QueryParameters.DevBrowser), t10.searchParams.delete(rS.QueryParameters.LegacyDevBrowser), t10;
        }
        getOrganizationSyncTarget(e10, t10) {
          return t10.findTarget(e10);
        }
        getOrganizationSyncQueryParams(e10) {
          let t10 = /* @__PURE__ */ new Map();
          return "personalAccount" === e10.type && t10.set("organization_id", ""), "organization" === e10.type && (e10.organizationId && t10.set("organization_id", e10.organizationId), e10.organizationSlug && t10.set("organization_id", e10.organizationSlug)), t10;
        }
      }, iE = class {
        constructor(e10) {
          this.organizationPattern = this.createMatcher(e10?.organizationPatterns), this.personalAccountPattern = this.createMatcher(e10?.personalAccountPatterns);
        }
        createMatcher(e10) {
          if (!e10) return null;
          try {
            return function(e11, t10) {
              try {
                var r10, n10, i10, s10, a10, o2, l2;
                return r10 = void 0, n10 = [], i10 = e6(e11, n10, r10), s10 = n10, a10 = r10, void 0 === a10 && (a10 = {}), o2 = a10.decode, l2 = void 0 === o2 ? function(e12) {
                  return e12;
                } : o2, function(e12) {
                  var t11 = i10.exec(e12);
                  if (!t11) return false;
                  for (var r11 = t11[0], n11 = t11.index, a11 = /* @__PURE__ */ Object.create(null), o3 = 1; o3 < t11.length; o3++) !function(e13) {
                    if (void 0 !== t11[e13]) {
                      var r12 = s10[e13 - 1];
                      "*" === r12.modifier || "+" === r12.modifier ? a11[r12.name] = t11[e13].split(r12.prefix + r12.suffix).map(function(e14) {
                        return l2(e14, r12);
                      }) : a11[r12.name] = l2(t11[e13], r12);
                    }
                  }(o3);
                  return { path: r11, index: n11, params: a11 };
                };
              } catch (e12) {
                throw Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e12.message}`);
              }
            }(e10);
          } catch (t10) {
            throw Error(`Invalid pattern "${e10}": ${t10}`);
          }
        }
        findTarget(e10) {
          let t10 = this.findOrganizationTarget(e10);
          return t10 || this.findPersonalAccountTarget(e10);
        }
        findOrganizationTarget(e10) {
          if (!this.organizationPattern) return null;
          try {
            let t10 = this.organizationPattern(e10.pathname);
            if (!t10 || !("params" in t10)) return null;
            let r10 = t10.params;
            if (r10.id) return { type: "organization", organizationId: r10.id };
            if (r10.slug) return { type: "organization", organizationSlug: r10.slug };
            return null;
          } catch (e11) {
            return console.error("Failed to match organization pattern:", e11), null;
          }
        }
        findPersonalAccountTarget(e10) {
          if (!this.personalAccountPattern) return null;
          try {
            return this.personalAccountPattern(e10.pathname) ? { type: "personalAccount" } : null;
          } catch (e11) {
            return console.error("Failed to match personal account pattern:", e11), null;
          }
        }
      }, ik = { NonEligibleNoCookie: "non-eligible-no-refresh-cookie", NonEligibleNonGet: "non-eligible-non-get", InvalidSessionToken: "invalid-session-token", MissingApiClient: "missing-api-client", MissingSessionToken: "missing-session-token", MissingRefreshToken: "missing-refresh-token", ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed", ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim", FetchError: "fetch-error", UnexpectedSDKError: "unexpected-sdk-error", UnexpectedBAPIError: "unexpected-bapi-error" };
      async function iT(e10, t10) {
        let r10 = await iy(is(e10), t10);
        if (nl(r10.secretKey), r10.isSatellite) {
          var n10 = r10.signInUrl, i10 = r10.secretKey;
          if (!n10 && tT(i10)) throw Error("Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite");
          if (r10.signInUrl && r10.origin && function(e11, t11) {
            let r11;
            try {
              r11 = new URL(e11);
            } catch {
              throw Error("The signInUrl needs to have a absolute url format.");
            }
            if (r11.origin === t11) throw Error("The signInUrl needs to be on a different origin than your satellite application.");
          }(r10.signInUrl, r10.origin), !(r10.proxyUrl || r10.domain)) throw Error("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");
        }
        let s10 = new iE(t10.organizationSyncOptions), a10 = new iS(r10, { organizationSyncOptions: t10.organizationSyncOptions }, s10);
        async function o2(r11) {
          if (!t10.apiClient) return { data: null, error: { message: "An apiClient is needed to perform token refresh.", cause: { reason: ik.MissingApiClient } } };
          let { sessionToken: n11, refreshTokenInCookie: i11 } = r11;
          if (!n11) return { data: null, error: { message: "Session token must be provided.", cause: { reason: ik.MissingSessionToken } } };
          if (!i11) return { data: null, error: { message: "Refresh token must be provided.", cause: { reason: ik.MissingRefreshToken } } };
          let { data: s11, errors: a11 } = t8(n11);
          if (!s11 || a11) return { data: null, error: { message: "Unable to decode the expired session token.", cause: { reason: ik.ExpiredSessionTokenDecodeFailed, errors: a11 } } };
          if (!s11?.payload?.sid) return { data: null, error: { message: "Expired session token is missing the `sid` claim.", cause: { reason: ik.ExpiredSessionTokenMissingSidClaim } } };
          try {
            return { data: (await t10.apiClient.sessions.refreshSession(s11.payload.sid, { format: "cookie", suffixed_cookies: r11.usesSuffixedCookies(), expired_token: n11 || "", refresh_token: i11 || "", request_origin: r11.clerkUrl.origin, request_headers: Object.fromEntries(Array.from(e10.headers.entries()).map(([e11, t11]) => [e11, [t11]])) })).cookies, error: null };
          } catch (e11) {
            if (!e11?.errors?.length) return { data: null, error: { message: "Unexpected Server/BAPI error", cause: { reason: ik.UnexpectedBAPIError, errors: [e11] } } };
            if ("unexpected_error" === e11.errors[0].code) return { data: null, error: { message: "Fetch unexpected error", cause: { reason: ik.FetchError, errors: e11.errors } } };
            return { data: null, error: { message: e11.errors[0].code, cause: { reason: e11.errors[0].code, errors: e11.errors } } };
          }
        }
        async function l2(e11) {
          let { data: t11, error: r11 } = await o2(e11);
          if (!t11 || 0 === t11.length) return { data: null, error: r11 };
          let n11 = new Headers(), i11 = "";
          t11.forEach((e12) => {
            n11.append("Set-Cookie", e12), ib(e12).startsWith(rS.Cookies.Session) && (i11 = iv(e12));
          });
          let { data: s11, errors: a11 } = await ig(i11, e11);
          return a11 ? { data: null, error: { message: "Clerk: unable to verify refreshed session token.", cause: { reason: ik.InvalidSessionToken, errors: a11 } } } : { data: { jwtPayload: s11, sessionToken: i11, headers: n11 }, error: null };
        }
        function c2(e11, t11, r11, n11) {
          if (!a10.isRequestEligibleForHandshake()) return n7(e11, t11, r11);
          let i11 = n11 ?? a10.buildRedirectToHandshake(t11);
          return (i11.get(rS.Headers.Location) && i11.set(rS.Headers.CacheControl, "no-store"), a10.checkAndTrackRedirectLoop(i11)) ? (console.log("Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard."), n7(e11, t11, r11)) : function(e12, t12, r12 = "", n12) {
            return ie({ status: n6.Handshake, reason: t12, message: r12, publishableKey: e12.publishableKey || "", isSatellite: e12.isSatellite || false, domain: e12.domain || "", proxyUrl: e12.proxyUrl || "", signInUrl: e12.signInUrl || "", signUpUrl: e12.signUpUrl || "", afterSignInUrl: e12.afterSignInUrl || "", afterSignUpUrl: e12.afterSignUpUrl || "", isSignedIn: false, headers: n12, toAuth: () => null, token: null });
          }(e11, t11, r11, i11);
        }
        async function u2() {
          let { sessionTokenInHeader: e11 } = r10;
          try {
            let { data: t11, errors: n11 } = await ig(e11, r10);
            if (n11) throw n11[0];
            return n9(r10, t11, void 0, e11);
          } catch (e12) {
            return h2(e12, "header");
          }
        }
        async function d2() {
          let e11 = r10.clientUat, t11 = !!r10.sessionTokenInCookie, n11 = !!r10.devBrowserToken;
          if (r10.handshakeNonce || r10.handshakeToken) try {
            return await a10.resolveHandshake();
          } catch (e12) {
            e12 instanceof tH && "development" === r10.instanceType ? a10.handleTokenVerificationErrorInDevelopment(e12) : console.error("Clerk: unable to resolve handshake:", e12);
          }
          if ("development" === r10.instanceType && r10.clerkUrl.searchParams.has(rS.QueryParameters.DevBrowser)) return c2(r10, n8.DevBrowserSync, "");
          let i11 = r10.isSatellite && "document" === r10.secFetchDest;
          if ("production" === r10.instanceType && i11) return c2(r10, n8.SatelliteCookieNeedsSyncing, "");
          if ("development" === r10.instanceType && i11 && !r10.clerkUrl.searchParams.has(rS.QueryParameters.ClerkSynced)) {
            let e12 = new URL(r10.signInUrl);
            e12.searchParams.append(rS.QueryParameters.ClerkRedirectUrl, r10.clerkUrl.toString());
            let t12 = new Headers({ [rS.Headers.Location]: e12.toString() });
            return c2(r10, n8.SatelliteCookieNeedsSyncing, "", t12);
          }
          let o3 = new URL(r10.clerkUrl).searchParams.get(rS.QueryParameters.ClerkRedirectUrl);
          if ("development" === r10.instanceType && !r10.isSatellite && o3) {
            let e12 = new URL(o3);
            r10.devBrowserToken && e12.searchParams.append(rS.QueryParameters.DevBrowser, r10.devBrowserToken), e12.searchParams.append(rS.QueryParameters.ClerkSynced, "true");
            let t12 = new Headers({ [rS.Headers.Location]: e12.toString() });
            return c2(r10, n8.PrimaryRespondsToSyncing, "", t12);
          }
          if ("development" === r10.instanceType && !n11) return c2(r10, n8.DevBrowserMissing, "");
          if (!e11 && !t11) return n7(r10, n8.SessionTokenAndUATMissing, "");
          if (!e11 && t11) return c2(r10, n8.SessionTokenWithoutClientUAT, "");
          if (e11 && !t11) return c2(r10, n8.ClientUATWithoutSessionToken, "");
          let { data: l3, errors: u3 } = t8(r10.sessionTokenInCookie);
          if (u3) return h2(u3[0], "cookie");
          if (l3.payload.iat < r10.clientUat) return c2(r10, n8.SessionTokenIATBeforeClientUAT, "");
          try {
            let { data: e12, errors: t12 } = await ig(r10.sessionTokenInCookie, r10);
            if (t12) throw t12[0];
            let n12 = n9(r10, e12, void 0, r10.sessionTokenInCookie), i12 = function(e13, t13) {
              let r11 = s10.findTarget(e13.clerkUrl);
              if (!r11) return null;
              let n13 = false;
              if ("organization" === r11.type && (r11.organizationSlug && r11.organizationSlug !== t13.orgSlug && (n13 = true), r11.organizationId && r11.organizationId !== t13.orgId && (n13 = true)), "personalAccount" === r11.type && t13.orgId && (n13 = true), !n13) return null;
              if (e13.handshakeRedirectLoopCounter > 0) return console.warn("Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."), null;
              let i13 = c2(e13, n8.ActiveOrganizationMismatch, "");
              return "handshake" !== i13.status ? null : i13;
            }(r10, n12.toAuth());
            if (i12) return i12;
            return n12;
          } catch (e12) {
            return h2(e12, "cookie");
          }
        }
        async function h2(t11, n11) {
          let i11;
          if (!(t11 instanceof tH)) return n7(r10, n8.UnexpectedError);
          if (t11.reason === tq.TokenExpired && r10.refreshTokenInCookie && "GET" === e10.method) {
            let { data: e11, error: t12 } = await l2(r10);
            if (e11) return n9(r10, e11.jwtPayload, e11.headers, e11.sessionToken);
            i11 = t12?.cause?.reason ? t12.cause.reason : ik.UnexpectedSDKError;
          } else i11 = "GET" !== e10.method ? ik.NonEligibleNonGet : r10.refreshTokenInCookie ? null : ik.NonEligibleNoCookie;
          return (t11.tokenCarrier = n11, [tq.TokenExpired, tq.TokenNotActiveYet, tq.TokenIatInTheFuture].includes(t11.reason)) ? c2(r10, iO({ tokenError: t11.reason, refreshError: i11 }), t11.getFullMessage()) : n7(r10, t11.reason, t11.getFullMessage());
        }
        return r10.sessionTokenInHeader ? u2() : d2();
      }
      var ix = (e10) => {
        let { isSignedIn: t10, proxyUrl: r10, reason: n10, message: i10, publishableKey: s10, isSatellite: a10, domain: o2 } = e10;
        return { isSignedIn: t10, proxyUrl: r10, reason: n10, message: i10, publishableKey: s10, isSatellite: a10, domain: o2 };
      }, iO = ({ tokenError: e10, refreshError: t10 }) => {
        switch (e10) {
          case tq.TokenExpired:
            return `${n8.SessionTokenExpired}-refresh-${t10}`;
          case tq.TokenNotActiveYet:
            return n8.SessionTokenNBF;
          case tq.TokenIatInTheFuture:
            return n8.SessionTokenIatInTheFuture;
          default:
            return n8.UnexpectedError;
        }
      };
      function iC(e10, t10) {
        return Object.keys(e10).reduce((e11, r10) => ({ ...e11, [r10]: t10[r10] || e11[r10] }), { ...e10 });
      }
      var iR = { secretKey: "", jwtKey: "", apiUrl: void 0, apiVersion: void 0, proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", audience: "" }, iP = (e10, t10, r10, n10) => {
        if ("" === e10) return iI(t10.toString(), r10?.toString());
        let i10 = new URL(e10), s10 = r10 ? new URL(r10, i10) : void 0, a10 = new URL(t10, i10);
        return s10 && a10.searchParams.set("redirect_url", s10.toString()), n10 && i10.hostname !== a10.hostname && a10.searchParams.set(rS.QueryParameters.DevBrowser, n10), a10.toString();
      }, iI = (e10, t10) => {
        let r10;
        if (e10.startsWith("http")) r10 = new URL(e10);
        else {
          if (!t10 || !t10.startsWith("http")) throw Error("destination url or return back url should be an absolute path url!");
          let n10 = new URL(t10);
          r10 = new URL(e10, n10.origin);
        }
        return t10 && r10.searchParams.set("redirect_url", t10), r10.toString();
      }, iN = (e10) => {
        let { publishableKey: t10, redirectAdapter: r10, signInUrl: n10, signUpUrl: i10, baseUrl: s10, sessionStatus: a10 } = e10, o2 = tE(t10), l2 = o2?.frontendApi, c2 = o2?.instanceType === "development", u2 = function(e11) {
          if (!e11) return "";
          let t11 = e11.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.");
          return `https://${t11}`;
        }(l2), d2 = "pending" === a10, h2 = (t11, { returnBackUrl: n11 }) => r10(iP(s10, `${t11}/tasks`, n11, c2 ? e10.devBrowserToken : null));
        return { redirectToSignUp: ({ returnBackUrl: t11 } = {}) => {
          i10 || u2 || tD.throwMissingPublishableKeyError();
          let a11 = `${u2}/sign-up`, o3 = i10 || function(e11) {
            if (!e11) return;
            let t12 = new URL(e11, s10);
            return t12.pathname = `${t12.pathname}/create`, t12.toString();
          }(n10) || a11;
          return d2 ? h2(o3, { returnBackUrl: t11 }) : r10(iP(s10, o3, t11, c2 ? e10.devBrowserToken : null));
        }, redirectToSignIn: ({ returnBackUrl: t11 } = {}) => {
          n10 || u2 || tD.throwMissingPublishableKeyError();
          let i11 = `${u2}/sign-in`, a11 = n10 || i11;
          return d2 ? h2(a11, { returnBackUrl: t11 }) : r10(iP(s10, a11, t11, c2 ? e10.devBrowserToken : null));
        } };
      };
      r(821), r(167), r(830).s;
      var iA = r(159);
      let iU = "" + iA.s8 + ";404";
      iA.s8, iA.s8, r(792).X, r(280), "undefined" == typeof URLPattern || URLPattern, r(557), r(602), r(801), r(335), /* @__PURE__ */ new WeakMap();
      let iM = { Headers: { NextRewrite: "x-middleware-rewrite", NextResume: "x-middleware-next", NextRedirect: "Location", NextUrl: "next-url", NextAction: "next-action", NextjsData: "x-nextjs-data" } }, iD = (e10) => e10.headers.get(iM.Headers.NextRedirect), ij = (e10, t10, r10) => (e10.headers.set(t10, r10), e10);
      var iL = "__clerk_db_jwt", iq = (e10) => {
        let t10 = new URL(e10);
        return t10.searchParams.delete(iL), t10;
      }, iB = (e10) => {
        let t10 = new URL(e10);
        return t10.searchParams.delete("__dev_session"), t10.hash = decodeURI(t10.hash).replace(/__clerk_db_jwt\[(.*)\]/, ""), t10.href.endsWith("#") && (t10.hash = ""), t10;
      };
      let iH = (e10, t10, r10) => {
        let n10 = t10.headers.get("location");
        if ("true" === t10.headers.get(rS.Headers.ClerkRedirectTo) && n10 && tT(r10.secretKey) && e10.clerkUrl.isCrossOrigin(n10)) {
          let r11 = e10.cookies.get(iL) || "", i10 = function(e11, t11) {
            let r12 = new URL(e11), n11 = r12.searchParams.get(iL);
            r12.searchParams.delete(iL);
            let i11 = n11 || t11;
            return i11 && r12.searchParams.set(iL, i11), r12;
          }(new URL(n10), r11);
          return $.redirect(i10.href, t10);
        }
        return t10;
      }, iz = { rE: "15.3.2" }, i$ = (e10) => {
        if (!e10 || "string" != typeof e10) return e10;
        try {
          return (e10 || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
        } catch {
          return "";
        }
      }, iK = (e10) => (Array.isArray(e10) ? e10 : [e10]).map((e11) => "string" == typeof e11 ? i$(e11) : JSON.stringify(Object.fromEntries(Object.entries(e11).map(([e12, t10]) => [e12, i$(t10)])), null, 2)).join(", "), iJ = (e10, t10) => () => {
        let r10 = [], n10 = false;
        return { enable: () => {
          n10 = true;
        }, debug: (...e11) => {
          n10 && r10.push(e11.map((e12) => "function" == typeof e12 ? e12() : e12));
        }, commit: () => {
          if (n10) {
            var i10, s10;
            for (let n11 of (console.log((i10 = e10, `[clerk debug start: ${i10}]`)), r10)) {
              let e11 = t10(n11);
              e11 = e11.split("\n").map((e12) => `  ${e12}`).join("\n"), process.env.VERCEL && (e11 = function(e12, t11) {
                let r11 = new TextEncoder(), n12 = new TextDecoder("utf-8"), i11 = r11.encode(e12).slice(0, 4096);
                return n12.decode(i11).replace(/\uFFFD/g, "");
              }(e11, 4096)), console.log(e11);
            }
            console.log((s10 = e10, `[clerk debug end: ${s10}] (@clerk/nextjs=6.19.4,next=${iz.rE},timestamp=${Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)})`));
          }
        } };
      }, iW = (e10, t10) => (...r10) => {
        let n10 = ("string" == typeof e10 ? iJ(e10, iK) : e10)(), i10 = t10(n10);
        try {
          let e11 = i10(...r10);
          if ("object" == typeof e11 && "then" in e11 && "function" == typeof e11.then) return e11.then((e12) => (n10.commit(), e12)).catch((e12) => {
            throw n10.commit(), e12;
          });
          return n10.commit(), e11;
        } catch (e11) {
          throw n10.commit(), e11;
        }
      };
      function iF(e10, t10, r10) {
        return "function" == typeof e10 ? e10(t10) : void 0 !== e10 ? e10 : void 0 !== r10 ? r10 : void 0;
      }
      var iV = (e10) => {
        let t10 = (r10) => {
          if (!r10) return r10;
          if (Array.isArray(r10)) return r10.map((e11) => "object" == typeof e11 || Array.isArray(e11) ? t10(e11) : e11);
          let n10 = { ...r10 };
          for (let r11 of Object.keys(n10)) {
            let i10 = e10(r11.toString());
            i10 !== r11 && (n10[i10] = n10[r11], delete n10[r11]), "object" == typeof n10[i10] && (n10[i10] = t10(n10[i10]));
          }
          return n10;
        };
        return t10;
      };
      function iG(e10) {
        if ("boolean" == typeof e10) return e10;
        if (null == e10) return false;
        if ("string" == typeof e10) {
          if ("true" === e10.toLowerCase()) return true;
          if ("false" === e10.toLowerCase()) return false;
        }
        let t10 = parseInt(e10, 10);
        return !isNaN(t10) && t10 > 0;
      }
      iV(function(e10) {
        return e10 ? e10.replace(/[A-Z]/g, (e11) => `_${e11.toLowerCase()}`) : "";
      }), iV(function(e10) {
        return e10 ? e10.replace(/([-_][a-z])/g, (e11) => e11.toUpperCase().replace(/-|_/, "")) : "";
      }), process.env.NEXT_PUBLIC_CLERK_JS_VERSION, process.env.NEXT_PUBLIC_CLERK_JS_URL;
      let iX = process.env.CLERK_API_VERSION || "v1", iQ = process.env.CLERK_SECRET_KEY || "", iY = "pk_test_Y29tbXVuYWwtYWxwYWNhLTQ2LmNsZXJrLmFjY291bnRzLmRldiQ", iZ = process.env.CLERK_ENCRYPTION_KEY || "", i0 = process.env.CLERK_API_URL || ((e10) => {
        let t10 = tE(e10)?.frontendApi;
        return t10?.startsWith("clerk.") && ty.some((e11) => t10?.endsWith(e11)) ? tw : tv.some((e11) => t10?.endsWith(e11)) ? "https://api.lclclerk.com" : t_.some((e11) => t10?.endsWith(e11)) ? "https://api.clerkstage.dev" : tw;
      })(iY), i1 = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "", i2 = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "", i5 = iG(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false, i4 = "/sign-in", i3 = iG(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED), i6 = iG(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG), i8 = iG(process.env.NEXT_PUBLIC_CLERK_KEYLESS_DISABLED) || false, i9 = !(iz.rE.startsWith("13.") || iz.rE.startsWith("14.0")) && false, i7 = (e10) => {
        if (!(e10 instanceof Error) || !("message" in e10)) return false;
        let { message: t10 } = e10, r10 = t10.toLowerCase(), n10 = r10.includes("dynamic server usage"), i10 = r10.includes("this page needs to bail out of prerendering");
        return /Route .*? needs to bail out of prerendering at this point because it used .*?./.test(t10) || n10 || i10;
      };
      async function se() {
        try {
          let { headers: e10 } = await Promise.resolve().then(r.bind(r, 221)), t10 = await e10();
          return new L("https://placeholder.com", { headers: t10 });
        } catch (e10) {
          if (e10 && i7(e10)) throw e10;
          throw Error(`Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e10}`);
        }
      }
      var st = class {
        constructor() {
          to(this, sf), to(this, sh, "clerk_telemetry_throttler"), to(this, sp, 864e5);
        }
        isEventThrottled(e10) {
          if (!ta(this, sf, sy)) return false;
          let t10 = Date.now(), r10 = tc(this, sf, sg).call(this, e10), n10 = ta(this, sf, sm)?.[r10];
          if (!n10) {
            let e11 = { ...ta(this, sf, sm), [r10]: t10 };
            localStorage.setItem(ta(this, sh), JSON.stringify(e11));
          }
          if (n10 && t10 - n10 > ta(this, sp)) {
            let e11 = ta(this, sf, sm);
            delete e11[r10], localStorage.setItem(ta(this, sh), JSON.stringify(e11));
          }
          return !!n10;
        }
      };
      sh = /* @__PURE__ */ new WeakMap(), sp = /* @__PURE__ */ new WeakMap(), sf = /* @__PURE__ */ new WeakSet(), sg = function(e10) {
        let { sk: t10, pk: r10, payload: n10, ...i10 } = e10, s10 = { ...n10, ...i10 };
        return JSON.stringify(Object.keys({ ...n10, ...i10 }).sort().map((e11) => s10[e11]));
      }, sm = function() {
        let e10 = localStorage.getItem(ta(this, sh));
        return e10 ? JSON.parse(e10) : {};
      }, sy = function() {
        if ("undefined" == typeof window) return false;
        let e10 = window.localStorage;
        if (!e10) return false;
        try {
          let t10 = "test";
          return e10.setItem(t10, t10), e10.removeItem(t10), true;
        } catch (t10) {
          return t10 instanceof DOMException && ("QuotaExceededError" === t10.name || "NS_ERROR_DOM_QUOTA_REACHED" === t10.name) && e10.length > 0 && e10.removeItem(ta(this, sh)), false;
        }
      };
      var sr = { samplingRate: 1, maxBufferSize: 5, endpoint: "https://clerk-telemetry.com" }, sn = class {
        constructor(e10) {
          to(this, sE), to(this, sb), to(this, sv), to(this, s_, {}), to(this, sw, []), to(this, sS), tl(this, sb, { maxBufferSize: e10.maxBufferSize ?? sr.maxBufferSize, samplingRate: e10.samplingRate ?? sr.samplingRate, disabled: e10.disabled ?? false, debug: e10.debug ?? false, endpoint: sr.endpoint }), e10.clerkVersion || "undefined" != typeof window ? ta(this, s_).clerkVersion = e10.clerkVersion ?? "" : ta(this, s_).clerkVersion = "", ta(this, s_).sdk = e10.sdk, ta(this, s_).sdkVersion = e10.sdkVersion, ta(this, s_).publishableKey = e10.publishableKey ?? "";
          let t10 = tE(e10.publishableKey);
          t10 && (ta(this, s_).instanceType = t10.instanceType), e10.secretKey && (ta(this, s_).secretKey = e10.secretKey.substring(0, 16)), tl(this, sv, new st());
        }
        get isEnabled() {
          return !("development" !== ta(this, s_).instanceType || ta(this, sb).disabled || "undefined" != typeof process && iG(process.env.CLERK_TELEMETRY_DISABLED) || "undefined" != typeof window && window?.navigator?.webdriver);
        }
        get isDebug() {
          return ta(this, sb).debug || "undefined" != typeof process && iG(process.env.CLERK_TELEMETRY_DEBUG);
        }
        record(e10) {
          let t10 = tc(this, sE, sP).call(this, e10.event, e10.payload);
          tc(this, sE, sC).call(this, t10.event, t10), tc(this, sE, sk).call(this, t10, e10.eventSamplingRate) && (ta(this, sw).push(t10), tc(this, sE, sx).call(this));
        }
      };
      sb = /* @__PURE__ */ new WeakMap(), sv = /* @__PURE__ */ new WeakMap(), s_ = /* @__PURE__ */ new WeakMap(), sw = /* @__PURE__ */ new WeakMap(), sS = /* @__PURE__ */ new WeakMap(), sE = /* @__PURE__ */ new WeakSet(), sk = function(e10, t10) {
        return this.isEnabled && !this.isDebug && tc(this, sE, sT).call(this, e10, t10);
      }, sT = function(e10, t10) {
        let r10 = Math.random();
        return !!(r10 <= ta(this, sb).samplingRate && (void 0 === t10 || r10 <= t10)) && !ta(this, sv).isEventThrottled(e10);
      }, sx = function() {
        if ("undefined" == typeof window) return void tc(this, sE, sO).call(this);
        if (ta(this, sw).length >= ta(this, sb).maxBufferSize) {
          ta(this, sS) && ("undefined" != typeof cancelIdleCallback ? cancelIdleCallback : clearTimeout)(ta(this, sS)), tc(this, sE, sO).call(this);
          return;
        }
        ta(this, sS) || ("requestIdleCallback" in window ? tl(this, sS, requestIdleCallback(() => {
          tc(this, sE, sO).call(this);
        })) : tl(this, sS, setTimeout(() => {
          tc(this, sE, sO).call(this);
        }, 0)));
      }, sO = function() {
        fetch(new URL("/v1/event", ta(this, sb).endpoint), { method: "POST", body: JSON.stringify({ events: ta(this, sw) }), headers: { "Content-Type": "application/json" } }).catch(() => void 0).then(() => {
          tl(this, sw, []);
        }).catch(() => void 0);
      }, sC = function(e10, t10) {
        this.isDebug && (void 0 !== console.groupCollapsed ? (console.groupCollapsed("[clerk/telemetry]", e10), console.log(t10), console.groupEnd()) : console.log("[clerk/telemetry]", e10, t10));
      }, sR = function() {
        let e10 = { name: ta(this, s_).sdk, version: ta(this, s_).sdkVersion };
        return "undefined" != typeof window && window.Clerk && (e10 = { ...e10, ...window.Clerk.constructor.sdkMetadata }), e10;
      }, sP = function(e10, t10) {
        let r10 = tc(this, sE, sR).call(this);
        return { event: e10, cv: ta(this, s_).clerkVersion ?? "", it: ta(this, s_).instanceType ?? "", sdk: r10.name, sdkv: r10.version, ...ta(this, s_).publishableKey ? { pk: ta(this, s_).publishableKey } : {}, ...ta(this, s_).secretKey ? { sk: ta(this, s_).secretKey } : {}, payload: t10 };
      };
      let si = { secretKey: iQ, publishableKey: iY, apiUrl: i0, apiVersion: iX, userAgent: "@clerk/nextjs@6.19.4", proxyUrl: i2, domain: i1, isSatellite: i5, sdkMetadata: { name: "@clerk/nextjs", version: "6.19.4", environment: "production" }, telemetry: { disabled: i3, debug: i6 } }, ss = (e10) => function(e11) {
        let t10 = { ...e11 }, r10 = n5(t10), n10 = function(e12) {
          let t11 = iC(iR, e12.options), r11 = e12.apiClient;
          return { authenticateRequest: (e13, n11 = {}) => {
            let { apiUrl: i11, apiVersion: s10 } = t11, a10 = iC(t11, n11);
            return iT(e13, { ...n11, ...a10, apiUrl: i11, apiVersion: s10, apiClient: r11 });
          }, debugRequestState: ix };
        }({ options: t10, apiClient: r10 }), i10 = new sn({ ...e11.telemetry, publishableKey: t10.publishableKey, secretKey: t10.secretKey, samplingRate: 0.1, ...t10.sdkMetadata ? { sdk: t10.sdkMetadata.name, sdkVersion: t10.sdkMetadata.version } : {} });
        return { ...r10, ...n10, telemetry: i10 };
      }({ ...si, ...e10 });
      var sa = r(521);
      let so = /* @__PURE__ */ new Map(), sl = new sa.AsyncLocalStorage();
      var sc = /* @__PURE__ */ new Set(), su = { warnOnce: (e10) => {
        sc.has(e10) || (sc.add(e10), console.warn(e10));
      } };
      function sd(e10) {
        return /^http(s)?:\/\//.test(e10 || "");
      }
      var sh, sp, sf, sg, sm, sy, sb, sv, s_, sw, sS, sE, sk, sT, sx, sO, sC, sR, sP, sI, sN, sA, sU, sM, sD, sj, sL = Object.defineProperty, sq = (e10, t10, r10) => t10 in e10 ? sL(e10, t10, { enumerable: true, configurable: true, writable: true, value: r10 }) : e10[t10] = r10, sB = (null == (sI = "undefined" != typeof globalThis ? globalThis : void 0) ? void 0 : sI.crypto) || (null == (sN = void 0 !== r.g ? r.g : void 0) ? void 0 : sN.crypto) || (null == (sA = "undefined" != typeof window ? window : void 0) ? void 0 : sA.crypto) || (null == (sU = "undefined" != typeof self ? self : void 0) ? void 0 : sU.crypto) || (null == (sD = null == (sM = "undefined" != typeof frames ? frames : void 0) ? void 0 : sM[0]) ? void 0 : sD.crypto);
      sj = sB ? (e10) => {
        let t10 = [];
        for (let r10 = 0; r10 < e10; r10 += 4) t10.push(sB.getRandomValues(new Uint32Array(1))[0]);
        return new sz(t10, e10);
      } : (e10) => {
        let t10 = [], r10 = (e11) => {
          let t11 = e11, r11 = 987654321;
          return () => {
            let e12 = ((r11 = 36969 * (65535 & r11) + (r11 >> 16) | 0) << 16) + (t11 = 18e3 * (65535 & t11) + (t11 >> 16) | 0) | 0;
            return e12 /= 4294967296, (e12 += 0.5) * (Math.random() > 0.5 ? 1 : -1);
          };
        };
        for (let n10 = 0, i10; n10 < e10; n10 += 4) {
          let e11 = r10(4294967296 * (i10 || Math.random()));
          i10 = 987654071 * e11(), t10.push(4294967296 * e11() | 0);
        }
        return new sz(t10, e10);
      };
      var sH = class {
        static create(...e10) {
          return new this(...e10);
        }
        mixIn(e10) {
          return Object.assign(this, e10);
        }
        clone() {
          let e10 = new this.constructor();
          return Object.assign(e10, this), e10;
        }
      }, sz = class extends sH {
        constructor(e10 = [], t10 = 4 * e10.length) {
          super();
          let r10 = e10;
          if (r10 instanceof ArrayBuffer && (r10 = new Uint8Array(r10)), (r10 instanceof Int8Array || r10 instanceof Uint8ClampedArray || r10 instanceof Int16Array || r10 instanceof Uint16Array || r10 instanceof Int32Array || r10 instanceof Uint32Array || r10 instanceof Float32Array || r10 instanceof Float64Array) && (r10 = new Uint8Array(r10.buffer, r10.byteOffset, r10.byteLength)), r10 instanceof Uint8Array) {
            let e11 = r10.byteLength, t11 = [];
            for (let n10 = 0; n10 < e11; n10 += 1) t11[n10 >>> 2] |= r10[n10] << 24 - n10 % 4 * 8;
            this.words = t11, this.sigBytes = e11;
          } else this.words = e10, this.sigBytes = t10;
        }
        toString(e10 = s$) {
          return e10.stringify(this);
        }
        concat(e10) {
          let t10 = this.words, r10 = e10.words, n10 = this.sigBytes, i10 = e10.sigBytes;
          if (this.clamp(), n10 % 4) for (let e11 = 0; e11 < i10; e11 += 1) {
            let i11 = r10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
            t10[n10 + e11 >>> 2] |= i11 << 24 - (n10 + e11) % 4 * 8;
          }
          else for (let e11 = 0; e11 < i10; e11 += 4) t10[n10 + e11 >>> 2] = r10[e11 >>> 2];
          return this.sigBytes += i10, this;
        }
        clamp() {
          let { words: e10, sigBytes: t10 } = this;
          e10[t10 >>> 2] &= 4294967295 << 32 - t10 % 4 * 8, e10.length = Math.ceil(t10 / 4);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10.words = this.words.slice(0), e10;
        }
      };
      ((e10, t10, r10) => sq(e10, "symbol" != typeof t10 ? t10 + "" : t10, r10))(sz, "random", sj);
      var s$ = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, n10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          n10.push((r11 >>> 4).toString(16)), n10.push((15 & r11).toString(16));
        }
        return n10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let n10 = 0; n10 < t10; n10 += 2) r10[n10 >>> 3] |= parseInt(e10.substr(n10, 2), 16) << 24 - n10 % 8 * 4;
        return new sz(r10, t10 / 2);
      } }, sK = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, n10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          n10.push(String.fromCharCode(r11));
        }
        return n10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let n10 = 0; n10 < t10; n10 += 1) r10[n10 >>> 2] |= (255 & e10.charCodeAt(n10)) << 24 - n10 % 4 * 8;
        return new sz(r10, t10);
      } }, sJ = { stringify(e10) {
        try {
          return decodeURIComponent(escape(sK.stringify(e10)));
        } catch {
          throw Error("Malformed UTF-8 data");
        }
      }, parse: (e10) => sK.parse(unescape(encodeURIComponent(e10))) }, sW = class extends sH {
        constructor() {
          super(), this._minBufferSize = 0;
        }
        reset() {
          this._data = new sz(), this._nDataBytes = 0;
        }
        _append(e10) {
          let t10 = e10;
          "string" == typeof t10 && (t10 = sJ.parse(t10)), this._data.concat(t10), this._nDataBytes += t10.sigBytes;
        }
        _process(e10) {
          let t10, { _data: r10, blockSize: n10 } = this, i10 = r10.words, s10 = r10.sigBytes, a10 = s10 / (4 * n10), o2 = (a10 = e10 ? Math.ceil(a10) : Math.max((0 | a10) - this._minBufferSize, 0)) * n10, l2 = Math.min(4 * o2, s10);
          if (o2) {
            for (let e11 = 0; e11 < o2; e11 += n10) this._doProcessBlock(i10, e11);
            t10 = i10.splice(0, o2), r10.sigBytes -= l2;
          }
          return new sz(t10, l2);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._data = this._data.clone(), e10;
        }
      }, sF = class extends sW {
        constructor(e10) {
          super(), this.blockSize = 16, this.cfg = Object.assign(new sH(), e10), this.reset();
        }
        static _createHelper(e10) {
          return (t10, r10) => new e10(r10).finalize(t10);
        }
        static _createHmacHelper(e10) {
          return (t10, r10) => new sV(e10, r10).finalize(t10);
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        update(e10) {
          return this._append(e10), this._process(), this;
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      }, sV = class extends sH {
        constructor(e10, t10) {
          super();
          let r10 = new e10();
          this._hasher = r10;
          let n10 = t10;
          "string" == typeof n10 && (n10 = sJ.parse(n10));
          let i10 = r10.blockSize, s10 = 4 * i10;
          n10.sigBytes > s10 && (n10 = r10.finalize(t10)), n10.clamp();
          let a10 = n10.clone();
          this._oKey = a10;
          let o2 = n10.clone();
          this._iKey = o2;
          let l2 = a10.words, c2 = o2.words;
          for (let e11 = 0; e11 < i10; e11 += 1) l2[e11] ^= 1549556828, c2[e11] ^= 909522486;
          a10.sigBytes = s10, o2.sigBytes = s10, this.reset();
        }
        reset() {
          let e10 = this._hasher;
          e10.reset(), e10.update(this._iKey);
        }
        update(e10) {
          return this._hasher.update(e10), this;
        }
        finalize(e10) {
          let t10 = this._hasher, r10 = t10.finalize(e10);
          return t10.reset(), t10.finalize(this._oKey.clone().concat(r10));
        }
      }, sG = (e10, t10, r10) => {
        let n10 = [], i10 = 0;
        for (let s10 = 0; s10 < t10; s10 += 1) if (s10 % 4) {
          let t11 = r10[e10.charCodeAt(s10 - 1)] << s10 % 4 * 2 | r10[e10.charCodeAt(s10)] >>> 6 - s10 % 4 * 2;
          n10[i10 >>> 2] |= t11 << 24 - i10 % 4 * 8, i10 += 1;
        }
        return sz.create(n10, i10);
      }, sX = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, n10 = this._map;
        e10.clamp();
        let i10 = [];
        for (let e11 = 0; e11 < r10; e11 += 3) {
          let s11 = (t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255) << 16 | (t10[e11 + 1 >>> 2] >>> 24 - (e11 + 1) % 4 * 8 & 255) << 8 | t10[e11 + 2 >>> 2] >>> 24 - (e11 + 2) % 4 * 8 & 255;
          for (let t11 = 0; t11 < 4 && e11 + 0.75 * t11 < r10; t11 += 1) i10.push(n10.charAt(s11 >>> 6 * (3 - t11) & 63));
        }
        let s10 = n10.charAt(64);
        if (s10) for (; i10.length % 4; ) i10.push(s10);
        return i10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = this._map, n10 = this._reverseMap;
        if (!n10) {
          this._reverseMap = [], n10 = this._reverseMap;
          for (let e11 = 0; e11 < r10.length; e11 += 1) n10[r10.charCodeAt(e11)] = e11;
        }
        let i10 = r10.charAt(64);
        if (i10) {
          let r11 = e10.indexOf(i10);
          -1 !== r11 && (t10 = r11);
        }
        return sG(e10, t10, n10);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, sQ = [];
      for (let e10 = 0; e10 < 64; e10 += 1) sQ[e10] = 4294967296 * Math.abs(Math.sin(e10 + 1)) | 0;
      var sY = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (t10 & r10 | ~t10 & n10) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, sZ = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (t10 & n10 | r10 & ~n10) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, s0 = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (t10 ^ r10 ^ n10) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, s1 = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (r10 ^ (t10 | ~n10)) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, s2 = class extends sF {
        _doReset() {
          this._hash = new sz([1732584193, 4023233417, 2562383102, 271733878]);
        }
        _doProcessBlock(e10, t10) {
          for (let r11 = 0; r11 < 16; r11 += 1) {
            let n11 = t10 + r11, i11 = e10[n11];
            e10[n11] = (i11 << 8 | i11 >>> 24) & 16711935 | (i11 << 24 | i11 >>> 8) & 4278255360;
          }
          let r10 = this._hash.words, n10 = e10[t10 + 0], i10 = e10[t10 + 1], s10 = e10[t10 + 2], a10 = e10[t10 + 3], o2 = e10[t10 + 4], l2 = e10[t10 + 5], c2 = e10[t10 + 6], u2 = e10[t10 + 7], d2 = e10[t10 + 8], h2 = e10[t10 + 9], p2 = e10[t10 + 10], f2 = e10[t10 + 11], g2 = e10[t10 + 12], m2 = e10[t10 + 13], y2 = e10[t10 + 14], b2 = e10[t10 + 15], v2 = r10[0], _2 = r10[1], w2 = r10[2], S2 = r10[3];
          v2 = sY(v2, _2, w2, S2, n10, 7, sQ[0]), S2 = sY(S2, v2, _2, w2, i10, 12, sQ[1]), w2 = sY(w2, S2, v2, _2, s10, 17, sQ[2]), _2 = sY(_2, w2, S2, v2, a10, 22, sQ[3]), v2 = sY(v2, _2, w2, S2, o2, 7, sQ[4]), S2 = sY(S2, v2, _2, w2, l2, 12, sQ[5]), w2 = sY(w2, S2, v2, _2, c2, 17, sQ[6]), _2 = sY(_2, w2, S2, v2, u2, 22, sQ[7]), v2 = sY(v2, _2, w2, S2, d2, 7, sQ[8]), S2 = sY(S2, v2, _2, w2, h2, 12, sQ[9]), w2 = sY(w2, S2, v2, _2, p2, 17, sQ[10]), _2 = sY(_2, w2, S2, v2, f2, 22, sQ[11]), v2 = sY(v2, _2, w2, S2, g2, 7, sQ[12]), S2 = sY(S2, v2, _2, w2, m2, 12, sQ[13]), w2 = sY(w2, S2, v2, _2, y2, 17, sQ[14]), _2 = sY(_2, w2, S2, v2, b2, 22, sQ[15]), v2 = sZ(v2, _2, w2, S2, i10, 5, sQ[16]), S2 = sZ(S2, v2, _2, w2, c2, 9, sQ[17]), w2 = sZ(w2, S2, v2, _2, f2, 14, sQ[18]), _2 = sZ(_2, w2, S2, v2, n10, 20, sQ[19]), v2 = sZ(v2, _2, w2, S2, l2, 5, sQ[20]), S2 = sZ(S2, v2, _2, w2, p2, 9, sQ[21]), w2 = sZ(w2, S2, v2, _2, b2, 14, sQ[22]), _2 = sZ(_2, w2, S2, v2, o2, 20, sQ[23]), v2 = sZ(v2, _2, w2, S2, h2, 5, sQ[24]), S2 = sZ(S2, v2, _2, w2, y2, 9, sQ[25]), w2 = sZ(w2, S2, v2, _2, a10, 14, sQ[26]), _2 = sZ(_2, w2, S2, v2, d2, 20, sQ[27]), v2 = sZ(v2, _2, w2, S2, m2, 5, sQ[28]), S2 = sZ(S2, v2, _2, w2, s10, 9, sQ[29]), w2 = sZ(w2, S2, v2, _2, u2, 14, sQ[30]), _2 = sZ(_2, w2, S2, v2, g2, 20, sQ[31]), v2 = s0(v2, _2, w2, S2, l2, 4, sQ[32]), S2 = s0(S2, v2, _2, w2, d2, 11, sQ[33]), w2 = s0(w2, S2, v2, _2, f2, 16, sQ[34]), _2 = s0(_2, w2, S2, v2, y2, 23, sQ[35]), v2 = s0(v2, _2, w2, S2, i10, 4, sQ[36]), S2 = s0(S2, v2, _2, w2, o2, 11, sQ[37]), w2 = s0(w2, S2, v2, _2, u2, 16, sQ[38]), _2 = s0(_2, w2, S2, v2, p2, 23, sQ[39]), v2 = s0(v2, _2, w2, S2, m2, 4, sQ[40]), S2 = s0(S2, v2, _2, w2, n10, 11, sQ[41]), w2 = s0(w2, S2, v2, _2, a10, 16, sQ[42]), _2 = s0(_2, w2, S2, v2, c2, 23, sQ[43]), v2 = s0(v2, _2, w2, S2, h2, 4, sQ[44]), S2 = s0(S2, v2, _2, w2, g2, 11, sQ[45]), w2 = s0(w2, S2, v2, _2, b2, 16, sQ[46]), _2 = s0(_2, w2, S2, v2, s10, 23, sQ[47]), v2 = s1(v2, _2, w2, S2, n10, 6, sQ[48]), S2 = s1(S2, v2, _2, w2, u2, 10, sQ[49]), w2 = s1(w2, S2, v2, _2, y2, 15, sQ[50]), _2 = s1(_2, w2, S2, v2, l2, 21, sQ[51]), v2 = s1(v2, _2, w2, S2, g2, 6, sQ[52]), S2 = s1(S2, v2, _2, w2, a10, 10, sQ[53]), w2 = s1(w2, S2, v2, _2, p2, 15, sQ[54]), _2 = s1(_2, w2, S2, v2, i10, 21, sQ[55]), v2 = s1(v2, _2, w2, S2, d2, 6, sQ[56]), S2 = s1(S2, v2, _2, w2, b2, 10, sQ[57]), w2 = s1(w2, S2, v2, _2, c2, 15, sQ[58]), _2 = s1(_2, w2, S2, v2, m2, 21, sQ[59]), v2 = s1(v2, _2, w2, S2, o2, 6, sQ[60]), S2 = s1(S2, v2, _2, w2, f2, 10, sQ[61]), w2 = s1(w2, S2, v2, _2, s10, 15, sQ[62]), _2 = s1(_2, w2, S2, v2, h2, 21, sQ[63]), r10[0] = r10[0] + v2 | 0, r10[1] = r10[1] + _2 | 0, r10[2] = r10[2] + w2 | 0, r10[3] = r10[3] + S2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, n10 = 8 * e10.sigBytes;
          t10[n10 >>> 5] |= 128 << 24 - n10 % 32;
          let i10 = Math.floor(r10 / 4294967296);
          t10[(n10 + 64 >>> 9 << 4) + 15] = (i10 << 8 | i10 >>> 24) & 16711935 | (i10 << 24 | i10 >>> 8) & 4278255360, t10[(n10 + 64 >>> 9 << 4) + 14] = (r10 << 8 | r10 >>> 24) & 16711935 | (r10 << 24 | r10 >>> 8) & 4278255360, e10.sigBytes = (t10.length + 1) * 4, this._process();
          let s10 = this._hash, a10 = s10.words;
          for (let e11 = 0; e11 < 4; e11 += 1) {
            let t11 = a10[e11];
            a10[e11] = (t11 << 8 | t11 >>> 24) & 16711935 | (t11 << 24 | t11 >>> 8) & 4278255360;
          }
          return s10;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      };
      sF._createHelper(s2), sF._createHmacHelper(s2);
      var s5 = class extends sH {
        constructor(e10) {
          super(), this.cfg = Object.assign(new sH(), { keySize: 4, hasher: s2, iterations: 1 }, e10);
        }
        compute(e10, t10) {
          let r10, { cfg: n10 } = this, i10 = n10.hasher.create(), s10 = sz.create(), a10 = s10.words, { keySize: o2, iterations: l2 } = n10;
          for (; a10.length < o2; ) {
            r10 && i10.update(r10), r10 = i10.update(e10).finalize(t10), i10.reset();
            for (let e11 = 1; e11 < l2; e11 += 1) r10 = i10.finalize(r10), i10.reset();
            s10.concat(r10);
          }
          return s10.sigBytes = 4 * o2, s10;
        }
      }, s4 = class extends sW {
        constructor(e10, t10, r10) {
          super(), this.cfg = Object.assign(new sH(), r10), this._xformMode = e10, this._key = t10, this.reset();
        }
        static createEncryptor(e10, t10) {
          return this.create(this._ENC_XFORM_MODE, e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.create(this._DEC_XFORM_MODE, e10, t10);
        }
        static _createHelper(e10) {
          let t10 = (e11) => "string" == typeof e11 ? ar : at;
          return { encrypt: (r10, n10, i10) => t10(n10).encrypt(e10, r10, n10, i10), decrypt: (r10, n10, i10) => t10(n10).decrypt(e10, r10, n10, i10) };
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        process(e10) {
          return this._append(e10), this._process();
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      };
      s4._ENC_XFORM_MODE = 1, s4._DEC_XFORM_MODE = 2, s4.keySize = 4, s4.ivSize = 4;
      var s3 = class extends sH {
        constructor(e10, t10) {
          super(), this._cipher = e10, this._iv = t10;
        }
        static createEncryptor(e10, t10) {
          return this.Encryptor.create(e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.Decryptor.create(e10, t10);
        }
      };
      function s6(e10, t10, r10) {
        let n10, i10 = this._iv;
        i10 ? (n10 = i10, this._iv = void 0) : n10 = this._prevBlock;
        for (let i11 = 0; i11 < r10; i11 += 1) e10[t10 + i11] ^= n10[i11];
      }
      var s8 = class extends s3 {
      };
      s8.Encryptor = class extends s8 {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: n10 } = r10;
          s6.call(this, e10, t10, n10), r10.encryptBlock(e10, t10), this._prevBlock = e10.slice(t10, t10 + n10);
        }
      }, s8.Decryptor = class extends s8 {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: n10 } = r10, i10 = e10.slice(t10, t10 + n10);
          r10.decryptBlock(e10, t10), s6.call(this, e10, t10, n10), this._prevBlock = i10;
        }
      };
      var s9 = { pad(e10, t10) {
        let r10 = 4 * t10, n10 = r10 - e10.sigBytes % r10, i10 = n10 << 24 | n10 << 16 | n10 << 8 | n10, s10 = [];
        for (let e11 = 0; e11 < n10; e11 += 4) s10.push(i10);
        let a10 = sz.create(s10, n10);
        e10.concat(a10);
      }, unpad(e10) {
        let t10 = 255 & e10.words[e10.sigBytes - 1 >>> 2];
        e10.sigBytes -= t10;
      } }, s7 = class extends s4 {
        constructor(e10, t10, r10) {
          super(e10, t10, Object.assign({ mode: s8, padding: s9 }, r10)), this.blockSize = 4;
        }
        reset() {
          let e10;
          super.reset.call(this);
          let { cfg: t10 } = this, { iv: r10, mode: n10 } = t10;
          this._xformMode === this.constructor._ENC_XFORM_MODE ? e10 = n10.createEncryptor : (e10 = n10.createDecryptor, this._minBufferSize = 1), this._mode = e10.call(n10, this, r10 && r10.words), this._mode.__creator = e10;
        }
        _doProcessBlock(e10, t10) {
          this._mode.processBlock(e10, t10);
        }
        _doFinalize() {
          let e10, { padding: t10 } = this.cfg;
          return this._xformMode === this.constructor._ENC_XFORM_MODE ? (t10.pad(this._data, this.blockSize), e10 = this._process(true)) : (e10 = this._process(true), t10.unpad(e10)), e10;
        }
      }, ae = class extends sH {
        constructor(e10) {
          super(), this.mixIn(e10);
        }
        toString(e10) {
          return (e10 || this.formatter).stringify(this);
        }
      }, at = class extends sH {
        static encrypt(e10, t10, r10, n10) {
          let i10 = Object.assign(new sH(), this.cfg, n10), s10 = e10.createEncryptor(r10, i10), a10 = s10.finalize(t10), o2 = s10.cfg;
          return ae.create({ ciphertext: a10, key: r10, iv: o2.iv, algorithm: e10, mode: o2.mode, padding: o2.padding, blockSize: s10.blockSize, formatter: i10.format });
        }
        static decrypt(e10, t10, r10, n10) {
          let i10 = t10, s10 = Object.assign(new sH(), this.cfg, n10);
          return i10 = this._parse(i10, s10.format), e10.createDecryptor(r10, s10).finalize(i10.ciphertext);
        }
        static _parse(e10, t10) {
          return "string" == typeof e10 ? t10.parse(e10, this) : e10;
        }
      };
      at.cfg = Object.assign(new sH(), { format: { stringify(e10) {
        let t10, { ciphertext: r10, salt: n10 } = e10;
        return (n10 ? sz.create([1398893684, 1701076831]).concat(n10).concat(r10) : r10).toString(sX);
      }, parse(e10) {
        let t10, r10 = sX.parse(e10), n10 = r10.words;
        return 1398893684 === n10[0] && 1701076831 === n10[1] && (t10 = sz.create(n10.slice(2, 4)), n10.splice(0, 4), r10.sigBytes -= 16), ae.create({ ciphertext: r10, salt: t10 });
      } } });
      var ar = class extends at {
        static encrypt(e10, t10, r10, n10) {
          let i10 = Object.assign(new sH(), this.cfg, n10), s10 = i10.kdf.execute(r10, e10.keySize, e10.ivSize, i10.salt, i10.hasher);
          i10.iv = s10.iv;
          let a10 = at.encrypt.call(this, e10, t10, s10.key, i10);
          return a10.mixIn(s10), a10;
        }
        static decrypt(e10, t10, r10, n10) {
          let i10 = t10, s10 = Object.assign(new sH(), this.cfg, n10);
          i10 = this._parse(i10, s10.format);
          let a10 = s10.kdf.execute(r10, e10.keySize, e10.ivSize, i10.salt, s10.hasher);
          return s10.iv = a10.iv, at.decrypt.call(this, e10, i10, a10.key, s10);
        }
      };
      ar.cfg = Object.assign(at.cfg, { kdf: { execute(e10, t10, r10, n10, i10) {
        let s10, a10 = n10;
        a10 || (a10 = sz.random(8)), s10 = i10 ? s5.create({ keySize: t10 + r10, hasher: i10 }).compute(e10, a10) : s5.create({ keySize: t10 + r10 }).compute(e10, a10);
        let o2 = sz.create(s10.words.slice(t10), 4 * r10);
        return s10.sigBytes = 4 * t10, ae.create({ key: s10, iv: o2, salt: a10 });
      } } });
      var an = [], ai = [], as = [], aa = [], ao = [], al = [], ac = [], au = [], ad = [], ah = [], ap = [];
      for (let e10 = 0; e10 < 256; e10 += 1) e10 < 128 ? ap[e10] = e10 << 1 : ap[e10] = e10 << 1 ^ 283;
      var af = 0, ag = 0;
      for (let e10 = 0; e10 < 256; e10 += 1) {
        let e11 = ag ^ ag << 1 ^ ag << 2 ^ ag << 3 ^ ag << 4;
        e11 = e11 >>> 8 ^ 255 & e11 ^ 99, an[af] = e11, ai[e11] = af;
        let t10 = ap[af], r10 = ap[t10], n10 = ap[r10], i10 = 257 * ap[e11] ^ 16843008 * e11;
        as[af] = i10 << 24 | i10 >>> 8, aa[af] = i10 << 16 | i10 >>> 16, ao[af] = i10 << 8 | i10 >>> 24, al[af] = i10, i10 = 16843009 * n10 ^ 65537 * r10 ^ 257 * t10 ^ 16843008 * af, ac[e11] = i10 << 24 | i10 >>> 8, au[e11] = i10 << 16 | i10 >>> 16, ad[e11] = i10 << 8 | i10 >>> 24, ah[e11] = i10, af ? (af = t10 ^ ap[ap[ap[n10 ^ t10]]], ag ^= ap[ap[ag]]) : af = ag = 1;
      }
      var am = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], ay = class extends s7 {
        _doReset() {
          let e10;
          if (this._nRounds && this._keyPriorReset === this._key) return;
          this._keyPriorReset = this._key;
          let t10 = this._keyPriorReset, r10 = t10.words, n10 = t10.sigBytes / 4;
          this._nRounds = n10 + 6;
          let i10 = (this._nRounds + 1) * 4;
          this._keySchedule = [];
          let s10 = this._keySchedule;
          for (let t11 = 0; t11 < i10; t11 += 1) t11 < n10 ? s10[t11] = r10[t11] : (e10 = s10[t11 - 1], t11 % n10 ? n10 > 6 && t11 % n10 == 4 && (e10 = an[e10 >>> 24] << 24 | an[e10 >>> 16 & 255] << 16 | an[e10 >>> 8 & 255] << 8 | an[255 & e10]) : e10 = (an[(e10 = e10 << 8 | e10 >>> 24) >>> 24] << 24 | an[e10 >>> 16 & 255] << 16 | an[e10 >>> 8 & 255] << 8 | an[255 & e10]) ^ am[t11 / n10 | 0] << 24, s10[t11] = s10[t11 - n10] ^ e10);
          this._invKeySchedule = [];
          let a10 = this._invKeySchedule;
          for (let t11 = 0; t11 < i10; t11 += 1) {
            let r11 = i10 - t11;
            e10 = t11 % 4 ? s10[r11] : s10[r11 - 4], t11 < 4 || r11 <= 4 ? a10[t11] = e10 : a10[t11] = ac[an[e10 >>> 24]] ^ au[an[e10 >>> 16 & 255]] ^ ad[an[e10 >>> 8 & 255]] ^ ah[an[255 & e10]];
          }
        }
        encryptBlock(e10, t10) {
          this._doCryptBlock(e10, t10, this._keySchedule, as, aa, ao, al, an);
        }
        decryptBlock(e10, t10) {
          let r10 = e10[t10 + 1];
          e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10, this._doCryptBlock(e10, t10, this._invKeySchedule, ac, au, ad, ah, ai), r10 = e10[t10 + 1], e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10;
        }
        _doCryptBlock(e10, t10, r10, n10, i10, s10, a10, o2) {
          let l2 = this._nRounds, c2 = e10[t10] ^ r10[0], u2 = e10[t10 + 1] ^ r10[1], d2 = e10[t10 + 2] ^ r10[2], h2 = e10[t10 + 3] ^ r10[3], p2 = 4;
          for (let e11 = 1; e11 < l2; e11 += 1) {
            let e12 = n10[c2 >>> 24] ^ i10[u2 >>> 16 & 255] ^ s10[d2 >>> 8 & 255] ^ a10[255 & h2] ^ r10[p2];
            p2 += 1;
            let t11 = n10[u2 >>> 24] ^ i10[d2 >>> 16 & 255] ^ s10[h2 >>> 8 & 255] ^ a10[255 & c2] ^ r10[p2];
            p2 += 1;
            let o3 = n10[d2 >>> 24] ^ i10[h2 >>> 16 & 255] ^ s10[c2 >>> 8 & 255] ^ a10[255 & u2] ^ r10[p2];
            p2 += 1;
            let l3 = n10[h2 >>> 24] ^ i10[c2 >>> 16 & 255] ^ s10[u2 >>> 8 & 255] ^ a10[255 & d2] ^ r10[p2];
            p2 += 1, c2 = e12, u2 = t11, d2 = o3, h2 = l3;
          }
          let f2 = (o2[c2 >>> 24] << 24 | o2[u2 >>> 16 & 255] << 16 | o2[d2 >>> 8 & 255] << 8 | o2[255 & h2]) ^ r10[p2];
          p2 += 1;
          let g2 = (o2[u2 >>> 24] << 24 | o2[d2 >>> 16 & 255] << 16 | o2[h2 >>> 8 & 255] << 8 | o2[255 & c2]) ^ r10[p2];
          p2 += 1;
          let m2 = (o2[d2 >>> 24] << 24 | o2[h2 >>> 16 & 255] << 16 | o2[c2 >>> 8 & 255] << 8 | o2[255 & u2]) ^ r10[p2];
          p2 += 1;
          let y2 = (o2[h2 >>> 24] << 24 | o2[c2 >>> 16 & 255] << 16 | o2[u2 >>> 8 & 255] << 8 | o2[255 & d2]) ^ r10[p2];
          p2 += 1, e10[t10] = f2, e10[t10 + 1] = g2, e10[t10 + 2] = m2, e10[t10 + 3] = y2;
        }
      };
      ay.keySize = 8;
      var ab = s7._createHelper(ay), av = [], a_ = class extends sF {
        _doReset() {
          this._hash = new sz([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }
        _doProcessBlock(e10, t10) {
          let r10 = this._hash.words, n10 = r10[0], i10 = r10[1], s10 = r10[2], a10 = r10[3], o2 = r10[4];
          for (let r11 = 0; r11 < 80; r11 += 1) {
            if (r11 < 16) av[r11] = 0 | e10[t10 + r11];
            else {
              let e11 = av[r11 - 3] ^ av[r11 - 8] ^ av[r11 - 14] ^ av[r11 - 16];
              av[r11] = e11 << 1 | e11 >>> 31;
            }
            let l2 = (n10 << 5 | n10 >>> 27) + o2 + av[r11];
            r11 < 20 ? l2 += (i10 & s10 | ~i10 & a10) + 1518500249 : r11 < 40 ? l2 += (i10 ^ s10 ^ a10) + 1859775393 : r11 < 60 ? l2 += (i10 & s10 | i10 & a10 | s10 & a10) - 1894007588 : l2 += (i10 ^ s10 ^ a10) - 899497514, o2 = a10, a10 = s10, s10 = i10 << 30 | i10 >>> 2, i10 = n10, n10 = l2;
          }
          r10[0] = r10[0] + n10 | 0, r10[1] = r10[1] + i10 | 0, r10[2] = r10[2] + s10 | 0, r10[3] = r10[3] + a10 | 0, r10[4] = r10[4] + o2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, n10 = 8 * e10.sigBytes;
          return t10[n10 >>> 5] |= 128 << 24 - n10 % 32, t10[(n10 + 64 >>> 9 << 4) + 14] = Math.floor(r10 / 4294967296), t10[(n10 + 64 >>> 9 << 4) + 15] = r10, e10.sigBytes = 4 * t10.length, this._process(), this._hash;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      }, aw = (sF._createHelper(a_), sF._createHmacHelper(a_));
      let aS = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `, aE = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`, ak = `Clerk: Unable to decrypt request data.

Refresh the page if your .env file was just updated. If the issue persists, ensure the encryption key is valid and properly set.

For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)`, aT = tM({ packageName: "@clerk/nextjs" }), ax = "x-middleware-override-headers", aO = "x-middleware-request", aC = (e10, t10, r10) => {
        e10.headers.get(ax) || (e10.headers.set(ax, [...t10.headers.keys()]), t10.headers.forEach((t11, r11) => {
          e10.headers.set(`${aO}-${r11}`, t11);
        })), Object.entries(r10).forEach(([t11, r11]) => {
          e10.headers.set(ax, `${e10.headers.get(ax)},${t11}`), e10.headers.set(`${aO}-${t11}`, r11);
        });
      }, aR = (e10, t10) => {
        let r10, n10 = iF(null == t10 ? void 0 : t10.proxyUrl, e10.clerkUrl, i2);
        r10 = n10 && !sd(n10) ? new URL(n10, e10.clerkUrl).toString() : n10;
        let i10 = iF(t10.isSatellite, new URL(e10.url), i5), s10 = iF(t10.domain, new URL(e10.url), i1), a10 = (null == t10 ? void 0 : t10.signInUrl) || i4;
        if (i10 && !r10 && !s10) throw Error(aS);
        if (i10 && !sd(a10) && tT(t10.secretKey || iQ)) throw Error(aE);
        return { proxyUrl: r10, isSatellite: i10, domain: s10, signInUrl: a10 };
      }, aP = (e10) => $.redirect(e10, { headers: { [rS.Headers.ClerkRedirectTo]: "true" } }), aI = "clerk_keyless_dummy_key";
      function aN() {
        if (tR()) throw Error("Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)");
        throw Error(ak);
      }
      function aA(e10, t10) {
        return JSON.parse(ab.decrypt(e10, t10).toString(sJ));
      }
      let aU = async () => {
        var e10, t10;
        let r10;
        try {
          let e11 = await se(), t11 = function(e12, t12) {
            var r11, n11;
            return function(e13) {
              try {
                let { headers: t13, nextUrl: r12, cookies: n12 } = e13 || {};
                return "function" == typeof (null == t13 ? void 0 : t13.get) && "function" == typeof (null == r12 ? void 0 : r12.searchParams.get) && "function" == typeof (null == n12 ? void 0 : n12.get);
              } catch {
                return false;
              }
            }(e12) || function(e13) {
              try {
                let { headers: t13 } = e13 || {};
                return "function" == typeof (null == t13 ? void 0 : t13.get);
              } catch {
                return false;
              }
            }(e12) ? e12.headers.get(t12) : e12.headers[t12] || e12.headers[t12.toLowerCase()] || (null == (n11 = null == (r11 = e12.socket) ? void 0 : r11._httpMessage) ? void 0 : n11.getHeader(t12));
          }(e11, rS.Headers.ClerkRequestData);
          r10 = function(e12) {
            if (!e12) return {};
            let t12 = tR() ? iZ || iQ : iZ || iQ || aI;
            try {
              return aA(e12, t12);
            } catch {
              if (i9) try {
                return aA(e12, aI);
              } catch {
                aN();
              }
              aN();
            }
          }(t11);
        } catch (e11) {
          if (e11 && i7(e11)) throw e11;
        }
        let n10 = null != (t10 = null == (e10 = sl.getStore()) ? void 0 : e10.get("requestData")) ? t10 : r10;
        return (null == n10 ? void 0 : n10.secretKey) || (null == n10 ? void 0 : n10.publishableKey) ? ss(n10) : ss({});
      };
      class aM {
        static createDefaultDirectives() {
          return Object.entries(this.DEFAULT_DIRECTIVES).reduce((e10, [t10, r10]) => (e10[t10] = new Set(r10), e10), {});
        }
        static isKeyword(e10) {
          return this.KEYWORDS.has(e10.replace(/^'|'$/g, ""));
        }
        static formatValue(e10) {
          let t10 = e10.replace(/^'|'$/g, "");
          return this.isKeyword(t10) ? `'${t10}'` : e10;
        }
        static handleDirectiveValues(e10) {
          let t10 = /* @__PURE__ */ new Set();
          return e10.includes("'none'") || e10.includes("none") ? t10.add("'none'") : e10.forEach((e11) => t10.add(this.formatValue(e11))), t10;
        }
      }
      aM.KEYWORDS = /* @__PURE__ */ new Set(["none", "self", "strict-dynamic", "unsafe-eval", "unsafe-hashes", "unsafe-inline"]), aM.DEFAULT_DIRECTIVES = { "connect-src": ["self", "https://clerk-telemetry.com", "https://*.clerk-telemetry.com", "https://api.stripe.com", "https://maps.googleapis.com"], "default-src": ["self"], "form-action": ["self"], "frame-src": ["self", "https://challenges.cloudflare.com", "https://*.js.stripe.com", "https://js.stripe.com", "https://hooks.stripe.com"], "img-src": ["self", "https://img.clerk.com"], "script-src": ["self", "unsafe-inline", "https:", "http:", "https://*.js.stripe.com", "https://js.stripe.com", "https://maps.googleapis.com"], "style-src": ["self", "unsafe-inline"], "worker-src": ["self", "blob:"] };
      let aD = "__clerk_keys_";
      async function aj(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").slice(0, 16);
      }
      async function aL() {
        let e10 = process.env.PWD;
        if (!e10) return `${aD}0`;
        let t10 = e10.split("/").filter(Boolean).slice(-3).reverse().join("/"), r10 = await aj(t10);
        return `${aD}${r10}`;
      }
      async function aq(e10) {
        let t10;
        if (!i9) return;
        let r10 = await aL();
        try {
          r10 && (t10 = JSON.parse(e10(r10) || "{}"));
        } catch {
          t10 = void 0;
        }
        return t10;
      }
      let aB = { REDIRECT_TO_URL: "CLERK_PROTECT_REDIRECT_TO_URL", REDIRECT_TO_SIGN_IN: "CLERK_PROTECT_REDIRECT_TO_SIGN_IN", REDIRECT_TO_SIGN_UP: "CLERK_PROTECT_REDIRECT_TO_SIGN_UP" }, aH = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }, az = new Set(Object.values(aH)), a$ = "NEXT_REDIRECT";
      function aK(e10, t10, r10 = "replace", n10 = 307) {
        let i10 = Error(a$);
        throw i10.digest = `${a$};${r10};${e10};${n10};`, i10.clerk_digest = aB.REDIRECT_TO_URL, Object.assign(i10, t10), i10;
      }
      function aJ(e10, t10) {
        return null === t10 ? "" : t10 || e10;
      }
      function aW(e10) {
        if ("object" != typeof e10 || null === e10 || !("digest" in e10) || "string" != typeof e10.digest) return false;
        let t10 = e10.digest.split(";"), [r10, n10] = t10, i10 = t10.slice(2, -2).join(";"), s10 = Number(t10.at(-2));
        return r10 === a$ && ("replace" === n10 || "push" === n10) && "string" == typeof i10 && !isNaN(s10) && 307 === s10;
      }
      let aF = (e10) => {
        var t10, r10;
        return !!e10.headers.get(iM.Headers.NextUrl) && ((null == (t10 = e10.headers.get(rS.Headers.Accept)) ? void 0 : t10.includes("text/x-component")) || (null == (r10 = e10.headers.get(rS.Headers.ContentType)) ? void 0 : r10.includes("multipart/form-data")) || !!e10.headers.get(iM.Headers.NextAction));
      }, aV = (e10) => {
        var t10;
        return "document" === e10.headers.get(rS.Headers.SecFetchDest) || "iframe" === e10.headers.get(rS.Headers.SecFetchDest) || (null == (t10 = e10.headers.get(rS.Headers.Accept)) ? void 0 : t10.includes("text/html")) || aG(e10) || aQ(e10);
      }, aG = (e10) => !!e10.headers.get(iM.Headers.NextUrl) && !aF(e10) || aX(), aX = () => {
        let e10 = globalThis.fetch;
        if (!function(e11) {
          return "__nextPatched" in e11 && true === e11.__nextPatched;
        }(e10)) return false;
        let { page: t10, pagePath: r10 } = e10.__nextGetStaticStore().getStore() || {};
        return !!(r10 || t10);
      }, aQ = (e10) => !!e10.headers.get(iM.Headers.NextjsData), aY = (e10) => [e10[0] instanceof Request ? e10[0] : void 0, e10[0] instanceof Request ? e10[1] : void 0], aZ = (e10) => ["function" == typeof e10[0] ? e10[0] : void 0, (2 === e10.length ? e10[1] : "function" == typeof e10[0] ? {} : e10[0]) || {}], a0 = (e10) => "/clerk-sync-keyless" === e10.nextUrl.pathname, a1 = (e10) => {
        let t10 = e10.nextUrl.searchParams.get("returnUrl"), r10 = new URL(e10.url);
        return r10.pathname = "", $.redirect(t10 || r10.toString());
      }, a2 = (e10, t10) => ({ ...t10, ...aR(e10, t10) }), a5 = (e10) => (t10 = {}) => {
        !function(e11, t11) {
          aK(e11, { clerk_digest: aB.REDIRECT_TO_SIGN_IN, returnBackUrl: aJ(e11, t11) });
        }(e10.clerkUrl.toString(), t10.returnBackUrl);
      }, a4 = (e10) => (t10 = {}) => {
        !function(e11, t11) {
          aK(e11, { clerk_digest: aB.REDIRECT_TO_SIGN_UP, returnBackUrl: aJ(e11, t11) });
        }(e10.clerkUrl.toString(), t10.returnBackUrl);
      }, a3 = (e10, t10, r10) => async (n10, i10) => function(e11) {
        let { redirectToSignIn: t11, authObject: r11, redirect: n11, notFound: i11, request: s10 } = e11;
        return async (...e12) => {
          var a10, o2, l2, c2, u2, d2;
          let h2 = (null == (a10 = e12[0]) ? void 0 : a10.unauthenticatedUrl) || (null == (o2 = e12[0]) ? void 0 : o2.unauthorizedUrl) ? void 0 : e12[0], p2 = (null == (l2 = e12[0]) ? void 0 : l2.unauthenticatedUrl) || (null == (c2 = e12[1]) ? void 0 : c2.unauthenticatedUrl), f2 = (null == (u2 = e12[0]) ? void 0 : u2.unauthorizedUrl) || (null == (d2 = e12[1]) ? void 0 : d2.unauthorizedUrl), g2 = () => f2 ? n11(f2) : i11();
          return "pending" !== r11.sessionStatus && r11.userId ? h2 ? "function" == typeof h2 ? h2(r11.has) ? r11 : g2() : r11.has(h2) ? r11 : g2() : r11 : p2 ? n11(p2) : aV(s10) ? t11() : i11();
        };
      }({ request: e10, redirect: (e11) => aK(e11, { redirectUrl: e11 }), notFound: () => function() {
        let e11 = Object.defineProperty(Error(iU), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        throw e11.digest = iU, e11;
      }(), authObject: t10, redirectToSignIn: r10 })(n10, i10), a6 = (e10, t10, r10, n10) => {
        var i10;
        if (function(e11) {
          return "object" == typeof e11 && null !== e11 && "digest" in e11 && "NEXT_NOT_FOUND" === e11.digest || function(e12) {
            if (!function(e13) {
              if ("object" != typeof e13 || null === e13 || !("digest" in e13) || "string" != typeof e13.digest) return false;
              let [t12, r11] = e13.digest.split(";");
              return "NEXT_HTTP_ERROR_FALLBACK" === t12 && az.has(Number(r11));
            }(e12)) return;
            let [, t11] = e12.digest.split(";");
            return Number(t11);
          }(e11) === aH.NOT_FOUND;
        }(e10)) return ij($.rewrite(new URL(`/clerk_${Date.now()}`, r10.url)), rS.Headers.AuthReason, "protect-rewrite");
        let s10 = function(e11) {
          return !!aW(e11) && "clerk_digest" in e11 && e11.clerk_digest === aB.REDIRECT_TO_SIGN_IN;
        }(e10), a10 = function(e11) {
          return !!aW(e11) && "clerk_digest" in e11 && e11.clerk_digest === aB.REDIRECT_TO_SIGN_UP;
        }(e10);
        if (s10 || a10) {
          let r11 = iN({ redirectAdapter: aP, baseUrl: t10.clerkUrl, signInUrl: n10.signInUrl, signUpUrl: n10.signUpUrl, publishableKey: n10.publishableKey, sessionStatus: null == (i10 = n10.toAuth()) ? void 0 : i10.sessionStatus }), { returnBackUrl: a11 } = e10;
          return r11[s10 ? "redirectToSignIn" : "redirectToSignUp"]({ returnBackUrl: a11 });
        }
        if (aW(e10)) return aP(e10.redirectUrl);
        throw e10;
      }, a8 = ((e10) => {
        if ("function" == typeof e10) return (t11) => e10(t11);
        let t10 = e7(e10);
        return (e11) => t10(e11.nextUrl.pathname);
      })(["/sign-in(.*)", "/sign-up(.*)", "/", "/api/checkout(.*)", "/api/history(.*)", "/success"]), a9 = ((...e10) => {
        let [t10, r10] = aY(e10), [n10, i10] = aZ(e10);
        return sl.run(so, () => {
          let e11 = iW("clerkMiddleware", (e12) => async (t11, r11) => {
            var s11, a11;
            let o2 = "function" == typeof i10 ? await i10(t11) : i10, l2 = await aq((e13) => {
              var r12;
              return null == (r12 = t11.cookies.get(e13)) ? void 0 : r12.value;
            }), c2 = function(e13, t12) {
              return e13 || t12(), e13;
            }(o2.publishableKey || iY || (null == l2 ? void 0 : l2.publishableKey), () => aT.throwMissingPublishableKeyError()), u2 = function(e13, t12) {
              return e13 || t12(), e13;
            }(o2.secretKey || iQ || (null == l2 ? void 0 : l2.secretKey), () => aT.throwMissingSecretKeyError()), d2 = { publishableKey: c2, secretKey: u2, signInUrl: o2.signInUrl || i4, signUpUrl: o2.signUpUrl || "/sign-up", ...o2 };
            so.set("requestData", d2);
            let h2 = await aU();
            d2.debug && e12.enable();
            let p2 = is(t11);
            e12.debug("options", d2), e12.debug("url", () => p2.toJSON());
            let f2 = t11.headers.get(rS.Headers.Authorization);
            f2 && f2.startsWith("Basic ") && e12.debug("Basic Auth detected");
            let g2 = t11.headers.get(rS.Headers.ContentSecurityPolicy);
            g2 && e12.debug("Content-Security-Policy detected", () => ({ value: g2 }));
            let m2 = await h2.authenticateRequest(p2, a2(p2, d2));
            if (e12.debug("requestState", () => ({ status: m2.status, headers: JSON.stringify(Object.fromEntries(m2.headers)), reason: m2.reason })), m2.headers.get(rS.Headers.Location)) return new Response(null, { status: 307, headers: m2.headers });
            if (m2.status === n6.Handshake) throw Error("Clerk: handshake status without redirect");
            let y2 = m2.toAuth();
            e12.debug("auth", () => ({ auth: y2, debug: y2.debug() }));
            let b2 = a5(p2), v2 = a4(p2), _2 = await a3(p2, y2, b2), w2 = Object.assign(y2, { redirectToSignIn: b2, redirectToSignUp: v2 }), S2 = () => Promise.resolve(w2);
            S2.protect = _2;
            let E2 = $.next();
            try {
              E2 = await sl.run(so, async () => null == n10 ? void 0 : n10(S2, t11, r11)) || E2;
            } catch (e13) {
              E2 = a6(e13, p2, t11, m2);
            }
            if (d2.contentSecurityPolicy) {
              let { headers: t12 } = function(e13, t13) {
                var r12;
                let n11 = [], i11 = t13.strict ? function() {
                  let e14 = new Uint8Array(16);
                  return crypto.getRandomValues(e14), btoa(Array.from(e14, (e15) => String.fromCharCode(e15)).join(""));
                }() : void 0, s12 = function(e14, t14, r13, n12) {
                  let i12 = Object.entries(aM.DEFAULT_DIRECTIVES).reduce((e15, [t15, r14]) => (e15[t15] = new Set(r14), e15), {});
                  if (i12["connect-src"].add(t14), e14 && (i12["script-src"].delete("http:"), i12["script-src"].delete("https:"), i12["script-src"].add("'strict-dynamic'"), n12 && i12["script-src"].add(`'nonce-${n12}'`)), r13) {
                    let e15 = /* @__PURE__ */ new Map();
                    Object.entries(r13).forEach(([t15, r14]) => {
                      let n13 = Array.isArray(r14) ? r14 : [r14];
                      aM.DEFAULT_DIRECTIVES[t15] ? function(e16, t16, r15) {
                        if (r15.includes("'none'") || r15.includes("none")) {
                          e16[t16] = /* @__PURE__ */ new Set(["'none'"]);
                          return;
                        }
                        let n14 = /* @__PURE__ */ new Set();
                        e16[t16].forEach((e17) => {
                          n14.add(aM.formatValue(e17));
                        }), r15.forEach((e17) => {
                          n14.add(aM.formatValue(e17));
                        }), e16[t16] = n14;
                      }(i12, t15, n13) : function(e16, t16, r15) {
                        if (r15.includes("'none'") || r15.includes("none")) return e16.set(t16, /* @__PURE__ */ new Set(["'none'"]));
                        let n14 = /* @__PURE__ */ new Set();
                        r15.forEach((e17) => {
                          let t17 = aM.formatValue(e17);
                          n14.add(t17);
                        }), e16.set(t16, n14);
                      }(e15, t15, n13);
                    }), e15.forEach((e16, t15) => {
                      i12[t15] = e16;
                    });
                  }
                  return Object.entries(i12).sort(([e15], [t15]) => e15.localeCompare(t15)).map(([e15, t15]) => {
                    let r14 = Array.from(t15).map((e16) => ({ raw: e16, formatted: aM.formatValue(e16) }));
                    return `${e15} ${r14.map((e16) => e16.formatted).join(" ")}`;
                  }).join("; ");
                }(null != (r12 = t13.strict) && r12, e13, t13.directives, i11);
                return t13.reportTo && (s12 += "; report-to csp-endpoint", n11.push([rS.Headers.ReportingEndpoints, `csp-endpoint="${t13.reportTo}"`])), t13.reportOnly ? n11.push([rS.Headers.ContentSecurityPolicyReportOnly, s12]) : n11.push([rS.Headers.ContentSecurityPolicy, s12]), i11 && n11.push([rS.Headers.Nonce, i11]), { headers: n11 };
              }((null != (a11 = null == (s11 = tE(c2)) ? void 0 : s11.frontendApi) ? a11 : "").replace("$", ""), d2.contentSecurityPolicy);
              t12.forEach(([e13, t13]) => {
                ij(E2, e13, t13);
              }), e12.debug("Clerk generated CSP", () => ({ headers: t12 }));
            }
            if (m2.headers && m2.headers.forEach((t12, r12) => {
              r12 === rS.Headers.ContentSecurityPolicy && e12.debug("Content-Security-Policy detected", () => ({ value: t12 })), E2.headers.append(r12, t12);
            }), iD(E2)) return e12.debug("handlerResult is redirect"), iH(p2, E2, d2);
            d2.debug && aC(E2, p2, { [rS.Headers.EnableDebug]: "true" });
            let k2 = u2 === (null == l2 ? void 0 : l2.secretKey) ? { publishableKey: null == l2 ? void 0 : l2.publishableKey, secretKey: null == l2 ? void 0 : l2.secretKey } : {};
            return !function(e13, t12, r12, n11, i11) {
              let s12, { reason: a12, message: o3, status: l3, token: c3 } = r12;
              if (t12 || (t12 = $.next()), t12.headers.get(iM.Headers.NextRedirect)) return;
              "1" === t12.headers.get(iM.Headers.NextResume) && (t12.headers.delete(iM.Headers.NextResume), s12 = new URL(e13.url));
              let u3 = t12.headers.get(iM.Headers.NextRewrite);
              if (u3) {
                let t13 = new URL(e13.url);
                if ((s12 = new URL(u3)).origin !== t13.origin) return;
              }
              if (s12) {
                let r13 = function(e14, t13) {
                  var r14;
                  let n12 = (e15) => !e15 || !Object.values(e15).some((e16) => void 0 !== e16);
                  if (n12(e14) && n12(t13)) return;
                  if (e14.secretKey && !iZ) return void su.warnOnce("Clerk: Missing `CLERK_ENCRYPTION_KEY`. Required for propagating `secretKey` middleware option. See docs: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys");
                  let i12 = tR() ? iZ || (r14 = () => aT.throwMissingSecretKeyError(), iQ || r14(), iQ) : iZ || iQ || aI;
                  return ab.encrypt(JSON.stringify({ ...t13, ...e14 }), i12).toString();
                }(n11, i11);
                aC(t12, e13, { [rS.Headers.AuthStatus]: l3, [rS.Headers.AuthToken]: c3 || "", [rS.Headers.AuthSignature]: c3 ? aw(c3, (null == n11 ? void 0 : n11.secretKey) || iQ || i11.secretKey || "").toString() : "", [rS.Headers.AuthMessage]: o3 || "", [rS.Headers.AuthReason]: a12 || "", [rS.Headers.ClerkUrl]: e13.clerkUrl.toString(), ...r13 ? { [rS.Headers.ClerkRequestData]: r13 } : {} }), t12.headers.set(iM.Headers.NextRewrite, s12.href);
              }
            }(p2, E2, m2, o2, k2), E2;
          }), s10 = async (t11, r11) => {
            if (a0(t11)) return a1(t11);
            let n11 = "function" == typeof i10 ? await i10(t11) : i10, s11 = await aq((e12) => {
              var r12;
              return null == (r12 = t11.cookies.get(e12)) ? void 0 : r12.value;
            });
            if (!(n11.publishableKey || iY || (null == s11 ? void 0 : s11.publishableKey))) {
              let e12 = $.next();
              return aC(e12, t11, { [rS.Headers.AuthStatus]: "signed-out" }), e12;
            }
            return e11(t11, r11);
          }, a10 = async (t11, r11) => i9 ? s10(t11, r11) : e11(t11, r11);
          return t10 && r10 ? a10(t10, r10) : a10;
        });
      })(async (e10, t10) => {
        a8(t10) || await e10.protect();
      }), a7 = { matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"] };
      r(199);
      let oe = { ...i }, ot = oe.middleware || oe.default, or = "/src/middleware";
      if ("function" != typeof ot) throw Object.defineProperty(Error(`The Middleware "${or}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function on(e10) {
        return e5({ ...e10, page: or, handler: async (...e11) => {
          try {
            return await ot(...e11);
          } catch (i10) {
            let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
            throw await l(i10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), i10;
          }
        } });
      }
    }, 199: (e, t, r) => {
      "use strict";
      r.d(t, { p: () => s });
      var n = r(159), i = r(167);
      function s(e2) {
        return (0, i.nJ)(e2) || (0, n.RM)(e2);
      }
    }, 201: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return s;
      } });
      let n = new (r(521)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let s2 = i(e2, t2);
        return s2 ? n.run(s2, r2) : r2();
      }
      function a(e2, t2) {
        let r2 = n.getStore();
        return r2 || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 221: (e, t, r) => {
      "use strict";
      r.d(t, { headers: () => v }), r(818), r(725);
      var n = r(535), i = r(115), s = r(557), a = r(602), o = r(801), l = r(815);
      let c = { current: null }, u = "function" == typeof l.cache ? l.cache : (e2) => e2, d = console.warn;
      function h(e2) {
        return function(...t2) {
          d(e2(...t2));
        };
      }
      u((e2) => {
        try {
          d(c.current);
        } finally {
          c.current = null;
        }
      });
      var p = r(335);
      let f = /* @__PURE__ */ new WeakMap(), g = h(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E223", enumerable: false, configurable: true });
      });
      function m() {
        return this.getAll().map((e2) => [e2.name, e2]).values();
      }
      function y(e2) {
        for (let e3 of this.getAll()) this.delete(e3.name);
        return e2;
      }
      var b = r(381);
      function v() {
        let e2 = n.J.getStore(), t2 = i.FP.getStore();
        if (e2) {
          if (t2 && "after" === t2.phase && !(0, p.iC)()) throw Object.defineProperty(Error(`Route ${e2.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E367", enumerable: false, configurable: true });
          if (e2.forceStatic) return w(b.o.seal(new Headers({})));
          if (t2) {
            if ("cache" === t2.type) throw Object.defineProperty(Error(`Route ${e2.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E304", enumerable: false, configurable: true });
            else if ("unstable-cache" === t2.type) throw Object.defineProperty(Error(`Route ${e2.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E127", enumerable: false, configurable: true });
          }
          if (e2.dynamicShouldError) throw Object.defineProperty(new a.f(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E525", enumerable: false, configurable: true });
          if (t2) if ("prerender" === t2.type) {
            var r2 = e2.route, l2 = t2;
            let n2 = _.get(l2);
            if (n2) return n2;
            let i2 = (0, o.W)(l2.renderSignal, "`headers()`");
            return _.set(l2, i2), Object.defineProperties(i2, { append: { value: function() {
              let e3 = `\`headers().append(${S(arguments[0])}, ...)\``, t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, delete: { value: function() {
              let e3 = `\`headers().delete(${S(arguments[0])})\``, t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, get: { value: function() {
              let e3 = `\`headers().get(${S(arguments[0])})\``, t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, has: { value: function() {
              let e3 = `\`headers().has(${S(arguments[0])})\``, t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, set: { value: function() {
              let e3 = `\`headers().set(${S(arguments[0])}, ...)\``, t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, getSetCookie: { value: function() {
              let e3 = "`headers().getSetCookie()`", t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, forEach: { value: function() {
              let e3 = "`headers().forEach(...)`", t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, keys: { value: function() {
              let e3 = "`headers().keys()`", t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, values: { value: function() {
              let e3 = "`headers().values()`", t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, entries: { value: function() {
              let e3 = "`headers().entries()`", t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, [Symbol.iterator]: { value: function() {
              let e3 = "`headers()[Symbol.iterator]()`", t3 = k(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } } }), i2;
          } else "prerender-ppr" === t2.type ? (0, s.Ui)(e2.route, "headers", t2.dynamicTracking) : "prerender-legacy" === t2.type && (0, s.xI)("headers", e2, t2);
          (0, s.Pk)(e2, t2);
        }
        return w((0, i.XN)("headers").headers);
      }
      let _ = /* @__PURE__ */ new WeakMap();
      function w(e2) {
        let t2 = _.get(e2);
        if (t2) return t2;
        let r2 = Promise.resolve(e2);
        return _.set(e2, r2), Object.defineProperties(r2, { append: { value: e2.append.bind(e2) }, delete: { value: e2.delete.bind(e2) }, get: { value: e2.get.bind(e2) }, has: { value: e2.has.bind(e2) }, set: { value: e2.set.bind(e2) }, getSetCookie: { value: e2.getSetCookie.bind(e2) }, forEach: { value: e2.forEach.bind(e2) }, keys: { value: e2.keys.bind(e2) }, values: { value: e2.values.bind(e2) }, entries: { value: e2.entries.bind(e2) }, [Symbol.iterator]: { value: e2[Symbol.iterator].bind(e2) } }), r2;
      }
      function S(e2) {
        return "string" == typeof e2 ? `'${e2}'` : "...";
      }
      let E = h(k);
      function k(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E277", enumerable: false, configurable: true });
      }
      function T() {
        let e2 = workAsyncStorage.getStore(), t2 = workUnitAsyncStorage.getStore();
        switch ((!e2 || !t2) && throwForMissingRequestStore("draftMode"), t2.type) {
          case "request":
            return x(t2.draftMode, e2);
          case "cache":
          case "unstable-cache":
            let r2 = getDraftModeProviderForCacheScope(e2, t2);
            if (r2) return x(r2, e2);
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            return C(null);
          default:
            return t2;
        }
      }
      function x(e2, t2) {
        let r2, n2 = O.get(T);
        return n2 || (r2 = C(e2), O.set(e2, r2), r2);
      }
      r(16);
      let O = /* @__PURE__ */ new WeakMap();
      function C(e2) {
        let t2 = new R(e2), r2 = Promise.resolve(t2);
        return Object.defineProperty(r2, "isEnabled", { get: () => t2.isEnabled, set(e3) {
          Object.defineProperty(r2, "isEnabled", { value: e3, writable: true, enumerable: true });
        }, enumerable: true, configurable: true }), r2.enable = t2.enable.bind(t2), r2.disable = t2.disable.bind(t2), r2;
      }
      class R {
        constructor(e2) {
          this._provider = e2;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          I("draftMode().enable()"), null !== this._provider && this._provider.enable();
        }
        disable() {
          I("draftMode().disable()"), null !== this._provider && this._provider.disable();
        }
      }
      let P = h(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E377", enumerable: false, configurable: true });
      });
      function I(e2) {
        let t2 = workAsyncStorage.getStore(), r2 = workUnitAsyncStorage.getStore();
        if (t2) {
          if (r2) {
            if ("cache" === r2.type) throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E246", enumerable: false, configurable: true });
            else if ("unstable-cache" === r2.type) throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E259", enumerable: false, configurable: true });
            else if ("after" === r2.phase) throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E348", enumerable: false, configurable: true });
          }
          if (t2.dynamicShouldError) throw Object.defineProperty(new StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (r2) {
            if ("prerender" === r2.type) {
              let n2 = Object.defineProperty(Error(`Route ${t2.route} used ${e2} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", { value: "E126", enumerable: false, configurable: true });
              abortAndThrowOnSynchronousRequestDataAccess(t2.route, e2, n2, r2);
            } else if ("prerender-ppr" === r2.type) postponeWithTracking(t2.route, e2, r2.dynamicTracking);
            else if ("prerender-legacy" === r2.type) {
              r2.revalidate = 0;
              let n2 = Object.defineProperty(new DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
            }
          }
        }
      }
    }, 280: (e, t, r) => {
      var n;
      (() => {
        var i = { 226: function(i2, s2) {
          !function(a2, o) {
            "use strict";
            var l = "function", c = "undefined", u = "object", d = "string", h = "major", p = "model", f = "name", g = "type", m = "vendor", y = "version", b = "architecture", v = "console", _ = "mobile", w = "tablet", S = "smarttv", E = "wearable", k = "embedded", T = "Amazon", x = "Apple", O = "ASUS", C = "BlackBerry", R = "Browser", P = "Chrome", I = "Firefox", N = "Google", A = "Huawei", U = "Microsoft", M = "Motorola", D = "Opera", j = "Samsung", L = "Sharp", q = "Sony", B = "Xiaomi", H = "Zebra", z = "Facebook", $ = "Chromium OS", K = "Mac OS", J = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, W = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, F = function(e2, t2) {
              return typeof e2 === d && -1 !== V(t2).indexOf(V(e2));
            }, V = function(e2) {
              return e2.toLowerCase();
            }, G = function(e2, t2) {
              if (typeof e2 === d) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === c ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, n2, i3, s3, a3, c2, d2 = 0; d2 < t2.length && !a3; ) {
                var h2 = t2[d2], p2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < h2.length && !a3 && h2[r2]; ) if (a3 = h2[r2++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) c2 = a3[++n2], typeof (s3 = p2[i3]) === u && s3.length > 0 ? 2 === s3.length ? typeof s3[1] == l ? this[s3[0]] = s3[1].call(this, c2) : this[s3[0]] = s3[1] : 3 === s3.length ? typeof s3[1] !== l || s3[1].exec && s3[1].test ? this[s3[0]] = c2 ? c2.replace(s3[1], s3[2]) : void 0 : this[s3[0]] = c2 ? s3[1].call(this, c2, s3[2]) : void 0 : 4 === s3.length && (this[s3[0]] = c2 ? s3[3].call(this, c2.replace(s3[1], s3[2])) : o) : this[s3] = c2 || o;
                d2 += 2;
              }
            }, Q = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (F(t2[r2][n2], e2)) return "?" === r2 ? o : r2;
              } else if (F(t2[r2], e2)) return "?" === r2 ? o : r2;
              return e2;
            }, Y = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Z = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [y, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [y, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, y], [/opios[\/ ]+([\w\.]+)/i], [y, [f, D + " Mini"]], [/\bopr\/([\w\.]+)/i], [y, [f, D]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, y], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [y, [f, "UC" + R]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [y, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [y, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [y, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [y, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [y, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + R], y], [/\bfocus\/([\w\.]+)/i], [y, [f, I + " Focus"]], [/\bopt\/([\w\.]+)/i], [y, [f, D + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [y, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [y, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [y, [f, D + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [y, [f, "MIUI " + R]], [/fxios\/([-\w\.]+)/i], [y, [f, I]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + R]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + R], y], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], y], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, y], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, z], y], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, y], [/\bgsa\/([\w\.]+) .*safari\//i], [y, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [y, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [y, [f, P + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, P + " WebView"], y], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [y, [f, "Android " + R]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, y], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [y, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [y, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [y, Q, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, y], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], y], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [y, [f, I + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, y], [/(cobalt)\/([\w\.]+)/i], [f, [y, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[b, "amd64"]], [/(ia32(?=;))/i], [[b, V]], [/((?:i[346]|x)86)[;\)]/i], [[b, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[b, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[b, "armhf"]], [/windows (ce|mobile); ppc;/i], [[b, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[b, /ower/, "", V]], [/(sun4\w)[;\)]/i], [[b, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[b, V]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [m, j], [g, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [m, j], [g, _]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [m, x], [g, _]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [m, x], [g, w]], [/(macintosh);/i], [p, [m, x]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [m, L], [g, _]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [m, A], [g, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [m, A], [g, _]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, _]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [m, "OPPO"], [g, _]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [m, "Vivo"], [g, _]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [m, "Realme"], [g, _]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [m, M], [g, _]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [m, M], [g, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [m, "LG"], [g, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [m, "LG"], [g, _]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [m, "Lenovo"], [g, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [m, "Nokia"], [g, _]], [/(pixel c)\b/i], [p, [m, N], [g, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [m, N], [g, _]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [m, q], [g, _]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [m, q], [g, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [m, "OnePlus"], [g, _]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [m, T], [g, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [m, T], [g, _]], [/(playbook);[-\w\),; ]+(rim)/i], [p, m, [g, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [m, C], [g, _]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [m, O], [g, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [m, O], [g, _]], [/(nexus 9)/i], [p, [m, "HTC"], [g, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [p, /_/g, " "], [g, _]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [m, "Acer"], [g, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [m, "Meizu"], [g, _]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, p, [g, _]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, p, [g, w]], [/(surface duo)/i], [p, [m, U], [g, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [m, "Fairphone"], [g, _]], [/(u304aa)/i], [p, [m, "AT&T"], [g, _]], [/\bsie-(\w*)/i], [p, [m, "Siemens"], [g, _]], [/\b(rct\w+) b/i], [p, [m, "RCA"], [g, w]], [/\b(venue[\d ]{2,7}) b/i], [p, [m, "Dell"], [g, w]], [/\b(q(?:mv|ta)\w+) b/i], [p, [m, "Verizon"], [g, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [m, "Barnes & Noble"], [g, w]], [/\b(tm\d{3}\w+) b/i], [p, [m, "NuVision"], [g, w]], [/\b(k88) b/i], [p, [m, "ZTE"], [g, w]], [/\b(nx\d{3}j) b/i], [p, [m, "ZTE"], [g, _]], [/\b(gen\d{3}) b.+49h/i], [p, [m, "Swiss"], [g, _]], [/\b(zur\d{3}) b/i], [p, [m, "Swiss"], [g, w]], [/\b((zeki)?tb.*\b) b/i], [p, [m, "Zeki"], [g, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], p, [g, w]], [/\b(ns-?\w{0,9}) b/i], [p, [m, "Insignia"], [g, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [m, "NextBook"], [g, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], p, [g, _]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], p, [g, _]], [/\b(ph-1) /i], [p, [m, "Essential"], [g, _]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [m, "Envizen"], [g, w]], [/\b(trio[-\w\. ]+) b/i], [p, [m, "MachSpeed"], [g, w]], [/\btu_(1491) b/i], [p, [m, "Rotor"], [g, w]], [/(shield[\w ]+) b/i], [p, [m, "Nvidia"], [g, w]], [/(sprint) (\w+)/i], [m, p, [g, _]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [m, U], [g, _]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [m, H], [g, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [m, H], [g, _]], [/smart-tv.+(samsung)/i], [m, [g, S]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [m, j], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, S]], [/(apple) ?tv/i], [m, [p, x + " TV"], [g, S]], [/crkey/i], [[p, P + "cast"], [m, N], [g, S]], [/droid.+aft(\w)( bui|\))/i], [p, [m, T], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [m, L], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [p, [m, q], [g, S]], [/(mitv-\w{5}) bui/i], [p, [m, B], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [m, p, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, G], [p, G], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, p, [g, v]], [/droid.+; (shield) bui/i], [p, [m, "Nvidia"], [g, v]], [/(playstation [345portablevi]+)/i], [p, [m, q], [g, v]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [m, U], [g, v]], [/((pebble))app/i], [m, p, [g, E]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [m, x], [g, E]], [/droid.+; (glass) \d/i], [p, [m, N], [g, E]], [/droid.+; (wt63?0{2,3})\)/i], [p, [m, H], [g, E]], [/(quest( 2| pro)?)/i], [p, [m, z], [g, E]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, k]], [/(aeobc)\b/i], [p, [m, T], [g, k]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [g, _]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [g, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, _]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [y, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [y, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, y], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [y, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, y], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [y, Q, Y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [y, Q, Y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[y, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, K], [y, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [y, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, y], [/\(bb(10);/i], [y, [f, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [y, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [y, [f, I + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [y, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [y, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [y, [f, P + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, $], y], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, y], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], y], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, y]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = o), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof a2 !== c && a2.navigator ? a2.navigator : o, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : o, s3 = t2 ? J(Z, t2) : Z, v2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o, t3[y] = o, X.call(t3, n2, s3.browser), t3[h] = typeof (e3 = t3[y]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o, v2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[b] = o, X.call(e3, n2, s3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = o, e3[p] = o, e3[g] = o, X.call(e3, n2, s3.device), v2 && !e3[g] && i3 && i3.mobile && (e3[g] = _), v2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== c && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[g] = w), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o, e3[y] = o, X.call(e3, n2, s3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o, e3[y] = o, X.call(e3, n2, s3.os), v2 && !e3[f] && i3 && "Unknown" != i3.platform && (e3[f] = i3.platform.replace(/chrome os/i, $).replace(/macos/i, K)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? G(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = W([f, y, h]), ee.CPU = W([b]), ee.DEVICE = W([p, m, g, v, _, S, w, E, k]), ee.ENGINE = ee.OS = W([f, y]), typeof s2 !== c ? (i2.exports && (s2 = i2.exports = ee), s2.UAParser = ee) : r.amdO ? void 0 === (n = function() {
              return ee;
            }.call(t, r, t, e)) || (e.exports = n) : typeof a2 !== c && (a2.UAParser = ee);
            var et = typeof a2 !== c && (a2.jQuery || a2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, s = {};
        function a(e2) {
          var t2 = s[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = s[e2] = { exports: {} }, n2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, a), n2 = false;
          } finally {
            n2 && delete s[e2];
          }
          return r2.exports;
        }
        a.ab = "//", e.exports = a(226);
      })();
    }, 335: (e, t, r) => {
      "use strict";
      r.d(t, { iC: () => i }), r(602);
      var n = r(427);
      function i() {
        let e2 = n.Z.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }
    }, 356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 381: (e, t, r) => {
      "use strict";
      r.d(t, { o: () => s });
      var n = r(716);
      class i extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new i();
        }
      }
      class s extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, i2) {
            if ("symbol" == typeof r2) return n.l.get(t2, r2, i2);
            let s2 = r2.toLowerCase(), a = Object.keys(e2).find((e3) => e3.toLowerCase() === s2);
            if (void 0 !== a) return n.l.get(t2, a, i2);
          }, set(t2, r2, i2, s2) {
            if ("symbol" == typeof r2) return n.l.set(t2, r2, i2, s2);
            let a = r2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === a);
            return n.l.set(t2, o ?? r2, i2, s2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return n.l.has(t2, r2);
            let i2 = r2.toLowerCase(), s2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 !== s2 && n.l.has(t2, s2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return n.l.deleteProperty(t2, r2);
            let i2 = r2.toLowerCase(), s2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 === s2 || n.l.deleteProperty(t2, s2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return i.callable;
              default:
                return n.l.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new s(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 412: (e, t, r) => {
      "use strict";
      let n = r(9), { snakeCase: i } = r(74), s = {}.constructor;
      e.exports = function(e2, t2) {
        if (Array.isArray(e2)) {
          if (e2.some((e3) => e3.constructor !== s)) throw Error("obj must be array of plain objects");
        } else if (e2.constructor !== s) throw Error("obj must be an plain object");
        return n(e2, function(e3, r2) {
          var n2, s2, a, o, l;
          return [(n2 = t2.exclude, s2 = e3, n2.some(function(e4) {
            return "string" == typeof e4 ? e4 === s2 : e4.test(s2);
          })) ? e3 : i(e3, t2.parsingOptions), r2, (a = e3, o = r2, (l = t2).shouldRecurse ? { shouldRecurse: l.shouldRecurse(a, o) } : void 0)];
        }, t2 = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, t2));
      };
    }, 427: (e, t, r) => {
      "use strict";
      r.d(t, { Z: () => n });
      let n = (0, r(620).xl)();
    }, 521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 535: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => n });
      let n = (0, r(58).xl)();
    }, 552: (e, t, r) => {
      "use strict";
      var n = r(356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return s;
      } });
      let i = r(201), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: i2, headers: s2, body: a2, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(s2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, c = await a(o2, t2), u = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(c), next: { internal: true } });
        if (!u.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
        }
        let { status: p, headers: f, body: g } = d.response;
        return new Response(g ? n.from(g, "base64") : null, { status: p, headers: new Headers(f) });
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 554: (e, t) => {
      "use strict";
      t.qg = function(e2, t2) {
        let a = new r(), o = e2.length;
        if (o < 2) return a;
        let l = t2?.decode || s, c = 0;
        do {
          let t3 = e2.indexOf("=", c);
          if (-1 === t3) break;
          let r2 = e2.indexOf(";", c), s2 = -1 === r2 ? o : r2;
          if (t3 > s2) {
            c = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let u = n(e2, c, t3), d = i(e2, t3, u), h = e2.slice(u, d);
          if (void 0 === a[h]) {
            let r3 = n(e2, t3 + 1, s2), o2 = i(e2, s2, r3), c2 = l(e2.slice(r3, o2));
            a[h] = c2;
          }
          c = s2 + 1;
        } while (c < o);
        return a;
      }, Object.prototype.toString;
      let r = (() => {
        let e2 = function() {
        };
        return e2.prototype = /* @__PURE__ */ Object.create(null), e2;
      })();
      function n(e2, t2, r2) {
        do {
          let r3 = e2.charCodeAt(t2);
          if (32 !== r3 && 9 !== r3) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function i(e2, t2, r2) {
        for (; t2 > r2; ) {
          let r3 = e2.charCodeAt(--t2);
          if (32 !== r3 && 9 !== r3) return t2 + 1;
        }
        return r2;
      }
      function s(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 557: (e, t, r) => {
      "use strict";
      r.d(t, { t3: () => l, I3: () => d, Ui: () => c, xI: () => a, Pk: () => o });
      var n = r(815), i = r(16);
      r(602), r(115), r(535), r(801);
      let s = "function" == typeof n.unstable_postpone;
      function a(e2, t2, r2) {
        let n2 = Object.defineProperty(new i.F(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function o(e2, t2) {
        t2 && "cache" !== t2.type && "unstable-cache" !== t2.type && ("prerender" === t2.type || "prerender-legacy" === t2.type) && (t2.revalidate = 0);
      }
      function l(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let i2 = n2.dynamicTracking;
          i2 && null === i2.syncDynamicErrorWithStack && (i2.syncDynamicExpression = t2, i2.syncDynamicErrorWithStack = r2, true === n2.validating && (i2.syncDynamicLogged = true)), function(e3, t3, r3) {
            let n3 = p(`Route ${e3} needs to bail out of prerendering at this point because it used ${t3}.`);
            r3.controller.abort(n3);
            let i3 = r3.dynamicTracking;
            i3 && i3.dynamicAccesses.push({ stack: i3.isDebugDynamicAccesses ? Error().stack : void 0, expression: t3 });
          }(e2, t2, n2);
        }
        throw p(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function c(e2, t2, r2) {
        (function() {
          if (!s) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), n.unstable_postpone(u(e2, t2));
      }
      function u(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function d(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && h(e2.message);
      }
      function h(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === h(u("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      function p(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = "NEXT_PRERENDER_INTERRUPTED", t2;
      }
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 602: (e, t, r) => {
      "use strict";
      r.d(t, { f: () => n });
      class n extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 620: (e, t, r) => {
      "use strict";
      r.d(t, { cg: () => o, xl: () => a });
      let n = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let s = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return s ? new s() : new i();
      }
      function o(e2) {
        return s ? s.bind(e2) : i.bind(e2);
      }
    }, 716: (e, t, r) => {
      "use strict";
      r.d(t, { l: () => n });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 724: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, s = {};
      function a(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = o(e2), { domain: i2, expires: s2, httponly: a2, maxage: l2, path: d2, samesite: h2, secure: p, partitioned: f, priority: g } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m, y, b = { name: t2, value: decodeURIComponent(r2), domain: i2, ...s2 && { expires: new Date(s2) }, ...a2 && { httpOnly: true }, ..."string" == typeof l2 && { maxAge: Number(l2) }, path: d2, ...h2 && { sameSite: c.includes(m = (m = h2).toLowerCase()) ? m : void 0 }, ...p && { secure: true }, ...g && { priority: u.includes(y = (y = g).toLowerCase()) ? y : void 0 }, ...f && { partitioned: true } };
          let e3 = {};
          for (let t3 in b) b[t3] && (e3[t3] = b[t3]);
          return e3;
        }
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(s, { RequestCookies: () => d, ResponseCookies: () => h, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => a }), e.exports = ((e2, s2, a2, o2) => {
        if (s2 && "object" == typeof s2 || "function" == typeof s2) for (let l2 of n(s2)) i.call(e2, l2) || l2 === a2 || t(e2, l2, { get: () => s2[l2], enumerable: !(o2 = r(s2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), s);
      var c = ["strict", "lax", "none"], u = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => a(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => a(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, h = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, s2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, s2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (n3 = o2, o2 += 1, l2(), i3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (s2 = true, o2 = i3, a2.push(e4.substring(t3, n3)), t3 = o2) : o2 = n3 + 1;
              } else o2 += 1;
              (!s2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = a(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(a).join("; ");
        }
      };
    }, 725: (e, t, r) => {
      "use strict";
      r.d(t, { Ud: () => n.stringifyCookie, VO: () => n.ResponseCookies, tm: () => n.RequestCookies });
      var n = r(724);
    }, 792: (e, t, r) => {
      "use strict";
      r.d(t, { X: () => function e2(t2) {
        if ((0, s.p)(t2) || "object" == typeof t2 && null !== t2 && "digest" in t2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === t2.digest || (0, o.h)(t2) || (0, a.I3)(t2) || "object" == typeof t2 && null !== t2 && t2.$$typeof === i || (0, n.T)(t2)) throw t2;
        t2 instanceof Error && "cause" in t2 && e2(t2.cause);
      } });
      var n = r(801);
      let i = Symbol.for("react.postpone");
      var s = r(199), a = r(557), o = r(16);
    }, 801: (e, t, r) => {
      "use strict";
      function n(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === i;
      }
      r.d(t, { T: () => n, W: () => o });
      let i = "HANGING_PROMISE_REJECTION";
      class s extends Error {
        constructor(e2) {
          super(`During prerendering, ${e2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${e2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = e2, this.digest = i;
        }
      }
      let a = /* @__PURE__ */ new WeakMap();
      function o(e2, t2) {
        if (e2.aborted) return Promise.reject(new s(t2));
        {
          let r2 = new Promise((r3, n2) => {
            let i2 = n2.bind(null, new s(t2)), o2 = a.get(e2);
            if (o2) o2.push(i2);
            else {
              let t3 = [i2];
              a.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return r2.catch(l), r2;
        }
      }
      function l() {
      }
    }, 802: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function n2() {
          }
          function i2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function s(e3, t3, n3, s2, a2) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var o2 = new i2(n3, s2 || e3, a2), l = r2 ? r2 + t3 : t3;
            return e3._events[l] ? e3._events[l].fn ? e3._events[l] = [e3._events[l], o2] : e3._events[l].push(o2) : (e3._events[l] = o2, e3._eventsCount++), e3;
          }
          function a(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new n2() : delete e3._events[t3];
          }
          function o() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r2 = false)), o.prototype.eventNames = function() {
            var e3, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e3 = this._events) t2.call(e3, n3) && i3.push(r2 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e3)) : i3;
          }, o.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, s2 = n3.length, a2 = Array(s2); i3 < s2; i3++) a2[i3] = n3[i3].fn;
            return a2;
          }, o.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, o.prototype.emit = function(e3, t3, n3, i3, s2, a2) {
            var o2 = r2 ? r2 + e3 : e3;
            if (!this._events[o2]) return false;
            var l, c, u = this._events[o2], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e3, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, i3, s2), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, i3, s2, a2), true;
              }
              for (c = 1, l = Array(d - 1); c < d; c++) l[c - 1] = arguments[c];
              u.fn.apply(u.context, l);
            } else {
              var h, p = u.length;
              for (c = 0; c < p; c++) switch (u[c].once && this.removeListener(e3, u[c].fn, void 0, true), d) {
                case 1:
                  u[c].fn.call(u[c].context);
                  break;
                case 2:
                  u[c].fn.call(u[c].context, t3);
                  break;
                case 3:
                  u[c].fn.call(u[c].context, t3, n3);
                  break;
                case 4:
                  u[c].fn.call(u[c].context, t3, n3, i3);
                  break;
                default:
                  if (!l) for (h = 1, l = Array(d - 1); h < d; h++) l[h - 1] = arguments[h];
                  u[c].fn.apply(u[c].context, l);
              }
            }
            return true;
          }, o.prototype.on = function(e3, t3, r3) {
            return s(this, e3, t3, r3, false);
          }, o.prototype.once = function(e3, t3, r3) {
            return s(this, e3, t3, r3, true);
          }, o.prototype.removeListener = function(e3, t3, n3, i3) {
            var s2 = r2 ? r2 + e3 : e3;
            if (!this._events[s2]) return this;
            if (!t3) return a(this, s2), this;
            var o2 = this._events[s2];
            if (o2.fn) o2.fn !== t3 || i3 && !o2.once || n3 && o2.context !== n3 || a(this, s2);
            else {
              for (var l = 0, c = [], u = o2.length; l < u; l++) (o2[l].fn !== t3 || i3 && !o2[l].once || n3 && o2[l].context !== n3) && c.push(o2[l]);
              c.length ? this._events[s2] = 1 === c.length ? c[0] : c : a(this, s2);
            }
            return this;
          }, o.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && a(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r2, o.EventEmitter = o, e2.exports = o;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let n2 = 0, i2 = e3.length;
            for (; i2 > 0; ) {
              let s = i2 / 2 | 0, a = n2 + s;
              0 >= r2(e3[a], t3) ? (n2 = ++a, i2 -= s + 1) : i2 = s;
            }
            return n2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r2(574);
          class i2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r3);
              let i3 = n2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(i3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = i2;
        }, 816: (e2, t2, r2) => {
          let n2 = r2(213);
          class i2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let s = (e3, t3, r3) => new Promise((s2, a) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void s2(e3);
            let o = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  s2(r3());
                } catch (e4) {
                  a(e4);
                }
                return;
              }
              let n3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, o2 = r3 instanceof Error ? r3 : new i2(n3);
              "function" == typeof e3.cancel && e3.cancel(), a(o2);
            }, t3);
            n2(e3.then(s2, a), () => {
              clearTimeout(o);
            });
          });
          e2.exports = s, e2.exports.default = s, e2.exports.TimeoutError = i2;
        } }, r = {};
        function n(e2) {
          var i2 = r[e2];
          if (void 0 !== i2) return i2.exports;
          var s = r[e2] = { exports: {} }, a = true;
          try {
            t[e2](s, s.exports, n), a = false;
          } finally {
            a && delete r[e2];
          }
          return s.exports;
        }
        n.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true });
          let e2 = n(993), t2 = n(816), r2 = n(821), s = () => {
          }, a = new t2.TimeoutError();
          class o extends e2 {
            constructor(e3) {
              var t3, n2, i2, a2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = s, this._resolveIdle = s, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (n2 = null == (t3 = e3.intervalCap) ? void 0 : t3.toString()) ? n2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = s, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = s, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((n2, i2) => {
                let s2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let s3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && i2(a);
                    });
                    n2(await s3);
                  } catch (e4) {
                    i2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(s2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          i.default = o;
        })(), e.exports = i;
      })();
    }, 815: (e, t, r) => {
      "use strict";
      e.exports = r(35);
    }, 818: (e, t, r) => {
      "use strict";
      r.d(t, { Ck: () => l, K8: () => u, hm: () => d });
      var n = r(725), i = r(716), s = r(535), a = r(115);
      class o extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new o();
        }
      }
      class l {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return o.callable;
              default:
                return i.l.get(e3, t2, r2);
            }
          } });
        }
      }
      let c = Symbol.for("next.mutated.cookies");
      class u {
        static wrap(e2, t2) {
          let r2 = new n.VO(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let a2 = [], o2 = /* @__PURE__ */ new Set(), l2 = () => {
            let e3 = s.J.getStore();
            if (e3 && (e3.pathWasRevalidated = true), a2 = r2.getAll().filter((e4) => o2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of a2) {
                let r3 = new n.VO(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          }, u2 = new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case c:
                return a2;
              case "delete":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.delete(...t4), u2;
                  } finally {
                    l2();
                  }
                };
              case "set":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4), u2;
                  } finally {
                    l2();
                  }
                };
              default:
                return i.l.get(e3, t3, r3);
            }
          } });
          return u2;
        }
      }
      function d(e2) {
        let t2 = new Proxy(e2, { get(e3, r2, n2) {
          switch (r2) {
            case "delete":
              return function(...r3) {
                return h("cookies().delete"), e3.delete(...r3), t2;
              };
            case "set":
              return function(...r3) {
                return h("cookies().set"), e3.set(...r3), t2;
              };
            default:
              return i.l.get(e3, r2, n2);
          }
        } });
        return t2;
      }
      function h(e2) {
        if ("action" !== (0, a.XN)(e2).phase) throw new o();
      }
    }, 821: (e, t, r) => {
      "use strict";
      r.d(t, { Q: () => n });
      var n = function(e2) {
        return e2[e2.SeeOther = 303] = "SeeOther", e2[e2.TemporaryRedirect = 307] = "TemporaryRedirect", e2[e2.PermanentRedirect = 308] = "PermanentRedirect", e2;
      }({});
    }, 830: (e, t, r) => {
      "use strict";
      r.d(t, { s: () => n });
      let n = (0, r(58).xl)();
    }, 890: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, s = t2.split(n), a = (r2 || {}).decode || e2, o = 0; o < s.length; o++) {
              var l = s[o], c = l.indexOf("=");
              if (!(c < 0)) {
                var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, a));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, n2) {
            var s = n2 || {}, a = s.encode || r;
            if ("function" != typeof a) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var o = a(t2);
            if (o && !i.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != s.maxAge) {
              var c = s.maxAge - 0;
              if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(c);
            }
            if (s.domain) {
              if (!i.test(s.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + s.domain;
            }
            if (s.path) {
              if (!i.test(s.path)) throw TypeError("option path is invalid");
              l += "; Path=" + s.path;
            }
            if (s.expires) {
              if ("function" != typeof s.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + s.expires.toUTCString();
            }
            if (s.httpOnly && (l += "; HttpOnly"), s.secure && (l += "; Secure"), s.sameSite) switch ("string" == typeof s.sameSite ? s.sameSite.toLowerCase() : s.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 905: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let n = r(201), i = r(552);
      function s() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 956: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), i2 = r2(172), s2 = r2(930), a = "context", o = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(a, e3, s2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(a) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(a, s2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), i2 = r2(912), s2 = r2(957), a = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, a.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: s2.DiagLogLevel.INFO }) => {
                var n3, o2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let c = (0, a.getGlobal)("diag"), u = (0, i2.createLogLevelDiagLogger)(null != (o2 = r3.logLevel) ? o2 : s2.DiagLogLevel.INFO, e4);
                if (c && !r3.suppressOverrideMessage) {
                  let e5 = null != (l = Error().stack) ? l : "<failed to generate stacktrace>";
                  c.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a.registerGlobal)("diag", u, t4, true);
              }, t4.disable = () => {
                (0, a.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), i2 = r2(172), s2 = r2(930), a = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(a, e3, s2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(a) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(a, s2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), i2 = r2(874), s2 = r2(194), a = r2(277), o = r2(369), l = r2(930), c = "propagation", u = new i2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = a.getBaggage, this.getActiveBaggage = a.getActiveBaggage, this.setBaggage = a.setBaggage, this.deleteBaggage = a.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(c, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = s2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = s2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c) || u;
            }
          }
          t3.PropagationAPI = d;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), i2 = r2(846), s2 = r2(139), a = r2(607), o = r2(930), l = "trace";
          class c {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = s2.wrapSpanContext, this.isSpanContextValid = s2.isSpanContextValid, this.deleteSpan = a.deleteSpan, this.getSpan = a.getSpan, this.getActiveSpan = a.getActiveSpan, this.getSpanContext = a.getSpanContext, this.setSpan = a.setSpan, this.setSpanContext = a.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = c;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function s2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = s2, t3.getActiveBaggage = function() {
            return s2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), i2 = r2(993), s2 = r2(830), a = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: s2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0, t3.context = r2(491).ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class i2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0, t3.diag = r2(930).DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return s2("debug", this._namespace, e3);
            }
            error(...e3) {
              return s2("error", this._namespace, e3);
            }
            info(...e3) {
              return s2("info", this._namespace, e3);
            }
            warn(...e3) {
              return s2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return s2("verbose", this._namespace, e3);
            }
          }
          function s2(e3, t4, r3) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), i2 = r2(521), s2 = r2(130), a = i2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${a}`), l = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var s3;
            let a2 = l[o] = null != (s3 = l[o]) ? s3 : { version: i2.VERSION };
            if (!n3 && a2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (a2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${a2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return a2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null == (t4 = l[o]) ? void 0 : t4.version;
            if (n3 && (0, s2.isCompatible)(n3)) return null == (r3 = l[o]) ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = l[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function s2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let s3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != s3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function a(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return a(e4);
              let o = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != o.prerelease || s3.major !== o.major) return a(e4);
              if (0 === s3.major) return s3.minor === o.minor && s3.patch <= o.patch ? (t4.add(e4), true) : a(e4);
              return s3.minor <= o.minor ? (t4.add(e4), true) : a(e4);
            };
          }
          t3._makeCompatibilityCheck = s2, t3.isCompatible = s2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0, t3.metrics = r2(653).MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class s2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = s2;
          class a extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = a;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class l extends o {
          }
          t3.NoopObservableCounterMetric = l;
          class c extends o {
          }
          t3.NoopObservableGaugeMetric = c;
          class u extends o {
          }
          t3.NoopObservableUpDownCounterMetric = u, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new a(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new s2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new c(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0, t3.propagation = r2(181).PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0, t3.trace = r2(997).TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class i2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), i2 = r2(607), s2 = r2(403), a = r2(139), o = n2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = o.active()) {
              var n3;
              if (null == t4 ? void 0 : t4.root) return new s2.NonRecordingSpan();
              let l2 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, a.isSpanContextValid)(l2) ? new s2.NonRecordingSpan(l2) : new s2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let s3, a2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (s3 = t4, l2 = r3) : (s3 = t4, a2 = r3, l2 = n3);
              let c = null != a2 ? a2 : o.active(), u = this.startSpan(e3, s3, c), d = (0, i2.setSpan)(c, u);
              return o.with(d, l2, void 0, u);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class s2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t4, r3)) ? i3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = s2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), i2 = r2(403), s2 = r2(491), a = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(a) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(a, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(s2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(a);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null == (t4 = o(e3)) ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let s2 = r3.slice(0, i3), a = r3.slice(i3 + 1, t4.length);
                  (0, n2.validateKey)(s2) && (0, n2.validateValue)(a) && e4.set(s2, a);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, s2 = RegExp(`^(?:${n2}|${i2})$`), a = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return s2.test(e3);
          }, t3.validateValue = function(e3) {
            return a.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), i2 = r2(403), s2 = /^([0-9a-f]{32})$/i, a = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return s2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return a.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function i(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var s2 = n[e2] = { exports: {} }, a = true;
          try {
            t2[e2].call(s2.exports, s2, s2.exports, i), a = false;
          } finally {
            a && delete n[e2];
          }
          return s2.exports;
        }
        i.ab = "//";
        var s = {};
        (() => {
          Object.defineProperty(s, "__esModule", { value: true }), s.trace = s.propagation = s.metrics = s.diag = s.context = s.INVALID_SPAN_CONTEXT = s.INVALID_TRACEID = s.INVALID_SPANID = s.isValidSpanId = s.isValidTraceId = s.isSpanContextValid = s.createTraceState = s.TraceFlags = s.SpanStatusCode = s.SpanKind = s.SamplingDecision = s.ProxyTracerProvider = s.ProxyTracer = s.defaultTextMapSetter = s.defaultTextMapGetter = s.ValueType = s.createNoopMeter = s.DiagLogLevel = s.DiagConsoleLogger = s.ROOT_CONTEXT = s.createContextKey = s.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(s, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(s, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(s, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(s, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = i(957);
          Object.defineProperty(s, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var a = i(102);
          Object.defineProperty(s, "createNoopMeter", { enumerable: true, get: function() {
            return a.createNoopMeter;
          } });
          var o = i(901);
          Object.defineProperty(s, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = i(194);
          Object.defineProperty(s, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(s, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var c = i(125);
          Object.defineProperty(s, "ProxyTracer", { enumerable: true, get: function() {
            return c.ProxyTracer;
          } });
          var u = i(846);
          Object.defineProperty(s, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var d = i(996);
          Object.defineProperty(s, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var h = i(357);
          Object.defineProperty(s, "SpanKind", { enumerable: true, get: function() {
            return h.SpanKind;
          } });
          var p = i(847);
          Object.defineProperty(s, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = i(475);
          Object.defineProperty(s, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = i(98);
          Object.defineProperty(s, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(s, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(s, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(s, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var y = i(476);
          Object.defineProperty(s, "INVALID_SPANID", { enumerable: true, get: function() {
            return y.INVALID_SPANID;
          } }), Object.defineProperty(s, "INVALID_TRACEID", { enumerable: true, get: function() {
            return y.INVALID_TRACEID;
          } }), Object.defineProperty(s, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return y.INVALID_SPAN_CONTEXT;
          } });
          let b = i(67);
          Object.defineProperty(s, "context", { enumerable: true, get: function() {
            return b.context;
          } });
          let v = i(506);
          Object.defineProperty(s, "diag", { enumerable: true, get: function() {
            return v.diag;
          } });
          let _ = i(886);
          Object.defineProperty(s, "metrics", { enumerable: true, get: function() {
            return _.metrics;
          } });
          let w = i(939);
          Object.defineProperty(s, "propagation", { enumerable: true, get: function() {
            return w.propagation;
          } });
          let S = i(845);
          Object.defineProperty(s, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), s.default = { context: b.context, diag: v.diag, metrics: _.metrics, propagation: w.propagation, trace: S.trace };
        })(), e.exports = s;
      })();
    } }, (e) => {
      var t = e(e.s = 183);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|.*\\..*).*))(\\.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil }, fn) {
  return globalThis.__openNextAls.run({
    requestId: Math.random().toString(36),
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "protocol": "https", "hostname": "media.fortniteapi.io" }, { "protocol": "https", "hostname": "placehold.co" }, { "protocol": "https", "hostname": "fakeimg.pl" }], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/user/Aquafornite", "experimental": { "nodeMiddleware": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 1, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "viewTransition": false, "routerBFCache": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "useCache": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/home/user/Aquafornite" } };
var BuildId = "Z66BSfbPvoSUocBspCcJm";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/success", "regex": "^/success(?:/)?$", "routeKeys": {}, "namedRegex": "^/success(?:/)?$" }, { "page": "/user", "regex": "^/user(?:/)?$", "routeKeys": {}, "namedRegex": "^/user(?:/)?$" }], "dynamic": [{ "page": "/sign-in/[[...sign-in]]", "regex": "^/sign\\-in(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignin": "nxtPsign-in" }, "namedRegex": "^/sign\\-in(?:/(?<nxtPsignin>.+?))?(?:/)?$" }, { "page": "/sign-up/[[...sign-up]]", "regex": "^/sign\\-up(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignup": "nxtPsign-up" }, "namedRegex": "^/sign\\-up(?:/(?<nxtPsignup>.+?))?(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/success": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/success", "dataRoute": "/success.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/user": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/user", "dataRoute": "/user.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "cf746343e1b97b59d0a733f1da4c843e", "previewModeSigningKey": "19792a9a4ade9ea44c9a0c19d6d1cf56c1baaa52e1caffef8074928eb535885d", "previewModeEncryptionKey": "112db7bf076561355bd1ffa150d44c956bcbb29a4c55773cbbb4988cd56e6d0a" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|.*\\..*).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|.*\\..*).*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\.json)?[\\/#\\?]?$", "originalSource": "/(api|trpc)(.*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "Z66BSfbPvoSUocBspCcJm", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "OqAxyz4i+DBJV99RdmXQ/ijzmEkjwrQtjthKqIxDm40=", "__NEXT_PREVIEW_MODE_ID": "cf746343e1b97b59d0a733f1da4c843e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "112db7bf076561355bd1ffa150d44c956bcbb29a4c55773cbbb4988cd56e6d0a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "19792a9a4ade9ea44c9a0c19d6d1cf56c1baaa52e1caffef8074928eb535885d" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/api/checkout/route": "/api/checkout", "/api/history/route": "/api/history", "/favicon.ico/route": "/favicon.ico", "/page": "/", "/sign-in/[[...sign-in]]/page": "/sign-in/[[...sign-in]]", "/sign-up/[[...sign-up]]/page": "/sign-up/[[...sign-up]]", "/success/page": "/success", "/user/page": "/user" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    statusCode: 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/@opennextjs/aws/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const dataPattern = `${NextConfig.basePath ?? ""}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/");
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventHeaders, middlewareHeaders, setPrefix = true) {
  const keyPrefix = setPrefix ? MIDDLEWARE_HEADER_PREFIX : "";
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      eventHeaders[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    const nextHeaders = getNextConfigHeaders(event, ConfigHeaders);
    let internalEvent = fixDataPage(event, BuildId);
    if ("statusCode" in internalEvent) {
      return internalEvent;
    }
    const redirect = handleRedirects(internalEvent, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = new URL(redirect.headers.Location).href;
      debug("redirect", redirect);
      return redirect;
    }
    const eventOrResult = await handleMiddleware(
      internalEvent,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    const isResult = "statusCode" in eventOrResult;
    if (isResult) {
      return eventOrResult;
    }
    const middlewareResponseHeaders = eventOrResult.responseHeaders;
    let isExternalRewrite = eventOrResult.isExternalRewrite ?? false;
    internalEvent = eventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.beforeFiles);
      internalEvent = beforeRewrites.internalEvent;
      isExternalRewrite = beforeRewrites.isExternalRewrite;
    }
    const foundStaticRoute = staticRouteMatcher(internalEvent.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.afterFiles);
      internalEvent = afterRewrites.internalEvent;
      isExternalRewrite = afterRewrites.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(internalEvent, PrerenderManifest);
      internalEvent = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(internalEvent.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.fallback);
      internalEvent = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = internalEvent.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(internalEvent.rawPath).length > 0 || dynamicRouteMatcher(internalEvent.rawPath).length > 0)) {
      internalEvent = {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !("statusCode" in internalEvent)) {
      debug("Cache interception enabled");
      internalEvent = await cacheInterceptor(internalEvent);
      if ("statusCode" in internalEvent) {
        applyMiddlewareHeaders(internalEvent.headers, {
          ...middlewareResponseHeaders,
          ...nextHeaders
        }, false);
        return internalEvent;
      }
    }
    applyMiddlewareHeaders(internalEvent.headers, {
      ...middlewareResponseHeaders,
      ...nextHeaders
    });
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(internalEvent, NextConfig.i18n) : void 0
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const originResolver = await resolveOriginResolver(globalThis.openNextConfig.middleware?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(globalThis.openNextConfig.middleware?.override?.proxyExternalRequest);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil
  }, async () => {
    const result = await routingHandler(internalEvent);
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
