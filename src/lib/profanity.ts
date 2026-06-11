import { Filter}  from "bad-words";
const filter = new Filter();

export function containsProfanity(str: string) {
  return filter.isProfane(str);
}