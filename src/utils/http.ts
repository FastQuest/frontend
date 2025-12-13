// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildQueryParams(obj: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      // Decide como sua API trata arrays: 'a,b' ou 'arr[]=a&arr[]=b'
      params.append(key, value.join(','));
    } else {
      params.append(key, String(value));
    }
  });

  return params;
}
