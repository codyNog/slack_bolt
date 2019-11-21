const { API } = require("./constrants");

const option = i => {
  return {
    text: {
      type: "plain_text",
      text: `${i}時間`,
      emoji: true
    },
    value: i + 1
  };
};

const optionArray = max => {
  const array = [];
  for (let i = 0; i < max; i++) {
    array.push(option(i));
  }
  return array;
};

const options = optionArray(101);

const blocks = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "来月の稼働予定時間数"
    },
    accessory: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "稼働時間"
      },
      options: options
    }
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "再来月の稼働予定時間数"
    },
    accessory: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "稼働時間"
      },
      options: options
    }
  }
];

exports.hourlyModal = {
  type: "modal",
  callback_id: "view_1",
  title: {
    type: "plain_text",
    text: "稼働時間数入力"
  },
  blocks: blocks,
  submit: {
    type: "plain_text",
    text: "送信する"
  }
};
