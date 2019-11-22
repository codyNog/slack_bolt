const { API } = require("../constrants");
const axios = require("axios");

const modalSubmit = ({ ack, body, view, say }) => {
  ack();
  const { id } = body.user;
  const { input_1, input_2 } = view.state.values;
  const value1 = Number(input_1.select.selected_option.value);
  const value2 = Number(input_2.select.selected_option.value);
  const values = [value1, value2];
  const postData = {
    schedule_informations: {
      schedules: values
    }
  };
  const scheduleApi = `${API}/schedule_information?slack_id=${id}`;
  axios.patch(scheduleApi, postData).catch(err => console.log(err));
  //say(`来月の稼働を${values[0]}、再来月の稼働を${values[1]}で登録しました。`);
};

exports.modalSubmit = modalSubmit;
