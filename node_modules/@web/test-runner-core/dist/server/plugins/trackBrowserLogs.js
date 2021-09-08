"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackBrowserLogs = void 0;
const browser_logs_1 = require("@web/browser-logs");
exports.trackBrowserLogs = `<script type="module">(function () {
  ${browser_logs_1.browserScript}
  window.__wtr_browser_logs__.logs = [];

  var types = ['log', 'debug', 'warn', 'error'];
  types.forEach(function (type) {
    var original = console[type];
    console[type] = function () {
      var args = [];
      for (let i = 0; i < arguments.length; i ++) {
        args.push(window.__wtr_browser_logs__.serialize(arguments[i]));
      }
      window.__wtr_browser_logs__.logs.push({ type: type, args: args });
      original.apply(console, arguments);
    };
  });
})();</script>`;
//# sourceMappingURL=trackBrowserLogs.js.map