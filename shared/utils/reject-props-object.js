const rejectPropsObject = (obj, props) => {
  return Object.keys(obj)
    .filter((k) => !props.includes(k))
    .map((k) => Object.assign({}, { [k]: obj[k] }))
    .reduce((res, o) => Object.assign(res, o), {});
};

module.exports = rejectPropsObject;
