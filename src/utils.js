// Sets the width of the column based on the largest string in the data
export function maxDataWidth(data, accessorKey) {
  const maxLength = data.reduce(
    (max, item) => Math.max(max, String(item[accessorKey]).length),
    0
  );
  const charWidth = 8.4; // Approximate width of a character in pixels
  return maxLength * charWidth + 16 + 1 > 256
    ? 256
    : maxLength * charWidth + 16 + 1;
}

// Function to calculate the min width based on the header, use monospace fonts
export function minHeaderWidth(header) {
  const width = header.length * 8.4 + 16;
  return width < 48 ? 48 : width;
}
