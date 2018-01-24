const cursorParallax = new CursorParallax()


const $fillLine=document.querySelector('.fill-line')
document.addEventListener('scroll',()=>
{
    let ratioScroll = (window.pageYOffset/1766)
    $fillLine.style.transform=`scaleY(${ratioScroll})`
    console.log(window.pageYOffset)
})



const $arrowContainer = document.querySelectorAll('.container-svg')
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






const $designContainer = document.querySelector('.design-container')
const $designButton = document.querySelector('h2.design')
$designButton.addEventListener('click',()=>
{
    $designContainer.style.transform=`translateX(${0})`
    $devContainer.style.transform=`translateX(${-100}%)`
})

const $devContainer = document.querySelector('.dev-container')
const $devButton = document.querySelector('h2.dev')
$devButton.addEventListener('click',()=>
{
    $devContainer.style.transform=`translateX(${0})`
    $designContainer.style.transform=`translateX(${100}%)`
})




// Element apparition with the scroll

const $designTitle = document.querySelector('.design')
const $devTitle = document.querySelector('.dev')
document.addEventListener('scroll',()=>
{
    if(window.pageYOffset>200)
    {
        $designTitle.classList.add('is-visible')
        $devTitle.classList.add('is-visible')
    }
    if (window.pageYOffset>400)
    {
        $devContainer.classList.add('is-visible')
    }
})

