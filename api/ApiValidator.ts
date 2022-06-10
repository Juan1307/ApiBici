type RequestBodyType = string | string[] | number;

const setTypeNumber = (str: RequestBodyType) => +str;

const checkPrmIsNumber = (...prm: RequestBodyType[]) => {
  const isNumber = (ele: RequestBodyType) => ( Array.isArray(ele) || isNaN(Number(ele)) );
  return prm.some(isNumber);
};

const checkPrmIsString = (...prm: RequestBodyType[]) => prm.some((ele) => (typeof ele !== 'string') );

export { setTypeNumber, checkPrmIsNumber, checkPrmIsString }