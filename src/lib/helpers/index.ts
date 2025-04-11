export const buildUrlWithParams = (
  baseUrl: string,
  params: Record<string, any>
): string => {
  const queryParams = Object.entries(params)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    ) // Exclude undefined/null values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    );
  return queryParams.length > 0
    ? `${baseUrl}?${queryParams.join("&")}`
    : baseUrl;
};
