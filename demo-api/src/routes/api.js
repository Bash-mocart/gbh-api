import { Router } from 'express';

let router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    "appName": "Demo Application",
    "message": "using Node.js and Express!"
  });
});

export default router;
