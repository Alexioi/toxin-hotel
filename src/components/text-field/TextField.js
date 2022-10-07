import IMaskPlugin from '../../libs/imask';

class TextField {
  constructor(node) {
    this.node = node;

    this._init();
  }

  _init() {
    new IMaskPlugin(this.node);
  }
}

export default TextField;
