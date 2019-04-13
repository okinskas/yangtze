const rp = require('request-promise');
const cron = require('node-cron');
const { Op } = require('sequelize');

const URI = 'https://environment.data.gov.uk/flood-monitoring/id/floods?county=Kent';
// const URI = 'https://environment.data.gov.uk/flood-monitoring/id/floods?county=Gloucestershire,+Herefordshire,+Monmouthshire';
const FLOOD_AREAS = 'https://environment.data.gov.uk/flood-monitoring/id/floodAreas?_limit=5000&county=Kent';
// const FLOOD_AREAS = 'https://environment.data.gov.uk/flood-monitoring/id/floodAreas?county=Gloucestershire,+Herefordshire,+Monmouthshire';

module.exports = (FloodArea, FloodWarning) => {

  const syncFloodAreas = async () => {
    let resp = await rp({
      uri: FLOOD_AREAS,
      json: true
    });
    let items = resp.items;
    let cleanResults = [];

    for (let area of items) {
      if (area.hasOwnProperty('riverOrSea')) {
        let cleanArea = cleanFloodArea(area);
        if (area.riverOrSea.includes('Great Stour')) {
          cleanResults.push(cleanArea);
        }
      }
    }
    return FloodArea.bulkCreate(cleanResults, { ignoreDuplicates: true });
  };

  const cleanFloodArea = floodArea => {
    let cleanArea = {};
    if (floodArea.hasOwnProperty('@id')) {
      cleanArea.urlId = floodArea['@id'];
    }
    if (floodArea.hasOwnProperty('county')) {
      cleanArea.county = floodArea.county;
    }
    if (floodArea.hasOwnProperty('description')) {
      cleanArea.description = floodArea.description;
    }
    if (floodArea.hasOwnProperty('eaAreaName')) {
      cleanArea.eaAreaName = floodArea.eaAreaName;
    }
    if (floodArea.hasOwnProperty('floodWatchArea')) {
      cleanArea.floodWatchArea = floodArea.floodWatchArea;
    }
    if (floodArea.hasOwnProperty('fwdCode')) {
      cleanArea.fwdCode = floodArea.fwdCode;
    }
    if (floodArea.hasOwnProperty('label')) {
      cleanArea.label = floodArea.label;
    }
    if (floodArea.hasOwnProperty('lat')) {
      cleanArea.lat = floodArea.lat;
    }
    if (floodArea.hasOwnProperty('long')) {
      cleanArea.long = floodArea.long;
    }
    if (floodArea.hasOwnProperty('notation')) {
      cleanArea.notation = floodArea.notation;
    }
    if (floodArea.hasOwnProperty('quickDialNumber')) {
      cleanArea.quickDialNumber = floodArea.quickDialNumber;
    }
    if (floodArea.hasOwnProperty('riverOrSea')) {
      cleanArea.riverOrSea = floodArea.riverOrSea;
    }
    return cleanArea;
  };

  const cleanFloodWarning = warning => {
    let cleanWarning = {};
    if (warning.hasOwnProperty('@id')) {
      cleanWarning.urlId = warning['@id'];
    }
    if (warning.hasOwnProperty('description')) {
      cleanWarning.description = warning['description'];
    }
    if (warning.hasOwnProperty('eaAreaName')) {
      cleanWarning.eaAreaName = warning['eaAreaName'];
    }
    if (warning.hasOwnProperty('eaRegionName')) {
      cleanWarning.eaRegionName = warning['eaRegionName'];
    }
    if (warning.hasOwnProperty('floodAreaID')) {
      cleanWarning.floodareaId = warning['floodAreaID'];
    }
    if (warning.hasOwnProperty('isTidal')) {
      cleanWarning.isTidal = warning['isTidal'];
    }
    if (warning.hasOwnProperty('message')) {
      cleanWarning.message = warning['message'];
    }
    if (warning.hasOwnProperty('severity')) {
      cleanWarning.severity = warning['severity'];
    }
    if (warning.hasOwnProperty('severityLevel')) {
      cleanWarning.severityLevel = warning['severityLevel'];
    }
    if (warning.hasOwnProperty('timeMessageChanged')) {
      cleanWarning.timeMessageChanged = warning['timeMessageChanged'];
    }
    if (warning.hasOwnProperty('timeRaised')) {
      cleanWarning.timeRaised = warning['timeRaised'];
    }
    if (warning.hasOwnProperty('timeSeverityChanged')) {
      cleanWarning.timeSeverityChanged = warning['timeSeverityChanged'];
    }
    return cleanWarning;
  };

  const getRemoteFloodData = async () => {
    let resp = await rp({
      uri: URI,
      json: true
    });
    return resp.items;
  };

  const syncRemoteFloodData = async () => {
    console.log('fetching remote flood data');
    let items = await getRemoteFloodData();
    for (let item of items) {
      let cleanWarning = cleanFloodWarning(item);
      let floodArea = await FloodArea.findOne({
        where: {
          fwdCode: cleanWarning.floodareaId
        }
      });
      if (floodArea) {
        let floodWarning = await FloodWarning.findOne({
          where: {
            floodareaId: cleanWarning.floodareaId
          }
        });
        if (floodWarning) {
          cleanWarning.hasBroadcast = false;
          floodWarning.update(cleanWarning);
        } else {
          FloodWarning.create(cleanWarning);
        }
      }
    }
  };

  const getLatestFloodData = async () => {
    let cleanData = [];
    let results = await FloodWarning.findAll({
      where: {
        [Op.not]: {
          severityLevel: 4
        }
      },
      attributes: [
        'description',
        'eaAreaName',
        'eaRegionName',
        'floodAreaID',
        'isTidal',
        'message',
        'severity',
        'severityLevel',
        'timeMessageChanged',
        'timeRaised',
        'timeSeverityChanged'
      ]
    });

    for (let result of results) {
      cleanData.push(result.dataValues);
    }
    return cleanData;
  };

  const startDataRequestInterval = () => {
    console.log('Starting flood alert schedule');
    cron.schedule('*/15 * * * *',  () => { // */15 to poll every 15mins.
      syncRemoteFloodData();
    }, {
      scheduled: true
    });
  };

  return {
    syncRemoteFloodData,
    getLatestFloodData,
    startDataRequestInterval,
    syncFloodAreas
  }
};
