import { faker } from "@faker-js/faker";

export function makeData(rowCount, startIndex = 0) {
  return Array.from({ length: rowCount }, (_, rowIndex) => ({
    rowIndex: rowIndex + startIndex + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    status: faker.helpers.arrayElement([
      "Single",
      "In Relationship",
      "Complicated",
    ]),
    joined: faker.date.past(2).toISOString().split("T")[0], // Date in past 2 years
    role: faker.helpers.arrayElement(["Admin", "User", "Manager"]),
    password: faker.internet.password(),
    passwordStrength: faker.helpers.arrayElement(["Weak", "Medium", "Strong"]),
    age: faker.number.int({ min: 18, max: 65 }),
    visits: faker.number.int({ min: 0, max: 100 }),
    person1: faker.person.fullName(),
    person2: faker.person.fullName(),
    person3: faker.person.fullName(),
    person4: faker.person.fullName(),
    person5: faker.person.fullName(),
    person6: faker.person.fullName(),
    person7: faker.person.fullName(),
  }));
}

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
export function minHeaderWidth(header, additional) {
  const width = header.length * 8.4 + 16 + (additional || 0);
  return width < 48 ? 48 : width;
}

export const getCommonPinningStyles = (column, isCell) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-1px 0 0 0 var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity))) inset" // 1px shadow to the left with Tailwind variable --b3
      : isFirstRightPinnedColumn
      ? "1px 0 0 0 var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity))) inset" // 1px shadow to the right with Tailwind variable --b3
      : undefined,
    backgroundColor: isPinned
      ? isCell
        ? "oklch(var(--b2))"
        : "oklch(var(--b3))"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
