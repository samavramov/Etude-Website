var express = require("express");
var uuid = require("uuid");
var router = express.Router();
var db = require("../database");

router.get("/", async function (req, res, next) {
  var data = [];
  var lastKey = "";
  while (true) {
    var items = await db.scanItems(lastKey);
    data = data.concat(items.Items);
    lastKey = items.LastEvaluatedKey;
    if (!lastKey) {
      break;
    }
  }

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({code: 200, data: data}));
});

router.get("/:id", async function (req, res, next) {
  var item = await db.getItem({id: req.params.id});
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      code: item["$metadata"]["httpStatusCode"],
      ...(item.Item) && {data: item.Item},
    })
  );
});

router.delete("/:id", async function (req, res, next) {
  var resp = await db.deleteItem({ id: req.params.id });

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({code: resp["$metadata"]["httpStatusCode"]}));
});

router.put("/:id", async function (req, res, next) {
  var item = req.body;
  item.id = req.params.id;

  var resp = await db.putItem(item);

  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({ code: resp["$metadata"]["httpStatusCode"]})
  );
});

router.post("/", async function (req, res, next) {
  var item = req.body;
  item.id = uuid.v1();

  var resp = await db.putItem(item);

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ code: resp["$metadata"]["httpStatusCode"], data:{id: item.id} }));
});

module.exports = router;
