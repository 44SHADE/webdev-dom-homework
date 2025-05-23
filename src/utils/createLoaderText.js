export function createLoaderText(
  containerNodeId,
  createdNode,
  beforeNodeId,
  text,
) {
  const containerDiv = document.getElementById(containerNodeId);
  const before = document.getElementById(beforeNodeId);
  const el = document.createElement(createdNode);
  const textNode = document.createTextNode(text);
  el.classList.add('-loader-node');
  el.appendChild(textNode);
  containerDiv.insertBefore(el, before);

  return el;
}
