// Init parallax function 
const cursorParallax = new CursorParallax()



// Const related  to the scroll 
const $fillLine=document.querySelector('.fill-line')

// Const related to the arrow scroll
const $arrowContainer = document.querySelectorAll('.container-arrow')

// Const related to the work container and title 
const $designContainer = document.querySelector('.design-container')
const $designButton = document.querySelector('h2.design')
const $devContainer = document.querySelector('.dev-container')
const $devButton = document.querySelector('h2.dev')

// Function to create my own scroll bar 
document.addEventListener('scroll',()=>
{
    let ratioScroll = (window.pageYOffset/1766)
    $fillLine.style.transform=`scaleY(${ratioScroll})`
})


// Function to create smooth scroll clicking on the arrow
for($arrow of $arrowContainer)
{
    document.addEventListener('scroll',()=>
    {
    
        if(window.pageYOffset!=0)
        {
            $arrow.style.opacity='0'
        }
        else 
        {
            $arrow.style.opacity='1'
        }
    })
    $arrow.addEventListener('click',()=>
    {
        window.scroll({
            top: 700,
            behavior: "smooth"
          });
    })
}

// Function to manage the apparition of the design/dev container  clicking on the titles
$designButton.addEventListener('click',()=>
{
    $designContainer.style.transform=`translateX(${0})`
    $devContainer.style.transform=`translateX(${-100}%)`
})

$devButton.addEventListener('click',()=>
{
    $devContainer.style.transform=`translateX(${0})`
    $designContainer.style.transform=`translateX(${100}%)`
})




// Title of the work container apparition with the scroll

document.addEventListener('scroll',()=>
{
    if(window.pageYOffset>200)
    {
        $designButton.classList.add('is-visible')
        $devButton.classList.add('is-visible')
    }
    if (window.pageYOffset>400)
    {
        $devContainer.classList.add('is-visible')
    }
})

