export async function callApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('url');
    }, 1000);
  });
}
