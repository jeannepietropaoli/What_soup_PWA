const movingItems = [
    {
        name: 'ramen_bowl',
        DOMElement: document.getElementById('ramen_bowl'),
        offsetYRate: 0.15,
        offsetXRate: -0.03,
        rotateRate: 0.05
    },
    {
        name: 'brocoli',
        DOMElement: document.getElementById('brocoli'),
        offsetYRate: 0.15,
        offsetXRate: -0.03,
        rotateRate: 0.05
    },
    {
        name: 'veggie_1',
        DOMElement: document.getElementById('veggie_1'),
        offsetYRate: 0.5,
        offsetXRate: 0.25,
        rotateRate: 0.4
    },
    {
        name: 'veggie_2',
        DOMElement: document.getElementById('veggie_2'),
        offsetYRate: 0.4,
        offsetXRate: 0,
        rotateRate: 0.3
    },
    {
        name: 'veggie_3',
        DOMElement: document.getElementById('veggie_3'),
        offsetYRate: 0.4,
        offsetXRate: 0.1,
        rotateRate: 0.6
    },
    {
        name: 'veggie_4',
        DOMElement: document.getElementById('veggie_4'),
        offsetYRate: 0.4,
        offsetXRate: 0.15,
        rotateRate: 0.4
    },
    {
        name: 'veggie_5',
        DOMElement: document.getElementById('veggie_5'),
        offsetYRate: 0.5,
        offsetXRate: 0.15,
        rotateRate: 0.1
    },
    {
        name: 'veggie_6',
        DOMElement: document.getElementById('veggie_6'),
        offsetYRate: 0.4,
        offsetXRate: 0.25,
        rotateRate: 0.4
    },
]

window.addEventListener('scroll', () => {
    movingItems.forEach(item => {
        let scrollPosition = window.scrollY;
        let offsetY = scrollPosition * item.offsetYRate;
        let offsetX = scrollPosition * item.offsetXRate;
        let rotateRate = scrollPosition * item.rotateRate;
        item.DOMElement.style.transform = `translateY(${offsetY}px) translateX(${offsetX}px) rotate(${rotateRate}deg)`;
    })
})