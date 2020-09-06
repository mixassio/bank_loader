import modelContragents from './modelContragents';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async (query) => {
  const API_KEY = '90cc7f7cb74adc7e34bc3328e3a2e93813c4f662';
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
  const token = `${API_KEY}`;

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ query }),
  };
  await timeout(1000);
  const resultC = await fetch(url, options)
    .then(response => response.text())
    .then((result) => {
      if (!result) {
        return [];
      }
      console.log('result', result);
      const { suggestions } = JSON.parse(result);
      if (suggestions && suggestions.length > 0) {
        return suggestions.map(el => modelContragents(el));
      }
      return [];
    })
    .catch(error => console.log('error', error));
  return resultC;
};
