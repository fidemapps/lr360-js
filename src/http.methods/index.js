'use strict';

import getRequest from './get';
import postRequest from './post';
import putRequest from './put';
import deleteRequest from './delete';

export const httpMethods = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};
