import "./styles.css"
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const dropdowns = document.querySelectorAll('.dropdown')
const dropdownContent = document.querySelectorAll('.dropdown-content')

for(let i = 0; i < dropdowns.length; i++){
    dropdowns[i].addEventListener('click', (e) => openTab(e, i))
}

for(let i = 0; i < dropdowns.length; i++){
    dropdownContent[i].addEventListener('mouseleave', (e) => closeTab(e, i))
    window.addEventListener('touchstart', function(e) {
        if (e.target != dropdowns[i] && !dropdowns[i].contains(e.target) && e.target != dropdownContent[i] ) {
            dropdowns[i].classList.remove('block')
            dropdownContent[i].classList.add('hidden')
        }
    });
}

const openTab = (e, id) => {

    const item = dropdowns[id]
    const menu = dropdownContent[id]

    dropdownContent.forEach((sub, id) => {
        const item = dropdowns[id]
        item.classList.remove('block')
        sub.classList.add('hidden')
    });

    item.classList.add('block')
    menu.classList.remove('hidden')
}

const closeTab = (e) => {
    dropdownContent.forEach((sub, id) => {
        const item = dropdowns[id]
        item.classList.remove('block')
        sub.classList.add('hidden')
    });
}



dom.watch();
