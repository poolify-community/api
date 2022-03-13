'use strict';

function supply(ctx) {
  ctx.body = {
    total: 100000000, // 100m
    circulating: 1000000, // 1m
  };
}

function total(ctx) {
  ctx.body = 100000000; // 100m
}

function circulating(ctx) {
  ctx.body = 1000000; // 1m
}

module.exports = { supply, total, circulating };
