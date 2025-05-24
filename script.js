const grids = document.querySelectorAll('.grid')
const headings = document.querySelectorAll('.heading .wrapper .text')

//imagem do background
const apiKey = '9yIrKARzDSZjcNtS8W3GG1Xq5z2hY1Dr2Vj4tNmoVu3Gv3CaMDLgHfFZ';


function enterScreen(index) {
  const grid = grids[index]
  const heading = headings[index]
  const gridColumns = grid.querySelectorAll('.column')

  grid.classList.add('active')

  gridColumns.forEach(element => {
    element.classList.remove('animate-before', 'animate-after')
  })

  heading.classList.remove('animate-before', 'animate-after')
}

function exitScreen(index, exitDelay) {
  const grid = grids[index]
  const heading = headings[index]
  const gridColumns = grid.querySelectorAll('.column')

  gridColumns.forEach(element => {
    element.classList.add('animate-after')
  })

  heading.classList.add('animate-after')

  setTimeout(() => {
    grid.classList.remove('active')
  }, exitDelay)
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
  const cycleTime = timePerScreen + exitDelay
  let nextIndex = 0

  function nextCycle() {
    const currentIndex = nextIndex

    enterScreen(currentIndex)

    setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen)

    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1
  }

  nextCycle()

  setInterval(nextCycle, cycleTime)
}


setupAnimationCycle({
  timePerScreen: 2000, // ms
  exitDelay: 200 * 7 // ms
})

//imagem do background
function changeColor(element, color) {
    element.style.color = color;
}
const gridElements = document.querySelectorAll('.grid');
const textElements = document.querySelectorAll('h2.text');
function requestIMG(query, index, color){
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=35`;
    fetch(apiUrl, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        let primeiroGrid = gridElements[index]
        if (primeiroGrid) {
            const itensDoPrimeiroGrid = primeiroGrid.querySelectorAll('.item');
            itensDoPrimeiroGrid.forEach((item, index) => {
                item.style.backgroundImage = `url('${data.photos[index].src.large}')`;
            });
            changeColor(textElements[index], color);
            changeText(textElements[index], query);
        }
    
    })
    .catch(error => console.error('Erro ao carregar as imagens:', error));

}
console.log(textElements);
requestIMG('Delakaytattoo',0, 'red');
requestIMG('blue sea',1, 'blue');
requestIMG('yellow world',2, 'yellow');
requestIMG('green live',3 , 'green');


