/*=== DOM elements ===*/
const content = document.querySelector('.content');
const form = document.querySelector('.add-cafe-form');
const list = document.querySelector('.cafe-list');

function showCafes(doc) {
  const {
    name,
    city
  } = doc.data();
  const li = document.createElement('li');
  li.innerHTML = `<span>${name}</span><span>${city}</span><div>x</div>`;
  list.appendChild(li);
  li.setAttribute('data-id', doc.id);

  // delete button
  const deleteButton = document.querySelector('li div');
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id')
    db.collection('cafes').doc(id).delete()
  });
}

// Add data to firebase
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  })
  form.name.value = '';
  form.city.value = '';
})

// GET cafe data from firebase
// db.collection('name') > get()> then(snapshot - callback function) > docs(array) > data()
db.collection('cafes').get().then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    showCafes(doc)
  });

});