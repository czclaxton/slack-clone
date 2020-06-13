export default errors =>
  errors.reduce((acc, curr) => {
    // if another error of same path already exists add to the array
    acc[curr.path] =
      curr.path in acc ? [...acc[curr.path], curr.message] : [curr.message]
    return acc
  }, {})
