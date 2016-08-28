'use strict';

import Client from './client/client';
import { httpMethods } from './http.methods/index';

export let client = new Client();

window.lr360 = window.lr360 || {};
window.lr360.queue = window.lr360.queue || [];
window.lr360.client = client;

window.lr360.get = httpMethods.get;
window.lr360.post = httpMethods.post;
window.lr360.put = httpMethods.put;
window.lr360.delete = httpMethods.delete;

export function emptyQueue() {

  while (window.lr360.queue && window.lr360.queue.length) {

    let args = window.lr360.queue.shift(); // remove the first item from the queue

    applyCallOnClient(args);

  }

}

export function replaceQueuePush() {

  window.lr360.queue.push = applyCallOnClient;

}

function applyCallOnClient(args) {

  args = Array.prototype.slice.call(args); // arguments to array
  let method = args.shift(); // first element should be client[method]

  client[method].apply(client, args);

}

emptyQueue();
replaceQueuePush();
