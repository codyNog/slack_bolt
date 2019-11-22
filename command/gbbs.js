const axios = require("axios");
const { API, RAILS_SERVER } = require("../constrants");
const { modal } = require("../modal");

const modalSwitch = ({ payload, context, say }) => {
  const id = payload.user_id;
  const kindApi = `${API}/user?slack_id=${id}`;
  axios.get(kindApi).then(res => {
    const { kind } = res.data.data;
    if (kind) {
      const optionApi = `${API}/schedule_information/options?slack_id=${id}`;
      axios.get(optionApi).then(res => {
        const { options } = res.data.data;
        const view = modal(options);
        openModal({ payload, context }, view);
      });
    } else {
      say(unregisteredMessage);
    }
  });
};

const openModal = ({ payload, context }, view) => {
  try {
    const result = app.client.views.open({
      token: context.botToken,
      trigger_id: payload.trigger_id,
      view: view
    });
  } catch {
    err => console.log(err);
  }
};

const unregisteredMessage = `登録が未完了です。登録を完了してください。 ${RAILS_SERVER}`;

const input = ({ payload, context, say }) => {
  modalSwitch({ payload, context, say });
};

const list = ({ payload, say }) => {
  const id = payload.user_id;
  const scheduleApi = `${API}/schedule_information?slack_id=${id}`;
  axios.get(scheduleApi).then(res => {
    const { schedules } = res.data.data;
    const message = () => {
      if (schedules[0] && schedules[1]) {
        return `来月の稼働予定は *${schedules[0]}* , 再来月の稼働予定は *${schedules[1]}* です。`;
      } else if (schedules[0]) {
        return `来月の稼働予定は *${schedules[0]}* です。`;
      } else {
        return unregisteredMessage;
      }
    };
    say(message());
  });
};

const help = ({ say }) => {
  say("/gbbs input コマンドで予定の入力、/gbbs list で予定の確認ができます");
};

const gbbs = ({ ack, body, say, payload, context }) => {
  ack();
  switch (body.text) {
    case "input":
      input({ payload, context, say });
      break;
    case "list":
      list({ payload, say });
      break;
    case "id":
      const message = payload.user_id ? payload.user_id : unregisteredMessage;
      say(message);
      break;
    case "help":
    default:
      help({ say });
  }
};

exports.gbbs = gbbs;
