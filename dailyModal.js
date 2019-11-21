const option = i => {
  return {
    text: {
      type: "plain_text",
      text: `${i}日`,
      emoji: true
    },
    value: `${i + 1}`
  };
};

const optionArray = max => {
  const array = [];
  for (let i = 0; i < max; i++) {
    array.push(option(i));
  }
  return array;
};

const options = optionArray(31);

const blocks = [
  {
    type: "input",
    label: {
      type: "plain_text",
      text: "来月の稼働日数",
      emoji: true
    },
    element: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "稼働日数を入力",
        emoji: true
      },
      options: options,
      action_id: "select"
    },
    block_id: "input_1"
  },
  {
    type: "input",
    label: {
      type: "plain_text",
      text: "再来月の稼働日数",
      emoji: true
    },
    element: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "稼働日数を入力",
        emoji: true
      },
      options: options,
      action_id: "select"
    },
    block_id: "input_2"
  }
];

exports.dailyModal = {
  type: "modal",
  callback_id: "view_modal",
  title: {
    type: "plain_text",
    text: "稼働日数入力"
  },
  blocks: blocks,
  submit: {
    type: "plain_text",
    text: "送信する"
  },
  close: {
    type: "plain_text",
    text: "キャンセル"
  }
};
