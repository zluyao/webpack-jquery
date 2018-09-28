function PointQueue(initialQueue, delay) {
  this.$queue = initialQueue || [];

  this.$token = null;
  this.$delay = delay === undefined ? 200 : delay;
}

PointQueue.prototype.push = function (opts) {
  this.$queue.push(opts);
}

PointQueue.prototype.start = function (fn) {
  if (this.$token) {
    return;
  }

  var self = this;

  var doAction = function () {
    if (!self.$queue.length) {
      return;
    }

    var list = self.$queue.splice(0, self.$queue.length);

    if (list.length) {
      fn(list, function (items) {
        if (items && items.length) {
          for (var i = 0; i < items.length; i++) {
            self.$queue.push(items[i]);
          }
        }
      });
    }
  };

  this.$token = setInterval(doAction, this.$delay);
}

PointQueue.prototype.stop = function () {
  if (this.$token) {
    clearInterval(this.$token);

    this.$token = null;
  }
}

export default PointQueue;
