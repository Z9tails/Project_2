const cards = document.querySelectorAll('.card');



const onCardClick = async (e) => {
    const card =e.currentTarget;
    //clone the card
    const cardClone = card.cloneNode(true);
    // get location in the view 
    const {top, left, width, height} = card.getBoundingClientRect();
    // position the card
    cardClone.style.position = 'fixed';
    cardClone.style.top= top+'px';
    cardClone.style.left= left+'px';   
    cardClone.style.width= width+'px';
    cardClone.style.height= height+'px';
    //hides card completely
    cardClone.style.opacity = '0';
    // add card to the same container
    card.parentNode.appendChild(cardClone);

    const selectButton = document.createElement('select');
    selectButton.style = `position:fixed; 
                            z-index:6000; 
                            top: 0px; 
                            right: 0px; 
                            left: 0px; 
                            width: 0px; 
                            height: 0px; 
                            border-radius: 50%; 
                            background-color: transparent;
                            `;
                            
};



cards.forEach(card => card.addEventListener('click', onCardClick));