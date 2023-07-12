type Dom = {
  root: Element;
  images: NodeListOf<Element> | never[];
  back: Element | null;
  next: Element | null;
  buttons: NodeListOf<Element> | never[];
};

type Props = {
  currentImageIndex: number;
  quantityImageIndex: number;
};

export { Dom, Props };
