// Import necessary files
import Products from './products.js'

// Selectors
const colorVariantBtns = document.getElementById('color-varient')
const colorVariantContainer = document.getElementById('color-variant-container')
const productImage = document.getElementById('product-image')
const gradColor = document.querySelectorAll('.grad-color')
const groupProductImage = document.getElementById('group-product-img')
const secondGrid = document.getElementById('2nd-grid-item')
const thirdGrid = document.getElementById('3rd-grid-item')
const panel = document.getElementById('panel')
const panelImg = document.getElementById('panel-image')

// OnScroll add-class to navigation
// OnScroll event handler
window.addEventListener('scroll', (e) => {
    e.preventDefault()

    if(window.scrollY > 100) {
        colorVariantContainer.classList = 'header-bg fixed left-0 w-full top-14 py-3 z-50'
        document.querySelector('.cvc').classList = 'cvc w-8/12 mx-auto flex gap-1 justify-end'
    } else {
        colorVariantContainer.classList = ''
        document.querySelector('.cvc').classList = 'cvc flex gap-4'
    }
})

// Create Buttons according to product color variants
Products.forEach(product => {
    var createBtn = document.createElement('button')
    createBtn.classList = 'product-variants active w-7 h-7 rounded-full border border-1 flex items-center justify-center'
    // createBtn.setAttribute('onclick', 'switchProduct( ' + product.id + ')')

    var createSpan = document.createElement('span')
    createSpan.classList = 'w-5 h-5 block rounded-full'
    createSpan.style = 'background-color: ' + product.primaryColor

    createBtn.appendChild(createSpan)
    colorVariantBtns.appendChild(createBtn)
})

const productVariants = document.querySelectorAll('.product-variants');

// Button Active
productVariants.forEach(function(el, key){
    el.addEventListener('click', function () {
        el.classList.add("active");

        productVariants.forEach(function(ell, els){
            if(key !== els) {
                ell.classList.remove('active');
            }
        });
    });
});

// Change Product

gradColor[0].classList.add('blue')

productVariants.forEach((pv, key) => {
    pv.addEventListener('click', () => {
        // Product Change
        productImage.style.opacity = '0'
        groupProductImage.style.opacity = '0'
        secondGrid.style.transform = 'translateX(1000px)'
        thirdGrid.style.opacity = '0'

        productImage.style.transition = '.9s all ease-in-out'
        groupProductImage.style.transition = '.9s all ease-in-out'
        secondGrid.style.transition = '.7s all ease-in-out'
        thirdGrid.style.transition = '.9s all ease-in-out'

        setTimeout(() => {
            productImage.src = Products[key].path
            groupProductImage.src = Products[key].groupImgPath
            secondGrid.src = Products[key].path
            thirdGrid.src = Products[key].brandImg
            panelImg.src = Products[key].path
        }, 800)
        
        setTimeout(() => {
            productImage.style.opacity = '1'
            groupProductImage.style.opacity = '1'
            secondGrid.style.transform = 'translateX(0)'
            thirdGrid.style.opacity = '1'

            // Text color change
            gradColor.forEach(gce => {
                gce.style.backgroundImage = Products[key].gradColor
            })
        }, 900)
    })
});

// Panel Open
const panelC = document.getElementById('panel-container')
panelC.style.transform = "translateX('1000px')"
document.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('panel-open') || e.target.classList.contains('deep-dive-button-image-open')) {
        panelC.classList = 'fixed translate-x-0 top-0 left-0 w-full h-screen z-50 transition duration-500'
        document.body.classList.add("disable-scrolling");
    } else if (e.target.parentElement.classList.contains('panel-close') || e.target.classList.contains('panel-close')) {
        document.body.classList.remove("disable-scrolling");
        panelC.classList = 'fixed translate-x-full top-0 left-0 w-full h-screen z-50 transition duration-500'
        panelC.style.transform = "translateX('1000px')"
    }
});


// Panel Scroller
const container = document.getElementById('panel');
const content = document.getElementById('panel-content');

// Add event listener for mouse movement
container.addEventListener('wheel', handleMouseWheel);

// Handle mouse movement
function handleMouseWheel(event) {
    event.preventDefault();

    const containerWidth = container.offsetWidth;
    const contentWidth = content.offsetWidth;
    const scrollWidth = contentWidth - containerWidth;

    // Adjust the scroll position based on the wheel delta
    const scrollDelta = Math.sign(event.deltaY) * 100;
    const scrollPosition = Math.max(0, Math.min(container.scrollLeft + scrollDelta, scrollWidth));
    
    container.scrollLeft = scrollPosition;
}