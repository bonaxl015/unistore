import { formatDateTime } from './formatDateTime';

describe('Given formatDateTime', () => {
  it('should return correct formatted parts for a known date', () => {
    const input = new Date('2023-08-05T14:30:00');

    const result = formatDateTime(input);

    expect(result).toHaveProperty('dateTime');
    expect(result).toHaveProperty('dateOnly');
    expect(result).toHaveProperty('timeOnly');

    expect(result.dateTime).toMatch(/Aug \d{1,2}, 2023, \d{1,2}:\d{2} (AM|PM)/);
    expect(result.dateOnly).toMatch(/Sat, Aug \d{1,2}, 2023/);
    expect(result.timeOnly).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
  });

  it('should work for midnight', () => {
    const input = new Date('2024-01-01T00:00:00');

    const { dateTime, timeOnly } = formatDateTime(input);

    expect(dateTime).toMatch(/Jan \d{1,2}, 2024, 12:00 AM/);
    expect(timeOnly).toBe('12:00 AM');
  });

  it('should work for noon', () => {
    const input = new Date('2024-01-01T12:00:00');

    const { timeOnly } = formatDateTime(input);

    expect(timeOnly).toBe('12:00 PM');
  });

  it('should handle invalid date input gracefully', () => {
    const input = new Date('invalid-date');
    const { dateTime, dateOnly, timeOnly } = formatDateTime(input);

    expect(dateTime).toBe('Invalid Date');
    expect(dateOnly).toBe('Invalid Date');
    expect(timeOnly).toBe('Invalid Date');
  });
});
