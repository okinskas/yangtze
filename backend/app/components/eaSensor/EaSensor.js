const { DataTypes } = require('sequelize');

module.exports = (Database) => {
  let EaSensor = Database.define('easensor', {
    urlId: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    RLOIid: {
      type: DataTypes.STRING(20),
    },
    catchmentName: {
      type: DataTypes.STRING(70),
    },
    dateOpened: {
      type: DataTypes.DATE,
    },
    easting: {
      type: DataTypes.STRING(70),
    },
    label: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7),
      defaultValue: 0.0
    },
    long: {
      type: DataTypes.DECIMAL(10, 7),
      defaultValue: 0.0
    },
    // measure: { // foreign key to measures table.
    //     allowNull: true
    // },
    northing: {
      type: DataTypes.INTEGER,
    },
    notation: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    riverName: {
      type: DataTypes.STRING(50),
    },
    stageScale: {
      type: DataTypes.STRING(150),
    },
    datum: {
      type: DataTypes.DECIMAL(10, 3),
    },
    scaleMax: {
      type: DataTypes.DECIMAL(10, 3),
    },
    typicalRangeHigh: {
      type: DataTypes.DECIMAL(10, 3),
    },
    typicalRangeLow: {
      type: DataTypes.DECIMAL(10, 3),
    },
    stationReference: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.STRING(150),
    },
    town: {
      type: DataTypes.STRING(70),
    },
    wiskiID: {
      type: DataTypes.INTEGER,
    }
  });

  EaSensor.sync();
  return EaSensor;
};


// https://environment.data.gov.uk/flood-monitoring/id/stations?riverName=Great%20Stour

/*
{
  "@context" : "http://environment.data.gov.uk/flood-monitoring/meta/context.jsonld" ,
  "meta" : {
    "publisher" : "Environment Agency" ,
    "licence" : "http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" ,
    "documentation" : "http://environment.data.gov.uk/flood-monitoring/doc/reference" ,
    "version" : "0.9" ,
    "comment" : "Status: Beta service" ,
    "hasFormat" : [ "http://environment.data.gov.uk/flood-monitoring/id/stations.csv?riverName=Great%20Stour", "http://environment.data.gov.uk/flood-monitoring/id/stations.rdf?riverName=Great%20Stour", "http://environment.data.gov.uk/flood-monitoring/id/stations.ttl?riverName=Great%20Stour", "http://environment.data.gov.uk/flood-monitoring/id/stations.html?riverName=Great%20Stour" ]
  }
   ,
  "items" : [ {
    "@id" : "http://environment.data.gov.uk/flood-monitoring/id/stations/E3951" ,
    "RLOIid" : "1135" ,
    "catchmentName" : "Stour" ,
    "dateOpened" : "1967-01-01" ,
    "easting" : 611520 ,
    "label" : "Horton weir" ,
    "lat" : 51.257785 ,
    "long" : 1.030079 ,
    "measures" : [ {
      "@id" : "http://environment.data.gov.uk/flood-monitoring/id/measures/E3951-level-stage-i-15_min-mASD" ,
      "parameter" : "level" ,
      "parameterName" : "Water Level" ,
      "period" : 900 ,
      "qualifier" : "Stage" ,
      "unitName" : "mASD"
    }
     ] ,
    "northing" : 155320 ,
    "notation" : "E3951" ,
    "riverName" : "Great Stour" ,
    "stageScale" : "http://environment.data.gov.uk/flood-monitoring/id/stations/E3951/stageScale" ,
    "stationReference" : "E3951" ,
    "status" : "http://environment.data.gov.uk/flood-monitoring/def/core/statusActive" ,
    "town" : "Chartham" ,
    "wiskiID" : "654400001"
  }
  , {
    "@id" : "http://environment.data.gov.uk/flood-monitoring/id/stations/E4370" ,
    "RLOIid" : "1132" ,
    "catchmentName" : "Stour" ,
    "dateOpened" : "2000-01-01" ,
    "datumOffset" : 49.654 ,
    "easting" : 595800 ,
    "label" : "Brown Mill" ,
    "lat" : 51.171609 ,
    "long" : 0.799508 ,
    "measures" : [ {
      "@id" : "http://environment.data.gov.uk/flood-monitoring/id/measures/E4370-level-stage-i-15_min-mASD" ,
      "parameter" : "level" ,
      "parameterName" : "Water Level" ,
      "period" : 900 ,
      "qualifier" : "Stage" ,
      "unitName" : "mASD"
    }
     ] ,
    "northing" : 145100 ,
    "notation" : "E4370" ,
    "riverName" : "Great Stour" ,
    "stageScale" : "http://environment.data.gov.uk/flood-monitoring/id/stations/E4370/stageScale" ,
    "stationReference" : "E4370" ,
    "status" : "http://environment.data.gov.uk/flood-monitoring/def/core/statusActive" ,
    "town" : "Hothfield" ,
    "wiskiID" : "654110002"
  }

 */