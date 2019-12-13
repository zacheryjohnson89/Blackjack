///////////// MODEL

var modelController = (function() {

    var currentDeck;

    // holds data objects for all 52 cards
    var cards = {                                                           
        'AC': {
            'id': 0,
            'value': 11
        },
        '2C': {
            'id': 1,
            'value': 2
        },
        '3C': {
            'id': 2,
            'value': 3
        },
        '4C': {
            'id': 3,
            'value': 4
        },
        '5C': {
            'id': 4,
            'value': 5
        },
        '6C': {
            'id': 5,
            'value': 6
        },
        '7C': {
            'id': 6,
            'value': 7
        },
        '8C': {
            'id': 7,
            'value': 8
        },
        '9C': {
            'id': 8,
            'value': 9
        },
        '10C': {
            'id': 9,
            'value': 10
        },
        'JC': {
            'id': 10,
            'value': 10
        },
        'QC': {
            'id': 11,
            'value': 10
        },
        'KC': {
            'id': 12,
            'value': 10
        },
        'AD': {
            'id': 13,
            'value': 11
        },
        '2D': {
            'id': 14,
            'value': 2
        },
        '3D': {
            'id': 15,
            'value': 3
        },
        '4D': {
            'id': 16,
            'value': 4
        },
        '5D': {
            'id': 17,
            'value': 5
        },
        '6D': {
            'id': 18,
            'value': 6
        },
        '7D': {
            'id': 19,
            'value': 7
        },
        '8D': {
            'id': 20,
            'value': 8
        },
        '9D': {
            'id': 21,
            'value': 9
        },
        '10D': {
            'id': 22,
            'value': 10
        },
        'JD': {
            'id': 23,
            'value': 10
        },
        'QD': {
            'id': 24,
            'value': 10
        },
        'KD': {
            'id': 25,
            'value': 10
        },
        'AH': {
            'id': 26,
            'value': 11
        },
        '2H': {
            'id': 27,
            'value': 2
        },
        '3H': {
            'id': 28,
            'value': 3
        },
        '4H': {
            'id': 29,
            'value': 4
        },
        '5H': {
            'id': 30,
            'value': 5
        },
        '6H': {
            'id': 31,
            'value': 6
        },
        '7H': {
            'id': 32,
            'value': 7
        },
        '8H': {
            'id': 33,
            'value': 8
        },
        '9H': {
            'id': 34,
            'value': 9
        },
        '10H': {
            'id': 35,
            'value': 10
        },
        'JH': {
            'id': 36,
            'value': 10
        },
        'QH': {
            'id': 37,
            'value': 10
        },
        'KH': {
            'id': 38,
            'value': 10
        },
        'AS': {
            'id': 39,
            'value': 11
        },
        '2S': {
            'id': 40,
            'value': 2
        },
        '3S': {
            'id': 41,
            'value': 3
        },
        '4S': {
            'id': 42,
            'value': 4
        },
        '5S': {
            'id': 43,
            'value': 5
        },
        '6S': {
            'id': 44,
            'value': 6
        },
        '7S': {
            'id': 45,
            'value': 7
        },
        '8S': {
            'id': 46,
            'value': 8
        },
        '9S': {
            'id': 47,
            'value': 9
        },
        '10S': {
            'id': 48,
            'value': 10
        },
        'JS': {
            'id': 49,
            'value': 10
        },
        'QS': {
            'id': 50,
            'value': 10
        },
        'KS': {
            'id': 51,
            'value': 10
        },


        // returns a cards object name based on card ID
        findCard: function(cardID) {                                            
            for (var n in this) {
                if(this.hasOwnProperty(n)) {
                    if(this[n]['id'] === cardID) {
                        return n;
                    }
                };
            };
        },

        //  returns the value of a card based on the cards object name
        findCardValue: function(cardName) {                                      
            return this[cardName].value;
        }

    };

    //   Data structure for players hands
    var hands = {                                                               
        'player': {
            'cardNames': [],
            'cardValues': [],
            "total": 0
        },
        'dealer': {
            'cardNames': [],
            'cardValues': [],
            "total": 0
        },

        //  removes card from currentDeck and adds it to a players hand data structure
        addCardToHand: function(playerType) {                                    
            // Remove card from array and save the ID value
            var ID = currentDeck.pop();

            // Add card name to player properties array
            var cardName = cards.findCard(ID);
            this[playerType].cardNames.push(cardName);

            // Add card value to player properties array
            this[playerType].cardValues.push(cards.findCardValue(cardName));

            // update total 
            this.updateTotal(playerType);

            // update card counter
            cardCounter.countCard(ID);
        },

        //  updates players total score property
        updateTotal: function(playerType) {                                         
            // adds card values
            var values = this[playerType].cardValues;
            var sum = 0;
            for (var i = 0; i < values.length; i++) {
                sum += values[i];
            }

            //updates total in players hand
            this[playerType].total = sum;
            
        },

         //  plays out dealers hand based on standard blackjack rules
        playDealersHand: function() {                                              
            while (this.dealer.total < this.player.total) {
                this.addCardToHand('dealer');
            }
        },

        // changes aces in array to value = 1
        mutateAces: function(playerType) {                                          
            
            // make new array of values
            var newValues = [];
            var player = this[playerType].cardValues
            for (var i = 0; i < player.length; i++) {
                if (player[i] === 11) {
                    newValues.push(1);
                } else {
                    newValues.push(player[i]);
                }
            }

            // update value array with new array
            this[playerType].cardValues = newValues;

            // update players total
            this.updateTotal(playerType);

        },

        //  returns true if the player has busted
        analyzeBust: function(playerType) {                                          
            if (this[playerType].total > 21) {
                return true;
            } else {
                return false;
            }
        },

        //  checks both hands to see who won
        analyzeHand: function() {                                                   
            
            //  play out the dealers hand
            this.playDealersHand();

            // check if the dealer busted
            var dealerBust = this.analyzeBust('dealer');
            if (dealerBust) {
                this.mutateAces('dealer');
                this.playDealersHand();
            }
            var dealerBust = this.analyzeBust('dealer');

            // if dealer didn't bust, check scores and return the winner
            var winner = null;
            var playerTotal = this.player.total;
            var dealerTotal = this.dealer.total;

            if (dealerBust) {
                winner = 'player';
            } else if (playerTotal > dealerTotal) {
                winner = 'player';
            } else if (playerTotal < dealerTotal) {
                winner = 'dealer';
            } else {
                winner = 'push'
            }
            return winner;

        },

        clearHands: function() {
            this.player.cardNames = [];
            this.player.cardValues = [];
            this.player.total = 0;
            this.dealer.cardNames = [];
            this.dealer.cardValues = [];
            this.dealer.total = 0;
        }

    }

    // Create a random shuffle of n decks and return array of cardID's
    function newDeck(numOfDecks) {                                                  
        // create a random number between 0 and 51
        var randomNum = function () {
            return Math.floor(Math.random() * 52);
        };
        // empty array to hold the deck values
        var deck = [];

        // loop through deck array to check for conditions
        function cardAvailable(num) {
            var counter = 0;
            for (var i = 0; i < deck.length; i++) {
                if (deck[i] === num) {
                    counter++;
                };
            };
            if (counter >= numOfDecks) {
                return false;
            } else {
                return true;
            }
        };

        // add new card to deck
        function addCard(num) {
            deck.push(num);
        }

        // fill array until it is full
        while (deck.length < (52 * numOfDecks) ) {
            var number = randomNum();
            var conCheck = cardAvailable(number);
            if (conCheck) {
                addCard(number);
            };
        };

        // return the shuffled deck
        currentDeck = deck;
    };

    var cardCounter = {
        countValue: 0,

        countCard: function(cardID) {
            var cardValue = cards.findCardValue(cards.findCard(cardID));

            if (cardValue >= 10) {
                this.countValue -= 1;
            } else if (cardValue < 7 && cardValue > 1) {
                this.countValue += 1;
            }
        }
    };

    var wallet = {
        walletValue: 0,
        betValue: 0,

        updateBet: function(amount) {
            if(this.betValue === 0) {
                this.betValue += parseInt(amount);
                // this.walletValue -= amount;
            }
        },

        clearBet: function() {
            this.betValue = 0;
        },

        updateWallet: function(outcome) {
            if(outcome === 'player') {
                this.walletValue += parseInt(this.betValue);
            } else if (outcome === 'dealer') {
                this.walletValue -= parseInt(this.betValue); 
            }
            this.clearBet();
        },

        clearWallet: function() {
            this.walletValue = 0;
        }
    };


    return {
        getHands: function() {
            return hands;
        },

        shuffleDeck: function() {
            return newDeck;
        },

        clearDeck: function() {
            currentDeck = [];
        },

        getCounter: function() {
            return cardCounter;
        },

        getWallet: function() {
            return wallet;
        }
    }
    


})();



//******************  VIEW   ***********************/

var viewController =  (function() {

    var DOMstrings = {
        newButton: '.new-btn',
        startButton: '.start-btn',
        getName: '.get-name',
        getDecks: '.get-decks',
        dealButton: '.deal-btn',
        hitButton: '.hit-btn',
        holdButton: '.hold-btn',
        player: '.player',
        dealer: '.dealer',
        CCcheckbox: '.card-count-checkbox',
        setWallet: '.set-wallet',
        betInput: '#bet-input',
        betValue: '#bet'
    }

    return {
        getDomStrings: function() {
            return DOMstrings;
        },

        displaySetup: function() {
            document.getElementById('setup').style.display = 'block';
        },

        clearSetup: function() {
            document.getElementById('setup').style.display = 'none';
        },

        displayName: function(name) {
            document.getElementById('name').innerHTML = name;
        },

        displayCards: function(playerType, cardArray) {

            for (var i = 0; i < cardArray.length; i++) {
            // create img tag
            var html = '<img src="./PNG/%img%.png" alt="No Image"></img>';

            // replace placeholder text with data
            var newHtml = html.replace("%img%", cardArray[i]);
            
            // insert HTML into DOM
            if(playerType === 'player') {
                var container = DOMstrings.player;
            } else if(playerType === 'dealer') {
                var container = DOMstrings.dealer;
            }

            document.querySelector(container).insertAdjacentHTML("beforeend", newHtml)
            }

        },

        hideDealerCard: function() {
            // create image of back card
            var html = '<img src="./PNG/red_back.png" alt="No Image"></img>';

            // remove the current displayed first card
            var node = document.getElementById('dealer');
            node.removeChild(node.childNodes[0]);

            // add in image of back card
            document.querySelector(DOMstrings.dealer).insertAdjacentHTML("afterbegin", html);           

        },

        clearCards: function(playerName) {
            if (playerName === 'player') {
                document.getElementById('player').innerHTML = "";
            } else if (playerName === 'dealer') {
                document.getElementById('dealer').innerHTML = "";
            }
        },

        displayOutcome: function(outcome) {
            if(outcome === 'player') {
                document.getElementById('you-win').style.display = 'block';
            } else if (outcome === 'dealer') {
                document.getElementById('you-lose').style.display = 'block';
            } else if (outcome === 'push') {
                document.getElementById('push').style.display = 'block';
            }
        },

        displayBust: function() {
            document.getElementById('bust').style.display = 'block';
        },

        clearOutcome: function() {
            document.getElementById('you-win').style.display = 'none';
            document.getElementById('you-lose').style.display = 'none';
            document.getElementById('push').style.display = 'none';
            document.getElementById('bust').style.display = 'none';
        },

        displayCardCount: function(countValue) {
            document.getElementById('card-count').innerHTML = countValue;
        },

        cardCounterOn: function() {
            document.getElementById('card-count').style.visibility = 'visible';
        },

        cardCounterOff: function() {
            document.getElementById('card-count').style.visibility = 'hidden';
        },

        displayWallet: function(walletValue) {
            document.getElementById('wallet').innerHTML = walletValue;
        },

        displayBetInput: function() {
            document.getElementById('bet-input').style.display = 'block';
        },

        displayBetAmount: function(betAmount) {
            document.getElementById('bet').style.display = 'block';
            document.getElementById('bet').innerHTML = betAmount;
        },

        clearBetDisplay: function() {
            document.getElementById('bet-input').style.display = 'none';
            document.getElementById('bet').style.display = 'none';
        }

    };

})();



//*************** CONTROLLER ***************** */

var controller = (function(model, view) {

    var init = function() {
        var hands = model.getHands();
        var cardCounter = model.getCounter();

        view.clearOutcome();
        view.clearCards('player');
        view.clearCards('dealer');
        view.clearBetDisplay();
        hands.clearHands();
        model.clearDeck();
        cardCounter.countValue = 0;
        view.displayCardCount(0);
        eventListeners();
        outplayEventListeners();
        view.displaySetup();
        
        console.log("application has started")

    };

    var setupGame = function() {
        var DOM = view.getDomStrings();
        var wallet = model.getWallet();

        // display name based on input
        var nameValue = document.querySelector(DOM.getName).value;
        if(nameValue) {
            var name = nameValue;
            view.displayName(name);
        } else {
            alert("Enter a name")
        }


        // create a new deck based on input
        var deckValue = document.querySelector(DOM.getDecks).value;
        if(deckValue < 10 && deckValue > 0) {
            var decks = deckValue;
            model.shuffleDeck()(decks);
        } else {
            alert("Enter number of decks between 1 and 10")
        }

        // set wallet amount based on input
        walletValue = document.querySelector(DOM.setWallet).value;
        if(walletValue > 0) {
            var walletSetting = walletValue;
            wallet.walletValue = walletSetting;
            view.displayWallet('$ ' + wallet.walletValue);
        } else {
            alert("Enter a wallet value greater than 0")
        }
        // clear setup display
        view.clearSetup();
    };

    var eventListeners = function() {
        var DOM = view.getDomStrings();

        document.querySelector(DOM.CCcheckbox).addEventListener('change', function() {
            if(this.checked) {
                view.cardCounterOn();
            } else {
                view.cardCounterOff();
            }
        });
    };

    var outplayEventListeners = function() {
        var DOM = view.getDomStrings();

        document.querySelector(DOM.newButton).addEventListener( "click", init);
    
        document.querySelector(DOM.startButton).addEventListener( "click", setupGame);
    
        document.querySelector(DOM.dealButton).addEventListener( "click", dealCards);

    };

    var inplayEventListeners = function() {
        var DOM = view.getDomStrings();

        document.querySelector(DOM.hitButton).addEventListener("click", hitMe);
    
        document.querySelector(DOM.holdButton).addEventListener("click", hold);
    };

    var removeInplayEventListeners = function() {
        var DOM = view.getDomStrings();

        document.querySelector(DOM.hitButton).removeEventListener("click", hitMe);
    
        document.querySelector(DOM.holdButton).removeEventListener("click", hold);
    };

    var removeOutplayEventListeners = function() {
        var DOM = view.getDomStrings();
        
        document.querySelector(DOM.dealButton).removeEventListener( "click", dealCards);
    };

    var dealCards = function() {
        var hands = model.getHands();
        var cardCounter = model.getCounter();
        var wallet = model.getWallet();
        var DOM = view.getDomStrings();
        
        // clear cards from view and empty player hands
        view.clearCards('player');
        view.clearCards('dealer');
        hands.clearHands();

        // clear outcome display
        view.clearOutcome();

        // Add 2 cards to each hand
        hands.addCardToHand('player');
        hands.addCardToHand('dealer');
        hands.addCardToHand('player');
        hands.addCardToHand('dealer');

        // display cards in each hand
        view.displayCards('player', hands.player.cardNames);
        view.displayCards('dealer', hands.dealer.cardNames);
        view.hideDealerCard();

        // update card counter display
        view.displayCardCount(cardCounter.countValue);

        // display betting field
        wallet.clearBet();
        document.querySelector(DOM.betInput).value = "";
        view.displayBetInput();

        // change play state
        inplayEventListeners();
        removeOutplayEventListeners();

    };

 

    var hitMe = function() {

        var DOM = view.getDomStrings();
        var betAmount = parseInt(document.querySelector(DOM.betInput).value);

        if(!betAmount) {
            alert("Enter a bet amount");
        } else {
            var hands = model.getHands();
            var cardCounter = model.getCounter();
            var wallet = model.getWallet();
    
            //clear cards from player view
            view.clearCards('player');
    
            // Add card to players hand
            hands.addCardToHand('player');
    
            // display cards in players hand
            view.displayCards('player', hands.player.cardNames);
    
            //analyze bust 
            var playerBust = hands.analyzeBust('player');
            if(playerBust) {
                hands.mutateAces('player');
            };
            playerBust = hands.analyzeBust('player');
            if(playerBust) {
                wallet.updateBet(betAmount);
                wallet.updateWallet('dealer');
                view.displayWallet(wallet.walletValue);
                view.displayBust();
                view.clearBetDisplay();
                outplayEventListeners();
                removeInplayEventListeners();
                return;
            };
    
            // update card counter display
            view.displayCardCount(cardCounter.countValue);
    
            // removing betting field
                view.clearBetDisplay();
                wallet.updateBet(betAmount);
                view.displayBetAmount(betAmount);
                view.displayWallet(wallet.walletValue);
        }
    };

    var hold = function() {
        var DOM = view.getDomStrings();
        var betAmount = parseInt(document.querySelector(DOM.betInput).value);

        if(!betAmount) {
            alert("Enter a bet amount");
        } else {
            var hands = model.getHands();
            var cardCounter = model.getCounter();
            var wallet = model.getWallet();
    
            // play dealers hand and analyze the winner
            var outcome = hands.analyzeHand();
    
            // display dealers hand
            view.clearCards('dealer');
            view.displayCards('dealer', hands.dealer.cardNames);
    
            // display the outcome
            view.displayOutcome(outcome);
    
            // update card counter display
            view.displayCardCount(cardCounter.countValue);
    
            // change play state
            outplayEventListeners();
            removeInplayEventListeners();
    
            // update bet amounts
                wallet.updateBet(betAmount);
                wallet.updateWallet(outcome);
                view.displayWallet(wallet.walletValue);
                view.clearBetDisplay();
        }
    };


    return {
        initializeGame: function() {
            init();
        }
        
    };

})(modelController, viewController);

controller.initializeGame();