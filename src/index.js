import './style/main.scss';

const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

requireAll(require.context('Components', true, /(index.js|.scss)$/));
requireAll(require.context('./pages', true, /\.(js|scss)$/));
requireAll(require.context('./templates', true, /\.(js|scss)$/));
