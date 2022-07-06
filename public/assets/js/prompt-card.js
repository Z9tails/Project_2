document.getElementById("start-game").onclick = function() {
    document.getElementById("card-game").classList.toggle("hide");
    state = {}
    showTextNode(1)
};

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option =>{
        if(showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('card');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption (option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up to a jarring sound. What do you do?',
        options: [
            {
                text:'Go back to sleep',
                nextText: 2
            },
            {
                text: 'Get up to see what the noise was',
                nextText: 3
            },
            {
                text: 'Scream into the void',
                nextText: 8
            }
        ]
    },
    {
        id: 2,
        text: 'Oh no! Your cowardly actions have led you to being killed in your sleep by something unspeakable!',
        setState: {dead: true}
    },
    {
        id: 3,
        text: 'You get up to investigate. Catching movement out of the corner of your eye, you frantically reach to grab the closest thing to defend yourself with.',
        options: [
            {
                text: 'A wooden bat',
                nextText: 4
            },
            {
                text: 'A revolver',
                nextText: 4
            },
            {
                text: 'A half-eaten bowl of ramen from last night',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: 'Maybe you should put some clothes on..?',
        options: [
            {
                text: 'A colorful, fluffy poncho',
                nextText: 5,
            },
            {
                text: 'A dirty shirt and pair of pants from the hamper',
                nextText: 5,
            },
            {
                text: "No clothes. Face whatever it is you're up against fast and in the buff",
                nextText: 5,
            }
        ]
    },
    {
        id: 5,
        text: "Alright, now what order are you going to put on your socks and shoes?",
        options: [
            {
                text: 'Sock, sock, shoe, shoe',
                nextText: 7
            },
            {
                text: 'Sock, shoe, sock, shoe',
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: 'What? Really? If you insist. Unfortunately the additional time it took to engage in that monstrous action has led to you being attacked by a horde of rats as you were caught mid-shoeing. The slight imbalance between having one sock and shoe installation complete, resulting in a horrific ankle sprain as you couldn’t compensate and ended up running in a circle. Quickly the rats converge, blinding you as they go for the soft parts first. What a gruesome end.'
    },
    {
        id: 7,
        text: 'Excellent, you head outside ready to fight the enemy.'
    },
    {
        id: 8,
        text: 'If picked- You begin to scream into the void, answering back the call of futility as the entropic nature of existence absorbs the sound in the distance, much like any hope of returning to sleep. Oddly while something definitely skittered away, something much larger rumbles and begins tossing you about, you are thrown out of bed into the world nude, but not without grabbing your favorite:',
        options: [
            {
                text: 'Umbrella',
                nextText: 9,
            },
            {
                text: 'One wheel',
                nextText: 14
            },
            {
                text: 'Machete',
                nextText: 15
            }
        ]
    },
    {
        id: 9,
        text: 'You stand there naked, throat hoarse from the screaming, shaken and stirred, suddenly there is a shrill scream and it dawns on you there is a person staring at you. Fortunately you have the umbrella and pop it out covering yourself. The person is in shock allowing you to escape from the individual’s presence, avoiding what else could have possibly happened.You keep scooting along to try and put more distance between you and the other person, but you hear thudding footsteps behind you, seeming to get closer and closer. Do you...',
        options: [
            {
                text: 'Serpentine',
                nextText: 11
            },
            {
                text: 'Try to run faster',
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        text: "You are not wearing any shoes, you cannot go faster. Turns out these last two years of isolation did a number on your cardio too. You end up with stitches in your side, wheezing, tripping and collapse blacking out."
    },
    {
        id: 11,
        text: 'You juke and weave, lightly cutting up your bare feet, but it seems to be working, the footsteps are falling behind now, which is great. You start to cut across the landscape following a game trail when you come to a fork in the pathway. Which direction do you go?',
        options: [
            {
                text: 'Left',
                nextText: 12
            },
            {
                text: 'Right',
                nextText: 13
            }
        ]
    },
    {
        id: 12,
        text: "Do you ignore red flags in your life as hard as this? Well it’s bear time! You have ended up between a bear cub and it’s mother."
    },
    {
        id: 13,
        text: 'The pathway to your right opens up to deep crystal pool. You are safe, for now.'
    },
    {
        id: 14,
        text: 'You quickly mount up on your One-Wheel, grateful it isn’t as pitiful as those hoverboards and you take off full speed to get away from whatever launched you out of bed.'
    },
    {
        id: 15,
        text: 'As you see the intruder, you feel brave and charge at them. But then you didn’t notice the one rat that didn’t escape with the horde in front of you and trip on it. You then fall face first into your own machete.',
        setState: {dead: true}
    }
]