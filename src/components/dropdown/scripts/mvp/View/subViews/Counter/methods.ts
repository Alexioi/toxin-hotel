import { cssSelectors } from '../../../../constants';

const initNodes = (node: Element) => {
  const root = node;
  const [decrementButtonNode, incrementButtonNode] = root.querySelectorAll(
    cssSelectors.counterButtons,
  );

  const decrementButton =
    typeof decrementButtonNode === 'undefined' ? null : decrementButtonNode;

  const incrementButton =
    typeof incrementButtonNode === 'undefined' ? null : incrementButtonNode;

  const counterNode = root.querySelector(cssSelectors.counter);

  return { root, decrementButton, incrementButton, counterNode };
};

const disableCounterButton = (node: Element | null, counter: number) => {
  if (!(node instanceof HTMLButtonElement)) {
    return;
  }

  const button = node;

  if (counter === 0) {
    button.classList.add('dropdown__counter-button_disabled');
    button.disabled = true;
    return;
  }

  button.classList.remove('dropdown__counter-button_disabled');
  button.disabled = false;
};

export { disableCounterButton, initNodes };
