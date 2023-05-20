export const useCustomFetch = <T>(
  url: string,
  options?: object
): Promise<T> => {
  return fetch(`${url}`, {
    ...options,
  }).then((resp) => resp.json());
};
