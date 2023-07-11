type Dom = {
  root: Element;

  burgerButton: Element | null;

  subNavigationLists: NodeListOf<Element> | never[];

  navigationButtons: NodeListOf<Element> | never[];
};

export { Dom };
