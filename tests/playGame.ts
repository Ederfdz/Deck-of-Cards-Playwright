import { test, expect } from '@playwright/test';
import { getUserScore, decideWinner } from '../helpers';

test.describe.parallel('Deck of cards API game', () => {

  test.only('Start game', async ({ request }) => {
    const baseUrl = 'https://deckofcardsapi.com/api/deck'
    let userCardsArray: (number)[] = [];
    // Function that gets card value and pushes that value into userCardsArray
    function getCardValues(user) {
      for(let x = 0; x < 3; x++){
        let cardValue: number;
        if(user.cards[x].value == 'KING' || user.cards[x].value == 'JACK' || user.cards[x].value == 'QUEEN'){
        cardValue = 10;
        } else if(user.cards[x].value == 'ACE'){
        cardValue = 11;  
        } else {
        cardValue = parseInt(user.cards[x].value);
        }
        userCardsArray.push(cardValue); 
      }
    }

    // Get a new deck
    const initialResponse = await request.get(`${baseUrl}/new/`);
    await expect(initialResponse.status()).toBe(200);
    const initialResponseData = JSON.parse(await initialResponse.text());
    // Store Deck ID
    const deckID = await initialResponseData.deck_id;
    // Shuffle the deck
    const shuffleResponse = await request.get(`${baseUrl}/${deckID}/shuffle/`);  
    await expect(shuffleResponse.status()).toBe(200)
    // User 1 draws 3 cards
    const user1Response = await request.get(`${baseUrl}/${deckID}/draw/?count=3`);
    await expect(user1Response.status()).toBe(200);
    const user1ResponseData = JSON.parse(await user1Response.text());
    getCardValues(user1ResponseData);
    const user1Score = getUserScore(userCardsArray);
    // Log User 1 cards
    console.log(`User 1 drew a ${user1ResponseData.cards[0].value} of ${user1ResponseData.cards[0].suit}, a ${user1ResponseData.cards[1].value} of ${user1ResponseData.cards[1].suit}, and a ${user1ResponseData.cards[2].value} of ${user1ResponseData.cards[2].suit}`);
    // Clear cards array
    userCardsArray = [];
    // User 2 draws 3 cards
    const user2Response = await request.get(`${baseUrl}/${deckID}/draw/?count=3`);
    await expect(user2Response.status()).toBe(200);
    const user2ResponseData = JSON.parse(await user2Response.text());
    getCardValues(user2ResponseData);
    const user2Score = getUserScore(userCardsArray);
    // Log User 2 cards
    console.log(`User 2 drew a ${user2ResponseData.cards[0].value} of ${user2ResponseData.cards[0].suit}, a ${user2ResponseData.cards[1].value} of ${user2ResponseData.cards[1].suit}, and a ${user2ResponseData.cards[2].value} of ${user2ResponseData.cards[2].suit}`);
    //Calculate winner
    console.log(`User 1 score: ${user1Score}`);
    console.log(`User 2 score: ${user2Score}`);
    decideWinner(user1Score, user2Score);
  });
})
  


