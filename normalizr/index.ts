
/** 
 * normalizr
 * https://github.com/paularmstrong/normalizr
 * 
*/

import { normalize } from 'normalizr';
import * as schema from './handle';
import testData from './data'
const response = normalize(schema.formatEshopData(testData), schema.eshopSchema);
console.log(JSON.stringify(response));
