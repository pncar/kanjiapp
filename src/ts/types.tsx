  interface TypeSettings {
    open: boolean,
    darkMode: boolean,
    serif: boolean,
    activeItems: {meaning: boolean, onyomi: boolean, kunyomi: boolean},
    showHints: boolean,
    quantity: number,
    autoCorrection: boolean,
    groups: {title: string, content: TypeKanji[], active: boolean}[]
  }

  interface TypeKanji {
    id: number,
    symbol: string,
    meaning: string,
    onyomi: string,
    kunyomi: string,
    property?: any
  }

  interface KanjiObj {
    kanji: TypeKanji,
    correct: boolean,
    submitted: boolean
  }

  export type {TypeSettings,TypeKanji,KanjiObj};