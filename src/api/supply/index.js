'use strict';

function supply(ctx) {
  ctx.body = {
    total: 100000000, // 100m
    circulating: 10, // 10
  };
}

function total(ctx) {
  ctx.body = 100000000; // 100m
}

function circulating(ctx) {
  ctx.body = 10; // 10
}

module.exports = { supply, total, circulating };
