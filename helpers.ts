// Function takes userCardsArray and gets sum (User Score)
export function getUserScore(user) {
    let sum = 0;
    for (let y = 0; y < user.length; y++) {
        sum += user[y]; 
      }
      return sum;
  }

  // Function takes User 1 and User 2 scores and calculates which is closest to 21 to determine winner
  export function decideWinner(user1Score, user2Score) {
    const target = 21;
    
    // Calculate the absolute differences
    const diff1 = Math.abs(user1Score - target);
    const diff2 = Math.abs(user2Score - target);
  
    // Compare the absolute differences
    if (diff1 < diff2) {
      return console.log(`\nUser 1 wins!!!`);
    } else if (diff2 < diff1) {
        return console.log(`\nUser 2 wins!!!`);
    } else {
      return "It's a Draw";
    }
  }