"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Embeds = void 0;

const t = require("discord.js"), r = require("./base");

class e extends r.PaginationEmbed {
  get currentEmbed() {
    return this.array[this.page - 1];
  }
  get currentFiles() {
    return this.files ? [ this.files[this.page - 1] ] : [];
  }
  get pages() {
    return this.array.length;
  }
  addField(t, r, e = !1) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const s of this.array) s.addFields({
      name: t,
      value: r,
      inline: e
    });
    return this;
  }
  async build() {
    return await this._verify(), this._loadList();
  }
  setArray(r) {
    if (!(Array.isArray(r) && Boolean(r.length))) throw new TypeError("Cannot invoke Embeds class without a valid array to paginate.");
    for (const [e, s] of r.entries()) {
      if (!Boolean(s) || s.constructor !== Object || !Object.keys(s).length) {
        if (s instanceof t.EmbedBuilder) continue;
        throw new TypeError(`(EmbedBuilders[${e}]) Cannot invoke Embeds class with an invalid EmbedBuilder instance.`);
      }
      r[e] = new t.EmbedBuilder(s);
    }
    return this.array = r, this;
  }
  setAuthor(t, r, e) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const s of this.array) s.setAuthor({
      name: t,
      iconURL: r,
      url: e
    });
    return this;
  }
  setColor(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setColor(t);
    return this;
  }
  setDescription(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setDescription(t);
    return this;
  }
  setFooter(t, r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const e of this.array) e.setFooter({
      text: t,
      iconURL: r
    });
    return this;
  }
  setImage(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setImage(t);
    return this;
  }
  setThumbnail(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setThumbnail(t);
    return this;
  }
  setTimestamp(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setTimestamp(t);
    return this;
  }
  setTitle(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setTitle(t);
    return this;
  }
  setURL(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setURL(t);
    return this;
  }
  spliceFields(t, r, e, s, i) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const a of this.array) a.spliceFields(t, r, {
      name: e,
      value: s,
      inline: i
    });
    return this;
  }
  toJSON() {
    if (!this.array) throw new TypeError("this.array must be set first.");
    return this.array.map((t => t.toJSON()));
  }
  async _loadList(r = !0) {
    this.listenerCount("pageUpdate") && this.emit("pageUpdate");
    const e = new t.EmbedBuilder(this.currentEmbed.data), s = this.currentFiles, i = "footer" === this.usePageIndicator, a = this.usePageIndicator && !i ? 1 === this.pages ? "" : this.pageIndicator : "", {separator: o, text: n} = this.content, h = {
      embeds: [ e ],
      content: `${n ? `${n}${o}` : ""}${a}` || null,
      files: s
    };
    return i && e.setFooter({
      text: this.pageIndicator,
      iconURL: e.data.footer.icon_url
    }), this.clientAssets.message ? await this.clientAssets.message.edit(h) : this.clientAssets.message = await this.channel.send(h), 
    super._loadList(r);
  }
}

exports.Embeds = e;