const nodemailer = require('nodemailer');
const cron = require('node-cron');
const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;
const Sequelize = require('sequelize');

module.exports = (Subscription, FloodWarning) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });

  const subscribe = (email, floodAreaIDs) => {
    let subscriptions = [];
    for (let floodAreaID of floodAreaIDs) {
      subscriptions.push({
        email: email,
        floodareaId: floodAreaID
      })
    }

    return Subscription.bulkCreate(subscriptions, { ignoreDuplicates: true })
  };

  const constructMailOptions = (recp, subject, body) => {
    return {
      from: email,
      to: recp,
      subject: subject,
      html: body
    };
  };

  const sendEmail = ({ recp, subj, body }) => {
    let options = constructMailOptions(recp, subj, body);
    return transporter.sendMail(options)
  };

  const constructEmailSubj = alertData => {
    return `${alertData.severity} (${alertData.severityLevel} / 4)`
  };

  const constructEmailBody = alertData => {
    return `
        <h2><b>${getShorthand(alertData.severityLevel)}</b></h2>
        <h3>${alertData.description}</h3>
        <p>${alertData.message}</p>
        <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/681596/flood_warnings.pdf">
        Details on how to act in the case of a flood can be found here.</a>`;
  };

  const getShorthand = severityLevel => {
    let msg;
    switch (severityLevel) {
      case 4:
        msg = 'Warning no longer in force.';
        break;
      case 3:
        msg = 'Flood Alert!';
        break;
      case 2:
        msg = 'Flood Warning!';
        break;
      case 1:
        msg = 'Severe Flood Warning!';
        break;
      default:
        msg = 'Unrecognised flood state.'
    }
    return msg;
  };

  const pollLocalFloodWarnings = async forceRebroadcast => {

    const getAlerts = rebroadcast => {
      if (rebroadcast) {
        return FloodWarning.findAll({});
      } else {
        return FloodWarning.findAll({
          where: {
            hasBroadcast: false
          }
        });
      }
    };

    let alerts = await getAlerts(forceRebroadcast);

    for (let alert of alerts) {
      let alertData = alert.dataValues;
      let cleanAlert = {};
      cleanAlert.description = alertData.description;
      cleanAlert.message = alertData.message;
      cleanAlert.severity = alertData.severity;
      cleanAlert.severityLevel = alertData.severityLevel;
      cleanAlert.floodareaId = alertData.floodareaId;

      let subscriptions = await Subscription.findAll({
        where: {
          floodareaId: cleanAlert.floodareaId
        }
      });

      for (let sub of subscriptions) {
        let subData = sub.dataValues;
        let email = {
          recp: subData.email,
          subj: constructEmailSubj(cleanAlert),
          body: constructEmailBody(cleanAlert)
        };
        sendEmail(email)
          .then((err, info) => {
            if (err) {
              console.log(err);
            }
            console.log('Message sent: %s', info);
          });
      }

      alert.update({
        hasBroadcast: true
      })
    }
  };

  const startFloodSubscriptionMonitor = () => {
    console.log('Starting subscription schedule');
    cron.schedule('*/15 * * * *', () => { // */15 to poll every 15mins.
      pollLocalFloodWarnings();
    }, {
        scheduled: true
      });
  };

  const broadcastFloodAlert = async () => {
    let floodAlert = {
      description: "Great Stour in Canterbury",
      floodAreaID: "064FWF6Canterbury",
      message: "Although beginning to fall, river levels remain high as a result of heavy rainfall. Consequently, the risk of flooding remains. Flooding is affecting low lying land and roads adjacent to the river",
      severity: "Flood Alert",
      severityLevel: 3
    };

    let subscriptions = await Subscription.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('email')), 'email'],
      ]
    });

    for (let sub of subscriptions) {
      let subData = sub.dataValues;
      let email = {
        recp: subData.email,
        subj: constructEmailSubj(floodAlert),
        body: constructEmailBody(floodAlert)
      };
      sendEmail(email)
        .then((err, info) => {
          if (err) {
            console.log(err);
          }
          console.log('Message sent: %s', info);
        });
    }
  };

  return {
    subscribe,
    startFloodSubscriptionMonitor,
    broadcastFloodAlert
  }
};
