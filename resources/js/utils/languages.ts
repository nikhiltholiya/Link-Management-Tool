const languages = [
   {
      name: "🇿🇦 Afrikaans",
      code: "af",
   },
   {
      name: " Aghem",
      code: "agq",
   },
   {
      name: "🇬🇭 Akan",
      code: "ak",
   },
   {
      name: "🇪🇸 Aragonés",
      code: "an",
   },
   {
      name: " Atsam",
      code: "cch",
   },
   {
      name: " Avañe’ẽ",
      code: "gn",
   },
   {
      name: " Avesta",
      code: "ae",
   },
   {
      name: "🇵🇪 Aymar aru",
      code: "ay",
   },
   {
      name: "🇦🇿 Azərbaycanca",
      code: "az",
   },
   {
      name: "🇲🇾 Bahasa Melayu",
      code: "ms",
   },
   {
      name: " Bamanakan",
      code: "bm",
   },
   {
      name: " Basa Jawa",
      code: "jv",
   },
   {
      name: " Basa Sunda",
      code: "su",
   },
   {
      name: " Bihari",
      code: "bh",
   },
   {
      name: " Bislama",
      code: "bi",
   },
   {
      name: "🇳🇴 Bokmål",
      code: "nb",
   },
   {
      name: "🇧🇦 Bosanski",
      code: "bs",
   },
   {
      name: "🇫🇷 Brezhoneg",
      code: "br",
   },
   {
      name: "🇪🇸 Català",
      code: "ca",
   },
   {
      name: " Chamoru",
      code: "ch",
   },
   {
      name: " ChiCheŵa",
      code: "ny",
   },
   {
      name: " Chimakonde",
      code: "kde",
   },
   {
      name: " ChiShona",
      code: "sn",
   },
   {
      name: " Corsu",
      code: "co",
   },
   {
      name: "🇬🇧 Cymraeg",
      code: "cy",
   },
   {
      name: "🇳🇴 Davvisámegiella",
      code: "se",
   },
   {
      name: " Dholuo",
      code: "luo",
   },
   {
      name: " Diné bizaad",
      code: "nv",
   },
   {
      name: " Duálá",
      code: "dua",
   },
   {
      name: "🇪🇪 Eesti",
      code: "et",
   },
   {
      name: " Ekakairũ Naoero",
      code: "na",
   },
   {
      name: " Ekegusii",
      code: "guz",
   },
   {
      name: "🇬🇧 English",
      code: "en",
   },
   {
      name: "🇦🇺 Australian English",
      code: "en-AU",
   },
   {
      name: "🇬🇧 British English",
      code: "en-GB",
   },
   {
      name: "🇨🇦 Canadian English",
      code: "en-CA",
   },
   {
      name: "🇺🇸 U.S. English",
      code: "en-US",
   },
   {
      name: " Esperanto",
      code: "eo",
   },
   {
      name: "🇪🇸 Euskara",
      code: "eu",
   },
   {
      name: " Ewondo",
      code: "ewo",
   },
   {
      name: " Eʋegbe",
      code: "ee",
   },
   {
      name: "🇵🇭 Filipino",
      code: "fil",
   },
   {
      name: "🇨🇦 Français canadien",
      code: "fr-CA",
   },
   {
      name: "🇩🇪 Frysk",
      code: "fy",
   },
   {
      name: "🇮🇹 Furlan",
      code: "fur",
   },
   {
      name: "🇫🇴 Føroyskt",
      code: "fo",
   },
   {
      name: " Ga",
      code: "gaa",
   },
   {
      name: "🇮🇪 Gaeilge",
      code: "ga",
   },
   {
      name: "🇬🇧 Gaelg",
      code: "gv",
   },
   {
      name: " Gagana fa’a Sāmoa",
      code: "sm",
   },
   {
      name: "🇪🇸 Galego",
      code: "gl",
   },
   {
      name: " Gikuyu",
      code: "ki",
   },
   {
      name: "🇬🇧 Gàidhlig",
      code: "gd",
   },
   {
      name: "🇳🇬 Hausa",
      code: "ha",
   },
   {
      name: " Hibena",
      code: "bez",
   },
   {
      name: " Hiri Motu",
      code: "ho",
   },
   {
      name: "🇭🇷 Hrvatski",
      code: "hr",
   },
   {
      name: "🇿🇲 Ichibemba",
      code: "bem",
   },
   {
      name: " Ido",
      code: "io",
   },
   {
      name: "🇳🇬 Igbo",
      code: "ig",
   },
   {
      name: " Ikirundi",
      code: "rn",
   },
   {
      name: "🇫🇷 Interlingua",
      code: "ia",
   },
   {
      name: "🇨🇦 Inuktitut",
      code: "iu-Latn",
   },
   {
      name: " Ishisangu",
      code: "sbp",
   },
   {
      name: " IsiNdebele",
      code: "nd",
   },
   {
      name: "🇿🇦 IsiNdebele",
      code: "nr",
   },
   {
      name: "🇿🇦 IsiXhosa",
      code: "xh",
   },
   {
      name: "🇿🇦 IsiZulu",
      code: "zu",
   },
   {
      name: "🇨🇦 Iñupiaq",
      code: "ik",
   },
   {
      name: " Joola",
      code: "dyo",
   },
   {
      name: " Kabuverdianu",
      code: "kea",
   },
   {
      name: " Kaje",
      code: "kaj",
   },
   {
      name: "🇲🇭 Kajin M̧ajeļ",
      code: "mh",
   },
   {
      name: "🇬🇱 Kalaallisut",
      code: "kl",
   },
   {
      name: " Kalenjin",
      code: "kln",
   },
   {
      name: " Kanuri",
      code: "kr",
   },
   {
      name: " Katab",
      code: "kcg",
   },
   {
      name: "🇬🇧 Kernewek",
      code: "kw",
   },
   {
      name: " Khoekhoegowab",
      code: "naq",
   },
   {
      name: " Kihorombo",
      code: "rof",
   },
   {
      name: " Kikamba",
      code: "kam",
   },
   {
      name: " Kikongo",
      code: "kg",
   },
   {
      name: " Kimachame",
      code: "jmc",
   },
   {
      name: "🇷🇼 Kinyarwanda",
      code: "rw",
   },
   {
      name: " Kipare",
      code: "asa",
   },
   {
      name: " Kiruwa",
      code: "rwk",
   },
   {
      name: " Kisampur",
      code: "saq",
   },
   {
      name: " Kishambaa",
      code: "ksb",
   },
   {
      name: " Kiswahili ya Kongo",
      code: "swc",
   },
   {
      name: "🇰🇪 Kiswahili",
      code: "sw",
   },
   {
      name: " Kitaita",
      code: "dav",
   },
   {
      name: " Kiteso",
      code: "teo",
   },
   {
      name: " Koyra ciini",
      code: "khq",
   },
   {
      name: " Koyraboro senni",
      code: "ses",
   },
   {
      name: " Kreol morisien",
      code: "mfe",
   },
   {
      name: "🇭🇹 Kreyòl ayisyen",
      code: "ht",
   },
   {
      name: " Kwanyama",
      code: "kj",
   },
   {
      name: " Kölsch",
      code: "ksh",
   },
   {
      name: " Kĩembu",
      code: "ebu",
   },
   {
      name: " Kĩmĩrũ",
      code: "mer",
   },
   {
      name: " Kɨlaangi",
      code: "lag",
   },
   {
      name: " Lahnda",
      code: "lah",
   },
   {
      name: " Latine",
      code: "la",
   },
   {
      name: "🇱🇻 Latviešu",
      code: "lv",
   },
   {
      name: " Lea fakatonga",
      code: "to",
   },
   {
      name: "🇱🇹 Lietuvių",
      code: "lt",
   },
   {
      name: "🇧🇪 Limburgs",
      code: "li",
   },
   {
      name: " Lingála",
      code: "ln",
   },
   {
      name: "🇺🇬 Luganda",
      code: "lg",
   },
   {
      name: " Luluhia",
      code: "luy",
   },
   {
      name: "🇱🇺 Lëtzebuergesch",
      code: "lb",
   },
   {
      name: "🇭🇺 Magyar",
      code: "hu",
   },
   {
      name: " Makua",
      code: "mgh",
   },
   {
      name: "🇲🇬 Malagasy",
      code: "mg",
   },
   {
      name: "🇲🇹 Malti",
      code: "mt",
   },
   {
      name: " Mewari",
      code: "mtr",
   },
   {
      name: " Mundang",
      code: "mua",
   },
   {
      name: "🇳🇿 Māori",
      code: "mi",
   },
   {
      name: " Ngumba",
      code: "nmg",
   },
   {
      name: " Nuasue",
      code: "yav",
   },
   {
      name: "🇳🇴 Nynorsk",
      code: "nn",
   },
   {
      name: "🇫🇷 Occitan",
      code: "oc",
   },
   {
      name: " Old English",
      code: "ang",
   },
   {
      name: " Olusoga",
      code: "xog",
   },
   {
      name: "🇪🇹 Oromoo",
      code: "om",
   },
   {
      name: " OshiNdonga",
      code: "ng",
   },
   {
      name: " Otjiherero",
      code: "hz",
   },
   {
      name: "🇺🇿 Oʼzbekcha",
      code: "uz-Latn",
   },
   {
      name: "🇩🇪 Plattdüütsch",
      code: "nds",
   },
   {
      name: "🇵🇱 Polski",
      code: "pl",
   },
   {
      name: "🇵🇹 Português",
      code: "pt",
   },
   {
      name: "🇧🇷 Português do Brasil",
      code: "pt-BR",
   },
   {
      name: "🇸🇳 Pulaar",
      code: "ff",
   },
   {
      name: " Pāli",
      code: "pi",
   },
   {
      name: "🇪🇷 Qafar",
      code: "aa",
   },
   {
      name: " Reo Māohi",
      code: "ty",
   },
   {
      name: " Rikpa",
      code: "ksf",
   },
   {
      name: "🇷🇴 Română",
      code: "ro",
   },
   {
      name: " Rukiga",
      code: "cgg",
   },
   {
      name: " Rumantsch",
      code: "rm",
   },
   {
      name: " Runa Simi",
      code: "qu",
   },
   {
      name: " Runyankore",
      code: "nyn",
   },
   {
      name: " Saho",
      code: "ssy",
   },
   {
      name: "🇮🇹 Sardu",
      code: "sc",
   },
   {
      name: "🇨🇭 Schweizer Hochdeutsch",
      code: "de-CH",
   },
   {
      name: " Schwiizertüütsch",
      code: "gsw",
   },
   {
      name: " Seediq",
      code: "trv",
   },
   {
      name: " Sena",
      code: "seh",
   },
   {
      name: "🇿🇦 Sesotho sa Leboa",
      code: "nso",
   },
   {
      name: "🇿🇦 Sesotho",
      code: "st",
   },
   {
      name: "🇿🇦 Setswana",
      code: "tn",
   },
   {
      name: "🇦🇱 Shqip",
      code: "sq",
   },
   {
      name: "🇪🇹 Sidaamu Afo",
      code: "sid",
   },
   {
      name: "🇿🇦 Siswati",
      code: "ss",
   },
   {
      name: "🇸🇰 Slovenčina",
      code: "sk",
   },
   {
      name: "🇸🇮 Slovenščina",
      code: "sl",
   },
   {
      name: "🇸🇴 Soomaali",
      code: "so",
   },
   {
      name: "🇷🇸 Srpski",
      code: "sr-Latn",
   },
   {
      name: " Srpskohrvatski",
      code: "sh",
   },
   {
      name: "🇫🇮 Suomi",
      code: "fi",
   },
   {
      name: " Sängö",
      code: "sg",
   },
   {
      name: "🇵🇭 Tagalog",
      code: "tl",
   },
   {
      name: " Tamazight",
      code: "tzm-Latn",
   },
   {
      name: "🇩🇿 Taqbaylit",
      code: "kab",
   },
   {
      name: " Tasawaq senni",
      code: "twq",
   },
   {
      name: " Tashelhit",
      code: "shi",
   },
   {
      name: " Thok Nath",
      code: "nus",
   },
   {
      name: "🇻🇳 Tiếng Việt",
      code: "vi",
   },
   {
      name: "🇹🇯 Tojikī",
      code: "tg-Latn",
   },
   {
      name: "🇿🇦 Tshiluba",
      code: "lu",
   },
   {
      name: " Tshivenḓa",
      code: "ve",
   },
   {
      name: " Twi",
      code: "tw",
   },
   {
      name: " Unangax tunuu",
      code: "ale",
   },
   {
      name: " Valencià",
      code: "ca-valencia",
   },
   {
      name: " Viyamíĩ",
      code: "vai-Latn",
   },
   {
      name: " Volapük",
      code: "vo",
   },
   {
      name: " Vosa Vakaviti",
      code: "fj",
   },
   {
      name: "🇧🇪 Walon",
      code: "wa",
   },
   {
      name: "🇨🇭 Walser",
      code: "wae",
   },
   {
      name: " Wendic",
      code: "wen",
   },
   {
      name: "🇸🇳 Wolof",
      code: "wo",
   },
   {
      name: "🇿🇦 Xitsonga",
      code: "ts",
   },
   {
      name: " Zarmaciine",
      code: "dje",
   },
   {
      name: "🇳🇬 Èdè Yorùbá",
      code: "yo",
   },
   {
      name: "🇦🇹 Österreichisches Deutsch",
      code: "de-AT",
   },
   {
      name: "🇮🇸 íslenska",
      code: "is",
   },
   {
      name: "🇨🇿 čeština",
      code: "cs",
   },
   {
      name: " Ɓàsàa",
      code: "bas",
   },
   {
      name: " ɔl-Maa",
      code: "mas",
   },
   {
      name: " ʻŌlelo Hawaiʻi",
      code: "haw",
   },
   {
      name: "🇺🇿 Ўзбек",
      code: "uz",
   },
   {
      name: "🇺🇿 Азәрбајҹан",
      code: "az-Cyrl",
   },
   {
      name: " Аҧсуа",
      code: "ab",
   },
   {
      name: "🇷🇺 Ирон",
      code: "os",
   },
   {
      name: "🇰🇬 Кыргыз",
      code: "ky",
   },
   {
      name: "🇷🇸 Српски",
      code: "sr",
   },
   {
      name: " авар мацӀ",
      code: "av",
   },
   {
      name: " адыгэбзэ",
      code: "ady",
   },
   {
      name: " башҡорт теле",
      code: "ba",
   },
   {
      name: "🇧🇾 беларуская",
      code: "be",
   },
   {
      name: "🇧🇬 български",
      code: "bg",
   },
   {
      name: " коми кыв",
      code: "kv",
   },
   {
      name: "🇲🇰 македонски",
      code: "mk",
   },
   {
      name: "🇲🇳 монгол",
      code: "mn",
   },
   {
      name: "🇷🇺 нохчийн мотт",
      code: "ce",
   },
   {
      name: "🇷🇺 русский",
      code: "ru",
   },
   {
      name: " саха тыла",
      code: "sah",
   },
   {
      name: "🇷🇺 татар теле",
      code: "tt",
   },
   {
      name: "🇹🇯 тоҷикӣ",
      code: "tg",
   },
   {
      name: "🇹🇲 түркменче",
      code: "tk",
   },
   {
      name: "🇺🇦 українська",
      code: "uk",
   },
   {
      name: "🇷🇺 чӑваш чӗлхи",
      code: "cv",
   },
   {
      name: " ѩзыкъ словѣньскъ",
      code: "cu",
   },
   {
      name: "🇰🇿 қазақ тілі",
      code: "kk",
   },
   {
      name: "🇦🇲 Հայերեն",
      code: "hy",
   },
   {
      name: "🇺🇸 ייִדיש",
      code: "yi",
   },
   {
      name: "🇮🇱 עברית",
      code: "he",
   },
   {
      name: "🇨🇳 ئۇيغۇرچە",
      code: "ug",
   },
   {
      name: "🇵🇰 اردو",
      code: "ur",
   },
   {
      name: " اۉزبېک",
      code: "uz-Arab",
   },
   {
      name: "🇹🇯 تاجیکی",
      code: "tg-Arab",
   },
   {
      name: "🇮🇳 سنڌي",
      code: "sd",
   },
   {
      name: "🇮🇷 فارسی",
      code: "fa",
   },
   {
      name: "🇮🇳 پنجاب",
      code: "pa-Arab",
   },
   {
      name: "🇦🇫 پښتو",
      code: "ps",
   },
   {
      name: "🇮🇳 کأشُر",
      code: "ks",
   },
   {
      name: "🇹🇷 کوردی",
      code: "ku",
   },
   {
      name: "🇲🇻 ދިވެހިބަސް",
      code: "dv",
   },
   {
      name: "🇮🇳 कॉशुर",
      code: "ks-Deva",
   },
   {
      name: "🇮🇳 कोंकणी",
      code: "kok",
   },
   {
      name: "🇮🇳 डोगरी",
      code: "doi",
   },
   {
      name: " नेपाली",
      code: "ne",
   },
   {
      name: " प्राकृत",
      code: "pra",
   },
   {
      name: "🇮🇳 बड़ो",
      code: "brx",
   },
   {
      name: " ब्रज भाषा",
      code: "bra",
   },
   {
      name: "🇮🇳 मराठी",
      code: "mr",
   },
   {
      name: "🇮🇳 मैथिली",
      code: "mai",
   },
   {
      name: " राजस्थानी",
      code: "raj",
   },
   {
      name: "🇮🇳 संस्कृतम्",
      code: "sa",
   },
   {
      name: "🇮🇳 हिन्दी",
      code: "hi",
   },
   {
      name: "🇮🇳 অসমীয়া",
      code: "as",
   },
   {
      name: "🇧🇩 বাংলা",
      code: "bn",
   },
   {
      name: "🇮🇳 মৈতৈ",
      code: "mni",
   },
   {
      name: "🇮🇳 ਪੰਜਾਬੀ",
      code: "pa",
   },
   {
      name: "🇮🇳 ગુજરાતી",
      code: "gu",
   },
   {
      name: "🇮🇳 ଓଡ଼ିଆ",
      code: "or",
   },
   {
      name: "🇮🇳 தமிழ்",
      code: "ta",
   },
   {
      name: "🇮🇳 తెలుగు",
      code: "te",
   },
   {
      name: "🇮🇳 ಕನ್ನಡ",
      code: "kn",
   },
   {
      name: "🇮🇳 മലയാളം",
      code: "ml",
   },
   {
      name: "🇱🇰 සිංහල",
      code: "si",
   },
   {
      name: "🇱🇦 ລາວ",
      code: "lo",
   },
   {
      name: "🇮🇳 པོད་སྐད་",
      code: "bo",
   },
   {
      name: "🇧🇹 རྫོང་ཁ",
      code: "dz",
   },
   {
      name: "🇲🇲 မြန်မာဘာသာ",
      code: "my",
   },
   {
      name: "🇬🇪 ქართული",
      code: "ka",
   },
   {
      name: "🇪🇷 ብሊን",
      code: "byn",
   },
   {
      name: "🇪🇷 ትግረ",
      code: "tig",
   },
   {
      name: "🇪🇹 ትግርኛ",
      code: "ti",
   },
   {
      name: "🇪🇹 አማርኛ",
      code: "am",
   },
   {
      name: "🇪🇹 ወላይታቱ",
      code: "wal",
   },
   {
      name: " ᏣᎳᎩ",
      code: "chr",
   },
   {
      name: "🇨🇦 ᐃᓄᒃᑎᑐᑦ",
      code: "iu",
   },
   {
      name: " ᐊᓂᔑᓈᐯᒧᐎᓐ",
      code: "oj",
   },
   {
      name: " ᓀᐦᐃᔭᐍᐏᐣ",
      code: "cr",
   },
   {
      name: "🇰🇭 ភាសាខ្មែរ",
      code: "km",
   },
   {
      name: "🇲🇳 ᠮᠣᠨᠭᠭᠣᠯ ᠬᠡᠯᠡ",
      code: "mn-Mong",
   },
   {
      name: " ⵜⴰⵎⴰⵣⵉⵖⵜ",
      code: "shi-Tfng",
   },
   {
      name: " ⵜⴰⵎⴰⵣⵉⵖⵜ",
      code: "tzm",
   },
   {
      name: "🇭🇰 廣州話",
      code: "yue",
   },
   {
      name: "🇯🇵 日本語",
      code: "ja",
   },
   {
      name: "🇨🇳 简体中文",
      code: "zh",
   },
   {
      name: "🇨🇳 繁體中文",
      code: "zh-Hant",
   },
   {
      name: " ꆈꌠꉙ",
      code: "ii",
   },
   {
      name: " ꕙꔤ",
      code: "vai",
   },
   {
      name: " ꦧꦱꦗꦮ",
      code: "jv-Java",
   },
   {
      name: "🇰🇷 한국어",
      code: "ko",
   },
];

export default languages;
