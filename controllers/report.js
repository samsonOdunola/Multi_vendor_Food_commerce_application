const client = require('@jsreport/nodejs-client')('http://localhost:5488');
const response = require('../utils/response');

const reportRender = async (req, res) => {
  try {
    const result = await client.render({
      template: { name: '/samples/Invoice/invoice-main' },
    });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Cannot Download Report', error: err.message, data: {},
    });
  }
};

module.exports = reportRender;
