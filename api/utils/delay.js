export function delay(mls) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, mls),
  );
}
