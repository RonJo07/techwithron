export default function handler(req, res) {
  res.writeHead(308, { Location: 'https://techwithron.co.in' });
  res.end();
}
