// ⚙️ Firebase config – replace with yours
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let userId, voteCode;

firebase.auth().signInAnonymously()
  .then(u => userId = u.user.uid)
  .catch(console.error);

document.getElementById('startBtn')
  .addEventListener('click', startVoting);

function startVoting() {
  voteCode = document.getElementById('code').value.trim();
  if (!voteCode) return alert('Please enter a code.');
  showVotingScreen('Department A');
}

function showVotingScreen(dept) {
  document.getElementById('root').innerHTML = `
    <h2>Vote: ${dept}</h2>
    ${['Speed','Quality','Clarity','Teamwork','Overall'].map(c =>
      `<label>${c}:
         <select id="${c}">
           ${[1,2,3,4,5].map(n => `<option>${n}</option>`).join('')}
         </select>
       </label>`).join('')}
    <button id="submitBtn">Submit Vote</button>
  `;
  document.getElementById('submitBtn')
    .addEventListener('click', () => submitVote(dept));
}

async function submitVote(dept) {
  const existing = await db.collection('votes')
    .where('user', '==', userId)
    .where('department', '==', dept)
    .get();
  if (!existing.empty) return alert('You already voted for this department.');

  const vote = { user: userId, code: voteCode, department: dept };
  ['Speed','Quality','Clarity','Teamwork','Overall'].forEach(c => {
    vote[c] = parseInt(document.getElementById(c).value);
  });

  await db.collection('votes').add(vote);
  document.getElementById('root').innerHTML = `<h2>Thanks for voting!</h2>`;
}