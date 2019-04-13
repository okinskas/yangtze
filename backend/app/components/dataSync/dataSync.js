const rp = require('request-promise');

const __BASE__ = 'https://environment.data.gov.uk/flood-monitoring/id/stations';
const __GREAT_STOUR__ = `${__BASE__}?riverName=Great%20Stour`;

const __BASE_HISTORIC_DATA__ = 'https://environment.data.gov.uk/flood-monitoring/data/readings';

const getHistoricalDataById = async id => {
  // Setting limit to 5000 ensures the maximum is always fetched.
  let fullUrl = `${__BASE_HISTORIC_DATA__}?stationReference=${id}&_limit=5000`;
  let res = await rp({
    uri: fullUrl,
    json: true
  });
  return res.items;
};

const getStationData = async () => {
  let res = await rp({
    uri: __GREAT_STOUR__,
    json: true
  });
  return res.items;
};

const getStageScaleData = async stageScaleUrl => {
  let res = await rp({
    uri: stageScaleUrl,
    json: true
  });
  return res.items;
};

const createStationData = async item => {
  let filteredItem = await createSingleStationData(item);
  return await addStageScaleData(filteredItem);
};

const addStageScaleData = async filteredItem => {
  let stageScaleData = await getStageScaleData(filteredItem.stageScale);
  if (stageScaleData.hasOwnProperty('datum')) {
    filteredItem.datum = stageScaleData.datum;
  }
  if (stageScaleData.hasOwnProperty('scaleMax')) {
    filteredItem.scaleMax = stageScaleData.scaleMax;
  }
  if (stageScaleData.hasOwnProperty('typicalRangeHigh')) {
    filteredItem.typicalRangeHigh = stageScaleData.typicalRangeHigh;
  }
  if (stageScaleData.hasOwnProperty('typicalRangeLow')) {
    filteredItem.typicalRangeLow = stageScaleData.typicalRangeLow;
  }
  return filteredItem;
};

const createSingleStationData = currentItem => {
  let filteredItem = {};

  console.log('original: ', currentItem);
  if (currentItem.hasOwnProperty('@id')) {
    filteredItem.urlId = currentItem['@id'];
  }
  if (currentItem.hasOwnProperty('RLOIid')) {
    filteredItem.RLOIid = currentItem.RLOIid;
  }
  if (currentItem.hasOwnProperty('catchmentName')) {
    filteredItem.catchmentName = currentItem.catchmentName;
  }
  if (currentItem.hasOwnProperty('dateOpened')) {
    filteredItem.dateOpened = currentItem.dateOpened;
  }
  if (currentItem.hasOwnProperty('datumOffset')) {
    filteredItem.datumOffset = currentItem.datumOffset;
  }
  if (currentItem.hasOwnProperty('downstageScale')) {
    filteredItem.downstageScale = currentItem.downstageScale;
  }
  if (currentItem.hasOwnProperty('label')) {
    filteredItem.label = currentItem.label;
  }
  if (currentItem.hasOwnProperty('notation')) {   // Consistent 'id'.
    filteredItem.notation = currentItem.notation;
  }
  if (currentItem.hasOwnProperty('riverName')) {
    filteredItem.riverName = currentItem.riverName;
  }
  if (currentItem.hasOwnProperty('stageScale')) {   // This URL is used for more props.
    filteredItem.stageScale = currentItem.stageScale;
  }
  if (currentItem.hasOwnProperty('stationReference')) {
    filteredItem.stationReference = currentItem.stationReference;
  }
  if (currentItem.hasOwnProperty('town')) {
    filteredItem.town = currentItem.town;
  }
  if (currentItem.hasOwnProperty('wiskiID')) {
    filteredItem.wiskiID = currentItem.wiskiID;
  }
  if (currentItem.hasOwnProperty('lat')) {
    filteredItem.lat = currentItem.lat;
  }
  if (currentItem.hasOwnProperty('long')) {
    filteredItem.long = currentItem.long;
  }
  if (currentItem.hasOwnProperty('easting')) {
    filteredItem.easting = currentItem.easting;
  }
  if (currentItem.hasOwnProperty('northing')) {
    filteredItem.northing = currentItem.northing;
  }
  if (currentItem.hasOwnProperty('status')) {
    filteredItem.status = currentItem.status;
  }
  if (currentItem.hasOwnProperty('statusReason')) {
    filteredItem.statusReason = currentItem.statusReason;
  }
  if (currentItem.hasOwnProperty('statusDate')) {
    filteredItem.statusDate = currentItem.statusDate;
  }
  if (currentItem.hasOwnProperty('type')) {
    filteredItem.type = currentItem.type;
  }
  return Promise.resolve(filteredItem);
};


module.exports = (EaSensor, EaReading) => {

  const initEaSensorData = async items => {
    for (let i = 0; i < items.length; i++) {
      let item = await createStationData(items[i]);
      EaSensor.create(item);
    }
  };

  const retrieveAndPopulateStationData = () => {
    getStationData()
      .then(results => {
        initEaSensorData(results);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const initEaReadingData = () => {
    EaSensor.findAll({
      attributes: ['notation']
    }).then(results => {
      for (let result of results) {
        let id = result.dataValues.notation;
        populateHistoricalDataById(id);
      }
    })
  };

  const populateHistoricalDataById = id => {
    getHistoricalDataById(id)
      .then(historicalData => {
        let formattedData = [];
        for (let reading of historicalData) {
          reading.urlId = reading['@id'];
          reading.easensorId = id;
          delete reading['@id'];
          formattedData.push(reading);
        }
        EaReading.bulkCreate(formattedData);
      });
  };

  retrieveAndPopulateStationData(); // Uncomment to populate easenors.
  initEaReadingData(); // uncomment to populate readings for all easensors.
};
