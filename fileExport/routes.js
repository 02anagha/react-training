const {
  NewFileExportCtrl
} = require('./controllers')

const express = require('express');
let LOADER_URI = 'mongodb://localhost:27017/'

const app = express();

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(LOADER_URI, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err
  console.log("connected")

  const pulseDevDb = client.db('pulse-dev')

  const newFileExportCtrl = new NewFileExportCtrl(pulseDevDb)

  // const newFileExportCtrl = new NewFileExportCtrl()
  
  app.post('/save',
    newFileExportCtrl.validationSchema(),
    newFileExportCtrl.validate,
    async (req, res) => {
      newFileExportCtrl.saveExportConfiguration(req, res)
    })

  app.put('/edit/:configId',
    // newFileExportCtrl.getConfiguration,
    newFileExportCtrl.validationSchema('edit'),
    newFileExportCtrl.validate,
    async (req, res) => {
      newFileExportCtrl.editExportConfiguration(req, res)
    }
  )

  app.get(
    '/export-config',
    // newFileExportCtrl.validationSchema('download'),
    // newFileExportCtrl.validate,
    async (req, res) => {
      newFileExportCtrl.getExcelSheets(req, res)
    }
  )

})

module.exports = app;