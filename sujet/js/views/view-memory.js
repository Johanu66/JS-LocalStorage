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
        let cardCoverElement = document.createElement("div");
        cardElement.classList.add("card");

        cardElement.innerHTML = "&#x" + card.value;


        let clicked_card = this.#controllerMemory.current_card();
        if(card.faceHidden){
            cardElement.classList.add("hidden");
        }
        else if(clicked_card == card){
            cardElement.classList.add("hidden");
            setTimeout(() => {
                cardElement.classList.remove("hidden");
            }, 1);
        }

        cardElement.addEventListener("click", () => {
            this.#controllerMemory.showCard(this.#controllerMemory.memory.cards.indexOf(card));
        });

        cardElement.appendChild(cardCoverElement);

        document.querySelector(".cards").appendChild(cardElement);
    }

    displayCards(){
        document.querySelector(".cards").innerHTML = "";
        let cards = this.#controllerMemory.memory.cards;
        for (let card of cards){
            this.displayCard(card);
        }
        
        if(this.#controllerMemory.win){
            document.querySelector(".congrats").classList.remove("noshow");
        }else{
            document.querySelector(".congrats").classList.add("noshow");
        }
    }
}