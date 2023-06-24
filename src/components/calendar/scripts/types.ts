import TextField from '../../text-field/TextField';

interface HTMLInputElementWithPlugin extends HTMLInputElement {
  plugin: TextField;
}

export default HTMLInputElementWithPlugin;
