const express = require('express');

/**
 * @callback reqHandler
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<any>}
 */