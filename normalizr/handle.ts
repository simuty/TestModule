import { schema } from 'normalizr';
/* product Schema */
const product = new schema.Entity('products');
export const arrayOfProducts = [product];
/* category Schema */
const firstCategory = new schema.Entity('firstCategories',{}, { idAttribute: 'id' }); //默认为id可不设置
const secondCategory = new schema.Entity('secondCategories');
const threeCategory = new schema.Entity('threeCategory',{},{ idAttribute: 'ccc' }); //设置主键为ccc，不设置时默认为id
firstCategory.define({
  children: [secondCategory],  //数组形式会返回result
  productIds: arrayOfProducts, //arrayOfProducts = [product];
});
secondCategory.define({
  aaa:[threeCategory]   //分离出三级菜单(threeCategory)，用二级菜单填充(secondCategories)，主键为ccc
})
/* eshop Schema */
export const eshopSchema = {
  categoryIds: [firstCategory], //由于categoryIds是数组，所以firstCategory形式是[firstCategory]
  productIds: [product],
};
// 处理接口返回的数据, 格式化如下：
// {
//   shopInfo: {...}
//   categoryIds: [...]
//   productIds: [....]
// }
//处理数据中的key值
export function formatEshopData(rawObj) {
  const obj = rawObj;
  Object.keys(obj).forEach((key) => {
    if (key === 'prolist') {
      obj.productIds = obj[key];
      delete obj[key];
    }
    if (key === 'categorylist') {
      obj.categoryIds = obj[key];
      delete obj[key];
    }
  });
  return obj;
}
/* emall Schema */
export const emallSchema = eshopSchema;
export function formatEMallData(rawObj) {
  const obj = rawObj;
  Object.keys(obj).forEach((key) => {
    if (key === 'prolist') {
      obj.productIds = obj[key];
      delete obj[key];
    }
    if (key === 'categorylist') {
      obj.categoryIds = obj[key];
      delete obj[key];
    }
  });
  return obj;
}
/* catpro Schema */
export const catproSchema = emallSchema;
export const formatCatproData = formatEMallData;