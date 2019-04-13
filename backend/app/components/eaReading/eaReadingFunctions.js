module.exports = (EaReading, EaSensor) => {
  // Need to add most recent reading to this.
  const getEaReadings = (id) => {
    return EaSensor.findOne({
      where: {
        notation: id
      },
      attributes: [
        'notation',
        'lat',
        'long',
        'scaleMax',
        'typicalRangeHigh',
        'typicalRangeLow',
        'status',
        'label',
        'riverName'
      ]
    })
      .then(result => {
        let builtResult = result.dataValues;
        console.log('easensor info: ', builtResult);
        return EaReading.findAll({
          where: {
            easensorId: id
          },
          attributes: [
            'value',
            'dateTime'
          ],
          order: [
            ['dateTime', 'ASC']
          ]
        })
          .then(readings => {
            builtResult.readings = [];
            for (let reading of readings) {
              builtResult.readings.push(reading.dataValues);
            }
            console.log('added results: ', builtResult);
            return builtResult;
          })
      })
  };

  return {
    getEaReadings
  }
};