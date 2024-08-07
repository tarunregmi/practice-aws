import { getObjectURL } from './s3/index.js';

const key = '1c4af2fe85.jpg';
const url = await getObjectURL(key, 60);

console.log(url);
