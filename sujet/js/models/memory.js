import { Card } from './card.js';

export class Memory{
    #cards;
    #card1;
    #card2;

    constructor(){
        this.#cards = [];
        this.#card1 = null;
        this.#card2 = null;
    }

    get cards(){
        return this.#cards;
    }

    newGame(pairsNumber){
        this.#cards = [];
        for( let i = 0; i < pairsNumber; i++){
            this.cards.splice(Math.floor(Math.random() * this.getCardsNumber()), 0, new Card((129292 + i).toString(16)));
            this.cards.splice(Math.floor(Math.random() * this.getCardsNumber()), 0, new Card((129292 + i).toString(16)));
        }
    }

    getCardsNumber(){
        return this.cards.length;
    }

    getCard(index){
        return this.cards[index];
    }

    toData(){
        return { cards: this.cards.map(card => card.toData()) };
    }

    fromData(data){
        this.#cards = data.cards.map(cardData => new Card(cardData.value, cardData.faceHidden));
    }

    showCard(index){
        let card = this.cards[index];
        if(card.faceHidden){
            card.show();
            return card;
        }
        return null;
    }
}