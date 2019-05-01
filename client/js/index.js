/* eslint-disable no-unused-vars */
const modal = document.getElementById('myModal');
const btn1 = document.getElementById('myBtn');
const btn2 = document.getElementById('myBtn2');
const btn3 = document.getElementById('myBtn3');
const span = document.getElementById('close-span');

btn1.onclick = () => {
  modal.style.display = 'block';
};
btn2.onclick = () => {
  modal.style.display = 'block';
};
btn3.onclick = () => {
  modal.style.display = 'block';
};

const closeModal = () => {
  modal.style.display = 'none';
};
const signupFunc = () => {
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'block';
};
const loginFunc = () => {
  document.getElementById('signup').style.display = 'none';
  document.getElementById('login').style.display = 'block';
};


window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

