const getPendingPLFY = require('../stats/getPendingPLFY');

async function pendingPLFY(ctx) {
  try {
    const pendingPLFY = await getPendingPLFY();
    ctx.status = 200;
    ctx.body = { ...pendingPLFY };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
  }
}

module.exports = {
    pendingPLFY,
};
