const idGeneretor = {
  lastId: 0,
  generateId() {
    this.lastId += 1;
    return this.lastId;
  },
};

module.exports = { idGeneretor };
