import TextField from '@components/text-field/scripts/TextField';

interface HTMLInputElementWithPlugin extends HTMLInputElement {
  plugin: TextField;
}

export default HTMLInputElementWithPlugin;
