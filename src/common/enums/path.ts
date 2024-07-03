export enum path {
  base = '/',
  cards = '/cards',
  deck = '/deck',
  decks = '/decks',
  email = '/email',
  error = '/error',
  newPassword = '/new-password',
  profile = '/profile',
  recoveryPassword = '/recovery-password',
  signIn = '/signIn',
  signUp = '/signUp',
}

// dynamic path

export const dynamicPathDeckById = (deckId: string) => `${path.decks}/${deckId}` //get & post & delete
export const dynamicPathCardsInDeck = (deckId: string) => `${path.decks}/${deckId}/cards` //get & post
export const dynamicPathLearnCardInDeck = (deckId: string) => `${path.decks}/${deckId}/learn` //get & post

export const dynamicPathCardById = (cardId: string) => `${path.cards}/${cardId}` //get & post & delete
