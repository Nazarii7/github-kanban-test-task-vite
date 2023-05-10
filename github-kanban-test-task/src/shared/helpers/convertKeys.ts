export function convertKeys(obj: any): any {
  // Check if the object is null or undefined and return it as is
  if (obj === null || obj === undefined) {
    return obj;
  }

  // If the object is an array, recursively call convertKeys on each element
  if (Array.isArray(obj)) {
    return obj.map(convertKeys);
  }

  // If the object is of type 'object', iterate over its key-value pairs
  if (typeof obj === "object") {
    // Use Object.entries to get an array of [key, value] pairs
    return Object.entries(obj).reduce((acc, [key, value]) => {
      // Convert the snake case key to camel case
      const camelKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());

      // Recursively call convertKeys on the value
      acc[camelKey] = convertKeys(value);

      return acc;
    }, {} as any); // Use the `as any` assertion here to specify the type of the accumulator
  }

  // Return the value as is for any other data type
  return obj;
}
