/**
 * Converts plain ASCII letters and digits to Unicode "Mathematical Sans-Serif Bold" characters
 * (e.g. "Hello 7rs" -> "𝗛𝗲𝗹𝗹𝗼 𝟳𝗿𝘀"). Telegram shows these as bold-looking text even in a
 * prefilled message, where real formatting is not possible. Other characters (spaces, ".") are unchanged.
 */
const UPPER_A = 0x1d5d4; // 𝗔
const LOWER_A = 0x1d5ee; // 𝗮
const DIGIT_0 = 0x1d7ec; // 𝟬

export function toBold(input: string): string {
  return Array.from(input)
    .map((ch) => {
      const c = ch.codePointAt(0)!;
      if (c >= 0x41 && c <= 0x5a) return String.fromCodePoint(UPPER_A + (c - 0x41));
      if (c >= 0x61 && c <= 0x7a) return String.fromCodePoint(LOWER_A + (c - 0x61));
      if (c >= 0x30 && c <= 0x39) return String.fromCodePoint(DIGIT_0 + (c - 0x30));
      return ch;
    })
    .join("");
}
