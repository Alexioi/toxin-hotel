const disableCounterButton = (node: Element | null, counter: number) => {
  if (counter === 0) {
    node?.classList.add('dropdown__counter-button_disabled');
    node?.setAttribute('disabled', 'disabled');
  } else {
    node?.classList.remove('dropdown__counter-button_disabled');
    node?.removeAttribute('disabled');
  }
};

export default disableCounterButton;
