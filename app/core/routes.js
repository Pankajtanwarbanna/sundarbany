const constant 		= require(__basePath + 'app/core/constant');

module.exports 		= function (app) {
	app.use('/api/monitor', 		require(constant.path.module + 'monitor/index.js').router);
	app.use('/api/user', 			require(constant.path.module + 'user/index.js').router);
	app.use('/api/market', 			require(constant.path.module + 'market/index.js').router);
	app.use('/api/customer',  		require(constant.path.module + 'customer/index.js').router);
	app.use('/api/coupon',  		require(constant.path.module + 'coupon/index.js').router);
};