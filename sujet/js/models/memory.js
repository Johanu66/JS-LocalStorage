import { Card } from './card.js';

export class Memory{
    #cards;

    constructor(){
        this.#cards = [];
    }

    get cards(){
        return this.#cards;
    }

    newGame(pairsNumber){
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

    formData(data){
        this.#cards = data.cards.map(cardData => new Card(cardData.value));
    }
}