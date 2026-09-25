document.addEventListener('DOMContentLoaded', function () {

/* Feature 0: Page Navigation*/
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

function showPage(pageId) {
const targetPage = document.getElementById(pageId);
if (!targetPage) {
return;
}

pages.forEach(function (page) {
page.classList.remove('active');
});
navButtons.forEach(function (btn) {
btn.classList.remove('active');
});

targetPage.classList.add('active');

const matchingBtn = document.querySelector('.nav-btn[data-page="' + pageId + '"]');
if (matchingBtn) {
matchingBtn.classList.add('active');
}

window.scrollTo({ top: 0, behavior: 'smooth' });
history.replaceState(null, '', '#' + pageId);
}

navButtons.forEach(function (btn) {
btn.addEventListener('click', function () {
showPage(btn.dataset.page);
});
});

// Open directly to a page if the URL already has a matching hash
// (e.g. someone bookmarks yoursite.com/#games); otherwise default to "about".
const startingHash = window.location.hash.replace('#', '');
const startingPage = document.getElementById(startingHash) ? startingHash : 'about';
showPage(startingPage);

/*Feature 1: Live Digital Clock*/
const clockEl = document.getElementById('live-clock');

function updateClock() {
const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';

hours = hours % 12;
hours = hours === 0 ? 12 : hours;
const hoursStr = String(hours).padStart(2, '0');

clockEl.textContent = `Current Time: ${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);

/* Feature 2: Countdown Timer*/
const countdownEl = document.getElementById('countdown-timer');
const targetDate = new Date('2027-07-17T00:00:00');

function updateCountdown() {
const now = new Date();
const diff = targetDate - now;

if (diff <= 0) {
countdownEl.textContent = 'The anniversary screening has arrived!';
return;
}

const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((diff % (1000 * 60)) / 1000);

countdownEl.innerHTML = `
<div class="unit"><span class="value">${String(days).padStart(2, '0')}</span><span class="label">Days</span></div>
<div class="unit"><span class="value">${String(hours).padStart(2, '0')}</span><span class="label">Hours</span></div>
<div class="unit"><span class="value">${String(minutes).padStart(2, '0')}</span><span class="label">Minutes</span></div>
<div class="unit"><span class="value">${String(seconds).padStart(2, '0')}</span><span class="label">Seconds</span></div>
`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Feature 3: Interactive Button*/
const facts = [
'Homer\'s Odyssey is composed of 24 books, mirroring the 24 letters of the Greek alphabet.',
'The word "odyssey" has entered everyday English to mean any long, adventurous journey.',
'Odysseus is famous for his epithet "polytropos," roughly meaning "the man of many turns."',
'EPIC: The Musical was originally released one saga at a time over several years.',
'Circe by Madeline Miller spent over two years on the New York Times bestseller list.',
'The Cyclops Polyphemus appears in Book 9 of the original epic, one of its most retold episodes.',
'The Coen Brothers have said O Brother, Where Art Thou? was inspired by the Odyssey despite neither of them having read it start to finish before writing.',
'The Sirens episode has inspired countless modern metaphors for irresistible temptation.',
'Penelope\'s weaving trick — undoing her loom work each night — is one of the epic\'s most famous acts of cunning.',
'The Odyssey was likely composed and performed orally centuries before it was ever written down.'
];

const factBtn = document.getElementById('fact-btn');
const factOutput = document.getElementById('fact-output');

factBtn.addEventListener('click', function () {
const randomIndex = Math.floor(Math.random() * facts.length);
factOutput.textContent = facts[randomIndex];
});

/* Bonus Feature: Dark / Light Mode Toggle*/
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
document.body.classList.toggle('dark-mode');

if (document.body.classList.contains('dark-mode')) {
themeToggleBtn.textContent = 'Light Mode';
} else {
themeToggleBtn.textContent = 'Dark Mode';
}
});

});
