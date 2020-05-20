const apiUrl = DEVELOPMENT ? 'http://localhost:3000/api/' : '/api/';

function getResults() {
  return fetch(apiUrl + 'results').then((res) => res.json());
}

function saveResults(results) {
  return fetch(apiUrl + 'results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results),
  }).then((res) => res.json());
}

function getResultsById(id) {
  return fetch(apiUrl + id).then((res) => res.json());
}

function deleteResultsById(id) {
  return fetch(apiUrl + id, {
    method: 'DELETE',
  }).then((res) => res.json());
}

export default { getResults, saveResults, getResultsById, deleteResultsById };
