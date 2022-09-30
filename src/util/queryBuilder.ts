export const queryBuilder = (data: any) => {
  return (
    "?" +
    Object.entries(data)
      .map(([key, value]) => (value ? `${key}=${value}` : ""))
      .filter((v) => v)
      .join("&")
  );
};
