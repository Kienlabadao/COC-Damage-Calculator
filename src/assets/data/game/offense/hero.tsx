import { ObjectValues } from "utils/objectUtils";
import { DAMAGE_TYPE, DamageType } from "./sharedEnums";

export const HERO = {
  BarbarianKing: "barbarian_king",
  ArcherQueen: "archer_queen",
  MinionPrince: "minion_prince",
  GrandWarden: "grand_warden",
  RoyalChampion: "royal_champion",
} as const;

export type Hero = ObjectValues<typeof HERO>;

interface LevelDPS {
  level: number;
  dps: number;
}

export interface HeroStats {
  name: string;
  damage_type: DamageType;
  attack_speed: number;
  dps: LevelDPS[];
}

export const HeroData: Record<string, HeroStats> = {
  barbarian_king: {
    name: "Barbarian King",
    damage_type: DAMAGE_TYPE.Direct,
    attack_speed: 1.2,
    dps: [
      { level: 1, dps: 102 },
      { level: 2, dps: 104 },
      { level: 3, dps: 105 },
      { level: 4, dps: 108 },
      { level: 5, dps: 110 },
      { level: 6, dps: 112 },
      { level: 7, dps: 115 },
      { level: 8, dps: 116 },
      { level: 9, dps: 119 },
      { level: 10, dps: 122 },
      { level: 11, dps: 124 },
      { level: 12, dps: 127 },
      { level: 13, dps: 129 },
      { level: 14, dps: 132 },
      { level: 15, dps: 134 },
      { level: 16, dps: 137 },
      { level: 17, dps: 139 },
      { level: 18, dps: 143 },
      { level: 19, dps: 145 },
      { level: 20, dps: 148 },
      { level: 21, dps: 151 },
      { level: 22, dps: 154 },
      { level: 23, dps: 157 },
      { level: 24, dps: 161 },
      { level: 25, dps: 164 },
      { level: 26, dps: 167 },
      { level: 27, dps: 170 },
      { level: 28, dps: 173 },
      { level: 29, dps: 177 },
      { level: 30, dps: 181 },
      { level: 31, dps: 184 },
      { level: 32, dps: 188 },
      { level: 33, dps: 192 },
      { level: 34, dps: 196 },
      { level: 35, dps: 200 },
      { level: 36, dps: 203 },
      { level: 37, dps: 207 },
      { level: 38, dps: 212 },
      { level: 39, dps: 216 },
      { level: 40, dps: 220 },
      { level: 41, dps: 234 },
      { level: 42, dps: 239 },
      { level: 43, dps: 244 },
      { level: 44, dps: 249 },
      { level: 45, dps: 254 },
      { level: 46, dps: 259 },
      { level: 47, dps: 265 },
      { level: 48, dps: 270 },
      { level: 49, dps: 276 },
      { level: 50, dps: 282 },
      { level: 51, dps: 288 },
      { level: 52, dps: 294 },
      { level: 53, dps: 300 },
      { level: 54, dps: 307 },
      { level: 55, dps: 314 },
      { level: 56, dps: 320 },
      { level: 57, dps: 327 },
      { level: 58, dps: 334 },
      { level: 59, dps: 341 },
      { level: 60, dps: 349 },
      { level: 61, dps: 355 },
      { level: 62, dps: 362 },
      { level: 63, dps: 370 },
      { level: 64, dps: 377 },
      { level: 65, dps: 385 },
      { level: 66, dps: 393 },
      { level: 67, dps: 400 },
      { level: 68, dps: 408 },
      { level: 69, dps: 417 },
      { level: 70, dps: 425 },
      { level: 71, dps: 434 },
      { level: 72, dps: 442 },
      { level: 73, dps: 451 },
      { level: 74, dps: 459 },
      { level: 75, dps: 468 },
      { level: 76, dps: 475 },
      { level: 77, dps: 483 },
      { level: 78, dps: 490 },
      { level: 79, dps: 498 },
      { level: 80, dps: 506 },
      { level: 81, dps: 513 },
      { level: 82, dps: 519 },
      { level: 83, dps: 526 },
      { level: 84, dps: 533 },
      { level: 85, dps: 540 },
      { level: 86, dps: 547 },
      { level: 87, dps: 553 },
      { level: 88, dps: 560 },
      { level: 89, dps: 567 },
      { level: 90, dps: 574 },
      { level: 91, dps: 581 },
      { level: 92, dps: 587 },
      { level: 93, dps: 594 },
      { level: 94, dps: 601 },
      { level: 95, dps: 608 },
      { level: 96, dps: 615 },
      { level: 97, dps: 622 },
      { level: 98, dps: 629 },
      { level: 99, dps: 636 },
      { level: 100, dps: 643 },
    ],
  },
  archer_queen: {
    name: "Archer Queen",
    damage_type: DAMAGE_TYPE.Direct,
    attack_speed: 0.75,
    dps: [
      { level: 1, dps: 102 },
      { level: 2, dps: 104 },
      { level: 3, dps: 105 },
      { level: 4, dps: 108 },
      { level: 5, dps: 110 },
      { level: 6, dps: 112 },
      { level: 7, dps: 115 },
      { level: 8, dps: 116 },
      { level: 9, dps: 119 },
      { level: 10, dps: 122 },
      { level: 11, dps: 124 },
      { level: 12, dps: 127 },
      { level: 13, dps: 129 },
      { level: 14, dps: 132 },
      { level: 15, dps: 134 },
      { level: 16, dps: 137 },
      { level: 17, dps: 139 },
      { level: 18, dps: 143 },
      { level: 19, dps: 145 },
      { level: 20, dps: 148 },
      { level: 21, dps: 151 },
      { level: 22, dps: 154 },
      { level: 23, dps: 157 },
      { level: 24, dps: 161 },
      { level: 25, dps: 164 },
      { level: 26, dps: 167 },
      { level: 27, dps: 170 },
      { level: 28, dps: 173 },
      { level: 29, dps: 177 },
      { level: 30, dps: 181 },
      { level: 31, dps: 184 },
      { level: 32, dps: 188 },
      { level: 33, dps: 192 },
      { level: 34, dps: 196 },
      { level: 35, dps: 200 },
      { level: 36, dps: 203 },
      { level: 37, dps: 207 },
      { level: 38, dps: 212 },
      { level: 39, dps: 216 },
      { level: 40, dps: 220 },
      { level: 41, dps: 234 },
      { level: 42, dps: 239 },
      { level: 43, dps: 244 },
      { level: 44, dps: 249 },
      { level: 45, dps: 254 },
      { level: 46, dps: 259 },
      { level: 47, dps: 265 },
      { level: 48, dps: 270 },
      { level: 49, dps: 276 },
      { level: 50, dps: 282 },
      { level: 51, dps: 288 },
      { level: 52, dps: 294 },
      { level: 53, dps: 300 },
      { level: 54, dps: 307 },
      { level: 55, dps: 314 },
      { level: 56, dps: 320 },
      { level: 57, dps: 327 },
      { level: 58, dps: 334 },
      { level: 59, dps: 341 },
      { level: 60, dps: 349 },
      { level: 61, dps: 355 },
      { level: 62, dps: 362 },
      { level: 63, dps: 370 },
      { level: 64, dps: 377 },
      { level: 65, dps: 385 },
      { level: 66, dps: 393 },
      { level: 67, dps: 400 },
      { level: 68, dps: 408 },
      { level: 69, dps: 417 },
      { level: 70, dps: 425 },
      { level: 71, dps: 434 },
      { level: 72, dps: 442 },
      { level: 73, dps: 451 },
      { level: 74, dps: 459 },
      { level: 75, dps: 468 },
      { level: 76, dps: 475 },
      { level: 77, dps: 483 },
      { level: 78, dps: 490 },
      { level: 79, dps: 498 },
      { level: 80, dps: 506 },
      { level: 81, dps: 513 },
      { level: 82, dps: 519 },
      { level: 83, dps: 526 },
      { level: 84, dps: 533 },
      { level: 85, dps: 540 },
      { level: 86, dps: 547 },
      { level: 87, dps: 553 },
      { level: 88, dps: 560 },
      { level: 89, dps: 567 },
      { level: 90, dps: 574 },
      { level: 91, dps: 581 },
      { level: 92, dps: 587 },
      { level: 93, dps: 594 },
      { level: 94, dps: 601 },
      { level: 95, dps: 608 },
      { level: 96, dps: 615 },
      { level: 97, dps: 622 },
      { level: 98, dps: 629 },
      { level: 99, dps: 636 },
      { level: 100, dps: 643 },
    ],
  },
  minion_prince: {
    name: "Minion Prince",
    damage_type: DAMAGE_TYPE.Direct,
    attack_speed: 0.85,
    dps: [
      { level: 1, dps: 173 },
      { level: 2, dps: 177 },
      { level: 3, dps: 181 },
      { level: 4, dps: 187 },
      { level: 5, dps: 191 },
      { level: 6, dps: 196 },
      { level: 7, dps: 201 },
      { level: 8, dps: 206 },
      { level: 9, dps: 211 },
      { level: 10, dps: 216 },
      { level: 11, dps: 222 },
      { level: 12, dps: 227 },
      { level: 13, dps: 233 },
      { level: 14, dps: 238 },
      { level: 15, dps: 244 },
      { level: 16, dps: 251 },
      { level: 17, dps: 257 },
      { level: 18, dps: 263 },
      { level: 19, dps: 270 },
      { level: 20, dps: 277 },
      { level: 21, dps: 284 },
      { level: 22, dps: 290 },
      { level: 23, dps: 298 },
      { level: 24, dps: 305 },
      { level: 25, dps: 313 },
      { level: 26, dps: 321 },
      { level: 27, dps: 329 },
      { level: 28, dps: 337 },
      { level: 29, dps: 345 },
      { level: 30, dps: 354 },
      { level: 31, dps: 363 },
      { level: 32, dps: 372 },
      { level: 33, dps: 381 },
      { level: 34, dps: 390 },
      { level: 35, dps: 401 },
      { level: 36, dps: 411 },
      { level: 37, dps: 419 },
      { level: 38, dps: 427 },
      { level: 39, dps: 437 },
      { level: 40, dps: 446 },
      { level: 41, dps: 455 },
      { level: 42, dps: 464 },
      { level: 43, dps: 474 },
      { level: 44, dps: 484 },
      { level: 45, dps: 494 },
      { level: 46, dps: 504 },
      { level: 47, dps: 513 },
      { level: 48, dps: 523 },
      { level: 49, dps: 534 },
      { level: 50, dps: 545 },
      { level: 51, dps: 556 },
      { level: 52, dps: 566 },
      { level: 53, dps: 575 },
      { level: 54, dps: 584 },
      { level: 55, dps: 591 },
      { level: 56, dps: 598 },
      { level: 57, dps: 604 },
      { level: 58, dps: 610 },
      { level: 59, dps: 614 },
      { level: 60, dps: 619 },
      { level: 61, dps: 623 },
      { level: 62, dps: 628 },
      { level: 63, dps: 631 },
      { level: 64, dps: 636 },
      { level: 65, dps: 639 },
      { level: 66, dps: 643 },
      { level: 67, dps: 646 },
      { level: 68, dps: 649 },
      { level: 69, dps: 652 },
      { level: 70, dps: 656 },
      { level: 71, dps: 658 },
      { level: 72, dps: 661 },
      { level: 73, dps: 665 },
      { level: 74, dps: 670 },
      { level: 75, dps: 675 },
      { level: 76, dps: 680 },
      { level: 77, dps: 685 },
      { level: 78, dps: 690 },
      { level: 79, dps: 695 },
      { level: 80, dps: 700 },
      { level: 81, dps: 705 },
      { level: 82, dps: 710 },
      { level: 83, dps: 715 },
      { level: 84, dps: 720 },
      { level: 85, dps: 725 },
      { level: 86, dps: 730 },
      { level: 87, dps: 735 },
      { level: 88, dps: 740 },
      { level: 89, dps: 745 },
      { level: 90, dps: 750 },
    ],
  },
  grand_warden: {
    name: "Grand Warden",
    damage_type: DAMAGE_TYPE.Direct,
    attack_speed: 1.8,
    dps: [
      { level: 1, dps: 43 },
      { level: 2, dps: 44 },
      { level: 3, dps: 46 },
      { level: 4, dps: 48 },
      { level: 5, dps: 49 },
      { level: 6, dps: 51 },
      { level: 7, dps: 54 },
      { level: 8, dps: 56 },
      { level: 9, dps: 59 },
      { level: 10, dps: 61 },
      { level: 11, dps: 64 },
      { level: 12, dps: 66 },
      { level: 13, dps: 70 },
      { level: 14, dps: 73 },
      { level: 15, dps: 77 },
      { level: 16, dps: 80 },
      { level: 17, dps: 83 },
      { level: 18, dps: 87 },
      { level: 19, dps: 90 },
      { level: 20, dps: 94 },
      { level: 21, dps: 98 },
      { level: 22, dps: 102 },
      { level: 23, dps: 106 },
      { level: 24, dps: 111 },
      { level: 25, dps: 116 },
      { level: 26, dps: 121 },
      { level: 27, dps: 126 },
      { level: 28, dps: 131 },
      { level: 29, dps: 137 },
      { level: 30, dps: 143 },
      { level: 31, dps: 149 },
      { level: 32, dps: 155 },
      { level: 33, dps: 162 },
      { level: 34, dps: 168 },
      { level: 35, dps: 175 },
      { level: 36, dps: 183 },
      { level: 37, dps: 190 },
      { level: 38, dps: 198 },
      { level: 39, dps: 207 },
      { level: 40, dps: 215 },
      { level: 41, dps: 221 },
      { level: 42, dps: 226 },
      { level: 43, dps: 230 },
      { level: 44, dps: 234 },
      { level: 45, dps: 237 },
      { level: 46, dps: 241 },
      { level: 47, dps: 244 },
      { level: 48, dps: 247 },
      { level: 49, dps: 251 },
      { level: 50, dps: 254 },
      { level: 51, dps: 258 },
      { level: 52, dps: 261 },
      { level: 53, dps: 264 },
      { level: 54, dps: 268 },
      { level: 55, dps: 271 },
      { level: 56, dps: 274 },
      { level: 57, dps: 276 },
      { level: 58, dps: 279 },
      { level: 59, dps: 281 },
      { level: 60, dps: 284 },
      { level: 61, dps: 286 },
      { level: 62, dps: 289 },
      { level: 63, dps: 292 },
      { level: 64, dps: 294 },
      { level: 65, dps: 297 },
      { level: 66, dps: 299 },
      { level: 67, dps: 302 },
      { level: 68, dps: 304 },
      { level: 69, dps: 307 },
      { level: 70, dps: 309 },
      { level: 71, dps: 312 },
      { level: 72, dps: 315 },
      { level: 73, dps: 318 },
      { level: 74, dps: 321 },
      { level: 75, dps: 324 },
    ],
  },
  royal_champion: {
    name: "Royal Champion",
    damage_type: DAMAGE_TYPE.Direct,
    attack_speed: 1.2,
    dps: [
      { level: 1, dps: 340 },
      { level: 2, dps: 350 },
      { level: 3, dps: 360 },
      { level: 4, dps: 370 },
      { level: 5, dps: 375 },
      { level: 6, dps: 380 },
      { level: 7, dps: 385 },
      { level: 8, dps: 390 },
      { level: 9, dps: 396 },
      { level: 10, dps: 402 },
      { level: 11, dps: 408 },
      { level: 12, dps: 414 },
      { level: 13, dps: 420 },
      { level: 14, dps: 426 },
      { level: 15, dps: 432 },
      { level: 16, dps: 438 },
      { level: 17, dps: 444 },
      { level: 18, dps: 448 },
      { level: 19, dps: 452 },
      { level: 20, dps: 456 },
      { level: 21, dps: 460 },
      { level: 22, dps: 465 },
      { level: 23, dps: 470 },
      { level: 24, dps: 474 },
      { level: 25, dps: 477 },
      { level: 26, dps: 480 },
      { level: 27, dps: 483 },
      { level: 28, dps: 486 },
      { level: 29, dps: 489 },
      { level: 30, dps: 492 },
      { level: 31, dps: 495 },
      { level: 32, dps: 498 },
      { level: 33, dps: 502 },
      { level: 34, dps: 506 },
      { level: 35, dps: 510 },
      { level: 36, dps: 514 },
      { level: 37, dps: 518 },
      { level: 38, dps: 522 },
      { level: 39, dps: 526 },
      { level: 40, dps: 530 },
      { level: 41, dps: 533 },
      { level: 42, dps: 536 },
      { level: 43, dps: 539 },
      { level: 44, dps: 542 },
      { level: 45, dps: 545 },
      { level: 46, dps: 548 },
      { level: 47, dps: 551 },
      { level: 48, dps: 554 },
      { level: 49, dps: 557 },
      { level: 50, dps: 560 },
    ],
  },
};
