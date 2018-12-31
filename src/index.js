#!/usr/bin/env node

import dotenv from 'dotenv'
import axios from 'axios';
import dayjs from 'dayjs';

dotenv.config();

const { DOMAIN_TO_CHECK, DISCORD_WEBHOOK_URL, INTERVAL } = process.env;
let downtimeCounter = 0;

async function checkIfUp (){
  try {
    await axios.get(DOMAIN_TO_CHECK);
    downtimeCounter = 0;
    console.log(`${DOMAIN_TO_CHECK} looks good.`);
  } catch (error) {
    downtimeCounter++;
    console.log(`${DOMAIN_TO_CHECK} went down. attempt ${downtimeCounter}.`);
  }

  if (downtimeCounter >= 10) {
    downtimeCounter = 0;
    return sendNotification();
  }
}

async function sendNotification() {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: `${dayjs().format('YYYY-MM-DD hh:mma')} - ${DOMAIN_TO_CHECK} went down.`,
    });
  } catch (error) {
    console.log('Unable to send message');
  }
}

setInterval(() => {
  checkIfUp();
}, INTERVAL);
