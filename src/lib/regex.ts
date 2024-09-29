import { badWords } from "./categories/badWords"

export const phoneNumberRegex =
  /\((\d{3}|\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten)\b)\)([ .-]?)(\d{3}|\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten)\b)([ .-]?)(\d{4}|\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten)\b)|(\d{3}|\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten)\b)([ .-]?)(\d{3}|\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten)\b)([ .-]?)(\d{4}|\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten)\b)/

export const badWordRegex =
  /\b(?:fuck|shit|bitch|asshole|bastard|dick|cunt|piss|crap|slut|mf|poes|naai|kak|bliksem|vark|fok|donder|gat|dwaas|skelm|sis|ntywenyane|isihlamba|bhudiza|imbungulu|imbuzi|nyoko|imbokodo|nxilile|ipokopoko|sies|nyela|isiwula|umthakathi|ixoxo|isishimane|inkomo|ichatha|isfebe|gquma|lekgowa|marete|sefofu|letšhwele|tsenwa|mphitla|senyatla|mpshafela|maswe|ke\s?nna)\b/i

// export const badWordRegex = new RegExp(`(^|[^a-zA-Z])(${badWords.join("|")})([^a-zA-Z]|$)`, 'i');
export const specialCharsRegex = /[\/&%$#@!"',*^]/
export const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const regexUppercase = /[A-Z]/
export const regexNumber = /[0-9]/
export const regexWhiteSpace = /\S+/
