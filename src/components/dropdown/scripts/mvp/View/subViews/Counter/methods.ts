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
  if (counter === 0) {
    node?.classList.add('dropdown__counter-button_disabled');
    node?.setAttribute('disabled', 'disabled');
  } else {
    node?.classList.remove('dropdown__counter-button_disabled');
    node?.removeAttribute('disabled');
  }
};

export { disableCounterButton, initNodes };
