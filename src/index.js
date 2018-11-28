document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  fetch("http://localhost:3000/gifts")
  .then(response => response.json())
  .then(gifts => {
    loadGifts(gifts)

    const newGiftForm = document.getElementById('new-gift-form')
    const giftList = document.querySelector('.gift-list')
    const searchBar = document.getElementById('filter-input')

    newGiftForm.addEventListener('click', (e) => {
      if(e.target.id === "gift-form-button"){
        e.preventDefault()

        createGift(e)
      }
    })

    giftList.addEventListener('click', (e) => {
      deleteGift(e)
    })

    searchBar.addEventListener('input', (e) => {
      let input = []
      input = e.target.value
      const filtered = gifts.filter(gift => gift.name.includes(input))
      loadGifts(filtered)
    })

  })
})

function loadGifts(gifts){
  const giftList = document.querySelector('.gift-list')

  giftList.innerHTML = ""
  gifts.forEach(gift => {
    giftList.innerHTML += `<li>${gift.name}<img src="${gift.image}"></li><button data-id="${gift.id}">Delete ${gift.name}</button>`
  })
}

function deleteGift(e){
  const giftList = document.querySelector('.gift-list')

  giftId = e.target.dataset.id
  if(e.target.tagName === "BUTTON"){
    fetch(`http://localhost:3000/gifts/${giftId}`,{
      method: "DELETE"
    })

    const deletedGift = giftList.querySelectorAll('button')
    deletedGift.forEach(gift => {
      if(gift.dataset.id === giftId){
        gift.previousElementSibling.remove()
        gift.remove()
      }
    })
  }
}

function createGift(e){
  const newGiftName = document.getElementById('gift-name-input').value
  const newGiftImg = document.getElementById('gift-image-input').value
  const giftList = document.querySelector('.gift-list')

  fetch('http://localhost:3000/gifts',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newGiftName,
      image: newGiftImg
    })
  })
  .then(response => response.json())
  .then(gift => {
    giftList.innerHTML += `<li>${gift.name}<img src="${gift.image}"></li><button data-id="${gift.id}">Delete ${gift.name}</button>`
  })
}
