import "./style/main.scss";
import "./templates/ui-kit.scss";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context("./components", true, /\.js$/));
requireAll(require.context("./components", true, /\.scss$/));

requireAll(require.context("./pages", true, /\.js$/));
requireAll(require.context("./pages", true, /\.scss$/));
