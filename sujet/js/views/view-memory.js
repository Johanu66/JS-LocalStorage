import { Observer } from "../patterns/observer.js";

export class ViewMemory extends Observer
{
    #controllerMemory;

    constructor(controllerMemory)
    {
        super();

        this.#controllerMemory = controllerMemory;
        this.#controllerMemory.addObserver(this);
    }

    get controllerMemory(){
        return this.#controllerMemory;
    }

    notify()
    {
        this.displayCards();
    }

    displayCard(card){
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");

        // cardElement.addEventListener("click", () => {
        //     this.#controllerMemory.createCard();
        // });

        cardElement.innerHTML = "&#x" + card.value;
        document.querySelector(".cards").appendChild(cardElement);
    }

    displayCards(){
        let cards = this.#controllerMemory.memory.cards;
        for (let card of cards){
            this.displayCard(card);
        }
    }
}