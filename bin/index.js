"use strict";

var e = this && this.__createBinding || (Object.create ? function(e, r, t, o) {
  void 0 === o && (o = t);
  var i = Object.getOwnPropertyDescriptor(r, t);
  i && !("get" in i ? !r.__esModule : i.writable || i.configurable) || (i = {
    enumerable: !0,
    get: function() {
      return r[t];
    }
  }), Object.defineProperty(e, o, i);
} : function(e, r, t, o) {
  void 0 === o && (o = t), e[o] = r[t];
}), r = this && this.__exportStar || function(r, t) {
  for (var o in r) "default" === o || Object.prototype.hasOwnProperty.call(t, o) || e(t, r, o);
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.version = void 0, r(require("./Embeds"), exports), r(require("./base"), exports), 
exports.version = require("../package.json").version;