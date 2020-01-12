module.exports.skills = ({ age, concerts, cities, years }) => {
    const errors = [];
  
    if (age === '') {
      errors.push('Не указан возвраст');
    }
  
    if (concerts === '') {
      errors.push('Не указано число концертов');
    }
  
    if (cities === '') {
      errors.push('Не указано число городов');
    }
  
    if (years === '') {
      errors.push('Не указано количество лет на сцене');
    }
  
    return errors;
  };
  
  module.exports.uploadFile = ({ name, size, title, price }) => {
    const errors = [];
  
    if (name === '' || size === 0) {
      errors.push('Не загружена картинка');
    }
  
    if (title.trim() === '') {
      errors.push('Не указано название товара');
    }
  
    if (price === '') {
      errors.push('Не указана цена');
    }
  
    return errors;
  };
  