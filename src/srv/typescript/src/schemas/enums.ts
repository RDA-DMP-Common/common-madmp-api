import { z } from 'zod';

/*
 * This file is generated manually because Zod 4.x requires enum content to be strictly typed
 */

const languageCodes = [
  'aar', 'abk', 'afr', 'aka', 'amh', 'ara', 'arg', 'asm', 'ava', 'ave',
  'aym', 'aze', 'bak', 'bam', 'bel', 'ben', 'bih', 'bis', 'bod', 'bos',
  'bre', 'bul', 'cat', 'ces', 'cha', 'che', 'chu', 'chv', 'cor', 'cos',
  'cre', 'cym', 'dan', 'deu', 'div', 'dzo', 'ell', 'eng', 'epo', 'est',
  'eus', 'ewe', 'fao', 'fas', 'fij', 'fin', 'fra', 'fry', 'ful', 'gla',
  'gle', 'glg', 'glv', 'grn', 'guj', 'hat', 'hau', 'hbs', 'heb', 'her',
  'hin', 'hmo', 'hrv', 'hun', 'hye', 'ibo', 'ido', 'iii', 'iku', 'ile',
  'ina', 'ind', 'ipk', 'isl', 'ita', 'jav', 'jpn', 'kal', 'kan', 'kas',
  'kat', 'kau', 'kaz', 'khm', 'kik', 'kin', 'kir', 'kom', 'kon', 'kor',
  'kua', 'kur', 'lao', 'lat', 'lav', 'lim', 'lin', 'lit', 'ltz', 'lub',
  'lug', 'mah', 'mal', 'mar', 'mkd', 'mlg', 'mlt', 'mon', 'mri', 'msa',
  'mya', 'nau', 'nav', 'nbl', 'nde', 'ndo', 'nep', 'nld', 'nno', 'nob',
  'nor', 'nya', 'oci', 'oji', 'ori', 'orm', 'oss', 'pan', 'pli', 'pol',
  'por', 'pus', 'que', 'roh', 'ron', 'run', 'rus', 'sag', 'san', 'sin',
  'slk', 'slv', 'sme', 'smo', 'sna', 'snd', 'som', 'sot', 'spa', 'sqi',
  'srd', 'srp', 'ssw', 'sun', 'swa', 'swe', 'tah', 'tam', 'tat', 'tel',
  'tgk', 'tgl', 'tha', 'tir', 'ton', 'tsn', 'tso', 'tuk', 'tur', 'twi',
  'uig', 'ukr', 'urd', 'uzb', 'ven', 'vie', 'vol', 'wln', 'wol', 'xho',
  'yid', 'yor', 'zha', 'zho', 'zul'
] as const;

// ✨ This is the fix:
type LanguageCode = typeof languageCodes[number];

export const LanguageCodesEnum = z.enum(languageCodes);
export const LanguageCodesSchema = z.array(LanguageCodesEnum);

