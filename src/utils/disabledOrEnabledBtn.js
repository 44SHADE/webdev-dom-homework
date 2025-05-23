export function disabledOrEnabledBtn(btnId) {
  const el = document.getElementById(btnId);
  return (state, msg) => {
    el.disabled = state;
    el.textContent = msg;
  };
}
