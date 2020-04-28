/**
 * 简单的：类似文章评论的
 * 
 * 1. ts-node simple 既可以看到想过
 * 2. 
 */

const testData = {
    id: '123',
    author: {
        id: '1',
        name: 'Paul',
    },
    title: 'My awesome blog post',
    comments: [
        {
            id: '324',
            commenter: {
                id: '2',
                name: 'Nicole',
            },
        },
    ],
};

// 第一步
import { normalize, schema } from 'normalizr';

// 定义user, 其实就是拿 author 对应的值自己用， 默认用ID
const user = new schema.Entity('users');
console.log(user)

// 嵌套使用
/**
 * 1. 拿到comments对应的数组 [{id: '324', commenter: {id: '2', name: 'Nicole' } } ]
 * 2. 在拿 commenter 对应的数据， 给user实例
 *
 */
const comment = new schema.Entity('new_comments', {
    commenter: user,
});

// 第二步
/**
 *
 * schema.Entity 参数相关含义
 *      1. 第一个参数，可以随便写，如： 对应 entities['articles']
 *      2. 第二个参数 表示组织数据的格式.【就是获取到author对应的value, 给到user】
 *          1. author: user,
 *              1. author 与元数据中的 author保持一致
 *              2. user 映射 { id: '1', name: 'Paul'}
 *          2. comments: [comment]， 如上
 *
 *
 *
 * 加上前边定义的entity，可以新的key的名字users、comments
 *
 * 最终得到的结构为
 *
 * entities: {
 *      articles: XXXX;
 *      users: XXXX;
 *      comments: XXX;
 * }
 */
const article = new schema.Entity('articles', {
    author: user,
    comments: [comment],
});

const normalizedData = normalize(testData, article);

console.log(JSON.stringify(normalizedData));

// {
//     entities: {
//         new_users: {
//             '1': { id: '1', name: 'Paul' },
//             '2': { id: '2', name: 'Nicole' },
//         },
//         new_comments: { '324': { id: '324', commenter: '2' } },
//         articles: {
//             '123': {
//                 id: '123',
//                 author: '1',
//                 title: 'My awesome blog post',
//                 comments: ['324'],
//             },
//         },
//     },
//     result: '123',
// };
