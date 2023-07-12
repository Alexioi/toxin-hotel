type Dom = {
  root: Element;
  images: NodeListOf<Element>;
  back: Element | null;
  next: Element | null;
  buttons: NodeListOf<Element>;
};

type Props = {
  currentImageIndex: number;
  quantityImageIndex: number;
};

export { Dom, Props };
