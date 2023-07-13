import { SearchElementError } from './searchElementError';

const createErrorMassage = (err: unknown, node: Element, text: string) => {
  if (!(err instanceof SearchElementError)) {
    return;
  }

  console.error(err.message);

  const placeholder = document.createElement('span');
  placeholder.innerText = text;

  node.parentNode?.replaceChild(placeholder, node);
};

export { createErrorMassage };
