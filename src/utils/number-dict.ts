// File: numberdict.ts

export const convertLatinToArabic = (latinNumber: string) => {
  return latinNumber.split('').map(digit => latinToArabic[digit] || digit).join('');
};

export const latinToArabic: Record<string, string> = {
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩',
  '0': '٠',
};
