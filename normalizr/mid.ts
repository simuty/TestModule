/**
 * 1. 参考链接 https://zhuanlan.zhihu.com/p/55984381
 * 2. API  https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#normalizedata-schema
 * 2. 层级扯平
 *
 */
const testData = [
    {
        id: 1,
        otherId: 'SA',
        name: '省会名-A',
        otherTitle: '其余字段',
        list: [
            {
                id: 100,
                cityName: '市名-A',
                floors: [
                    {
                        id: 1000,
                        cityName: '县城名-A',
                    },
                    {
                        id: 1100,
                        cityName: '县城名-A-1',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: '省会名-B',
        otherId: 'SB',
        otherTitle: '其余字段',
        list: [
            {
                id: 101,
                cityName: '市名-B',
                floors: [
                    {
                        id: 1001,
                        cityName: '县城名-B',
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: '省会名-C',
        otherId: 'SC',
        otherTitle: '其余字段',
        list: [
            {
                id: 102,
                cityName: '市名-C',
                floors: [
                    {
                        id: 1002,
                        cityName: '县城名-C',
                    },
                ],
            },
        ],
    },
];

import { normalize, schema } from 'normalizr';

const floor = new schema.Entity('floors');
const list = new schema.Entity('list', { floors: [floor] });
const data = new schema.Entity('citys', { list: [list] });
const dataScheme = new schema.Array(data);
const result = normalize(testData, dataScheme);
console.log(JSON.stringify(result));

// !结果如下
// {
//     entities: {
//         floors: {
//             '1000': { id: 1000, cityName: '县城名-A' },
//             '1001': { id: 1001, cityName: '县城名-B' },
//             '1002': { id: 1002, cityName: '县城名-C' },
//             '1100': { id: 1100, cityName: '县城名-A-1' },
//         },
//         list: {
//             '100': { id: 100, cityName: '市名-A', floors: [1000, 1100] },
//             '101': { id: 101, cityName: '市名-B', floors: [1001] },
//             '102': { id: 102, cityName: '市名-C', floors: [1002] },
//         },
//         citys: {
//             '1': {
//                 id: 1,
//                 name: '省会名-A',
//                 otherTitle: '其余字段',
//                 list: [100],
//             },
//             '2': {
//                 id: 2,
//                 name: '省会名-B',
//                 otherTitle: '其余字段',
//                 list: [101],
//             },
//             '3': {
//                 id: 3,
//                 name: '省会名-C',
//                 otherTitle: '其余字段',
//                 list: [102],
//             },
//         },
//     },
//     result: [1, 2, 3],
// };
