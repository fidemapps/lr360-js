import Client from './client/client';
let lr360 = window.lr360 || {};
lr360.queue = lr360.queue || [];

emptyQueue();
replaceQueuePush();

export function emptyQueue() {
    while (lr360.queue && lr360.queue.length) {
        let params = lr360.queue.shift(); // remove the first item from the queue
        let method = params[0];
        let data = params[1];

        console.log(`Emptying queue, calling ${method}...`);
        console.log(data);
    }
}

export function replaceQueuePush() {
    lr360.queue.push = function () {
        let args = arguments[0];
        let method = args[0];
        let data = args[1];

        console.log(`Calling ${method}...`);
        console.log(data);
    }
}