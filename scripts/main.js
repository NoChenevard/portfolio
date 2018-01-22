const cursorParallax = new CursorParallax()
// const horizontalScroll = new horizontalScroll()


const $fillLine=document.querySelector('.fill-line')
document.addEventListener('scroll',()=>
{
    let ratioScroll = (window.pageYOffset/1646)
    $fillLine.style.transform=`scaleY(${ratioScroll})`
    // console.log(document.querySelector('body').scrollHeight)
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
        scrollTo(0,750)
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