import Client from './client/client';

window.lr360 = window.lr360 || {};
window.lr360.queue = window.lr360.queue || [];

export let client = new Client();

function applyCallOnClient(args) {

  args = Array.prototype.slice.call(args); // arguments to array
  let method = args.shift(); // first element should be client[method]

  client[method].apply(client, args);

}

export function emptyQueue() {

  while (window.lr360.queue && window.lr360.queue.length) {

    let args = window.lr360.queue.shift(); // remove the first item from the queue

    applyCallOnClient(args);

  }

}

export function replaceQueuePush() {

  window.lr360.queue.push = applyCallOnClient;

}

emptyQueue();
replaceQueuePush();
