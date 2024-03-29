type Dom = {
  root: HTMLElement;
  images: NodeListOf<Element>;
  back: Element;
  next: Element;
  buttons: NodeListOf<Element>;
};

type Props = {
  currentImageIndex: number;
  quantityImageIndex: number;
};

export { Dom, Props };
