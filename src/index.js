import './style/main.scss';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /\.js$/));
requireAll(require.context('./components', true, /\.scss$/));

requireAll(require.context('./pages', true, /\.js$/));
requireAll(require.context('./pages', true, /\.scss$/));

requireAll(require.context('./templates', true, /\.scss$/));
