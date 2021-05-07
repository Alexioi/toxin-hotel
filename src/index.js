import "./style/main.scss";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context("./components"));

requireAll(require.context("./pages"));
