const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Autotest board',
    columns = [
      {
        id: uuid(),
        title: 'Backlog',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
