'use strict';

const request = require('request');
const cheerio = require('cheerio');
const INSTA = 'https://www.instagram.com';
const _ = require('lodash');

module.exports.getMeta = user => {
  return new Promise((resolve, reject) => {
    request(`${INSTA}/${user}`, (err, response, body) => {
      if (!err) {
        let $ = cheerio.load(body);

        let rawMeta = $('meta').toArray().map(m => m.attribs);

        let description = _.find(rawMeta, ['name', 'description']).content;

        let followers = +description.split(' ')[0].trim();
        let following = +description.split(',')[1].trim().split(' ')[0].trim();
        let posts = +description.split(',')[2].trim().split(' ')[0].trim();

        let image = _.find(rawMeta, ['property', 'og:image']).content;
        let name = _.find(rawMeta, ['property', 'og:title']).content.split('(')[0].trim();
        let username = `@${user}`;
        let link = _.find(rawMeta, ['property', 'og:url']).content;

        resolve({
          image,
          name,
          username,
          link,
          followers,
          following,
          posts
        });
        // resolve(rawMeta);
      } else {
        reject(err);
      }
    });
  });
}