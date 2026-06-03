import { crawlAll } from './src/lib/crawlers/index';
crawlAll().then(res => {
  const sites = res.map(r => r.siteName);
  console.log('Succeeded:', sites);
}).catch(console.error);
