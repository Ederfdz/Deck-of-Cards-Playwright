# Deck-of-Cards-Playwright

This project uses the Deck of Cards API to automate a quick game of Blackjack between 2 users.
House rules are very simple, player closest to 21 wins.
User scores will be printed to the console, depending on the value of the cards drawn by the user.

API requests are made with the help of Playwright in order to get a new deck, shuffle the deck, and draw cards.
You can read more about the API here: https://deckofcardsapi.com/

# Installation
```

npm init playwright@latest

npm install typescript --save-dev

```
# Run Game

```

npx playwright test

```
