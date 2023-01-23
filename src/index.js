import './style/fonts.scss';
import './style/main.scss';

const requireAll = (requireContext) => {
  const allContext = requireContext.keys().map(requireContext);
  return allContext;
};

requireAll(require.context('@components', true, /(.ts|.js|.scss)$/));
requireAll(require.context('./pages', true, /\.(js|scss)$/));
requireAll(require.context('./templates', true, /\.(js|scss)$/));
