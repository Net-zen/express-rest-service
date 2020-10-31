class NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.status = '404';
    this.message = message;
  }
}

class FORBIDDEN extends Error {
  constructor(message) {
    super(message);
    this.status = '403';
    this.message = message;
  }
}

class UNAUTHORIZED extends Error {
  constructor(message) {
    super(message);
    this.status = '401';
    this.message = message;
  }
}

module.exports = { NOT_FOUND, FORBIDDEN, UNAUTHORIZED };
