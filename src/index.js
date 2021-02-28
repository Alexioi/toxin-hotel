import "./style/main.scss";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(
  require.context("./components", true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/)
);

requireAll(
  require.context("./pages", true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/)
);
