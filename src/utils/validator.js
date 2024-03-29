export const validator = (data, config) => {
  const errors = {};

  const validate = (validateMethod, data, config) => {
    let statusValidate;

    switch (validateMethod) {
      case 'isRequired':
        if (typeof data === 'string') {
          statusValidate = data.trim() === '';
        } else if (typeof data === 'object') {
          statusValidate = Object.keys(data).length === 0;
        } else if (typeof data === 'boolean') {
          statusValidate = !data;
        }
        break;

      case 'isEmail':
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;

      case 'isCapitalSymbol':
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;

      case 'isContainDigit':
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;

      case 'minLength':
        statusValidate = data.length < config.value;
        break;

      default:
        break;
    }

    if (statusValidate) return config.message;
  };

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
};
