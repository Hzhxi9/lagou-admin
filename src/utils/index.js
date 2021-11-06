class Emitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name, fn) {
    const takes = this.cache[name].slice();
    if (takes) {
      const idx = takes.findIndex(f => f === fn || f.callback === fn);
      if (~idx) takes.splice(idx, 1);
    }
  }

  emit(name, once = false, ...args) {
    console.log( this.cache)
    const takes = this.cache[name].slice();
    if (takes) {
      for (const fn of takes) fn(...args);
    }
    once && delete this.cache[name];
  }
}

export default new Emitter();
