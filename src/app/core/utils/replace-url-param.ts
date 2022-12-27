/**
 * Utiliza una de las propiedades de urls para remplazar {algo} por valor en los args.
 *
 * @param url Una de las propiedades.
 * @param args Remplaza el {key} por el value de.
 */
export const replaceUrlParams = (url: string, args: Record<string, string>): string => {
  const keys = Object.keys(args);
  const values = Object.values(args);

  for (let i = 0; i < keys.length; i += 1) {
    const key = '{' + keys[i] + '}';
    const value = values[i];
    url = url.replace(key, value);
  }

  return url;
};
