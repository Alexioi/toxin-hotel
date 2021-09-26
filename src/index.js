import './style/main.scss';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /\.(js|scss)$/));
requireAll(require.context('./pages', true, /\.(js|scss)$/));
requireAll(require.context('./templates', true, /\.(js|scss)$/));
