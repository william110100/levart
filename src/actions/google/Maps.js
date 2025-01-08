import crypto from 'crypto';
import url from 'url';
import axios from 'axios';
import { GMAPS_API_KEY, GMAPS_CLIENT_ID, GMAPS_CLIENT_KEY } from '../../secrets/google';

const apiKey = GMAPS_API_KEY;
const clientID = GMAPS_CLIENT_ID;
const clientSecret = GMAPS_CLIENT_KEY;
const baseMaps = 'https://maps.googleapis.com';

const mapsPath = {
  reverseGeocode: '/maps/api/geocode/json',
  distanceMatrix: '/maps/api/distancematrix/json',
};

/**
 * Generate signature based on payload
 * @param secret
 * @param payload
 * @returns {string}
 */
const computeSignature = (secret, payload) => {
  let signature = Buffer.from(
    crypto
      .createHmac('sha1', secret)
      .update(payload)
      .digest('base64'),
  )
    .toString()
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  while (signature.length % 4) {
    signature += '=';
  }
  return signature;
};

const formatRequestUrl = (path, query) => {
  let requestUrl = url.format({ pathname: path, query });
  if (apiKey) {
    requestUrl += `&key=${apiKey}`;
  } else {
    const secret = Buffer.from(clientSecret, 'base64');
    const payload = url.parse(requestUrl).path;
    const signature = computeSignature(secret, payload);
    requestUrl += `&signature=${encodeURIComponent(signature)}`;
  }
  return baseMaps + requestUrl;
};

/**
 * Build query string
 */
const buildQuery = (latlng) => {
  if (apiKey) {
    return {
      latlng
    };
  }

  return {
    latlng,
    client: clientID,
  };
};

const fire = async (path, latlng) => {
  const query = buildQuery(latlng);
  const uri = formatRequestUrl(path, query);

  try {
    return axios.get(uri);
  } catch (error) {
    if (error.statusCode) {
      const errorThrown = {
        error: error.error,
        code: error.response.statusCode,
        uri: error.options.uri,
        message: error.response.body,
      };
      console.error('MapsLibrary > fire', errorThrown);
      throw errorThrown;
    } else {
      console.error('MapsLibrary > fire', error);
      throw error;
    }
  }
};

export const reverseGeocode = async (latlng) => fire(mapsPath.reverseGeocode, latlng);
